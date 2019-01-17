export function addCanvas(element) {
    let canvas = document.createElement("canvas")
    canvas.width = 500
    canvas.height = 500
    element.appendChild(canvas)

    return canvas
}

export function drawBackground(ctx) {
    ctx.fillStyle = "green"
    ctx.fillRect(0, 0, 500, 500)
}
