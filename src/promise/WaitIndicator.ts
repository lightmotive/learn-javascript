export interface WaitIndicator {
  show(): void;
  progress(): void;
  hide(): void;
}
export interface WaitIndicatorConstructor {
  new (
    inPlaceOfElement: HTMLElement,
    waitMessageHTML: string,
    cancelCallback?: (e: UIEvent) => void
  ): WaitIndicator;
}
