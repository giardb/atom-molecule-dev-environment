"use babel";
// @flow

import * as React from "react";
import { action, storiesOf } from "@kadira/storybook";
import PlanConfigurer from "./PlanConfigurer";
import type { ConfigSchemaPart } from "../Types/types.js.flow";

let planSchemaConfig: ConfigSchemaPart = {
  type: "object",
  schemas: {
    env: {
      type: "enum",
      default: "dev",
      enum: [
        { value: "dev", description: "dev" },
        { value: "staging", description: "staging" },
        { value: "preprod", description: "preprod" },
        { value: "production", description: "production" },
      ],
    },
    testPath: {
      type: "string",
      title: "path",
      default: "",
    },
  },
};

let complexPlanConfig: ConfigSchemaPart = {
  type: "conditional",
  expression: {
    type: "enum",
    default: "compose",
    enum: [
      { value: "basic", description: "basic" },
      { value: "compose", description: "compose" },
    ],
  },
  cases: {
    basic: {
      type: "object",
      schemas: {
        image: {
          type: "string",
          title: "image",
          default: "ubuntu",
        },
        ports: {
          type: "array",
          default: [],
          items: {
            type: "object",
            schemas: {
              host: {
                type: "number",
                title: "host",
                default: 80,
              },
              container: {
                type: "number",
                title: "container",
                default: 80,
              },
            },
          },
        },
      },
    },
    compose: {
      type: "object",
      schemas: {
        service: {
          type: "enum",
          default: "web",
          enum: [
            { value: "web", description: "web" },
            { value: "db", description: "db" },
            { value: "proxy", description: "proxy" },
          ],
        },
      },
    },
  },
};

let testFixesPlanConfig: ConfigSchemaPart = {
  type: "object",
  schemas: {
    testArray: {
      type: "array",
      title: "test",
      items: {
        type: "string",
        placeholder: "un test",
        title: "test",
        default: "un autre test",
      },
    },
    testObject: {
      type: "object",
      title: "Enorme WOW",
      schemas: {
        testObject: {
          type: "object",
          title: "Enorme WOW",
          schemas: {
            testString: {
              type: "string",
              placeholder: "un test",
              title: "test",
              default: "un autre test",
            },
            testArray: {
              type: "array",
              title: "test",
              items: {
                type: "string",
                placeholder: "un test",
                title: "test",
                default: "un autre test",
              },
            },
          },
        },
        testString: {
          type: "string",
          placeholder: "un test",
          title: "test",
          default: "un autre test",
        },
        testArray: {
          type: "array",
          title: "test",
          items: {
            type: "string",
            placeholder: "un test",
            title: "test",
            default: "un autre test",
          },
        },
      },
    },
  },
};

storiesOf("PlanConfigurer", module)
  .add("Basic", () => (
    <PlanConfigurer config={planSchemaConfig} onAddPlan={action("plan")} />
  ))
  .add("Complex", () => (
    <PlanConfigurer config={complexPlanConfig} onAddPlan={action("plan")} />
  ))
  .add("Test Fixes", () => (
    <PlanConfigurer config={testFixesPlanConfig} onAddPlan={action("plan")} />
  ));
