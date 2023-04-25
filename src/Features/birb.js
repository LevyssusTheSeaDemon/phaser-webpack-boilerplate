const FLAP_VELOCITY = 300;
const  OFFBOUNDS_THRESHOLD = 15;

export default class Bird extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene,x ,y, texture);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.input.keyboard.on("keydown-SPACE", this.flap, this);
    }


       
    flap(){
        this.body.velocity.y = -FLAP_VELOCITY;
      
      } 

      checkOffbounds(callback) {
        if(this.getBounds().top < 0 - OFFBOUNDS_THRESHOLD){
            callback();
        }
        if (this.getBounds().bottom > this.scene.config.height + OFFBOUNDS_THRESHOLD) {
            callback();
        }
      }
}