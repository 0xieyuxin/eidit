// function load(dom,imgs){
//     var img=document.createElement('img');
//     img.src=imgs;
//     // img.src="../asses/images/loading.jpg";
//     dom.appendChild(img);
// }


/**
 * authos:yanqi\
 * loading 组件
 */
var createLoading = (function () {
    var _this;

    function createLoading(config) {
        var loading = new Loading(config);
        loading.render().css()
        return loading;
    }

    function Loading(config) {
        _this = this;
        var defaultConfig={
            src:'../asses/images/loading.jpg',
            mode:'black' //框的背景颜色
        }
        this.default=!config?defaultConfig:Object.assign({},defaultConfig,config)

    }


    Loading.prototype.render = function () {
        var body = document.querySelector('body');
        // var bodyChild = body.innerHTML;
        // var html = '<div class="load"></div>';
        // body.innerHTML = bodyChild + html;
        // this.loading = document.querySelector('.load')
        var div=document.createElement('div');
        div.className="load";
        body.appendChild(div);
        this.loading=div;
        return _this
    }
    Loading.prototype.css = function () {
        var style = {
            width: '100%',
            height: ' 100%',
            position: 'fixed',
            top: 0,
            left: 0,
            display: ' none',
            background: `${this.default.mode==='white'?'#eee':'rgba(0,0,0,0.4)'} url(${this.default.src}) 50% no-repeat`,
            backgroundSize: '400px auto'
        }

        for (x in style) {
            this.loading.style[x] = style[x];
        }
        return _this

    }
    Loading.prototype.show = function () {

        var dom=this.loading;
        dom.style.display='block';
        return _this;

    }

    Loading.prototype.hide = function () {
        this.loading.style.display='none'
        return _this;// 返回new实例出的对象 指向他

    }
    Loading.prototype.trigger = function () {
        return this

    }
    return createLoading;
})()








// createLoading({
//     loadingUrl: "",  // loading 图片链接
// }).show().hide()
// // show loading 显示
// // hide loading 隐藏


