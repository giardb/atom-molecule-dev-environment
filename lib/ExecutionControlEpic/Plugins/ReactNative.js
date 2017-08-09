"use babel";
// @flow

import type { PlanConfig } from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";

export default {
  infos: {
    name: "react-native",
    iconUri:
      "atom://molecule-dev-environment/.storybook/public/devtool-icon-react-native.svg",
  },
  configSchema: {
    type: "conditional",
    default: "start",
    expression: {
      type: "enum",
      label: "command",
      enum: [
        { value: "start", description: "start" },
        { value: "run_android", description: "run-android" },
        { value: "run_ios", description: "run-ios" },
        { value: "install", description: "install" },
      ],
    },
    cases: {
      start: {
        type: "object",
        schemas: {
          port: {
            type: "number",
            default: "",
            label: "Port",
            placeholder: "4200",
          },
        },
      },
      run_android: {
        type: "object",
        schemas: {
          options: {
            type: "string",
            default: "",
            label: "Options",
            placeholder: "--deviceId [string]...",
          },
        },
      },
      run_ios: {
        type: "object",
        schemas: {
          options: {
            type: "string",
            default: "",
            label: "Options",
            placeholder: '--simulator "iPhone 7"...',
          },
        },
      },
      install: {
        type: "object",
        schemas: {
          package: {
            type: "string",
            default: "",
            label: "Package",
            placeholder: "",
          },
        },
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
    let cmd;

    if (plan.config.expressionValue === "start") {
      cmd = "react-native start";
      if (plan.config.expressionValue.port !== "")
        cmd += ` --port ${plan.config.caseValue.port}`;
    } else if (plan.config.expressionValue === "run_android") {
      cmd = `react-native run-android ${plan.config.caseValue.options}`;
    } else if (plan.config.expressionValue === "run_ios") {
      cmd = `react-native run-ios ${plan.config.caseValue.options}`;
    } else if (plan.config.expressionValue === "install") {
      cmd = `react-native install ${plan.config.caseValue.package}`;
    }
    return {
      strategy: {
        type: "terminal",
        command: cmd,
        cwd: path.dirname(plan.packageInfos.path),
      },
      controller: {
        onData(data: string, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics([
            {
              type: "info",
              message: {
                text: helperAPI.outputToHTML(data.toString()),
                html: true,
              },
              date: moment().unix(),
            },
          ]);
        },
        onError(err: any, taskAPI: TaskAPI, helperAPI: HelperApi): void {
          taskAPI.addDiagnostics([
            {
              type: "error",
              message: {
                data: err,
              },
              date: moment().unix(),
            },
          ]);
        },
      },
    };
  },
  isPackage: "package.json",
};
