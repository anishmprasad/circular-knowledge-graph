/* eslint-disable */

/**
 * Vector math helper class for 2d animation.
 */
export default class Vector {
  constructor(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }

  copy() {
    return new Vector(this.x, this.y, this.z);
  }

  mag() {
    return Math.sqrt(this.magSq());
  }

  magSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  normalize() {
    this.div(this.mag());
    return this;
  }

  add(p) {
    this.x += p.x;
    this.y += p.y;
    this.z += p.z;
    return this;
  }

  sub(p) {
    this.x -= p.x;
    this.y -= p.y;
    this.z -= p.z;
    return this;
  }

  mult(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  }

  div(n) {
    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  }
}
