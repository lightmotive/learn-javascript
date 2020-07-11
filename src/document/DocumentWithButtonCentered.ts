import { EventLite, IEventLite } from "../event/EventLite";
import { DocumentWithButton } from "./DocumentWithButton";

export class DocumentWithButtonCentered implements DocumentWithButton {
  private buttonElement?: HTMLButtonElement;
  private readonly buttonClickedEvent = new EventLite<HTMLButtonElement>();

  constructor(private buttonInnerHTML: string = "Try me!") {}

  render(): void {
    this.initializeBody();
    this.initializeButton();
  }

  private initializeBody() {
    document.documentElement.style.height = "100%";
    document.documentElement.style.zoom = "500%";
    document.body.style.height = "100%";
    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
  }

  private initializeButton() {
    const button = document.createElement("button");
    button.innerHTML = this.buttonInnerHTML;

    document.body.appendChild(button);
    this.buttonElement = button;

    button.onclick = () => {
      this.buttonClickedEvent.trigger(this.buttonElement);
    };
  }

  public get buttonClicked(): IEventLite<HTMLButtonElement> {
    return this.buttonClickedEvent.expose();
  }
}
