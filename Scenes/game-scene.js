import Bird from "../src/Features/birb";
import PipeSystem from "../src/Features/pipes";
import Score from "../src/Features/score";

export default class GameScene extends Phaser.Scene {
    constructor(config) {
        super (config);
        this.config = config;
        this.bird = null;
        this. pipeSystem = null;
        this.score = null;
    }

    preload() {
        this.load.image("sky", "assets/sky.png");
        this.load.image("bird", "assets/bird.png");
        this.load.image("pipe", "assets/pipe.png");
    }

    create() {
        this.add.image(0,0,"sky").setOrigin(0);

        console.log("score-test");

        this.bird = new Bird(this, 100, this.config.height / 2, "bird");
        this.pipeSystem = new PipeSystem(this);

        this.physics.add.collider(this.bird, this.pipeSystem.group, this.gameOver, null, this);

        console.log("score-test");

        this.score = new Score(this, 16, 16);

        this.pipeSystem.onPipeExited = ()=>{
            this.score.addScore(1);
        }

        this.pipeSystem.start();      
      } 
      
       update(time, delta) {
        this.pipeSystem.update();
        this.bird.checkOffbounds(this.gameOver);
       }
      
        gameOver() {
        this.score.checkHighScore();
        alert("You lose");
        this.scene.restart();
      }
    

}

