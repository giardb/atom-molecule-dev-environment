"use babel";
// @flow

import type { ProvidedDevTool } from "../Types/types.js.flow";
import type { HelperApi } from "../../TaskExecutionFeature/Model/HelperApi";
import type { PlanConfig } from "../../PlanConfigurationFeature/Types/types.js.flow";
import type {
  Controller,
  Strategy,
} from "../../TaskExecutionFeature/Types/types.js.flow";
import type { Plugin as PackagesPlugin } from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";

export default class DevToolsController {
  devtools: Array<ProvidedDevTool>;
  constructor() {
    this.devtools = [];
  }

  addDevTool(devtool: ProvidedDevTool): void {
    this.devtools.push(devtool);
  }

  getStrategy(
    plan: PlanConfig,
    helperAPI: HelperApi,
  ): ?{ strategy: Strategy, controller: Controller } {
    let devtool = this.devtools.find(d => d.infos.id == plan.tool.id);
    if (devtool) {
      return devtool.getStrategyForPlan(plan, helperAPI);
    }
  }

  getPackagesPlugins(): Array<PackagesPlugin> {
    return this.devtools.map(devtool => ({
      tool: devtool.infos,
      isPackage: devtool.isPackage,
    }));
  }
}

export let DevToolsControllerInstance = new DevToolsController();
