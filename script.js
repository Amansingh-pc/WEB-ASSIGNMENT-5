/**
 * script.js — Simple Blog Platform
 * Course : SEC035 Web Programming with Python & JS Lab
 * Author : [Your Name Here]
 *
 * Features:
 *  1. Delete confirmation dialog
 *  2. Live character counter for form inputs
 *  3. Toast notification helper
 *  4. Active nav link highlight
 */

// ============================================================
// 1. DELETE CONFIRMATION
//    Called via onsubmit="return confirmDelete(event)" in index.html
// ============================================================
function confirmDelete(event) {
    // Show a browser confirm dialog before submitting the delete form
    const confirmed = window.confirm(
        "⚠️ Are you sure you want to delete this post?\nThis action cannot be undone."
    );

    // If user clicked Cancel, prevent form submission
    if (!confirmed) {
        event.preventDefault();
        return false;
    }
    return true;   // proceed with form submission
}


// ============================================================
// 2. LIVE CHARACTER COUNTER
//    Attaches to inputs/textareas that have a matching <small id="...-counter">
// ============================================================
function initCharCounters() {
    const fields = [
        { inputId: "title",   counterId: "title-counter",   max: 150  },
        { inputId: "content", counterId: "content-counter", max: 2000 }
    ];

    fields.forEach(({ inputId, counterId, max }) => {
        const input   = document.getElementById(inputId);
        const counter = document.getElementById(counterId);

        if (!input || !counter) return;   // element may not exist on this page

        // Set initial count (important for edit page where field is pre-filled)
        updateCounter(input, counter, max);

        // Update on every keystroke
        input.addEventListener("input", () => updateCounter(input, counter, max));
    });
}

function updateCounter(input, counter, max) {
    const len = input.value.length;
    counter.textContent = `${len} / ${max}`;

    // Turn red when approaching the limit
    if (len >= max * 0.9) {
        counter.style.color = "#ef4444";
    } else {
        counter.style.color = "";   // reset to CSS default
    }
}


// ============================================================
// 3. TOAST NOTIFICATION
//    Usage: showToast("Message here", 3000)
// ============================================================
function showToast(message, duration = 3000) {
    const container = document.getElementById("alert-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "alert";
    toast.textContent = message;
    container.appendChild(toast);

    // Auto-remove after duration
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.4s ease";
        setTimeout(() => toast.remove(), 400);
    }, duration);
}


// ============================================================
// 4. ACTIVE NAV LINK HIGHLIGHT
//    Adds an "active" visual cue to the current page's nav link
// ============================================================
function highlightActiveNav() {
    const currentPath = window.location.pathname;

    document.querySelectorAll(".nav-links a").forEach(link => {
        // Compare the link's href path to the current URL path
        const linkPath = new URL(link.href, window.location.origin).pathname;

        if (linkPath === currentPath) {
            link.style.background = "rgba(255, 255, 255, 0.28)";
            link.style.color      = "#ffffff";
        }
    });
}


// ============================================================
// 5. FORM VALIDATION FEEDBACK
//    Adds a shake animation when a required field is empty
// ============================================================
function initFormValidation() {
    const forms = document.querySelectorAll("#create-form, #edit-form");

    forms.forEach(form => {
        form.addEventListener("submit", (event) => {
            let valid = true;

            form.querySelectorAll("input[required], textarea[required]").forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    // Add shake class to highlight the empty field
                    field.classList.add("shake");
                    field.addEventListener(
                        "animationend",
                        () => field.classList.remove("shake"),
                        { once: true }
                    );
                }
            });

            if (!valid) {
                event.preventDefault();
                showToast("⚠️ Please fill in all required fields.");
            }
        });
    });
}


// ============================================================
// INIT — Run all features once the DOM is fully loaded
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    initCharCounters();
    highlightActiveNav();
    initFormValidation();

    // Tiny welcome toast shown only on the home page
    if (window.location.pathname === "/") {
        showToast("👋 Welcome to Simple Blog!", 2500);
    }
});
