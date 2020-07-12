export interface WaitCancelable<T> {
  start(forElement: HTMLElement, waitMessageHTML: string): Promise<T>;
  cancel(e: UIEvent): void;
  end(): void;
}
