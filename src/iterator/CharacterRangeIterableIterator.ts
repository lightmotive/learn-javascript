import { CharacterIterator, CharacterWithCode } from "./CharacterIterator";

export class CharacterRangeIterableIterator
  implements IterableIterator<CharacterWithCode> {
  private characterIterator: CharacterIterator;

  constructor(
    private start: string,
    private end: string,
    private step: number = 1
  ) {
    if (start.length !== 1 || end.length !== 1) {
      throw new Error("start and end must be single characters");
    }

    this.checkSwapStartAndEnd();
    this.initializePointers();

    this.characterIterator = new CharacterIterator(this.start, this.step);
  }

  private endCharCode = 0;
  private initializePointers() {
    this.endCharCode = this.getCharCode(this.end);
  }

  private getCharCode(char: string): number {
    return char.charCodeAt(0);
  }
  /**
   * Automatically swap start and end if specified start comes after end.
   */
  private checkSwapStartAndEnd(): void {
    if (this.getCharCode(this.start) <= this.getCharCode(this.end)) {
      return;
    }
    const _startOriginal = this.start;
    this.start = this.end;
    this.end = _startOriginal;
  }

  next(): IteratorResult<CharacterWithCode, CharacterWithCode | null> {
    const next = this.characterIterator.next();

    if (next.done) {
      return next;
    }

    if (next.value.charCode <= this.endCharCode) {
      return next;
    } else {
      return { done: true, value: null };
    }
  }

  [Symbol.iterator](): IterableIterator<CharacterWithCode> {
    return this;
  }
}
