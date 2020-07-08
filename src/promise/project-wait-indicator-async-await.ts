import { WaitLogic } from "./WaitLogic";
import { WaitIndicatorText } from "./WaitIndicatorText";
import { WaitLogicSimulated } from "./WaitLogicSimulated";
import { DocumentWithButton } from "../DocumentWithButton";
import { DocumentWithButtonCentered } from "../DocumentWithButtonCentered";
import { WaitIndicator } from "./project-wait-indicator";

export class WaitIndicatorAsyncAwait extends WaitIndicator {
  constructor(
    document: DocumentWithButton,
    waitLogic: WaitLogic<Date>,
    waitCompleteMessage: any = "Are you more relaxed and inspired?"
  ) {
    super(document, waitLogic, waitCompleteMessage);
  }

  async executeWaitLogic(button: HTMLButtonElement, buttonText: string) {
    try {
      let data = await this.waitLogic.start(button, "Await inspiration...");
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
