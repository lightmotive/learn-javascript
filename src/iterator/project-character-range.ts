import { DocumentWithButton } from "../document/DocumentWithButton";
import { DocumentWithButtonCentered } from "../document/DocumentWithButtonCentered";
import { CharacterRangeIterableIterator } from "./CharacterRangeIterableIterator";
import { CharacterWithCode, CharacterIterator } from "./CharacterIterator";

export class PrintCharacterRange implements Project {
  constructor(
    private document: DocumentWithButton,
    private charRange: IterableIterator<CharacterWithCode>
  ) {}

  render(): void {
    document.body.style.flexDirection = "row";
    this.document.button.onclick = () => {
      this.printIteration();
    };
  }

  private printIteration(): void {
    this.document.button.style.display = "none";

    const container = this.createContainer();
    const lastValue = this.printRange(container);
    this.checkLastValue(lastValue, container);
  }

  private createContainer(): HTMLDivElement {
    const container = document.createElement("div");
    container.style.display = "grid";
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

  private createIterateButton(
    lastValue: CharacterWithCode | null,
    container: HTMLDivElement
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
          if (!this.printNext(charIterator.next(), container, button)) {
            break;
          }
        }
      }, 0);
    };
    return button;
  }

  private checkLastValue(
    lastValue: CharacterWithCode | null,
    container: HTMLDivElement
  ) {
    const iterateButton = this.createIterateButton(lastValue, container);
    if (iterateButton) {
      container.insertAdjacentElement("beforebegin", iterateButton);
    }
  }

  private printRange(container: HTMLDivElement): CharacterWithCode | null {
    let lastValue: CharacterWithCode | null = null;
    for (const value of this.charRange) {
      this.printCharacter(value, container);
      lastValue = value;
    }
    return lastValue;
  }

  private printCount = 0;
  private printCharacter(
    value: CharacterWithCode | null,
    container: HTMLDivElement
  ): CharacterWithCode | null {
    if (!value) {
      return null;
    }
    const element = document.createElement("span");
    element.innerHTML = `&#${value.charCode};`;
    container.appendChild(element);
    container.scrollTop = container.scrollHeight;
    this.printCount++;
    return value;
  }

  private printNext(
    next: IteratorResult<CharacterWithCode, CharacterWithCode | null>,
    container: HTMLDivElement,
    printNextButton: HTMLButtonElement
  ): CharacterWithCode | null {
    if (next.done) {
      printNextButton.style.display = "none";
      return null;
    }
    return this.printCharacter(next.value, container);
  }
}

function LoadProject(): void {
  new PrintCharacterRange(
    new DocumentWithButtonCentered("Print first 95 printable characters"),
    new CharacterRangeIterableIterator(" ", "~", 1)
  ).render();
}

export { LoadProject as iterator_basicIterator_load };
