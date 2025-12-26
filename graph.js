function drawGraph() {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const days = [];
  const values = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    const data = JSON.parse(localStorage.getItem(key)) || {};
    const done = Object.values(data).filter(v => v === "done").length;
    const total = Object.keys(data).length || 1;

    days.push(d.toDateString().slice(0, 3));
    values.push(Math.round((done / total) * 100));
  }

  const barWidth = 30;
  const gap = 15;

  values.forEach((val, i) => {
    const x = i * (barWidth + gap) + 20;
    const y = canvas.height - val;

    ctx.fillRect(x, y, barWidth, val);
    ctx.fillText(days[i], x, canvas.height - 5);
  });
}
