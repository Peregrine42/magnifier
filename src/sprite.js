import { drawBackground } from "./canvas"

class Sprite {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}

export function drawSprite(ctx, x, y) {
    const radius = 10

    ctx.beginPath()
    ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI)
    ctx.fillStyle = "grey"
    ctx.fill()
    ctx.stroke()

    return new Sprite(x, y, radius)
}
