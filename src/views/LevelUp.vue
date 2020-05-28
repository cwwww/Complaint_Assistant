<template>
	<div class="iconRecive">
	  <!-- <div class="grass"></div> -->
	  
	  <div class="box">
	    <div class="imgBox">
			<div class="div-relative">
			 <img src="../assets/images/sanjiao1@2x.png" alt class="div-a" /></img>
			  <img src="../assets/images/sanjiao2@2x.png" alt class="div-b" /></img>
			  </div>
	    </div>
		 <!-- <img src="../assets/images/level15@2x.png" alt class="level" /></img> -->
	    <div class="title">
			<div class="text-relative">
			<div class="textNum">03</div>
			 <div class="textText">保险新手</div>
			  </div>
			<img src="../assets/images/level15@2x.png" alt class="level" /></img>
			<div class="wenzibox">
			<img src="../assets/images/congratulations@2x.png" alt class="wenzi" />
	      <span>您等级已提升至3级，并获得保险新手称号！</span>
	    </div>
	 
		</div>
		<div class="btn">
		  <div>继续</div>
		</div>
	  </div>
	</div>
	</template>
<script>
export default {

  props: ["url"],
  data() {
    return {
		show:true
	};
  }
};
</script>
<style lang="scss" scoped>
	
	
	.iconRecive {
	  height: 100vh;
	  display: flex;
	  background-color: #0B2733;
	  background-image: url(../assets/images/popbg.png);
	  background-size: 100% 100%;
	  background-repeat: no-repeat;
	  background-position: 0 100%;
	    justify-content:space-between; 
	  flex-direction: column;
	  .grass {
	    position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 99;
	    height: 100vh;
	    -webkit-filter: blur(5px);
	    -moz-filter: blur(5px);
	    -ms-filter: blur(5px);
	    -o-filter: blur(5px);
	    filter: blur(0.8446rem);
	    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);
	    background: inherit;
	  }
	  .box {
	    position: fixed;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 199;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    overflow: hidden;
		// animation:box 2s linear infinite;
		// animation-iteration-count:1;
	  }
	// @keyframes box{
		
	// 	0% {
	//           -webkit-transform: scale(0,0);
	//           transform: scale(0,0)
	//       }
	//       100% {
	//           -webkit-transform: scale(1,1);
	//           transform: scale(1,1)
	//       }
	  
	  
	  
	// }
	
	  .imgBox {
	    
	    display: flex;
	    flex-direction: column;
	    align-items: center;
		animation:div-relative 1s linear infinite;
		animation-iteration-count:1;
		.div-relative{
		position:relative;
		color:#000;
		width:500px;
		height:250px;
		
		} 
		@keyframes div-relative{
			 // 0% {
			 //    opacity: 0
			 //  }
			 //  100% {
			 //    opacity: 1
			 //  }
				
			  // 0%{-webkit-transform:skewY(0deg);}
			  // 20%{-webkit-transform:skewY(-12deg);}
			  // 40%{-webkit-transform:skewY(12deg);}
			  // 60%{-webkit-transform:skewY(-8deg);}
			  // 80%{-webkit-transform:skewY(8deg);}
			  // 100%{-webkit-transform:skewY(0deg);}
			  0%{-webkit-transform:rotate(0deg);
			  transform-origin:center top;
			  }
			  25%{-webkit-transform:rotate(45deg);
			   transform-origin:center top;
			  }
			  50%{-webkit-transform:rotate(0deg);
			   transform-origin:center top;
			  }
			  75%{-webkit-transform:rotate(-45deg);
			   transform-origin:center top;
			  }
			  100%{-webkit-transform:rotate(0deg);
			   transform-origin:center top;
			  }
		
		}
		.div-a{ 
		position:absolute;
		left:200px;
		top:0px;
		z-index:100;
		width:100px;
		height:300px
		}
		/* div背景色为红色 */ 
		.div-b{ 
			position:absolute;
			left:50px;
			top:0px;
			z-index:80;
			width:400px;
			height:300px
			} 
			
		/* 背景为黄色 */ 
		.div-c{
			position:absolute;
			left:150px;
			top:200px;
			z-index:70;
			width:100px;
			height:100px
			} 
	
		
		.light {
		  height: 300px;
		  animation:light 5s linear infinite;
		}
		 @keyframes light{
		  0%{-webkit-transform:rotate(0deg);}
		  25%{-webkit-transform:rotate(90deg);}
		  50%{-webkit-transform:rotate(180deg);}
		  75%{-webkit-transform:rotate(270deg);}
		  100%{-webkit-transform:rotate(360deg);}
		}
	 
	  }
	  .title {
		 
		align-items: center;
	   display: flex;
	    flex-direction: column;
	    text-align: center;
	    span {
	      color: rgb(255, 255, 255);
	      font-size: 15px;
	      font-weight: 600;
	    }
	    div {
	      margin-top: 10px;
	      display: flex;
	      align-items: center;
	      justify-content: center;
	      img {
	        height: 25px;
	        margin-right: 5px;
	      }
	    }
	  }
	  
	  .wenzibox{
		  align-items: center;
		  display: flex;
		  flex-direction: column;
		   text-align: center;
		   animation:wenzi 1s linear infinite;
		   animation-iteration-count:1;
		   span {
		     color: rgb(255, 255, 255);
		     font-size: 15px;
		     font-weight: 600;
		   }
	  }
	  .wenzi {
		margin-top: 15px;
	   height: 20px;
	   width: 35px;
	   margin-bottom: 15px;
	  
	  }
	  @keyframes wenzi{
	  	
	  	0% {
	            -webkit-transform: scale(0,0);
	            transform: scale(0,0)
	        }
	        100% {
	            -webkit-transform: scale(1,1);
	            transform: scale(1,1)
	        }
	  }
	  .level {
	    height: 200px;
		 width: 200px;
		 animation:level 0.7s linear infinite;
		 animation-iteration-count:1;
		 
	  }
	  @keyframes level{
	  	
	  	0% {
	            -webkit-transform: scale(0,0);
	            transform: scale(0,0)
	        }
	        100% {
	            -webkit-transform: scale(1,1);
	            transform: scale(1,1)
	        }
	  }
	  .btn {
		 animation:btn 1s linear infinite;
		 animation-iteration-count:1;
	    background: rgba(0, 147, 253, 1);
	    border-radius: 16px;
	    margin: 50px 0;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    height: 35px;
	    width: 140px;
	    div {
	      color: #fff;
	      font-size: 14px;
	    }
	  }
	}
	  @keyframes btn{
	  	
	  	0% {
	            -webkit-transform: scale(0,0);
	            transform: scale(0,0)
	        }
	        100% {
	            -webkit-transform: scale(1,1);
	            transform: scale(1,1)
	        }
	  }
	  .div-relative{
	  position:relative;
	  color:#000;
	  width:500px;
	  height:250px;
	  
	  } 
	  .textNum{
	  position:absolute;
	  left:135px;
	  top:180px;
	  z-index:100;
	  width:100px;
	  height:300px;
	  color: #fff;
	  font-size: 80px;
	  
	  animation:btn 0.8s linear infinite;
	  animation-iteration-count:1;
	  }
	  /* div背景色为红色 */ 
	  .textText{ 
	  	position:absolute;
		left:-10px;
		top:240px;
	  	z-index:80;
	  	width:400px;
	  	height:300px;
		color: #fff;
		font-size: 25px;
		animation:textText 1.5s linear infinite;
		animation-iteration-count:1;
	  	} 
		@keyframes textText{
			0% {
			      -webkit-transform: translateY(-50px);
			     
			  }
			50% {

		          -webkit-transform: scale(1,1);
		          
		      }
		      80% {
		          -webkit-transform: scale(1.5,1.5);
		          
		      }
			  100% {
			      -webkit-transform: scale(1,1);
			      
			  }
		}
</style>

