"use babel";
// @flow

"use babel";
// @flow

import React from "react";
import classNames from "classnames";

export default class AddButton extends React.Component<
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
      <button
        onClick={this.props.onClick}
        style={{ margin: "10px 5px", alignSelf: "flex-end" }}
        className={classNames("btn", "icon", "icon-plus", {
          "btn-success": this.props.success,
        })}
      >
        {this.props.children}
      </button>
    );
  }
}

AddButton.defaultProps = {
  success: false,
};

type DefaultProps = {
  success: false,
};

type Props = {
  onClick(): void,
  children?: string,
  success: boolean,
};

type State = {};
