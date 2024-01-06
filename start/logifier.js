import ansiRegex from "ansi-regex";
import chalkStdout, { chalkStderr } from "chalk";

/** @typedef {import("node:stream").Readable} Readable */

/**
 * @typedef {{ next: LinkedList<T> | null, value: T }} LinkedList<T>
 * @template T
 */

const REGEX_SPECIAL_CHARACTERS = /[{|}$()*+.?[\\\]^]/g;

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour12: false,

  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
});

function literalToPrefixRegExp(/** @type {string} */ literal) {
  return new RegExp("^" + literal.replaceAll(REGEX_SPECIAL_CHARACTERS, "\\$&"));
}

export class Logifier {
  static #ansiRegex = ansiRegex();

  /** The chalk instance to use for formatting output.
   *
   * This allows formatting to be applied differently for stdout and stderr, if
   * they happen to be going to places with different capabilities.
   */
  #chalk;

  /** A string used to identify this logifier's output.
   *
   * Output lines will be in the format "[00:00:00.000][label] blah".
   */
  #label;

  /** The prefix, if any, to strip from received lines. */
  #prefix;

  /** If true, received lines will be colored red before being sent to stderr. */
  #isErrorLog;

  /** The head of a linked list of lines which have not yet been written.
   *
   * @type {LinkedList<string> | null}
   */
  #queueHead = null;

  /** The tail of a linked list of lines which have not yet been written.
   *
   * The tail is irrelevant when the head is null and always gets set when
   * assigning a value to the head. Keeping null out of the tail's type makes it
   * easier to work with.
   *
   * @type {LinkedList<string>}
   */
  #queueTail = { next: null, value: "dummy" };

  /** An incomplete line which has not yet been queued for writing.
   *
   * To avoid interrupting each other, logifiers only write complete lines. This
   * also prevents ANSI sequences which span chunks from slipping through.
   *
   * @type {string | null}
   */
  #remainder = null;

  /** The writable to which output is sent.
   *
   * Will always be stderr when isErrorLog is true; otherwise, it will always be
   * stdout.
   */
  #writable;

  /** The last return value from #writable.write(). */
  #writableReady = true;

  /**
   * @param {Readable} readable
   * @param {string} label
   * @param {RegExp | string | null} prefix
   * @param {boolean} isErrorLog
   */
  constructor(readable, label, prefix, isErrorLog) {
    this.#chalk = isErrorLog ? chalkStderr : chalkStdout;
    this.#isErrorLog = isErrorLog;
    this.#label = label;
    this.#prefix = typeof prefix === "string" ? literalToPrefixRegExp(prefix) : prefix;
    this.#writable = isErrorLog ? process.stderr : process.stdout;
    this.#writable.on("drain", this.#processQueue.bind(this));

    readable.setEncoding("utf8").on("data", this.#onData.bind(this));
  }

  #enqueue(/** @type {string} */ line) {
    const node = { next: null, value: line };

    if (this.#queueHead) {
      this.#queueTail.next = node;
    } else {
      this.#queueHead = node;
    }

    this.#queueTail = node;
  }

  #onData(/** @type {string} */ rawChunk) {
    if (!rawChunk.length) {
      return;
    }

    let remaining = this.#remainder ? this.#remainder + rawChunk : rawChunk;
    let newlineIndex;

    while ((newlineIndex = remaining.indexOf("\n")) != -1) {
      this.#enqueue(remaining.slice(0, newlineIndex + 1));

      remaining = remaining.slice(newlineIndex + 1);
    }

    this.#remainder = remaining.length ? remaining : null;

    this.#processQueue();
  }

  static #stripAnsi(/** @type {string} */ chunk) {
    return chunk.replaceAll(Logifier.#ansiRegex, "");
  }

  #stripPrefix(/** @type {string} */ chunk) {
    return this.#prefix ? chunk.replace(this.#prefix, "") : chunk;
  }

  #processQueue() {
    while (this.#writableReady && this.#queueHead) {
      const line = this.#stripPrefix(Logifier.#stripAnsi(this.#queueHead.value));

      this.#queueHead = this.#queueHead.next;
      this.#writableReady = this.#writable.write(
        [
          this.#chalk.cyanBright(`[${timeFormatter.format(new Date())}]`),
          this.#chalk.yellowBright(`[${this.#label}]`),
          " ",

          // NOTE: For error logs, this colors the line break. Preferably it
          // wouldn't, but I'm only using foreground colors and don't really
          // care enough.
          this.#isErrorLog ? this.#chalk.redBright(line) : line,
        ].join(""),
      );
    }
  }
}
