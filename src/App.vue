/* eslint-disable */
<template>

  <div id="app">
    
    <nav class="navbar  navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><img src="./assets/gaming.png"  width="60px" alt="" srcset="">  </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link class="btn btn-outline-light btn-block btn-lg " to="/"><b><i class="fa fa-gift fa-lg" aria-hidden="true"></i> ของรางวัล <span class="badge badge-pill badge-danger box-shadow-me">{{award}}</span> </b></router-link>
             
            </li>
            <li class="nav-item">
              <router-link class="btn btn-outline-light btn-block btn-lg " to="/users"><b><i class="fa fa-users fa-lg" aria-hidden="true"></i> รายชื่อผู้เข้าร่วม <span class="badge badge-pill badge-danger box-shadow-me">{{users}}</span></b></router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-outline-light btn-block btn-lg " to="/report"><b><i class="fa fa-file-text fa-lg" aria-hidden="true"></i> รายงานทั้งหมด <span class="badge badge-pill badge-danger box-shadow-me">{{report}}</span></b></router-link>
            </li>
          </ul>
         
        </div>
      </div>
        

      
      </nav>
      <div class="line-nav shadow-lg"></div>
      <router-view></router-view>
      
   <br>
   
  </div>
</template>


<script>
import $ from "jquery";

import { mapGetters } from "vuex";
import Vue from "vue";
import vueXlsxTable from "vue-xlsx-table";

import Slotnumber from "./components/Slotnumber.vue";

import VueLocalStorage from "vue-localstorage";
Vue.use(VueLocalStorage);
Vue.use(vueXlsxTable, { rABS: true });

export default {
  name: "app",
  components: {
    Slotnumber,
  },
  computed: {
    ...mapGetters(["award", "report", "users"]),
  },
  data() {
    return {
      listUser: 0,
      listAward: 0,
      listReport: 0,
    };
  },

  created() {
    this.getUserComeBack();
    this.getAwardAndReport();
  },
  methods: {
    save() {
      Vue.localStorage.set("user", JSON.stringify(this.listUser));
    },
    getUserComeBack() {
      var data = Vue.localStorage.get("user");
      if (data) {
        var listUser = JSON.parse(data);
        this.$store.commit("SET_USERS", listUser.length);
        this.listUser = listUser.length;
      }
    },
    getAwardAndReport() {
      var data = Vue.localStorage.get("award");
      if (data) {
        var listAward = JSON.parse(data);

        this.$store.commit(
          "SET_AWARD",
          listAward.filter((la) => !la.status).length
        );
        var report = listAward.filter((la) => la.status).length;
        this.$store.commit("SET_REPORT", report);
      }
    },
  },
};
</script>

<style>
body,
html {
  background-color: #eceff1;
  padding-bottom: 10px;
  height: 100%;
}
.header {
  width: 100%;
  padding: 30px;
  background-color: #ffffff;
}
.router-link-exact-active {
  background-color: #ffffff;
  color: #000000;
}
.navbar-nav > li {
  padding-left: 10px;
  padding-right: 10px;
}
.line-nav {
  width: 100%;
  background-color: #2196f3;
  padding: 5px;
}
.text-laa {
  color: grey;
}
.text-blue {
  color: #2196f3;
}
.text-web {
  color: #616161;
  font-weight: bolder;
}
.odometer {
  width: 100%;
  font-size: 60px;
}
.option {
  background: #eeeeee;
}
.box-shadow-me {
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 1px 0 rgba(0, 0, 0, 0.19);
}

.box {
  width: 100%;
}
.box-shadow {
  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.075), 0 0 10px #2196f3;
}
.box2 {
  top: 500px;
  width: 25%;
}
.blink_me {
  animation: blinker 1s linear infinite;
  color: #2196f3;
  font-weight: 600;
  /* font-size: 24px; */
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
.nav-bottom {
  border-bottom: 1px solid rgb(236, 239, 245);
}
.fadeOne-enter-active,
.fadeOne-leave-active {
  transition: all 0.5s ease-out;
}
.table-wrapper-scroll-y {
  display: block;
  max-height: 800px;
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.odometer.slow.odometer-animating-up .odometer-ribbon-inner,
.odometer.odometer-animating-down.odometer-animating .odometer-ribbon-inner {
  -webkit-transition-duration: 3s !important;
  -moz-transition-duration: 3s !important;
  -ms-transition-duration: 3s !important;
  -o-transition-duration: 3s !important;
  transition-duration: 3s !important;
}
.odometer.normal.odometer-animating-up .odometer-ribbon-inner,
.odometer.odometer-animating-down.odometer-animating .odometer-ribbon-inner {
  -webkit-transition-duration: 2s !important;
  -moz-transition-duration: 2s !important;
  -ms-transition-duration: 2s !important;
  -o-transition-duration: 2s !important;
  transition-duration: 2s !important;
}
.odometer.fast.odometer-animating-up .odometer-ribbon-inner,
.odometer.odometer-animating-down.odometer-animating .odometer-ribbon-inner {
  -webkit-transition-duration: 0.5s !important;
  -moz-transition-duration: 0.5s !important;
  -ms-transition-duration: 0.5s !important;
  -o-transition-duration: 0.5s !important;
  transition-duration: 0.5s !important;
}

@import "./assets/themes/odometer-theme-car.css";
@import "./assets/font-awesome-4.7.0/css/font-awesome.min.css";
@import "~bootstrap/dist/css/bootstrap.css";
</style>
