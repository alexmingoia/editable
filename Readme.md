# editable

  component for simple inline editing

  With key bindings, `esc` for cancel `enter` for confirm

  [demo](http://chemzqm.github.io/editable/)

## Installation

  Install with [component(1)](http://component.io):

    $ component install chemzqm/editable

## Usage

``` js
var Editable = require('editable');
var node = document.getElementById('test');
var ed = new Editable(node);
ed.on('change', function(v){
  console.log(v);
})
```
## Events

* `change` emit with the changed value.

* `range error` emit when the value length is not in limited range.

## API

### new Editable(node)

Create Editable instance

### editable#limit(min, max)

`min` {Number}, `max` {Number} limit the length.

### editable#value()

Get current node html.

### editable#reset()

Reset the value to previous, useful for undo no `change` event emitted.

### editable#remove()


Unregist the events

## License

  MIT
