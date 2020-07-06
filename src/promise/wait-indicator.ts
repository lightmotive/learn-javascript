import { Event } from "../Event";

class Document implements IDocument {
  private waitElementId = "wait-indicator";
  private buttonElementId = "wait-button";

  initialize() {
    this.initializeDOM();
  }

  private initializeDOM() {
    document.documentElement.style.height = "100%";
    document.documentElement.style.zoom = "500%";
    document.body.style.height = "100%";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    this.initializeIndicator();
    this.initializeButton();
  }

  private initializeIndicator() {
    let div = document.createElement("div");
    div.id = this.waitElementId;
    div.style.display = "none";
    document.body.appendChild(div);
  }
  private initializeButton() {
    let button = document.createElement("button");
    button.id = this.buttonElementId;
    button.innerHTML = "Try me!";
    button.onclick = () => {
      this.onButtonClicked.trigger();
    };
    document.body.appendChild(button);
  }

  private readonly onButtonClicked = new Event<void>();
  public get ButtonClicked() {
    return this.onButtonClicked.expose();
  }

  private getIndicatorElement(): HTMLElement {
    return document.getElementById(this.waitElementId) as HTMLElement;
  }

  private getButtonElement(): HTMLElement {
    return document.getElementById(this.buttonElementId) as HTMLElement;
  }

  startWait(): void {
    this.getIndicatorElement().style.display = "block";
    this.getButtonElement().style.display = "none";
  }

  updateIndicator(character: string) {
    this.getIndicatorElement().innerHTML = `<div>Simulated processing...<div style="width: 100%; text-align: center;">${character}</div></div>`;
  }

  endWait(): void {
    this.getIndicatorElement().style.display = "none";
    this.getButtonElement().style.display = "";
  }
}

class WaitLogic {
  private simulatedWaitMs = 3000;
  private indicatorUpdateIntervalMs = 100;
  private indicatorPosition = 0;
  private waitInterval?: number;
  private waitTimeout?: number;

  constructor(private document: Document) {}

  initialize() {
    this.document.initialize();
    this.document.ButtonClicked.on(() => {
      this.buttonClicked();
    });
  }

  private start(date: Date) {
    this.document.startWait();
    return this.startTimer(date);
  }

  private buttonClicked() {
    let clickStartTime = new Date();
    this.start(clickStartTime)
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
        this.end();
      });
  }

  private startTimer(date: Date): Promise<Date> {
    return new Promise((resolve, reject) => {
      this.waitTimeout = setTimeout(() => {
        resolve(date);
      }, this.simulatedWaitMs);

      this.indicatorPosition = -1;
      this.waitInterval = setInterval(() => {
        this.moveIndicator();
      }, this.indicatorUpdateIntervalMs);
    });
  }

  private getIndicatorCharacterByPosition(position: number): string {
    switch (position) {
      case 0:
        return "/";
      case 1:
        return "--";
      case 2:
        return "\\";
      case 3:
        return "|";
      default:
        return "?";
    }
  }

  private moveIndicator() {
    this.indicatorPosition += 1;

    if (this.indicatorPosition > 3) {
      this.indicatorPosition = 0;
    }
    this.document.updateIndicator(
      this.getIndicatorCharacterByPosition(this.indicatorPosition)
    );
  }

  private end() {
    window.clearInterval(this.waitInterval);
    this.document.endWait();
  }
}

function LoadProject(): void {
  new WaitLogic(new Document()).initialize();
}

export { LoadProject as promise_waitIndicator_load };
