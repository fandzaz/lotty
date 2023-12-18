<template>
  <div class="text-center">
    <div class="box-slot">
       <div class="row">
          <div class="col-3 pr-0 ">
            <div class="slot border-first border  ">
              {{n1}}
             
            </div>
          </div>
          <div class="col-2 pl-0 pr-0 ">
            <div class="slot border"> {{n2}}</div>
          </div>
          <div class="col-2 pl-0 pr-0 ">
            <div class="slot border"> {{n3}}</div>
          </div>
          <div class="col-2 pl-0 pr-0 ">
            <div class="slot border"> {{n4}}</div>
          </div>
          <div class="col-3 pl-0  ">
            <div class="slot border border-last"> {{n5}}</div>
          </div>
        </div>
    </div>
   
   
  
   
  </div>
   
    
</template>
<script>
import $ from 'jquery';
export default {
  name: 'Slotnumber',
  props: {
    list:Array,
    speed:Number
  },
  data(){
    return {
       show: true,
       n1:0,
       n2:0,
       n3:0,
       n4:0,
       n5:0,
       //speed:3,
       
       round:0,
       time:null
    }
  },
  watch:{
			list(){
        this.round = 0;
        this.startAnimation(this.list[this.round].PERSONID);
      },
      speed(){
        console.log(this.speed);
      }
	},
  created(){

      //this.startAnimation(this.list[this.round].PERSONID);
  },
  methods:{
   startAnimation(value){
     var ms = 0;
     var count = 0;
     switch (this.speed) {
       case 3:
         //ms = 500;
         count = 50;
         break;
      case 2 :
          ms = 100;
          count = 25;
          break;
      case 1 :
          ms = 100;
          count = 50;
       default:
         break;
     }
     var i = 0;
     this.time = setInterval(() => {
       i++;
       this.n1 = Math.floor(Math.random() * 10);
       this.n2 = Math.floor(Math.random() * 10);
       this.n3 = Math.floor(Math.random() * 10);
       this.n4 = Math.floor(Math.random() * 10);
       this.n5 = Math.floor(Math.random() * 10);
       
       if(count == i){
         this.n1 = value[0]
         this.n2 = value[1]
         this.n3 = value[2]
         this.n4 = value[3]
         this.n5 = value[4]
         
         clearInterval(this.time);
         if(this.round <= this.list.length - 1){
           this.$emit('lucky',this.list[this.round] );
           this.round++;
           
           setTimeout(() => {
             if(this.list[this.round]){
               this.startAnimation(this.list[this.round].PERSONID)
             }else{
               this.$emit('complete');
             }
           },1000)
          
         }
         
       }

     },ms)
   }
    
  }
}
</script>
<style >

.box-slot{
  border-radius: 0.34em;
    font-family: "Arimo", monospace;
    padding: 0.15em;
   font-weight: bolder;
    color: #F44336;
    padding: 20px;
    
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
   
}

.border-first{
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.border-last{
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.spin{
  animation: blinker 1s linear infinite;
}
.slot{
  
  
  width: 100%;
  
   

  font-size: 60px;
  background-color: #FFFFFF;
}
div.slide-up {
  
  overflow:hidden;
}
div.slide-up p {
  animation: 10s slide-up;
  margin-top:0%;
}

@keyframes slide-up {
  from {
    margin-top: 100%;
    height: 300%; 
  }

  to {
    margin-top: 0%;
    height: 100%;
  }
}
</style>





