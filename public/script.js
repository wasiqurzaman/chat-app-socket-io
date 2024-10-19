
const socket = io("http://localhost:3300");

socket.on("client-nums", (data) => {
  console.log(data);
  usersNum.textContent = `Total users online: ${data}`;
});

const inputName = document.querySelector(".input-name")
const msgContainer = document.querySelector(".message-container");
const msgForm = document.querySelector(".msg-form");
const msgInput = document.querySelector(".msg-input-text");
const usersNum = document.querySelector("h2.user-num");
const msgFeedback = document.querySelector(".msg-feedback")

msgForm.addEventListener("submit", function (e) {
  e.preventDefault()
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
  msgInput.value = ""
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
  scrollToBottom();
})