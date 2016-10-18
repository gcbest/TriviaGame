
var corrects;
var incorrects;
var questionTimer;
var gameTimer;
var intervalKeeper;
var currentQuestion;
var isAnswerClicked;
var isRestartClicked = false;
var nextQuestionTimeout;

// Create object with game info
// Array of questions 
// Array of answers
// Array of pics	

var triniQuestions = ["What is the Capital of Trinidad & Tobago?", "Who is Trinidad & Tobago's Prime Minister?", "What is Trinidad's National Bird?", 
						"When did Trinidad & Tobago gain independence?", "Which Trini was the first black woman to win Miss Universe?"];

var triniChoices = [["Arima", "Port Of Spain", "Diego Martin", "Toco"], ["Keith Rowley", "Kamla Persad", "Patrick Manning", "Brian Lara"], 
					["Bald Eagle", "Mighty Sparrow", "Scarlet Ibis", "Trini Pigeon"], ["August 31, 1961", "September 30, 1961", "July 31, 1961", "August 31, 1962"],
					["Giselle Laronde","Janelle Commissiong", "Margot Rita Bourgeois", "Wendy Fitzwilliam"]];

var answerPics = ["<img src='assets/images/PoS.jpg'>", "<img src='assets/images/chiefKeith.jpg'>", "<img src='assets/images/scarlet.jpg'>", 
					"<img src='assets/images/independence.jpg'>", "<img src='assets/images/janelle.jpg'>"];




// Constructor holding the game info.  Takes in an array of questions, a 2-dimensional array of answer choices,
// and an array of img tags to picture pictures which will be displayed on a correct choice
function gameInfo(questions, choices, pictures) {
	this.questions = questions,
	this.choices = choices,
	this.pictures = pictures
}

var triniGame = new gameInfo(triniQuestions, triniChoices, answerPics);

function askQuestion(gameInformation) {
	emptyChoices();
	emptyFeedback();
	$("#pregunta").text(gameInformation.questions[currentQuestion]);
	isAnswerClicked = false;
	for (i=0; i < gameInformation.choices[currentQuestion].length; i++) {
		$(".theChoices").append("<button class='answerButtons' id=" + i + ">" + gameInformation.choices[currentQuestion][i] + "</button><br>");
	}

}




// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ================================================================================================================

$("#restart").click(function(){
		isRestartClicked = true;
		clearInterval(gameTimeKeeper);
		clearInterval(questionTimeKeeper);
		clearTimeout(nextQuestionTimeout);
		play();
	});

function play() {
	gameTimer = 60;
	resetQuestionTimer();
	isAnswerClicked = false;
	currentQuestion = 0;
	corrects = 0;
	incorrects = 0;
	if (confirm("Are you ready to start the game?") == true) {
		startGameTimer();
		startQuestionTimer();
		$(".totalTiempo").html("Total Time Remaining: " + gameTimer + " seconds");
		$(".questionTiempo").html("Question Time Remaining: " + questionTimer + " seconds");
		questionZero();
	}

	else {
		alert("No problem, hit the 'Restart Game' button when you are ready.");
		gameTimeKeeper = "";
		questionTimeKeeper = '';
		nextQuestionTimeout = '';
	}
}

function startGameTimer() {
	gameTimeKeeper = setInterval(decreaseGameTime, 1000);
}

function startQuestionTimer() {
	questionTimeKeeper = setInterval(decreaseQuestionTime, 1000);
	$(".questionTiempo").html("Question Time Remaining: " + questionTimer + " seconds");
}

// function which the setInterval will call to decrease the Timer
function decreaseGameTime() {
	gameTimer--;
	
	$(".totalTiempo").html("Total Time Remaining: " + gameTimer + " seconds");
	
	if (gameTimer == 0) {
		resultsPage();
	}	
}

function decreaseQuestionTime() {
	questionTimer--;
	$(".questionTiempo").html("Question Time Remaining: " + questionTimer + " seconds");
	
	if (questionTimer <= 0) {
		$(".questionTiempo").html("Question Time Remaining: " + 0 + " seconds");
		clearInterval(questionTimeKeeper);

		if (currentQuestion == 0 && isAnswerClicked == false) {
			incorrectAnswerFeedback(triniGame.choices[currentQuestion][1]);
			nextQuestionTimeout = setTimeout(questionOne, 2000);
		}

		if (currentQuestion == 1 && isAnswerClicked == false) {
			incorrectAnswerFeedback(triniGame.choices[currentQuestion][0]);
			nextQuestionTimeout = setTimeout(questionTwo, 2000);
		}
		
		if (currentQuestion == 2 && isAnswerClicked == false) {
			incorrectAnswerFeedback(triniGame.choices[currentQuestion][2]);
			nextQuestionTimeout = setTimeout(questionThree, 2000);
		}

		if (currentQuestion == 3 && isAnswerClicked == false) {
			incorrectAnswerFeedback(triniGame.choices[currentQuestion][3]);
			nextQuestionTimeout = setTimeout(questionFour, 2000);
		}

		if (currentQuestion == 4 && isAnswerClicked == false) {
			incorrectAnswerFeedback(triniGame.choices[currentQuestion][1]);
			nextQuestionTimeout = setTimeout(resultsPage, 2000);
		}
	}
}


function resetQuestionTimer() {
	questionTimer = 6;
}

function emptyFeedback() {
	$(".feedback").empty();
}

function emptyChoices() {
	$(".theChoices").empty();
}

function correctAnswerFeedback(picture) {
	$(".theChoices").empty();
	$(".theChoices").html("Yup you got it!<br>" + picture);
}

// incorrect provided
function incorrectAnswerFeedback(answer) {
	$(".theChoices").empty();
	$(".feedback").html("Sorry the correct answer was:<br>" + answer);
}


function questionZero() {
	// variable to determine which question the user is on
	currentQuestion = 0;
	askQuestion(triniGame);
	if (gameTimer > 0 && questionTimer > 0) {
		$(".answerButtons").click(function () {
			isAnswerClicked = true;
			if ($(this).attr("id") == 1) {
				correctAnswerFeedback(triniGame.pictures[currentQuestion]);
				corrects++;
				clearInterval(questionTimeKeeper);
				clearInterval(gameTimeKeeper);
				nextQuestionTimeout = setTimeout(questionOne, 3000);
				setTimeout(startGameTimer, 3000);
				
			} 

			else {
				incorrectAnswerFeedback(triniGame.choices[currentQuestion][1]);
				incorrects++;
				clearInterval(questionTimeKeeper);
				currentQuestion++;
				nextQuestionTimeout = setTimeout(questionOne, 2000);							
			}
		});	
	}

}


function questionOne() {
	resetQuestionTimer();
	currentQuestion++;
	startQuestionTimer();
	askQuestion(triniGame);
	$(".answerButtons").click(function () {
		isAnswerClicked = true;
		if ($(this).attr("id") == 0) {
			correctAnswerFeedback(triniGame.pictures[currentQuestion]);
			corrects++;
			clearInterval(questionTimeKeeper);
			clearInterval(gameTimeKeeper);
			nextQuestionTimeout = setTimeout(questionTwo, 3000);
			setTimeout(startGameTimer, 3000);
		} 

		else {
			incorrectAnswerFeedback(triniGame.choices[currentQuestion][0]);
			incorrects++;
			clearInterval(questionTimeKeeper);
			nextQuestionTimeout = setTimeout(questionTwo, 2000);
		}


	});
}


function questionTwo() {
	resetQuestionTimer();
	currentQuestion++;
	startQuestionTimer();
	askQuestion(triniGame);

	$(".answerButtons").click(function () {
		isAnswerClicked = true;
		if ($(this).attr("id") == 2) {
			correctAnswerFeedback(triniGame.pictures[currentQuestion]);
			corrects++;
			clearInterval(questionTimeKeeper);
			clearInterval(gameTimeKeeper);
			nextQuestionTimeout = setTimeout(questionThree, 3000);
			setTimeout(startGameTimer, 3000);
		} 

		else {
			incorrectAnswerFeedback(triniGame.choices[currentQuestion][2]);
			incorrects++;
			clearInterval(questionTimeKeeper);
			nextQuestionTimeout = setTimeout(questionThree, 2000);
		}
	});
}

function questionThree() {
	resetQuestionTimer();
	currentQuestion++;
	startQuestionTimer();
	askQuestion(triniGame);

	$(".answerButtons").click(function () {
		isAnswerClicked = true;
		if ($(this).attr("id") == 3) {
			correctAnswerFeedback(triniGame.pictures[currentQuestion]);
			corrects++;
			clearInterval(questionTimeKeeper);
			clearInterval(gameTimeKeeper);
			nextQuestionTimeout = setTimeout(questionFour, 3000);
			setTimeout(startGameTimer, 3000);
		} 

		else {
			incorrectAnswerFeedback(triniGame.choices[currentQuestion][3]);
			incorrects++;
			clearInterval(questionTimeKeeper);
			nextQuestionTimeout = setTimeout(questionFour, 2000);
		}
	});
}

function questionFour() {
	resetQuestionTimer();
	currentQuestion++;
	startQuestionTimer();
	askQuestion(triniGame);

	$(".answerButtons").click(function () {
		isAnswerClicked = true;
		if ($(this).attr("id") == 1) {
			correctAnswerFeedback(triniGame.pictures[currentQuestion]);
			corrects++;
			clearInterval(questionTimeKeeper);
			clearInterval(gameTimeKeeper);
			nextQuestionTimeout = setTimeout(resultsPage, 3000);
			setTimeout(gameTimeKeeper, 3000);
		} 

		else {
			incorrectAnswerFeedback(triniGame.choices[currentQuestion][1]);
			incorrects++;
			clearInterval(questionTimeKeeper);
			nextQuestionTimeout = setTimeout(resultsPage, 2000);
		}
	});
}

function resultsPage(){

	clearInterval(gameTimeKeeper);
	clearInterval(questionTimeKeeper);
	$("#pregunta").empty();
	emptyFeedback();
	emptyChoices();
	$(".feedback").html("Game Over! <br>Number of Correct Answers: " + corrects + 
		"<br>Number of Incorrect Answers: " + incorrects);	
}

play();