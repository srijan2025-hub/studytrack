const timeline = document.getElementById("timeline");
const statsBox = document.getElementById("stats");
const todayDate = new Date().toISOString().split("T")[0];
const routine = getTodayRoutine();

document.getElementById("dayTitle").innerText =
  new Date().toDateString();

const saved = JSON.parse(localStorage.getItem(todayDate)) || {};

let doneCount = 0;
let missCount = 0;

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

statsBox.innerHTML = `
  <div class="stats">
    ✅ Done: ${doneCount} |
    ❌ Missed: ${missCount} |
    📊 ${percent}% Completed
  </div>
`;
