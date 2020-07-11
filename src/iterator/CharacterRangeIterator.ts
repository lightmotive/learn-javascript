export class CharacterRangeIterator implements IterableIterator<string> {
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
  }

  private currentCharCode = 0;
  private endCharCode = 0;
  private initializePointers() {
    this.currentCharCode = this.getCharCode(this.start);
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

  next(): IteratorResult<string> {
    if (this.currentCharCode <= this.endCharCode) {
      const value = {
        done: false,
        value: String.fromCharCode(this.currentCharCode),
      };
      this.currentCharCode += this.step;
      return value;
    } else {
      return { done: true, value: null };
    }
  }

  [Symbol.iterator](): IterableIterator<string> {
    return this;
  }
}
