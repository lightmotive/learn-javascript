import { DocumentWithButton } from "../document/DocumentWithButton";
import { DocumentWithButtonCentered } from "../document/DocumentWithButtonCentered";
import { CharacterRangeIterableIterator } from "./CharacterRangeIterableIterator";
import {
  CharacterIteratorResult,
  CharacterIterator,
} from "./CharacterIterator";
import { CharacterPrinterWithNext } from "./CharacterPrinterWithNextButton";
import { CharacterPrinterAll } from "./CharacterPrinter";

export class PrintCharacterRange implements Project {
  protected charContainer: HTMLDivElement;
  protected charPrinter: CharacterPrinterAll;
  constructor(
    private document: DocumentWithButton,
    private charRange: IterableIterator<CharacterIteratorResult>
  ) {
    this.charContainer = this.createCharacterContainer();
    this.charPrinter = new CharacterPrinterWithNext(this.charContainer);
  }

  render(): void {
    document.body.style.flexDirection = "row";
    this.document.button.onclick = () => {
      this.printCharRange();
    };
  }

  private printCharRange(): void {
    this.document.button.style.display = "none";
    const lastValue = this.charPrinter.printRange(this.charRange);
    this.charContainer.style.display = "grid";
    this.initializeNextButton(lastValue);
  }

  private createCharacterContainer(): HTMLDivElement {
    const container = document.createElement("div");
    container.style.display = "none";
    container.style.gridGap = ".1em";
    container.style.width = "50%";
    container.style.maxHeight = "60%";
    container.style.overflowY = "auto";
    container.style.overflowX = "hidden";
    container.style.textAlign = "center";
    container.style.marginTop = "1em";
    container.style.gridTemplateColumns = "repeat(auto-fit, minmax(2em, 1fr))";
    container.style.fontSize = ".5em";
    document.body.appendChild(container);
    return container;
  }

  private initializeNextButton(lastValue: CharacterIteratorResult | null) {
    const iterateButton = this.createNextButton(lastValue);
    if (iterateButton) {
      this.charContainer.insertAdjacentElement("beforebegin", iterateButton);
    }
  }

  private createNextButton(
    lastValue: CharacterIteratorResult | null
  ): HTMLButtonElement | undefined {
    if (!lastValue) {
      return undefined;
    }

    const button = document.createElement("button");
    button.innerText = "Print another 10";
    const charIterator = new CharacterIterator(lastValue.char, lastValue.step);
    charIterator.next(); //Discard lastChar to continue printing
    button.onclick = () => {
      window.setTimeout(() => {
        for (let index = 0; index < 10; index++) {
          const next = charIterator.next();
          if (next.done) {
            button.style.display = "none";
            break;
          }
          this.charPrinter.printNext(charIterator.next());
        }
      }, 0);
    };
    return button;
  }
}

function LoadProject(): void {
  new PrintCharacterRange(
    new DocumentWithButtonCentered("Print first 95 printable characters"),
    new CharacterRangeIterableIterator(" ", "~", 1)
  ).render();
}

export { LoadProject as iterator_basicIterator_load };
