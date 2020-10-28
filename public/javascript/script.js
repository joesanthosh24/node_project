$(document).ready(() => {
  $(".name").on('click', selectRoom);
});

const selectRoom = function() {
  const id = $(this).attr("id").split("-")[1];
  const chat = $('.chat__messages');
  const chatBottom = chat.children('.chat__chatBottom');
  const chatTop = chat.children('.chat__chatBox');

  chatBottom.addClass('chatBottom__show');
  chatBottom.children('button').removeClass('disabled');
}
