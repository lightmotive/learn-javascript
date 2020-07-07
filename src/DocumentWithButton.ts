import { IEventLite } from "./EventLite";

export interface DocumentWithButton {
  render(): void;
  buttonClicked: IEventLite<HTMLButtonElement>;
}
