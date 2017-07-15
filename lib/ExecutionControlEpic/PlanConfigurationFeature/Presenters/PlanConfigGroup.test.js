import React from "react";
import { mount } from "enzyme";
import { PlanConfigGroup } from "./PlanConfigGroup";
import PlanConfigPart from "./PlanConfigPart";

describe("PlanConfigGroup", () => {
  it("should display a PlanConfigPart for every key of schemas", () => {
    let subject = mount(
      <PlanConfigGroup
        schemas={{
          image: { type: "string" },
          scale: { type: "number" },
        }}
        value={{ image: "ubuntu", scale: 3 }}
      />,
    );

    expect(subject.find(PlanConfigPart).length).toBe(2);
    expect(subject.find(PlanConfigPart).at(0).prop("type")).toBe("string");
    expect(subject.find(PlanConfigPart).at(0).prop("value")).toBe("ubuntu");
    expect(subject.find(PlanConfigPart).at(1).prop("type")).toBe("number");
  });

  it("should call onChange when a part is changed", () => {
    let spy = jest.fn();
    let subject = mount(
      <PlanConfigGroup
        schemas={{
          image: { type: "string" },
          scale: { type: "number" },
        }}
        onChange={spy}
        value={{ image: "ubuntu", scale: 3 }}
      />,
    );

    subject.find("PlanConfigPart").at(1).prop("onChange")(4);

    expect(spy).toBeCalledWith({ image: "ubuntu", scale: 4 });
  });
});
