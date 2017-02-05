chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval)

            const badSites = ['100percentfedup.com']

            if (badSites.includes(document.URL.split('/')[2])) {
              alert("Hold up there, friend. This site is known to use Alternative Facts™, so you probably shouldn't listen to anything you read here.")
            }

        }
    }, 10)
})