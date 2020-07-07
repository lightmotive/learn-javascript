import { WaitIndicator } from "./WaitIndicator";

export class WaitIndicatorText implements WaitIndicator {
  constructor(
    private inPlaceOfElement: HTMLElement,
    private waitMessageHTML: string,
    private cancelCallback?: (e: UIEvent) => void
  ) {}

  private inPlaceOfElementDisplayBeforeHide: string = "block";
  private waitElement?: HTMLDivElement;
  private waitMessageElement?: HTMLSpanElement;
  private waitIndicatorElement?: HTMLDivElement;
  private indicatorPosition = 0;

  private createWaitElement(): HTMLElement {
    let waitElement = document.createElement("div");
    waitElement.appendChild(this.createWaitMessageElement());
    if (this.cancelCallback) {
      waitElement.appendChild(this.createWaitCancelElement());
    }
    waitElement.appendChild(this.createWaitIndicatorElement());
    this.waitElement = waitElement;
    return waitElement;
  }

  private createWaitMessageElement(): HTMLSpanElement {
    let waitMessageElement = document.createElement("span");
    waitMessageElement.innerHTML = this.waitMessageHTML;
    this.waitMessageElement = waitMessageElement;
    return waitMessageElement;
  }

  private createWaitIndicatorElement(): HTMLDivElement {
    let waitIndicatorElement = document.createElement("div");
    waitIndicatorElement.style.width = "100%";
    waitIndicatorElement.style.textAlign = "center";
    waitIndicatorElement.innerHTML = this.getIndicatorHtml();

    this.waitIndicatorElement = waitIndicatorElement;
    return waitIndicatorElement;
  }

  private createWaitCancelElement(): HTMLButtonElement {
    let cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.style.marginLeft = "10px";
    cancelButton.onclick = (e) => {
      if (!this.cancelCallback) {
        return false;
      }
      this.cancelCallback(e);
      return true;
    };
    return cancelButton;
  }

  show(): void {
    this.inPlaceOfElementDisplayBeforeHide = this.inPlaceOfElement.style.display;
    this.inPlaceOfElement.style.display = "none";

    let parentNode = this.inPlaceOfElement.parentNode;
    if (!parentNode) {
      return;
    }

    parentNode.insertBefore(this.createWaitElement(), this.inPlaceOfElement);
  }

  private getIndicatorHtml(): string {
    switch (this.indicatorPosition) {
      case 0:
        return "/";
      case 1:
        return "&mdash;";
      case 2:
        return "\\";
      case 3:
        return "|";
      default:
        return "?";
    }
  }

  progress(): void {
    if (!this.waitIndicatorElement) {
      return;
    }

    this.indicatorPosition += 1;
    if (this.indicatorPosition > 3) {
      this.indicatorPosition = 0;
    }

    this.waitIndicatorElement.innerHTML = this.getIndicatorHtml();
  }

  hide(): void {
    if (this.inPlaceOfElement) {
      this.inPlaceOfElement.style.display = this.inPlaceOfElementDisplayBeforeHide;
    }
    if (this.waitElement) {
      this.waitElement.remove();
    }
  }
}
