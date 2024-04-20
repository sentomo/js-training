import { Point } from "./index.js";

describe("Point", () => {
  describe("add", () => {
    it("returns same value when a point with positive X and Y coordinates is added to a point with zero X and zero Y coordinates", () => {
      let point = new Point(1, 1);
      let addPoint = new Point(0, 0);
      point.add(addPoint);
      expect(point.x).toBe(1);
      expect(point.y).toBe(1);
    });

    it("returns point with positive X and Y coordinates when a point with positive X and Y coordinates is added to a point with positive X and Y coordinates", () => {
      let point = new Point(1, 1);
      let addPoint = new Point(1, 1);
      point.add(addPoint);
      expect(point.x).toBe(2);
      expect(point.y).toBe(2);
    });

    it("returns point with negative X and Y coordinates when a point with negative X and Y coordinates of greater absolute value is added by a point with positive X and Y coordinates", () => {
      let point = new Point(1, 1);
      let addPoint = new Point(-3, -3);
      point.add(addPoint);
      expect(point.x).toBe(-2);
      expect(point.y).toBe(-2);
    });

    it("returns point with zero coordinates when add a point with addition inverse coordinates", () => {
      let point = new Point(1, 1);
      let addPoint = new Point(-1, -1);
      point.add(addPoint);
      expect(point.x).toBe(0);
      expect(point.y).toBe(0);
    });

    it("returns NaN when add a point with NaN coordinates", () => {
      let point = new Point(true, false);
      let addPoint = new Point(undefined, undefined);
      point.add(addPoint);
      expect(point.x).toBe(NaN);
      expect(point.y).toBe(NaN);
    });
  });
});