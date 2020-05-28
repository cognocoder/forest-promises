
import Tree from './../tree.mjs'

export default [
  async function() {
    let toggle = false

    let executor = (resolve, reject) => {
      setTimeout(() => {
        if (!toggle)
          resolve(toggle = !toggle)
        else 
          reject(toggle = !toggle)
      }, 100)
    }
    console.log()

    new Tree(new Promise(executor), '1. fulfilled', 50)

    new Tree(new Promise(executor), '2. rejected', 50)
      .catch(reason => console.log(` i  2. regected --> a tree was rejected.`))

    new Tree(new Promise(executor), '3. not tracked')

    let tree = new Tree(new Promise(executor), '4. rejected', 50)
    tree
      .catch(reason => console.log(` i  the tree "${tree.name}" was rejected.`))
    
    setTimeout(() => console.log(), 150)
  }
]
