function updateWordCount(tabId) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabId },
      function: function () {
        const selection = window.getSelection().toString();
        return selection;
      },
    },
    (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }

      const wordCount = countWords(result[0].result);
      chrome.action.setBadgeText({
        text: wordCount.toString(),
        tabId: tabId,
      });
      chrome.action.setBadgeBackgroundColor({
        color: "#E0E0E0",
        tabId: tabId,
      });
    }
  );
}

function countWords(text) {
  if (!text) {
    return "0";
  }
  const words = text.trim().split(/\s+/);
  return words.length;
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  const intervalId = setInterval(() => {
    updateWordCount(activeInfo.tabId);
  }, 100);

  chrome.tabs.onRemoved.addListener((tabId) => {
    if (activeInfo.tabId === tabId) {
      clearInterval(intervalId);
    }
  });
});
