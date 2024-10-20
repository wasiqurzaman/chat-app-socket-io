
const socket = io("http://localhost:3300");

const inputName = document.querySelector(".input-name")
const msgContainer = document.querySelector(".message-container");
const msgForm = document.querySelector(".msg-form");
const msgInput = document.querySelector(".msg-input-text");
const usersNum = document.querySelector("h2.user-num");
const msgFeedback = document.querySelector(".msg-feedback");

const incomingMsgTone = new Audio("/message-pop-alert.mp3");

socket.on("client-nums", (data) => {
  console.log(data);
  usersNum.textContent = `Total users online: ${data}`;
});

msgForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = {
    message: msgInput.value,
    username: inputName.value,
    dateTime: dateFns.format(new Date(), "dd MMM hh:mm")
  }

  if (!msgInput.value) return;
  sendMessage(data);
  updateUI(data, "msg-own");
  scrollToBottom();
});

function sendMessage(data) {
  socket.emit("clientMessage", data);
  msgInput.value = "";
}

function updateUI(data, type) {
  const html = `
  <div class="msg-box ${type}">
    <p class="msg-text">${data.message}</p>
    <span class="msg-info">
      <span class="msg-author">${data.username}</span>
      <i class="fa-solid fa-circle"></i>
      <span class="msg-time">${data.dateTime}</span>
    </span>
  </div>
  `
  msgFeedback.insertAdjacentHTML("beforebegin", html);
}

function scrollToBottom() {
  msgContainer.scrollTo(0, msgContainer.scrollHeight);
}

socket.on("serverMessage", (data) => {
  console.log(data);
  updateUI(data, "msg-other");
  incomingMsgTone.play();
  scrollToBottom();
});

msgInput.addEventListener("focus", function () {
  socket.emit("feedback", { feedback: `${inputName.value} is typing` })
});

msgInput.addEventListener("keypress", function () {
  socket.emit("feedback", { feedback: `${inputName.value} is typing` })
});

msgInput.addEventListener("blur", function () {
  socket.emit("feedback", { feedback: `` })
});

socket.on("serverFeedback", (data) => {
  msgFeedback.textContent = data.feedback;
});