const timeline = document.getElementById("timeline");
const statsBox = document.getElementById("stats");
const today = new Date();
const todayDate = today.toISOString().split("T")[0];
const routine = getTodayRoutine();

document.getElementById("dayTitle").innerText = today.toDateString();

const saved = JSON.parse(localStorage.getItem(todayDate)) || {};

let doneCount = 0;
let missCount = 0;

// ---- LOAD TASKS ----
routine.forEach(item => {
  const div = document.createElement("div");
  div.className = "task animate";

  div.innerHTML = `
    <strong>${item.time}</strong> — ${item.task}<br>
    <button>✔ Done</button>
    <button>✖ Missed</button>
  `;

  if (saved[item.id] === "done") {
    div.classList.add("done");
    doneCount++;
  }
  if (saved[item.id] === "missed") {
    div.classList.add("missed");
    missCount++;
  }

  div.querySelectorAll("button")[0].onclick = () => update(item.id, "done", div);
  div.querySelectorAll("button")[1].onclick = () => update(item.id, "missed", div);

  timeline.appendChild(div);
  scheduleNotification(item.time, item.task);
});

function update(id, status, el) {
  saved[id] = status;
  localStorage.setItem(todayDate, JSON.stringify(saved));
  el.className = "task animate " + status;
  location.reload();
}

// ---- DAILY STATS ----
const total = routine.length;
const percent = total ? Math.round((doneCount / total) * 100) : 0;

// ---- STREAK SYSTEM ----
let streak = parseInt(localStorage.getItem("streak") || "0");

function yesterdayDate() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

const yesterday = JSON.parse(localStorage.getItem(yesterdayDate()));

if (percent >= 80) {
  if (yesterday) {
    streak++;
  } else {
    streak = 1;
  }
  localStorage.setItem("streak", streak);
}

statsBox.innerHTML = `
  <div class="stats">
    ✅ Done: ${doneCount} |
    ❌ Missed: ${missCount} |
    📊 ${percent}% |
    🔥 Streak: ${streak}
  </div>
`;

// ---- DARK MODE ----
const themeBtn = document.getElementById("toggleTheme");
const isDark = localStorage.getItem("dark") === "true";
if (isDark) document.body.classList.add("dark");

themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
};

// ---- DRAW DAILY GRAPH ----
drawGraph();
