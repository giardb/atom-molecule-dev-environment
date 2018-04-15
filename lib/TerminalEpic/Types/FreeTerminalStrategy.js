"use babel";
// @flow

export type Shell = string;

export type FreeTerminalStrategyType = {
  type: "terminal",
  shell?: Shell,
  cwd: string,
  env?: { [key: string]: string },
};
