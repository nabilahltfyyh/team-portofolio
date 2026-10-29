const arrow = document.getElementById("scrollArrow");
const home = document.getElementById("home");

// 1. Munculkan arrow setelah 2 detik
setTimeout(() => {
  if (isInHome()) {
    arrow.classList.add("show");
  }
}, 2000);

// 2. Scroll ke section berikutnya ketika arrow diklik
arrow.addEventListener("click", () => {
  document.getElementById("desc").scrollIntoView({ behavior: "smooth" });
  arrow.classList.remove("show"); // Hilangkan arrow setelah ditekan
});

// 3. Cek apakah user masih di landing section
function isInHome() {
  const rect = home.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom > window.innerHeight / 2;
}

// 4. Arrow hanya muncul jika user di landing section
window.addEventListener("scroll", () => {
  if (isInHome()) {
    arrow.classList.add("show");
  } else {
    arrow.classList.remove("show");
  }
});
