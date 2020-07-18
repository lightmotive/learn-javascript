import { ActionAsync } from "./ActionAsync";
import { EventLite } from "../event/EventLite";

export class SimulatedWaitActionAsync
  implements ActionAsync<number, void, Date> {
  private resolve?: (value?: Date) => void;
  private reject?: (reason?: unknown) => void;
  private executeTimeout?: number;
  private progressInterval?: number;

  constructor(
    private waitMilliseconds: number,
    private progressIntervalMilliseconds: number
  ) {}

  execute(): Promise<Date> {
    const clickStartTime = new Date();

    const promise = new Promise<Date>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    this.executeTimeout = setTimeout(() => {
      if (!this.resolve) {
        return;
      }
      this.clear();
      this.resolve(clickStartTime);
    }, this.waitMilliseconds);

    this.progressInterval = setInterval(() => {
      this.progress.trigger();
    }, this.progressIntervalMilliseconds);

    return promise;
  }

  progress = new EventLite<void>();

  cancel(reason?: unknown): void {
    this.clear();

    if (!this.reject) {
      return;
    }
    this.reject(reason);
  }

  private clear(): void {
    window.clearTimeout(this.executeTimeout);
    window.clearInterval(this.progressInterval);
  }
}
