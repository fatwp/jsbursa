window.addEventListener('load', function wael() {
  'use strict';

  var button = document.querySelector('button');
  var title = document.querySelector('input');

  function send() {
    var script = document.createElement('script');
    script.src = 'http://en.wikipedia.org/w/api.php?action=parse&page=' + title.value + '&prop=text&section=0&format=json&callback=res';
    document.head.appendChild(script);
    script.parentNode.removeChild(script);
  }

  window.res = function res(data) {
    document.querySelector('#content').innerHTML = data.parse.text['*'];
  };

  button.addEventListener('click', send);
});
