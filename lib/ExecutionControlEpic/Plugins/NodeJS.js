"use babel";
// @flow

import type {
  PlanConfig,
} from "../PlanConfigurationFeature/Types/types.js.flow";
import type { TaskAPI } from "../DevtoolLoadingFeature/Types/types.js.flow";
import moment from "moment";
import path from "path";
import type { HelperApi } from "../TaskExecutionFeature/Model/HelperApi";

export default {
  infos: {
    name: "nodejs",
    iconUri: "atom://molecule-dev-environment/.storybook/public/devtool-icon-eslint.svg",
  },
  configSchema: {
    type: "object",
    schemas: {
      source: {
        type: "file",
        title: "source",
        placeholder: "",
        default: "-- Not Selected --",
        tester: (filePath: string, dirname: string) =>
          path.basename(filePath).endsWith(".js"),
      },
    },
  },
  getStrategyForPlan(plan: PlanConfig) {
    let cmd = `node ${plan.config.source !== "-- Not Selected --" ? plan.config.source : ""}`;
    return {
      strategy: {
        type: plan.config.source !== "-- Not Selected --"
          ? "shell"
          : "terminal",
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
