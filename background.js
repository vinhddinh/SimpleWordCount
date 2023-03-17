function updateWordCount(tabId) {
  chrome.tabs.executeScript(
    {
      code: "window.getSelection().toString();",
    },
    (selection) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }

      const wordCount = countWords(selection[0]);
      chrome.browserAction.setBadgeText({
        text: wordCount.toString(),
        tabId: tabId,
      });
      chrome.browserAction.setBadgeBackgroundColor({
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
