// Ждем, пока весь контент страницы загрузится перед запуском скрипта
document.addEventListener('DOMContentLoaded', () => {
    const game = new SnakeGame('gameCanvas', 'startButton', 'score');
    game.init();
});

class SnakeGame {
    constructor(canvasId, startButtonId, scoreId) {
        // Свойства объекта
        this.canvas = document.getElementById(canvasId);  // Холст для рисования
        this.ctx = this.canvas.getContext('2d');          // Контекст для рисования на холсте
        this.startButton = document.getElementById(startButtonId);  // Кнопка "Начать игру"
        this.scoreDisplay = document.getElementById(scoreId);       // Элемент для отображения счёта
        this.boxSize = 20;  // Размер каждой части змеи и еды
        this.score = 0;     // Счёт игры

        // Начальная позиция змеи
        this.snake = [
            { x: 160, y: 160 },
            { x: 140, y: 160 },
            { x: 120, y: 160 }
        ];

        // Начальная позиция еды
        this.food = {
            x: Math.floor(Math.random() * (this.canvas.width / this.boxSize)) * this.boxSize,
            y: Math.floor(Math.random() * (this.canvas.height / this.boxSize)) * this.boxSize
        };

        // Направление змеи
        this.dx = this.boxSize;  // Двигается вправо по умолчанию
        this.dy = 0;

        // Флаг для отслеживания начала игры
        this.gameStarted = false;
    
    }

    // Инициализация игры
    init() {
        this.startButton.addEventListener('click', () => this.startGame());
        document.addEventListener('keydown', (event) => this.changeDirection(event));
    }

    // Начало игры
    startGame() {
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.generateFood();
            this.gameLoop();
        }
    }

    // Игровой цикл
    gameLoop() {
        if (!this.gameStarted) return;  // Если игра не началась, не запускаем цикл

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // Очищаем холст
        this.moveSnake();  // Двигаем змею
        this.drawSnake();  // Рисуем змею
        this.drawFood();  // Рисуем еду
        this.checkCollision();  // Проверяем столкновения
        setTimeout(() => this.gameLoop(), 100);  // Повтор игрового цикла каждые 100 мс (скорость змейки)
    }

    // Рисование змеи
    drawSnake() {
        this.snake.forEach(part => {
            this.ctx.fillStyle = '#28a745';  // Цвет змеи
            this.ctx.fillRect(part.x, part.y, this.boxSize, this.boxSize);  // Рисуем сегмент змеи
            this.ctx.strokeStyle = '#000';  // Цвет границы сегмента
            this.ctx.strokeRect(part.x, part.y, this.boxSize, this.boxSize);  // Рисуем границу
        });
    }

    // Перемещение змеи
    moveSnake() {
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };  // Новая голова
        this.snake.unshift(head);  // Добавляем новую голову в начало массива

        // Если змея съела еду
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score++;  // Увеличиваем счёт
            this.scoreDisplay.innerText = 'Счёт: ' + this.score;  // Обновляем счёт на экране
            this.generateFood();  // Генерируем новую еду
        } else {
            this.snake.pop();  // Удаляем последний сегмент, если еда не была съедена
        }
    }

    // Генерация еды в случайном месте
    generateFood() {
        this.food.x = Math.floor(Math.random() * (this.canvas.width / this.boxSize)) * this.boxSize;
        this.food.y = Math.floor(Math.random() * (this.canvas.height / this.boxSize)) * this.boxSize;

        // Проверяем, чтобы еда не появилась на змее
        this.snake.forEach(part => {
            if (part.x === this.food.x && part.y === this.food.y) {
                this.generateFood();  // Если совпадает с змеёй, генерируем заново
            }
        });
    }

    // Рисование еды
    drawFood() {
        this.ctx.fillStyle = '#ff6347';  // Цвет еды
        this.ctx.fillRect(this.food.x, this.food.y, this.boxSize, this.boxSize);  // Рисуем еду
    }

    // Изменение направления движения змеи
    changeDirection(event) {
        if (!this.gameStarted) return;  // Если игра не началась, игнорируем управление
        const key = event.keyCode;
        // Управление стрелками
        if (key === 37 && this.dx === 0) {  // Левая стрелка
            this.dx = -this.boxSize;
            this.dy = 0;
        } else if (key === 38 && this.dy === 0) {  // Вверх
            this.dx = 0;
            this.dy = -this.boxSize;
        } else if (key === 39 && this.dx === 0) {  // Правая стрелка
            this.dx = this.boxSize;
            this.dy = 0;
        } else if (key === 40 && this.dy === 0) {  // Вниз
            this.dx = 0;
            this.dy = this.boxSize;
        }
    }

    // Проверка столкновений со стенами и телом змеи
    checkCollision() {
        const head = this.snake[0];

        // Проверка столкновения со стенами
        if (head.x < 0  head.y < 0  head.x >= this.canvas.width || head.y >= this.canvas.height) {
            alert('Игра окончена! Ваш счёт: ' + this.score);
            document.location.reload();  // Перезапускаем игру
        }

        // Проверка столкновения с телом змеи (начиная с 4-го сегмента)
        for (let i = 4; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                alert('Игра окончена! Ваш счёт: ' + this.score);
                document.location.reload();  // Перезапускаем игру
            }
        }
    }
}