let creatModule = (function creatModule() {
    let top_bottom = document.querySelector('.top_bottom'),
        li_box = top_bottom.querySelectorAll('li'),
        data = null;
    let queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './json/product.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };

    // bindHTML：完成数据绑定
    let bindHTML = function bindHTML() {
        let str = `<ul>`;
        data.forEach(item => {
            let {
                title,
                img
            } = item;
            str += `<div class="home_box main clearfix">
                <div class="small_box">
                    <div class="small_title">
                        口碑好物
                    </div>
                    <div class="room_box">
                        <div class="small_room">
                            <a href="">
                                <img src="./img/口碑好物.webp" alt="">
                                <span>
                                    口碑好物
                                </span>
                            </a>
                        </div> `
        });
        str +=`</ul>`;
    }


    console.log(top_bottom);
    console.log(li_box);
    return {
        init() {
            queryData();
        }
    }

})();
creatModule.init();