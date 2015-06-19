window.addEventListener('load', function() {
  var x = new XMLHttpRequest();
  x.open('GET', window.crudURL);
  x.send();
  x.addEventListener('readystatechange', function listen() {
    x.responseText;
    //if (block.status === 200 && block.readyState === block.DONE && JSON.parse(block.responseText).status === 'ok') {
    //} else {
    //}
  });
});