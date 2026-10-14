const url = "index.html";

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
		chrome.tabs.create({ url: url });
    }
});

chrome.browserAction.onClicked.addListener(function(activeTab)
{
    chrome.tabs.create({ url: url });
});
