(function ( $ ) {
    "use strict";
    // VARIABLES
    var hiddenWord = "",
        fails = 0,
        randomWord,
        tip,
        begin = function() {
            randomWord = $("#wordfield").val().toUpperCase();
            tip = $("#wordfield2").val();

            if(randomWord === "" || tip === "") {
                $(".alert_box").text("You need to fill both fields!").show();
                return;
            }
            else if(hasNumber(randomWord))
                {
                $(".alert_box").text("Word can not contain numbers!").show();
                return;
            }
            roll();
            for(var x=1;x<=randomWord.length;x++) {
                if (randomWord.charAt(x-1) != " ") {
                    hiddenWord += "-";
                }
                else {
                   hiddenWord += " ";  
                }
            }

            $("#tip").text("Tip: "+tip);
            $("#top").text(hiddenWord);
            $("#left").html("<img src=\"img/s0.jpg\"/>");
        },
        checkletter = function(letter) {
            if(randomWord.indexOf(letter) == -1) {
                fails++;
                $("#left").html("<img src=\"img/s"+fails+".jpg\" />");
                $("#"+letter).css("color", "red");
                $("#"+letter).css("pointer-events", "none");

                // IF PLAYER LOSES
                if(fails==9) {
                    $(".layer").show();
                    $(".Lbanner").css("display", "flex");
                    return;
                }
            }
            else {
                for(var i=0; i<randomWord.length;i++) if (randomWord.charAt(i) === letter) {
                    hiddenWord = hiddenWord.replaceAt(i, letter);
                }

                $("#top").html(hiddenWord);
                $("#"+letter).css("pointer-events", "none");
                $("#"+letter).css("color", "lime");
            }

            // IF PLAYER WINS 
            if(hiddenWord === randomWord)  {
                $(".layer").show();
                $(".Wbanner").css("display", "flex");
            }
        },
        roll = function() {
            $("#intro, #hangman").animate({
                bottom: "100vh"
            }, 1000);
        },
        refresh = function() {
            location.reload();
        },
        hasNumber = function(myString) {
          return /\d/.test(myString);
        };

    String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
    }

//-------------
    
    
    
    for (let item of $("#right span")) {
        item.addEventListener("click", function () {
            let text = $(this).text();
            $(this).attr("id", text);
            checkletter(text);
        });
    }

    $(".button_start").click(function() {
        begin();
    });
    
    $(".alert_box").click(function() {
        $(this).hide();
    });

    $("#ref").click(function() {
        refresh();
    });
}( jQuery ));