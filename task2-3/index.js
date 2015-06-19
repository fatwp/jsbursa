/* global getWinner */
var data = {
  size: 0,
  figure: 'x',
  message: '',
  stop: false,
  steps: []
};

var game = localStorage.getItem('game');

window.addEventListener('load', function wael() {
  'use strict';

  var button = document.querySelector('.startNewGame');
  var gbutton = document.querySelector('.generateField');
  var input = document.querySelector('.count');
  var field = document.querySelector('.field');
  var figure = 'x';
  var message = document.querySelector('.winner-message');
  var error = document.querySelector('.error-message');
  var stopGame = false;
  var initForm = document.querySelector('.startGame');
  var gameArea = document.querySelector('.mainGame');

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function addCells(size) {
    var row = document.createElement('div');
    var cell;
    var i;
    row.className = 'row';
    field.appendChild(row);
    for (i = 0; i < size; i++) {
      cell = document.createElement('div');
      cell.className = 'cell';
      row.appendChild(cell);
    }
  }

  function startSavedGame(size, steps) {
    var x;
    var i;
    var cells;

    for (i = 0; i < size; i++) {
      addCells(size);
    }
    cells = document.querySelectorAll('.cell');

    if (steps) {
      for (x = 0; x < cells.length; x++) {
        cells[x].className = steps[x];
      }
    }

    initForm.style.display = 'none';
    gameArea.style.display = 'block';
  }
  if (game) {
    data = JSON.parse(game);
    figure = data.figure;
    message.innerHTML = data.message;
    stopGame = data.stop;
    if (data.steps.length > 0) {
      startSavedGame(data.size, data.steps);
    } else {
      startSavedGame(data.size, null);
    }
  }


  function saveGame(size, f, m, stop) {
    var cells = document.querySelectorAll('.cell');
    var i;
    data.steps = [];
    for (i = 0; i < cells.length; i++) {
      data.steps.push(cells[i].className);
    }
    data.size = size;
    data.figure = f;
    data.message = m;
    data.stop = stop;
    localStorage.setItem('game', JSON.stringify(data));
  }

  function startGame(size) {
    var i;
    saveGame(size);
    initForm.style.display = 'none';
    gameArea.style.display = 'block';
    for (i = 0; i < size; i++) {
      addCells(size);
    }
  }

  function nextMove(e) {
    var current = e.target;

    if (!current.classList.contains('field')) {
      if (!stopGame) {
        if (!current.classList.contains('o')) {
          if (!current.classList.contains('x')) {
            if (figure === 'x') {
              current.classList.add(figure);
              figure = 'o';
            } else {
              current.classList.add(figure);
              figure = 'x';
            }
            if (getWinner() === 'o') {
              message.innerHTML = 'Нолик победил';
              stopGame = true;
            } else if (getWinner() === 'x') {
              message.innerHTML = 'Крестик победил';
              stopGame = true;
            }
          }
        }
      }
    }
    saveGame(input.value, figure, message.innerHTML, stopGame);
  }

  function clearAll() {
    var cells = document.querySelectorAll('.cell');
    var i;
    figure = 'x';
    message.innerHTML = '';
    stopGame = false;
    for ( i = 0; i < cells.length; i++) {
      cells[i].classList.remove('x');
      cells[i].classList.remove('o');
    }
    localStorage.clear();
    field.innerHTML = '';
    initForm.style.display = 'block';
    gameArea.style.display = 'none';
  }

  button.addEventListener('click', clearAll);

  field.addEventListener('click', nextMove);

  gbutton.addEventListener('click', function gael() {
    if ((isNumeric(input.value)) && input.value >= 5 && input.value <= 15) {
      if (input.value.indexOf('.') === -1) {
        startGame(input.value);
      } else {
        error.innerHTML = 'Вы ввели некорректное число';
      }
    } else {
      error.innerHTML = 'Вы ввели некорректное число';
    }
  });

  input.addEventListener('keydown', function iael(e) {
    if (e.keyCode === 13) {
      if ((isNumeric(input.value)) && input.value >= 5 && input.value <= 15) {
        if (input.value.indexOf('.') === -1) {
          startGame(input.value);
        } else {
          error.innerHTML = 'Вы ввели некорректное число';
        }
      } else {
        error.innerHTML = 'Вы ввели некорректное число';
      }
    }
  });
});
