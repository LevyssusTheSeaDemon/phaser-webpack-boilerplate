import Phaser from "phaser";
import GameScene from "../Scenes/game-scene";

const GLOBAL_CONFIG = {
    width: 800,
    height: 600,
}

const config = {
 type: Phaser.AUTO,
 width: 800,
 height: 600,
 physics: {
 default: "arcade",
 arcade: {
 debug: true,
 gravity: {y: 300} 
}
 },
 scene:[new GameScene(GLOBAL_CONFIG)]
}


new Phaser.Game(config);



