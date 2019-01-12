export default function forEachElement(selector, fn) {
  let elements = document.querySelectorAll(selector)
  for (var i = 0; i < elements.length; i++) {
    fn(elements[i], i)
  }
}
