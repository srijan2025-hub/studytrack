const ROUTINE = {
  Monday: [
    { id: 1, time: "06:35", task: "Wake up" },
    { id: 2, time: "07:00-09:00", task: "Study Math" },
    { id: 3, time: "20:00", task: "Read Book" }
  ],
  Tuesday: [
    { id: 1, time: "06:00", task: "Morning Jog" },
    { id: 2, time: "07:00", task: "Physics" }
  ],
  Wednesday: [
    { id: 1, time: "06:00", task: "History" },
    { id: 2, time: "08:00", task: "Read News" }
  ],
  Thursday: [
    { id: 1, time: "06:00", task: "Chemistry" },
    { id: 2, time: "18:00", task: "Gym" }
  ],
  Friday: [
    { id: 1, time: "06:00", task: "Review Week" },
    { id: 2, time: "07:00", task: "Programming" },
    { id: 3, time: "21:00", task: "Relax" }
  ],
  Saturday: [
    { id: 1, time: "09:00", task: "Clean Room" },
    { id: 2, time: "14:00", task: "Grocery Shopping" }
  ],
  Sunday: [
    { id: 1, time: "10:00", task: "Plan Next Week" }
  ]
};

function getRoutineByDate(dateKey) {
  // Fix time zone issues
  const d = new Date(dateKey + "T12:00:00");
  const day = d.toLocaleDateString("en-US", { weekday: "long" });
  return ROUTINE[day] || [];
}

