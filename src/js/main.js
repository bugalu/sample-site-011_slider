/* ███ 各要素を取得 ███ */
/* --- 個別slide本体() --- */
const sliderItems = document.querySelectorAll('.slider-item');
/* --- slideItemを並べて動くパーツ --- */
const sliderWrapper = document.getElementById('slider-wrapper');
/* --- スライドのフレーム --- */
const sliderFrame = document.getElementById('slider-frame');
/* ---------- スライドフレームの一時停止マーク ---------- */
const sliderPause = document.getElementById('sliderPause');
console.log(sliderPause);

/* --- 操作ボタン --- */
const prev = document.getElementById('prev');
const next = document.getElementById('next');

/* ███ オプション ███ */
/* 開始スライド（一枚目 = 0） */
let sliderIndex = 0;
/* スライドの時間間隔 */
const intervalMillisecond = 6000;
/* 自動再生の有無 */
const autoPlay = true;
/* 自動再生の方向反転 */
const sliderReverse = false;

/* ███ 動作設定 ███ */
/* 開始スライド位置 */
sliderWrapper.style.left = sliderIndex * -sliderWidth + 'px';
/* スライドフレームのクリック回数 */
let frameClickCount = 0;
/* スライド一枚の横幅（px単位）*/
let sliderWidth = sliderFrame.clientWidth;
/* ウィンドウリサイズに伴うスライド横幅の再取得 */
window.addEventListener('resize', () => {
  sliderWidth = sliderFrame.clientWidth;
  //ズレを修正
  prev.click();
})
/* prev（戻る）ボタンの動作 */
prev.addEventListener('click', () => {
  previousSlider();
})
/* next（進む）ボタンの動作 */
next.addEventListener('click', () => {
  nextSlider();
})

/* スライドを次に進める動作 */
function nextSlider() {
  sliderIndex++;
  if (sliderIndex >= sliderItems.length) {
    sliderIndex = 0;
  }
  sliderWrapper.style.left = sliderIndex * -sliderWidth + 'px';
}

/* スライダーを前に戻す動作 */
function previousSlider() {
  sliderIndex--;
  if (sliderIndex < 0) {
    sliderIndex = sliderItems.length - 1;
  }
  sliderWrapper.style.left = sliderIndex * -sliderWidth + 'px';
}

/* 自動再生 */
let timerId = window.setInterval(() => {
  if (sliderReverse === true) {
    previousSlider();
  } else {
    nextSlider();
  }
}, intervalMillisecond);

/* 一時停止 */
sliderFrame.addEventListener('click', () => {
  frameClickCount++;
  if (frameClickCount % 2 !== 0) {
    //一時停止
    sliderPause.style.opacity = 1;
    clearTimeout(timerId);
  } else {
    //再開
    sliderPause.style.opacity = 0;
    timerId = window.setInterval(() => {
      nextSlider();
    }, intervalMillisecond);
  }
});