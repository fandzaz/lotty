<template>
    <div >
        <div class="header ">
            <div class="container">
                <div class="row">
                    <div class="col-1">
                        <img src="./../assets/reward.png" width="60px" alt="" srcset="">
                    </div>
                    <div class="col-8">
                        <h4 class="header-font"> 
                            
                            <b>รายชื่อของรางวัลทั้งหมด {{items.length}} รายการ </b>
                            
                        </h4>
                        <span class="text-laa">จำนวนรางวัลทั้งหมดทุกรายการ {{sumAward}} รางวัล คงเหลือ {{sumAmount}} รางวัล</span> 
                       
                    </div>
                    <div class="col-3">
                       <button type="button" class="btn btn-primary btn-lg box-shadow mt-3" data-toggle="modal" data-target="#createAward"><i class="fa fa-gift fa-lg" aria-hidden="true"></i> รางวัล</button>
                    </div>
                </div>
                
                  
            </div>
        </div>
        <div class="container pb-3">
            <h1 class="text-laa mt-5" v-if="items.length == 0"><span >ไม่มีข้อมูลรางวัล</span> </h1>
            <small class="text-blue" v-if="items.length == 0"><i class="fa fa-info-circle" aria-hidden="true"></i> คลิกปุ่มเพิ่มของรางวัลเพื่อเพิ่มรายการ</small>
            <div class="row" v-if="items.length != 0">
                <div class="col-3 mt-5" v-for="(n,key) in items" :key="key">
                    <div class="shadow-lg box-shadow-me bg-white rounded">
                        <div class="card-body box-center rounded ">
                            
                            <img src="./../assets/reward2.png"  width="80px" alt="" srcset="">
                            <div class="row mt-3">
                                <div class="col-2"></div>
                                <div class="col-8">
                                    <div v-if="!n.status" class="reward text-center box-shadow" ><b><i class="fa fa-gift" aria-hidden="true"></i> {{n.lucky.length}} / {{n.amount}} รางวัล</b></div>
                                    <div v-if="n.status" class="reward-complete text-center box-shadow" ><b><i class="fa fa-check-circle-o" aria-hidden="true"></i> เสร็จสิ้นแล้ว</b></div>
                                </div>
                                <div class="col-2"></div>
                            </div>
                           
                             <!-- <div class="top-right"><b>100 รางวัล</b> </div> -->
                        </div>
                        <div class="card-footer text-center bg-white">
                           <img src="./../assets/reward1.png" class="mr-1" width="15px" alt="" srcset=""><router-link  class="text-laa" :to="{ name: 'play', params: { id: n.id }}" ><b>{{n.name}}</b></router-link> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="createAward" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-laa" id="exampleModalCenterTitle"><img src="./../assets/reward.png" width="60px" alt="" srcset=""> เพิ่มรายการของรางวัล</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body option">
                    <div class="row">
                        <div class="col-8">
                            <input type="text" v-model="newItem.name"  :class="'form-control ' + (!newItem.name ? 'is-invalid':'is-valid')" id="staticEmail" placeholder="ชื่อของรางวัล">
                        </div>
                        <div class="col-4 pl-0">
                            <input type="text" @paste="onPaste" @keypress="isNumber()" v-model="newItem.amount" :class="'form-control '+ (newItem.amount == 0 || newItem.amount == null ? 'is-invalid':'is-valid')" id="staticEmail" placeholder="จำนวนรางวัล">
                        </div>
                        <div class="col-12 mt-2">
                            
                        </div>
                    </div>
                     <div class="box-shadow-me rounded bg-white mt-3 ">
                          <table class="table table-borderless bg-white rounded">
                       
                        <tbody>
                            <tr v-for="(n,key) in items" :key="key">
                            <td>{{key + 1}}.</td>
                            <td>
                                <i class="fa fa-check-circle-o fa-lg reward-text"  v-if="n.status" aria-hidden="true"></i>
                                <img src="./../assets/award.png" v-if="!n.status" width="25px" alt="" srcset=""> 
                                {{n.name}}
                            </td>
                             <td>จำนวน</td>
                            <td>{{n.lucky.length}} / {{n.amount}}</td>
                            <td v-if="n.lucky.length == 0" ><i style="color:red;cursor: pointer;" @click="deleteItem(n.id)" class="fa fa-trash fa-lg" aria-hidden="true"></i></td>
                        </tr>
                          
                        </tbody>
                    </table>
                     </div>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="insertItem">บันทึก</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    
                </div>
                </div>
            </div>
        </div>
      
    </div>
</template>
<script>
import Vue from "vue";
import VueLocalStorage from "vue-localstorage";
Vue.use(VueLocalStorage);
export default {
  data() {
    return {
      items: [],
      newItem: {
        name: "",
        amount: null,
      },
      sumAward: 0,
      sumAmount: 0,
    };
  },
  created() {
    var data = Vue.localStorage.get("award");
    if (data) {
      this.items = JSON.parse(Vue.localStorage.get("award"));
      this.$store.commit(
        "SET_REPORT",
        this.items.filter((it) => it.status).length
      );
      this.$store.commit(
        "SET_AWARD",
        this.items.filter((la) => !la.status).length
      );
      this.findSumAward();
    }
  },

  methods: {
    insertItem() {
      if (
        this.newItem.name &&
        (this.newItem.amount != 0 && this.newItem.amount)
      ) {
        var id =
          "A" +
          Math.floor(Math.random() * 10) +
          Math.floor(Math.random() * 10) +
          +Math.floor(Math.random() * 10) +
          +Math.floor(Math.random() * 10) +
          +Math.floor(Math.random() * 10) +
          new Date().getTime();
        this.items.push({
          id: id,
          name: this.newItem.name,
          amount: this.newItem.amount,
          lucky: [],
          status: false,
        });
        this.newItem.name = "";
        this.newItem.amount = "";
        this.findSumAward();
        this.$store.commit(
          "SET_AWARD",
          this.items.filter((la) => !la.status).length
        );
        Vue.localStorage.set("award", JSON.stringify(this.items));
      }
    },
    deleteItem(id) {
      var key = this.items.map((item) => item.id).indexOf(id);
      if (key != -1) {
        if (this.items[key].status) {
          this.$swal({
            title: "ต้องการลบ ?",
            text:
              "คุณกำลังจะลบรางวัลที่เสร็จสิ้นแล้ว หลังจากลบแล้วข้อมูลรายงานและสิทธิ์จะถูกนำกลับคืนไปยังผู้เข้าร่วมทัน",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.value) {
              this.restorePrivilege(this.items[key].id, this.items[key].lucky);
              this.items.splice(key, 1);
              this.$store.commit(
                "SET_AWARD",
                this.items.filter((la) => !la.status).length
              );
              this.$store.commit(
                "SET_REPORT",
                this.items.filter((it) => it.status).length
              );
              Vue.localStorage.set("award", JSON.stringify(this.items));
            }
          });
        } else {
          this.items.splice(key, 1);
          Vue.localStorage.set("award", JSON.stringify(this.items));
        }
      }
    },
    restorePrivilege(itemId, listLucky) {
      var data = Vue.localStorage.get("user");
      if (data) {
        var listUser = JSON.parse(data);
        listLucky.forEach((lc) => {
          var key = listUser.map((lu) => lu.PERSONID).indexOf(lc.PERSONID);
          if (key != -1) {
            listUser[key].privilege += 1;
            var keyItem = listUser[key].inventory
              .map((iv) => iv.id)
              .indexOf(itemId);
            if (keyItem != -1) {
              listUser[key].inventory.splice(keyItem, 1);
            }
          }
        });
        Vue.localStorage.set("user", JSON.stringify(listUser));
      }
    },
    findSumAward() {
      this.sumAward = this.items.reduce((acc, current) => {
        return +current.amount + acc;
      }, 0);
      var award = this.items.filter((it) => !it.status);

      this.sumAmount = award.reduce((acc, current) => {
        return +current.amount + acc;
      }, 0);
    },
    onPaste(evt) {
      evt.preventDefault();
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>


<style scoped>
.bg {
  background: url(./../assets/pattern.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.header {
  width: 100%;
  /* padding: 30px; */
  background-color: #ffffff;
}
.header-font {
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-weight: 400;
  line-height: 2.25rem;

  width: auto;
}
.card-body {
  position: relative;
  text-align: center;
  color: white;
}
.reward {
  width: 100%;
  border-radius: 10px;
  background-color: #2196f3;
  padding: 5px;
}
.reward-text {
  color: #00c853;
}
.reward-complete {
  width: 100%;
  border-radius: 10px;
  background-color: #00c853;
  padding: 5px;
}
.top-right {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #f44336;
  padding: 5px;
  padding-left: 5px;
  position: absolute;
  top: 20px;
  right: 0px;
}
.card-body {
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #fff3e0;
}
</style>
