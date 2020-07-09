import { WaitLogic } from "./WaitLogic";
import { WaitIndicatorText } from "./WaitIndicatorText";
import { WaitLogicSimulated, UserCanceledEvent } from "./WaitLogicSimulated";
import { DocumentWithButton } from "../DocumentWithButton";
import { DocumentWithButtonCentered } from "../DocumentWithButtonCentered";

export class WaitIndicator implements Project {
  constructor(
    protected document: DocumentWithButton,
    protected waitLogic: WaitLogic<Date>,
    protected waitCompleteMessage = "Are you more relaxed?"
  ) {}

  render(): void {
    this.document.render();
    this.document.buttonClicked.on((button) => {
      this.buttonClicked(button);
    });
  }

  protected executeWaitLogic(
    button: HTMLButtonElement,
    buttonText: string
  ): void {
    this.waitLogic
      .start(button, "There's always a little time to breathe...")
      .then((data) => {
        this.buttonClickResolved(buttonText, data);
      })
      .catch((reason) => {
        this.buttonClickRejected(reason);
      })
      .finally(() => {
        this.waitLogic.end();
      });
  }

  protected buttonClicked(button: HTMLButtonElement | undefined): void {
    if (!button) {
      return;
    }

    this.executeWaitLogic(button, button.innerText);
  }

  protected buttonClickResolved(buttonText: string, dateClicked: Date): void {
    console.log(`${buttonText} clicked.`);

    const elapsedSeconds = Math.round(
      (new Date().getTime() - dateClicked.getTime()) / 1000
    );

    setTimeout(() => {
      alert(
        `You've been breathing deeply for ${elapsedSeconds} seconds. ${this.waitCompleteMessage}`
      );
    }, 0);
  }

  protected buttonClickRejected(reason: unknown): void {
    if (reason instanceof Error) {
      alert(`Error: ${reason.message}`);
    } else if (reason instanceof UserCanceledEvent) {
      setTimeout(() => {
        alert(`${reason.message} Perhaps you can relax another time.`);
      }, 1);
    } else {
      alert(reason);
    }
  }
}

function LoadProject(): void {
  new WaitIndicator(
    new DocumentWithButtonCentered("Click and breathe deeply..."),
    new WaitLogicSimulated(WaitIndicatorText)
  ).render();
}

export { LoadProject as promise_waitIndicator_load };
