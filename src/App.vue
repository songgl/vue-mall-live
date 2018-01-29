<template>
  <div id="app" class="wrapper">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
		<prompt-model></prompt-model>
    <loading></loading>
  </div>
</template>

<script>
import PromptModel from '@/components/promptModel/promptModel'
import loading from '@/components/loading/loading'
import '@/assets/css/main.css'
export default {
  name: 'app',
  components: {
  	PromptModel,
    loading
  }
}
</script>

<style scoped>
.wrapper{height: 100%;max-width: 640px;min-width: 320px;margin: 0 auto!important;overflow: hidden;position: relative;}
</style>
