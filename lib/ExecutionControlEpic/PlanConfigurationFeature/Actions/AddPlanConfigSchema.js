'use babel'
// @flow

import type {ConfigSchemaPart} from "../../../types";
import type {DevToolInfos} from "../Types/types.js.flow";

export type AddPlanConfigSchemaAction = {
  type: "ADD_TARGET_CONFIGURATION_SCHEMA",
  payload: {
    tool: DevToolInfos,
    schema: ConfigSchemaPart,
  }
};

export function addPlanConfigSchema(tool: DevToolInfos, schema: ConfigSchemaPart): AddPlanConfigSchemaAction {
  return {
    type: "ADD_TARGET_CONFIGURATION_SCHEMA",
    payload: {
      schema,
      tool,
    }
  };
};