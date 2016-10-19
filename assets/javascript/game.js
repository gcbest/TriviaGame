
var corrects;
var incorrects;
var questionTimer;
var gameTimer;
var intervalKeeper;
var currentQuestion;
var isAnswerClicked;
var isRestartClicked = false;
var nextQuestionTimeout;
var currentQuestionTimeout;

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
	for (i=0; i < gameInformation.choices[currentQuestion].length; i++) {
		$(".theChoices").append("<button class='answerButtons' id=" + i + ">" + gameInformation.choices[currentQuestion][i] + "</button><br>");
	}

}


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
			setQuestionOne();
			
			
		}

		if (currentQuestion == 1 && isAnswerClicked == false) {
			incorrectAnswerFeedback(triniGame.choices[currentQuestion][0]);
			setQuestionTwo();
			
		}
		
		if (currentQuestion == 2 && isAnswerClicked == false) {
			incorrectAnswerFeedback(triniGame.choices[currentQuestion][2]);
			setQuestionThree();
		}

		if (currentQuestion == 3 && isAnswerClicked == false) {
			incorrectAnswerFeedback(triniGame.choices[currentQuestion][3]);
			setQuestionFour();
		}

		if (currentQuestion == 4 && isAnswerClicked == false) {
			incorrectAnswerFeedback(triniGame.choices[currentQuestion][1]);
			setResultsPage();
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

// incorrect answer provided
function incorrectAnswerFeedback(answer) {
	$(".theChoices").empty();
	$(".feedback").html("Sorry the correct answer was:<br>" + answer);
}


function setQuestionOne() {
	nextQuestionTimeout = setTimeout(questionOne, 3000);
}

function setQuestionTwo() {
	nextQuestionTimeout = setTimeout(questionTwo, 3000);
}

function setQuestionThree() {
	nextQuestionTimeout = setTimeout(questionThree, 3000);
}

function setQuestionFour() {
	nextQuestionTimeout = setTimeout(questionFour, 3000);
}

function setResultsPage() {
	nextQuestionTimeout = setTimeout(resultsPage, 3000);	
}

function checkAnswer(answerNum, next) {
	if (gameTimer > 0 && questionTimer > 0) {
		$(".answerButtons").click(function () {
			isAnswerClicked = true;
			if ($(this).attr("id") == answerNum) {
				correctAnswerFeedback(triniGame.pictures[currentQuestion]);
				corrects++;
				currentQuestion++;
				clearInterval(questionTimeKeeper);
				clearInterval(gameTimeKeeper);
				setTimeout(startGameTimer, 3000);
				next();
				
			} 

			else {
				incorrectAnswerFeedback(triniGame.choices[currentQuestion][answerNum]);
				incorrects++;
				clearInterval(questionTimeKeeper);
				currentQuestion++;
				next();							
			}
		});	
	}
		
}

function questionZero() {
	// variable to determine which question the user is on
	// currentQuestion = 0;
	isAnswerClicked = false;
	askQuestion(triniGame);
	checkAnswer(1, setQuestionOne);
}


function questionOne() {
	currentQuestion = 1;
	isAnswerClicked = false;
	resetQuestionTimer();
	startQuestionTimer();
	askQuestion(triniGame);
	checkAnswer(0, setQuestionTwo);
}


function questionTwo() {
	currentQuestion = 2;
	isAnswerClicked = false;
	resetQuestionTimer();
	startQuestionTimer();
	askQuestion(triniGame);
	checkAnswer(2, setQuestionThree);
}

function questionThree() {
	currentQuestion = 3;
	isAnswerClicked = false;
	resetQuestionTimer();
	startQuestionTimer();
	askQuestion(triniGame);
	checkAnswer(3, setQuestionFour);
}

function questionFour() {
	currentQuestion = 4;
	isAnswerClicked = false;
	resetQuestionTimer();
	startQuestionTimer();
	askQuestion(triniGame);
	checkAnswer(1, setResultsPage);
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