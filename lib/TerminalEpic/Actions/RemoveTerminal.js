"use babel";
// @flow

export type RemoveTerminalAction = {
  type: "REMOVE_FREE_TERMINAL",
  payload: {
    id: string,
  },
};

export function removeFreeTerminal(id: string): RemoveTerminalAction {
  return {
    type: "REMOVE_FREE_TERMINAL",
    payload: {
      id: id,
    },
  };
}
