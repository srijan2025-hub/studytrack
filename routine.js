const ROUTINE = {
  Monday: [
    { id: 1, time: "06:00", task: "Wake up" },
    { id: 2, time: "06:30", task: "Study" }
  ],
  Tuesday: [
    { id: 1, time: "06:00", task: "Math Practice" }
  ],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: []
};

function getRoutineByDate(dateKey) {
  const d = new Date(dateKey);
  const day = d.toLocaleDateString("en-US", { weekday: "long" });
  return ROUTINE[day] || [];
}
