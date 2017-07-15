"use babel";
// @flow

import React from "react";
import { compose } from "recompose";
import styled from "styled-components";
// $FlowFixMe
import { StateProxy } from "react-forms-state";

const SelectField = styled.select.attrs({
  className: "tool-name-background-color text-color-highlight input-select",
})`
  display: flex;
  flex-shrink: 0;
  border-radius: 5px;
  padding: 5px;
  height: 40px;
  border: 0px;
  margin: 5px 5px 5px 0px;
`;

export function PlanConfigSelectInputField({
  options = [],
  value,
  onChange,
}: {
  value: string,
  onChange: (v: string) => void,
  options: Array<{
    description: string,
    value: string,
    onChange: (v: string) => void,
  }>,
}) {
  return (
    <SelectField value={value} onChange={e => onChange(e.target.value)}>
      {options.map(option => (
        <option key={option.description} value={option.value}>
          {option.description}
        </option>
      ))}
    </SelectField>
  );
}

const enhance = compose(StateProxy());

export default enhance(PlanConfigSelectInputField);
