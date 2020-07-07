import { WaitLogic } from "./WaitLogic";
import { WaitIndicatorText } from "./WaitIndicatorText";
import { WaitLogicSimulated } from "./WaitLogicSimulated";
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

  private buttonClickResolved(buttonText: string, data: Date): void {
    let elapsedSeconds = Math.round(
      (new Date().getTime() - data.getTime()) / 5000
    );

    setTimeout(() => {
      alert(
        `Are you more relaxed? You clicked "${buttonText}" ${elapsedSeconds} seconds ago.`
      );
    }, 0);
  }

  private buttonClickRejected(reason: any): void {
    if (reason instanceof Error) {
      setTimeout(() => {
        alert(`${reason.message}. Perhaps you can relax another time?`);
      }, 1);
    }
  }
}

function LoadProject(): void {
  new WaitIndicator(
    new DocumentWithButtonCentered("Click and breathe..."),
    new WaitLogicSimulated(WaitIndicatorText)
  ).render();
}

export { LoadProject as promise_waitIndicator_load };
