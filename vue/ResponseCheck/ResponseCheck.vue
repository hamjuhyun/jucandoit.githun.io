<template>
  <div>
  <div id="screen" v-bind:class='state'>{{message}}</div>
  <div v-show="result.length">
    <div>평균시간: {{average}}ms</div>
    <button @click="onReset">리셋</button>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: [],
      state: 'waiting',
      message: '클릭해서 시작하세요.'
    }
  },
  computed: {
    average() {
      return result.reduce((a,c) => a + c, 0)/ this.result.length || 0;
    }
  }
  methods: {
    onReset() {

    },
    onClickScreen() {

    }
  }
}
</script>

<style scoped>
  #screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
  }

  #screen.waiting {
    background-color: aqua;
  }

  #screen.ready {
    background-color: red;
    color: white;
  }

  #screen.now {
    background-color: greenyellow;
  }

</style>