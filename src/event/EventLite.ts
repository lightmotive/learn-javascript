import { IEventLite } from "./IEventLite";

export class EventLite<T> implements IEventLite<T> {
  private handlers: { (data?: T): void }[] = [];

  on(handler: { (data?: T): void }): void {
    this.handlers.push(handler);
  }

  off(handler: { (data?: T): void }): void {
    this.handlers = this.handlers.filter((h) => {
      return h !== handler;
    });
  }

  trigger(data?: T): void {
    this.handlers.forEach((h) => h(data));
  }

  expose(): IEventLite<T> {
    return this;
  }
}
