"use babel";
// @flow

import React from "react";
import styled from "styled-components";
import { compose, withProps, withState, lifecycle } from "recompose";
import type { DiagnosticType, Diagnostic } from "../Types/types.js.flow";
import { List } from "immutable";

const TypeIcon = styled.span`
  height: 15px;
  width: 15px;
  margin: 0px 8px 0px 0px;
`;

const DiagnosticTypeBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  margin: 0px 6px;
`;

const DiagnosticCount = styled.span`
  font-size: 12px;
  margin: 0px;
`;

const Search = styled.span`
  font-size: 12px;
  margin: 0px 8px;
`;

function getIconForType(type: DiagnosticType): string {
  switch (type) {
    case "info":
      return "info";
    case "warning":
      return "alert";
    case "error":
      return "issue-opened";
    case "success":
      return "check";
    default:
      return "";
  }
}

function getDiagnosticColorClassNameForType(type: DiagnosticType): string {
  switch (type) {
    case "info":
      return "diagnostic-color-info-text";
    case "warning":
      return "diagnostic-color-warning-text";
    case "error":
      return "diagnostic-color-error-text";
    case "success":
      return "diagnostic-color-success-text";
    default:
      return "";
  }
}

function DiagnosticsOfType({
  type,
  count = 0,
}: {
  type: DiagnosticType,
  count: number,
}) {
  return (
    <DiagnosticTypeBox>
      <TypeIcon
        className={`${getDiagnosticColorClassNameForType(type)} icon icon-${getIconForType(type)}`}
      />
      <DiagnosticCount className={getDiagnosticColorClassNameForType(type)}>
        {count}
      </DiagnosticCount>
    </DiagnosticTypeBox>
  );
}

const DiagnosticsBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  margin: 8px;
  cursor: pointer;
`;

function DiagnosticsQuickSelector({
  search = "",
  diagnostics = List(),
  onClick = () => {},
}: {
  search: string,
  diagnostics: List<Diagnostic>,
  onClick?: () => void,
}) {
  return (
    <DiagnosticsBox onClick={onClick}>
      <DiagnosticsOfType
        type="info"
        count={diagnostics.count(d => d.type === "info")}
      />
      <DiagnosticsOfType
        type="success"
        count={diagnostics.count(d => d.type === "success")}
      />
      <DiagnosticsOfType
        type="warning"
        count={diagnostics.count(d => d.type === "warning")}
      />
      <DiagnosticsOfType
        type="error"
        count={diagnostics.count(d => d.type === "error")}
      />
      <Search>{search}</Search>
    </DiagnosticsBox>
  );
}

export default compose()(DiagnosticsQuickSelector);
