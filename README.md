![logo][logo]

# forest-promises
Forest Promises: create and track dependency forests of promises.

## Documentation

### `Forest`
Comming soon.

### `Tree`

#### Constructor

```javascript
let tree = new Tree(promise, name = 'task', track = 0, ident = 0)
```
A `Tree` wraps a `Promise`. It has a **state** variable that tracks its wrapped promise state.

```javascript
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
```

It also has a `name` and a `ident`, mainly used to display a tree's status string. The `track` paramenter enables, if greater than zero, a log of the tree's status string every `track` milliseconds.

#### Static methods
**`Tree.STATES`** is a getter to a static constant enumerate object that contains all possible states of a `Tree` instance: *pending*, *fulfilled* and *rejected*.

#### Instance methods
The `Tree` class wraps its promise instance methods **`then`**, **`catch`** and **`finally`**. It also provides a **`status_str`** getter that serializes the tree instance to a *idented* human friendly string that displays its `state` and `name`. The **`resolved`** method returns wheter the tree's promise is *resolved*.

The **`log`** method writes the tree's *status string* to the issued logger. The **`track`** method writes it until the tree state is *resolved*.

#### Examples

The following code showcase the stand alone usage of Trees.

```javascript
let toggle = false

let executor = (resolve, reject) => {
  setTimeout(() => {
    if (!toggle)
      resolve(toggle = !toggle)
    else 
      reject(toggle = !toggle)
  }, 100)
}

new Tree(new Promise(executor), '1. fulfilled', 50)

new Tree(new Promise(executor), '2. rejected', 50)
  .catch(reason => console.log(` i  2. regected --> a tree was rejected.`))

new Tree(new Promise(executor), '3. not tracked')

let tree = new Tree(new Promise(executor), '4. rejected', 50)
tree.catch(reason => {
    console.log(` i  the tree "${tree.name}" was rejected.`)
  })
```

The **`executor`** function is used to create promises. It alternates between `resolve` and `reject` calls, so that odd trees will be *fulfilled* and even trees will be *rejected*. Trees 1, 2 and 4 are *tracked* every 50 milliseconds. Tree number 3 is not tracked.

##### Output
     ◆  1. fulfilled
     ◆  2. rejected
     ◆  4. rejected
     i  2. regected --> a tree was rejected.
     i  the tree "4. rejected" was rejected.
     ✔  1. fulfilled
     ✘  2. rejected
     ✘  4. rejected

## Credits
Image [credit](https://www.reddit.com/r/wallpapers/comments/3npdce/1920x1080_october_forest_variant_in_comments/cvq53fc/). Literally inspired the creation of this module.

[logo]: images/cover.jpg