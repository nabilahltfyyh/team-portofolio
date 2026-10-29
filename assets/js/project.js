const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".nav-btn.left");
const btnRight = document.querySelector(".nav-btn.right");

if (slider) {
  // Simpan slide asli sebelum membuat salinan
  const originalSlides = [...slider.querySelectorAll(".slide")];
  const totalSlides = originalSlides.length;

  if (totalSlides > 1) {
    // Buat salinan slide terakhir dan pertama
    const lastClone = originalSlides[totalSlides - 1].cloneNode(true);
    const firstClone = originalSlides[0].cloneNode(true);

    lastClone.dataset.clone = "true";
    firstClone.dataset.clone = "true";

    // Susunan: salinan terakhir, semua slide asli, salinan pertama
    slider.prepend(lastClone);
    slider.append(firstClone);

    let currentIndex = 1;
    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;
    let moved = false;
    let settleTimer;

    function getSlides() {
      return [...slider.querySelectorAll(".slide")];
    }

    // Hitung posisi scroll agar slide tepat di tengah
    function goToSlide(index, behavior = "smooth") {
      const allSlides = getSlides();
      const slide = allSlides[index];

      if (!slide) return;

      currentIndex = index;

      const sliderRect = slider.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();

      const slideCenter =
        slideRect.left - sliderRect.left + slider.scrollLeft + slideRect.width / 2;

      slider.scrollTo({
        left: slideCenter - slider.clientWidth / 2,
        behavior,
      });
    }

    // Tombol kanan dan kiri
    btnRight?.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
    });

    btnLeft?.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
    });

    // Cari slide yang paling dekat dengan tengah
    function findNearestSlide() {
      const allSlides = getSlides();
      const sliderCenter = slider.getBoundingClientRect().left + slider.clientWidth / 2;

      let nearestIndex = 0;
      let nearestDistance = Infinity;

      allSlides.forEach((slide, index) => {
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;
        const distance = Math.abs(slideCenter - sliderCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      return nearestIndex;
    }

    // Tangani saat scroll atau swipe selesai
    function handleScrollSettled() {
      if (isDown) return;

      const allSlides = getSlides();
      currentIndex = findNearestSlide();

      // Jika berada di salinan slide terakhir,
      // pindah tanpa animasi ke slide terakhir yang asli
      if (currentIndex === 0) {
        goToSlide(totalSlides, "instant");
      }

      // Jika berada di salinan slide pertama,
      // pindah tanpa animasi ke slide pertama yang asli
      else if (currentIndex === totalSlides + 1) {
        goToSlide(1, "instant");
      }
    }

    // Deteksi akhir scroll; sediakan fallback untuk browser lama
    if ("onscrollend" in slider) {
      slider.addEventListener("scrollend", handleScrollSettled);
    } else {
      slider.addEventListener("scroll", () => {
        clearTimeout(settleTimer);
        settleTimer = setTimeout(handleScrollSettled, 150);
      });
    }

    // Drag menggunakan mouse
    slider.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;

      isDown = true;
      moved = false;
      startX = e.pageX;
      startScrollLeft = slider.scrollLeft;

      slider.classList.add("dragging");
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;

      const distance = e.pageX - startX;

      if (Math.abs(distance) > 3) moved = true;

      if (moved) {
        e.preventDefault();
        slider.scrollLeft = startScrollLeft - distance;
      }
    });

    function endDrag() {
      if (!isDown) return;

      isDown = false;
      slider.classList.remove("dragging");

      if (moved) {
        goToSlide(findNearestSlide());
      }
    }

    window.addEventListener("mouseup", endDrag);
    slider.addEventListener("mouseleave", endDrag);

    // Inisialisasi pada slide pertama yang asli
    function initializeCarousel() {
      goToSlide(1, "instant");
    }

    if (document.readyState === "complete") {
      requestAnimationFrame(initializeCarousel);
    } else {
      window.addEventListener("load", initializeCarousel, { once: true });
    }

    // Pertahankan posisi tengah saat ukuran layar berubah
    window.addEventListener("resize", () => {
      goToSlide(currentIndex, "instant");
    });
  }
}
