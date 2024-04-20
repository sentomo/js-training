export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(Point) {
    this.x += Point.x;
    this.y += Point.y;
    return this;
  }
}