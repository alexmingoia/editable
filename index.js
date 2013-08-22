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

Editable.prototype.click = function(e) {
  e.stopPropagation();
  this.hide = false;
  var el = this.el = dom(template);
  var text = this.node.html();
  this.html = text;
  this.input = el.find('input');
  this.input.value(text);
  this.origin = text;
  this.node.css('display', 'none');
  //插入后面
  el.insertAfter(this.node);
  this.input.get(0).focus();
  var self = this;
  this.confirmBtn = el.find('.confirm').get(0);
  this.cancelBtn = el.find('.cancel').get(0);
  this._documentClick = this.documentClick.bind(this);
  dom(document).on('click', this._documentClick);
  this._onkeydown = this.onkeydown.bind(this);
  this.input.on('keydown', this._onkeydown);
}

Editable.prototype.reset = function() {
  var v = this.html;
  this.node.html(v);
}

Editable.prototype.value = function() {
  var v = this.node.html();
  return v;
}

Editable.prototype.limit = function(min, max) {
  this.min = min;
  this.max = max || 200;
}

Editable.prototype.documentClick = function(e) {
  var target = e.target;
  if (target == this.node.get(0)) return;
  if (target == this.confirmBtn) {
    return this.confirm();
  }
  return this.cancel();
}

Editable.prototype.cancel = function() {
  if (this.hide) return;
  this.hide = true;
  this.emit('hide');
  this.input.off('keydown', this._onkeydown);
  dom(document).off('click', this._documentClick);
  this.el.remove();
  this.node.css('display', this.display);
}

Editable.prototype.confirm = function() {
  var v = this.input.value();
  if (typeof this.min !== 'undefined') {
    var len = v.length;
    if (len < this.min || len > this.max) {
      return this.cancel();
    }
  }
  this.node.html(v);
  this.emit('change', v);
  this.cancel();
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
      return this.confirm();
    case 'esc':
      return this.cancel();
  }
}

module.exports = Editable;
