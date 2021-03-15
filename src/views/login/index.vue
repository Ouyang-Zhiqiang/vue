<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h1
          class="title"
          style="color: white; margin-top: 200px; margin-left: 820px"
        >
          FaceBody颜身管理系统
        </h1>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="验证码登录" name="first">
          <el-tooltip
            v-model="capsTooltip"
            content="Caps lock is On"
            placement="right"
            manual
          >
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="手机号"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
              <span class="show-pwd">
                <el-button
                  type="primary"
                  size="mini"
                  :loading="sendboolean"
                  @click="sendPhone"
                >发送验证码</el-button>
              </span>
            </el-form-item>
          </el-tooltip>
          <el-tooltip
            v-model="capsTooltip"
            content="Caps lock is On"
            placement="right"
            manual
          >
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="验证码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span>
            </el-form-item>
          </el-tooltip>
          <br>
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 35px"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-tab-pane>
        <el-tab-pane label="微信登录" name="second">
          <div id="weixin" style="width: 300px; text-align: center" />
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import SocialSign from "./components/SocialSignin";
import qs from "qs";
import $ from "jquery";

export default {
  name: "Login",
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        // callback(new Error(''))
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("验证码为六位"));
      } else {
        callback();
      }
    };
    return {
      sendboolean: false,
      loginForm: {
        username: "",
        password: ""
      },
      trueForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      activeName: "first"
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {
    this.wxlogin();
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {},
  methods: {
    sendPhone() {
      this.sendboolean = true;
      var obj = {};
      obj.phonenum = this.loginForm.username;
      this.$axios
        .post(
          "http://localhost:8081/web/CCourse/RegUserSendvcode",
          this.$qs.stringify(obj),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((res) => {
          this.trueForm.username = res.data.phonenum;
          this.trueForm.password = res.data.code;
        });
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= "a" && key <= "z") ||
          (!shiftKey && key >= "A" && key <= "Z")
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      if (
        this.loginForm.username == "admin" &&
        this.loginForm.password == "fcbd8888"
      ) {
        localStorage.setItem("myphone", "admin");
        this.$axios
          .post("https://www.facebodyfitness.com/web/new/getStoreIdAll", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          })
          .then((res) => {
            var storeid = "";
            for (var i = 0; i < res.data.length; i++) {
              storeid += res.data[i].id + ",";
            }
            localStorage.setItem("storeid", storeid);
            localStorage.setItem("userid", "系统管理员");
            localStorage.setItem("username", "系统管理员");
            localStorage.setItem(
              "resurl",
              "https://res.facebodyfitness.com/onlinevideo/img/9fd7820d-bcb1-46d9-a1c1-5b0c6879d231.png"
            );
          });
        this.loading = true;
        this.loginForm.username = "admin";
        this.$store
          .dispatch("user/login", this.loginForm)
          .then(() => {
            this.$router.push({
              path: this.redirect || "/",
              query: this.otherQuery
            });
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else if (
        this.trueForm.username == this.loginForm.username &&
        this.trueForm.password == this.loginForm.password
      ) {
        localStorage.setItem("myphone", this.trueForm.username);
        var phonesearch = {};
        phonesearch.tel = this.loginForm.username;
        this.$axios
          .post(
            "https://www.facebodyfitness.com/web/new/login",
            this.$qs.stringify(phonesearch),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
          .then((res) => {
            console.log(res)
            localStorage.setItem("roleid", res.data[0].roleid);
            // this.$axios
            //   .post("https://www.facebodyfitness.com/hi/main?hi=24CQRLLNGW4R", {
            //     headers: {
            //       "Content-Type": "application/x-www-form-urlencoded",
            //     },
            //   })
            //   .then((res) => {
                localStorage.setItem("storenumber", 7);
              // });
            if (res.data.length > 0) {
              localStorage.setItem("username", res.data[0].name);
              localStorage.setItem("userid", res.data[0].userid);
              localStorage.setItem("storeid", res.data[0].storeid);
              localStorage.setItem("resurl", res.data[0].resurl);
              localStorage.setItem("createdon", res.data[0].createdon);
              this.loading = true;
              this.loginForm.username = "admin";
              this.$store
                .dispatch("user/login", this.loginForm)
                .then(() => {
                  this.$router.push({
                    path: this.redirect || "/",
                    query: this.otherQuery
                  });
                  this.loading = false;
                })
                .catch(() => {
                  this.loading = false;
                });
            } else {
              this.$message.error("无权限进入！");
            }
          });
      } else {
        this.$message.error("密码错误，请重新登录");
        return false;
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    wxlogin() {
      const s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js";
      const wxElement = document.body.appendChild(s);
      wxElement.onload = function () {
        var obj = new WxLogin({
          id: "weixin", // 需要显示的容器id
          appid: "wx1aac047a48fb2c68", // 公众号appid wx*******
          scope: "snsapi_login", // 网页默认即可
          redirect_uri:
            "https://www.facebodyfitness.com/fbadmin/#/login?redirect=%2Fafcbdindex", // 授权成功后回调的url
          state: Math.ceil(Math.random() * 1000), // 可设置为简单的随机数加session用来校验
          style: "black" // 提供"black"、"white"可选。二维码的样式
        });
      };
      const code = qs.parse(window.location.search.substr(1)).code;
      if (code != null && code != "") {
        var data = {};
        data.code = code;

        this.$axios
          .post(
            "http://localhost:8081/web/wxremind/wxLogin",
            this.$qs.stringify(data),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
          )
          .then((res) => {
            if (res.data.name != "" && res.data.name != null) {
              // this.$axios
              //   .post(
              //     "https://www.facebodyfitness.com/hi/main?hi=24CQRLLNGW4R",
              //     {
              //       headers: {
              //         "Content-Type": "application/x-www-form-urlencoded"
              //       }
              //     }
              //   )
              //   .then((res) => {
              //     localStorage.setItem("storenumber", res.data.rows[0].count);
              //   });
              localStorage.setItem("username", res.data.name);
              localStorage.setItem("userid", res.data.userid);
              localStorage.setItem("storeid", res.data.storeid);
              localStorage.setItem("resurl", res.data.resurl);
              localStorage.setItem("createdon", res.data.createdon);
              localStorage.setItem("roleid", res.data.roleid);
              this.loading = true;
              this.loginForm.username = "admin";
              this.$store
                .dispatch("user/login", this.loginForm)
                .then(() => {
                  this.$router.push({
                    path: this.redirect || "/",
                    query: this.otherQuery
                  });
                  this.loading = false;
                })
                .catch(() => {
                  this.loading = false;
                });
            } else {
              this.$message.error("无权限进入！");
            }
          });
      }
    }
  }
};
</script>

<style lang="scss">
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #e8f0fe;
    border-radius: 5px;
    color: #454545;
  }
  .el-tabs__item {
    font-size: 16px !important;
    width: 150px !important;
    text-align: center;
    font-weight: bolder;
    background: #fdfdfd;
    border-radius: 5px;
  }
  .el-tabs {
    background: #fdfdfd;
    width: 300px;
    height: 440px;
    border-radius: 15px;
    float: right;
    margin-right: 400px;
    margin-top: -20px;
    opacity: 0.85;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url("https://www.facebodyfitness.com/images-14/oyzq.jpg");
  background-repeat: no-repeat;
  background-size: 1920px 1080px;

  overflow: hidden;

  // .login-form {
  //   position: relative;
  //   width: 520px;
  //   max-width: 100%;
  //   padding: 160px 35px 0;
  //   margin: 0 auto;
  //   overflow: hidden;
  // }

  .tips {
    font-size: 16px;
    color: #fff;
    margin-bottom: 10px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
