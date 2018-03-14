"use babel";
// @flow

export type RemoveTerminalAction = {
  type: "REMOVE_FREE_TERMINAL",
  payload: {
    title: string,
  },
};

export function removeFreeTerminal(title: string): RemoveTerminalAction {
  return {
    type: "REMOVE_FREE_TERMINAL",
    payload: {
      title: title,
    },
  };
}
