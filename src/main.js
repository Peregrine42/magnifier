import * as d3 from "d3"
import range from "./utils/range"

class Field {
    constructor(width, height, points, indices = new Set([])) {
        this.width = width
        this.height = height
        this.points = points
        this.selectedIndices = indices
    }
}

function makeCoords(max) {
    let result = []
    for (let i = 0; i < max; i++) {
        result.push([Math.random(), Math.random()])
    }
    return result
}

function handleClick(d, i, scope, ranges) {
    const xRange = ranges[i].x
    const yRange = ranges[i].y

    const pos = d3.mouse(this)
    const coords = [xRange.invert(pos[0]), yRange.invert(pos[1])]

    if (d.selectedIndices.size > 0) {
        const first = [...d.selectedIndices].slice(-1)[0]
        const refX = d.points[first][0]
        const refY = d.points[first][1]

        const xOffset = coords[0] - refX
        const yOffset = coords[1] - refY

        if (xOffset != 0 && yOffset != 0) {
            for (let i=0; i<d.points.length; i++) {
                if (d.selectedIndices.has(i)) {
                    d.points[i][0] += xOffset
                    d.points[i][1] += yOffset
                }
            }
        }

    }

    // d.points.push(coords)
    d.selectedIndices.clear()
    render(scope, ranges)
}

function handlePointClick(d, i, scope, ranges) {
    if (d.selection.has(i)) { d.selection.delete(i) }
    else { d.selection.add(i) }
    d3.event.stopPropagation()
    render(scope, ranges)
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
            return {
                x: xScale,
                y: yScale
            }
        })

    scope.on("click", function(d, i) {
        handleClick.bind(this)(d, i, scope, ranges)
    })

    render(scope, ranges)
}

function render(scope, ranges) {
    scope
        .selectAll("circle")
        .data((field, i) => {
            const xRange = ranges[i].x
            const yRange = ranges[i].y
            let points = field.points.map((coord, j) => {
                return {
                    radius: 0.03,
                    x: coord[0],
                    y: coord[1],
                    xRange: xRange,
                    yRange: yRange,
                    selection: field.selectedIndices
                }
            })
            return points
        })
        .attr("fill", (p, i) => {
            return p.selection.has(i) ? "orange" : "grey"
        })
        .attr("r", (p) => {
            return p.xRange(p.radius)
        })
        .attr("cx", (p) => {
            return p.xRange(p.x)
        })
        .attr("cy", (p) => {
            return p.yRange(p.y)
        })
        .enter().append("circle")
        .on("click", function(d, i) {
            handlePointClick.bind(this)(d, i, scope, ranges)
        })
        .attr("r", (p) => {
            return p.xRange(p.radius)
        })
        .attr("cx", (p) => {
            return p.xRange(p.x)
        })
        .attr("cy", (p) => {
            return p.yRange(p.y)
        })
        .attr("fill", (p, i) => {
            return p.selection.has(i) ? "orange" : "grey"
        })
}
