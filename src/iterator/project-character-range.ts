import { DocumentWithButton } from "../document/DocumentWithButton";
import { DocumentWithButtonCentered } from "../document/DocumentWithButtonCentered";
import { CharacterRangeIterableIterator } from "./CharacterRangeIterableIterator";
import { CharacterWithCode } from "./CharacterIterator";

export class PrintCharacterRange implements Project {
  constructor(
    private document: DocumentWithButton,
    private charRange: IterableIterator<CharacterWithCode>
  ) {}

  render(): void {
    this.document.button.onclick = () => {
      this.printIteration();
    };
  }

  private printIteration(): void {
    this.document.button.style.display = "none";

    const container = this.createContainer();

    for (const value of this.charRange) {
      const span = document.createElement("span");
      span.innerText = value.char;
      container.appendChild(span);
    }
  }

  private createContainer(): HTMLDivElement {
    const container = document.createElement("div");
    container.style.display = "grid";
    container.style.width = "50%";
    container.style.textAlign = "center";
    container.style.marginTop = "1em";
    container.style.gridTemplateColumns = "repeat(auto-fit, minmax(3px, 1fr))";
    container.style.fontSize = ".5em";
    document.body.appendChild(container);
    return container;
  }
}

function LoadProject(): void {
  new PrintCharacterRange(
    new DocumentWithButtonCentered("Print A-Z, skip 2"),
    new CharacterRangeIterableIterator("A", "Z", 3)
  ).render();
}

export { LoadProject as iterator_basicIterator_load };
