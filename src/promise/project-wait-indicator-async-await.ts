import { ActionAsyncUI } from "./ActionAsyncUI";
import { TextWaitIndicatorUI } from "./TextWaitIndicatorUI";
import { SimulatedWaitActionAsyncUI } from "./SimulatedWaitActionAsyncUI";
import { DocumentWithButton } from "../document/DocumentWithButton";
import { DocumentWithButtonCentered } from "../document/DocumentWithButtonCentered";
import { WaitIndicator } from "./project-wait-indicator";

export class WaitIndicatorAsyncAwait extends WaitIndicator {
  constructor(
    document: DocumentWithButton,
    actionAsyncUI: ActionAsyncUI<Date>,
    waitCompleteMessage = "Are you more relaxed and inspired?"
  ) {
    super(document, actionAsyncUI, waitCompleteMessage);
  }

  async wait(button: HTMLButtonElement): Promise<void> {
    try {
      const data = await this.actionAsyncUI.execute(
        button,
        "Await inspiration..."
      );
      this.waitResolved(button.innerText, data);
    } catch (reason) {
      this.waitRejected(reason);
    } finally {
      this.actionAsyncUI.finally();
    }
  }
}

function LoadProject(): void {
  new WaitIndicatorAsyncAwait(
    new DocumentWithButtonCentered(
      "Click, breathe deeply, and await relaxation..."
    ),
    new SimulatedWaitActionAsyncUI(TextWaitIndicatorUI)
  ).render();
}

export { LoadProject as promise_waitIndicatorAsyncAwait_load };
