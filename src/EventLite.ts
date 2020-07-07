export interface IEventLite<T> {
  on(handler: { (data?: T): void }): void;
  off(handler: { (data?: T): void }): void;
}
export class EventLite<T> implements IEventLite<T> {
  private handlers: { (data?: T): void }[] = [];

  public on(handler: { (data?: T): void }): void {
    this.handlers.push(handler);
  }

  public off(handler: { (data?: T): void }): void {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  public trigger(data?: T) {
    this.handlers.forEach((h) => h(data));
  }

  public expose(): IEventLite<T> {
    return this;
  }
}
