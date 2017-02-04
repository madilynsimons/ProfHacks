    google.load("feeds", "1");

    function initialize() {
      var feed = new google.feeds.Feed("http://gdata.youtube.com/feeds/api/users/CHANNEL_NAME/uploads");
      feed.setNumEntries(10);
      var count = 1;
      feed.load(function(result) {
        if (!result.error) {
          var container = document.getElementById("feed");
          var html = "";
          for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            html = "<h5>" + count++ + ". <a href='" + entry.link + "'>" + entry.title + "</a></h5>";
            var div = document.createElement("div");
            div.innerHTML = html;
            container.appendChild(div);
          }
          document.write(html);
        }
      });
    }
	
	function initElement() {
        var p = document.getElementById("logo");
        // NOTE: showAlert(); or showAlert(param); will NOT work here.
        // Must be a reference to a function name, not a function call.
        p.onclick = showAlert;
      };
	
	function showAlert(event) {
		var msgString = "This website is no bueno.";
		alert(msgString);
	}
	
	
    google.setOnLoadCallback(initialize);
