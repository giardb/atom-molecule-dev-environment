import { getFormJobs } from "./PlanConfigurer";

const configSchema = {
  type: "object",
  schemas: {
    configFile: {
      type: "file",
      title: "configfile",
      default: "",
      tester: (packagePath: string, dirname: string) =>
        path.basename(packagePath).indexOf("jest.config") !== -1 ||
        path.basename(packagePath).indexOf(".jest.") !== -1 ||
        path.basename(packagePath) === "package.json",
    },
    modifiedOnly: {
      type: "boolean",
      title: "only modified files (must be in a Git repo)",
      default: false,
    },
    watch: {
      type: "boolean",
      title: "Watch mode",
      default: true,
    },
    binary: {
      type: "conditional",
      expression: {
        type: "enum",
        enum: [
          { value: "local", description: "local" },
          { value: "global", description: "global" },
        ],
      },
      cases: {
        local: null,
        global: {
          type: "object",
          schemas: {
            a: {
              type: "string",
            },
          },
        },
      },
    },
    environmentVariables: {
      type: "array",
      title: "Environment Variables",
      items: {
        type: "string",
        title: "Variable",
        placeholder: "NAME=value",
      },
    },
  },
};

describe("PlanConfigurer", () => {
  describe("getFormJobs", () => {
    it("converts to jobs", () => {
      const subject = getFormJobs({}, { config: configSchema });

      expect(subject).toMatchSnapshot();
    });

    it("converts to jobs taking value in account", () => {
      const subject = getFormJobs(
        {
          environmentVariables: { 0: "HAHA=HEHE", 1: "BABA=BEBE" },
          binary: { expressionValue: "global", caseValue: "" },
        },
        { config: configSchema },
      );

      expect(subject).toMatchSnapshot();
    });
  });
});
