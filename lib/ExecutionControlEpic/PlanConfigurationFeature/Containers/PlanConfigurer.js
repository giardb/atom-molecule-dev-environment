"use babel";
// @flow

import { connect } from "react-redux";
import PlanConfigurer from "../Presenters/PlanConfigurer";
import type { State } from "../../../GlobalSystem/types.js.flow";
import { selectConfigSchemaOfTool } from "../Selectors/PlanConfigSchemas";
import type { DevToolPlanConfigSchema, Stager } from "../Types/types.js.flow";
import {
  selectPackagesReducer,
  selectPlansSchemaReducer,
} from "../../../GlobalSystem/Selectors";
import { addPlanConfig } from "../Actions/AddPlanConfig";
import type {
  Package,
  PackageInfos,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import { selectPackagesOfTool } from "../../../ProjectSystemEpic/PackageFeature/Selectors/Packages";
import { compose, withState, lifecycle, withProps } from "recompose";
import {
  FormController,
  StateDispatcher,
  convertConversionModelToConversionJobs,
  convertIn,
  convertOut,
  composeValidation,
  validateModel,
  notEmpty,
  // $FlowFixMe
} from "react-forms-state";
import { getDefault } from "../Model/PlanConfigManipulators";

export function mapStateToProps(
  state: State,
  { toolId }: { toolId: string },
): { config: DevToolPlanConfigSchema, packages: Array<Package> } {
  return {
    config: selectConfigSchemaOfTool(selectPlansSchemaReducer(state), toolId),
    packages: selectPackagesOfTool(selectPackagesReducer(state), toolId),
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
  ownProps: { toolId: string, toolIconUri: string, toolName: string },
): {
  onAddPlan: (plan: {
    name: string,
    config: mixed,
    stager: Stager,
    packageInfos: PackageInfos,
  }) => void,
} {
  return {
    onAddPlan: (plan: {
      name: string,
      config: mixed,
      stager: Stager,
      packageInfos: PackageInfos,
    }) => {
      dispatch(
        addPlanConfig(
          plan.name,
          {
            name: ownProps.toolName,
            id: ownProps.toolId,
            iconUri: ownProps.toolIconUri,
          },
          plan.config,
          plan.stager,
          plan.packageInfos,
        ),
      );
    },
  };
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

function convertsConfigSchemaToFormModel(
  value,
  props,
  configSchema,
  context = {},
) {
  if (configSchema == null) return undefined;
  switch (configSchema.type) {
    case "array":
      return {
        out: context.fieldName,
        validate: configSchema.validate,
        convertIn: array =>
          array.reduce((red, v, i) => ({ ...red, [i]: v }), {}),
        convertOut: map =>
          Object.keys(map).reduce(
            (red, i) => (map[i] != null ? red.concat(map[i]) : red),
            [],
          ),
        ...Object.keys(value || {}).reduce(
          (red, i) => ({
            ...red,
            [i]: convertsConfigSchemaToFormModel(
              value[i],
              props,
              configSchema.items,
              { fieldName: i },
            ),
          }),
          {},
        ),
      };
    case "object":
      return {
        out: context.fieldName,
        validate: configSchema.validate,
        ...Object.keys(configSchema.schemas).reduce(
          (red, key) => ({
            ...red,
            [key]: convertsConfigSchemaToFormModel(
              value[key],
              props,
              configSchema.schemas[key],
              { fieldName: key },
            ),
          }),
          {},
        ),
      };
    case "conditional":
      return {
        out: context.fieldName,
        expressionValue: convertsConfigSchemaToFormModel(
          value ? value.expressionValue : null,
          props,
          configSchema.expression,
          { fieldName: "expressionValue" },
        ),
        caseValue: convertsConfigSchemaToFormModel(
          value ? value.caseValue : null,
          props,
          configSchema.cases[value.expressionValue],
          { fieldName: "caseValue" },
        ),
        validate: configSchema.validate,
      };
    case "enum":
    case "boolean":
    case "file":
    case "string":
    case "number":
      return {
        out: context.fieldName || "",
        default: configSchema.default,
        validate: configSchema.validate,
      };
  }
}

type Props = {
  config: ConfigSchemaPart,
  onAddPlan(plan: { config: mixed, name: string }): void,
  packages: Array<Package>,
};

export function getFormJobs(value, props) {
  const model = {
    name: {
      out: "name",
      validate: composeValidation(notEmpty(), () => true),
      default: "",
    },
    config: {
      ...convertsConfigSchemaToFormModel(value.config, props, props.config),
      out: "config",
    },
    stager: {
      out: "stager",
      convertOut: v => ({
        expressionValue: v.expressionValue,
        caseValue:
          v.expressionValue === "remote"
            ? {
                ...v.caseValue.host,
                transport: {
                  type: v.caseValue.method.expressionValue,
                  ...v.stager.caseValue.method.caseValue,
                },
              }
            : null,
      }),
      type: {
        out: "expressionValue",
        default: "integrated",
      },
      host: {
        out: "caseValue",
        default: null,
      },
    },
    packageInfos: {
      out: "packageInfos",
      default: null,
      convertOut: (v, props) => props.packages.find(p => p.path == v),
    },
  };
  const jobs = convertConversionModelToConversionJobs(model);
  return jobs;
}

export default compose(
  Connecter,
  withProps(({ onAddPlan }) => ({
    onSubmit(value) {
      onAddPlan(value);
    },
    onValidationFailed() {
      if (global.atom) {
        global.atom.notifications.addWarning("Your plan isn't correct");
      }
    },
  })),
  withState("initial", "setInitial", props => ({
    config: getDefault(props.config),
    packageInfos: props.packages[0] ? props.packages[0].path : null,
  })),
  lifecycle({
    componentWillReceiveProps(nextProps: Props) {
      if (this.props.packages.length === 0 && nextProps.packages.length !== 0) {
        this.props.setInitial({
          ...this.props.initial,
          packageInfos: nextProps.packages[0]
            ? nextProps.packages[0].path
            : null,
        });
      }
    },
  }),
  FormController(
    undefined,
    (value, props) => {
      const v = convertIn(value, getFormJobs(value, props), props);
      return v;
    },
    (value, props) => convertOut(value, getFormJobs(value, props), props),
    { checkIfModified: false },
    (value, props) =>
      composeValidation(
        (value, props) => console.log(value) || true,
        validateModel(getFormJobs(value, props)),
      )(value, props),
  ),
  StateDispatcher(),
)(PlanConfigurer);
