"use babel";
// @flow

import React from "react";
import DevToolsWithDiagnostics from "../Containers/DevToolsWithDiagnostics";

export default class DevToolBar extends React.Component<
  DefaultProps,
  Props,
  State,
> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        className="dev-tool-bar-background-color"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          minHeight: "55px",
          overflowY: "visible",
          flexDirection: "column",
        }}
      >
        <div style={{ position: "relative", overflowY: "visible", zIndex: 10 }}>
          <DevToolsWithDiagnostics {...this.props} />
        </div>
      </div>
    );
  }
}

DevToolBar.defaultProps = {};

type DefaultProps = {};

type Props = {};

type State = {};
