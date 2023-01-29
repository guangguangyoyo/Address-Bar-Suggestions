async function suggestion(text, suggestCallback) {
  console.log(text);
  suggestCallback([
    { content: "jd", description: "www.jd.com" },
    { content: "suggestion2", description: "Description2" }
  ]);
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});
chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  await chrome.action.setBadgeText({
    text: nextState,
  });
  if (nextState === 'ON') {
    chrome.omnibox.onInputChanged.addListener(suggestion);
  } else {
    chrome.omnibox.onInputChanged.removeListener(suggestion);
  }
  // console.log(nextState);
});
// chrome.omnibox.onInputChanged.addListener(suggestion);