import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 1,
  }),
  actions: {
    increment() {
      this.count++;
    },
    decrement(){
      this.count--;
    },
  },
  getters: {
    doubleCount(state){
      return state.count * 2;
    },
  }
});