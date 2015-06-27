// This code executes within the sidecar window.

var ipc = require('ipc');
var jupyter = require('./lib/jupyter');

var display = new jupyter.RichDisplay();

function appendNode(elementName, html) {
  var node = document.createElement(elementName);
  node.setPayload(html);
  container.appendChild(node);

  node.scrollIntoView();
}

ipc.on('message', function (message) {
  display.handleMessage(message, {
    result: function (html) { appendNode('sidecar-result', html); },
    trace: function (html) { appendNode('sidecar-err', html); },
    code: function (js) { eval(js); }
  });
});
