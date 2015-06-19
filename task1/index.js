window.addEventListener('load', function(){

    // global variables
    var cells = document.querySelectorAll('.cell'),
        field = document.querySelector('.field'),
        button = document.querySelector('.startNewGame'),
        figure = 'x',
        message = document.querySelector('.winner-message'),
        stopGame = false;

    // remove all
    var clearAll = function(){
        figure = 'x';
        message.innerHTML = '';
        stopGame = false;
        for( var i = 0; i < cells.length; i++){
            cells[i].classList.remove('x');
            cells[i].classList.remove('o');
        }
    };

    // next move
    var nextMove = function(e){

        // current
        var current = e.target;

        if (!current.classList.contains('field')){
            // add figure
            if(!stopGame){
                if(!current.classList.contains('o')){
                    if(!current.classList.contains('x')){
                        if (figure === "x"){
                            current.classList.add(figure);
                            figure = "o";
                        } else {
                            current.classList.add(figure);
                            figure = "x";
                        }

                        console.log(getWinner());

                        if(getWinner() === 'o'){
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
    };

    // main
    button.addEventListener('click', clearAll);

    field.addEventListener('click', nextMove);
});