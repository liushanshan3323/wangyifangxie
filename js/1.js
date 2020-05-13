// 新品首发
let newProducts = (function newProducts() {
    let itemList = document.querySelector('.itemList'),
        bd = document.querySelector('.bd'),
        m_newItemSlick = itemList.querySelector('.m-newItemSlick'),
        item = m_newItemSlick.querySelectorAll('.item'),
        slick_prev = bd.querySelector('.slick-prev'),
        slick_next = bd.querySelector('.slick-next');
    let step = 0,
        interval = 1000,
        autoTimer = null,
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

    return {
        init() {}
    }
})();
indexPopular.init();
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
    let target = new Date('2020/05/15 15:57:35'),
        spanTime = target - time;
    if (spanTime <= 0) {
        // 已经到达抢购的时间节点了
        box.innerHTML = "开始抢购！";
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