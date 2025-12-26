function drawGraph() {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");
  const textColor = getComputedStyle(document.body).getPropertyValue('--text');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split("T")[0];
    
    const data = JSON.parse(localStorage.getItem(key)) || {};
    const routineForDay = getRoutineByDate(key);
    const total = routineForDay.length || 1; 

    const done = Object.values(data).filter(v => v === "done").length;
    const percent = Math.round((done / total) * 100);

    const x = 30 + i * 40;
    const barHeight = percent; 
    const y = canvas.height - barHeight - 20;

    ctx.fillStyle = percent >= 80 ? "#4caf50" : "#999";
    ctx.fillRect(x, y, 20, barHeight);

    ctx.fillStyle = textColor;
    ctx.font = "12px sans-serif";
    ctx.fillText(d.toDateString().slice(0,3), x, canvas.height - 5);
  }
}

