const timeline = document.getElementById("timeline");
const statsBox = document.getElementById("stats");
const historyInput = document.getElementById("historyDate");

const today = new Date();
const todayKey = today.toISOString().split("T")[0];
historyInput.value = todayKey;

loadDay(todayKey);

// ---------------- LOAD DAY ----------------
function loadDay(dateKey) {
  timeline.innerHTML = "";
  statsBox.innerHTML = "";

  const isToday = dateKey === todayKey;
  const routine = getRoutineByDate(dateKey);
  const saved = JSON.parse(localStorage.getItem(dateKey)) || {};

  let done = 0;
  let missed = 0;

  document.getElementById("dayTitle").innerText =
    isToday ? "Today" : "History: " + dateKey;

  routine.forEach(item => {
    const div = document.createElement("div");
    div.className = "task";

    if (saved[item.id] === "done") {
      div.classList.add("done");
      done++;
    }
    if (saved[item.id] === "missed") {
      div.classList.add("missed");
      missed++;
    }

    div.innerHTML = `
      <strong>${item.time}</strong> — ${item.task}<br>
      ${isToday ? `
        <button class="ok">✔ Done</button>
        <button class="no">✖ Missed</button>
      ` : `<em>🔒 Locked</em>`}
    `;

    if (isToday) {
      div.querySelector(".ok").onclick = () => save(item.id, "done");
      div.querySelector(".no").onclick = () => save(item.id, "missed");
      scheduleNotification(item.time, item.task);
    }

    timeline.appendChild(div);
  });

  showStats(done, missed, routine.length, isToday);
  if (typeof drawGraph === "function") drawGraph();
}

// ---------------- SAVE ----------------
function save(id, status) {
  const data = JSON.parse(localStorage.getItem(todayKey)) || {};
  data[id] = status;
  localStorage.setItem(todayKey, JSON.stringify(data));
  loadDay(todayKey);
}

// ---------------- STATS + STREAK ----------------
function showStats(done, missed, total, isToday) {
  const percent = total ? Math.round((done / total) * 100) : 0;
  let streak = parseInt(localStorage.getItem("streak") || "0");
  const streakDate = localStorage.getItem("streakDate");

  if (isToday && percent >= 80 && streakDate !== todayKey) {
    streak++;
    localStorage.setItem("streak", streak);
    localStorage.setItem("streakDate", todayKey);
  }

  statsBox.innerHTML = `
    <div class="stats">
      ✅ ${done} | ❌ ${missed} | 📊 ${percent}% | 🔥 ${streak}
    </div>
  `;
}

// ---------------- DATE PICKER ----------------
historyInput.onchange = () => loadDay(historyInput.value);

// ---------------- DARK MODE ----------------
const themeBtn = document.getElementById("toggleTheme");
if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark");
}

themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark",
    document.body.classList.contains("dark"));
};
