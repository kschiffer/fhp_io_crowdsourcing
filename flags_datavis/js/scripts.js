// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c');

var originX = 0;
var originY = 0;

amplitudes = [10, 10, 10, 10, 10]; // order = aggressive, peaceful, beautiful, mysterious, unattractive
amplification = 2.8;
//degrees = [-144, 72, -72, 144, 0];
degrees = [-2.513, -1.257, 0, 1.257, 2.513]; // in radians
degreeOffset = 1.571; // 90deg


var startPoints = [
    {x: originX + Math.cos(degrees[0]+degreeOffset) * (amplitudes[0]*amplification), y: originY - Math.sin(degrees[0]+degreeOffset) * (amplitudes[0]*amplification)},
    {x: originX + Math.cos(degrees[1]+degreeOffset) * (amplitudes[1]*amplification), y: originY - Math.sin(degrees[1]+degreeOffset) * (amplitudes[1]*amplification)},
    {x: originX + Math.cos(degrees[2]+degreeOffset) * (amplitudes[2]*amplification), y: originY - Math.sin(degrees[2]+degreeOffset) * (amplitudes[2]*amplification)},
    {x: originX + Math.cos(degrees[3]+degreeOffset) * (amplitudes[3]*amplification), y: originY - Math.sin(degrees[3]+degreeOffset) * (amplitudes[3]*amplification)},
    {x: originX + Math.cos(degrees[4]+degreeOffset) * (amplitudes[4]*amplification), y: originY - Math.sin(degrees[4]+degreeOffset) * (amplitudes[4]*amplification)}
];



  var clonedStartPoints = startPoints.map(function(o){
    return fabric.util.object.clone(o);
  });

var polygon = new fabric.Polygon(clonedStartPoints, {
    left: 378, // absolute center: 421
    top: 344, // absolute center: 327
    fill: 'rgba(255,255,255,.1)',
    stroke: '#d1d1d1', strokeWidth:4,
    selectable: false,
    originX: 'left',
    originY: 'left'
  });
  canvas.add(polygon);
  animate(startPoints,1);
  polygon.setShadow({color: 'rgba(0,0,0,1)', blur: '30px'})
  
function animatePoint(i, prop, endPoints, duration) {
    fabric.util.animate({
      startValue: polygon.points[i][prop],
      endValue: endPoints[i][prop],
      duration: duration,
      easing: fabric.util.ease['easeInOutQuint'],
      onChange: function(value) {
        polygon.points[i][prop] = value;
        // only render once
        if (i === startPoints.length - 1 && prop === 'y') {
          canvas.renderAll();
        }
      },
      onComplete: function() {
        polygon.setCoords();
        // only start animation once
        if (i === startPoints.length - 1 && prop === 'y') {
          animate(endPoints,duration);
        }
      }
    });
  }

  function animate(points, duration) {
    for (var i = 0, len = amplitudes.length; i < len; i++) {
      animatePoint(i, 'x', points, duration);
      animatePoint(i, 'y', points, duration);
    }
  }

  var even = true;

$("div.canvas-container").css("margin","auto");

$("div.country-info").click(function(){
	$(this).fadeOut();
});

function centerFlagChooser(){
	centererHeight = $('div.stage div.flag-chooser div.centerer').height();
	parentHeight = $('div.stage div.flag-chooser').height();
	$('div.stage div.flag-chooser div.centerer').css("top", parentHeight/2-(centererHeight/2));
}

$( window ).resize(function() {
	centerFlagChooser();
});
  
$.ajax({url:"getresults.ajax.php",dataType: 'json'}).done(function(data){
	results = data;
	
	$.each(results['flagsWithData'], function(index,value){
		$('<a href="#" title='+value+'><img src="img/flags/'+value+'.png" /></a>').appendTo("div.flag-chooser div.flag-container");
	});
	
	$("div.centerer span.datasets").html("Statistic based on "+results['dataSets']+" datasets");
	
	centerFlagChooser();
	
	$("div.flag-chooser").on("click", "a", function(e){
		e.preventDefault();
		var country = $(this).attr("title");
		
		if ($(this).hasClass("active")) {
			$("div.country-info").fadeOut();
			$(this).removeClass("active");
			return;
		}
		
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		
		
		if (country in results['mostThreatening']) {
			threateningValue = 10 + (results['mostThreatening'][country] / results['maxThreatening'])*100;
			threateningValue = threateningValue.toFixed(2);
			threateningNominal = results['mostThreatening'][country];
		} else {
			threateningValue = 10;
			threateningNominal = 0;	
		}
		
		if (country in results['mostPeaceful']) {
			peacefulValue = 10 + (results['mostPeaceful'][country] / results['maxPeaceful'])*100;
			peacefulValue = peacefulValue.toFixed(2);
			peacefulNominal = results['mostPeaceful'][country];
		} else {
			peacefulValue = 10;
			peacefulNominal = 0;
		}
		
		if (country in results['mostBeautiful']) {
			beautifulValue = 10 + (results['mostBeautiful'][country] / results['maxBeautiful'])*100;
			beautifulValue = beautifulValue.toFixed(2);
			beautifulNominal = results['mostBeautiful'][country];
		} else {
			beautifulValue = 10;
			beautifulNominal = 0;
		} 
		
		if (country in results['mostMysterious']) {
			mysteriousValue = 10 + (results['mostMysterious'][country] / results['maxMysterious'])*100;
			mysteriousValue = mysteriousValue.toFixed(2);
			mysteriousNominal = results['mostMysterious'][country];
		} else {
			mysteriousValue = 10;
			mysteriousNominal = 0;
		}
		
		if (country in results['mostUgly']) {
			uglyValue = (results['mostUgly'][country] / results['maxUgly'])*100;
			uglyValue = uglyValue.toFixed(2);
			uglyNominal = results['mostUgly'][country];
		} else {
			uglyValue = 10;
			uglyNominal = 0;
		}
		
		$("div.country-info h3").html(country.replace("_", " "));
		$("div.country-info img").attr("src", "img/flags/"+country+".png");
		$("div.country-info table").html('<tr><th>Criteria</th><th>Percentage</th><th>Nominal</th></tr><tr><td>Beautiful</td><td>'+String(beautifulValue-10)+'%</td><td>'+String(beautifulNominal)+'</td></tr><tr><td>Peaceful</td><td>'+String(peacefulValue-10)+'%</td><td>'+String(peacefulNominal)+'</td></tr><tr><td>Aggressive</td><td>'+String(threateningValue-10)+'%</td><td>'+String(threateningNominal)+'</td></tr><tr><td>Unattractive</td><td>'+String(uglyValue-10)+'%</td><td>'+String(uglyNominal)+'</td></tr><tr><td>Mysterious</td><td>'+String(mysteriousValue-10)+'%</td><td>'+String(mysteriousNominal)+'</td></tr>');
		$("div.country-info").show();
		appendElement = $("div.country-info");
		var posLeft = ($(this).offset().left - (appendElement.find("img").outerWidth()/2) + ($(this).outerWidth()/2)) - 2;
		var posTop = $(this).offset().top - appendElement.outerHeight()-25;
		if (posTop < 5) {
			posTop = $(this).offset().top + 25;
			$("div.country-info span.down-arrow").hide();
			$("div.country-info span.up-arrow").show();
		} else {
			$("div.country-info span.down-arrow").show();
			$("div.country-info span.up-arrow").hide();
		}
		appendElement.css("opacity",0).delay(100).offset({left: posLeft, top: posTop}).animate({opacity:1, top: "+=10"},{duration: 200});
		
		amplitudes = [threateningValue, peacefulValue, beautifulValue, mysteriousValue, uglyValue];
		var coords = [
		    {x: originX + Math.cos(degrees[0]+degreeOffset) * (amplitudes[0]*amplification), y: originY - Math.sin(degrees[0]+degreeOffset) * (amplitudes[0]*amplification)},
		    {x: originX + Math.cos(degrees[1]+degreeOffset) * (amplitudes[1]*amplification), y: originY - Math.sin(degrees[1]+degreeOffset) * (amplitudes[1]*amplification)},
		    {x: originX + Math.cos(degrees[2]+degreeOffset) * (amplitudes[2]*amplification), y: originY - Math.sin(degrees[2]+degreeOffset) * (amplitudes[2]*amplification)},
		    {x: originX + Math.cos(degrees[3]+degreeOffset) * (amplitudes[3]*amplification), y: originY - Math.sin(degrees[3]+degreeOffset) * (amplitudes[3]*amplification)},
		    {x: originX + Math.cos(degrees[4]+degreeOffset) * (amplitudes[4]*amplification), y: originY - Math.sin(degrees[4]+degreeOffset) * (amplitudes[4]*amplification)}
		];
		animate(coords,1000);
	});
});

