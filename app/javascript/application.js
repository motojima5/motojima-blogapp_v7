// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";

import "trix";
import "@rails/actiontext";

import $ from "jquery";
window.$ = $;
window.jQuery = $;

import axios from "axios";

document.addEventListener("turbo:load", () => {
  const dataset = $('#article-show').data()
  // console.log(dataset);
  const articleId = dataset.articleId
  axios.get(`/articles/${articleId}/like`)
    .then((response) => {
      const hasLiked = response.data.hasLiked
      if (hasLiked) {
        $('.active-heart').removeClass('hidden')
      } else {
        $('.inactive-heart').removeClass('hidden')
      }
    })
});
