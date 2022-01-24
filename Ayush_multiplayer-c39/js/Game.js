class Game {
  constructor() { }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    form = new Form();
    form.display();

    player = new Player();
    player.getCount();

    car1 = createSprite(width / 2 - 100, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.05;

    car2 = createSprite(width / 2 + 100, height - 100);//error
    car2.addImage("car2", car2_img);
    car2.scale = 0.05;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    this.handleElements();
    player.getPlayersInfo();

    if (allPlayers != undefined) {
      image(track_img, 0, -height * 5, width, height * 6);
      //}// error
      var index = 0;


      for (var plr in allPlayers) {
        index = index + 1;
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
        // cars[index - 1].position.x=allPlayers[plr].positionX;
        //cars[index - 1].position.y=height - allPlayers[plr].positionY;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
      }

      this.handlePlayerControls();
      drawSprites();            //error u didnt call this function
    }
  }//error of closing 
  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }
  }
}