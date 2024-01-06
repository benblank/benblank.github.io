declare module "@11ty/eleventy/src/Benchmark.js" {
  export default class Benchmark {
    constructor();

    timeSpent: number;
    timesCalled: number;
    beforeTimers: Array<number>;

    getNewTimestamp(): number;
    reset();
    incrementCount();
    before(): void;
    after(): void;
    getTimesCalled(): number;
    getTotal(): number;
  }
}
