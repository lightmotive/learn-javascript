import { CharacterIteratorResult } from "./CharacterIterator";
import { CharacterPrinterAll } from "./CharacterPrinter";

export class CharacterPrinterWithNext implements CharacterPrinterAll {
  constructor(private container: HTMLElement) {}

  private printCount = 0;
  print(value: CharacterIteratorResult | null): CharacterIteratorResult | null {
    if (!value) {
      return null;
    }
    const element = document.createElement("span");
    element.innerHTML = `&#${value.charCode};`;
    this.container.appendChild(element);
    this.container.scrollTop = this.container.scrollHeight;
    this.printCount++;
    return value;
  }

  printRange(
    charRange: IterableIterator<CharacterIteratorResult>
  ): CharacterIteratorResult | null {
    let lastValue: CharacterIteratorResult | null = null;
    for (const value of charRange) {
      this.print(value);
      lastValue = value;
    }
    return lastValue;
  }

  printNext(
    next: IteratorResult<
      CharacterIteratorResult,
      CharacterIteratorResult | null
    >
  ): CharacterIteratorResult | null {
    if (next.done) {
      return null;
    }
    return this.print(next.value);
  }
}
