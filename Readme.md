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

## API

### new Editable(node)

Create Editable instance

### editable#remove

Unregist the events

### Event#change

Emit the `change` event with the changed `value` of input

## License

  MIT
