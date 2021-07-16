function format() {
    var date = new Date();
    var res = 'YYYY/MM/DD hh:mm:ss';

    var obj = {
        'Y+': date.getFullYear(),
        'M+': date.getMonth(),
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }

    for (k in obj) {
        obj[k] = obj[k] < 10 ? '0' + obj[k] : obj[k];

        var reg = new RegExp(k);

        res = res.replace(reg, obj[k]);


    }
    console.log(res);
}
format();

function getUrl(url) {
    var res = {};
    var urlstr = url.slice(url.indexOf('?') + 1);
    var str = urlstr.split('&');
    for (var i = 0; i < str.length; i++) {
        var index = str[i].indexOf('=');
        var key = str[i].slice(0, index);
        var value = str[i].slice(index + 1);
        console.log(key, value);
        res[key] = value;
    }
    return res;
}

function text(url) {
    var strurl = url.slice(url.indexOf('=') + 1);
    var str = decodeURI(strurl);
    return str;
}

function LOGIN(token) {
    var login = document.querySelector('.login');
    var nologin = document.querySelector('.nologin');
    var exit = document.querySelector('.exit');
    if (token) {
        // alert("sdsdsd")
        console.log("登上了");
        login.style.display = 'block';
        nologin.style.display = 'none';
    } else {
        login.style.display = 'none';
        nologin.style.display = 'block';
    }
    exit.onclick = function (e) {
        // e.preventDefault();
        localStorage.removeItem('token');
        if ((!token)) {

            login.style.display = 'none';
            nologin.style.display = 'block';
        }
        location.href = './index.html'
    }
}

// 加购
function shopadd(goodId, tokens) {
    Axios({
        url: '/add',
        method: 'get',
        data: {
            goodId: goodId,
            token: tokens
        }
    }).then(data=>{

    // REQUEST.get('/add', {
    //     params: {
    //         goodId: goodId,
    //         token: tokens
    //     }
    // }, function (data) {
        console.log(data);
        if (data.code === 0) {
            alert("请先登录");
        } else if (data.code === 1) {
            alert('添加成功');
        } else {
            alert('添加失败');
        }
    })

}

// promise 版  ajax
function Axios(options) {
    let { url, method, data } = options;
    if (method === "get") {
        url = url + "?";
        for (let k in data) {
            url = url + k + "=" + data[k] + "&";
        }
        url = Axios.prototype.baseURL + url.slice(0, url.length - 1);
    }
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) {
                return;
            }
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(xhr);
            }
        };
        xhr.send();
    });

}
Axios.prototype.baseURL = "http://49.232.47.192:9527/api";