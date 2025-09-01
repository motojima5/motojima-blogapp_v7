// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";

import "trix";
import "@rails/actiontext";

import $ from "jquery";
window.$ = $;
window.jQuery = $;

import axios from "axios";

const handleHeartDisplay = (hasLiked) => {
  if (hasLiked) {
    $('.active-heart').removeClass('hidden')
  } else {
    $('.inactive-heart').removeClass('hidden')
  }
}

document.addEventListener("turbo:load", () => {
  const dataset = $('#article-show').data()
  const articleId = dataset.articleId

  axios.get(`/articles/${articleId}/comments`)
    .then((response) => {
      const comments = response.data
      comments.forEach((comment) => {
        $('.comments-container').append(
          `<div class="article_comment"><p>${comment.content}</p></div>`
        )
      })
    })

  $('.show-comment-form').on('click', () => {
    $('.show-comment-form').addClass('hidden')
    $('.comment-text-area').removeClass('hidden')
  })

  $('.add-comment-button').on('click', () => {
    const content = $('#comment_content').val()
    if (!content) {
      window.alert('コメントを入力してください')
    } else {
      axios.post(`/articles/${articleId}/comments`, { comment: {content: content} }, {
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        }
      })
        .then((res) => {
          const comment = res.data
          $('.comments-container').append(
            `<div class="article_comment"><p>${comment.content}</p></div>`
          )
          $('#comment_content').val('')
        })
    }
  })

  axios.get(`/articles/${articleId}/like`)
    .then((response) => {
      const hasLiked = response.data.hasLiked
      handleHeartDisplay(hasLiked)
    })

  $('.inactive-heart').on('click', () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    axios.post(`/articles/${articleId}/like`, {}, {
      headers: {
        'X-CSRF-Token': csrfToken
      }
    })
      .then((response) => {
        if(response.data.status === 'ok') {
          $('.active-heart').removeClass('hidden')
          $('.inactive-heart').addClass('hidden')
        }
      })
      .catch((e) => {
        window.alert('Error')
        console.log(e);
      })
  })

  $('.active-heart').on('click', () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    axios.delete(`/articles/${articleId}/like`, {
      headers: {
        'X-CSRF-Token': csrfToken
      }
    })
      .then((response) => {
        if(response.data.status === 'ok') {
          $('.active-heart').addClass('hidden')
          $('.inactive-heart').removeClass('hidden')
        }
      })
      .catch((e) => {
        window.alert('Error')
        console.log(e);
      })
  })
});
