// VARIABLES
var hiddenWord = "";
var fails = 0;
window.onload = render;

function render() {
    $("#intro").css("display", "block");
    $("#hangman").css("display", "none");
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function refresh() {
	location.reload();
}

function checkletter(letter) {
	if(randomWord.indexOf(letter) == -1) {
		fails++;
        document.getElementById("left").innerHTML = "<img src=\"img/s"+fails+".jpg\" />";
		document.getElementById(letter).style.color = "red";
		$("#"+letter).css("pointer-events", "none");
        
        // IF PLAYER LOSES
		if(fails==9) 
		{
            $(".lost img").show();
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

	// IF PLAYER WINS 
	if(hiddenWord === randomWord)  {
        $(".won img").show();
	}
}

function begin() {
    randomWord = document.getElementById("wordfield").value.toUpperCase();
    tip = document.getElementById("wordfield2").value;
    if(randomWord == "" || tip == "") {
        alert("You need to fill both fields!");
        return;
    }
    $("#hangman").css("display", "block");
    $("#intro").css("display", "none");
	for(x=1;x<=randomWord.length;x++) 
	{
		if(randomWord.charAt(x-1) != " ") 
            hiddenWord += "-";
		else hiddenWord += " ";
		
	}
    document.getElementById("tip").innerHTML = "Tip: "+tip;
	document.getElementById("top").innerHTML = hiddenWord;
    document.getElementById("left").innerHTML = "<img src=\"img/s0.jpg\" />";
}