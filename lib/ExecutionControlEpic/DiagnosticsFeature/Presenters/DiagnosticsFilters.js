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

const SearchField = styled.input`
  margin: 8px 0px;
`;

export default function DiagnosticsFilters({
  tasks = [],
  onTypeFilterClick,
  onTaskFilterClick,
}) {
  return (
    <FilterCardBox className="overlay-background-color">
      <SearchField
        className="input-search"
        type="search"
        placeholder="search message"
      />
      <TypeFiltersBox>
        <FiltersTitle className="block">Types</FiltersTitle>
        <DiagnosticsTypeFilters onFilterClick={onTypeFilterClick} />
      </TypeFiltersBox>
      <TasksFiltersBox>
        <FiltersTitle className="block">Tasks</FiltersTitle>
        <Tasks tasks={tasks} onTaskClick={onTaskFilterClick} />
      </TasksFiltersBox>
      <CloseButton className="btn btn-success inline-block-tight">
        Save and hide
      </CloseButton>
    </FilterCardBox>
  );
}
