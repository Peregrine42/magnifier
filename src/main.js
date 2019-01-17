import eachElement from "./utils/eachElement"
import { addCanvas, drawBackground } from "./canvas"
import { drawSprite } from "./sprite"

export default function main() {
    console.log("Hello, world!")

    for (var element of eachElement(".container")) {
        console.log(element)
        let canvas = addCanvas(element)

        let ctx = canvas.getContext("2d")
        drawBackground(ctx)
        let sprite = drawSprite(ctx, 0.5*canvas.width, 0.5*canvas.height)
    }
}
