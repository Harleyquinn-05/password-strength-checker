const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strengthText");
const suggestionsList = document.getElementById("suggestions");

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const { strength, className, suggestions } = evaluatePassword(password);

  strengthText.textContent = `Strength: ${strength}`;
  strengthText.className = className;

  suggestionsList.innerHTML = "";
  suggestions.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    suggestionsList.appendChild(li);
  });
});

function evaluatePassword(password) {
  const suggestions = [];
  let score = 0;

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const longEnough = password.length >= 8;

  if (hasLower) score++;
  else suggestions.push("Add lowercase letters");

  if (hasUpper) score++;
  else suggestions.push("Add uppercase letters");

  if (hasDigit) score++;
  else suggestions.push("Include numbers");

  if (hasSpecial) score++;
  else suggestions.push("Use special characters (!@#$...)");

  if (longEnough) score++;
  else suggestions.push("Use at least 8 characters");

  let strength = "Very Weak", className = "weak";
  if (score === 5) {
    strength = "Very Strong"; className = "very-strong";
  } else if (score === 4) {
    strength = "Strong"; className = "strong";
  } else if (score === 3) {
    strength = "Moderate"; className = "moderate";
  } else {
    strength = "Weak"; className = "weak";
  }

  return { strength, className, suggestions };
}
const togglePasswordBtn = document.getElementById("togglePasswordBtn");

togglePasswordBtn.addEventListener("click", () => {
  const type = passwordInput.getAttribute("type");
  if (type === "password") {
    passwordInput.setAttribute("type", "text");
    togglePasswordBtn.textContent = "Hide";
  } else {
    passwordInput.setAttribute("type", "password");
    togglePasswordBtn.textContent = "Show";
  }
  
});
