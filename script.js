//====================
//  Global Variables
//====================

var canClick = true;
var firstCardClicked = null;
var secondCardClicked = null;
var attempts = 0;
var matches = 0;
var accuracy = 0;
var gamesPlayed = 0;
var totalPossibleMatches = 9;

//====================
//   Document Ready
//====================

$(document).ready(function() {
    $('.card').click(card_clicked);
    $('.reset-button').click(reload_game);
    randomize();
});

//====================
//     Functions
//====================

function card_clicked() {
    if (canClick === true && $(this).find('.back').length) {
        //hides back of first card selected
        if(firstCardClicked === null){
            firstCardClicked = this;
            $(this).find('.back').addClass('hidden');
        } else {
            //hides back of second card selected
            secondCardClicked = this;
            $(this).find('.back').addClass('hidden');
            attempts++;
            calculate_accuracy();
            display_stats();

            //Compare front of cards to check for match
            if ($(firstCardClicked).find('.front').attr('src') === ($(secondCardClicked).find('.front').attr('src'))){
                matches++;
                calculate_accuracy();
                display_stats();
                firstCardClicked = null;
                secondCardClicked = null;
                if(matches === totalPossibleMatches) {
                    $('.modal').modal('show');
                    gamesPlayed++;
                    display_stats();
                } else {
                    // calculateAccuracy();
                    return;
                }
            } else {
                // canClick = false;
                //if unsuccessful match remove hidden calss to re-reveal back of both cards
                setTimeout(function(){
                    $(firstCardClicked).find('.back').removeClass('hidden');
                    $(secondCardClicked).find('.back').removeClass('hidden');
                    //Resets firstcardclicked AND secondcardclicked back to null so they can be selected again
                    firstCardClicked = null;
                    secondCardClicked = null;
                    canClick = true;
                    //Re-reveal back of card after 1 second of no resulting match
                }, 1000);
            }
        }
    }
}

//Calculate accuracy
function calculate_accuracy() {
    accuracy = Math.floor(matches/attempts * 100);
    return accuracy;
}

//Display stats
function display_stats() {
    $(".games-played").text(gamesPlayed);
    $(".attempts").text(attempts);
    $(".matches").text(matches);
    $(".accuracy").text(accuracy + "%");
}

//Reset stats, restart game
function reload_game() {
    attempts = 0;
    matches = 0;
    accuracy = 0;
    display_stats();
    $('.back').removeClass('hidden');
    randomize();
}

//Randomize cards
function randomize(){
    var divArray = $('.card-container').toArray();
    while(divArray.length > 0){
        var randomOrder = Math.floor(Math.random() * (divArray.length - 1));
        var takeElement = divArray.splice(randomOrder, 1);
        $('.game-area').append(takeElement[0]);
    }
}