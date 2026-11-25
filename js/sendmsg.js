import { supabase } from "./supabase.js";

const form = document.getElementById("message");

if (form) {
  const alertBox = form.querySelector(".alert");
  const submitButton = form.querySelector('button[type="submit"]');

  const showAlert = (message, isError = false) => {
    if (!alertBox) return;

    alertBox.textContent = message;
    alertBox.classList.toggle("error", isError);
    alertBox.style.display = "block";

    clearTimeout(alertBox._hideTimer);
    alertBox._hideTimer = setTimeout(() => {
      alertBox.style.display = "none";
      alertBox.classList.remove("error");
    }, 5000);
  };

  const value = (id) => (document.getElementById(id)?.value || "").trim();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = {
      name: value("name"),
      email: value("emailid"),
      phone: value("phone") || null,
      subject: value("subject") || null,
      message: value("msgContent"),
    };

    if (!payload.name || !payload.email || !payload.message) {
      showAlert("Please fill in your name, email, and message.", true);
      return;
    }

    const originalLabel = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = "<span>Sending...</span>";

    const { error } = await supabase.from("contact_messages").insert(payload);

    submitButton.disabled = false;
    submitButton.innerHTML = originalLabel;

    if (error) {
      console.error("Contact form error:", error.message);
      showAlert("Your message could not be sent. Please try again.", true);
      return;
    }

    form.reset();
    showAlert("Your message has been successfully sent.");
  });
}
