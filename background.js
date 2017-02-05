chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "http://crookednews.net/";
  chrome.tabs.create({ url: newURL });
});
