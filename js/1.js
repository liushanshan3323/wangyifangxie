// 获取需要操作的DOM元素
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
console.log(step);