/* ███ 各要素を取得 ███ */
/* --- 個別slide本体() --- */
const sliderItems = document.querySelectorAll('.slider-item');
/* --- slideItemを並べて動くパーツ --- */
const sliderWrapper = document.getElementById('slider-wrapper');
/* --- スライドのフレーム --- */
const sliderFrame = document.getElementById('slider-frame');
/* ---------- スライドフレームの一時停止マーク ---------- */
const sliderPause = document.getElementById('sliderPause');
/* --- 操作ボタン --- */
const prev = document.getElementById('prev');
const next = document.getElementById('next');

/* ███ オプション ███ */
/* 開始スライド（一枚目 = 0） */
let sliderIndex = 0;
/* スライドの動作間隔(ミリ秒) */
const intervalMillisecond = 6000;
/* スライドの動作スピード(ミリ秒) */
const transitionDuration = 1000;
/* 自動再生の有無 */
const autoPlay = true;
/* 自動再生の方向反転 */
const sliderReverse = true;
/* ループ再生モード */
const loop = true;

/* ███ ボタン ███ */
/* prev（戻る）ボタンのクリックイベント */
prev.addEventListener('click', () => {
  previousSlider();
})
/* next（進む）ボタンのクリックイベント */
next.addEventListener('click', () => {
  nextSlider();
})

/* ███ 再生モードによる動作分岐 ███ */
/* スライドを次に進める動作 */
function nextSlider() {
  //スライド中のボタン無効化
  disabled();
  //スライド動作分岐
  if (loop) {
    nextSlider_loop();
  } else {
    nextSlider_drag();
  }
}
/* スライダーを前に戻す動作 */
function previousSlider() {
  //スライド中のボタン無効化
  disabled();
  //スライド動作分岐
  if (loop) {
    previousSlider_loop();
  } else {
    previousSlider_drag();
  }
}

/* ███ 動作準備(dragモード) ███ */
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

/* ███ スライド動作(dragモード) ███ */
/* 正順 */
function nextSlider_drag() {
  sliderIndex++;
  if (sliderIndex >= sliderItems.length) {
    sliderIndex = 0;
  }
  sliderWrapper.style.left = sliderIndex * -sliderWidth + 'px';
}
/* 逆順 */
function previousSlider_drag() {
  sliderIndex--;
  if (sliderIndex < 0) {
    sliderIndex = sliderItems.length - 1;
  }
  sliderWrapper.style.left = sliderIndex * -sliderWidth + 'px';
}

/* ███ スライド動作(loopモード) ███ */
/* 正順 */
function nextSlider_loop() {
  const sliderItems = document.querySelectorAll('.slider-item');
  const clone = sliderItems[0].cloneNode(true);
  sliderWrapper.style.transition = `transform ${transitionDuration}ms`;
  sliderWrapper.style.transform = 'translateX(-100%)';
  setTimeout(function () {
    sliderWrapper.style.transition = 'transform 0s';
    sliderWrapper.style.transform = 'translateX(0)';
    sliderWrapper.removeChild(sliderItems[0]);
    sliderWrapper.appendChild(clone);
  }, `${transitionDuration}`)
}
/* 逆順 */
function previousSlider_loop() {
  console.log('OWOWOWOW');
  const sliderItems = document.querySelectorAll('.slider-item');
  const clone = sliderItems[sliderItems.length - 1].cloneNode(true);
  sliderWrapper.prepend(clone);
  sliderWrapper.style.transition = 'transform 0s';
  sliderWrapper.style.transform = 'translateX(-100%)';
  sliderWrapper.removeChild(sliderItems[sliderItems.length - 1]);
  setTimeout(function () {
    sliderWrapper.style.transition = `transform ${transitionDuration}ms`;
    sliderWrapper.style.transform = 'translateX(0%)';
  }, 1);
}

/* ███ スライド動作中のボタン無効化 ███ */
function disabled() {
  prev.setAttribute('disabled', true);
  next.setAttribute('disabled', true);
  setTimeout(function () {
    prev.removeAttribute('disabled');
    next.removeAttribute('disabled');
  }, `${transitionDuration}`);
}

/* ███ 自動再生 ███ */
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