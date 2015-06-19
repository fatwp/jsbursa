window.addEventListener('load', function wael() {
  'use strict';

  var i;
  var url = 'http://cors-test.appspot.com/test';
  var b;
  var m = document.querySelectorAll('span');

  function send(block, method, target, el) {
    var mt = method.toUpperCase();
    block.open(mt, target);
    block.send();

    block.addEventListener('readystatechange', function bael() {
      if (block.status === 200 && block.readyState === block.DONE && JSON.parse(block.responseText).status === 'ok') {
        el.innerHTML = 'OK';
        el.style.fontWeight = 'bold';
        el.style.color = 'green';
      } else {
        el.innerHTML = 'Failed';
        el.style.fontWeight = 'bold';
        el.style.color = 'red';
      }
    });
  }
  for ( i = 0; i < m.length; i++ ) {
    b = 'req' + i;
    b = new XMLHttpRequest();
    send(b, m[i].className, url, m[i]);
  }
});
