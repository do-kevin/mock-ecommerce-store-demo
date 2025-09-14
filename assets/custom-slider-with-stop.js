function customSlider({
  minWidth = 768,
  maxWidth = 767,
  targetClassName = null,
  duration = 1500,
}) {
  if (!targetClassName || typeof targetClassName !== "string") {
    throw new Error(
      'The "targetClassName" parameter is missing or not a string.',
    );
  }

  if (typeof minWidth !== "number" || typeof maxWidth !== "number") {
    throw new Error(
      'The "minWidth" and "maxWidth" parameters should be of type number.',
    );
  }

  if (typeof duration !== "number") {
    throw new Error('The "duration" parameter should be of type number.');
  }

  var self = this;

  this.slider = document.querySelectorAll(targetClassName);

  if (!this.slider || this.slider.length === 0) {
    throw new Error(`No elements found with class "${targetClassName}".`);
  }

  this.currentSlide = 1;

  this.iterationCompleted = false;

  this.sliderInterval = setInterval(function () {
    self.iterationCompleted =
      self.currentSlide + 1 < self.slider.length + 1 ? false : true;

    if (self.iterationCompleted) {
      clearInterval(self.sliderInterval);
    }
  }, duration);

  // @ts-ignore
  var slideTimer = null;

  this.start = function () {
    slideTimer = setInterval(function () {
      // @ts-ignore
      [].forEach.call(self.slider, function (el, index) {
        el.classList.add("hidden");
      });

      self.currentSlide + 1 < self.slider.length + 1
        ? self.currentSlide++
        : (self.currentSlide = 1);

      // @ts-ignore
      self.slider[self.currentSlide - 1].classList.remove("hidden");
    }, duration);
  };

  this.stop = function () {
    // @ts-ignore
    clearInterval(slideTimer);
  };
}
