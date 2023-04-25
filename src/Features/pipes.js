const PIPE_SPAWN_TIME = 3000;
const PIPE_VELOCITY = 150;
const DEFAULT_PIPE_SPAWN_POSITION_RANGE = [50, 350];
const DEFAULT_PIPE_GAP_SIZE_RANGE = [100, 200];

export default class PipeSystem {
    constructor(scene) {
        this.scene = scene;
        this.group = scene.physics.add.group({
            allowGravity: false,
            immovable: true, 
        })
        
        this.pipes = [];
        this.pool = [];
        this.onPipeExited = ()=>{};
    }

    start(){
        this.scene.time.addEvent({
            delay: PIPE_SPAWN_TIME,
            callback: ()=> {
                this.spawnPipe();
            },
            loop: true
        });
    }

    update(){
        for(let i = 0; i < this.pipes.length; i++) {
            const pipe = this.pipes[i];
            if (pipe.hasLeftScreen()){
                this.moveToPool(pipe, i);
                this.onPipeExited();
            }
        }
    }

    spawnPipe(){
        let pipe = null;
        if(this.pool.length > 0) {
            pipe = this.pool[0];
            this.pool.splice(0, 1);
            pipe.resetPosition();
        }
        else{
            pipe = new Pipe(this.group, this.scene.config.width);
        }

        pipe.setVelocity(PIPE_VELOCITY);
        pipe.setVisible(true);
        this.pipes.push(pipe);
        console.log(this.pipes);
    }

    moveToPool(pipe, index) {
        this.pipes.splice(index, 1);
        this.pool.push(pipe);
        pipe.setVelocity(0);
        pipe.setVisible(false);
    }
}

    class Pipe {
        constructor(group, spawnX){
            this.group = group;
            this.spawnX = spawnX;
            this.pipeSpawnPositionRange = DEFAULT_PIPE_SPAWN_POSITION_RANGE;
            this.pipeGapSizeRange = DEFAULT_PIPE_GAP_SIZE_RANGE;
            var spawnPosition = Phaser.Math.Between(...this.pipeSpawnPositionRange);
            var gapSize = Phaser.Math.Between(...this.pipeGapSizeRange);
            this.upper = group.create(spawnX, spawnPosition, "pipe").setOrigin(0,1);
            this.lower = group.create(spawnX, spawnPosition + gapSize, "pipe").setOrigin(0);
        }
    
        resetPosition(){
            this.upper.x = this.spawnX;
            this.lower.x = this.spawnX;
            var spawnPosition = Phaser.Math.Between(...this.pipeSpawnPositionRange);
            var gapSize = Phaser.Math.Between(...this.pipeGapSizeRange);
            this.upper.y = spawnPosition;
            this.upper.y = spawnPosition + gapSize;
        }
    
        setVelocity(velocity){
            this.upper.body.velocity.x = -velocity;
            this.lower.body.velocity.x = -velocity;
        }
    
        setVisible(state){
        this.upper.visible = state;
        this.lower.visible = state;
        }
    
        hasLeftScreen(){
            return this.upper.getBounds().right < 0;
        }
    }
