const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");

const sendButton = document.querySelector("#send");
const form = document.querySelector("#form");
const resetButton = document.querySelector("#resetBtn");

// RegExp for email validation
const regExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", deactivateSend);

  email.addEventListener("blur", validateForm);
  subject.addEventListener("blur", validateForm);
  message.addEventListener("blur", validateForm);

  // Send email
  sendButton.addEventListener("click", sendEmail);

  // Reset form
  resetButton.addEventListener("click", resetForm);
}

function deactivateSend() {
  sendButton.disabled = true;
  sendButton.classList.remove("btn_activate");
  sendButton.classList.add("btn_deactivate");
}

function activateSend() {
  sendButton.disabled = false;
  sendButton.classList.remove("btn_deactivate");
  sendButton.classList.add("btn_activate");
}

function resetForm(e) {
  e.preventDefault();
  form.reset();
  deactivateSend();
}

function sendEmail(e) {
  e.preventDefault();
  console.log("Sending email...");
  const modal = document.querySelector("#loaderModal");
  const loader = document.querySelector("#loader");
  const confirmation = document.querySelector("#confirmation");

  modal.style.display = "flex";

  setTimeout(() => {
    resetForm(e);
    deactivateSend();
    loader.style.display = "none";
    confirmation.style.display = "flex";
    setTimeout(() => {
      console.log("Email sent");
      confirmation.style.display = "none";
      modal.style.display = "none";
    }, 3000); // Wait for 5 seconds
  }, 2000); // Wait for 3 seconds
}

function validateForm(e) {
  const field = e.target;
  if (field.value.length > 0) {
    validateInput(field);
  } else {
    showError(field);
  }

  if (field.value.length > 0 && field.type === "email") {
    validateEmail(field);
  }

  if (
    regExp.test(email.value) &&
    email.value !== "" &&
    subject.value !== "" &&
    message.value !== ""
  ) {
    activateSend();
  } else {
    deactivateSend();
    console.log("All fields are required");
  }
}

function validateInput(field) {
  field.classList.remove("input_error");
}

function showError(field) {
  field.classList.add("input_error");
}

function validateEmail(field) {
  const emailMessage = field.value.toLowerCase();

  if (regExp.test(emailMessage)) {
    validateInput(field);
    console.log("Valid email");
  } else {
    showError(field);
    console.log("Invalid email");
  }
}
