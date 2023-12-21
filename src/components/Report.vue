<template>
    <div>
        <div class="header bottom-nav">
            <div class="container">
                <div class="row">
                    <div class="col-1 pr-0">
                        <img src="./../assets/report-icon.png" width="60px" alt="" srcset="">
                        <!-- <img src="./../assets/award.png" width="60px" alt="" srcset=""> -->
                    </div>
                    <div class="col-11 pl-0">
                        <h4 class="header-font"><b>รายงานผู้ที่ได้รับรางวัล</b> </h4>
                        <span class="text-laa">จำนวนรายงานทั้งหมด {{items.length}} รายงาน</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-5">
            <div class="box-shadow-me rounded bg-white mt-3 ">
                
                <table class="table table-borderless bg-white rounded">
                    <tbody>
                        <tr v-for="(n,key) in items" :key="key">
                        
                        <td >
                            
                             <download-excel
                                class   = "btn btn-link"
                                :data   = "n.lucky"
                                :title = "['รายชื่อผู้ที่ได้รับรางวัล','รางวัล '+n.name,'จำนวน '+n.amount]"
                                :fields = "json_fields"
                                :name    = "n.name+'.xls'">
                                <img src="./../assets/excel.png" width="30px;" alt="" srcset=""> 
                                {{n.name}}  
                            </download-excel>  
                               <!-- <a @click="toExcel(n.name,n.amount,n.lucky)" href="javascript:void(0)">
                                    
                                      
                                </a>  -->

                          
                            <!-- <i class="fa fa-file-text fa-lg" aria-hidden="true"></i> -->
                            <!-- <a href="javascript:void(0)" @click="toExcel(n.lucky)" class="ml-2">{{n.name}}</a> -->
                            <a href="javascript:void(0)" @click="report(n.name,n.amount,n.lucky)" class="ml-2">PDF FILE {{n.name}}</a>
                        </td>
                        
                       
                    </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import "./../assets/pdfmake.min.js";
import pdfFonts from "./../assets/vfs_fonts.js";
import VueLocalStorage from "vue-localstorage";
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);
Vue.use(VueLocalStorage);
export default {
  data() {
    return {
      title: [],
      items: [],
      json_fields: {
        MEMBERID: "MEMBERID",
        PERSONID: "PERSONID",
        M_FNAME: "M_FNAME",
        M_LNAME: "M_LNAME",
        DPCODE: "DPCODE",
        DPNAME: "DPNAME",
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  mounted() {
    pdfMake.fonts = {
      THSarabunNew: {
        normal: "THSarabunNew.ttf",
        bold: "THSarabunNew-Bold.ttf",
        italics: "THSarabunNew-Italic.ttf",
        bolditalics: "THSarabunNew-BoldItalic.ttf",
      },
      Roboto: {
        normal: "Roboto-Regular.ttf",
        bold: "Roboto-Medium.ttf",
        italics: "Roboto-Italic.ttf",
        bolditalics: "Roboto-MediumItalic.ttf",
      },
    };
  },
  created() {
    var data = Vue.localStorage.get("award");
    if (data) {
      this.items = JSON.parse(Vue.localStorage.get("award"));
      this.items = this.items.filter((it) => it.status);
    }
  },
  methods: {
    toExcel(name, amount, listuser) {
      this.title = [
        "รายชื่อผู้ที่ได้รับรางวัล",
        "รางวัล " + name,
        "จำนวน " + amount,
      ];
      listuser.forEach((lu, index) => {
        this.json_data.push(lu);
      });
    },
    report(name, amount, listuser) {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      var docDefinition = {
        content: [
          {
            columns: [
              {
                width: "*",
                text: "",
              },
              {
                width: "auto",
                text:
                  "รายชื่อผู้ที่ได้รับรางวัล " +
                  name +
                  " จำนวนรางวัล " +
                  amount +
                  " รางวัล",
                fontSize: 24,
                bold: true,
                style: "lineSpacing",
              },
              {
                width: "*",
                text: "",
              },
            ],
          },
        ],
        styles: {
          lineSpacing: {
            margin: [0, 0, 0, 20], //change number 6 to increase nspace
          },
        },
        defaultStyle: {
          font: "THSarabunNew",
        },
      };
      var columns = [];
      listuser.forEach((lu, index) => {
        docDefinition.content.push({
          columns: [
            {
              width: 10,
              text: "",
            },
            {
              width: 50,
              text: index + 1 + ". ",
              fontSize: 20,
            },
            {
              width: 130,
              text: lu.MEMBERID,
              fontSize: 20,
            },
            {
              width: 100,
              text: lu.PERSONID,
              fontSize: 20,
            },
            {
              width: "auto",
              text: lu.M_FNAME + "  " + lu.M_LNAME,
              fontSize: 20,
            },
            {
              width: 10,
              text: "",
            },
          ],
          columnGap: 10,
        });
      });
      pdfMake.createPdf(docDefinition).open();
    },
  },
};
</script>
