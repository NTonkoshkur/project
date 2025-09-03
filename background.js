chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create ({
        id: "translate",
        title: "Перевести этот текст",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translate" && info.selectionText) {
        chrome.storage.local.set({ selectedText: info.selectionText }, () => {
            chrome.action.openPopup();
        });
    }
});