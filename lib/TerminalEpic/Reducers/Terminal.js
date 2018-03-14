"use babel";
// @flow

import type { DevTool } from "../Types/types.js.flow";
import { Map } from "immutable";

export default function(
  state: TerminalsInfoReducer = Map(),
  action: any,
): TerminalsInfoReducer {
  switch (action.type) {
    case "ADD_TERMINAL":
      return state.set(action.payload.id, action.payload);
    case "REMOVE_TERMINAL":
      return state.delete(action.payload.id, action.payload);
    default:
      return state;
  }
}

export type TerminalsInfoReducer = Map<string, TerminalStrategyType>;
