"use babel";
// @flow

export type SetShellFreeTerminalAction = {
  type: "SET_SHELL_FREE_TERMINAL",
  payload: {
    title: string,
    shell: string,
  },
};

export function addFreeTerminal(
  title: string,
  shell: string,
): SetShellFreeTerminalAction {
  return {
    type: "SET_SHELL_FREE_TERMINAL",
    payload: {
      title: title,
      shell: shell,
    },
  };
}
