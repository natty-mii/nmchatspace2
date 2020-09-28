$(function () {
  function buildHTML(message) {
    if (message.image) {
      let html = `<div class="message-box" data-message-id=${message.id}>
                    <div class="message-info">
                      <div class="message-info__post-name">
                        ${message.user_name}
                      </div>
                      <div class="message-info__post-date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message">
                      <p class="message__content">
                        ${message.content}
                      </p>
                      <img class="message_image" src="${message.image}">
                    </div>
                  </div>`
      return html;
    } else {
      let html = `<div class="message-box" data-message-id=${message.id}>
                    <div class="message-info">
                        <div class="message-info__post-name">
                          ${message.user_name}
                        </div>
                        <div class="message-info__post-date">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="message">
                        <p class="message__content">
                          ${message.content}
                        </p>
                    </div>
                  </div>`
      return html;
    };
  }

  $('.new-message').on('submit', function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        let html = buildHTML(data);
        $('.message-list').append(html);
        $('form')[0].reset();
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight });
        $('.submit-btn').prop("disabled", false);
      })
      .fail(function () {
        alert("メッセージ送信に失敗しました");
        $('.submit-btn').prop("disabled", false);
      });
  });
});
