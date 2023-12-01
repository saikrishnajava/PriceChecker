chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo && changeInfo.status === 'complete' && tab && tab.url && tab.url.includes('amazon.com')) {
    chrome.tabs.executeScript(tabId, { file: 'contentScript.js' });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'displayPrice') {
    chrome.browserAction.setPopup({ popup: 'popup.html' });
    chrome.browserAction.setBadgeText({ text: request.price.toString() });
  }
});
