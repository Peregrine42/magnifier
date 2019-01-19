import * as d3 from "d3"
import range from "./utils/range"

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = 10
    }
}

class Field {
    constructor(width, height, points) {
        this.width = width
        this.height = height
        this.points = points.map((p) => {
            return new Point(p.x * width, p.y * height)
        })
    }
}


function makePoints(max) {
    let result = []
    for (let i=0; i<max; i++) {
        result.push(new Point(Math.random(), Math.random()))
    }
    return result
}

export default function main() {
    console.log("Hello, world!")

    const data = [
        new Field(460, 280, makePoints(3)),
        new Field(360, 180, makePoints(4))
    ]



    d3
        .select(".container")
        .selectAll("svg")
        .data(data)
        .enter().append("svg")
        .attr("width", (field) => {
            return field.width
        })
        .attr("height", (field) => {
            return field.height
        })
        .selectAll("circle")
        .data((field) => {
            return field.points
        })
        .enter().append("circle")
        .attr("r", (p) => {
            return p.radius
        })
        .attr("cx", (p) => {
            return p.x
        })
        .attr("cy", (p) => {
            return p.y
        })
}
