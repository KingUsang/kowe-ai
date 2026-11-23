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

document.documentElement.classList.add("js");
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

// Fade sections in as they scroll into view
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}
