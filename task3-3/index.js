/* global gameUrls */

var gameObj = {
  userid:'',
  gameid:'',
  nextmove: ''
};

window.addEventListener('load', function load() {
  'use strict';

  var existingGames = document.querySelector('.existing-games');
  var createGame = document.querySelector('.createGame');
  var startGame = document.querySelector('.startGame');
  var mainGame = document.querySelector('.mainGame');
  var newGame = document.querySelector('.newGame');
  var statusMessage = document.querySelectorAll('.status-message');
  var field = document.querySelector('.field');
  var stopGame = false;
  var i;
  var data;
  var li;
  var lis;
  var register;
  var userID;

  function addCells(size) {
    var row = document.createElement('div');
    var cell;
    var a;
    row.className = 'row';
    field.appendChild(row);
    for (a = 0; a < size; a++) {
      cell = document.createElement('div');
      cell.className = 'cell';
      row.appendChild(cell);
    }
  }

  function startmyGame(size) {
    var s;
    for (s = 0; s < size; s++) {
      addCells(size);
    }
  }

  function clearAll() {
    var cells = document.querySelectorAll('.cell');
    var c;
    //message.innerHTML = '';
    for ( c = 0; c < cells.length; c++) {
      cells[c].classList.remove('x');
      cells[c].classList.remove('o');
    }
    field.innerHTML = '';
    startGame.style.display = 'block';
    mainGame.style.display = 'none';
  }

  function createMyGame(serverResponse){
    serverResponse.addEventListener('readystatechange', function listen() {
      if (serverResponse.status === 200) {
        if (serverResponse.readyState === serverResponse.DONE) {
          register = JSON.parse(serverResponse.responseText);
          // c3
          gameObj.gameid = register.yourId;
          w0.send(JSON.stringify({register: register.yourId}));
        }
      } else {
        statusMessage[0].innerHTML = 'Ошибка создания игры';
        createGame.removeAttribute('disabled');
      }
    });
  }

  function nextMove(e) {
    var current = e.target;
    var index = Array.prototype.indexOf.call(document.querySelectorAll('.cell'), current);
    if (!current.classList.contains('field')) {
      if (!stopGame) {
        if (!current.classList.contains('o')) {
          if (!current.classList.contains('x')) {
            if (gameObj.nextmove === 'o') {
              current.classList.add('o');
              gameObj.nextmove = 'x';
              sendMove('POST', gameUrls.move, userID, gameObj.gameid, index+1);
              stopGame = true;
            } else {
              current.classList.add('x');
              gameObj.nextmove = 'o';
              sendMove('POST', gameUrls.move, userID, gameObj.gameid, index+1);
              stopGame = true;
            }
          }
        }
      }
    }
  }

  function sendMove(method, url, user, game, ind) {
    var call = new XMLHttpRequest();
    call.open(method, url);
    call.setRequestHeader('Content-Type', 'application/json');
    call.setRequestHeader('Game-ID', game);
    call.setRequestHeader('Player-ID', user);



    call.send(JSON.stringify({move: ind-1}));

    call.addEventListener('readystatechange', function listen() {
      if (call.status === 200) {
        if (call.readyState === call.DONE) {
          if(JSON.parse(call.responseText).success) {
            if(JSON.parse(call.responseText).win) {
              statusMessage[1].innerHTML = JSON.parse(call.responseText).win;
              newGame.innerHTML = 'Новая игра';
            } else {
              requestMove('GET', gameUrls.move, userID, gameObj.gameid);
            }
          }
        }
      } else if (call.responseText) {
        statusMessage[1].innerHTML = call.responseText;
      } else {
        statusMessage[1].innerHTML = 'Неизвестная ошибка';
      }
    });

  }

  function surrender(method, url, user, game) {
    var call = new XMLHttpRequest();
    call.open(method, url);
    call.setRequestHeader('Content-Type', 'application/json');
    call.setRequestHeader('Game-ID', game);
    call.setRequestHeader('Player-ID', user);
    call.send();

    call.addEventListener('readystatechange', function listen() {
      if (call.status === 200) {
        if (call.readyState === call.DONE) {
          startGame.style.display = 'block';
          mainGame.style.display = 'none';
        }
      } else if (call.responseText){
        statusMessage[1].innerHTML = call.responseText;
      } else {
        statusMessage[1].innerHTML = 'Неизвестная ошибка';
      }
    });

  }

  function requestMove(method, url, user, game) {
    var call = new XMLHttpRequest();
    call.open(method, url);
    call.setRequestHeader('Content-Type', 'application/json');
    call.setRequestHeader('Game-ID', game);
    call.setRequestHeader('Player-ID', user);
    call.send();

    call.addEventListener('readystatechange', function listen() {
      var cells;
      var i;
      var move;
      if (call.status === 200) {
        if (call.readyState === call.DONE) {
          if(JSON.parse(call.responseText).move){
            if(JSON.parse(call.responseText).win) {
              move = JSON.parse(call.responseText).move;
              cells = document.querySelectorAll('.cell');

              for (i = 0; i < cells.length; i++) {

                if (i === move) {
                  if (!cells[i].classList.contains('o')) {
                    if (!cells[i].classList.contains('x')) {
                      if (gameObj.nextmove === 'o') {
                        cells[i].classList.add('o');
                        gameObj.nextmove = 'x';
                        field.addEventListener('click', nextMove);
                      } else {
                        cells[i].classList.add('x');
                        gameObj.nextmove = 'o';
                        field.addEventListener('click', nextMove);
                      }
                    }
                  }
                }
              }

              statusMessage[1].innerHTML = JSON.parse(call.responseText).win;
              newGame.innerHTML = 'Новая игра';
            } else {
              stopGame = false;
              move = JSON.parse(call.responseText).move;

              cells = document.querySelectorAll('.cell');


              for (i = 0; i < cells.length; i++) {

                if (i === move) {
                  if (!cells[i].classList.contains('o')) {
                    if (!cells[i].classList.contains('x')) {
                      if (gameObj.nextmove === 'o') {
                        cells[i].classList.add('o');
                        gameObj.nextmove = 'x';
                        field.addEventListener('click', nextMove);
                      } else {
                        cells[i].classList.add('x');
                        gameObj.nextmove = 'o';
                        field.addEventListener('click', nextMove);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        console.log(call);
        //requestMove('GET', gameUrls.move, userID, gameObj.gameid);
      }
    });
  }

  function connectMyGame(serverResponse){
    var myside;
    serverResponse.addEventListener('readystatechange', function listen() {
      // n5
      if (serverResponse.status === 200) {
        if (serverResponse.readyState === serverResponse.DONE) {
          startGame.style.display = 'none';
          mainGame.style.display = 'block';
          // create field
          startmyGame(10);

          myside = JSON.parse(serverResponse.responseText).side;





 if ( myside === 'x') {


    field.addEventListener('click', nextMove);

    } else if ( myside === 'o') {

   requestMove('GET', gameUrls.move, userID, gameObj.gameid);
 }



        }
        // n3
      } else if (serverResponse.status === 410) {
        statusMessage[0].innerHTML = 'Ошибка старта игры: другой игрок не ответил';
        //n4
      } else {
        statusMessage[0].innerHTML = 'Неизвестная ошибка старта игры';
      }
    });
  }

  function requestCreate(method, url, user, game, callback) {
    var call = new XMLHttpRequest();
    call.open(method, url);
    call.setRequestHeader('Content-Type', 'application/json');

    if (user && game) {
      //call.setRequestHeader('player', user);
      //call.setRequestHeader('game', game);
      call.send(JSON.stringify({player: user, game: game}));
      callback(call);
    } else {
      callback(call);
      call.send();
    }
  }

  var w0 = new WebSocket(gameUrls.list);

  w0.addEventListener('message', function message(event) {
    data = JSON.parse(event.data);

    // W1
    if (data.action === 'add') {
      li = document.createElement('li');
      li.innerHTML = data.id;
      existingGames.appendChild(li);
      // W2
    } else if (data.action === 'remove') {
      lis = document.querySelectorAll('li');
      for (i = 0; i < lis.length; i++) {
        if (lis[i].innerHTML === data.id) {
          lis[i].parentNode.removeChild(lis[i]);
        }
      }
    } else if (data.action === 'startGame') {
      // W3
      userID = data.id;
      // n1
      statusMessage[0].innerHTML = 'Ожидаем начала игры';
      createGame.setAttribute('disabled', 'disabled');
      // n2
      requestCreate('POST', gameUrls.gameReady, userID, gameObj.gameid, connectMyGame);
      // W4
    } else if (data.error) {
      statusMessage[0].innerHTML = data.error;
    }
  });

  // c1
  createGame.addEventListener('click', function click() {
    createGame.setAttribute('disabled', 'disabled');
    // c2
    requestCreate('POST', gameUrls.newGame, null, null, createMyGame);
  });

  // j1
  existingGames.addEventListener('click', function register(e) {
    var current = e.target;
    gameObj.gameid = current.innerHTML;
    if (!current.classList.contains('existing-games')) {
      w0.send(JSON.stringify({register: current.innerHTML}));
    }
  });

  newGame.addEventListener('click', function click() {
    if (newGame.innerHTML === 'Новая игра') {
      startGame.style.display = 'block';
      mainGame.style.display = 'none';
    } else {
      surrender('PUT', gameUrls.surrender, userID, gameObj.gameid);
    }
    //clearAll();
  });
});
