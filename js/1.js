// 新品首发
let newProducts = (function newProducts() {
    let itemList = document.querySelector('.itemList'),
        bd = document.querySelector('.bd'),
        m_newItemSlick = itemList.querySelector('.m-newItemSlick'),
        item = m_newItemSlick.querySelectorAll('.item'),
        slick_prev = bd.querySelector('.slick-prev'),
        slick_next = bd.querySelector('.slick-next');
    let step = 0,
        len = item.length;

    function autoMove() {
        if (step === 7) {
            return;
        }
        step++;
        m_newItemSlick.style.transitionDuration = '0.3s';
        m_newItemSlick.style.left = -step * 1100 + 'px';
        console.log(step);

    }
    slick_next.onclick = autoMove;
    slick_prev.onclick = function () {
        if (step === 0) {
            return;
        }
        step--;
        m_newItemSlick.style.transitionDuration = '0.3s';
        m_newItemSlick.style.left = -step * 1100 + 'px';
    };
    return {
        init() {
            autoMove();
        }
    }
})();
newProducts.init();
// 人气推荐
let indexPopular = (function indexPopular() {
    let indexPopularItem = document.getElementById('m-indexPopularItem'),
        tabList = indexPopularItem.getElementsByTagName('li'),
        showContainer = indexPopularItem.querySelectorAll("section")
    // console.log(tabList);

    function change(index) {
        for (var i = 0; i < tabList.length; i++) {
            tabList[i].className = '';
            showContainer[i].className = '';
        }
        tabList[index].className = 'active';
        showContainer[index].className = 'active';
    }

    for (var i = 0; i < tabList.length; i++) {
        tabList[i].zhufeng = i;
        tabList[i].onclick = function () {
            change(this.zhufeng);
        };
    }
})();
// 限时购倒计时
let countDown = (function countDown() {
    let box = document.querySelector('.flashSaleLt'),
        content = document.querySelector('.m-countDown'),
        hour = content.querySelector('.j-hour'),
        minute = content.querySelector('.j-minute'),
        second = content.querySelector('.j-second'),
        timer = null;
    console.log(hour);

    // 获取服务器时间
    function getServerTime() {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest;
            xhr.open('head', './data.json?_=' + Math.random());
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 2 && /^(2|3)\d{2}$/.test(xhr.status)) {
                    let time = xhr.getResponseHeader('date');
                    time = new Date(time);
                    resolve(time);
                }
            };
            xhr.send();
        });
    }

    // 根据服务器时间计算倒计时
    function computed(time) {
        // time从服务器获取的当时间
        // target是抢购的目标时间
        // spanTime两个时间的毫秒差
        let target = new Date('2020/05/18 10:00:00'),
            spanTime = target - time;
        if (spanTime <= 0) {
            // 已经到达抢购的时间节点了
            clearInterval(timer);
            return;
        }
        // 计算出毫秒差中包含多少小时、多少分钟、多少秒
        let hours = Math.floor(spanTime / (60 * 60 * 1000));
        spanTime = spanTime - hours * 60 * 60 * 1000;
        let minutes = Math.floor(spanTime / (60 * 1000));
        spanTime = spanTime - minutes * 60 * 1000;
        let seconds = Math.floor(spanTime / 1000);
        hours < 10 ? hours = '0' + hours : null;
        minutes < 10 ? minutes = '0' + minutes : null;
        seconds < 10 ? seconds = '0' + seconds : null;
        hour.innerHTML = `${hours}`;
        minute.innerHTML = `${minutes}`;
        second.innerHTML = `${seconds}`;
    }

    getServerTime().then(time => {
        // 获取到服务器时间后，计算倒计时
        computed(time);

        // 每间隔1秒中，让获取的时间累加1秒，在重新计算倒计时结果
        timer = setInterval(() => {
            time = new Date(time.getTime() + 1000);
            computed(time);
        }, 1000);
    });
})();
// 居家生活及以下广告
function move(ele) {
    let banner = document.querySelector(ele),
        slidesList = banner.querySelectorAll('.slides'),
        slickoDotsList = banner.querySelectorAll('.slick-dots>li'),
        slickPrev = banner.querySelector('.slick-prev'),
        slickNext = banner.querySelector('.slick-next');
    let step = 0,
        prev = 0,
        len = slidesList.length;

    //实现切换
    function change() {
        let cur = slidesList[step],
            pre = slidesList[prev];
        cur.style.zIndex = '1';
        pre.style.zIndex = '0';
        cur.style.transition = '.3s';
        cur.style.opacity = '1';
        pre.style.transition = '0.3s';
        pre.style.opacity = '0';
        slickoDots();
    }
    //AUTOMOVE自动切换
    function autoMove() {
        prev = step;
        step++;
        step > (len - 1) ? step = 0 : null;
        change();
    }
    //焦点对齐
    function slickoDots() {
        let tempStep = step;
        if (tempStep === len) {
            tempStep = 0;
        }
        slickoDotsList.forEach((item, index) => {
            if (index === tempStep) {
                item.className = 'slick-active';
                return;
            } else {
                item.className = '';
            }

        })
    }
    //点击移动切换
    Array.from(slickoDotsList).forEach((item, index) => {
        item.onmousemove = function () {
            if (index === step) {
                return
            }
            prev = step;
            step = index;
            change();
        }
    })

    //点击右边按钮实现切换
    slickNext.onclick = function () {
        autoMove();
    }
    //点击左边按钮实现切换
    slickPrev.onclick = function () {
        prev = step;
        step--;
        step < 0 ? step = len - 1 : null;
        change();
    }
}
move('.banner1');
move('.banner2');
move('.banner3');
move('.banner4');
move('.banner5');
move('.banner6');
move('.banner7');
move('.banner8');
let Products = (function Products() {
    let bd = document.querySelector('.slickWidth'),
        itemList = bd.querySelector('.itemList'),
        total_track = document.querySelector('.total-track'),
        slick_prev = bd.querySelector('.slick-prev'),
        slick_next = bd.querySelector('.slick-next');
    let interval = 3000,
        autoTimer = null;
    total_track.innerHTML += total_track.innerHTML;
    utils.css(total_track, 'width', utils.css(total_track, 'width') * 2);


    function autoMove() {
        let curL = utils.css(total_track, 'left');
        curL -= 365;
        utils.css(total_track, {
            left: curL
        });
        if (Math.abs(total_track.offsetLeft) >= utils.css(total_track, 'width') / 2) {
            utils.css(total_track, 'left', 0);
        }

    }
    autoTimer = setInterval(autoMove, interval);


    itemList.onmouseenter = function () {
        clearInterval(autoTimer);
    };
    itemList.onmouseleave = function () {
        autoTimer = setInterval(autoMove, interval);
    };
    slick_next.onclick = autoMove;
    slick_prev.onclick = function () {
        let curL = utils.css(total_track, 'left');
        curL += 365;
        utils.css(total_track, {
            left: curL
        });
        if (Math.abs(total_track.offsetLeft) <= 0) {
           utils.css(total_track, 'left', -utils.css(total_track, 'width') / 2);
        }
        console.log(Math.abs(total_track.offsetLeft));
    }
    return {
        init() {
            autoMove();
        }
    }

})();
Products.init();



// let  total_track  = document.querySelector('.total-track ');
// total_track.innerHTML += total_track.innerHTML;
// utils.css(total_track , 'width', utils.css(total_track, 'width') * 2);
// setInterval(() => {
//     let curL = utils.css(total_track, 'left');
//     curL -= 365;
//     utils.css(total_track, {
//         left: curL
//     });
//     if (Math.abs(total_track.offsetLeft) >= utils.css(total_track, 'width') / 2) {
//         utils.css(total_track, 'left', 0);
//     }
// }, 1000);