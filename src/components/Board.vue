<template>
    <div class="checkers-board-container">
    <div class="checkers-board">
      <div class="checkers-grid">
        <!-- Отображение клеток и шашек -->
        <Box v-for="(box, index) in boxesTitle" :key="index" :theme="toggleTheme(index)" @click.stop="selectedChecker() === index ? null : selectChecker(index)" :class="{ selected: selectedChecker() === index }" :validBox="isValidMoves().includes(index)" @click="moveChecker(index)">
          <!-- Если шашка существует, показываем ее и даем возможность выбрать -->
          <Checker v-if="checkersMap.get(index)"
                   :color="checkersMap.get(index)?.color"
                   :king="checkersMap.get(index)?.king"
                   @click.stop="selectChecker(index)" 
                   :class="{ selected: selectedChecker() === index }" />
        </Box>
      </div>
    </div>

    <div class="logs">
      <h2>Логи игры</h2>
      <ul>
        <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">

interface Position {
  row: number;
  col: number;
}

// Интерфейс для шашек
interface IChecker {
  position: Position;
  color: 'white' | 'black';
  isKing: boolean;
  move(newPosition: Position): void;
  promoteToKing(): void;
}

// Класс для шашек
class Checker implements IChecker {
  position: Position;
  color: 'white' | 'black';
  isKing: boolean;

  constructor(position: Position, color: 'white' | 'black') {
    this.position = position;
    this.color = color;
    this.isKing = false;
  }

  move(newPosition: Position): void {
    // Передвинуть шашку на новое место
    this.position = newPosition;
  }

  promoteToKing(): void {
    // Повысить до дамки
    this.isKing = true;
  }
}

// Интерфейс для доски
interface IBoard {
  grid: (Checker | null)[][];
  initialize(): void;
  printBoard(): void;
}

// Класс для доски
class Board implements IBoard {
  grid: (Checker | null)[][];
  currentPlayer = 1; // 1 - белые, -1 - черные
  selectedChecker = 0;
  validMoves = <number[]>([]);
  constructor() {
    // Создаем 8x8 сетку, изначально пустую
    this.grid = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
  }


  getValidMoves(): number[] {
    return this.validMoves
  }

  setValidMoves(moves: number[]): void {
    this.validMoves = moves
  }

  getCurrentPlayer(): String{
    return this.currentPlayer === 1 ? 'white' : 'black';
  }
  setCurrentPlayer(color: String){
    if (color ==="white"){
      this.currentPlayer = 1;
    }
    else if(color ==="black"){
      this.currentPlayer *= -1;
    }
    else 
    {
      console.log(color);
    }
    
  }

  getSelectedChecker(): number{
    return this.selectedChecker;
  }

  setSelectedChecker(index: number): void {
    this.selectedChecker = index;
  }

  initialize(): void {
    // Инициализация шашек в начальном положении
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Шашки расставляются только на черных клетках, т.е. клетки с нечетными индексами по строкам
        if ((row + col) % 2 !== 0) {
          if (row < 3) {
            // Верхние три ряда для черных шашек
            this.grid[row][col] = new Checker({ row, col }, 'black');
          } else if (row > 4) {
            // Нижние три ряда для белых шашек
            this.grid[row][col] = new Checker({ row, col }, 'white');
          }
        }
      }
    }
  }

  printBoard(): void {
    // Печать доски в консоль
    for (let row = 0; row < 8; row++) {
      let rowStr = '';
      for (let col = 0; col < 8; col++) {
        const checker = this.grid[row][col];
        if (checker === null) {
          rowStr += '- ';
        } else {
          rowStr += checker.color[0].toUpperCase() + ' ';
        }
      }
      console.log(rowStr);
    }
  }
}
const board = new Board();
board.initialize();
board.printBoard();


import { defineComponent, reactive, ref } from 'vue'
import BoxVue from "./Box.vue";
import CheckerVue from './Checker.vue';

export default defineComponent({
    name: "Board",
    data(){
        return{
            boxesTitle: ref([
                'A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8',
                'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7',
                'A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6',
                'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5',
                'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4',
                'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3',
                'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2',
                'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1',
            ]),
            checkersMap: reactive(new Map<number, { color: 'black' | 'white'; king: boolean } | null | undefined>()),
            //currentPlayer: ref<'black' | 'white'>('black'), // Хранит текущего игрока
            logs: ref<string[]>([]), // Логи для отображения
            //validMoves: ref<number[]>([])
          }        
    },
    methods:{
        isValidMoves(){
          return board.getValidMoves()
        },
        toggleTheme(index: number){
            const BoardSize = 8
            const row =(Math.floor(index / BoardSize))
            const col = index % BoardSize
            if ((row + col) % 2 === 0)
            {
                return 'white'
            } 
            return 'black'
        },
        selectedChecker() : number {
          return board.getSelectedChecker()
        },
        // Инициализация шашек на доске
        initCheckersMap() {
            const BoardSize = 8;
            for (let i = 0; i < BoardSize * BoardSize; i++) {
                this.checkersMap.set(i, null);
            }

            // Инициализация шашек для игрока 1 (темные шашки)
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < BoardSize; j++) {
                    if ((i + j) % 2 === 1) {
                        this.checkersMap.set(i * BoardSize + j, { color: 'black', king: false });
                    }
                }
            }
            console.log('Инициализация шашек для игрока 1 (темные шашки)')
            // Инициализация шашек для игрока 2 (светлые шашки)
            for (let i = 5; i < 8; i++) {
                for (let j = 0; j < BoardSize; j++) {
                    if ((i + j) % 2 === 1) {
                        this.checkersMap.set(i * BoardSize + j, { color: 'white', king: false });
                    }
                }
            }
            console.log('Инициализация шашек для игрока 2 (светлые шашки)')
            this.addLog(`Игра началась. Игрок ${board.getCurrentPlayer()} начинает.`);
        },
        // Логика выбора шашки
        selectChecker(index: number) {
            const checker = this.checkersMap.get(index);
            if (checker && checker.color === board.getCurrentPlayer()) {
                // Если шашка принадлежит текущему игроку, то ее можно выбрать
                board.setSelectedChecker(index);
                board.setValidMoves(this.getValidMoves(index))// = this.getValidMoves(index);
                this.addLog(`Игрок '${board.getCurrentPlayer()}' выбрал шашку на позиции ${this.getBoxTitle(index)}`);
            }else if (checker) {
                this.addLog(`Шашка игрока '${checker.color}' не принадлежит текущему игроку.`);
            }
        },

        // Логика перемещения шашки
        moveChecker(toIndex: number) {
            const fromIndex = board.getSelectedChecker();
            board.setValidMoves(<number[]>([]))// = this.getValidMoves(fromIndex)
            if (fromIndex === null) {
                this.addLog("Сначала выберите шашку.");
                return; // Прекращаем выполнение, если шашка не выбрана
            }

            if (fromIndex !== null && this.isValidMove(fromIndex, toIndex)) {
                const checker = this.checkersMap.get(fromIndex);

                const eatenIndex = this.getEatenChecker(fromIndex, toIndex);
                if (eatenIndex !== null) {
                    this.checkersMap.set(eatenIndex, null); // Убираем съеденную шашку
                    this.addLog(`Шашка на позиции ${this.getBoxTitle(eatenIndex)} была съедена.`);
                }

                // Перемещаем шашку на новое место
                this.checkersMap.set(toIndex, checker);
                this.checkersMap.set(fromIndex, null);

                this.addLog(`Игрок '${board.currentPlayer}' переместил шашку с ${this.getBoxTitle(fromIndex)} на ${this.getBoxTitle(toIndex)}.`);

                // Снимаем выделение
                board.setSelectedChecker(0)

                // Меняем игрока
                board.setCurrentPlayer( board.getCurrentPlayer() === 'black' ? 'white' : 'black');
                this.addLog(`Теперь ходит игрок '${board.currentPlayer}'.`);
            }else if (fromIndex !== null) {
                this.addLog("Невалидный ход.");
            }
        },
        getEatenChecker(fromIndex: number, toIndex: number): number | null {
            const BoardSize = 8;
            const fromRow = Math.floor(fromIndex / BoardSize);
            const fromCol = fromIndex % BoardSize;
            const toRow = Math.floor(toIndex / BoardSize);
            const toCol = toIndex % BoardSize;

            if (Math.abs(toRow - fromRow) === 2 && Math.abs(toCol - fromCol) === 2) {
                const midRow = (fromRow + toRow) / 2;
                const midCol = (fromCol + toCol) / 2;
                const middleIndex = midRow * BoardSize + midCol;

                const middleChecker = this.checkersMap.get(middleIndex);
                const fromChecker = this.checkersMap.get(fromIndex);

                if (middleChecker && middleChecker.color !== fromChecker?.color) {
                    return middleIndex;
                }
            }
            return null;
        },
        getValidMoves(index: number): number[] {
            //console.log('Проверка валидных ходов для шашки на позиции', this.getBoxTitle(index))
            const BoardSize = 8;
            const row = Math.floor(index / BoardSize);
            const col = index % BoardSize;
            const checker = this.checkersMap.get(index);
            const validMoves: number[] = [];
            
            if (!checker) return validMoves;

            // Возможные направления для обычных шашек
            const directions = checker.color === 'black' ? [[1, -1], [1, 1]] : [[-1, -1], [-1, 1]];

            for (const [dRow, dCol] of directions) {
                const newRow = row + dRow;
                const newCol = col + dCol;
                const newIndex = newRow * BoardSize + newCol;

                // Проверяем стандартный ход
                if (this.isValidMove(index, newIndex)) {
                    validMoves.push(newIndex);
                    
                    console.log(`Добавлен стандартный ход на позицию ${this.getBoxTitle(newIndex)}`)
                }

                // Проверяем ход с поеданием
                const jumpRow = row + 2 * dRow;
                const jumpCol = col + 2 * dCol;
                const jumpIndex = jumpRow * BoardSize + jumpCol;

                if (this.getEatenChecker(index, jumpIndex)) {
                    validMoves.push(jumpIndex);
                    console.log('Возможный ход с поеданием на позицию', this.getBoxTitle(jumpIndex));
                }
            }

            return validMoves;
        },
        // Проверка валидности хода
        isValidMove(fromIndex: number, toIndex: number): boolean {
            const BoardSize = 8;
            const fromRow = Math.floor(fromIndex / BoardSize);
            const fromCol = fromIndex % BoardSize;
            const toRow = Math.floor(toIndex / BoardSize);
            const toCol = toIndex % BoardSize;

            // Проверяем, что целевая клетка пуста
            if (this.checkersMap.get(toIndex) !== null) {
                return false;
            }

            const checker = this.checkersMap.get(fromIndex);
            if (!checker) return false;

            const isKing = checker.king;

            // Для обычной шашки проверяем, что ход происходит на одну клетку по диагонали
            if (!isKing) {
                const rowDifference = checker.color === 'black' ? toRow - fromRow : fromRow - toRow;
                const colDifference = Math.abs(toCol - fromCol);
                if (rowDifference === 1 && colDifference === 1) {
                    return true;
                }
            }

            // TODO: Добавить логику для дамок и прыжков через другие шашки
            
            return this.getEatenChecker(fromIndex, toIndex) !== null;
        },
        // Получаем название клетки (A8, B7 и т.д.)
        getBoxTitle(index: number) {
            return this.boxesTitle[index];
        },
        // Метод для добавления логов
        addLog(message: string) {
            this.logs.push(message);
            console.log(message); // Для вывода в консоль
        }
    },
    mounted() {
        this.initCheckersMap();
    },
    components: {
        Box: BoxVue,
        Checker: CheckerVue
    }
    },
)

</script>
  
  <style scoped>
  .checkers-board{
    margin: 20px ;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(80% + 10px);
    max-width: 1200px;
    min-width: 100px;
    aspect-ratio: 1 / 1;
    flex-shrink: 0;
    background: #FAEEB9;
  }
  .checkers-grid {
    display: grid;
    width: calc(100% - 5%);
    aspect-ratio: 1 / 1;
    
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    padding: 0;
    margin: 0;
    background-color: #87ceeb;
  }
  .selected {
    border: 2px solid red;
  } 
  
  .logs {
  width: 80%;
  background-color: #f0f0f0;
  }
  </style>
  