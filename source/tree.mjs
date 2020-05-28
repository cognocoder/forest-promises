
/** The Tree States Enum. */
const TREE_STATES = {
  PENDING: ' ◆ ',
  REJECTED: ' ✘ ',
  FULFILLED: ' ✔ ',
}

class Tree {
  /** Creates a new Tree. */
  constructor(promise, name = 'tree', weight = 1, verbose = true) {
    this.name = name
    this.weight = weight
    this.verbose = verbose

    this.state = TREE_STATES.PENDING

    this.promise = promise

    // Injects a promise that tracks the tree state.
    this.promise = this.promise.then(value => {
      this.state = TREE_STATES.FULFILLED
      return value
    }, reason => {
      this.state = TREE_STATES.REJECTED
      throw reason
    })
  }

  /** Static getter method for Tree States. */
  static get states() {
    return TREE_STATES
  }

  /** Gives access to this.promise.then method. */
  then(resolve, reject) {
    this.promise.then(resolve, reject)
  }

  /** Gives access to this.promise.catch method. */
  catch(error) {
    this.promise.catch(error)
  }

  /** Gives access to this.promise.finally method. */
  finally() {
    this.promise.finally()
  }

  /** Get the tree state. */
  get state() {
    return this._state
  }

  /** Set the tree state. */
  set state(value) {
    this._state = value
    if (this.verbose) console.log(this.str)
  }

  /** Returns the stringfied tree. */
  get str() {
    let str = ''
    str += this.state
    str += this.name

    return str
  }
}

export default Tree
