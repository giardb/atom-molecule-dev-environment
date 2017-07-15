"use babel";
// @flow

import React from "react";
import PlanConfigPart from "./PlanConfigPart";
import type { ConfigSchemaPart } from "../Types/types.js.flow";
import { fromJS } from "immutable";
import { getDefault } from "../Model/PlanConfigManipulators";
import AddButton from "./AddButton";
import styled from "styled-components";
import { compose } from "recompose";
// $FlowFixMe
import { StateProxy } from "react-forms-state";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 8px 0px 8px 0px;
  border-radius: 5px;
`;

const Label = styled.span.attrs({
  className: "text-color-highlight",
})`
  display: flex;
  font-size: 13px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 8px 0px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  align-items: stretch;
`;

export function PlanConfigList({
  label,
  values = [],
  onChange,
  items,
}: {
  label: string,
  value: Array<mixed>,
  onChange: (v: Array<mixed>) => void,
  items: ConfigSchemaPart,
}) {
  return (
    <Box>
      <Label>{label}</Label>
      <List>
        {values.map((value, i) => (
          <Item key={i}>
            <PlanConfigPart
              // $FlowFixMe
              {...items}
              value={value}
              onChange={v =>
                onChange(fromJS(this.props.values).set(i, v).toJS())}
            />
          </Item>
        ))}
        <AddButton
          onClick={() => onChange([].concat(values).concat(getDefault(items)))}
        />
      </List>
    </Box>
  );
}

const enhance = compose(StateProxy());

export default enhance(PlanConfigList);
