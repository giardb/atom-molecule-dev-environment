"use babel";
// @flow

import React from "react";
import DiagnosticsTypeFilter from "./DiagnosticsTypeFilter";
import styled from "styled-components";

const FiltersBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px;
  flex: 0 0 auto;
  justify-content: center;
`;

export default function DiagnosticsTypeFilters({
  onFilterClick = () => {},
}: {
  onFilterClick: (type: string) => void,
}) {
  return (
    <FiltersBox>
      <DiagnosticsTypeFilter
        type="error"
        onClick={() => onFilterClick("error")}
      />
      <DiagnosticsTypeFilter
        type="warning"
        onClick={() => onFilterClick("warning")}
      />
      <DiagnosticsTypeFilter
        type="info"
        onClick={() => onFilterClick("info")}
      />
      <DiagnosticsTypeFilter
        type="success"
        onClick={() => onFilterClick("success")}
      />
    </FiltersBox>
  );
}
