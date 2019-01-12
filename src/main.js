import forEachElement from "./utils/forEachElement"

export default function main() {
  console.log("Hello, world!")
  forEachElement(".container", (el, i) => {
    console.log(el)
  })
}
