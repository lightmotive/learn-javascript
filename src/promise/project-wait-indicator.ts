import { Event } from "../Event";
import { WaitLogic } from "./WaitLogic";
import { WaitIndicatorText } from "./WaitIndicatorText";
import { WaitLogicSimulated } from "./WaitLogicSimulated";

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
  new ProjectDocument(new WaitLogicSimulated(WaitIndicatorText)).initialize();
}

export { LoadProject as promise_waitIndicator_load };
