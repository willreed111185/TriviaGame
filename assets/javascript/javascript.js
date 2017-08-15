window.onload = function() {

var questionsPerObject = 2;

//var lengthTest=Object.keys(cars).length;
//console.log(lengthTest);

var cars = {
        name:"Cars",
        image:"car.jpg",
        0: {question:"Which car is the fastest?",
                answer:0,
                array:["Corvette", "Corolla", "Civic", "Accord"],
                image:"corvette.jpg",
                },
        1:{
                question:"Which car is turbocharged?",
                answer:0,
                array:["Subaru STI", "Civic", "Wrangler", "Corolla"],
                image:"sti.jpg",
        },
};
var movies = {
        name:"Movies",
        0: {question:"Which movie won an award?",
                answer:3,
                array:["One", "Two", "Three", "Four"],
                image:"assets/images",
                },
        1:{
                question:"Who has the most awards?",
                answer:3,
                array:["SomeOne", "SomeTwo", "SomeThree", "SomeFour"],
                image:"assets/images",
        },
};
var anatomy = {
        name:"Anatomy",
        0: {question:"What is the largest bone in your body?",
                answer:0,
                array:["femur", "radius", "ulna", "meta-carpal"],
                image:"femur.png",
                },
        1:{
                question:"What is the smallest bone in the human body?",
                answer:0,
                array:["stapes", "caucaneous", "pinky", "cranuim"],
                image:"stapes.jpg",
        },
};
var birds = {
        name:"Birds",
        0: {question:"What Color is a Flamingo?",
                answer:2,
                array:["blue", "yellow", "pink", "red"],
                image:"flamingo.jpg",
                },
        1:{
                question:"Which bird is the deadliest?",
                answer:0,
                array:["Owl", "Pigeon", "Penguin", "Blue Heron"],
                image:"owl.jpg",
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
 
function setGame(){
        imageSetter("trebek.gif")
        $("#timer").html("<h1>00</h1>");
        $("#wins").html("Wins: "+wins);
        $("#losses").html("Losses: "+losses);
        $("#unAnswered").html("Un-Answered: "+unAnswered);
        $("#directions").html("Pick A Category");
        for (i = 0; i < cats.length; i++){
                $("#"+i).html(cats[i].name);
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
        var questionNum = convertNum[ranNum];
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
                $("#directions").html("<h2>You Loose!!!!</h2>");
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
// }
 
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
setGame();
}