import { Event } from "../Event";

export interface WaitIndicator {
  show(
    inPlaceOfElement: HTMLElement,
    cancelCallback?: (e: UIEvent) => void
  ): void;
  progress(): void;
  hide(): void;
}

export interface WaitLogic<T> {
  start(forElement: HTMLElement): Promise<T>;
  cancel(e: UIEvent): void;
  end(): void;
}

export class WaitIndicatorText implements WaitIndicator {
  constructor() {}

  private inPlaceOfElement?: HTMLElement;
  private inPlaceOfElementDisplayBeforeHide: string = "block";
  private waitElement?: HTMLDivElement;
  private waitIndicatorElement?: HTMLDivElement;
  private indicatorPosition = 0;

  private createWaitElement(
    cancelCallback?: (e: UIEvent) => void
  ): HTMLElement {
    let waitElement = document.createElement("div");
    waitElement.innerText = "Simulated wait...";
    if (cancelCallback) {
      waitElement.appendChild(this.createWaitCancelElement(cancelCallback));
    }
    waitElement.appendChild(this.createWaitIndicatorElement());
    this.waitElement = waitElement;
    return waitElement;
  }

  private createWaitIndicatorElement(): HTMLDivElement {
    let waitIndicatorElement = document.createElement("div");
    waitIndicatorElement.style.width = "100%";
    waitIndicatorElement.style.textAlign = "center";
    waitIndicatorElement.innerHTML = this.getIndicatorHtml();

    this.waitIndicatorElement = waitIndicatorElement;
    return waitIndicatorElement;
  }

  private createWaitCancelElement(
    cancelCallback?: (e: UIEvent) => void
  ): HTMLButtonElement {
    let cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.style.marginLeft = "10px";
    cancelButton.onclick = (e) => {
      if (!cancelCallback) {
        return false;
      }
      cancelCallback(e);
      return true;
    };
    return cancelButton;
  }

  show(
    inPlaceOfElement: HTMLElement,
    cancelCallback?: (e: UIEvent) => void
  ): void {
    this.inPlaceOfElement = inPlaceOfElement;
    this.inPlaceOfElementDisplayBeforeHide = inPlaceOfElement.style.display;
    inPlaceOfElement.style.display = "none";

    let parentNode = inPlaceOfElement.parentNode;
    if (!parentNode) {
      return;
    }

    parentNode.insertBefore(
      this.createWaitElement(cancelCallback),
      inPlaceOfElement
    );
  }

  private getIndicatorHtml(): string {
    switch (this.indicatorPosition) {
      case 0:
        return "/";
      case 1:
        return "&mdash;";
      case 2:
        return "\\";
      case 3:
        return "|";
      default:
        return "?";
    }
  }

  progress(): void {
    if (!this.waitIndicatorElement) {
      return;
    }

    this.indicatorPosition += 1;
    if (this.indicatorPosition > 3) {
      this.indicatorPosition = 0;
    }

    this.waitIndicatorElement.innerHTML = this.getIndicatorHtml();
  }

  hide(): void {
    if (this.inPlaceOfElement) {
      this.inPlaceOfElement.style.display = this.inPlaceOfElementDisplayBeforeHide;
    }
    if (this.waitElement) {
      this.waitElement.remove();
    }
  }
}

export class WaitLogicSimulated implements WaitLogic<Date> {
  private simulatedWaitMs = 2000;
  private indicatorUpdateIntervalMs = 100;

  private waitInterval?: number;
  private waitTimeout?: number;

  constructor(private waitIndicator: WaitIndicator) {}

  private startResolve?: (value?: Date) => void;
  private startReject?: (reason?: any) => void;

  start(forElement: HTMLElement): Promise<Date> {
    this.waitIndicator.show(forElement, (e) => {
      this.cancel(e);
    });

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
      this.waitIndicator.progress();
    }, this.indicatorUpdateIntervalMs);
  }

  cancel(e: UIEvent) {
    window.clearTimeout(this.waitTimeout);
    this.end();

    if (this.startReject) {
      this.startReject(
        new Error(
          `Wait canceled due to ${(e.currentTarget as HTMLElement).innerText} ${
            e.type
          }`
        )
      );
    }
  }

  end() {
    window.clearInterval(this.waitInterval);
    this.waitIndicator.hide();
  }
}

class ProjectDocument implements Project {
  private buttonElement?: HTMLButtonElement;

  constructor(private waitLogic: WaitLogic<Date>) {}

  initialize() {
    this.initializeBody();
    this.initializeButton();
  }

  private initializeBody() {
    document.documentElement.style.height = "100%";
    document.documentElement.style.zoom = "500%";
    document.body.style.height = "100%";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
  }

  private initializeButton() {
    let button = document.createElement("button");
    button.innerHTML = "Try me!";
    button.onclick = () => {
      this.onButtonClicked.trigger();
    };

    document.body.appendChild(button);
    this.buttonElement = button;

    this.ButtonClicked.on(() => {
      this.buttonClicked();
    });
  }

  private readonly onButtonClicked = new Event<void>();
  public get ButtonClicked() {
    return this.onButtonClicked.expose();
  }

  private buttonClicked() {
    if (!this.buttonElement) {
      return;
    }

    this.waitLogic
      .start(this.buttonElement)
      .then((data: Date) => {
        let elapsedSeconds = Math.round(
          (new Date().getTime() - data.getTime()) / 1000
        );
        setTimeout(() => {
          alert(
            `Thanks for waiting. You clicked the "Try me!" button ${elapsedSeconds} seconds ago.`
          );
        }, 0);
      })
      .catch((e) => {
        setTimeout(() => {
          alert(e.message);
        }, 1);
      })
      .finally(() => {
        this.waitLogic.end();
      });
  }
}

function LoadProject(): void {
  new ProjectDocument(
    new WaitLogicSimulated(new WaitIndicatorText())
  ).initialize();
}

export { LoadProject as promise_waitIndicator_load };
