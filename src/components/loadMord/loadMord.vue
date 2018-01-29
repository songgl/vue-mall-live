<template>
  <div class="scroll-wrap" :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
    <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <header class="pull-refresh">
        <slot name="pull-refresh">
          <span class="down-tip">下拉更新</span>
          <span class="up-tip">松开刷新数据</span>
          <span class="refresh-tip">加载中……</span>
        </slot>
      </header>
      <slot>
      </slot>
      <transition name="fade">
        <footer class="load-more">
          <slot name="load-more">
            <span v-show="loadStart">上啦加载更多</span>
            <span v-show="loading">加载中……</span>
            <span class="nullData" v-show="!hasNext">暂无更多数据</span>
          </slot>
        </footer>
      </transition>
    </section>
  </div>
</template>
<script>
  export default {
    props:{
      offset: {
        type: Number,
        default: 50 //默认高度
      },
      enableInfinite: { // 激活上拉加载
        type: Boolean,
        default: true
      },
      enableRefresh: { // 激活下拉刷新
        type: Boolean,
        default: true
      },
      /*接收父组件传过来的下拉刷新方法*/
      onRefresh: {
        type: Function,
        default: undefined
      },
      /*接收父组件传过来的上拉加载的方法*/
      onInfinite: {
        type: Function,
        default: undefined
      }
    },
    data(){
      return {
        top: 0,
        state: 0,
        startX: 0,
        startY: 0,
        touching: false,
        hasNext: true, // 用来控制是否能继续上拉
        infiniteLoading: false,
        loadStart: false,
        loading: false //用来显示是否加载中
      }
    },
    computed:{ // 使用计算属性
      showFooter(){
        return this.loadStart||this.loading||!this.hasNext
      }
    },
    created(){
      // this.infinite();
    },
    methods:{
      /* 当手指触摸屏幕时候触发，即使已经有一个手指放在屏幕上也会触发 */
      touchStart(e) {
        this.startY = e.targetTouches[0].pageY; // 当前触摸点的Y坐标
        this.startX = e.targetTouches[0].pageX; // 当前触摸点的X坐标
        this.startScroll = this.$el.scrollTop || 0; // $el当前挂载点,获取滚动条相对于其顶部的偏移,默认为0
        this.touching = true // 表示当前正在触摸屏幕
      },
      /* 当手指在屏幕上滑动的时候连续地触发 */
      touchMove(e) {
        if((!this.enableRefresh && !this.hasNext) || !this.touching) {
          return
        }
        let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
        this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
        if(this.state === 2) { // in refreshing
          return
        }
        if(diff > 0){ // 下拉刷新
          e.preventDefault(); // 阻止元素默认行为
          console.log("下拉")
          if(this.top >= this.offset) {
            this.state = 1
          }
        }else if(this.hasNext){ // 上拉加载
          console.log("上拉")
          this.state = 0;
          this.loadStart=true;
        }
        
      },
      /* 当手指从屏幕上离开的时候触发 */
      touchEnd(e) { 
        this.touching = false;
        this.loadStart=false;
        if(this.state === 2) { // in refreshing
          this.state = 2
          this.top = this.offset
          return
        }
        if(this.enableRefresh) {
          if(this.top >= this.offset) { // do refresh
            this.refresh()
          } else { // cancel refresh
            this.state = 0
            this.top = 0
          }
        }

        //用于判断滑动是否在原地 ----begin
        let endX = e.changedTouches[0].pageX,
            endY = e.changedTouches[0].pageY,
            dy = this.startY - endY,
            dx = endX - this.startX;
        //如果滑动距离太短
        if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
          console.log("滑动距离太短");
          return;
        }
        //--------end--------
        if(!this.enableInfinite || this.infiniteLoading) {
          return
        }
        let outerHeight = this.$el.clientHeight,
            innerHeight = this.$el.querySelector('.inner').clientHeight,
            scrollTop = this.$el.scrollTop,
            ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0,
            bottom = innerHeight - outerHeight - scrollTop - ptrHeight;

        if(bottom <= this.offset && this.state === 0 && this.hasNext) {
          this.loading = true;
          this.infinite();
        } else {
          this.loading = false;
        }
      },
      /*下拉刷新*/
      refresh() {
        if(this.onRefresh){
          this.state = 2;
          this.top = this.offset;
          setTimeout(() => {
            this.onRefresh(this.refreshDone) // 将停止下拉刷新的方法当成参数传递
          }, 300);
        }
      },
      /*停止下拉*/
      refreshDone() {
        this.state = 0
        this.top = 0
      },
      /* 上拉加载 */
      infinite() { 
        if(this.onInfinite){
          this.infiniteLoading = true;
          this.loading = true;
          setTimeout(() => {
            this.onInfinite(this.infiniteDone) // 将停止上拉加载的方法当成参数传递
          },300)
        }
      },
      /* 停止上拉加载 */
      infiniteDone(bool) {
        this.infiniteLoading = false;
        this.loading=false;
        this.hasNext=bool;
      }
    }
  }
</script>
<style scoped>
  .scroll-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    height: auto;
    -webkit-overflow-scrolling: touch;
  }
  .scroll-wrap .inner {
    position: absolute;
    top: -1rem;
    left: 0;
    width: 100%;
    height: auto;
    transition-duration: 300ms;
  }
  .scroll-wrap .inner .pull-refresh {
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .scroll-wrap .inner .load-more {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .scroll-wrap .inner .load-more>span{
    padding: .2rem;
  }
  .scroll-wrap .inner .nullData {/*暂无更多数据样式*/
    color: #999999;
  }
  .scroll-wrap .inner .down-tip,
  .scroll-wrap .inner .refresh-tip,
  .scroll-wrap .inner .up-tip {
    display: none;
  }

  .scroll-wrap.touch .inner {
    transition-duration: 0;
  }

  .scroll-wrap.down .down-tip {
    display: block;
  }

  .scroll-wrap.up .up-tip {
    display: block;
  }

  .scroll-wrap.refresh .refresh-tip {
    display: block;
  }
</style>