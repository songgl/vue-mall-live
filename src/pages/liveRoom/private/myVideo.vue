<template>
  <video ref="myVideo" width="100%" height="100%" preload="auto" poster=""  webkit-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="true"></video>
</template>

<script>
export default {
	props: {
		videoSrc: {
			type: String,
			default: ''
		}
	},
  methods: {
  	
  },
  watch: {
  	
  },
  mounted () {
  	console.log(this.videoSrc)
  	this.$refs.myVideo.src = this.videoSrc
  }
}
</script>

<style scoped>

</style>
