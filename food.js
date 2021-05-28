class Food{
    constructor(){
        this.foodstock = 0
        this.image = loadImage('images/milk.png');
        this.lastFed;

        
    }

    getFoodStock(){
        return this.foodstock;
    }

    

    updateFoodStock(foodstock){
        this.foodstock = foodstock;
      }

    detuctFood(){
        if(this.foodstock > 0){
          this.foodstock = foodstock-1;
        }
      }

    getFedTime(lastFed){
        this.lastFed = lastFed;
      }

    bedroom(){
      image(bedroom, 500, 100, 1000, 700);
    }
    
    garden(){
      image(garden, 500, 100, 1000, 700);
    }

    washroom(){
      image(washroom, 500, 100, 1000, 700);
    }

    display(){
      var x = 80; 
      var y = 100;  

      imageMode(CENTER);
      image(this.image, 720, 220, 70,  70);

      if(this.foodstock != 0){
        for(var i=0; i< this.foodstock; i++){
          if(i%10 == 0){
            x= 80;
            y=y+50;
          }
          image(this.image, x, y, 50, 50);
          x=x+30;
        }
      }
    }
}