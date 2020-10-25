import {
  getTime24h,
  getTransportationType,
  getDefaultRadius,
} from "../dataUtils";
import config from "../config";
describe("data Utils tests", () => {
  test("should render time correctly", () => {
    const time = getTime24h(235354);
    expect(time).toBe("17.22");
    const time24 = getTime24h(435354);
    expect(time24).toBe("0.55");
  });
  test("HSL vehicle types", () => {
    const unknown = getTransportationType(15);
    const metro = getTransportationType(1);
    expect(unknown).toStrictEqual({
      color: "#f56c42",
      transportName: "Unknown",
    });
    expect(metro.color).toStrictEqual("#ff6319");
    expect(metro.transportName).toStrictEqual("Metro");
  });
  test("Radius from local storage", () => {
    localStorage.setItem("HSLTestRadius", "100");
    const test = getDefaultRadius();
    expect(test).toBe(100);
  });
  test("Bad Radius from local storage", () => {
    localStorage.setItem("HSLTestRadius", "dasdsa");
    const test = getDefaultRadius();
    expect(test).toBe(config.initialRadius);
  });
  test("Radius over max from local storage", () => {
    localStorage.setItem("HSLTestRadius", "10000000000");
    const test = getDefaultRadius();
    expect(test).toBe(config.maxRadius);
  });
});
