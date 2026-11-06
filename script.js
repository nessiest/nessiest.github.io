document.addEventListener("DOMContentLoaded", () => {
  const GRADES = ["0", "10", "20", "35", "50", "70", "100"];
  const STEP_INTERVAL_MS = 150;

  // ============================================================
  // 1. Klasa .redaction-decay (0 -> 100 przy hover, 100 -> 0 krok po kroku po leave)
  // ============================================================
  document.querySelectorAll(".redaction-decay").forEach((element) => {
    let timer = null;
    let stepIndex = 0;

    element.addEventListener("mouseenter", () => {
      clearInterval(timer); // Zatrzymujemy ewentualne cofanie
      timer = setInterval(() => {
        if (stepIndex < GRADES.length - 1) {
          stepIndex++;
          element.setAttribute("data-grade", GRADES[stepIndex]);
        } else {
          clearInterval(timer);
        }
      }, STEP_INTERVAL_MS);
    });

    element.addEventListener("mouseleave", () => {
      clearInterval(timer); // Zatrzymujemy stoper degradacji
      timer = setInterval(() => {
        if (stepIndex > 0) {
          stepIndex--; // Krok w tył!
          element.setAttribute("data-grade", GRADES[stepIndex]);
        } else {
          clearInterval(timer); // Osiągnięto wyjściowy font 0
        }
      }, STEP_INTERVAL_MS);
    });
  });

  // ============================================================
  // 2. Klasa .redaction-repair (100 -> 0 przy hover, 0 -> 100 przy leave)
  // ============================================================
  document.querySelectorAll(".redaction-repair").forEach((element) => {
    let timer = null;
    let stepIndex = GRADES.length - 1; // Start od indeksu 6 ('100')

    element.addEventListener("mouseenter", () => {
      clearInterval(timer); // Zatrzymujemy ponowne psucie
      timer = setInterval(() => {
        if (stepIndex > 0) {
          stepIndex--; // Naprawiamy tekst do gładkiego fontu
          element.setAttribute("data-grade", GRADES[stepIndex]);
        } else {
          clearInterval(timer);
        }
      }, STEP_INTERVAL_MS);
    });

    element.addEventListener("mouseleave", () => {
      clearInterval(timer); // Zatrzymujemy proces naprawy
      timer = setInterval(() => {
        if (stepIndex < GRADES.length - 1) {
          stepIndex++; // Ponownie degradujemy tekst do 100
          element.setAttribute("data-grade", GRADES[stepIndex]);
        } else {
          clearInterval(timer);
        }
      }, STEP_INTERVAL_MS);
    });
  });
});
// Cyan (180°), Magenta (300°), Yellow (60°)
const cmyHues = [180, 300, 60];

const WHITE_HOLD = 30000; // 30 seconds
const CMY_HOLD = 1000; // 1 second
const TOTAL_CYCLE = WHITE_HOLD + CMY_HOLD; // 31 seconds

function alternateWhiteCMY(timestamp) {
  const completedCycles = Math.floor(timestamp / TOTAL_CYCLE);
  const timeInCycle = timestamp % TOTAL_CYCLE;

  let color;

  if (timeInCycle < WHITE_HOLD) {
    // 30-Second Phase: Pure White
    color = "hsl(0deg 0% 100%)";
  } else {
    // 1-Second Phase: Alternates Cyan -> Magenta -> Yellow
    const currentHue = cmyHues[completedCycles % cmyHues.length];
    color = `hsl(${currentHue}deg 100% 50%)`;
  }

  document.documentElement.style.setProperty("--dynamic-color", color);

  requestAnimationFrame(alternateWhiteCMY);
}

requestAnimationFrame(alternateWhiteCMY);

const themeToggleBtn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

// Przywracanie zapisanego motywu
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
}

// Przełączanie motywów
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Zapis do localStorage
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Zapobiega przeładowaniu strony

    // Pobranie wartości
    const emailValue = document.getElementById("email").value;
    const subjectValue = document.getElementById("subject").value;

    // Podstawowa weryfikacja (dodatkowo oprócz walidacji HTML5 w atrybutach)
    if (emailValue.includes("@") && subjectValue !== "") {
      alert("Dziękujemy za wiadomość! Odezwiemy się wkrótce.");
      contactForm.reset(); // Czyszczenie formularza po wysłaniu
    } else {
      alert("Proszę poprawnie wypełnić wszystkie pola.");
    }
  });
}
