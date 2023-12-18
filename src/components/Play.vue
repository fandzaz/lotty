<template>
  <div v-if="dataAward">
  
    <div class="header bottom-nav">
      <div class="container">
        <div class="row">
          <div class="col-1 pr-0 mt-2">
            <img src="./../assets/award.png" width="60px" alt="" srcset="">
          </div>
          <div class="col-7 pl-0 mt-2">
            <h4 class="header-font"><b>{{dataAward.name}} จำนวนรางวัล {{dataAward.amount}} รางวัล</b> </h4>
            <span class="text-laa">จำนวนผู้มีสิทธ์ลุ้นรับรางวัล {{oldUser.length}} คน</span>
            
          </div>
          <div class="col-4 text-center">
            <h3 class="text-complete rounded shadow-lg mt-1" v-if="dataAward.status"><i class="fa fa-check-circle-o" aria-hidden="true"></i> เสร็จสิ้นแล้ว</h3>
           
            <!-- <a  @click="toExcel(dataAward.name,dataAward.amount,dataAward.lucky)" href="javascript:void(0)"> -->
                  <download-excel
                    ref="myBtn"
                    v-if="dataAward.status"
                    class   = "btn btn-link"
                    :data   = "json_data"
                    :title = 'title'
                    :fields = "json_fields"
                    :name    = "dataAward.name+'.xls'">
                     <img src="./../assets/excel.png" width="30px;" alt="" srcset=""> {{dataAward.name}}
                    </download-excel>  
                    <!-- {{n.name}} -->
            <!-- </a>  -->
            <!-- <a class="mt-5 ml-2" v-if="dataAward.status" href="javascript:void(0)" @click="report()"> <small class="ml-1"><i class="fa fa-file-text" aria-hidden="true"></i> รายงานผู้ที่ได้รับรางวัล</small> </a> -->
          </div>
        </div>
  
      </div>
    </div>
  
  
    <div class="container mt-1 mb-1 ">
  
  
      <div class="row mt-3 ">
        <div class="col-12 col-xl-4 ">
          <div class="sticky-top pt-3">
  
            <div class="box-shadow-me rounded bg-white box  nav-bottom">
              <div class="card-header bg-primary">
                <div class="text-center mb-2">
                  <img class="mb-2" src="./../assets/gaming.png" width="45px" alt="" srcset="">
                  <h4 class="text-white"><b>หมายเลขที่ออก</b></h4>
  
                  <!-- <div  v-show="fast == 3" class="odometer mt-3 fast " ></div>
                    <div  v-show="fast == 2" class="odometer mt-3 normal " ></div>
                    <div  v-show="fast == 1" class="odometer mt-3 slow " ></div> -->
                  <Slotnumber :speed="fast" :list="listInvatory" @complete="complete" @lucky="update"></Slotnumber>
  
                </div>
  
              </div>
              <div class="card-body">
                <div class="option p-3 rounded  shadow-lg">
                  <h5 class="text-laa mb-3"><i class="fa fa-clock-o fa-lg" aria-hidden="true"></i> ระดับความเร็ว</h5>
                  
                  <div class="form-check form-check-inline mr-5">
                    <input :disabled="statusPlay || dataAward.status" v-model="fast" :value="1"  class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1">
                    <label class="form-check-label" for="inlineRadio1"><b> ช้า</b>  </label>
                  </div>
                  <div class="form-check form-check-inline mr-5">
                    <input :disabled="statusPlay || dataAward.status" v-model="fast" :value="2"  class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2">
                    <label class="form-check-label" for="inlineRadio2"><b> ปานปลาง</b> </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input :disabled="statusPlay || dataAward.status" v-model="fast" :value="3"  class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3">
                    <label class="form-check-label" for="inlineRadio3"><b> เร็ว</b> </label>
                  </div>
                 
                  <hr>
                  <a class="mt-5"  data-toggle="collapse" href="#collapseExample"><small><i class="fa fa-cog fa-lg" aria-hidden="true"></i> การตั้งค่า</small> </a>
                  <div class="collapse mt-1" id="collapseExample">
                    <div class="card card-body">
                        <small class="ml-2"> <input class="form-check-input" v-model="isAuto" @change="setDownloadAuto" type="checkbox" value="" id="defaultCheck1">ดาวน์โหลดรายงานอัตโนมัติหลังจากบันทึก</small> 
                    </div>
                  </div>
                </div>
  
                
              </div>
              <div class="card-footer">
                <button :disabled="statusPlay || listUser.length != 0 || dataAward.status" class="btn btn-dark btn-block btn-lg mt-3 shadow-lg" @click="startRandom(dataAward)"> เริ่ม</button>
                <button v-if="success && !dataAward.status" @click="saveComplete" class="btn btn-primary btn-block btn-lg mt-3 shadow-lg" > บันทึก</button>
              </div>
            </div>
          </div>
  
        </div>
        <div class="col-xl-8 pt-3" id="print">
          <h1 class="text-laa " v-if="oldUser.length == 0"><span >ไม่มีข้อมูลผู้เข้าร่วมรับรางวัล</span> </h1>
          <small class="text-blue" v-if="oldUser.length == 0"><i class="fa fa-info-circle" aria-hidden="true"></i> คลิกปุ่มอัพโหลดข้อมูลที่อยู่ด้านบนเพื่อเพิ่มรายการ</small>
          <div class="box-shadow-me rounded bg-white  " v-if="listUser.length != 0">
  
            <table class="table table-borderless table-striped  rounded ">
  
              <tbody>
                <tr v-for="(u,index) in listUser" :key="index" :class="'testx '+u.PERSONID">
                  <td><img src="./../assets/award.png" width="30px" v-if="dataAward.status"> {{index + 1}}.</td>
                  <td>{{u.PERSONID}}</td>
                  
                  <td><b>{{u.M_FNAME}}</b></td>
                  <td><b>{{u.M_LNAME}}</b></td>
                  <td class="text-center">{{u.DPNAME}}</td>
                  <!-- <td>{{u.privilege}}</td> -->
                </tr>
  
              </tbody>
            </table>
          </div>
  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // var pdfMake = require("./../assets/pdfmake.min.js");
  // var pdfFonts = require("./../assets/vfs_fonts.js")
  import $ from 'jquery';
  
 
  
  import './../assets/pdfmake.min.js'
  import pdfFonts from './../assets/vfs_fonts.js'
  import Slotnumber from './../components/Slotnumber.vue';
  
  
  import Vue from 'vue';
  import JsonExcel from 'vue-json-excel'

  import vueXlsxTable from 'vue-xlsx-table'
  import VueSweetalert2 from 'vue-sweetalert2';
  import VueLocalStorage from 'vue-localstorage'
  Vue.component('downloadExcel', JsonExcel)
  Vue.use(VueSweetalert2);
  Vue.use(VueLocalStorage)
  Vue.use(vueXlsxTable, {
    rABS: true
  })
  
  export default {
    name: 'Play',
    components: {
      Slotnumber
    },
    data() {
      return {
        title:[],
        json_fields: {
          'MEMBERID': 'MEMBERID',
          'PERSONID': 'PERSONID',
          'M_FNAME': 'M_FNAME',
          'M_LNAME' :'M_LNAME',
          'DPCODE' :'DPCODE',
          'DPNAME':'DPNAME',
        },
        json_data: [],
        json_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
        ],
        listUser: [],
        oldUser:[],
        dataAward: null,
        isAuto:false,
        listUserTemp: [],
        listInvatory: [],
        statusPlay: false,
        success:false,
        oldId: 0,
        isSave:false,
        fast: 3,
        fastClass: 'fast',
       
        i: 0,
        option:null,
        show: false,
        gift: [{
            id: 'A001',
            name: 'ข้าวโพด',
            amount: 100
          },
          {
            id: 'A002',
            name: 'PS4',
            amount: 100
          },
        ]
      }
  
    },
    
    beforeRouteLeave (to, from, next) {
      
      if(this.statusPlay || (this.success && !this.isSave)){
        const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        if (answer) {
          next()
        } else {
          next(false)
        }
      }else{
        next()
      }
      
    },
    mounted() {
  
      pdfMake.fonts = {
        THSarabunNew: {
          normal: 'THSarabunNew.ttf',
          bold: 'THSarabunNew-Bold.ttf',
          italics: 'THSarabunNew-Italic.ttf',
          bolditalics: 'THSarabunNew-BoldItalic.ttf'
        },
        Roboto: {
          normal: 'Roboto-Regular.ttf',
          bold: 'Roboto-Medium.ttf',
          italics: 'Roboto-Italic.ttf',
          bolditalics: 'Roboto-MediumItalic.ttf'
        }
      }
    },
    created() {
      var auto = Vue.localStorage.get('auto');
      
      if(auto){
        if(auto == 'true'){
           this.isAuto = true;
        }else{
          this.isAuto = false;
        }
       
      }
     
      var id = this.$route.params.id;
      var data = JSON.parse(Vue.localStorage.get('award'));
     
      if (data) {
        if (data.filter(d => d.id == id)[0]) {
          this.dataAward = data.filter(d => d.id == id)[0];
           this.title = ['รายชื่อผู้ที่ได้รับรางวัล',"รางวัล "+this.dataAward.name,"จำนวน "+this.dataAward.amount]
          if(this.dataAward.status){
           
            this.dataAward.lucky.forEach(lk => {
              this.json_data.push(lk);
            })
          }
          this.getUserComeBack();
        }else{
          this.$router.push('/')
        }
         
      } else {
        this.$router.push('/users')

      }
      
      
      
    },
    
    methods: {
      save() {
        Vue.localStorage.set('user', JSON.stringify(this.listUser))
      },
      setExcel(){
        
        this.listUser.forEach((lu, index) => {
            this.json_data.push(lu);
        })
      },
      update(user) {
        this.listUser.push(user);
        setTimeout(() => {
          $('html, body').animate({
            scrollTop: $('.' + user.PERSONID).offset().top - 300
          }, 100, () => {
            $('.' + user.PERSONID).addClass('blink_me')
            setTimeout(() => {
              $('.' + user.PERSONID).removeClass('blink_me')
            }, 1000)
          });
        })
      },
      setDownloadAuto(){
        Vue.localStorage.set('auto',this.isAuto);
        // var option = Vue.localStorage.get('option')
        // if(option){
        //   this.option = JSON.parse(option);
        //   this.option.autoDownload = true;
        // }
      },
      complete() {
        
        this.statusPlay = false;
        this.success = true;
      },
      saveComplete(){
        this.$swal({
          title: 'ต้องการบันทึกข้อมูล ?',
          text: "หลังจากทำการบันทึกข้อมูลแล้วระบบจะทำการหักสิทธ์ของผู้เข้าร่วม และ ระบบจะสร้างรายงานอัตโนมัติ",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ยืนยันการบันทึก'
        }).then((result) => {
          if (result.value) {
            this.isSave = true;
            this.disPrivilege()
            this.dataAward.status = true;
            this.setExcel();
            if(this.isAuto){
              setTimeout(() => {
                this.$refs.myBtn.$el.click()

              })
              
              setTimeout(() => {
                
                this.$router.push('/')
              },2000)
              
               //this.report('download');
            }
           
            
          }
        })
      },
      getUserComeBack() {
        var data = Vue.localStorage.get('user')
        if(data){
           this.oldUser = JSON.parse(data);
           this.oldUser = this.oldUser.filter(lu => lu.privilege != 0);
        }
        if(this.dataAward.status){
          this.listUser = this.dataAward.lucky;
        }else{
           
          // if (data) {
          //   this.listUser = JSON.parse(data);
           
          //   this.listUser = this.listUser.filter(lu => lu.privilege != 0);
          //   this.listUserTemp = this.listUser;
           
          // }
        }
       
      },
      disPrivilege(){
        var data  = Vue.localStorage.get('user')
        if(data){
          var listUser = JSON.parse(data);
          this.listUser.forEach(lu => {
            var key = listUser.map(lu => lu.PERSONID).indexOf(lu.PERSONID);
            if(key != -1){
              listUser[key].privilege -= 1;
              listUser[key].inventory.push({id:this.dataAward.id,name:this.dataAward.name});
              //console.log(listUser[key].privilege);
            }
          })
          Vue.localStorage.set('user',JSON.stringify(listUser));
          //ทำรายงานและจบรางวัล
          var data = Vue.localStorage.get('award');
          if(data){
            var listAward = JSON.parse(data);
            var key = listAward.map(aw => aw.id).indexOf(this.dataAward.id);
            if(key != -1){
              listAward[key].lucky = this.listUser;
              listAward[key].status = true;
            }
            Vue.localStorage.set('award',JSON.stringify(listAward));
          }

        }
        

      },
      report(mode = '') {
  
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        var docDefinition = {
          
          content: [{
            columns: [{
                width: '*',
                text: ''
              },
              {
                width: 'auto',
                text: 'รายชื่อผู้ที่ได้รับรางวัล '+this.dataAward.name+' จำนวนรางวัล '+this.dataAward.amount+' รางวัล',
                fontSize: 24,
                bold: true,
                style: "lineSpacing"
  
              },
              {
                width: '*',
                text: ''
              },
            ]
          }, ],
          styles: {
            'lineSpacing': {
              margin: [0, 0, 0, 20] //change number 6 to increase nspace
            }
          },
          defaultStyle: {
            font: 'THSarabunNew'
          }
        };
        var columns = [];
        this.listUser.forEach((lu, index) => {
          
          docDefinition.content.push({
            columns: [{
                width: 10,
                text: ''
              },
              {
                width: 50,
                text: (index + 1) + '. ',
                fontSize: 20
              },
              {
                width: 130,
                text: lu.MEMBERID,
                fontSize: 20
              },
              {
                width: 100,
                text: lu.PERSONID,
                fontSize: 20
              },
              {
                width: 'auto',
                text: lu.M_FNAME + '  ' + lu.M_LNAME,
                fontSize: 20
              },
              {
                width: 10,
                text: ''
              },
            ],
            columnGap: 10
          })
        })
        
       
        if(mode == 'download'){
           pdfMake.createPdf(docDefinition).download(this.dataAward.name);
        }else{
          pdfMake.createPdf(docDefinition).open()
        }
        
       
  
      },
      
      
      startRandom(gift) {
        this.success = false;
        this.statusPlay = true;
        this.getUserComeBack();
  
        this.listInvatory = [];
  
        this.listUserTemp = this.oldUser;
        this.listUser = [];
  
        for (let index = 1; index <= gift.amount; index++) {
  
          var indexRandom = Math.floor(Math.random() * this.listUserTemp.length);
          var user = this.listUserTemp[indexRandom];
         
          this.listInvatory.push(user);
          this.listUserTemp.splice(indexRandom, 1);
  
  
        }
  
  
        this.i = 0;
  
  
      },
  
      handleSelectedFile(convertedData) {
        this.uploadStatus = true;
        this.listUser = convertedData.body;
  
        this.listUser = this.listUser.filter(u => ((+u.SUM) / 100) >= 1);
        this.listUser.forEach(u => {
          u.privilege = Math.floor((+u.SUM) / 100);
        })
  
      }
    }
  }
</script>

<style>
  .header-font {
    font-family: 'Google Sans', Roboto, Arial, sans-serif;
    font-weight: 400;
    line-height: 2.25rem;
    color: #202124;
    width: auto;
  }
  .text-complete{
    width: 100%;
    /* background-color: #00E676; */
    color: #00C853;
    font-weight: 400;
    
  }
  
  

</style>

