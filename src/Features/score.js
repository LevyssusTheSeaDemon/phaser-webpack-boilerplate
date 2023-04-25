const CURRENT_SCORE_LABEL = "Score: ";
const HIGH_SCORE_LABEL = "High Score: ";
const HIGH_SCORE_SAVE_KEY = "high_score";

export default class Score {
    constructor(scene, x, y) {
        this.scene = scene;
        this.currentScoreValue = 0;
        
        var loadedHighScore = parseInt(localStorage.getItem(HIGH_SCORE_SAVE_KEY));

        /*if(isNaN(loadedHighScore)) {
            this.highScoreValue = 0;
        }
        else {
            this.highScoreValue = loadedHighScore;
        }*/

        this.highScoreValue = isNaN(loadedHighScore) ? 0 : loadedHighScore;

        this.currentScoreText = scene.add.text(x, y, CURRENT_SCORE_LABEL + this.currentScoreValue)
        .setOrigin(0);
        this.highScoreText = scene.add.text(x, y + 12, HIGH_SCORE_LABEL + this.highScoreValue)
        .setOrigin(0);
    }

    addScore(amount){
        this.currentScoreValue += amount;
        this.currentScoreText.setText(CURRENT_SCORE_LABEL + this.currentScoreValue);
    }

    checkHighScore(){
        if(this.currentScoreValue > this.highScoreValue) {
            this.highScoreValue = this.currentScoreValue;
            this.highScoreText.setText(HIGH_SCORE_LABEL + this.highScoreValue);
            localStorage.setItem(HIGH_SCORE_SAVE_KEY, this.highScoreValue);
        }
    }

}

