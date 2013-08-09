var dom = require('dom');
var Emitter = require ('emitter');
var template = require('./template');
var keyname = require ('keyname');


function Editable(node){
  this.node = dom(node);
  this.display = this.node.css('display');
  this._click = this.click.bind(this);
  this.node.on('click', this._click);
}

Emitter(Editable.prototype);

Editable.prototype.click = function() {
  this.hide = false;
  var el = this.el = dom(template);
  var text = this.node.html();
  this.input = el.find('input');
  this.input.value(text);
  this.origin = text;
  this.node.css('display', 'none');
  el.insertAfter(this.node);
  this.input.get(0).focus();
  this._cancel = this.cancel.bind(this);
  this._confirm = this.confirm.bind(this);
  this._onkeydown = this.onkeydown.bind(this);
  this.input.on('keydown', this._onkeydown);
  el.find('.confirm').on('click', this._confirm);
  el.find('.cancel').on('click', this._cancel);
}

Editable.prototype.cancel = function() {
  this.hide = true;
  this.emit('hide');
  this.input.off('keydown', this._onkeydown);
  this.el.find('.confirm').off('click', this._confirm);
  this.el.find('.cancel').off('click', this._cancel);
  this.el.remove();
  this.node.css('display', this.display);
}

Editable.prototype.confirm = function() {
  this.cancel();
  var v = this.input.value();
  this.node.html(v);
  this.emit('change', v);
}

Editable.prototype.remove = function() {
  this.emit('remove');
  if (this.hide === false) {
    this.cancel();
  }
  this.node.off('click', this._click);
}

Editable.prototype.onkeydown = function(e) {
  switch(keyname(e.which)) {
    case 'enter':
      return this.confirm();
    case 'esc':
      return this.cancel();
  }
}

module.exports = Editable;
