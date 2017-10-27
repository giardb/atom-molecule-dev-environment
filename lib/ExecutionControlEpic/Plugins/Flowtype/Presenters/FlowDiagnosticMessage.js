"use babel";
// @flow

import * as React from "react";
import Radium from "radium";
import FlowDiagnosticMessageLoc from "./FlowDiagnosticMessageLoc";
import FlowDiagnosticMessageDetails from "./FlowDiagnosticMessageDetails";
import FlowDiagnosticMessageContext from "./FlowDiagnosticMessageContext";
import type { FlowLogMessage } from "../Types/types.flow";

export class FlowDiagnosticMessage extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.message.type == "Blame" && !this.props.message.context ? (
          <span style={{ color: "#fff", fontSize: "16px" }}>
            {this.props.message.descr}
          </span>
        ) : (
          false
        )}
        {this.props.message.type == "Blame" && this.props.message.context ? (
          <div>
            <FlowDiagnosticMessageLoc
              path={this.props.message.path}
              line={this.props.message.line}
            />
            <FlowDiagnosticMessageContext
              context={this.props.message.context}
              loc={this.props.message.loc}
            />
            <br />
            <FlowDiagnosticMessageDetails
              descr={this.props.message.descr}
              comment={this.props.message.comment}
            />
          </div>
        ) : (
          false
        )}
      </div>
    );
  }
}

FlowDiagnosticMessage.defaultProps = {};

type DefaultProps = {};

type Props = {
  message: FlowLogMessage,
  comment?: FlowLogMessage,
};

type State = {};

export default Radium(FlowDiagnosticMessage);
