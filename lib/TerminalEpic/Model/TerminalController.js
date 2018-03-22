"use babel";
// @flow

import type { FreeTerminalStrategyType } from "./FreeTerminalStrategy";

export default class FreeTerminalController {
  freeTerminalStrategy: Array<FreeTerminalStrategyType>;

  constructor() {
    this.freeTerminalStrategy = [];
  }

  addDevTool(freeterm: FreeTerminalStrategyType): void {
    this.freeTerminalStrategy.push(freeterm);
  }

  getStrategy(): ?FreeTerminalStrategyType {}

  getView(toolID: string): any {}
}

export let FreeTerminalControllerInstance = new FreeTerminalController();
