// 
nav();
// 商品列表
var shopList = document.querySelector('.shopList');
var back = document.querySelector('.back');
var input = document.querySelector('.search input');
var btn = document.querySelector('.search button');
var load = document.querySelector('.load');
var f = true;
// 点击 获取当前点击的文字
var navlist = document.querySelector('.navlist');

//  获取所有的li  给第一个li加border
var lis = document.querySelectorAll('header ul li');
lis[0].classList.add('bottom');
var page = 1;
add(page);

window.onscroll = function () {
    var top = document.documentElement.scrollTop;
    // 返回顶部
    top > 10 ? back.style.display = 'block' : back.style.display = 'none';
    back.onclick = function () {
        var t = setInterval(function () {
            top = top - 30;
            document.documentElement.scrollTop = top
            if (document.documentElement.scrollTop == 0) {
                clearInterval(t)
            }
        }, 16.5)
    }

    lazy();

    // 判断数据触底

    if (Math.abs((window.innerHeight + top) - document.body.scrollHeight) < 50) {
        if (!f) return;
        f = 0;
        load.style.display = "block";
        setTimeout(function () {
            page++;
            load.style.display = "none";
            add(page);
            f = 1;
        }, 1000)
    }

}


function add(page) {
    Axios({
        url: "/goodlist",
        method: "get",
        data: { page: page },
    }).then((d) => {
        // d = JSON.parse(d);
        var html = shopList.innerHTML;
        for (var i = 0; i < d.length; i++) {
            html += `
            <div class="listitem" data-id="${d[i].Id}">
            <div class="list-img">
            <img src="../asses/images/loading.jpg" alt="" data-src="${d[i].img_list_url}">
                </div>
                <div class="title">
            <p>${d[i].title}</p>
                </div>
                <div class="text">
            <span class="price">￥${d[i].price}</span>
            <span>${d[i].mack}</span>
            </div>
            </div>
            `
            shopList.innerHTML = html;
        }
        lazy();
        var items = document.querySelectorAll('.listitem');
        for (let i = 0; i < items.length; i++) {
            items[i].onclick = function (e) {
                //  获取当前点击的自定义属性
                var id = items[i].getAttribute('data-id');
                location.href = `./detail.html?goodId=${id}`;
            }
        }
    })

}



// 导航栏url传值
var lis = document.querySelectorAll('.navlist li a');
var list;
for (var i = 0; i < lis.length; i++) {
    lis[i].index = i;
    lis[i].onclick = function (e) {
        e.preventDefault();
        list = this.innerHTML;
        console.log(list);
        list = encodeURI(list)
        location.href = `./classification.html?type_one=${list}`
    }
}

//轮播图
var swiper = document.querySelector('.swiper');
var circle = document.querySelector('.circle');
var ul = document.querySelector('.swiper ul');
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');
var imgwidth = swiper.offsetWidth;
var num = 0, c = 0, flag = true, timer = null;
function swipers() {
    // 设置ul的长度
    ul.style.width = ul.length * imgwidth + "px";
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement("li");
        li.setAttribute("ie", i);
        circle.appendChild(li);
        li.onclick = function () {
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].classList.remove("current");
            }
            this.classList.add("current");
            var index = this.getAttribute("ie");
            //  图片的索引和圆点的点击和圆点样式结合起来
            num = c = index;
            anmation(ul, -index * imgwidth)
        }
    }
    circle.children[0].classList.add('current');
    // 图片索引 圆点索引
    // 克隆最后一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //下一张
    next.onclick = function () {
        if (flag) {
            flag = false;
            if (num == 5) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            anmation(ul, -num * imgwidth, function () {
                flag = true;
            });
            c++;
            // 圆点跟随变化
            if (c == 5) {
                c = 0;
            }
            change();
        }
    }

    // 上一张
    prev.onclick = function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = 5;
                ul.style.left = -num * imgwidth + "px";
            }
            num--;
            anmation(ul, -num * imgwidth, function () {
                flag = true;
            });
            c--;
            if (c < 0) {
                c = 4;
            }
            change();
        }

    }
    //自动播放

    swiper.onmouseenter = function () {
        clearInterval(timer);
    }
    swiper.onmouseleave = function () {
        timer = setInterval(function () {
            next.click();
        }, 2000);
    }
}
function change() {
    for (var i = 0; i < circle.children.length; i++) {
        circle.children[i].classList.remove("current");
    }
    circle.children[c].classList.add("current");
}
swipers();


// 搜索 跳转搜索页
btn.onclick = function () {
    var text = encodeURI(input.value)
    location.href = `./search.html?word=${text}`
}


// 登录
var tokens = localStorage.getItem('token');
function LOGIN(token) {
    var login = document.querySelector('.login');
    var nologin = document.querySelector('.nologin');
    var exit = document.querySelector('.exit');
    if (token) {
        console.log("登上了");
        login.style.display = 'block';
        nologin.style.display = 'none';
    } else {
        login.style.display = 'none';
        nologin.style.display = 'block';
    }
    exit.onclick = function (e) {
        localStorage.removeItem('token');
        if ((!token)) {

            login.style.display = 'none';
            nologin.style.display = 'block';
        }
        location.href = './index.html'
    }
}

LOGIN(tokens);
// 图片懒加载
function lazy() {
    var img = document.querySelectorAll('.list-img img');
    for (var i = 0; i < img.length; i++) {
        if (window.innerHeight + document.documentElement.scrollTop >= img[i].offsetTop) {
            img[i].src = img[i].dataset.src;
        }
    }

}