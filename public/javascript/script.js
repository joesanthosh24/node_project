let selectedRoomID = "";

$(document).ready(() => {
  $(".name").on("click", selectRoom);
  $(".send-btn").on("click", sendMessage)
});

const selectRoom = function () {
  const id = $(this).attr("id").split("-")[1];
  const xhttp = new XMLHttpRequest();

  xhttp.open("POST", "/enterRoom", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(`roomID=${id}`);
  selectedRoomID = id;
  const chat = $(".chat__messages");
  const chatBottom = chat.children(".chat__chatBottom");
  const chatTop = chat.children(".chat__chatBox");

  chatBottom.addClass("chatBottom__show");
  chatBottom.children("div").removeClass("disabled");
};

const sendMessage = function () {
  const message = $("#message").val();
  const userEamil = $("#user-email").text();
  console.log(message);
  console.log(selectedRoomID);

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/addMessage", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(`message=${message}&roomID=${selectedRoomID}&user=${userEamil}`);

  $("#message").val("");
}
