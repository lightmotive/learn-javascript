import { WaitIndicator, WaitIndicatorConstructor } from "./WaitIndicator";
import { WaitCancelable } from "./WaitCancelable";

export class UserCanceledEvent {
  constructor(public message: string) {}
}

export class WaitCancelableSimulated implements WaitCancelable<Date> {
  private waitInterval?: number;
  private waitTimeout?: number;
  private waitIndicator?: WaitIndicator;

  constructor(
    private waitIndicatorConstructor: WaitIndicatorConstructor,
    private waitMilliseconds: number = 5000,
    private indicatorUpdateIntervalMilliseconds: number = 100
  ) {}

  private startResolve?: (value?: Date) => void;
  private startReject?: (reason?: unknown) => void;

  start(forElement: HTMLElement, waitMessageHTML: string): Promise<Date> {
    this.waitIndicator = new this.waitIndicatorConstructor(
      forElement,
      waitMessageHTML,
      (e) => {
        this.cancel(e);
      }
    );
    this.waitIndicator.show();

    const promise = new Promise<Date>((resolve, reject) => {
      this.startResolve = resolve;
      this.startReject = reject;
    });

    this.startWait();
    this.startWaitProgressUpdater();

    return promise;
  }

  private startWait(): void {
    const clickStartTime = new Date();
    this.waitTimeout = setTimeout(() => {
      if (!this.startResolve) {
        return;
      }
      this.startResolve(clickStartTime);
    }, this.waitMilliseconds);
  }

  private startWaitProgressUpdater() {
    this.waitInterval = setInterval(() => {
      this.waitIndicator?.progress();
    }, this.indicatorUpdateIntervalMilliseconds);
  }

  cancel(e: UIEvent): void {
    window.clearTimeout(this.waitTimeout);
    this.end();

    if (this.startReject) {
      this.startReject(
        new UserCanceledEvent(`You canceled it with a ${e.type}.`)
      );
    }
  }

  end(): void {
    window.clearInterval(this.waitInterval);
    this.waitIndicator?.hide();
  }
}
