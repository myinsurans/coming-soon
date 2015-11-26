$(window).load(function(){	
	setTimeout('doneLoad()', 1500);	
});

function doneLoad(){	$('.QOverlay').fadeOut('fast', function(){		$(this).remove();	});}