/* ================================================================
   PHẦN BẠN CẦN CHỈNH
   - Đổi PASSWORD thành mật khẩu bạn muốn.
   - Đổi LOVER_NAME thành tên người yêu.
   - Chép ảnh vào thư mục assets/photos và sửa danh sách PHOTOS.
   Lưu ý: đây là website tĩnh, mật khẩu mang tính tạo bất ngờ, không dùng
   để bảo vệ dữ liệu riêng tư hoặc nhạy cảm.
================================================================ */
const CONFIG = {
  PASSWORD: "3009",
  LOVER_NAME: "Mập địch",
  PHOTOS: [
    { src: "assets/photos/hinh1.jpg", date: "KỶ NIỆM 01", },
    { src: "assets/photos/hinh2.jpg", date: "KỶ NIỆM 02", },
    { src: "assets/photos/hinh3.jpg", date: "KỶ NIỆM 03", },
    { src: "assets/photos/hinh4.jpg", date: "KỶ NIỆM 04", },
    { src: "assets/photos/hinh5.jpg", date: "KỶ NIỆM 05", },
    { src: "assets/photos/hinh6.jpg", date: "KỶ NIỆM 06", },
  ],
};

const lockScreen = document.querySelector("#lockScreen");
const mainContent = document.querySelector("#mainContent");
const passwordForm = document.querySelector("#passwordForm");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector("#errorMessage");
const togglePassword = document.querySelector("#togglePassword");
const music = document.querySelector("#birthdayMusic");
const musicButton = document.querySelector("#musicButton");
const musicText = document.querySelector("#musicText");

document.querySelector("#loverName").textContent = CONFIG.LOVER_NAME;

togglePassword.addEventListener("click", () => {
  const shouldShow = passwordInput.type === "password";
  passwordInput.type = shouldShow ? "text" : "password";
  togglePassword.textContent = shouldShow ? "🙈" : "👁";
  togglePassword.setAttribute("aria-label", shouldShow ? "Ẩn mật khẩu" : "Hiện mật khẩu");
});

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (passwordInput.value === CONFIG.PASSWORD) {
    errorMessage.textContent = "";
    unlockWebsite();
  } else {
    errorMessage.textContent = "Mật mã chưa đúng rồi, thử lại nhé! 💭";
    passwordInput.classList.remove("shake");
    void passwordInput.offsetWidth;
    passwordInput.classList.add("shake");
    passwordInput.select();
  }
});

function unlockWebsite() {
  lockScreen.classList.add("unlocked");
  mainContent.classList.add("visible");
  mainContent.setAttribute("aria-hidden", "false");
  document.body.classList.remove("locked");
  launchConfetti(260);
  setTimeout(() => document.querySelectorAll(".hero .reveal").forEach((el) => el.classList.add("show")), 250);
}

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.classList.add("playing");
      musicText.textContent = "Tắt nhạc";
    } catch {
      musicText.textContent = "Thêm file nhạc";
    }
  } else {
    music.pause();
    musicButton.classList.remove("playing");
    musicText.textContent = "Bật nhạc";
  }
});

const photoGrid = document.querySelector("#photoGrid");
const photoModal = document.querySelector("#photoModal");
const modalImage = document.querySelector("#modalImage");
const modalCaption = document.querySelector("#modalCaption");

CONFIG.PHOTOS.forEach((photo, index) => {
  const card = document.createElement("article");
  card.className = "photo-card reveal";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Xem ảnh: ${photo.caption ?? ""}`);
  card.innerHTML = `
    <img src="${photo.src}" alt="${photo.caption ?? ""}" loading="lazy">
    <div class="photo-caption"><span>${photo.date}</span><h3>${photo.caption ?? ""}</h3></div>
  `;
  const img = card.querySelector("img");
  img.addEventListener("error", () => {
    img.replaceWith(Object.assign(document.createElement("div"), {
      className: "photo-placeholder",
      innerHTML: `<div><b>${["📷", "💗", "✨", "🌷", "🎀", "🥰"][index % 6]}</b>Thêm ảnh của hai bạn tại<br><strong>${photo.src}</strong></div>`,
    }));
    card.removeAttribute("role");
    card.removeAttribute("tabindex");
  });
  const openPhoto = () => {
    if (!card.querySelector("img")) return;
    modalImage.src = photo.src;
    modalCaption.textContent = photo.caption ?? "";
    photoModal.showModal();
  };
  card.addEventListener("click", openPhoto);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") openPhoto();
  });
  photoGrid.appendChild(card);
});

document.querySelector("#closeModal").addEventListener("click", () => photoModal.close());
photoModal.addEventListener("click", (event) => {
  if (event.target === photoModal) photoModal.close();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.querySelector("#celebrateButton").addEventListener("click", () => {
  launchConfetti(420);
  document.querySelector(".heart-pulse").animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.8)" }, { transform: "scale(1)" }],
    { duration: 850, easing: "ease-out" }
  );
});

// Hiệu ứng pháo giấy nhẹ, không cần thư viện ngoài.
const canvas = document.querySelector("#confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
let animationFrame;

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;
  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function launchConfetti(amount = 220) {
  const colors = ["#ff3d81", "#ff87b1", "#ffd777", "#ffffff", "#9f72ff", "#ff9c71"];
  pieces.push(...Array.from({ length: amount }, () => ({
    x: Math.random() * innerWidth,
    y: -20 - Math.random() * innerHeight * .45,
    w: 5 + Math.random() * 7,
    h: 8 + Math.random() * 11,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 2.5 + Math.random() * 4,
    drift: -1.2 + Math.random() * 2.4,
    rotation: Math.random() * Math.PI,
    spin: -.12 + Math.random() * .24,
    life: 0,
  })));
  if (!animationFrame) animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  pieces.forEach((p) => {
    p.y += p.speed;
    p.x += p.drift + Math.sin(p.life * .04);
    p.rotation += p.spin;
    p.life += 1;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  });
  pieces = pieces.filter((p) => p.y < innerHeight + 30);
  animationFrame = pieces.length ? requestAnimationFrame(animateConfetti) : null;
}
