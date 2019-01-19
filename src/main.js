import * as d3 from "d3"
import range from "./utils/range"

class Point {
    constructor(x, y, xRange, yRange) {
        this.x = x
        this.y = y
        this.radius = 0.1

        this.xRange = xRange
        this.yRange = yRange
    }

    x() {
        return this.xRange(this.x)
    }

    y() {
        return this.yRange(this.y)
    }

    radius() {
        return this.xRange(this.radius)
    }
}

class Field {
    constructor(width, height, points) {
        this.width = width
        this.height = height
        this.points = points
    }
}


function makeCoords(max) {
    let result = []
    for (let i = 0; i < max; i++) {
        result.push([Math.random(), Math.random()])
    }
    return result
}

export default function main() {
    console.log("Hello, world!")

    const data = [
        new Field(460, 280, makeCoords(3)),
        new Field(360, 180, makeCoords(4))
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
        .append("rect")
        .attr("width", (field) => {
            return field.width
        })
        .attr("height", (field) => {
            return field.height
        })

    let scope = d3
        .select(".container")
        .selectAll("svg")

    let ranges = scope.nodes()
        .map((node) => {
            return node.getBoundingClientRect()
        })
        .map((node) => {
            let xScale = d3.scaleLinear()
                .domain([0, 1])
                .range([0, node.width])

            let yScale = d3.scaleLinear()
                .domain([0, 1])
                .range([0, node.height])
            return { x: xScale, y: yScale }
        })

    scope
        .selectAll("circle")
        .data((field, i) => {
            const xRange = ranges[i].x
            const yRange = ranges[i].y
            let points = field.points.map((coord) => {
                return { radius: 0.03, x: coord[0], y: coord[1], xRange: xRange, yRange: yRange }
            })
            console.log(points)
            return points
        })
        .enter().append("circle")
        .attr("r", (p) => {
            return p.xRange(p.radius)
        })
        .attr("cx", (p) => {
            return p.xRange(p.x)
        })
        .attr("cy", (p) => {
            return p.yRange(p.y)
        })
}
