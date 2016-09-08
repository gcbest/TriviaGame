var corrects;
var incorrects;
var questionTimer;
var gameTimer;
var intervalKeeper;
var currentQuestion;
var isAnswerClicked;
var isRestartClicked = false;
var nextQuestionTimeout;

var qAnda = {
	question0: "What is the Capital of Trinidad & Tobago?",
	question1: "Who is Trinidad & Tobago's Prime Minister?",
	question2: "What is Trinidad's National Bird?",
	question3: "When did Trinidad & Tobago gain independence?",
	question4: "Which Trini was the first black woman to win Miss Universe?",
	choices0: ["Arima", "Port Of Spain", "Diego Martin", "Toco"],
	choices1: ["Keith Rowley", "Kamla Persad", "Patrick Manning", "Brian Lara"],
	choices2: ["Bald Eagle", "Mighty Sparrow", "Scarlet Ibis", "Trini Pigeon"],
	choices3: ["August 31, 1961", "September 30, 1961", "July 31, 1961", "August 31, 1962"],
	choices4: ["Giselle Laronde","Janelle Commissiong", "Margot Rita Bourgeois", "Wendy Fitzwilliam"]
}

var answerPics = {
	questionZero: "<img src='assets/images/PoS.jpg'>",
	questionOne: "<img src='assets/images/chiefKeith.jpg'>",
	questionTwo: "<img src='assets/images/scarlet.jpg'>",
	questionThree:"<img src='assets/images/independence.jpg'>",
	questionFour: "<img src='assets/images/janelle.jpg'>"
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
	// isRestartClicked = false;
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
			console.log(isRestartClicked);
			incorrectAnswerFeedback(qAnda.choices0[1]);
			nextQuestionTimeout = setTimeout(questionOne, 2000);
		}

		if (currentQuestion == 1 && isAnswerClicked == false) {
			incorrectAnswerFeedback(qAnda.choices1[0]);
			nextQuestionTimeout = setTimeout(questionTwo, 2000);
		}
		
		if (currentQuestion == 2 && isAnswerClicked == false) {
			incorrectAnswerFeedback(qAnda.choices2[2]);
			nextQuestionTimeout = setTimeout(questionThree, 2000);
		}

		if (currentQuestion == 3 && isAnswerClicked == false) {
			incorrectAnswerFeedback(qAnda.choices3[3]);
			nextQuestionTimeout = setTimeout(questionFour, 2000);
		}

		if (currentQuestion == 4 && isAnswerClicked == false) {
			incorrectAnswerFeedback(qAnda.choices4[1]);
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
	$("#pregunta").text(qAnda.question0);
	// $(".theChoices").html($.each(qAnda.choices0, function(index, value) {
	// 	var str = "<button>" + value + "</button><br>";
	// 	console.log(str);
	// 	return str; 
	// }));

	emptyChoices();
	emptyFeedback();
	isAnswerClicked = false;
	for (i=0; i < qAnda.choices0.length; i++) {
		$(".theChoices").append("<button class='answerButtons' id=" + i + ">" + qAnda.choices0[i] + "</button><br>");
	}

	if (gameTimer > 0 && questionTimer > 0) {
		$(".answerButtons").click(function () {
			isAnswerClicked = true;
			if ($(this).attr("id") == 1) {
				correctAnswerFeedback(answerPics.questionZero);
				corrects++;
				clearInterval(questionTimeKeeper);
				clearInterval(gameTimeKeeper);
				nextQuestionTimeout = setTimeout(questionOne, 3000);
				setTimeout(startGameTimer, 3000);
				
			} 

			else {
				incorrectAnswerFeedback(qAnda.choices0[1]);
				incorrects++;
				clearInterval(questionTimeKeeper);
				nextQuestionTimeout = setTimeout(questionOne, 2000);							
			}
		});	
	}
}


function questionOne() {
	resetQuestionTimer();
	currentQuestion++;
	startQuestionTimer();
	emptyChoices();
	emptyFeedback();
	isAnswerClicked = false;
	$("#pregunta").text(qAnda.question1);
	// $(".theChoices").html($.each(qAnda.choices0, function(index, value) {
	// 	var str = "<button>" + value + "</button><br>";
	// 	console.log(str);
	// 	return str; 
	// }));
	
	for (i=0; i < qAnda.choices1.length; i++) {
		$(".theChoices").append("<button class='answerButtons' id=" + i + ">" + qAnda.choices1[i] + "</button><br>");
		// $("button").attr("id");
	}

	$(".answerButtons").click(function () {
		isAnswerClicked = true;
		if ($(this).attr("id") == 0) {
			correctAnswerFeedback(answerPics.questionOne);
			corrects++;
			clearInterval(questionTimeKeeper);
			clearInterval(gameTimeKeeper);
			nextQuestionTimeout = setTimeout(questionTwo, 3000);
			setTimeout(startGameTimer, 3000);
		} 

		else {
			incorrectAnswerFeedback(qAnda.choices1[0]);
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
	emptyChoices();
	emptyFeedback();
	isAnswerClicked = false;
	$("#pregunta").text(qAnda.question2);
	// $(".theChoices").html($.each(qAnda.choices0, function(index, value) {
	// 	var str = "<button>" + value + "</button><br>";
	// 	console.log(str);
	// 	return str; 
	// }));
	
	for (i=0; i < qAnda.choices2.length; i++) {
		$(".theChoices").append("<button class='answerButtons' id=" + i + ">" + qAnda.choices2[i] + "</button><br>");
		// $("button").attr("id", qAnda.choices0[i]);
	}

	$(".answerButtons").click(function () {
		isAnswerClicked = true;
		if ($(this).attr("id") == 2) {
			correctAnswerFeedback(answerPics.questionTwo);
			corrects++;
			clearInterval(questionTimeKeeper);
			clearInterval(gameTimeKeeper);
			nextQuestionTimeout = setTimeout(questionThree, 3000);
			setTimeout(startGameTimer, 3000);
		} 

		else {
			incorrectAnswerFeedback(qAnda.choices2[2]);
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
	emptyChoices();
	emptyFeedback();
	isAnswerClicked = false;
	$("#pregunta").text(qAnda.question3);
	// $(".theChoices").html($.each(qAnda.choices0, function(index, value) {
	// 	var str = "<button>" + value + "</button><br>";
	// 	console.log(str);
	// 	return str; 
	// }));
	
	for (i=0; i < qAnda.choices3.length; i++) {
		$(".theChoices").append("<button class='answerButtons' id=" + i + ">" + qAnda.choices3[i] + "</button><br>");
		// $("button").attr("id", qAnda.choices0[i]);
	}

	$(".answerButtons").click(function () {
		isAnswerClicked = true;
		if ($(this).attr("id") == 3) {
			correctAnswerFeedback(answerPics.questionThree);
			corrects++;
			clearInterval(questionTimeKeeper);
			clearInterval(gameTimeKeeper);
			nextQuestionTimeout = setTimeout(questionFour, 3000);
			setTimeout(startGameTimer, 3000);
		} 

		else {
			incorrectAnswerFeedback(qAnda.choices3[3]);
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
	emptyChoices();
	emptyFeedback();
	isAnswerClicked = false;
	$("#pregunta").text(qAnda.question4);
	// $(".theChoices").html($.each(qAnda.choices0, function(index, value) {
	// 	var str = "<button>" + value + "</button><br>";
	// 	console.log(str);
	// 	return str; 
	// }));
	
	for (i=0; i < qAnda.choices4.length; i++) {
		$(".theChoices").append("<button class='answerButtons' id=" + i + ">" + qAnda.choices4[i] + "</button><br>");
		// $("button").attr("id", qAnda.choices0[i]);
	}

	$(".answerButtons").click(function () {
		isAnswerClicked = true;
		if ($(this).attr("id") == 1) {
			correctAnswerFeedback(answerPics.questionFour);
			corrects++;
			clearInterval(questionTimeKeeper);
			clearInterval(gameTimeKeeper);
			nextQuestionTimeout = setTimeout(resultsPage, 3000);
			setTimeout(gameTimeKeeper, 3000);
		} 

		else {
			incorrectAnswerFeedback(qAnda.choices4[1]);
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