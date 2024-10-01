<template>
    <div class="checkers-board">
      <div class="checkers-grid">
        <Box v-for="(box, index) in boxesTitle" :key="index" :theme="toggleTheme(index)">  {{ box }} 
        <Checker v-if="checkersMap.get(index)" :color="checkersMap.get(index)?.color" :king="checkersMap.get(index)?.king" /></Box>
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

  constructor() {
    // Создаем 8x8 сетку, изначально пустую
    this.grid = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
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
            checkersMap: reactive(new Map<number, { color: 'dark' | 'light'; king: boolean } | null>())
        }        
    },
    methods:{
        toggleTheme(index: number){
            const BoardSize = 8
            const row =(Math.floor(index / BoardSize))
            const col = index % BoardSize
            if ((row + col) % 2 === 0)
            {
                return 'white'
            } 
            return 'dark'
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
                        this.checkersMap.set(i * BoardSize + j, { color: 'dark', king: false });
                    }
                }
            }

            // Инициализация шашек для игрока 2 (светлые шашки)
            for (let i = 5; i < 8; i++) {
                for (let j = 0; j < BoardSize; j++) {
                    if ((i + j) % 2 === 1) {
                        this.checkersMap.set(i * BoardSize + j, { color: 'light', king: false });
                    }
                }
            }
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% + 10px);
    max-width: 1500px;
    min-width: 500px;
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
  
  </style>
  