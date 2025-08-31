// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails";

import "trix";
import "@rails/actiontext";

import $ from "jquery";
window.$ = $;
window.jQuery = $;

import axios from "axios";


document.addEventListener("turbolinks:load", () => {
  $(".article_title").on("click", () => {
    axios.get("/")
      .then((response) => {
        console.log(response);
      })
  });
});
