// Создаём полле, как 2-х мерный массив`
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// Определяем активного игрока
let currentPlayer = 'X';

// Получаем каждую ячейку с классом "cell"
const cells = document.querySelectorAll('.cell');

// Добавляем событие при нажатии на ячейку
cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

// Функция, которая активируется при нажатии на ячейку
function handleClick(e) {
  // Получаем событие
  const cell = e.target;
  
  // Получаем data атрибуты у ячейки
  const row = cell.getAttribute('data-row');
  const col = cell.getAttribute('data-col');
  
  // Проверяем пустая оно или нет
  if (board[row][col] !== '') {
    alert('Эта ячейка уже занята!');
    return;
  }
  
  // Добавляем ячейке символ игрока
  board[row][col] = currentPlayer;
  cell.textContent = currentPlayer;
  
  // Проверяем была ли закончена игра
  if (checkWin()) {
    alert(`${currentPlayer} победил!`);
    resetGame();
    return;
  }
  
  if (checkDraw()) {
    alert('Игра закончилась вничью!');
    resetGame();
    return;
  }
  
  // После каждого хода сменяем активного пользователя
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Функция выполняется, если один из игроков выйграл
function checkWin() {
  // Проверка строки
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
      return true;
    }
  }
  
  // Проверка столбца
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
      return true;
    }
  }
  
  // Проверка диагонали
  if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
    return true;
  }
  
  if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
    return true;
  }
  
  return false;
}

// Функция для проверки того, закончилась ли игра вничью
function checkDraw() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        return false;
      }
    }
  }
  
  return true;
}

// Функция рестарта игры
function resetGame() {
  // Очистка поля
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  // Сброс активного игрока
  currentPlayer = 'X';
  
  // Сброс выбранных ячеек
  cells.forEach(cell => {
    cell.textContent = '';
  });
  
  // Добавляем событие, при нажатии на ячейку
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
  });
}