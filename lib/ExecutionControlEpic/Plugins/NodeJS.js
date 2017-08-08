"use babel";
// @flow

import type { PlanConfig } from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";

export default {
  infos: {
    name: "nodejs",
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-nodejs.svg",
  },
  configSchema: {
    type: "object",
    schemas: {
      options: {
        label: "Options",
        type: "string",
        placeholder: "",
        default: "",
      },
      source: {
        label: "Source",
        type: "file",
        title: "source",
        placeholder: "",
        default: "-- Not Selected --",
        tester: (packagePath: string, dirname: string) =>
          path.basename(packagePath).endsWith(".js"),
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
  getStrategyForPlan(plan: PlanConfig) {
    let isOnShell = plan.config.source !== "-- Not Selected --";
    let cmd = `node ${plan.config.options} `;
    let env = process.env;

    if (isOnShell) cmd = cmd + plan.config.source;

    env = plan.config.environmentVariables.reduce(function(
      env: any,
      varDeclaration: string,
    ) {
      let split = varDeclaration.split("=");
      return { ...env, [split[0]]: split[1] };
    }, process.env);

    return {
      strategy: {
        type: isOnShell ? "shell" : "terminal",
        command: cmd,
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
