import { IEventLite } from "../event/EventLite";

export interface DocumentWithButton {
  render(): void;
  buttonClicked: IEventLite<HTMLButtonElement>;
}
