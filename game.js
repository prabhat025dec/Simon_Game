
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
function nextSequence(){
  var randomNumber= Math.floor((Math.random() * 4));
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
 //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
 $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

 //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.

 playSound(randomChosenColour);

  $("h1").text("Level "+level);
  level++;
}



var start=0,level=0;
$("*").keypress(function(event){

     if(start==0){

       nextSequence();
       start++;
     }
})
// nextSequence();


// document.querySelectorAll(".btn")[0].addEventListener("click",function(){
//     console.log("Hi");
// });



// $(".btn").on("click",function(event){
//     // console.log(event);
//    // console.log(event.currentTarget[1]);
//    var clickedBtnID = $(this).attr('id'); // or var clickedBtnID = this.id
//    alert('you clicked on button #' + clickedBtnID);
// });


$(".btn").on("click",function(event){

   var userChosenColour = $(this).attr('id'); // or var clickedBtnID = this.id
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   // console.log(userClickedPattern);
   checkAnswer(userClickedPattern.length-1);

});
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
   return audio.play();
}

function animatePress(currentColour){
  // console.log("hi");
  // console.log(currentColour);
   $("#"+currentColour).addClass("pressed");//.delay(100).removeClass("pressed");
   setTimeout(function(){
           $("#"+currentColour).removeClass("pressed");
           //....and whatever else you need to do
   }, 100);
}
function startOver(){
  level=0;
  start=0;
  gamePattern=[];
  userClickedPattern=[];

}
function checkAnswer(currentLevel){
    console.log(gamePattern);
    console.log(userClickedPattern);
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      console.log("Success");
      if(currentLevel+1===gamePattern.length){
         userClickedPattern=[];
        setTimeout(function(){
          nextSequence();
        },1000);

      }
    }
    else{
      console.log("wrong");
       var audio = new Audio("sounds/wrong.mp3");
       audio.play();
       $("body").addClass("game-over");
       setTimeout(function(){
               $("body").removeClass("game-over");
               //....and whatever else you need to do
       }, 200);
       $("h1").text("Game Over, Press Any Key to Restart");
       startOver();
    }
}
