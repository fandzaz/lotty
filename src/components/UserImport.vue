<template>
    <div >
        
         <div class="header bottom-nav">
            <div class="container">
                <div class="row">
                <div class="col-1 pr-0">
                    <img src="./../assets/award.png" width="60px" alt="" srcset="">
                </div>
                <div class="col-11 pl-0">
                    <h4 class="header-font"><b>รายชื่อผู้เข้าร่วมทั้งหมด</b> </h4>
                    <span class="text-laa">จำนวนผู้มีสิทธ์ลุ้นรับรางวัล {{listUser.length}} คน</span>
        
                </div>
                </div>
        
            </div>
        </div>
        <div class="container mt-3">
         <div class="box-shadow-me bg-white rounded nav-bottom">
          <div class="card-body">
              <h5 class="text-laa" >อัพโหลดข้อมูลผู้เข้าร่วมรับรางวัล</h5>
              <vue-xlsx-table @on-select-change="yourVueMethod"  @on-select-file="handleSelectedFile">คลิกอัพโหลด</vue-xlsx-table>
              <button type="button" class="xlsx-button ml-2" @click="save()" v-if="uploadStatus">Save</button>
              <!-- <hr>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
                </div>
              <span class="text-complete">กำลังนำข้อมูลเข้ากรุณารอสักครู่.....</span>  -->
          </div>
          
        </div>
        
        <h1 class="text-laa mt-5" v-if="listUser.length == 0"><span >ไม่มีข้อมูลผู้เข้าร่วมรับรางวัล</span> </h1>
        <small class="text-blue" v-if="listUser.length == 0"><i class="fa fa-info-circle" aria-hidden="true"></i> คลิกปุ่มอัพโหลดข้อมูลที่อยู่ด้านบนเพื่อเพิ่มรายการ</small>
        
        <div class="box-shadow-me rounded bg-white mt-3 " v-if="listUser.length != 0">
            <div class="card-body">
                <input class="form-control form-control-lg " v-model="search"  type="text" placeholder="ค้นหารหัสพนักงาน หรือ ชื่อ-นามสกุล">
                <!-- <i class="fa fa-search" aria-hidden="true"></i>
                <input class="form-control form-control-lg "  type="text" placeholder="ค้นหารหัสพนักงาน หรือ ชื่อ"> -->
            </div>
            
            <table class="table table-borderless table-striped  rounded text-center ">
                <thead>
                    <tr class="" >
                        <th scope="col" class="" >#</th>
                        <th scope="col">รหัสพนักงาน</th>
                        <th scope="col">ชื่อ</th>
                        <th scope="col">นามสกุล</th>
                         <th>หน่วยงาน</th>
                        <th scope="col">
                            ของรางวัล 
                            <a @click="filterOther('award')" href="javascript:void(0)">
                                <i class="fa fa-filter" aria-hidden="true"></i>
                            </a>
                            <i class="fa fa-arrow-up"   v-if="!filter[0]" aria-hidden="true"></i>
                            <i class="fa fa-arrow-down" v-if="filter[0]" aria-hidden="true"></i>
                        </th> 
                            
                        <th scope="col">
                            สิทธิ์เดิม
                            <a @click="filterOther('old_privilege')" href="javascript:void(0)">
                                <i class="fa fa-filter" aria-hidden="true"></i>
                            </a>
                            <i class="fa fa-arrow-up"   v-if="!filter[1]" aria-hidden="true"></i>
                            <i class="fa fa-arrow-down" v-if="filter[1]" aria-hidden="true"></i>
                        </th>
                        <th scope="col">
                            คงเหลือสิทธิ์
                            <a @click="filterOther('privilege')" href="javascript:void(0)">
                                <i class="fa fa-filter" aria-hidden="true"></i>
                            </a>
                            <i class="fa fa-arrow-up"   v-if="!filter[2]" aria-hidden="true"></i>
                            <i class="fa fa-arrow-down" v-if="filter[2]" aria-hidden="true"></i>
                        </th>
                    </tr>
                </thead>
              <tbody>
                <tr v-for="(u,index) in filteredList" :key="index" :class="'testx '+u.PERSONID">
                  <td>{{index + 1}}.</td>
                  <td>{{u.PERSONID}}</td>
                  <td>{{u.M_FNAME}}</td>
                  <td>{{u.M_LNAME}}</td>
                   <td>{{u.DPNAME}}</td>
                  
                  <td ><b><a href="javascript:void(0)" @click="setListAward(u.inventory)" data-toggle="modal" data-target="#showAward"  :title="u.listAward" >{{u.inventory.length}}</a></b></td>
                    <td class="text-success"><b>{{u.oldPrivilege}}</b></td>
                    <td v-if="u.oldPrivilege == u.privilege"><b>{{u.privilege}}</b></td>
                  <td v-if="u.oldPrivilege != u.privilege" class="text-danger" ><b><span><i class="fa fa-arrow-down"  aria-hidden="true"></i> </span> {{u.privilege}}</b> </td>
                 
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                     <td></td>
                    <td class="bg-primary text-white"><b>รวม {{sumAward}}</b> </td>
                    <td class="bg-success text-white"><b>รวม {{sumOldPrivilege}}</b> </td>
                    <td class="bg-danger text-white"><b>รวม {{sumPrivilege }}</b> </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
      
      <div class="modal fade" id="showAward" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-laa" id="exampleModalCenterTitle"><img src="./../assets/reward.png" width="60px" alt="" srcset=""> รายการรางวัล</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body option">
                    <h5 class="text-laa" v-if="listAwardUser.length == 0 ">ไม่มีรายการของรางวัล</h5>
                    <div class="box-shadow-me rounded bg-white mt-3 " v-if="listAwardUser.length != 0">
                          <table class="table table-borderless bg-white rounded">
                       
                        <tbody>
                            
                            <tr v-for="(n,key) in listAwardUser" :key="key">
                            <!-- <td>{{key + 1}}.</td> -->
                            <td>
                                <img src="./../assets/award.png"  width="25px" alt="" srcset=""> 
                                {{n.name}}
                            </td>
                             <td></td> 
                            <td></td>
                            
                        </tr>
                        
                          
                        </tbody>
                    </table>
                     </div>
                   
                </div>
                <div class="modal-footer">
                   
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    
                </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import Vue from "vue";
import vueXlsxTable from "vue-xlsx-table";
import VueLocalStorage from "vue-localstorage";

Vue.use(VueLocalStorage);
Vue.use(vueXlsxTable, { rABS: false });

export default {
  name: "Users",
  components: {},

  data() {
    return {
      listUser: [],
      listAwardUser: [],
      statusLoading: false,
      filter: [true, true, true],
      fill: { gradient: ["red", "green", "blue"] },
      sumAward: 0,
      sumPrivilege: 0,
      search: "",
      sumOldPrivilege: 0,
      uploadStatus: false,
    };
  },
  created() {
    this.getUserComeBack();
  },

  computed: {
    filteredList() {
      return this.listUser.filter((post) => {
        return (
          post.fullname.toLowerCase().includes(this.search.toLowerCase()) ||
          post.PERSONID.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    yourVueMethod() {
      console.log("xxx");
    },
    save() {
      this.$swal({
        title: "ต้องการบันทึก ?",
        text:
          "หลังจากทำการบันทึกแล้วรายการของรางวัลจะถูกรีเซ็ตให้เป็นค่าเริ่มต้นรวมถึงรายงานก็จะถูกลบด้วย",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "บันทึก",
      }).then((result) => {
        if (result.value) {
          this.clearAward();

          Vue.localStorage.set("user", JSON.stringify(this.listUser));
          this.uploadStatus = false;
          this.$store.commit("SET_USERS", this.listUser.length);
          this.$store.commit("SET_REPORT", 0);
          this.$swal("บันทึกข้อมูลสำเร็จ", "", "success");
        }
      });
    },
    filterOther(type) {
      switch (type) {
        case "award":
          if (this.filter[0]) {
            this.listUser.sort((a, b) => {
              return b.inventory.length - a.inventory.length;
            });
          } else {
            this.listUser.sort((a, b) => {
              return a.inventory.length - b.inventory.length;
            });
          }
          this.filter[0] = !this.filter[0];
          break;
        case "privilege":
          if (this.filter[2]) {
            this.listUser.sort((a, b) => {
              return b.privilege - a.privilege;
            });
          } else {
            this.listUser.sort((a, b) => {
              return a.privilege - b.privilege;
            });
          }
          this.filter[2] = !this.filter[2];
          break;
        case "old_privilege":
          if (this.filter[1]) {
            this.listUser.sort((a, b) => {
              return b.oldPrivilege - a.oldPrivilege;
            });
          } else {
            this.listUser.sort((a, b) => {
              return a.oldPrivilege - b.oldPrivilege;
            });
          }
          this.filter[1] = !this.filter[1];
          break;
        default:
          break;
      }
    },
    setListAward(list) {
      this.listAwardUser = list;
    },
    handleSelectedFile(convertedData) {
      console.log(this.statusLoading);
      try {
        this.uploadStatus = true;
        this.listUser = convertedData.body;

        // this.listUser = this.listUser.filter((u) => +u.GRANDTOTAL / 100 >= 1);

        this.listUser.forEach((u) => {
          u.privilege = 1;
          //  u.privilege = Math.floor(+u.GRANDTOTAL / 100);
          u.oldPrivilege = u.privilege;
          u.fullname = u.M_FNAME + " " + u.M_LNAME;
          u.inventory = [];
          u.inventory.forEach((iv) => {
            u.listAward += iv + "</br>";
          });
        });
      } catch (e) {
        console.log(e);
      }
    },
    clearAward() {
      var data = Vue.localStorage.get("award");
      if (data) {
        var listAward = JSON.parse(data);
        listAward.forEach((la) => {
          la.status = false;
          la.lucky = [];
        });
        Vue.localStorage.set("award", JSON.stringify(listAward));
      }
    },
    sumValue() {
      var data = Vue.localStorage.get("user");
      if (data) {
        this.listUser = JSON.parse(data);

        this.sumAward = this.listUser.reduce((acc, lu) => {
          return lu.inventory.length + acc;
        }, 0);
        this.sumPrivilege = this.listUser.reduce((acc, lu) => {
          return lu.privilege + acc;
        }, 0);
        this.sumOldPrivilege = this.listUser.reduce((acc, lu) => {
          return lu.oldPrivilege + acc;
        }, 0);
      }
    },
    getUserComeBack() {
      var data = Vue.localStorage.get("user");
      if (data) {
        this.sumValue();
        this.listUser.forEach((u) => {
          u.listAward = "";
          u.inventory.forEach((iv) => {
            u.listAward += iv;
          });
        });
      }
    },
  },
};
</script>
<style scoped>
.tooltip-inner {
  white-space: pre-wrap;
}
.text-complete {
  width: 100%;
  /* background-color: #00E676; */
  color: #00c853;
  font-weight: 400;
}
.tooltip-inner {
  white-space: pre;
  max-width: none;
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: red;
  opacity: 1; /* Firefox */
}
.form-control {
  border-color: #2196f3 !important;
  border-width: 2px;
}
.form-control:focus {
  border-color: #2196f3;
  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.075), 0 0 10px #2196f3;
}
</style>
