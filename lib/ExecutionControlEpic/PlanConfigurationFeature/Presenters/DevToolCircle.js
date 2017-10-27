"use babel";
// @flow

import * as React from "react";

export default class DevToolCircle extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          borderRadius: "50%",
          backgroundColor: this.props.color,
          height: "30px",
          width: "30px",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={this.props.iconUri}
          style={{
            height: "22px",
            width: "22px",
            margin: "0px",
            WebkitFilter: "brightness(0) invert(1)",
          }}
        />
      </div>
    );
  }
}

DevToolCircle.defaultProps = {};

type DefaultProps = {};

type Props = {
  color: string,
  iconUri: string,
};

type State = {};
