export type CharacterWithCode = {
  char: string;
  charCode: number;
};
export class CharacterIterator implements Iterator<CharacterWithCode> {
  constructor(private start: string = "", private step: number = 1) {
    if (start === "") {
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

  next(): IteratorResult<CharacterWithCode, CharacterWithCode | null> {
    if (this.currentCharCode <= 65535) {
      const value = {
        done: false,
        value: {
          char: String.fromCharCode(this.currentCharCode),
          charCode: this.currentCharCode,
        },
      };
      this.currentCharCode += this.step;
      return value;
    } else {
      return { done: true, value: null };
    }
  }
}
