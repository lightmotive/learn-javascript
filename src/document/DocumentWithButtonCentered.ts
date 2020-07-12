import { DocumentWithButton } from "./DocumentWithButton";

export class DocumentWithButtonCentered implements DocumentWithButton {
  constructor(buttonInnerHTML = "Try me!") {
    this.initializeBody();
    this.initializeButton(buttonInnerHTML);
  }

  private _buttonElement: HTMLButtonElement = document.createElement("button");
  public get button(): HTMLButtonElement {
    return this._buttonElement;
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

  private initializeButton(innerHTML: string) {
    this._buttonElement.innerHTML = innerHTML;
    document.body.appendChild(this._buttonElement);
  }
}
