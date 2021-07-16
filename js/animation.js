function anmation(obj, target, callback) {
    var time = null;
    clearInterval(obj.time);
    obj.time = setInterval(function () {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.time);
            if (callback) {
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + "px";
    }, 15)
}

function nav() {
    var header = document.querySelector('header');
    header.innerHTML = `
    <div class="top">
            <div class="logo">
                <img src="../asses/images/logo.png" alt="">
            </div>
            <div class="search">
                <input type="text" name="" id="" placeholder="请输入想要的商品"><button>搜索</button>
            </div>
        </div>
        <nav>
            <ul class="nologin">
                <li><a href="./index.html">首页</a></li>
                <li><a href="./login.html">登录</a></li>
                <li><a href="./register.html">注册</a></li>
            </ul>
            <ul class="login">
                <li><a href="./index.html">首页</a></li>
                <li><a href="./shopCar.html">购物车</a></li>
                <li class="exit"><a href="">退出登录</a></li>
            </ul>
        </nav>
    `


    // var nav=document.querySelector('nav');
    // var search=document.querySelector('search');
    // window.onscroll=function(){
    //     if(document.documentElement.scrollTop>100){
    //         nav.classList.add('fix');
    //     }else{
    //         nav.classList.remove('fix');
    //         console.log(1)

    //     }
    // }
}


