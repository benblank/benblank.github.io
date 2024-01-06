declare module "@11ty/eleventy/src/BenchmarkGroup.js" {
  import Benchmark from "@11ty/eleventy/src/BenchmarkGroup.js";

  export default class BenchmarkGroup {
    constructor();

    benchmarks: Record<string, Benchmark>;
    isVerbose: boolean;
    logger: ConsoleLogger;
    minimumThresholdMs: number;
    minimumThresholdPercent: number;

    setIsVerbose(isVerbose: boolean): void;
    reset(): void;
    add<T extends (this: ThisType, ...args: Array<unknown>) => unknown>(type: string, callback: T): T;
    setMinimumThresholdMs(minimumThresholdMs: number): void;
    setMinimumThresholdPercent(minimumThresholdPercent: number): void;
    has(type: string): boolean;
    get(type: string): Benchmark;
    padNumber(num: number, length: number): string;
    finish(label: unknown, totalTimeSpent: number): void;
  }
}
