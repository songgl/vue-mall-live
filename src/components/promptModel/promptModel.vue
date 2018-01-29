<template>
  <transition name="prompt">
    <div class="promptBox" v-if="promptState">
      <div class="prompt-content" :style="setStyle">
      	<div v-html="promptData.content"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed:{
    setStyle () {
      return {
        color: this.promptData.textColor || '#fff',
        background: this.promptData.backgroundColor ? this.promptData.backgroundColor : this.promptData.type === 'error' ? 'red' : '#21e7b6'
      }
    },
    ...mapGetters([
      'promptData',
      'promptState'
    ])
  }
}
</script>

<style scoped>
  .promptBox{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }
  .prompt-content{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .24rem;
    min-height: .8rem;
  }
  .prompt-enter-active {
    top: 0;
    transition: top .3s;
  }
  .prompt-leave-active {
    top: -1rem;
    transition: top .8s;
  }
  .prompt-enter, .prompt-leave-to{
    top: -1rem;
    transition: top .8s;
  }
</style>
