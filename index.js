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
  var self = this;
  this._cancel = function() {
    setTimeout(self.cancel.bind(self), 100);
  };
  this._confirm = this.confirm.bind(this);
  this._onkeydown = this.onkeydown.bind(this);
  this.input.on('keydown', this._onkeydown);
  this.input.on('blur', this._cancel);
  el.find('.confirm').on('click', this._confirm);
}

Editable.prototype.cancel = function() {
  if (this.hide) return;
  this.hide = true;
  this.emit('hide');
  this.input.off('blur', this._cancel);
  this.input.off('keydown', this._onkeydown);
  this.el.find('.confirm').off('click', this._confirm);
  this.el.remove();
  this.node.css('display', this.display);
}

Editable.prototype.confirm = function() {
  var v = this.input.value();
  this.node.html(v);
  this.emit('change', v);
}

Editable.prototype.remove = function() {
  this.emit('remove');
  if (this.hide === false) {
    this.cancel();
  }
  this.off();
  this.node.off('click', this._click);
}

Editable.prototype.onkeydown = function(e) {
  switch(keyname(e.which)) {
    case 'enter':
      this.confirm();
      return this.cancel();
    case 'esc':
      return this.cancel();
  }
}

module.exports = Editable;
