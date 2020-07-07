import { WaitIndicator, WaitIndicatorConstructor } from "./WaitIndicator";
import { WaitLogic } from "./WaitLogic";

export class UserCanceledEvent {
  constructor(public message: string) {}
}

export class WaitLogicSimulated implements WaitLogic<Date> {
  private simulatedWaitMs = 2000;
  private indicatorUpdateIntervalMs = 100;
  private waitInterval?: number;
  private waitTimeout?: number;
  private waitIndicator?: WaitIndicator;

  constructor(private waitIndicatorConstructor: WaitIndicatorConstructor) {}

  private startResolve?: (value?: Date) => void;
  private startReject?: (reason?: any) => void;

  start(forElement: HTMLElement): Promise<Date> {
    this.waitIndicator = new this.waitIndicatorConstructor(forElement, (e) => {
      this.cancel(e);
    });
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
    }, this.simulatedWaitMs);
  }

  private startWaitProgressUpdater() {
    this.waitInterval = setInterval(() => {
      this.waitIndicator?.progress();
    }, this.indicatorUpdateIntervalMs);
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
