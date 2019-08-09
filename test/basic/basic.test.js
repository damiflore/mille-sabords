import { assert } from "@dmail/assert"
import "../../src/content.jsx"

const actual = document.body.querySelector("h1").innerText
const expected = "Hello, world!"

assert({ actual, expected })
