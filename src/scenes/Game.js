import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.image("ball", "../assets/bola.png")
        this.load.image("paddle", "../assets/brick.png")
        this.load.image("blocks", "../assets/brick.png")
    }

    create() {
        console.log(this.physics);
        this.paddle = this.physics.add.sprite(400, 550, 'paddle').setImmovable().setSize(700).setScale(0.2);
        console.log(this.physics);
        this.ball = this.physics.add.sprite(400, 500, 'ball').setSize(900).setScale(0.04);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        
        this.blocks = this.physics.add.sprite(400, 100, 'blocks').setImmovable().setSize(700).setScale(0.2);
    
        this.physics.add.collider(this.ball, this.blocks, this.hitBlock, null, this);
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);
    
        this.input.on('pointermove', function (pointer) {
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 990);
        }, this);
    
        // Lanzar la bola
        this.input.on('pointerup', function () {
            if (this.ball.getData('onPaddle')) {
                this.ball.setVelocity(-75, -300);
                this.ball.setData('onPaddle', false);
            }
        }, this);
    
        this.ball.setData('onPaddle', true);
    }
    
    update() {
        if (this.ball.y > 600) {
            this.ball.setPosition(this.paddle.x, 500);
            this.ball.setVelocity(0);
            this.ball.setData('onPaddle', true);
        }
    }
    
    hitBlock(ball, block) {
        block.disableBody(true, true);
    }
    
    hitPaddle(ball, paddle) {
        let diff = 0;
    
        if (ball.x < paddle.x) {
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        } else if (ball.x > paddle.x) {
            diff = ball.x - paddle.x;
            ball.setVelocityX(10 * diff);
        } else {
            ball.setVelocityX(2 + Math.random() * 8);
        }
    }
    
}
