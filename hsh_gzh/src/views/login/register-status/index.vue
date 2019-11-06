<template>
	<div class="payment_status">
		<div class="status_top">
			<van-icon :name="statusIcon" :class="statusClass" />
			<div>{{statusText}}</div>
		</div>

		<div class="status_text"><span class="red"></span>恭喜你注册成功, 您可以<router-link to="/login" class="red">点此登录</router-link></div>
	</div>
</template>

<script>
export default {
  name: 'payment-status',

  props: {
    status: String
  },
 

  data() {
    return {
      isSuccess: true,
      three:3,
       //1.首先声明seconds
     seconds : 5,
    //2.声明定时器
    timer : null,
    
    };
  },
  created(){
    // setInterval(show,1000);
  },
  methods:{
    // show(){
    //     if(seconds==0){
    //         clearInterval(timer);//清除定时器
    //         window.location.href = "http://www.baidu.com";//跳转到百度首页
    //         return;
    //     }
    //     //将不断变化的秒数显示在页面上
    //     document.getElementById('spanTime').innerHTML = '<span class="changeFont">'+seconds+'</span>' + "秒后返回首页！"; //这里添加的class仅仅是为了改变 变化的秒数的样式
    //     seconds--; 
    // } 
  },

  computed: {
    statusText() {
      return this.isSuccess ? '注册成功' : '注册失败';
    },
    statusIcon() {
      return this.isSuccess ? 'checked' : 'fail';
    },
    statusClass() {
      return this.isSuccess ? 'success_icon' : 'fail_icon';
    }
  },

  activated() {
    this.isSuccess = this.status === 'success';
  }
};
</script>


<style lang="scss" scopd>
.payment_status {
  padding-top: 30px;
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;
}

.status_top {
  margin-bottom: 15px;
  i {
    margin-bottom: 5px;
  }
  > div {
    font-size: 18px;
  }
}

.status_text {
  color: $font-color-gray;
  margin-bottom: 50px;
}

.status_icon {
  font-size: 80px;
}

i.success_icon {
  @extend .status_icon;
  color: #06bf04;
}

i.fail_icon {
  @extend .status_icon;
  color: #f44;
}
</style>
