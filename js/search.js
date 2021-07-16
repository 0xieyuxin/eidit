function searchs(res) {
    // REQUEST.get('/search', {
    //     params: {
    //         word: res
    //     }
    // }, function (data) {
    //     console.log(data);
    //     for (var j = 0; j < data.length; j++) {
    //         list.innerHTML += `
    //     <div class="listitem" data-id="${data[j].Id}">
    //     <div class="list-img">
    //     <img alt="" src="${data[j].img_list_url}">
    //         </div>
    //         <div class="title">
    //     <p>${data[j].title}</p>
    //         </div>
    //         <div class="text">
    //     <span class="price">￥${data[j].price}</span>
    //     <span>${data[j].mack}</span>
    //     </div>
    //     </div>
    //     `
    //     }
    // })
    Axios({
        url: "/search",
        method: "get",
        data: { word: res }
    }).then(data => {
        // data = JSON.parse(data);
        for (var j = 0; j < data.length; j++) {
            list.innerHTML += `
        <div class="listitem" data-id="${data[j].Id}">
        <div class="list-img">
        <img alt="" src="${data[j].img_list_url}">
            </div>
            <div class="title">
        <p>${data[j].title}</p>
            </div>
            <div class="text">
        <span class="price">￥${data[j].price}</span>
        <span>${data[j].mack}</span>
        </div>
        </div>
        `
        }
    })
}


