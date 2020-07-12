import { WaitCancelable } from "./WaitCancelable";
import { WaitIndicatorText } from "./WaitIndicatorText";
import { WaitCancelableSimulated } from "./WaitCancelableSimulated";
import { DocumentWithButton } from "../document/DocumentWithButton";
import { DocumentWithButtonCentered } from "../document/DocumentWithButtonCentered";
import { WaitIndicator } from "./project-wait-indicator";

export class WaitIndicatorAsyncAwait extends WaitIndicator {
  constructor(
    document: DocumentWithButton,
    waitLogic: WaitCancelable<Date>,
    waitCompleteMessage = "Are you more relaxed and inspired?"
  ) {
    super(document, waitLogic, waitCompleteMessage);
  }

  async wait(button: HTMLButtonElement): Promise<void> {
    try {
      const data = await this.waitLogic.start(button, "Await inspiration...");
      this.waitResolved(button.innerText, data);
    } catch (reason) {
      this.waitRejected(reason);
    } finally {
      this.waitLogic.end();
    }
  }
}

function LoadProject(): void {
  new WaitIndicatorAsyncAwait(
    new DocumentWithButtonCentered(
      "Click, breathe deeply, and await relaxation..."
    ),
    new WaitCancelableSimulated(WaitIndicatorText)
  ).render();
}

export { LoadProject as promise_waitIndicatorAsyncAwait_load };
