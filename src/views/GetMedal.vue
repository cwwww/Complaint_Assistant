<template>
  <div class="iconRecive">
    <div class="grass"></div>
    <div class="box">
      <div class="imgBox">
        <img src="../assets/images/guang.png" alt class="light" />
        <img src="../assets/images/wenzi.png" alt class="wenzi" />
      </div>
      <div class="title">
        <span>恭喜获得一览众山小勋章</span>
        <div>
          <img src="../assets/images/huangguan.png" alt />
          <span>+300</span>
        </div>
      </div>
      <div class="btn">
        <div>继续</div>
      </div>
    </div>
  </div>
</template>






<style lang="scss" scoped>
.iconRecive {
  //   background-color: #0b2733;
  background-color: rgb(26, 43, 57);
  background-image: url(../assets/images/bebot@2x.png);
  background-size: 4rem, 69.3333px;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 72%;

  background-attachment: fixed;
  height: 100vh;
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
  }

  .imgBox {
    margin-top: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    .wenzi {
      height: 25px;
    }
  }
  .title {
    margin-top: 10px;
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
  .btn {
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
</style>