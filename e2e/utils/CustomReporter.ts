import type { Reporter, TestCase, TestResult } from "@playwright/test/reporter";
import { appendFileSync } from "fs";
class CustomReporter implements Reporter {
  private stats;
  constructor() {
    console.log("hererereeeee");
    this.stats = {
      passed: 0,
      failed: 0,
      timedOut: 0,
      skipped: 0,
      interrupted: 0,
    };
  }
  onTestEnd(_test: TestCase, result: TestResult) {
    switch (result.status) {
      case "passed":
        this.stats.passed++;
        break;
      case "failed":
        this.stats.failed++;
        break;
      case "timedOut":
        this.stats.timedOut++;
        break;
      case "skipped":
        this.stats.skipped++;
        break;
      case "interrupted":
        this.stats.interrupted++;
        break;
    }
  }
  onEnd() {
    const bashEnv = process.env.BASH_ENV || "./env.txt";
    const STATUS_MESSAGE = this.stats.failed > 0 ? ":x:" : ":white_check_mark";
    const exportString = `
    export PASSED_TESTS=${this.stats.passed}
    export FAILED_TESTS=${this.stats.passed}
    export TIMEDOUT_TESTS=${this.stats.passed}
    export SKIPPED_TESTS=${this.stats.passed}
    export INTERRUPTED_TESTS=${this.stats.passed}
    export STATUS_MESSAGE=${STATUS_MESSAGE}
    `;
    appendFileSync(bashEnv, exportString);
  }
}

export default CustomReporter;
