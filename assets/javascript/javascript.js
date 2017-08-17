window.onload = function() {

var questionsPerObject = 2;

//var lengthTest=Object.keys(cars).length;
//console.log(lengthTest);

var cars = {
        name:"Cars",
        image:"car.jpg",
        played:0,
        0:{question:"What Year was the VW Beetle First Produced?",
                answer:2,
                array:["1942", "1963", "1945", "1972"],
                image:"beetle.gif",
                serial:"0.0",
                },
        1:{question:"What was the first mass produced TurboCharged Car?",
                answer:0,
                array:["Corvair", "Subaru", "Porsche", "Corolla"],
                image:"corvair.gif",
                serial:"0.1",
        },
        2:{question:"What was the first Car?",
                answer:0,
                array:["Benz Motorwagen", "Ford Model T", "Honda Exinge", "Dodge Number-1"],
                image:"benz.jpg",
                serial:"0.2",
        },
};
var movies = {
        name:"Movies",
        played:0,
        0:{question:"What is the oldest color movie?",
                answer:0,
                array:["Wizard of Oz", "Get Shorty", "Casablanca", "Four"],
                image:"oz.gif",
                serial:"1.0",
                },
        1:{question:"Who directed Psycho?",
                answer:3,
                array:["Tarantino", "Stalone", "Hitchcock", "Holly"],
                image:"hitchcock.gif",
                serial:"1.1",
        },
        2:{question:"What is the largest grossing movie? ($2.7billion)",
                answer:0,
                array:["Avatar", "Titanic", "Star Wars", "Frozen"],
                image:"avatar.gif",
                serial:"1.2",
        },
};
var anatomy = {
        name:"Anatomy",
        played:0,
        0:{question:"What is the largest bone in your body?",
                answer:0,
                array:["femur", "radius", "ulna", "meta-carpal"],
                image:"femur.gif",
                serial:"2.0",
                },
        1:{question:"What is the smallest bone in the human body?",
                answer:2,
                array:["caucaneous", "pinky", "stapes", "cranuim"],
                image:"stapes.gif",
                serial:"2.1",
        },
        2:{question:"How many chromosomes are in a gamete?",
                answer:1,
                array:["25", "23", "46", "44"],
                image:"gamete.gif",
                serial:"2.2",
        },
};
var birds = {
        name:"Birds",
        played:0,
        0:{question:"What is the largest bird?",
                answer:0,
                array:["Ostrich", "Condor", "Flamingo", "Heron"],
                image:"ostrich.gif",
                serial:"3.0",
                },
        1:{question:"Which bird is the deadliest?",
                answer:0,
                array:["Owl", "Pigeon", "Penguin", "Blue Heron"],
                image:"owl.gif",
                serial:"3.1",
        },
        2:{question:"Which bird is the smallest?",
                answer:3,
                array:["Pigeon", "Thimble Finch", "Crow","Hummingbird"],
                image:"hummingbird.gif",
                serial:"3.2",
        },
};
var state = "gameSelect";
var selectionID;
var ranNum;
var wins = 0;
var losses = 0;
var unAnswered = 0;
var categoryChosen = "";
var cats=[cars, movies, anatomy, birds];
var convertNum=["zero","one","two","three"];
var questionsPerObject=3;
var played=[];

 
function setGame(){
        imageSetter("trebek.gif")
        $("#timer").html("<h1>00</h1>");
        $("#wins").html("Wins: "+wins);
        $("#losses").html("Losses: "+losses);
        $("#unAnswered").html("Un-Answered: "+unAnswered);
        $("#directions").html("Pick A Category");
        for (i = 0; i < cats.length; i++){
            if(cats[i].played<questionsPerObject){
                $("#"+i).html(cats[i].name);
            }else{
                $("#"+i).html(cats[i].name);
                $("#"+i).removeClass("gameBtn");
                $("#"+i).css("opacity",".2");
            }
        }
        state = "gameInitialized";
        console.log(state);
}
function imageSetter(image){
        console.log("image setter");
        var imageLoc="assets/images/"+image;
        $("#imageBox").html("<img src='"+imageLoc+"' width=100% class='img-fluid rounded mx-auto d-block' alt='Responsive image'>");

}
function catChosen(catIndex){
        current = 0;
        counter=true;
        ranNum = Math.floor((Math.random() * questionsPerObject));
        playedTest=played.indexOf(cats[catIndex][ranNum].serial);
        console.log("PlayedTestIndex: ",playedTest);
        // if (playedTest==-1){
            while(playedTest!=-1){
                ranNum = Math.floor((Math.random() * questionsPerObject));
                playedTest=played.indexOf(cats[catIndex][ranNum].serial);
                console.log("PlayedTestIndex: ",playedTest);
            }
        // }
        console.log("PlayedTestIndex: ",playedTest);
        played.push(cats[catIndex][ranNum].serial);
        console.log("Played: ",played);
        cats[catIndex].played++;
        console.log("Cat#Played: ",cats[catIndex].played);
        $("#directions").html("<h2>"+cats[catIndex][ranNum].question+"</h2>");
        for (i = 0; i < cats.length; i++){
                $("#"+i).html(cats[catIndex][ranNum].array[i]);
                $("#"+i).addClass("answerButton");
        }
        state = "gameSet";
        console.log(state);
}
 
function answerAssess(questionAnswer){
        var correctAnswer = cats[categoryChosen][ranNum].answer
        if (answerID == correctAnswer){
                $("#directions").html("<h2>You WIN!!!!</h2>");
                wins ++;
        }else{
                $("#directions").html("<h1>"+cats[categoryChosen][ranNum].array[correctAnswer]+"</h1><h2>You Loose!!!!</h2>");
                $("#"+correctAnswer).css("border", "2px solid #4CAF50");
                losses ++;
        }
        imageSetter(cats[categoryChosen][ranNum].image)
        state = "AnswerAssessed";
        setTimeout(setGame, 1000 * 3);
        console.log(state);
}
function timeIsOut(){
        $("#directions").html("<h2>Time is Up!</h2>");
        unAnswered++;
        setTimeout(setGame, 600 * 3);
        state = "TimeoutReset";
        console.log(state);
        target = 10000;
        current = 0;
}

var target = 8000;
var current = 0;
var counter=true;

function countdown() {
        if (counter==true){
                current += 1000;
                var diff = target-current;
                var sec = (diff/1000) % 60;
                $("#timer").html("<h1>"+sec+"</h1>");
                console.log(sec);
                if (diff > 0){
                        setTimeout(countdown, 1000);
                        console.log("diff",diff);
                }else{
                        timeIsOut();
                }
        }
}
 
$(".buttonHolder").on("click", ".gameBtn", function(){
        selectionID = $(this).attr("id");
        if(state==="gameInitialized"){
                categoryChosen = selectionID
                console.log("Btn: ",selectionID);
                catChosen(selectionID);
                countdown();
        }
})
$(".buttonHolder").on("click", ".answerButton", function(){
        answerID = $(this).attr("id");
        if(state==="gameSet"){
                counter=false;
                console.log("Btn: ",answerID);
                answerAssess(answerID);
                for (i = 0; i < cats.length; i++){
                   $("#"+i).removeClass("answerButton");
                }
        }
})
$("#restart").on("click", "#innerStart", function(){
    console.log("restart");
    wins = 0;
    losses = 0;
    unAnswered = 0;
    for (i = 0; i < cats.length; i++){
            cats[i].played=0;
            $("#"+i).addClass("gameBtn");
            $("#"+i).css("opacity","1");
    }
    setGame();
})
$("#restart").css("float","right");
setGame();
}