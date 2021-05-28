var dog, sadDog, happydog;
var database, foodObj;
var foods, foodstock, food1;
var addFood, feed, lastFed, fedTime;
var bedroom, garden, washroom;
var readState, gameState, currentTime;

function preload()
{
	sadDog = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 400);

  foodObj = new Food();

  foodstock = database.ref('food');
  foodstock.on('value', readStock);
    
  food1 = foods;

  dog = createSprite(800, 200, 150, 150);
  dog.addImage("sadDog", sadDog);
  dog.scale = 0.15;

  feed = createButton("Feed The Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  readState = database.ref("gameState");
  readState.on('value', function (data){
    gameState = data.val();
  })

}


function draw() {  
  background(color(46, 139, 87));

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : " + lastFed%12 + " PM", 350, 30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM", 350, 30);
  }else{
    text("Last Fed : " + lastFed + " AM", 350, 30);
  }

  if(gameState != "Hungry"){
    feed.hide();
    addFood.hide();
    dog.visible = false;
  }
  else{
    feed.show();
    addFood.show();
    dog.visible = true;
  }

  currentTime = hour();
  if(currentTime == (lastFed+1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime == (lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime > (lastFed+2) && currentTime <= (lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }
  else {
    update("Hungry");
    foodObj.display();
  }

  
  drawSprites();
  
}


 function readStock(data) {
  foods = data.val();
  foodObj.updateFoodStock(foods);
 }

  async function hour(){
  var response = await fetch('https://worldtimeapi.org/api/timezone/asia/kolkata');
  console.log(response);
  var responseJSON = await response.json();
  console.log(responseJSON);
  var dateTime = responseJSON.datetime;
  console.log(dateTime);
  var hour = dateTime.slice(11, 13);
  console.log(hour);
  return hour;
 } 


function feedDog(){
    dog.addImage('happyDog', happydog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
}

function addFoods(){
  foods++;
    database.ref('/').update({
     food:foods
    })
}

function update(state){
    database.ref('/').update({
      gameState : state
    })
}







