// touchdown || ex-nihilo || May 2013


// google analytics
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-3033286-18']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();


// dust
   function dustMethod() {
	$("#dust").animate({backgroundPosition: '2560px 0'}, 15000, 'linear', function() {
	$("#dust").css("background-position","0 0")
	});
   }
    dustMethod();
    setInterval(dustMethod, 15100);


// curtains || welcome
	$(document).ready(function(){

	$("#curtains").delay(4000).slideToggle(3000);
	$("#welcome").delay(1600).animate({top: "0", opacity: "show"}, "slow");
		
	$("#welcome").hover(function(){
	//$("#welcome .intro").stop().animate({left: "-15"}, "slow");
	//$("#welcome span").stop().animate({left: "15"}, "slow");
	}, function() {
	//$("#welcome .intro").stop().animate({left: "0"}, "slow");
	//$("#welcome span").stop().animate({left: "0"}, "slow");
		
		});
	});


// panel
$(document).ready(function() {
	// expander
	$("#open").click(function(){
		$("div#the-panel").slideDown({
		duration: 600, 
		easing: "easeInOutQuart"});
		$("div#overlay").fadeIn({

		duration: 600, 
		easing: "easeInOutQuart"});
	});	
	
	// collapse
	$("#close").click(function(){
		$("div#the-panel").slideUp({
		duration: 600, 
		easing: "easeInOutQuart"});
		
		$("div#overlay").fadeOut(600, "easeInOutQuart", function(){
		});
	});
	
	// switcher
	$("#overlay").click(function () {
		$("div#the-panel").slideUp({
		duration: 600, 
		easing: "easeInOutQuart"});
		
		$("div#overlay").fadeOut(600, "easeInOutQuart", function(){
		});
	});	
});


// panel 2
$(document).ready(function() {
	// expander
	$("#open-2").click(function(){
		$("div#the-panel-2").slideDown({
		duration: 600, 
		easing: "easeInOutQuart"});
		$("div#overlay").fadeIn({

		duration: 600, 
		easing: "easeInOutQuart"});
	});	
	
	// collapse
	$("#close-2").click(function(){
		$("div#the-panel-2").slideUp({
		duration: 600, 
		easing: "easeInOutQuart"});
		
		$("div#overlay").fadeOut(600, "easeInOutQuart", function(){
		});
	});
	
	// switcher
	$("#overlay").click(function () {
		$("div#the-panel-2").slideUp({
		duration: 600, 
		easing: "easeInOutQuart"});
		
		$("div#overlay").fadeOut(600, "easeInOutQuart", function(){
		});
	});
});


// panel 3
$(document).ready(function() {
	// expander
	$("#open-3").click(function(){
		$("div#the-panel-3").slideDown({
		duration: 600, 
		easing: "easeInOutQuart"});
		$("div#overlay").fadeIn({

		duration: 600, 
		easing: "easeInOutQuart"});
	});	
	
	// collapse
	$("#close-3").click(function(){
		$("div#the-panel-3").slideUp({
		duration: 600, 
		easing: "easeInOutQuart"});
		
		$("div#overlay").fadeOut(600, "easeInOutQuart", function(){
		});
	});
	
	// switcher
	$("#overlay").click(function () {
		$("div#the-panel-3").slideUp({
		duration: 600, 
		easing: "easeInOutQuart"});
		
		$("div#overlay").fadeOut(600, "easeInOutQuart", function(){
		});
	});
});


// twitter ticker
      jQuery(function($){
        $("#ticker").tweet({
          username: "enihilo",
          page: 1,
          avatar_size: 0,
          count: 20,
          loading_text: "loading"
        }).bind("loaded", function() {
          var ul = $(this).find(".tweet_list");
          var ticker = function() {
            setTimeout(function() {
              ul.find('li:first').animate( {marginTop: '-70px'}, 500, function() {
                $(this).detach().appendTo(ul).removeAttr('style');
              });
              ticker();
            }, 8000);
          };
          ticker();
        });
      });


// social media
/*
* Author: Marco Kuiper (http://www.marcofolio.net/)
*/

$(document).ready(function()
{
	// hide the tooltips
	$("#social-media li").each(function() {
		$("a strong", this).css("opacity", "0");
	});
	
	$("#social-media li").hover(function() { // mouse over
		$(this)
			.stop().fadeTo(500, 1)
			.siblings().stop().fadeTo(500, 0.2);
			
		$("a strong", this)
			.stop()
			.animate({
				opacity: 1,
				top: "-10px"
			}, 300);
		
	}, function() { // mouse out
		$(this)
			.stop().fadeTo(500, 1)
			.siblings().stop().fadeTo(500, 1);
			
		$("a strong", this)
			.stop()
			.animate({
				opacity: 0,
				top: "-1px"
			}, 300);
	});
});