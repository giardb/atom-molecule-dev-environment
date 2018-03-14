"use babel";
// @flow

export type AddTerminalInitializedAction = {
  type: "ADD_FREE_TERMINAL",
  payload: {
    title: string,
    cwd: string,
    shell: string,
  },
};

export function addFreeTerminal(title: string, cwd: string, shell: string): AddTerminalInitializedAction {
  return {
    type: "ADD_FREE_TERMINAL",
    payload: {
      title: title,
      cwd: cwd,
      shell: shell,
    },
  };
}
