$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    const charCount = this.nextElementSibling.childNodes[3];
    charCount.value = 140 - this.value.length;
    if (charCount.value < 0) {
      $(charCount).addClass("overLength");
    } else {
      $(charCount).removeClass("overLength");
    }
  });
});