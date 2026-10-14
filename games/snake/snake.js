        // Encapsulate game logic in a namespace
        window.myGameNamespace = {

            canvas: document.getElementById('gameCanvas'),
            ctx: null, // Initialized later

            currentScoreElem: document.getElementById('currentScore'),
            highScoreElem: document.getElementById('highScore'),
            finalScoreElem: document.getElementById('finalScore'),
            modalHighScoreElem: document.getElementById('modalHighScore'),
            gameOverModal: document.getElementById('gameOverModal'),
            restartButton: document.getElementById('restartButton'),

            GRID_SIZE: 20,
            CANVAS_WIDTH: 0,
            CANVAS_HEIGHT: 0,
            TILE_COUNT_X: 0,
            TILE_COUNT_Y: 0,

            // Game state variables
            snake: null,
            food: null,
            dx: 0, dy: 0,
            score: 0, highScore: 0,
            changingDirection: false,
            gameLoopTimeout: null,
            isGameOver: false,
            isSdkPaused: false, // SDK Pause State
            GAME_SPEED: 120,

            // --- SDK Related Functions ---
            // pauseGameForAd: function() {
            //     this.isSdkPaused = true;
            //     // Game loop is already stopped if game is over,
            //     // but clearing timeout is safe regardless.
            //     clearTimeout(this.gameLoopTimeout);
            //     this.gameLoopTimeout = null;
            //     console.log("Game Paused for Ad");
            //     // Add audio muting here if needed
            // },

            // resumeGameAfterAd: function() {
            //     this.isSdkPaused = false;
            //     console.log("Game Resuming After Ad");
            //     // Add audio unmuting here if needed

            //     // IMPORTANT: Do NOT restart the main loop here if the game is over.
            //     // The player should still be on the Game Over screen.
            //     // The loop will be restarted only when they click "Play Again" -> initializeGame() -> main()
            //     if (!this.isGameOver) {
            //         console.log("Restarting main loop after ad (game was not over)");
            //         this.main(); // Restart the game loop ONLY if pause happened mid-game (if that scenario is possible)
            //     } else {
            //          console.log("Not restarting main loop because game is over.");
            //     }
            // },

            // --- Game Initialization ---
            initializeGame: function() {
                console.log("Initializing Game...");
                this.ctx = this.canvas.getContext('2d');
                this.CANVAS_WIDTH = this.canvas.width;
                this.CANVAS_HEIGHT = this.canvas.height;
                this.TILE_COUNT_X = this.CANVAS_WIDTH / this.GRID_SIZE;
                this.TILE_COUNT_Y = this.CANVAS_HEIGHT / this.GRID_SIZE;

                const startX = Math.floor(this.TILE_COUNT_X / 2);
                const startY = Math.floor(this.TILE_COUNT_Y / 2);
                this.snake = [ { x: startX, y: startY }, { x: startX - 1, y: startY }, { x: startX - 2, y: startY }, { x: startX - 3, y: startY } ];
                this.dx = 1; this.dy = 0;
                this.score = 0;
                this.changingDirection = false;
                this.isGameOver = false;
                this.isSdkPaused = false; // Reset SDK pause state

                this.highScore = localStorage.getItem('snakeHighScore') || 0;
                this.highScoreElem.textContent = this.highScore;
                this.currentScoreElem.textContent = this.score;

                this.generateFood();
                this.gameOverModal.style.display = 'none'; // Ensure modal is hidden

                clearTimeout(this.gameLoopTimeout);
                this.gameLoopTimeout = null;

                this.main(); // Start the game loop
            },

            // Main game loop function
            main: function() {
                if (this.isSdkPaused) {
                    console.log("Main loop blocked by SDK pause");
                    return;
                }
                if (this.isGameOver) {
                    // If game over state is reached *before* showGameOver is called
                    // (e.g., due to race condition, unlikely here but good practice),
                    // call showGameOver and stop.
                    if (this.gameOverModal.style.display !== 'flex') {
                       this.showGameOver();
                    }
                    return;
                }

                this.changingDirection = false;
                this.gameLoopTimeout = setTimeout(() => {
                    this.clearCanvas();
                    this.drawFood();
                    this.moveSnake(); // This sets isGameOver on collision

                    // Only draw and continue if the game didn't end in moveSnake()
                    if (!this.isGameOver) {
                       this.drawSnake();
                       this.main(); // Recursively call main
                    } else {
                        // If moveSnake resulted in game over, show the screen and ad
                        this.showGameOver();
                    }
                }, this.GAME_SPEED);
            },

            clearCanvas: function() {
                 this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
            },

            // --- Drawing Functions (simplified for brevity) ---
            drawSnakePart: function(snakePart, index, totalLength) { /* ... (same as before) ... */
                const hue = (180 + (index / totalLength) * 180) % 360;
                this.ctx.fillStyle = `hsl(${hue}, 90%, 55%)`;
                this.ctx.strokeStyle = `hsl(${hue}, 90%, 40%)`;
                this.ctx.lineWidth = 1;
                this.ctx.fillRect(snakePart.x * this.GRID_SIZE, snakePart.y * this.GRID_SIZE, this.GRID_SIZE, this.GRID_SIZE);
                this.ctx.strokeRect(snakePart.x * this.GRID_SIZE, snakePart.y * this.GRID_SIZE, this.GRID_SIZE, this.GRID_SIZE);

                // Draw eyes on the head
                if (index === 0) {
                    const eyeOffsetX = this.GRID_SIZE * 0.20;
                    const eyeOffsetY = this.GRID_SIZE * 0.25;
                    const eyeRadius = this.GRID_SIZE * 0.15;
                    const pupilRadius = this.GRID_SIZE * 0.07;
                    const headX = snakePart.x * this.GRID_SIZE;
                    const headY = snakePart.y * this.GRID_SIZE;
                    let eye1X, eye1Y, eye2X, eye2Y;

                    if (this.dx === 1) { eye1X = headX + this.GRID_SIZE * 0.6; eye1Y = headY + eyeOffsetY; eye2X = headX + this.GRID_SIZE * 0.6; eye2Y = headY + this.GRID_SIZE - eyeOffsetY; }
                    else if (this.dx === -1) { eye1X = headX + this.GRID_SIZE * 0.4; eye1Y = headY + eyeOffsetY; eye2X = headX + this.GRID_SIZE * 0.4; eye2Y = headY + this.GRID_SIZE - eyeOffsetY; }
                    else if (this.dy === 1) { eye1X = headX + eyeOffsetX; eye1Y = headY + this.GRID_SIZE * 0.6; eye2X = headX + this.GRID_SIZE - eyeOffsetX; eye2Y = headY + this.GRID_SIZE * 0.6; }
                    else { eye1X = headX + eyeOffsetX; eye1Y = headY + this.GRID_SIZE * 0.4; eye2X = headX + this.GRID_SIZE - eyeOffsetX; eye2Y = headY + this.GRID_SIZE * 0.4; }
                    this.ctx.fillStyle = 'white'; this.ctx.beginPath(); this.ctx.arc(eye1X, eye1Y, eyeRadius, 0, 2 * Math.PI); this.ctx.fill(); this.ctx.beginPath(); this.ctx.arc(eye2X, eye2Y, eyeRadius, 0, 2 * Math.PI); this.ctx.fill();
                    this.ctx.fillStyle = 'black'; this.ctx.beginPath(); this.ctx.arc(eye1X, eye1Y, pupilRadius, 0, 2 * Math.PI); this.ctx.fill(); this.ctx.beginPath(); this.ctx.arc(eye2X, eye2Y, pupilRadius, 0, 2 * Math.PI); this.ctx.fill();
                }
             },
            drawSnake: function() { /* ... (same as before) ... */
                 const totalLength = this.snake.length;
                this.snake.forEach((part, index) => this.drawSnakePart(part, index, totalLength));
            },
            drawFood: function() { /* ... (same as before) ... */
                 this.ctx.fillStyle = '#d92f23'; this.ctx.strokeStyle = '#a81c11'; this.ctx.lineWidth = 1;
                const centerX = this.food.x * this.GRID_SIZE + this.GRID_SIZE / 2; const centerY = this.food.y * this.GRID_SIZE + this.GRID_SIZE / 2; const radius = this.GRID_SIZE / 2 * 0.8;
                this.ctx.beginPath(); this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI); this.ctx.fill(); this.ctx.stroke();
                this.ctx.fillStyle = '#578a34'; this.ctx.fillRect(centerX - this.GRID_SIZE * 0.1, centerY - radius - this.GRID_SIZE * 0.1, this.GRID_SIZE * 0.2, this.GRID_SIZE * 0.2);
            },

            // --- Game Logic Functions ---
            moveSnake: function() {
                if (this.isGameOver) return; // Safety check

                const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

                // Check collisions -> Set isGameOver = true if collision occurs
                if (head.x < 0 || head.x >= this.TILE_COUNT_X || head.y < 0 || head.y >= this.TILE_COUNT_Y) {
                    this.isGameOver = true; console.log("Game Over: Wall Collision");
                } else {
                    for (let i = 1; i < this.snake.length; i++) {
                        if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                            this.isGameOver = true; console.log("Game Over: Self Collision");
                            break; // Exit loop once collision detected
                        }
                    }
                }

                // If game ended, stop the loop immediately and return
                if (this.isGameOver) {
                    clearTimeout(this.gameLoopTimeout);
                    this.gameLoopTimeout = null;
                    return;
                }

                // If game continues, add head and check food
                this.snake.unshift(head);
                const didEatFood = this.snake[0].x === this.food.x && this.snake[0].y === this.food.y;
                if (didEatFood) {
                    this.score += 1;
                    this.currentScoreElem.textContent = this.score;
                    if (this.score > this.highScore) {
                        this.highScore = this.score; this.highScoreElem.textContent = this.highScore;
                        localStorage.setItem('snakeHighScore', this.highScore);
                    }
                    this.generateFood();
                } else {
                    this.snake.pop();
                }
            },

            generateFood: function() { /* ... (same as before) ... */
                let newFoodX, newFoodY;
                while (true) {
                    newFoodX = Math.floor(Math.random() * this.TILE_COUNT_X); newFoodY = Math.floor(Math.random() * this.TILE_COUNT_Y);
                    let collisionWithSnake = false;
                    for (let i = 0; i < this.snake.length; i++) { if (newFoodX === this.snake[i].x && newFoodY === this.snake[i].y) { collisionWithSnake = true; break; } }
                    if (!collisionWithSnake) { this.food = { x: newFoodX, y: newFoodY }; break; }
                }
            },

            changeDirection: function(event) { /* ... (same as before - including checks for pause/gameover) ... */
                 if (this.changingDirection || this.isSdkPaused || this.isGameOver) return;
                 this.changingDirection = true;
                 const LEFT_KEY = 37; const RIGHT_KEY = 39; const UP_KEY = 38; const DOWN_KEY = 40;
                 const A_KEY = 65; const D_KEY = 68; const W_KEY = 87; const S_KEY = 83;
                 const keyPressed = event.keyCode;
                 const goingUp = this.dy === -1; const goingDown = this.dy === 1; const goingRight = this.dx === 1; const goingLeft = this.dx === -1;
                 if ((keyPressed === LEFT_KEY || keyPressed === A_KEY) && !goingRight) { this.dx = -1; this.dy = 0; }
                 else if ((keyPressed === UP_KEY || keyPressed === W_KEY) && !goingDown) { this.dx = 0; this.dy = -1; }
                 else if ((keyPressed === RIGHT_KEY || keyPressed === D_KEY) && !goingLeft) { this.dx = 1; this.dy = 0; }
                 else if ((keyPressed === DOWN_KEY || keyPressed === S_KEY) && !goingUp) { this.dx = 0; this.dy = 1; }
                 else { this.changingDirection = false; }
             },

            // --- Show Game Over Screen & Trigger Ad ---
            showGameOver: function() {
                // Ensure the game loop is stopped
                clearTimeout(this.gameLoopTimeout);
                this.gameLoopTimeout = null;
                this.isGameOver = true; // Ensure state is set

                // Update scores on the modal
                this.finalScoreElem.textContent = this.score;
                this.modalHighScoreElem.textContent = this.highScore;

                console.log("Game Over! Attempting to show ad.");

                // --- SDK Ad Trigger ---
                // Call showBanner HERE, when the game ends
                if (typeof sdk !== 'undefined' && typeof sdk.showBanner === 'function') {
                    sdk.showBanner(); // Request an ad
                } else {
                    console.log("SDK not defined or showBanner not available.");
                }

                // Display the modal AFTER requesting the ad.
                // The SDK's PAUSE event will handle actual game interruption if an ad is shown.
                this.gameOverModal.style.display = 'flex';
                console.log("Game Over Modal Shown");
            },

             // --- Event Listener Setup ---
             setupEventListeners: function() {
                 document.addEventListener('keydown', this.changeDirection.bind(this));

                 // Restart button ONLY initializes the game now
                 this.restartButton.addEventListener('click', () => {
                    console.log("Restart button clicked");
                    // Hide modal and start a completely new game
                    this.gameOverModal.style.display = 'none';
                    this.initializeGame();
                });
            },

            // --- Start the whole process ---
            start: function() {
                this.setupEventListeners();
                this.initializeGame(); // Start the first game
            }
        };

        // --- Auto-start the game when the script loads ---
        window.myGameNamespace.start();