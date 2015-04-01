questionNumber = 1;

$(document).ready(function(){
	
	$("div.holder img").click(function(e){	
		e.preventDefault();
		if ($(this).hasClass("selected")) {
			$(this).removeClass("selected");
			$("div.holder img").css("opacity",1);
			$("div.bottom").animate({bottom: "-100px"},250);
		} else {
			$("div.holder img").removeClass("selected");
			$("div.holder img").css("opacity", 0.5);
			$(this).addClass("selected").css("opacity",1);
			$("div.bottom").animate({bottom: "0px"},250);
		}
	});
	
	$("a.cancel").click(function(e){
		e.preventDefault();
		$("div.holder img.selected").click();
	});
	
	$("a.submitter").click(function(e){
		e.preventDefault();
		stateName = $("div.holder img.selected").attr("src");
		stateName = stateName.substring(6, stateName.length -4);
		$.post('ajax.php', {Function: 'saveResult', Data: {state: stateName, questionNumber: questionNumber}}, function(data) {
			if (data != "0") {
				$("html, body").animate({scrollTop:0},1000);
				$("div.bottom").animate({bottom: "-100px"},250);
				$(this).removeClass("selected");
				$.post('ajax.php', {Function: 'getNextQuestion', Data: {questionNumber: questionNumber}}, function(data) {
					if (data != "0") {
						$("div.holder img, p, hr").animate({opacity:0});
						$("h2").animate({opacity:0},function(){
							$(this).html(data).delay(500).animate({opacity:1});
							$("div.holder img").removeClass("selected");
							$("div.holder img, p ,hr").delay(2500).animate({opacity:1});
							});
						questionNumber++;
					} else {
						$("p, div.holder, hr").fadeOut();
						$("h2").animate({opacity:0},function(){
							$(this).html("Vielen Dank, Ihre Antworten wurden registriert!").delay(500).animate({opacity:1});
						});
						
					}
				});
			}
		});
	});
	
});


