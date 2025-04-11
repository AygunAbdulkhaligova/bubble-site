const canvas = document.getElementById("bubbleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bubbles = [];

function createBubble() {
  bubbles.push({
    x: Math.random() * canvas.width,
    y: canvas.height + 100,
    radius: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 1,
    color: "rgba(255, 182, 193, 0.6)", // açık pembe
  });
}

function drawBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach((b, i) => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.shadowColor = "#ffccff";
    ctx.shadowBlur = 10;
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

setInterval(createBubble, 100);
animate();
