"use babel";
// @flow

export type AddTerminalInitializedAction = {
  type: "ADD_FREE_TERMINAL",
  payload: {
    strategy: FreeTerminalStrategyType,
    id: string,
  },
};

export function addFreeTerminal(id:string, strategy: FreeTerminalStrategyType): AddTerminalInitializedAction {
  return {
    type: "ADD_FREE_TERMINAL",
    payload: {
      strategy,
      id,
    },
  };
}
