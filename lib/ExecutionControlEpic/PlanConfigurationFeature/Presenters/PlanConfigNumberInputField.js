"use babel";
// @flow

import React from "react";
import { compose } from "recompose";
// $FlowFixMe
import { StateProxy } from "react-forms-state";
import styled from "styled-components";

const NumberField = styled.input.attrs({
  type: "number",
  className: "text-color-highlight input-number native-key-bindings",
  placeholder: props => props.placeholder,
})`
  display: flex;
  overflow: auto;
  max-width: 400px;
  margin: 0px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-width: 0px;
  padding: 8px 16px;
`;

const Label = styled.span.attrs({
  className: "tool-name-background-color text-color-highlight",
})`
  display: flex;
  overflow: auto;
  padding: 8px;
  min-width: 80px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  color: src;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  overflow: auto;
  min-height: 40px;
  margin: 8px;
`;

export function PlanConfigNumberInputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string,
  value: number,
  onChange: (v: number) => void,
  placeholder: string,
}) {
  return (
    <Box>
      <Label>{label}</Label>
      <NumberField
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </Box>
  );
}

const enhance = compose(StateProxy());

export default enhance(PlanConfigNumberInputField);
