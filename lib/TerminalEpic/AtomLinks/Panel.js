"use babel";
// @flow

import * as React from "react";
import { Provider } from "react-redux";
import store from "../../GlobalSystem/Store";
import ReactDOM from "react-dom";
import { StyleRoot } from "radium";
import FreeTerminal from "../Presenters/Terminal";
import Terminal from "xterm";

function getTerminalPanelURI(terminalId: string): string {
  return `atom://terminal-${terminalId}`;
}

export function renderTerminal(terminalId: string): void {
  var xtermInstance = new Terminal({ cursorBlink: true });
  const mountingPoint = document.createElement("div");
  mountingPoint.style.alignItems = "stretch";
  mountingPoint.style.flex = "1";
  mountingPoint.style.height = "100%";
  mountingPoint.className = "flex";
  ReactDOM.render(
    <Provider store={store}>
      <StyleRoot style={{ display: "flex", alignItems: "stretch", flex: "1" }}>
        <FreeTerminal xtermInstance={xtermInstance} />
      </StyleRoot>
    </Provider>,
    mountingPoint,
  );
  const paneItem = {
    element: mountingPoint,
    getTitle() {
      return "Terminal Title";
    },
    getDefaultLocation() {
      return "bottom";
    },
    getURI() {
      return getTerminalPanelURI(terminalId);
    },
  };
  global.atom.workspace.open(paneItem);
}
