export interface WaitIndicator {
  show(): void;
  progress(): void;
  hide(): void;
}
export interface WaitIndicatorConstructor {
  new (
    inPlaceOfElement: HTMLElement,
    cancelCallback?: (e: UIEvent) => void
  ): WaitIndicator;
}
