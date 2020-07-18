export interface WaitIndicatorUI {
  show(): void;
  progress(): void;
  hide(): void;
}
export interface WaitIndicatorUIConstructor {
  new (
    inPlaceOfElement: HTMLElement,
    waitMessageHTML: string,
    cancelCallback?: (e: UIEvent) => void
  ): WaitIndicatorUI;
}
