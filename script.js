/*
 * Kowe waitlist
 *
 * Set WAITLIST_ENDPOINT to the URL that should receive signups.
 * The form sends: POST { email, source, referrer, submittedAt } as JSON.
 * Works with Formspree, Getform, a Supabase edge function, a Google Apps Script
 * web app, or your own API.
 *
 * While WAITLIST_ENDPOINT is empty, the page runs in demo mode: signups are
 * NOT sent anywhere (they are only logged to the console).
 */
const WAITLIST_ENDPOINT = "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

document.getElementById("year").textContent = new Date().getFullYear();

function setStatus(form, message, type) {
  const status = form.querySelector(".form-status");
  status.textContent = message;
  status.className = "form-status" + (type ? " " + type : "");
}

async function submitEmail(payload) {
  if (!WAITLIST_ENDPOINT) {
    console.warn("[kowe] Demo mode: WAITLIST_ENDPOINT is not set. Signup not saved:", payload);
    await new Promise((r) => setTimeout(r, 500));
    return;
  }
  const res = await fetch(WAITLIST_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Request failed with status " + res.status);
}

document.querySelectorAll(".waitlist-form").forEach((form) => {
  const input = form.querySelector('input[type="email"]');
  const button = form.querySelector("button");
  const label = button.textContent;

  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    setStatus(form, "");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = input.value.trim().toLowerCase();

    if (!EMAIL_RE.test(email)) {
      input.setAttribute("aria-invalid", "true");
      setStatus(form, "Please enter a valid email address.", "error");
      input.focus();
      return;
    }

    button.disabled = true;
    button.textContent = "Joining…";
    setStatus(form, "");

    try {
      await submitEmail({
        email,
        source: form.dataset.source || "unknown",
        referrer: document.referrer || null,
        submittedAt: new Date().toISOString(),
      });
      form.classList.add("done");
      setStatus(form, "You're on the list. We'll email you when Kowe launches.", "success");
    } catch (err) {
      console.error("[kowe] Waitlist signup failed:", err);
      setStatus(form, "Something went wrong. Please try again in a moment.", "error");
      button.disabled = false;
      button.textContent = label;
    }
  });
});

/* Materials: choose a file to see what Kowe takes from it */
const MATERIAL_NOTES = {
  drive: ["6 topics · 42 concepts", "Your Drive folders become one plan: outcomes, readings and the exam in 5 weeks."],
  syllabus: ["12 outcomes", "The syllabus sets what you are expected to learn, so the plan follows the course, not a generic outline."],
  slides: ["Lecture 4 · mechanisms", "These slides put beta-lactam cleavage and ring strain on this week's plan."],
  book: ["Chapters 1–6", "The textbook fills the prerequisite gaps the lectures assume you already have."],
  past: ["2021–2025 papers", "Past questions set the format: how marks are awarded, and which patterns repeat."],
};

const materials = document.querySelector("[data-materials]");
if (materials) {
  const title = materials.querySelector("[data-extract-title]");
  const body = materials.querySelector("[data-extract-body]");
  materials.querySelectorAll("[data-file]").forEach((button) => {
    button.addEventListener("click", () => {
      materials.querySelectorAll("[data-file]").forEach((item) => {
        const on = item === button;
        item.classList.toggle("on", on);
        item.setAttribute("aria-selected", on ? "true" : "false");
      });
      const note = MATERIAL_NOTES[button.dataset.file];
      if (note) {
        title.textContent = note[0];
        body.textContent = note[1];
      }
    });
  });
}

/* Simulated audio and video playback. Nothing is actually played. */
function formatTime(seconds) {
  return Math.floor(seconds / 60) + ":" + String(Math.floor(seconds % 60)).padStart(2, "0");
}

function wireMedia(root) {
  const total = Number(root.dataset.total);
  const label = root.dataset.label;
  const button = root.querySelector("[data-toggle]");
  const timeEl = root.querySelector("[data-time]");
  const barEl = root.querySelector("[data-bar]");
  let elapsed = 0;
  let timer = null;

  function render() {
    timeEl.textContent = formatTime(elapsed) + " / " + formatTime(total);
    barEl.style.width = (elapsed / total) * 100 + "%";
  }

  function stop() {
    clearInterval(timer);
    timer = null;
    root.classList.remove("playing");
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", "Play " + label);
  }

  function start() {
    root.classList.add("playing");
    button.setAttribute("aria-pressed", "true");
    button.setAttribute("aria-label", "Pause " + label);
    timer = setInterval(() => {
      elapsed = Math.min(total, elapsed + 0.25);
      render();
      if (elapsed >= total) {
        stop();
        elapsed = 0;
        render();
      }
    }, 250);
  }

  function toggle() {
    if (timer) stop();
    else start();
  }

  button.addEventListener("click", toggle);
  const surface = root.querySelector("[data-surface]");
  if (surface) surface.addEventListener("click", toggle);
  render();
  return stop;
}

/* Tutor: switch lesson format */
const studio = document.querySelector("[data-formats]");
if (studio) {
  const tabs = [...studio.querySelectorAll("[data-format]")];
  const panels = [...studio.querySelectorAll("[data-panel]")];
  const stoppers = [...studio.querySelectorAll("[data-media]")].map(wireMedia);

  function selectFormat(id) {
    stoppers.forEach((stop) => stop());
    tabs.forEach((tab) => {
      const on = tab.dataset.format === id;
      tab.classList.toggle("on", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== id;
    });
  }

  tabs.forEach((tab, index) => {
    tab.tabIndex = index === 0 ? 0 : -1;
    tab.addEventListener("click", () => selectFormat(tab.dataset.format));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = tabs[(index + direction + tabs.length) % tabs.length];
      next.focus();
      selectFormat(next.dataset.format);
    });
  });

  const steps = studio.querySelector("[data-steps]");
  const diagram = studio.querySelector("[data-diagram]");
  if (steps) {
    steps.querySelectorAll("[data-step]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.step;
        steps.querySelectorAll("[data-step]").forEach((item) => item.classList.toggle("on", item === button));
        studio.querySelectorAll("[data-step-copy]").forEach((line) => {
          line.hidden = line.dataset.stepCopy !== id;
        });
        if (diagram) diagram.dataset.active = id;
      });
    });
  }
}
