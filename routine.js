const ROUTINE = {
  Monday: [
    { id: 1, time: "06:00", task: "Wake up" },
    { id: 2, time: "06:30", task: "Study" }
  ],
  Tuesday: [
    { id: 1, time: "06:00", task: "Math Practice" },
    { id: 2, time: "07:00", task: "Exercise" }
  ],
  Wednesday: [
    { id: 1, time: "06:00", task: "History" },
    { id: 2, time: "08:00", task: "Read News" }
  ],
  Thursday: [
    { id: 1, time: "06:00", task: "Physics" }
  ],
  Friday: [
    { id: 1, time: "06:00", task: "Chemistry" },
    { id: 2, time: "07:00", task: "Jogging" },
    { id: 3, time: "21:00", task: "Review Week" }
  ],
  Saturday: [
    { id: 1, time: "08:00", task: "Clean Room" },
    { id: 2, time: "10:00", task: "Relax" }
  ],
  Sunday: [
    { id: 1, time: "09:00", task: "Plan Next Week" }
  ]
};

function getRoutineByDate(dateKey) {
  // Fix for timezone issues: Append time to ensure correct day parsing
  const d = new Date(dateKey + "T12:00:00");
  const day = d.toLocaleDateString("en-US", { weekday: "long" });
  return ROUTINE[day] || [];
}

