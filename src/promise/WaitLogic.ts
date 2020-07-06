export interface WaitLogic<T> {
  start(forElement: HTMLElement): Promise<T>;
  cancel(e: UIEvent): void;
  end(): void;
}
