import { WaitIndicatorUI, WaitIndicatorUIConstructor } from "./WaitIndicatorUI";
import { ActionAsyncUI } from "./ActionAsyncUI";
import { SimulatedWaitActionAsync } from "./SimulatedWaitActionAsync";

export class UserCanceledEvent {
  constructor(public message: string) {}
}

export class SimulatedWaitActionAsyncUI implements ActionAsyncUI<Date> {
  private waitIndicatorUI?: WaitIndicatorUI;
  private simulatedWait: SimulatedWaitActionAsync;
  private onProgress?: () => void;

  constructor(
    private waitIndicatorConstructor: WaitIndicatorUIConstructor,
    waitMilliseconds = 5000,
    indicatorUpdateIntervalMilliseconds = 100
  ) {
    this.simulatedWait = new SimulatedWaitActionAsync(
      waitMilliseconds,
      indicatorUpdateIntervalMilliseconds
    );
  }

  execute(forElement: HTMLElement, waitMessageHTML: string): Promise<Date> {
    this.waitIndicatorUI = new this.waitIndicatorConstructor(
      forElement,
      waitMessageHTML,
      (e) => {
        this.cancel(e);
      }
    );
    this.waitIndicatorUI.show();

    this.onProgress = () => {
      this.waitIndicatorUI?.progress();
    };

    this.simulatedWait.progress.on(this.onProgress);

    return this.simulatedWait.execute().finally(() => {
      this.finally();
    });
  }

  cancel(e: UIEvent): void {
    this.simulatedWait.cancel(
      new UserCanceledEvent(`You canceled it with a ${e.type}.`)
    );
    this.finally();
  }

  finally(): void {
    if (this.onProgress) {
      this.simulatedWait.progress.off(this.onProgress);
    }
    this.waitIndicatorUI?.hide();
  }
}
