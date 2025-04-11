const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bubbles = [];
let hearts = [];

const bubbleColors = [
  "rgba(0, 191, 255, 0.6)",  // Mavi
  "rgba(255, 223, 0, 0.6)",  // Sarı
  "rgba(230, 230, 250, 0.6)", // Lavanta
  "rgba(255, 105, 180, 0.6)",  // Pembe
  "rgba(0, 255, 0, 0.6)", // Yeşil
  "rgba(255, 0, 0, 0.6)", // Kırmızı
  "rgba(255, 165, 0, 0.6)", // Turuncu
  "rgba(255, 0, 255, 0.6)" // Mor
];

const heartColors = [
  "rgba(255, 0, 255, 0.6)", // Mor
  "rgba(255, 105, 180, 0.6)", // Pembe
  "rgba(0, 255, 255, 0.6)", // Turkuaz
  "rgba(255, 0, 0, 0.6)", // Kırmızı
  "rgba(255, 165, 0, 0.6)"  // Turuncu
];

function createBubble(x, y) {
  let radius = Math.random() * 30 + 10; // Küçük, orta, büyük baloncuklar
  bubbles.push({
    x: x,
    y: y,
    radius: radius,
    speed: Math.random() * 2 + 1,
    color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
    shadowColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`,
    shadowBlur: Math.random() * 20 + 10
  });
}

function createHeart(x, y) {
  let size = Math.random() * 30 + 10; // Küçük, orta, büyük kalpler
  hearts.push({
    x: x,
    y: y,
    size: size,
    speed: Math.random() * 2 + 1,
    color: heartColors[Math.floor(Math.random() * heartColors.length)],
    shadowColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`,
    shadowBlur: Math.random() * 20 + 10
  });
}

function drawBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw bubbles
  bubbles.forEach((b, i) => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.shadowColor = b.shadowColor;
    ctx.shadowBlur = b.shadowBlur;
    ctx.fill();
    ctx.closePath();
    b.y -= b.speed;

    if (b.y + b.radius < 0) {
      bubbles.splice(i, 1);
    }
  });

  // Draw hearts
  hearts.forEach((h, i) => {
    ctx.beginPath();
    ctx.moveTo(h.x, h.y);
    ctx.arc(h.x, h.y, h.size, 0, Math.PI * 2);
    ctx.fillStyle = h.color;
    ctx.shadowColor = h.shadowColor;
    ctx.shadowBlur = h.shadowBlur;
    ctx.fill();
    ctx.closePath();
    h.y -= h.speed;

    if (h.y + h.size < 0) {
      hearts.splice(i, 1);
    }
  });
}

function animate() {
  drawBubbles();
  requestAnimationFrame(animate);
}

setInterval(() => {
  createBubble(Math.random() * canvas.width, canvas.height + 20);
  createHeart(Math.random() * canvas.width, canvas.height + 20);
}, 100);

// Başlangıçta 350 baloncuk ve 120 kalp ekleyelim
for (let i = 0; i < 350; i++) {
  createBubble(Math.random() * canvas.width, Math.random() * canvas.height);
}

for (let i = 0; i < 120; i++) {
  createHeart(Math.random() * canvas.width, Math.random() * canvas.height);
}

animate();

// Fare ile tıklama ile yeni baloncuklar oluşturma
canvas.addEventListener('click', (event) => {
  createBubble(event.clientX, event.clientY);
  createHeart(event.clientX, event.clientY);
});
