$(document).ready(function () {

	var friendsList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "brunofin"];

	var buildListFrame = function () {
		for (x = 0; x < friendsList.length; x++) {
			$("body").append(
				"<div class='stream' id='stream" + x + "'>" +
				"<div class ='img-container'><a href='' target='_blank' class='stream-link' alt=''><img src='#' alt='' class='user-img'></a></div>" +
				"<div class='text-container'><a href='#' target='_blank' class='stream-link' alt=''><p class='username'></p></a>" +
				"<p class='user-status'></p></div>" +
				"<div class='icon'><span class='fa-stack fa-lg'><i class='fa fa-circle fa-stack-2x indicator'></i><i class='fa fa-video-camera fa-stack-1x fa-inverse'></i></span></div>" +
				"</div>"

			);
		}
		
	};

	var getStreams = function () {
		friendsList = friendsList.sort();

		friendsList.forEach(function (val, index) {
			
			$.getJSON("https://api.twitch.tv/kraken/streams/" + val + "?callback=?", function (data) {
				var streamID = "#stream" + friendsList.indexOf(val);
				$(streamID + ">.text-container>a>.username").append(val);
				
				if (data.hasOwnProperty("error")) {

					$(streamID).addClass("offline");
					$(streamID + ">.img-container>a>.user-img").replaceWith("<div class='user-img-replace'></div>");
					$(streamID + ">.text-container>.user-status").append("Account closed");
					$(streamID + ">.icon>span>.indicator").css("color", "#AAA");

				} else if (data.stream === null) {

					$(streamID).addClass("offline");
					$(streamID + ">.text-container>.user-status").append("Offline");
					$(streamID + ">.text-container>.stream-link").attr("href", "https://www.twitch.tv/" + val);
					$(streamID + ">.img-container>.stream-link").attr("href", "https://www.twitch.tv/" + val);
					$(streamID + ">.icon>span>.indicator").css("color", "red");

					$.getJSON("https://api.twitch.tv/kraken/users/" + val, function (uData) {

						var uPic = uData.logo;
						$(streamID + ">.img-container>a>.user-img").attr("src", uPic);

					});

				} else {

					var streamStatus = data.stream.channel.status;
					var uPic = data.stream.channel.logo;
					
					if (streamStatus.length > 45) {
						
						
      					streamStatus = streamStatus.substr(0, 42);
    					
    					streamStatus += "...";
						
					}
					
					$(streamID).addClass("online");
					$(streamID + ">.text-container>.user-status").append(streamStatus);
					$(streamID + ">.img-container>a>.user-img").attr("src", uPic);
					$(streamID + ">.text-container>.stream-link").attr("href", "https://www.twitch.tv/" + val);
					$(streamID + ">.img-container>.stream-link").attr("href", "https://www.twitch.tv/" + val);
					$(streamID + ">.icon>span>.indicator").css("color", "green");

				}

			}); //getJSON

		}); //forEach

	}; //end getStream() 

	
	buildListFrame();
	getStreams();
	
	
	$("#all").on("click", function(){
		$("#all").css("background-color", "#AAA");
		$("#online").css("background-color", "");
		$("#offline").css("background-color", "");
		$(".stream").show(500);
	});
	
	$("#online").on("click", function(){
		$("#online").css("background-color", "#AAA");
		$("#all").css("background-color", "");
		$("#offline").css("background-color", "");
		$(".online").show(500);
		$(".offline").hide(500);
	});
	
	$("#offline").on("click", function(){
		$("#offline").css("background-color", "#AAA");
		$("#online").css("background-color", "");
		$("#all").css("background-color", "");
		$(".offline").show(500);
		$(".online").hide(500);
	});
	
	$("#all").css("background-color", "#AAA");

}); //end document
