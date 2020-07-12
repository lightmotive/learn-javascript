import { WaitCancelable } from "./WaitCancelable";
import { WaitIndicatorText } from "./WaitIndicatorText";
import {
  WaitCancelableSimulated,
  UserCanceledEvent,
} from "./WaitCancelableSimulated";
import { DocumentWithButton } from "../document/DocumentWithButton";
import { DocumentWithButtonCentered } from "../document/DocumentWithButtonCentered";

export class WaitIndicator implements Project {
  constructor(
    protected document: DocumentWithButton,
    protected waitLogic: WaitCancelable<Date>,
    protected waitCompleteMessage = "Are you more relaxed?"
  ) {}

  render(): void {
    this.document.button.onclick = () => {
      this.wait(this.document.button);
    };
  }

  protected wait(button: HTMLButtonElement): void {
    this.waitLogic
      .start(button, "There's always a little time to breathe...")
      .then((data) => {
        this.waitResolved(button.innerText, data);
      })
      .catch((reason) => {
        this.waitRejected(reason);
      })
      .finally(() => {
        this.waitLogic.end();
      });
  }

  protected waitResolved(buttonText: string, dateClicked: Date): void {
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

  protected waitRejected(reason: unknown): void {
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
    new WaitCancelableSimulated(WaitIndicatorText)
  ).render();
}

export { LoadProject as promise_waitIndicator_load };
