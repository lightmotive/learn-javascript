export interface ActionAsyncUI<T> {
  execute(forElement: HTMLElement, waitMessageHTML: string): Promise<T>;
  cancel(e: UIEvent): void;
  finally(): void;
}
