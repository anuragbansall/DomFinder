chrome.action.onClicked.addListener(async (tab) => {
  const { isActive } = (await chrome.storage.local.get("isActive")) || {
    isActive: false,
  };

  if (isActive) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        window.cleanupDomFinder && window.cleanupDomFinder();
      },
    });
    await chrome.storage.local.set({ isActive: false });
  } else {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["script.js"],
    });
    await chrome.storage.local.set({ isActive: true });
  }
});
