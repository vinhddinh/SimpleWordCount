document.addEventListener("DOMContentLoaded", function () {
  function updateWordCount() {
    chrome.runtime.sendMessage({ action: "updateWordCount" });
    chrome.tabs.executeScript(
      {
        code: "window.getSelection().toString();",
      },
      function (selection) {
        var words = selection[0].split(" ");
        var count = words.length;
        document.getElementById("count").innerHTML = "Words: " + count;
      }
    );
  }

  // Update the word count when the popup is opened
  updateWordCount();

  // Update the word count whenever the selection changes
  document.addEventListener("selectionchange", updateWordCount);
});
