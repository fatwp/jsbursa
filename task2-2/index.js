window.addEventListener('load', function wael() {
  'use strict';

  var body = document.querySelector('body');
  var input1 = document.createElement('input');
  var input2 = document.createElement('input');
  var button = document.createElement('button');
  var error1 = document.createElement('div');
  var error2 = document.createElement('div');
  var result;

  button.innerHTML = 'Посчитать';

  body.appendChild(input1);
  body.appendChild(input2);
  body.appendChild(button);

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function manageDom(ival, error, position) {
    if (!isNumeric(ival) || ival.indexOf('0x') === 0 || ival === '') {
      if (body.contains(result)) {
        result.parentNode.removeChild(result);
      }
      error.className = 'error-message';
      error.innerHTML = 'Это не число';
      body.insertBefore(error, position);
    } else {
      if (body.contains(error)) {
        error.parentNode.removeChild(error);
      }
      return +ival;
    }
  }

  button.addEventListener('click', function bael() {
    var val1;
    var val2;
    var sum;

    if (!result) {
      result = document.createElement('div');
    }

    val1 = manageDom(input1.value, error1, input2);
    val2 = manageDom(input2.value, error2, button);

    if (val1 && val2) {
      sum = val1 + val2;
      result.id = 'result';
      result.innerHTML = sum;
      body.insertBefore(result, input1);
    }
  });
});
