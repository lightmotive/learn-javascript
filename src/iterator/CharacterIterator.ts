export interface CharacterIteratorResult {
  char: string;
  charCode: number;
  step: number;
}
export class CharacterIterator implements Iterator<CharacterIteratorResult> {
  constructor(private start: string = "", private step: number = 1) {
    if (!start || start === "") {
      this.start = String.fromCharCode(0);
    }
    this.initializePointers();
  }

  private currentCharCode = 0;
  private initializePointers() {
    this.currentCharCode = this.getCharCode(this.start);
  }

  private getCharCode(char: string): number {
    return char.charCodeAt(0);
  }

  next(): IteratorResult<
    CharacterIteratorResult,
    CharacterIteratorResult | null
  > {
    if (this.currentCharCode <= 65535) {
      const value = {
        done: false,
        value: {
          char: String.fromCharCode(this.currentCharCode),
          charCode: this.currentCharCode,
          step: this.step,
        },
      };
      this.currentCharCode += this.step;
      return value;
    } else {
      return { done: true, value: null };
    }
  }
}
