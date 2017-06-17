"use babel";
// @flow

import React from "react";
import Tasks from "../../TaskExecutionFeature/Presenters/Tasks";
import styled from "styled-components";
import DiagnosticsTypeFilters from "./DiagnosticsTypeFilters";

const FilterCardBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  max-width: 300px;
  border-radius: 8px;
  padding: 8px;
  overflow: auto;
  margin: 8px;
`;

const TasksFiltersBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
`;

const TypeFiltersBox = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
`;

const FiltersTitle = styled.h4`
  font-size: 16px;
`;

const CloseButton = styled.div`
  align-self: flex-end;
  margin-top: 8px;
`;

export default function DiagnosticsFilters({
  tasks = [],
  onTypeFilterClick,
  onTaskFilterClick,
}) {
  return (
    <FilterCardBox className="overlay-background-color">
      <TasksFiltersBox>
        <FiltersTitle className="color-text-white">Tasks</FiltersTitle>
        <Tasks tasks={tasks} onTaskClick={onTaskFilterClick} />
      </TasksFiltersBox>
      <TypeFiltersBox>
        <FiltersTitle className="color-text-white">Types</FiltersTitle>
        <DiagnosticsTypeFilters onFilterClick={onTypeFilterClick} />
      </TypeFiltersBox>
      <CloseButton className="btn btn-success inline-block-tight">
        Save and hide
      </CloseButton>
    </FilterCardBox>
  );
}
