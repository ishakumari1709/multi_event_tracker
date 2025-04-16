const form = document.getElementById("eventForm");
const container = document.getElementById("countdownContainer");

let events = JSON.parse(localStorage.getItem("events")) || [];

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(events));
}

function deleteEvent(index) {
  events.splice(index, 1);
  saveEvents();
  renderEvents();
}

function renderEvents() {
  container.innerHTML = "";
  events.forEach((event, index) => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "card p-3";

    const title = document.createElement("h5");
    title.textContent = event.name;

    const timeLeft = document.createElement("div");
    timeLeft.className = "timer text-primary";
    timeLeft.id = `timer-${index}`;

    const btn = document.createElement("button");
    btn.className = "btn btn-outline-danger btn-sm mt-2";
    btn.textContent = "Delete";
    btn.onclick = () => deleteEvent(index);

    card.appendChild(title);
    card.appendChild(timeLeft);
    card.appendChild(btn);
    col.appendChild(card);
    container.appendChild(col);
  });
}

function updateTimers() {
  events.forEach((event, index) => {
    const now = new Date().getTime();
    const distance = new Date(event.date).getTime() - now;
    const timerEl = document.getElementById(`timer-${index}`);

    if (distance <= 0) {
      timerEl.textContent = "🎉 Event Started!";
      timerEl.classList.add("text-success");
    } else {
      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);
      timerEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("eventName").value;
  const date = document.getElementById("eventDate").value;
  if (!name || !date) return;

  events.push({ name, date });
  saveEvents();
  renderEvents();
  form.reset();
});

renderEvents();
setInterval(updateTimers, 1000);
