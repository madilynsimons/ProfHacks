chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
			if(!document.URL.includes('file://')) {
				clearInterval(readyStateCheckInterval)
				let sites = "";
				let list = [];
				let xhr = new XMLHttpRequest()
				xhr.open('GET', 'http://crookednews.net.s3-website-us-east-1.amazonaws.com/sites.txt', true)
				xhr.onload = () => {
					if (xhr.status >= 200 && xhr.status < 400) {
						sites = xhr.response;
						console.log(xhr.response);
						list = sites.split(/\n/);
						if (sites.includes(document.URL.split('/')[2])) {
							alert("Hold up there, friend. This site is known to use Alternative Facts™, so you probably shouldn't listen to anything you read here.")
						}
					}
				}
				xhr.send()            
			}
        }
    }, 10)
})