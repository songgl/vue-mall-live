<template>
  <div class="pageBox">
    <div class="box_touch">
			<load-mord :on-refresh="onRefresh" :on-infinite="onInfinite">
	    	<div class="h175">
	    		<my-banner :bannerInfo='bannerInfo' :type="1"></my-banner>
	    	</div>
	    	<live-class></live-class>
	    	<div class="box_between tabBox">
					<div class="box_center grid_cell">
						<div class="tabItem box_center" :class="{'nav_act col_red':type==2}" @click="tabClick(2)">关注</div>
					</div>
					<div class="box_center grid_cell">
						<div class="tabItem box_center" :class="{'nav_act col_red':type==1}" @click="tabClick(1)">广场</div>
					</div>
					<div class="box_center grid_cell">
						<div class="tabItem box_center" :class="{'nav_act col_red':type==3}" @click="tabClick(3)">热门</div>
					</div>
	    	</div>
				<div class="box_between flex_wrap p5">
					<!-- 列表项 -->
					<div class="w_b50 p5" v-for="item in listInfo" :key="item.live_id">
						<div class="box_center liveListBox" ref="liveListDom">
							<div class="box_start listTop">
								<div class="box_center userName">
									<div class="w_b100 wbyc" v-text="item.username"></div>
								</div>
							</div>
							<div class="listBottom">
								<div class="box_start">
									<div class="box_start bottomBack">
										<div class="box_center liveAct" v-show="item.live_id !=0">直播中</div>
										<div class="box_center liveWatch"><em v-text="item.watch_nums || 0"></em>观看</div>
									</div>
								</div>
							</div>
							<div class="imgMk"></div>
							<img v-lazy="item.play_img ? item.play_img : item.header_img" alt="" />
						</div>
						<div class="listTxt" v-text="item.signature"></div>
					</div>
				</div>
			</load-mord>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import api from '../../api/api'
import liveApi from '../../api/live'
import storage from '../../common/storage'
import myFooter from '../../components/footer/footer'
import MyBanner from '../../components/banner/banner'
import LiveClass from './private/liveClass'
import LoadMord from '../../components/loadMord/loadMord'

export default {
	data () {
		return {
			bannerInfo: [],
			allPage: null, // 总页数
			page: 1, // 当前页数，默认为1
			type: storage.s_getItem("liveType") || 1, // 类型
			listInfo: []  // 列表数据
		}
	},
  methods: {
  	// 获取直播首页banner图信息
    _getBannerFun () {
      api.getBannerFun(1)
      .then((res) => {
        if(res.status ==='ok'){
          for(let i=0;i<res.data.length;i++){
            this.bannerInfo.push(res.data[i])
          }
        }else if(res.status === 'error'){
          console.log(res.error)
        }
      })
    },
    // 获取直播列表
    _getLiveList (type, page) {
			this.setLoading(true)
    	this.page = page || 1
			this.type = type || 1
    	liveApi.getLiveList(this.type, this.page)
    	.then((res) => {
				this.setLoading(false)
    		if(res.status ==='ok'){
        	this.allPage = res.data.page
          for(let i=0;i<res.data.list.length;i++){
            this.listInfo.push(res.data.list[i])
          }
          this.$nextTick(function(){ // 设置商品图片的高度等于它的宽度
						let domW = this.$refs.liveListDom[0].offsetWidth
						for(let i = 0; i < this.$refs.liveListDom.length; i++){
							this.$refs.liveListDom[i].style.height = domW + 'px'
						}
					})
        }else if(res.status === 'error'){
          this.promptFun({
          	content: res.data,
          	type: 'error'
          })
        }
    	})
    },
    /*下拉刷新*/
    onRefresh(done) {
      this.listInfo = []
      this._getLiveList(this.type)
      done() // call done
    },
    /*上拉加载*/
    onInfinite(done) {
      let vm = this;
      if(this.allPage > this.page){ // 总页数大于当前页数
        this._getLiveList(this.type, ++this.page)
        done(true)
      }else{
        done(false) // call done
      }
    },
    /*tab切换使用*/
    tabClick(type) {
    	storage.s_setItem("liveType",type)
    	this.listInfo = []
    	this._getLiveList(type)
    },
  },
  created() {
  	this._getBannerFun()
  	this._getLiveList()
  },
  components: {
  	myFooter,
  	MyBanner,
  	LiveClass,
  	LoadMord
  }
}
</script>

<style scoped>
	.tabBox{
		background-color: #fff;
		height: .8rem;
		font-size: .28rem;
		color: #666;
		border-bottom: 1px solid #efefef;
	}
	.tabItem{
		padding: 0 .2rem;
		height: .76rem;
	}
	.liveListBox{
		width: 100%;
		position: relative;
	}
	.liveListBox img{
		border-radius: .1rem .1rem 0 0;
	}
	.imgMk{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: .1rem .1rem 0 0;
		background-color: rgba(0,0,0,.2)
	}
	.listTxt{
		background-color: #fff;
		padding: .1rem;
		height: .6rem;
		width: 100%;
		overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 0 0 .1rem .1rem;
	}
	.listTop{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		color: #fff;
		padding:.1rem;
	}
	.userName{
		background-color: rgba(0,0,0,.8);
		border-radius: .3rem;
		padding: 0 .2rem;
		max-width: 100%;
		height: .4rem;
		font-size: .2rem;
	}
	.listBottom{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		color: #fff;
		padding: .1rem;
	}
	.bottomBack{
		background-color: rgba(0,0,0,.8);
		border-radius: .06rem;
	}
	.liveAct{
		background-color: red;
		border-radius: .06rem;
		padding: 0 .1rem;
		height: .36rem;
		font-weight: bold;
	}
	.liveWatch{
		padding: 0 .1rem;
		height: .36rem;
	}
</style>
