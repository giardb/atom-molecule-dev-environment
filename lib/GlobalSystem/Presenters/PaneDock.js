"use babel";
// @flow

import * as React from "react";

export default class PaneDock extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{ flexDirection: "column", display: "flex" }}>
        {this.props.children}
      </div>
    );
  }
}

PaneDock.defaultProps = {};

type DefaultProps = {};

type Props = {
  children: React.Element<any>,
};

type State = {};
