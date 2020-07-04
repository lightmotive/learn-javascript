const WaitLogic = class {
  constructor() {
    this.waitElementId = "wait-indicator";
    this.buttonElementId = "wait-button";
    this.simulatedWaitMs = 3000;
    this.indicatorUpdateIntervalMs = 100;
    this.indicatorPosition = 0;
    this.waitTimeout = null;
    this.waitInterval = null;
  }

  initializeDOM() {
    document.documentElement.style = "height: 100%; zoom: 500%";
    document.body.style =
      "height: 100%; display: flex; justify-content: center; align-items: center;";
    this.initializeIndicator();
    this.initializeButton();
  }

  initializeIndicator() {
    let div = document.createElement("div");
    div.id = this.waitElementId;
    div.style.display = "none";
    document.body.appendChild(div);
  }
  initializeButton() {
    let button = document.createElement("button");
    button.id = this.buttonElementId;
    button.innerHTML = "Try me!";
    button.onclick = () => {
      this.buttonClicked();
    };
    document.body.appendChild(button);
  }

  getIndicatorElement() {
    return document.getElementById(this.waitElementId);
  }
  getButtonElement() {
    return document.getElementById(this.buttonElementId);
  }

  buttonClicked() {
    let clickStartTime = new Date();
    this.start(clickStartTime)
      .then((data) => {
        let elapsedSeconds = parseInt(
          (new Date().getTime() - data.getTime()) / 1000,
          10
        );
        setTimeout(() => {
          alert(`You clicked the button ${elapsedSeconds} seconds ago.`);
        }, 0);
      })
      .catch((e) => {
        alert(e.message);
      })
      .finally(() => {
        this.end();
      });
  }

  start(data) {
    this.getIndicatorElement().style.display = "block";
    this.getButtonElement().style.display = "none";
    return this.startTimer(data);
  }

  startTimer(data) {
    return new Promise((resolve, reject) => {
      this.waitTimeout = setTimeout(() => {
        resolve(data);
      }, this.simulatedWaitMs);

      this.indicatorPosition = -1;
      this.waitInterval = setInterval(() => {
        this.moveIndicator();
      }, this.indicatorUpdateIntervalMs);
    });
  }

  getIndicatorCharacterByPosition(position) {
    switch (position) {
      case 0:
        return "/";
      case 1:
        return "--";
      case 2:
        return "\\";
      case 3:
        return "|";
    }
  }

  moveIndicator() {
    this.indicatorPosition += 1;

    if (this.indicatorPosition > 3) {
      this.indicatorPosition = 0;
    }
    this.updateIndicator(
      this.getIndicatorCharacterByPosition(this.indicatorPosition)
    );
  }

  updateIndicator(character) {
    this.getIndicatorElement().innerHTML = `<div>Simulated processing...</div><div>${character}</div>`;
  }

  end() {
    window.clearInterval(this.waitInterval);
    this.getIndicatorElement().style.display = "none";
    this.getButtonElement().style.display = "";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let waitInstance = new WaitLogic();
  waitInstance.initializeDOM();
});
