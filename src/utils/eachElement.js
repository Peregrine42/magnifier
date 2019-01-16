export default function* eachElement(selector) {
    let elements = document.querySelectorAll(selector)

    for (var i = 0; i < elements.length; i++) {
        yield elements[i]
    }
}
