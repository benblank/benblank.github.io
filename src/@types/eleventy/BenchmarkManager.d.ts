declare module "@11ty/eleventy/src/BenchmarkManager.js" {
  import BenchmarkGroup from "@11ty/eleventy/src/BenchmarkGroup.js";

  export default class BenchmarkManager {
    constructor();

    // Properties declared in constructor:
    benchmarkGroups: Record<string, BenchmarkGroup>;
    isVerbose: boolean;
    start: number;

    reset();
    getNewTimestamp(): nunmber;
    setVerboseOutput(isVerbose: boolean): void;
    hasBenchmarkGroup(name: string): boolean;
    getBenchmarkGroup(name: string): BenchmarkGroup;
    getAll(): Record<string, BenchmarkGroup>;
    get(): Record<string, BenchmarkGroup>;
    get(name: string): BenchmarkGroup;
    finish(): void;
  }
}
