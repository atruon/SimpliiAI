export {}


chrome.contextMenus.create({
    title: 'Simpliify',
    contexts: ['selection'],
    id: 'simplify'
})


chrome.contextMenus.onClicked.addListener((clickData) => {
    chrome.action.openPopup();
    if (clickData.menuItemId === "simplify" && clickData.selectionText) {
        chrome.storage.local.set({ popupText: clickData.selectionText})
    }
})
