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
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-react-native.svg",
  },
  configSchema: {
    type: "conditional",
    default: "start",
    expression: {
      type: "enum",
      label: "command",
      enum: [
        { value: "run", description: "run" },
        { value: "start", description: "start" },
        { value: "test", description: "test" },
      ],
    },
    cases: {
      run: {
        type: "object",
        schemas: {
          script: {
            type: "string",
            default: "",
            label: "script",
            placeholder: "script",
          },
          environmentVariables: {
            type: "array",
            label: "Environment Variables",
            items: {
              type: "string",
              label: "Variable",
              placeholder: "NAME=value",
            },
          },
        },
      },
      start: null,
      test: null,
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
      return {
      strategy: {
        type: "terminal",
        command: command,
        cwd: path.dirname(plan.packageInfos.path),
        env: env,
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
