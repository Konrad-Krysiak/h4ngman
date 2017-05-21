// VARIABLES
var words = ["word", "password", "few words more", "keys", "konrad", "programming", "football freestyle"];
var hiddenWord = "";
var fails = 5;
var randomWord = words[Math.floor(Math.random()*words.length)].toUpperCase();


String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function refresh() {
	location.reload();
}

function checkletter(letter) {
	if(randomWord.indexOf(letter) == -1) {
		fails--;
		document.getElementById("left").innerHTML = "Tries left: " + fails;
		document.getElementById(letter).style.color = "red";
		$("#"+letter).css("pointer-events", "none");
		if(fails==0) 
		{
			alert('You lost! What a shame!');
			document.getElementById("top").innerHTML =  randomWord;
			$("span.letter").css("pointer-events", "none");
			return;
		}
	}
	else {
		for(var i=0; i<randomWord.length;i++) if (randomWord.charAt(i) === letter) 
			hiddenWord = hiddenWord.replaceAt(i, letter);
		document.getElementById("top").innerHTML =  hiddenWord;
		$("#"+letter).css("pointer-events", "none");
		document.getElementById(letter).style.color = "lime";
	}

	// IF PLAYER WINS THE GAME
	if(hiddenWord === randomWord)  {
		alert("You won! Congratulations!");
		$("span.letter").css("pointer-events", "none");
	}
}

function begin() {
	for(x=1;x<=randomWord.length;x++) 
	{
		if(randomWord.charAt(x-1) != " ") hiddenWord += "-";
		else hiddenWord += " ";
		
	}
	document.getElementById("top").innerHTML = hiddenWord;
	document.getElementById("left").innerHTML = "Tries left: " + fails;
}