"use babel";
// @flow

import type { FreeTerminalStrategyType } from "../Types/FreeTerminalStrategy";
import { Map } from "immutable";

export default class FreeTerminalController {
  freeTerminalStrategy: Map<number, FreeTerminalStrategyType>;

  constructor() {
    this.freeTerminalStrategy = Map();
  }

  addTerminal(id: number, freeterm: FreeTerminalStrategyType): void {
    this.freeTerminalStrategy.set(id, freeterm);
  }

  getStrategyFromId(id: number): ?FreeTerminalStrategyType {
    return this.freeTerminalStrategy.get(id);
  }

  getView(toolID: string): any {}
}

export let FreeTerminalControllerInstance = new FreeTerminalController();
