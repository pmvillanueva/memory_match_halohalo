/**
 * Created by Paul M. Villanueva on 7/24/17.
 */

var canClick = true;
var firstCardClicked = null;
var secondCardClicked = null;
var attempts = 0;
var matches = 0;
var accuracy = 0;
var gamesPlayed = 0;
var totalPossibleMatches = 9;

//TARGET CARD CLASS ON LOAD TO ENABLE CARDCLICK FUNCTION
$(document).ready(function() {
    $('.card').click(card_clicked);
    $('.reset-button').click(reload_game);
    randomize();
});

function card_clicked() {
    if (canClick && $(this).find('.back').length) {
        // HIDES FIRST CARD SELECTED
        if(firstCardClicked === null){
            $(this).find('.back').addClass('hidden');
            firstCardClicked = this;
            //HIDES SECOND CARD SELECTED
        } else {
            $(this).find('.back').addClass('hidden');
            secondCardClicked = this;
            attempts++;
            calculate_accuracy();
            display_stats();

            //COMPARE FRONT OF CARDS TO CHECK FOR MATCH
            if ($(firstCardClicked).find('.front').attr('src') === ($(secondCardClicked).find('.front').attr('src'))){
                matches++;
                calculate_accuracy();
                display_stats();
                firstCardClicked = null;
                secondCardClicked = null;
                if(matches === totalPossibleMatches) {
                    $('.modal').modal('show')
                    gamesPlayed++;
                    display_stats();
                } else {
                    // calculateAccuracy();
                    return;
                }
            } else {
                // canClick = false;
                //IF UNSUCCESSFUL MATCH REMOVE HIDDEN CLASS TO RE-REVEAL BACK OF FIRST AND SECOND CARDS
                setTimeout(function(){
                    $(firstCardClicked).find('.back').removeClass('hidden');
                    $(secondCardClicked).find('.back').removeClass('hidden');
                    //RESETS FIRSTCARDCLICKED AND SECONDCARDCLICKED BACK TO NULL SO THEY CAN BE SELECTED AGAIN
                    firstCardClicked = null;
                    secondCardClicked = null;
                    canClick = true;
                    //RE-REVEAL BACK OF CARD AFTER 1 SECOND OF NO RESULTING MATCH
                }, 1000);
            }
        }
    }
}

function calculate_accuracy() {
    accuracy = Math.floor(matches/attempts * 100);
    return accuracy;
}

function display_stats() {
    $(".games-played").text(gamesPlayed);
    $(".attempts").text(attempts);
    $(".matches").text(matches);
    $(".accuracy").text(accuracy + "%");
}

function reload_game() {
    attempts = 0;
    matches = 0;
    accuracy = 0;
    display_stats();
    $('.back').removeClass('hidden');
    randomize();
}

function randomize(){
    var divArray = $('.card-container').toArray();
    while(divArray.length > 0){
        var randomOrder = Math.floor(Math.random() * (divArray.length - 1));
        var takeElement = divArray.splice(randomOrder, 1);
        $('.game-area').append(takeElement[0]);
    }
}
