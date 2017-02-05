chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval)
			
			let sites = "";
			let list = [];
			let xhr = new XMLHttpRequest()
			xhr.open('GET', 'http://timsmith.xyz/sites.txt', true)
    		xhr.onload = () => {
      			if (xhr.status >= 200 && xhr.status < 400) {
        			sites = xhr.response;
					console.log(xhr.response);
					list = sites.split(/\n/);
					if (sites.includes(document.URL.split('/')[2])) {
						let iframe = document.createElement("IFRAME");
						iframe.setAttribute("src", 'data:text/plain,');
						document.documentElement.appendChild(iframe);
						window.frames[0].window.alert("Hold up there, friend. This site is known to use Alternative Facts™, so you probably shouldn't listen to anything you read here.");
						iframe.parentNode.removeChild(iframe)
            		}
      			}
    		}
    		xhr.send()            
        }
    }, 10)
})