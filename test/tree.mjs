
import Tree from '../source/tree.mjs'

async function run() {
  let toggle = false

  let executor = (resolve, reject) => {
    setTimeout(value => {
      if (!toggle)
        resolve(toggle = !toggle)
      else 
        reject(toggle = !toggle)
    }, 1000)
  }
  let promise, tree

  new Tree(new Promise(executor), 'successful tree')
    .then(value => console.log(` Fulfilled with value: ${value}\n`))
  new Tree(new Promise(executor), 'rejected tree')
    .catch(reason => console.log(` Rejected with reason: ${reason}\n`))
  
  console.log()
}

export default { run }
