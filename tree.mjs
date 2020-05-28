
/** The Tree States Enum. */
const STATES = {
  PENDING: 'pending',
  REJECTED: 'rejected',
  FULFILLED: 'fulfilled',
}

class Tree {
  /** Creates a new Tree. */
  constructor(promise, name = 'task', track = 0, ident = 0) {
    this.name = name

    // Initial state is 'pending'.
    this.state = STATES.PENDING

    // Wraps the promise and tracks its state.
    this.promise = promise.then(value => {
      this.state = STATES.FULFILLED
      return value
    }, reason => {
      this.state = STATES.REJECTED
      throw reason
    })

    this.ident = ident
    if (track)
      this.track(track)
  }

  /** Static getter method for the Tree States Enum. */
  static get STATES() {
    return STATES
  }

  /**  Returns wheter the wrapped promise is resolved. */
  get resolved() {
    if (this.state == STATES.FULFILLED)
      return true
    if (this.state == STATES.REJECTED)
      return true
    return false
  }

  /** Wraps the {@link Promise.prototype.then} */
  then(resolve, reject) {
    return this.promise.then(resolve, reject)
  }
  /** Wraps the {@link Promise.prototype.catch} */
  catch(error) {
    return this.promise.catch(error)
  }
  /** Wraps the {@link Promise.prototype.finally} */
  finally() {
    return this.promise.finally()
  }

  /** Returns a idented human readable string with a tree's state and name. */
  get status_str() {
    let _str = ' '

    for (let i = 0; i < this.ident; i++)
      _str += '   '
    
    switch (this.state) {
      case STATES.PENDING: _str += '◆'; break
      case STATES.REJECTED: _str += '✘'; break
      case STATES.FULFILLED: _str += '✔'; break
      default: _str += '?'; break
    }

    _str += '  '
    _str += this.name

    return _str
  }

  /** Logs the tree status string every ms milliseconds. */
  track(ms, clear = null, log = console.log) {
    let interval
    return new Promise(() => {
      interval = setInterval(() => {
        if (this.resolved)
          clearInterval(interval)
        if (clear) {
          clear()
          log()
        }
        log(this.status_str)
      }, ms)
    })
  }

  /** Logs the tree status string. */
  log(log = console.log) {
    log(this.status_str)
  }
}

export default Tree
