const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bubbles = [];

const bubbleColors = [
  "rgba(0, 191, 255, 0.6)",  // Mavi
  "rgba(255, 223, 0, 0.6)",  // Sarı
  "rgba(230, 230, 250, 0.6)", // Lavanta
  "rgba(255, 105, 180, 0.6)"  // Pembe
];

function createBubble(x, y) {
  let radius = Math.random() * 20 + 10;
  bubbles.push({
    x: x,
    y: y,
    radius: radius,
    speed: Math.random() * 2 + 1,
    color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],  // Rastgele renk
    shadowColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`,
    shadowBlur: Math.random() * 20 + 10
  });
}

function drawBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
}

function animate() {
  drawBubbles();
  requestAnimationFrame(animate);
}

setInterval(() => {
  createBubble(Math.random() * canvas.width, canvas.height + 20);
}, 100);

animate();

// Fare ile tıklama ile yeni baloncuklar oluşturma
canvas.addEventListener('click', (event) => {
  createBubble(event.clientX, event.clientY);
});
