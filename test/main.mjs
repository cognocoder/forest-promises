
let tests = []

import tree from './tree.mjs'

tests.push(tree)

for (let test of tests)
  for (let fn of test)
    fn()
