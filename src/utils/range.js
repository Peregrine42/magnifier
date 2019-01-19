export default function* range(stop) {
    for (let i=0; i<stop; i++) {
        yield i
    }
}
