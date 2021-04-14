window.onload = pageload;
function pageload() {
  document.querySelector(".sign-in-btn").onclick = readValues;
  //   alert("hi");
}

function readValues() {
  // selectors
  let topInput = document.querySelector(".top");
  let middleInput = document.querySelector(".middle");
  let bottomInput = document.querySelector(".bottom");
  let passwordInput = document.querySelector(".wrong-password");

  let top = topInput.value.toLowerCase();
  let middle = middleInput.value.toLowerCase();
  let bottom = bottomInput.value.toLowerCase();
  console.log(top);

  if (top == "") {
    return alert("Please enter a correct Full Name");
    wrongMessage(passwordInput, "Please enter a correct Full Name");
  }

  if (middle === "student" && bottom !== "student") {
    wrongMessage(
      passwordInput,
      "Please enter a correct password if you're a student"
    );
  } else if (middle === "teacher" && bottom !== "teacher") {
    wrongMessage(
      passwordInput,
      "Please enter a correct password if you're a teacher"
    );
  } else if (middle === "admin" && bottom !== "admin") {
    wrongMessage(
      passwordInput,
      "Please enter a correct password if you're a admin"
    );
  } else {
    correctMessage(passwordInput);
    if (middle === "student") {
      document.querySelector(".sign-in-btn").classList.toggle("hidden");
      document.querySelector(".stu-to-site").classList.toggle("hidden");
    } else {
      document.querySelector(".sign-in-btn").classList.toggle("hidden");
      document.querySelector(".to-site").classList.toggle("hidden");
    }
  }

  console.log(top, middle, bottom);
}

function wrongMessage(replace, message) {
  replace.innerHTML = message;
  replace.style.color = "red";
}
function correctMessage(replace) {
  replace.innerHTML = "Correct!";
  replace.style.color = "green";
}
