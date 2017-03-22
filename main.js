/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Dice
+++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


function Di() {
  this.value = undefined;
  this.sides = 6;
  this.roll = function() {
    this.value = Math.ceil(Math.random() * this.sides);
    return this.value; //i don't understand why this makes it work but it looks to be required
  };
}


function isInArray(value, array) {
  return (array.indexOf(value) > -1);
}


function getProbabilities() {

  var di1 = new Di();
  var di2 = new Di();

  var minRoll = 2;
  var maxiumRoll = di1.sides * 2;

  var rollResults = [];
  for (var i = 0; i <= maxiumRoll-2; i++) {
    rollResults[i] = 0;
  }
  // console.log(rollResults);

  var numberOfRolls = 1000;

  console.log('\n\n🎲 GETTING DOUBLE DICE ROLL  🎲\n🎲 TOTAL PROBABILITIES ✨💯✨ 🎲');
  // clarification: does the i++ happen AFTER code in the for loop is executed?
  // i.e. will this function roll 1000 times or 1001 times?
  // seems like it increments i at the end of the loop?
  // seems like it stars on zero, goes up to numberOfRolls-1 (thanks to the less than sign)
  // so if we wanted to do it 1000 times, but all the way up to 1000,
  // we'd have to do for(i = 1; i <= numberOfRolls; i++) ?
  for(var i = 0; i < numberOfRolls; i++) {
    var currentRoll = di1.roll() + di2.roll();
    // var targetIndex = rollResults.indexOf(currentRoll);
    var targetIndex = currentRoll-2;
    rollResults[targetIndex]++;
    // console.log('roll');
    // console.log(currentRoll);
    // console.log('in rollResults array');
    // console.log(rollResults[targetIndex]);
  }
  for (var i = 0; i < rollResults.length; i++) {
    console.log( (i+minRoll) + ' : ' + rollResults[i]);
  }
  console.log(rollResults);

}

getProbabilities();














/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Playing Cards
+++++++++++++++++++++++++++++++++++++++++++++++++++++++ */



// Constructors

function PlayingCard(value, suit) {
  this.value = value;
  this.suit = suit;
}


function Deck() {
  // var totalCards = 52;
  var suits = ['hearts', 'daimonds', 'clubs', 'spades'];
  var values = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  // 11 = jack, 12 = queen, 13 = king, 14 = ace
  var currentDrawIndex;

  this.cards = [];

  this.makeCards = function() {
    for(var suitCount = 0; suitCount < suits.length; suitCount++) {
      for(var valCount = 0; valCount < values.length; valCount ++) {
        this.cards.push(new PlayingCard(values[valCount], suits[suitCount]));
      }
    }
    totalCards = this.cards.length;
    currentDrawIndex = totalCards - 1;
    return this.cards;
  };

  this.shuffle = function() {
    var currentIndex = this.cards.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }

    return this.cards;
  };

  this.draw = function(){
    if(currentDrawIndex > -1){
      currentDrawIndex--;
      return this.cards[currentDrawIndex+1];
    } else {
      console.log('deck ran dry');
    }
  };
}


// Play Cards

console.log('\n\n~~~~~~~~~ PLAYING CARDS ~~~~~~~~~');

var deck = new Deck();
deck.makeCards();
deck.shuffle();
console.log(deck);




var $displayedCard = $('.current-card');
var $numberDisplay = $('.number');
var $suitDisplay = $('.suit');
var $btnDraw = $('.btn-draw');


function displayCard(card) {
  $displayedCard.removeClass();
  $displayedCard.addClass('current-card');
  if (card.value == undefined || card.value == null) {
    return false;
  } else if(card.value == 11){
    $numberDisplay.html('jack');
  } else if (card.value == 12) {
    $numberDisplay.html('queen');
  } else if (card.value == 13) {
    $numberDisplay.html('king');
  } else if (card.value == 14) {
    $numberDisplay.html('ace');
  } else {
    $numberDisplay.html(card.value);
  }
  $suitDisplay.html(card.suit);
  $displayedCard.addClass(card.suit);
}


function drawCard() {
  var currentCard = deck.draw();
  displayCard(currentCard);

  console.log(currentCard);
}

$btnDraw.on('click', drawCard);





//
