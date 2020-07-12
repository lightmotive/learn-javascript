import { CharacterIteratorResult } from "./CharacterIterator";

export interface CharacterPrinter {
  print(value: CharacterIteratorResult | null): CharacterIteratorResult | null;
}

export interface CharacterPrinterRange extends CharacterPrinter {
  printRange(
    charRange: IterableIterator<CharacterIteratorResult>
  ): CharacterIteratorResult | null;
}

export interface CharacterPrinterNext extends CharacterPrinter {
  printNext(
    next: IteratorResult<
      CharacterIteratorResult,
      CharacterIteratorResult | null
    >
  ): CharacterIteratorResult | null;
}

export interface CharacterPrinterAll
  extends CharacterPrinter,
    CharacterPrinterRange,
    CharacterPrinterNext {}
