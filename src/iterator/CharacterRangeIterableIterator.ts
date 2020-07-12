import {
  CharacterIterator,
  CharacterIteratorResult,
} from "./CharacterIterator";

export class CharacterRangeIterableIterator
  implements IterableIterator<CharacterIteratorResult> {
  private characterIterator: CharacterIterator;

  constructor(
    private start: string,
    private end: string,
    private step: number = 1
  ) {
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
    if (this.start === "") {
      this.start = String.fromCharCode(0);
    }
    if (this.getCharCode(this.start) <= this.getCharCode(this.end)) {
      return;
    }
    const _startOriginal = this.start;
    this.start = this.end;
    this.end = _startOriginal;
  }

  next(): IteratorResult<
    CharacterIteratorResult,
    CharacterIteratorResult | null
  > {
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

  [Symbol.iterator](): IterableIterator<CharacterIteratorResult> {
    return this;
  }
}
