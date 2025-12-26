if ("Notification" in window) {
  Notification.requestPermission();
}

function scheduleNotification(time, text) {
  if (Notification.permission !== "granted") return;
  const now = new Date();
  const [h, m] = time.split(":");
  const target = new Date();
  target.setHours(h, m, 0, 0);
  const delay = target - now;
  if (delay > 0) {
    setTimeout(() => {
      new Notification("Routine Reminder", { body: text });
    }, delay);
  }
}

