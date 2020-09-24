{
  const sliderWrapper = document.getElementById('slider-wrapper');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');

  function nextSlider_loop() {
    const sliderItems = document.querySelectorAll('.slider-item');
    const clone = sliderItems[0].cloneNode(true);
    sliderWrapper.style.transition = 'transform 1s';
    sliderWrapper.style.transform = 'translateX(-100%)';
    setTimeout(function () {
      sliderWrapper.style.transition = 'transform 0s';
      sliderWrapper.style.transform = 'translateX(0)';
      sliderWrapper.removeChild(sliderItems[0]);
      sliderWrapper.appendChild(clone);
    }, 1000)
  }

  nextBtn.addEventListener('click', () => {
    nextSlider_loop();
  })

  window.setInterval(function () {
    nextSlider_loop()
  }, 5000);
}