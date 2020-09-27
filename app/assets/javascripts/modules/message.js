$(function () {
  function buildHTML(message) {
    if (message.image) {
      let html =
        `<div class="messageBox">
          <div class="userAndDate">
            <div class="postUser">
              ${message.user_name}
            </div>
            <div class="postDate">
              ${message.created_at}
            </div>
          </div>
          <div class="postMessage">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="postImage" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="messageBox">
          <div class="userAndDate">
            <div class="postUser">
              ${message.user_name}
            </div>
            <div class="postDate">
              ${message.created_at}
            </div>
          </div>
          <div class="postMessage">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  $(".new-message").on("submit", function (e) {
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: "json",
      processData: false,
      contenttype: false
    })
      .done(function (data) {
        let html = buildHTML(data);
    })
  });
});
