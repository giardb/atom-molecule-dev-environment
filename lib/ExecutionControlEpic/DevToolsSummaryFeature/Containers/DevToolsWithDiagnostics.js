"use babel";
// @flow

import { connect } from "react-redux";
import DevToolsWithDiagnostics from "../Presenters/DevToolsWithDiagnostics";
import type { DevToolWithDiagnostics as DevToolWithDiagnosticsType } from "../Types/types.js.flow";
import {
  selectDevtoolsReducer,
  selectDiagnosticsReducer,
  selectPlansReducer,
  selectTasksReducer,
} from "../../../GlobalSystem/Selectors";
import { selectDevtools } from "../Selectors/DevToolsInfos";
import type { State } from "../../../GlobalSystem/types.js.flow";
import { openPlanConfigurer } from "../../PlanConfigurationFeature/Actions/OpenPlanConfigurer";
import {
  selectPertinentTaskID,
  selectStateOfPlan,
  selectStateOfTool,
  selectTasksOfPlan,
  selectTasksOfTool,
} from "../../TaskExecutionFeature/Selectors/Tasks";
import { fromJS } from "immutable";
import { selectPlansOfTool } from "../../PlanConfigurationFeature/Selectors/PlanConfigs";
import {
  selectDiagnosticsOfTask,
  selectLastDiagnostics,
} from "../../DiagnosticsFeature/Selectors/Diagnostics";
import type { DiagnosticType } from "../../DiagnosticsFeature/Types/types.js.flow";
import { openDiagnosticsTraveller } from "../../DiagnosticsFeature/Actions/OpenDiagnosticsTraveller";
import { selectPackagesReducer } from "../../../GlobalSystem/Selectors";
import { selectPackagesOfTool } from "../../../ProjectSystemEpic/PackageFeature/Selectors/Packages";
import ColorHash from "color-hash";

export function mapStateToProps(
  state: State,
): { tools: Array<DevToolWithDiagnosticsType> } {
  return {
    tools: selectDevtools(selectDevtoolsReducer(state))
      .filter(devtool => {
        const hasPackages = selectPackagesOfTool(
          selectPackagesReducer(state),
          devtool.id,
        );
        return hasPackages.length > 0;
      })
      .map((devtool, devtoolIndex) => {
        const plans = selectPlansOfTool(
          selectPlansReducer(state),
          devtool.id,
        ).filter(plan => {
          return selectTasksOfPlan(selectTasksReducer(state), plan).length > 0;
        });
        let diagnostics = selectLastDiagnostics(
          selectDiagnosticsOfTask(
            selectDiagnosticsReducer(state),
            selectPertinentTaskID(
              selectTasksOfTool(selectTasksReducer(state), devtool.id),
            ),
          ),
        );
        return plans.length > 1
          ? plans.map((plan, planIndex) => {
              diagnostics = selectLastDiagnostics(
                selectDiagnosticsOfTask(
                  selectDiagnosticsReducer(state),
                  selectPertinentTaskID(
                    selectTasksOfPlan(selectTasksReducer(state), plan),
                  ),
                ),
              );
              return fromJS(devtool)
                .set(
                  "state",
                  selectStateOfPlan(selectTasksReducer(state), plan),
                )
                .set("infos", diagnostics.filter(d => d.type == "info").count())
                .set(
                  "warnings",
                  diagnostics.filter(d => d.type == "warning").count(),
                )
                .set(
                  "errors",
                  diagnostics.filter(d => d.type == "error").count(),
                )
                .set(
                  "successes",
                  diagnostics.filter(d => d.type == "success").count(),
                )
                .set(
                  "planColor",
                  new ColorHash({ lightness: 0.75, saturation: 1 }).hex(
                    plan.name,
                  ),
                )
                .set("plan", plan)
                .set("legend", plan.name)
                .set("index", devtoolIndex + planIndex)
                .toJS();
            })
          : [
              fromJS(devtool)
                .set(
                  "state",
                  selectStateOfTool(selectTasksReducer(state), devtool.id),
                )
                .set("infos", diagnostics.filter(d => d.type == "info").count())
                .set(
                  "warnings",
                  diagnostics.filter(d => d.type == "warning").count(),
                )
                .set(
                  "errors",
                  diagnostics.filter(d => d.type == "error").count(),
                )
                .set(
                  "successes",
                  diagnostics.filter(d => d.type == "success").count(),
                )
                .set("plan", plans[0])
                .toJS(),
            ];
      })
      .reduce((red, arr) => red.concat(arr), []),
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
): {
  onToolDiagnosticsClick(
    devtool: DevToolWithDiagnosticsType,
    type: DiagnosticType,
  ): void,
  onToolLogsClick(devtool: DevToolWithDiagnosticsType): void,
  onToolSettingsClick(devtool: DevToolWithDiagnosticsType): void,
} {
  return {
    onToolSettingsClick: (devtool: DevToolWithDiagnosticsType) => {
      dispatch(openPlanConfigurer(devtool));
    },
    onToolLogsClick: (devtool: DevToolWithDiagnosticsType) => {
      dispatch(
        openDiagnosticsTraveller(
          devtool.id,
          devtool.name,
          devtool.defaultDiagnosticsMode,
          devtool.plan,
        ),
      );
    },
    onToolDiagnosticsClick: (
      devtool: DevToolWithDiagnosticsType,
      // eslint-disable-next-line no-unused-vars
      type: DiagnosticType,
    ) => {
      dispatch(
        openDiagnosticsTraveller(
          devtool.id,
          devtool.name,
          devtool.defaultDiagnosticsMode,
          devtool.plan,
        ),
      );
    },
  };
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(DevToolsWithDiagnostics);
