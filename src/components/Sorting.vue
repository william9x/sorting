<template>
  <div>
    <b-navbar class="b-navbar" toggleable="md" type="dark" variant="secondary">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="b-navbar-nav">
          <b-navbar-brand
            @click="new_array(slider.value)"
            class="b-navbar-brand"
            :class="[
              {'disabled':(isSorting === true)},
            ]"
          >Generate New Array</b-navbar-brand>
        </b-navbar-nav>
        <span class="seperator"></span>

        <b-navbar-nav class="b-navbar-nav">
          <b-row class="d-flex justify-content-center">
            <b-col>
              <span
                style="color: #F8FFFF"
                :class="[
              {'disabled':(isSorting === true)},
            ]"
              >Change Array Size and Sorting Speed</span>
            </b-col>
            <b-col>
              <div>
                <VueSlideBar
                  v-model="slider.value"
                  :data="slider.data"
                  :processStyle="{ backgroundColor: sliderOptions.backgroundColor }"
                  @callbackRange="callbackRange"
                  :draggable="sliderOptions.draggable"
                  :is-disabled="sliderOptions.isDisabled"
                  :show-tooltip="sliderOptions.showTooltip"
                >
                  <template slot="tooltip" slot-scope="tooltip"></template>
                </VueSlideBar>
              </div>
            </b-col>
          </b-row>
        </b-navbar-nav>
        <span class="seperator"></span>

        <b-navbar-nav class="b-navbar-nav">
          <b-navbar-brand
            @click="select_methods(1)"
            class="b-navbar-brand"
            :class="[
              {'active':(selected_methods === 1 && isSorting === false)},
              {'disabled':(isSorting === true)},
            ]"
          >Merge Sort</b-navbar-brand>
          <b-navbar-brand
            @click="select_methods(2)"
            class="b-navbar-brand"
            :class="[
              {'active':(selected_methods === 2 && isSorting === false)},
              {'disabled':(isSorting === true)},
            ]"
          >Quick Sort</b-navbar-brand>
          <b-navbar-brand
            @click="select_methods(3)"
            class="b-navbar-brand"
            :class="[
              {'active':(selected_methods === 3 && isSorting === false)},
              {'disabled':(isSorting === true)},
            ]"
          >Heap Sort</b-navbar-brand>
          <b-navbar-brand
            @click="select_methods(4)"
            class="b-navbar-brand"
            :class="[
              {'active':(selected_methods === 4 && isSorting === false)},
              {'disabled':(isSorting === true)},
            ]"
          >Bubble Sort</b-navbar-brand>
        </b-navbar-nav>
        <span class="seperator"></span>

        <b-navbar-nav class="b-navbar-nav">
          <b-navbar-brand
            @click="sort()"
            class="b-navbar-brand"
            :class="[
              {'disabled':(isSorting === true)},
            ]"
          >Sort</b-navbar-brand>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container class="b-container">
      <b-row class="d-flex justify-content-center">
        <span
          v-for="(col, index) in board.cols"
          :key="index"
          class="sort-column text-center"
          :style="{height: col + 'px', width: width +'px'}"
          :class="[
            {'active-col':(board.active_cols.includes(index))},
            {'pivot-col':(board.pivot_cols.includes(index))},
            {'red-col':(board.red_cols.includes(index))},
            {'green-col':(board.green_cols.includes(index) || finishedSorting)}
          ]"
        ></span>
      </b-row>
      <b-row class="d-flex justify-content-center fixed-bottom">
        <b-navbar-brand class="b-navbar-brand">Made by Nam</b-navbar-brand>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { getMergeSortAnimations } from "../sortingAlgo/mergeSort";
import { getQuickSortAnimations } from "../sortingAlgo/quickSort";
import { getHeapSortAnimations } from "../sortingAlgo/heapSort";
import { getBubbleSortAnimations } from "../sortingAlgo/bubbleSort";

import VueSlideBar from "vue-slide-bar";

export default {
  name: "Sorting",
  components: {
    VueSlideBar
  },
  data() {
    return {
      selected_methods: 1,
      sorting_time: 0,
      width: 0,

      rangeValue: {},
      slider: {
        value: 150,
        data: [10, 20, 30, 40, 50, 60, 150]
      },
      sliderOptions: {
        draggable: true,
        isDisabled: false,
        backgroundColor: "#d8d8d8",
        showTooltip: true
      },

      board: {
        cols: [],
        active_cols: [],
        pivot_cols: [],
        red_cols: [],
        green_cols: []
      },

      finishedSorting: false,
      isSorting: false
    };
  },
  watch: {
    slider: {
      handler: function(val) {
        if (this.isSorting === false) {
          this.new_array(val.value);
          if (val.value === 10) {
            this.width = 50;
            this.sorting_time = 400;
          } else if (val.value === 20) {
            this.width = 30;
            this.sorting_time = 200;
          } else if (val.value === 30) {
            this.width = 15;
            this.sorting_time = 100;
          } else if (val.value === 40) {
            this.width = 10;
            this.sorting_time = 50;
          } else if (val.value === 50) {
            this.width = 7;
            this.sorting_time = 20;
          } else if (val.value === 60) {
            this.width = 5;
            this.sorting_time = 10;
          } else if (val.value === 150) {
            this.width = 3;
            this.sorting_time = 5;
          }
        }
      },
      deep: true,
      immediate: true
    },
    isSorting: {
      handler: function() {
        if (this.isSorting === true) {
          this.sliderOptions = {
            draggable: false,
            isDisabled: true,
            backgroundColor: "#e62510",
            showTooltip: false
          };
        } else {
          this.sliderOptions = {
            draggable: true,
            isDisabled: false,
            backgroundColor: "#d8d8d8",
            showTooltip: true
          };
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.new_array(this.slider.value);
  },
  methods: {
    callbackRange(val) {
      if (this.isSorting === false) {
        this.rangeValue = val;
      }
    },
    new_array(amount) {
      if (this.isSorting === false) {
        (this.board = {
          cols: [],
          active_cols: [],
          pivot_cols: [],
          red_cols: [],
          green_cols: []
        }),
          (this.finishedSorting = false);
        for (let i = 0; i < amount; i++) {
          this.board.cols.push(this.randomInt(100, 550));
        }
      }
    },
    randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    select_methods(method) {
      if (this.isSorting === false) {
        this.selected_methods = method;
      }
    },
    async sort() {
      if (this.finishedSorting === false && this.isSorting === false) {
        this.isSorting = true;

        switch (this.selected_methods) {
          case 1:
            await this.mergeSort(this.board.cols);
            break;
          case 2:
            await this.quickSort(this.board);
            break;
          case 3:
            await this.heapSort(this.board);
            break;
          case 4:
            await this.bubbleSort(this.board);
            break;
          default:
            alert("Choose a method!");
        }

        this.finishedSorting = true;
        this.isSorting = false;
      }
    },
    async bubbleSort(board) {
      await getBubbleSortAnimations(board, this.sorting_time);
    },
    async quickSort(board) {
      await getQuickSortAnimations(
        board,
        board.cols,
        0,
        board.cols.length - 1,
        this.sorting_time
      );
    },
    async heapSort(board) {
      await getHeapSortAnimations(board, board.cols, this.sorting_time);
    },
    async mergeSort(array) {
      const animations = await getMergeSortAnimations(array);
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName("sort-column");
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIndex, barTwoIndex] = animations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          const barTwoStyle = arrayBars[barTwoIndex].style;
          const color = i % 3 === 0 ? "#ca44c4" : "#2c3e50";

          await this.sleep(this.sorting_time);
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        } else {
          await this.sleep(this.sorting_time);
          const [barOneIndex, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIndex].style;
          barOneStyle.height = `${newHeight}px`;
        }
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
};
</script>

<style scoped>
.b-navbar {
  height: 90px;
}
.b-navbar-nav {
  margin: 2%;
}
.b-navbar-brand {
  cursor: pointer;
  font-size: 100%;
}
.seperator {
  width: 5px;
  height: 50px;
  background-color: #2c3e50 !important;
}
.sort-column {
  margin: 0 2px;
  background-color: #34495e;
}
.active {
  color: #ca44c4 !important;
}
.disabled {
  cursor: default;
  color: #e62510 !important;
}
.active-col {
  background-color: #ca44c4 !important;
}
.pivot-col {
  background-color: #f1c40f !important;
}
.red-col {
  background-color: #e74c3c !important;
}
.green-col {
  background-color: #2ecc71 !important;
}
</style>
