import { Event } from "../Event";

interface WaitIndicator {
  show(inPlaceOfElement: HTMLElement): void;
  progress(): void;
  hide(): void;
}

interface WaitLogic<T> {
  start(forElement: HTMLElement): Promise<T>;
  cancel(): void;
  end(): void;
}

class WaitIndicatorText implements WaitIndicator {
  constructor() {}

  private inPlaceOfElement?: HTMLElement;
  private inPlaceOfElementDisplayBeforeHide: string = "block";
  private waitElement?: HTMLDivElement;
  private waitIndicatorElement?: HTMLDivElement;
  private indicatorPosition = 0;

  private createWaitElement(): HTMLElement {
    let waitElement = document.createElement("div");
    waitElement.innerText = "Simulated processing...";
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

  show(inPlaceOfElement: HTMLElement): void {
    this.inPlaceOfElement = inPlaceOfElement;
    this.inPlaceOfElementDisplayBeforeHide = inPlaceOfElement.style.display;
    inPlaceOfElement.style.display = "none";

    let parentNode = inPlaceOfElement.parentNode;
    if (!parentNode) {
      return;
    }
    parentNode.insertBefore(this.createWaitElement(), inPlaceOfElement);
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

class WaitLogicSimulated implements WaitLogic<Date> {
  private simulatedWaitMs = 3000;
  private indicatorUpdateIntervalMs = 100;

  private waitInterval?: number;
  private waitTimeout?: number;

  constructor(private waitIndicator: WaitIndicator) {}

  start(forElement: HTMLElement): Promise<Date> {
    let clickStartTime = new Date();
    this.waitIndicator.show(forElement);

    return new Promise((resolve, reject) => {
      this.waitTimeout = setTimeout(() => {
        resolve(clickStartTime);
      }, this.simulatedWaitMs);

      this.waitInterval = setInterval(() => {
        this.waitIndicator.progress();
      }, this.indicatorUpdateIntervalMs);
    });
  }

  cancel() {
    window.clearTimeout(this.waitTimeout);
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
          alert(`You clicked the button ${elapsedSeconds} seconds ago.`);
        }, 0);
      })
      .catch((e) => {
        alert(e.message);
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
