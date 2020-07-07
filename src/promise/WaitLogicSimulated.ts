import { WaitIndicator, WaitIndicatorConstructor } from "./WaitIndicator";
import { WaitLogic } from "./WaitLogic";

export class UserCanceledEvent {
  constructor(public message: string) {}
}

export class WaitLogicSimulated implements WaitLogic<Date> {
  private waitInterval?: number;
  private waitTimeout?: number;
  private waitIndicator?: WaitIndicator;

  constructor(
    private waitIndicatorConstructor: WaitIndicatorConstructor,
    private waitMilliseconds: number = 5000,
    private indicatorUpdateIntervalMilliseconds: number = 100
  ) {}

  private startResolve?: (value?: Date) => void;
  private startReject?: (reason?: any) => void;

  start(forElement: HTMLElement, waitMessageHTML: string): Promise<Date> {
    this.waitIndicator = new this.waitIndicatorConstructor(
      forElement,
      waitMessageHTML,
      (e) => {
        this.cancel(e);
      }
    );
    this.waitIndicator.show();

    let promise = new Promise<Date>((resolve, reject) => {
      this.startResolve = resolve;
      this.startReject = reject;
    });

    this.startWait();
    this.startWaitProgressUpdater();

    return promise;
  }

  private startWait(): void {
    let clickStartTime = new Date();
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

  cancel(e: UIEvent) {
    window.clearTimeout(this.waitTimeout);
    this.end();

    if (this.startReject) {
      this.startReject(new UserCanceledEvent("You canceled it."));
    }
  }

  end() {
    window.clearInterval(this.waitInterval);
    this.waitIndicator?.hide();
  }
}
