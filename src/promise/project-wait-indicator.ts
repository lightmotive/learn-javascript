import { WaitLogic } from "./WaitLogic";
import { WaitIndicatorText } from "./WaitIndicatorText";
import { WaitLogicSimulated, UserCanceledEvent } from "./WaitLogicSimulated";
import { DocumentWithButton } from "../DocumentWithButton";
import { DocumentWithButtonCentered } from "../DocumentWithButtonCentered";

class WaitIndicator implements Project {
  constructor(
    private document: DocumentWithButton,
    private waitLogic: WaitLogic<Date>
  ) {}

  render(): void {
    this.document.render();
    this.document.buttonClicked.on((button) => {
      this.buttonClicked(button);
    });
  }

  private buttonClicked(button: HTMLButtonElement | undefined) {
    if (!button) {
      return;
    }

    let buttonText = button.innerText;

    this.waitLogic
      .start(button)
      .then((data) => {
        this.buttonClickResolved(buttonText, data);
      })
      .catch((reason: any) => {
        this.buttonClickRejected(reason);
      })
      .finally(() => {
        this.waitLogic.end();
      });
  }

  private buttonClickResolved(buttonText: string, dateClicked: Date): void {
    console.log(`${buttonText} clicked.`);

    let elapsedSeconds = Math.round(
      (new Date().getTime() - dateClicked.getTime()) / 1000
    );

    setTimeout(() => {
      alert(
        `You've been breathing deeply for ${elapsedSeconds} seconds. Are you more relaxed?`
      );
    }, 0);
  }

  private buttonClickRejected(reason: any): void {
    if (reason instanceof Error) {
      alert(`Error: ${reason.message}`);
    } else if (reason instanceof UserCanceledEvent) {
      setTimeout(() => {
        alert(`${reason.message} Perhaps you can relax another time.`);
      }, 1);
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
