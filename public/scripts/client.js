/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {
  $(document).ready(function() {
    for (let tweet of tweets) {
      $(".container").append(createTweetElement(tweet));
    }
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  });
}

const createTweetElement = function(tweet) {
  let $tweet = `
    <article class="tweet">
      <header>
        <div>
          <img src=${tweet.user.avatars}>
          <div>${tweet.user.name}</div>
        </div>
        <div>${tweet.user.handle}</div>
      </header>
      <div class="tweet-text">${escape(tweet.content.text)}</div>
      <footer>
        <div>${timeago.format(tweet.created_at)}</div>
        <div class="interact">
          <div>🏁</div>
          <div><i class="fas fa-retweet"></i></div>
          <div>❤️</div>
        </div>
      </footer>
    </article>
  `
  return $tweet;
}

renderTweets(data);

const loadTweets = function() {
  $.ajax("tweets", {method: "GET" })
  .then((tweet) => {
    renderTweets(tweet);
  });
};

const invalidTweet = function() {
  $("#tweet-text").addClass("error");
}

const displayAlert = function(errorMessage) {
  if ($("#error-code").length) {
    return;
  }
  $(`<div id="error-code">${errorMessage}</div>`).appendTo(".error-message");
  $(".alert-overlay").slideDown("slow");
  $("#tweet-text").css("border-bottom-color", "red");
  setTimeout(function() {
    $(".alert-overlay").hide();
    $("#tweet-text").css("border-bottom-color", "");
    $("#error-code").remove();
  }, 5000);
}

$(document).ready(function() {
  $("div.close").click(function() {
    $(".alert-overlay").hide();
    $("#tweet-text").css("border-bottom-color", "");
    $("#error-code").remove();
  });
});

$(document).ready(function() {
  $("form#new-tweet-submit").submit(function(event) {
    event.preventDefault();
    let input = this.childNodes[3];
    if (input.value.length > 140) {
      return displayAlert("Too Many Characters");
    } else if (input.value === "") {
      return displayAlert("Tweet Contents Empty");
    }
    $.post("/tweets", $(this).serialize(), function(data, status) {
      $("#tweet-text").val("");
      $(".counter").val(140);
      $(".container article").remove();
      loadTweets();
    });
  });
});