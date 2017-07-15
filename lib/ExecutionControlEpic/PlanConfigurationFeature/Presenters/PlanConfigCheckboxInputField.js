"use babel";
// @flow

import React from "react";
import { compose } from "recompose";
import styled from "styled-components";
// $FlowFixMe
import { StateProxy } from "react-forms-state";

const Box = styled.span``;
const Label = styled.label.attrs({
  className: "input-label",
})`

`;

const CheckBoxField = styled.input.attrs({
  className: "input-checkbox",
  type: "checkbox",
})``;

export function PlanConfigCheckboxInputField({
  label,
  value,
  onChange,
}: {
  label: string,
  value: boolean,
  onChange: (v: boolean) => void,
}) {
  return (
    <Box>
      <Label>
        <CheckBoxField
          checked={value}
          onChange={e => onChange(e.target.checked)}
        />
        {label}
      </Label>
    </Box>
  );
}

const enhance = compose(StateProxy());

export default enhance(PlanConfigCheckboxInputField);
