<template>
  <div class="login">
    <el-card class="login-card">
      <div class="logo">
        <img src="../../assets/logo_index.png" alt />
      </div>
      <!-- 表单  （loginForm表单名） -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" style="margin-top: 20px">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code" >
          <el-input v-model="loginForm.code" style="width:260px" placeholder="请输入验证码"></el-input>
          <el-button style="float:right;">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {//定义一个方法
    const validator = function(rule, value, callback) {
      if (value) {//只要勾选了
        callback()
      } else {
        callback(new Error('你必须同意'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [
          {
            required: true, //必填项
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码必须为六位数字'
          }
        ],
        check: [
          {
           validator
          }
        ]
      }
    };
  },
  methods: {
    login() {
        //拿到数据 发起请求（axios）
        this.$refs.loginForm.validate(isOk=>{//获取表单数据  validate是方法  isOk代表是否拿到数据
            if(isOk){
                //请求axios npm i axios
                this.$axios({
                    url:'/authorizations',//一般都是接口文档给的接口
                    method:'post',
                    data:this.loginForm
                }).then(result=>{//请求成功后，提示登陆成功 并跳转  token
                    console.log(result);
                    console.log(result.data)
                    window.localStorage.setItem('user-token',result.data.data.token);//拿到token（session的会员卡）什么名，什么值
                    //编程式导航
                    this.$router.push('/')
                    this.$message({
                      message:'登陆成功',
                      type:'success'
                    })
                }).catch(()=>{
                  this.$message({//  弹窗
                    message:'手机号或验证码错误',
                    //type:'warning',
                    type:'error'
                  })
                })
            }else{

            }
        })
    }
  }
};
</script>

<style lang="less">
.login {
  background-image: url("../../assets/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 420px;
    height: 360px;
    .logo {
      text-align: center;
      img {
        height: 50px;
      }
    }
  }
}
</style>