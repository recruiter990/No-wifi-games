 class PongGame {
            constructor() {
                this.canvas = document.getElementById('gameCanvas');
                this.ctx = this.canvas.getContext('2d');
                this.setupCanvas();
                
                // Game state
                this.gameMode = 'single';
                this.difficulty = 'medium';
                this.isRunning = false;
                this.isPaused = false;
                
                // Game objects
                this.ball = {
                    x: 0,
                    y: 0,
                    vx: 0,
                    vy: 0,
                    radius: 10,
                    speed: 5,
                    trail: []
                };
                
                this.paddleHeight = 100;
                this.paddleWidth = 15;
                this.paddleSpeed = 8;
                
                this.player = {
                    x: 30,
                    y: 0,
                    score: 0,
                    dy: 0
                };
                
                this.opponent = {
                    x: 0,
                    y: 0,
                    score: 0,
                    dy: 0,
                    aiSpeed: 4
                };
                
                // Effects
                this.particles = [];
                
                // Touch controls
                this.touchY = null;
                
                // Audio context for sound effects
                this.audioContext = null;
                
                this.init();
            }
            
            setupCanvas() {
                const rect = this.canvas.parentElement.getBoundingClientRect();
                this.canvas.width = rect.width;
                this.canvas.height = rect.height;
            }
            
            init() {
                this.resetBall();
                this.resetPaddles();
                this.loadHighScores();
                this.setupEventListeners();
                this.gameLoop();
                
                // Initialize audio context on first user interaction
                document.addEventListener('click', () => {
                    if (!this.audioContext) {
                        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    }
                }, { once: true });
            }
            
            setupEventListeners() {
                // Mode buttons
                document.querySelectorAll('.mode-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                        e.target.classList.add('active');
                        this.gameMode = e.target.dataset.mode;
                        this.resetGame();
                    });
                });
                
                // Control buttons
                document.getElementById('startBtn').addEventListener('click', () => this.startGame());
                document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
                document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
                
                // Difficulty
                document.getElementById('difficulty').addEventListener('change', (e) => {
                    this.difficulty = e.target.value;
                    this.updateAISpeed();
                });
                
                // Keyboard controls
                document.addEventListener('keydown', (e) => this.handleKeyDown(e));
                document.addEventListener('keyup', (e) => this.handleKeyUp(e));
                
                // Mouse controls
                this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
                
                // Touch controls
                this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
                this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
                this.canvas.addEventListener('touchend', () => this.handleTouchEnd());
                
                // Mobile buttons
                document.getElementById('upBtn').addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.player.dy = -this.paddleSpeed;
                });
                document.getElementById('upBtn').addEventListener('touchend', () => {
                    this.player.dy = 0;
                });
                document.getElementById('downBtn').addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.player.dy = this.paddleSpeed;
                });
                document.getElementById('downBtn').addEventListener('touchend', () => {
                    this.player.dy = 0;
                });
                
                // Window resize
                window.addEventListener('resize', () => {
                    this.setupCanvas();
                    this.resetPaddles();
                });
            }
            
            handleKeyDown(e) {
                if (!this.isRunning || this.isPaused) return;
                
                switch(e.key.toLowerCase()) {
                    case 'w':
                    case 'arrowup':
                        this.player.dy = -this.paddleSpeed;
                        break;
                    case 's':
                    case 'arrowdown':
                        this.player.dy = this.paddleSpeed;
                        break;
                }
            }
            
            handleKeyUp(e) {
                if (!this.isRunning) return;
                
                switch(e.key.toLowerCase()) {
                    case 'w':
                    case 's':
                    case 'arrowup':
                    case 'arrowdown':
                        this.player.dy = 0;
                        break;
                }
            }
            
            handleMouseMove(e) {
                if (!this.isRunning || this.isPaused) return;
                
                const rect = this.canvas.getBoundingClientRect();
                const mouseY = e.clientY - rect.top;
                this.player.y = mouseY - this.paddleHeight / 2;
                this.constrainPaddle(this.player);
            }
            
            handleTouchStart(e) {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = this.canvas.getBoundingClientRect();
                this.touchY = touch.clientY - rect.top;
            }
            
            handleTouchMove(e) {
                e.preventDefault();
                if (!this.isRunning || this.isPaused || this.touchY === null) return;
                
                const touch = e.touches[0];
                const rect = this.canvas.getBoundingClientRect();
                const currentY = touch.clientY - rect.top;
                const deltaY = currentY - this.touchY;
                
                this.player.y += deltaY;
                this.constrainPaddle(this.player);
                
                this.touchY = currentY;
            }
            
            handleTouchEnd() {
                this.touchY = null;
            }
            
            startGame() {
                this.isRunning = true;
                this.isPaused = false;
                this.resetBall();
                this.hideMessage();
                
                // Ensure audio context is running
                if (this.audioContext && this.audioContext.state === 'suspended') {
                    this.audioContext.resume();
                }
            }
            
            togglePause() {
                if (!this.isRunning) return;
                this.isPaused = !this.isPaused;
                document.getElementById('pauseBtn').textContent = this.isPaused ? 'Resume' : 'Pause';
            }
            
            resetGame() {
                this.isRunning = false;
                this.isPaused = false;
                this.player.score = 0;
                this.opponent.score = 0;
                this.updateScore();
                this.resetBall();
                this.resetPaddles();
                this.particles = [];
                this.hideMessage();
                document.getElementById('pauseBtn').textContent = 'Pause';
            }
            
            resetBall() {
                this.ball.x = this.canvas.width / 2;
                this.ball.y = this.canvas.height / 2;
                this.ball.vx = (Math.random() > 0.5 ? 1 : -1) * this.ball.speed;
                this.ball.vy = (Math.random() - 0.5) * this.ball.speed;
                this.ball.trail = [];
            }
            
            resetPaddles() {
                this.player.y = (this.canvas.height - this.paddleHeight) / 2;
                this.opponent.x = this.canvas.width - 30 - this.paddleWidth;
                this.opponent.y = (this.canvas.height - this.paddleHeight) / 2;
                this.updateAISpeed();
            }
            
            updateAISpeed() {
                const speeds = {
                    easy: 3,
                    medium: 5,
                    hard: 7
                };
                this.opponent.aiSpeed = speeds[this.difficulty];
            }
            
            constrainPaddle(paddle) {
                paddle.y = Math.max(0, Math.min(this.canvas.height - this.paddleHeight, paddle.y));
            }
            
            update() {
                if (!this.isRunning || this.isPaused) return;
                
                // Update player paddle
                this.player.y += this.player.dy;
                this.constrainPaddle(this.player);
                
                // Update opponent (AI or player 2)
                if (this.gameMode === 'single') {
                    // AI movement
                    const targetY = this.ball.y - this.paddleHeight / 2;
                    const diff = targetY - this.opponent.y;
                    this.opponent.dy = Math.sign(diff) * Math.min(Math.abs(diff), this.opponent.aiSpeed);
                } else {
                    // Player 2 controls (AI for now, could be keyboard)
                    const targetY = this.ball.y - this.paddleHeight / 2;
                    const diff = targetY - this.opponent.y;
                    this.opponent.dy = Math.sign(diff) * Math.min(Math.abs(diff), this.paddleSpeed);
                }
                
                this.opponent.y += this.opponent.dy;
                this.constrainPaddle(this.opponent);
                
                // Update ball
                this.ball.x += this.ball.vx;
                this.ball.y += this.ball.vy;
                
                // Ball trail effect
                this.ball.trail.push({ x: this.ball.x, y: this.ball.y });
                if (this.ball.trail.length > 10) {
                    this.ball.trail.shift();
                }
                
                // Ball collision with top/bottom
                if (this.ball.y - this.ball.radius <= 0 || this.ball.y + this.ball.radius >= this.canvas.height) {
                    this.ball.vy = -this.ball.vy;
                    this.createParticles(this.ball.x, this.ball.y, '#00aaff');
                    this.playSound('wall');
                }
                
                // Ball collision with paddles
                if (this.checkPaddleCollision(this.player) || this.checkPaddleCollision(this.opponent)) {
                    this.ball.vx = -this.ball.vx * 1.05; // Speed increase
                    this.ball.vy += (Math.random() - 0.5) * 2; // Random angle
                    this.createParticles(this.ball.x, this.ball.y, '#00ff88');
                    this.playSound('paddle');
                }
                
                // Score
                if (this.ball.x < 0) {
                    this.opponent.score++;
                    this.updateScore();
                    this.resetBall();
                    this.playSound('score');
                    this.checkWin();
                } else if (this.ball.x > this.canvas.width) {
                    this.player.score++;
                    this.updateScore();
                    this.resetBall();
                    this.playSound('score');
                    this.checkWin();
                }
                
                // Update particles
                this.particles = this.particles.filter(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.life -= 0.02;
                    return particle.life > 0;
                });
            }
            
            checkPaddleCollision(paddle) {
                return this.ball.x - this.ball.radius < paddle.x + this.paddleWidth &&
                       this.ball.x + this.ball.radius > paddle.x &&
                       this.ball.y - this.ball.radius < paddle.y + this.paddleHeight &&
                       this.ball.y + this.ball.radius > paddle.y;
            }
            
            createParticles(x, y, color) {
                for (let i = 0; i < 10; i++) {
                    this.particles.push({
                        x: x,
                        y: y,
                        vx: (Math.random() - 0.5) * 5,
                        vy: (Math.random() - 0.5) * 5,
                        life: 1,
                        color: color
                    });
                }
            }
            
            playSound(type) {
                if (!this.audioContext) return;
                
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                switch(type) {
                    case 'paddle':
                        oscillator.frequency.value = 400;
                        gainNode.gain.value = 0.1;
                        break;
                    case 'wall':
                        oscillator.frequency.value = 300;
                        gainNode.gain.value = 0.05;
                        break;
                    case 'score':
                        oscillator.frequency.value = 600;
                        gainNode.gain.value = 0.2;
                        break;
                }
                
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.1);
            }
            
            checkWin() {
                const winScore = 5;
                if (this.player.score >= winScore) {
                    this.endGame('You Win!', 'win');
                } else if (this.opponent.score >= winScore) {
                    this.endGame('Game Over!', 'lose');
                }
            }
            
            endGame(message, type) {
                this.isRunning = false;
                this.showMessage(message, type);
                
                if (type === 'win') {
                    this.saveHighScore(this.player.score);
                }
            }
            
            showMessage(text, type) {
                const messageEl = document.getElementById('gameMessage');
                messageEl.textContent = text;
                messageEl.className = `message show ${type}`;
            }
            
            hideMessage() {
                const messageEl = document.getElementById('gameMessage');
                messageEl.className = 'message';
            }
            
            updateScore() {
                document.getElementById('playerScore').textContent = this.player.score;
                document.getElementById('opponentScore').textContent = this.opponent.score;
            }
            
            saveHighScore(score) {
                let highScores = JSON.parse(localStorage.getItem('pongHighScores') || '[]');
                highScores.push({
                    score: score,
                    date: new Date().toLocaleDateString(),
                    difficulty: this.difficulty
                });
                highScores.sort((a, b) => b.score - a.score);
                highScores = highScores.slice(0, 5); // Keep top 5
                localStorage.setItem('pongHighScores', JSON.stringify(highScores));
                this.loadHighScores();
            }
            
            loadHighScores() {
                const highScores = JSON.parse(localStorage.getItem('pongHighScores') || '[]');
                const listEl = document.getElementById('highScoresList');
                listEl.innerHTML = '';
                
                highScores.forEach((score, index) => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span>${index + 1}. ${score.score}</span>
                        <span>${score.difficulty}</span>
                    `;
                    listEl.appendChild(li);
                });
            }
            
            draw() {
                // Clear canvas
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                
                // Draw center line
                this.ctx.setLineDash([10, 10]);
                this.ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(this.canvas.width / 2, 0);
                this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                
                // Draw paddles with glow effect
                this.drawPaddle(this.player, '#00ff88');
                this.drawPaddle(this.opponent, '#ff00ff');
                
                // Draw ball trail
                this.ball.trail.forEach((point, index) => {
                    this.ctx.fillStyle = `rgba(0, 255, 136, ${index / this.ball.trail.length * 0.5})`;
                    this.ctx.beginPath();
                    this.ctx.arc(point.x, point.y, this.ball.radius * (index / this.ball.trail.length), 0, Math.PI * 2);
                    this.ctx.fill();
                });
                
                // Draw ball with glow
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = '#00ff88';
                this.ctx.fillStyle = '#00ff88';
                this.ctx.beginPath();
                this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
                
                // Draw particles
                this.particles.forEach(particle => {
                    this.ctx.fillStyle = particle.color + Math.floor(particle.life * 255).toString(16).padStart(2, '0');
                    this.ctx.fillRect(particle.x - 2, particle.y - 2, 4, 4);
                });
            }
            
            drawPaddle(paddle, color) {
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = color;
                this.ctx.fillStyle = color;
                this.ctx.fillRect(paddle.x, paddle.y, this.paddleWidth, this.paddleHeight);
                this.ctx.shadowBlur = 0;
            }
            
            gameLoop() {
                this.update();
                this.draw();
                requestAnimationFrame(() => this.gameLoop());
            }
        }
        
        // Initialize game when page loads
        window.addEventListener('load', () => {
            const game = new PongGame();
        });