import { WaitLogic } from "./WaitLogic";
import { WaitIndicatorText } from "./WaitIndicatorText";
import { WaitLogicSimulated } from "./WaitLogicSimulated";
import { DocumentWithButton } from "../document/DocumentWithButton";
import { DocumentWithButtonCentered } from "../document/DocumentWithButtonCentered";
import { WaitIndicator } from "./project-wait-indicator";

export class WaitIndicatorAsyncAwait extends WaitIndicator {
  constructor(
    document: DocumentWithButton,
    waitLogic: WaitLogic<Date>,
    waitCompleteMessage = "Are you more relaxed and inspired?"
  ) {
    super(document, waitLogic, waitCompleteMessage);
  }

  async executeWaitLogic(
    button: HTMLButtonElement,
    buttonText: string
  ): Promise<void> {
    try {
      const data = await this.waitLogic.start(button, "Await inspiration...");
      this.buttonClickResolved(buttonText, data);
    } catch (reason) {
      this.buttonClickRejected(reason);
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
    new WaitLogicSimulated(WaitIndicatorText)
  ).render();
}

export { LoadProject as promise_waitIndicatorAsyncAwait_load };
