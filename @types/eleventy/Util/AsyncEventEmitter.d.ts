declare module "@11ty/eleventy/src/Util/AsyncEventEmitter.js" {
  import type EventEmitter from "node:events";

  /**
   * This class emits events asynchronously.
   *
   * It can be used for time measurements during a build.
   */
  export default class AsyncEventEmitter extends EventEmitter {
    /**
     * @param type The event name to emit.
     * @param args Additional arguments that get passed to listeners.
     * @returns Promise resolves once all listeners were invoked
     */
    async emit(type: string | symbol, ...args: Array<any>): Promise<Array<void>>;

    /**
     * @param type The event name to emit.
     * @param args Additional lazy-executed function arguments that get passed to listeners.
     * @returns Promise resolves once all listeners were invoked
     */
    async emitLazy(type: string | symbol, ...args: Array<any>): Promise<Array<void>>;
  }
}
