"use babel";
// @flow

import React from "react";
import PlanConfigPart from "./PlanConfigPart";
import { SSHConfigSchema } from "../Model/StagerConfigs";

export default class StagerConfig extends React.Component<
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
    let config = {
      type: "conditional",
      expression: {
        label: "stager",
        type: "enum",
        default: "integrated",
        enum: [
          { value: "integrated", description: "integrated" },
          { value: "local", description: "local" },
          { value: "remote", description: "remote" },
        ],
      },
      cases: {
        integrated: null,
        local: null,
        remote: {
          type: "object",
          label: "connection",
          schemas: {
            host: {
              type: "object",
              label: "host",
              schemas: {
                host: {
                  type: "string",
                  default: "127.0.0.1",
                  label: "host",
                },
                port: {
                  type: "number",
                  default: 22,
                  label: "port",
                },
              },
            },
            method: {
              type: "conditional",
              expression: {
                type: "enum",
                default: "ssh",
                enum: [{ value: "ssh", description: "ssh" }],
              },
              cases: {
                ssh: SSHConfigSchema,
              },
            },
          },
        },
      },
    };

    return (
      <div>
        <PlanConfigPart
          {...config}
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </div>
    );
  }
}

StagerConfig.defaultProps = {};

type DefaultProps = {};

type Props = {
  value: any,
  onChange(v: any): void,
};

type State = {};
