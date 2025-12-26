const colors = ['#2196f3', '#4caf50', '#f44336', '#ffeb3b', '#9c27b0'];

function startConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      w: Math.random() * 10 + 5,
      h: Math.random() * 10 + 5,
      dx: (Math.random() - 0.5) * 20,
      dy: (Math.random() - 0.5) * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      gravity: 0.5,
      life: 100
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    particles.forEach(p => {
      if (p.life > 0) {
        p.x += p.dx;
        p.y += p.dy;
        p.dy += p.gravity;
        p.life--;
        active = true;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.w, p.h);
      }
    });

    if (active) {
      requestAnimationFrame(animate);
    } else {
      document.body.removeChild(canvas);
    }
  }
  animate();
}

