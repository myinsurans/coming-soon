jQuery(document).ready(function ($) { 

/*************************************/
/************ CUSTOM JS **************/
/*************************************/

/* TABLE OF CONTENTS *****************

Here you can find name and line of each 
section of JS code for this theme:

	1. Navigation................. (21)
	2. Home Revolution Slider..... (80)
	3. Latest Portfolio Slider.... (104)
	4. Latest Blog SLider......... (119)
	5. Blog Posts Slider.......... (154)
	6. Single Portfolio Slider.... (172)
	7. Overlays................... (190)
	8. Pretty Photo Lightbox...... (227)
	9. Vertical Tabs.............. (237)
   10. Latest Tweet............... (261)
   11. Accordion.................. (274)
   12. Tabs....................... (291)
   13. Scroll To Top.............. (313)
   14. Portfolio.................. (332)
   15. Gmap3...................... (375)
   16. Contact Form Validate...... (394)
	
	
*/

/**************** 01 *****************/
/************ NAVIGATION *************/

$('ul.sub-nav').hide();

$('ul.main-navigation li').hover(
function() {
$(this).children('ul.sub-nav').show();
},

function () {
$(this).children('ul.sub-nav').hide();
});

$('ul.sub-sub-nav').hide();
$('ul.sub-nav li').hover(

function() {
$(this).children('ul.sub-sub-nav').show();
},

function () {
$(this).children('.sub-sub-nav').hide();
});

/** Stay Active Until Sub Nav Active **/
$('ul.main-navigation li ul, ul.sub-sub-nav ').hover(

function () {
$(this).parent('li').children('a').addClass('active');
},

function () {
$(this).parent('li').children('a').removeClass('active');
});

/** Responsive Nav **/

$('ul.responsive-menu').hide();
$('.responsive-menu-trigger').click(function() {
	$('ul.responsive-menu').slideToggle();
});

$('ul.responsive-sub-nav').hide();
$('ul.responsive-menu li:has(ul)').children('a').addClass('opened');
$('ul.responsive-menu li').click(
function() {
$(this).children('ul.responsive-sub-nav').slideToggle();

});

$('ul.responsive-sub-sub-nav').hide();
$('ul.responsive-sub-nav li').click(
function(e) {
$(this).children('ul.responsive-sub-sub-nav').slideToggle();
e.stopPropagation();
});


/**************** 02 *****************/
/************ HOME SLIDER ***********/

$('.fullwidthbanner').revolution({
delay:20000,
startwidth:980,
startheight:380,
onHoverStop:"on",						
thumbWidth:100,							
thumbHeight:50,
thumbAmount:3,
hideThumbs:200,
navigationType:"none",					
navigationArrows:"verticalcentered",		
navigationStyle:"round",				
touchenabled:"on",						
navOffsetHorizontal:0,
navOffsetVertical:20,
stopAtSlide:-1,							
stopAfterLoops:-1,						
fullWidth:"off",
shadow:0								
});

/**************** 03 *****************/
/******* LATEST WORK SLIDER *********/

$('#work-slider').flexslider({
controlNav: false, 
animation: "slide",
directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
prevText: "<",           //String: Set the text for the "previous" directionNav item
nextText: ">",  
animationLoop: false ,
controlsContainer: ".recent-controls-work", 
slideshow: false,                //Boolean: Animate slider automatically
slideshowSpeed: 5000 
});

/**************** 04 *****************/
/******* LATEST BLOG SLIDER *********/

$('#blog-slider').flexslider({
controlNav: false, 
animation: "slide",
directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
prevText: "<",           //String: Set the text for the "previous" directionNav item
nextText: ">",  
animationLoop: false ,
controlsContainer: ".recent-controls-blog", 
slideshow: false,                //Boolean: Animate slider automatically
slideshowSpeed: 8000
});

/**************** 05 *****************/
/******* LATEST CLIENT SLIDER ********/

$('#client-slider').flexslider({
controlNav: false, 
animation: "slide",
directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
prevText: "<",           //String: Set the text for the "previous" directionNav item
nextText: ">",  
animationLoop: false ,
controlsContainer: ".recent-controls-clients", 
slideshow: false,                //Boolean: Animate slider automatically
slideshowSpeed: 8000,
animationLoop: false,
itemWidth:300,
itemMargin:0
});

/**************** 06 *****************/
/********* BLOG POSTS SLIDER *********/

$('.blog-slider').flexslider({
controlNav: false, 
animation: "slide",
directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
prevText: "<",           //String: Set the text for the "previous" directionNav item
nextText: ">",  
animationLoop: false ,
controlsContainer: ".recent-controls-blog-post", 
slideshow: false,                //Boolean: Animate slider automatically
slideshowSpeed: 8000,
animationLoop: false,
itemWidth: 0,
itemMargin:0
});

/**************** 07 *****************/
/****** SINGLE PORTFOLIO SLIDER ******/

$('.single-portfolio-slider').flexslider({
controlNav: false, 
animation: "slide",
directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
prevText: "<",           //String: Set the text for the "previous" directionNav item
nextText: ">",  
animationLoop: false ,
controlsContainer: ".recent-controls-portfolio-post", 
slideshow: false,                //Boolean: Animate slider automatically
slideshowSpeed: 8000,
animationLoop: false,
itemWidth: 0,
itemMargin:0
});

/**************** 08 *****************/
/************* OVERLAY ***************/

$('.overlay-icons').animate({
top:'0%',
opacity:0
});
$('.overlay-meta').hide();
$('div.overlay').hover(
function() {
$(this).children('.overlay-container').children('.overlay-icons').stop().animate({
top:'40%',
opacity:1
});
$(this).children('.overlay-container').children('.overlay-meta').stop().slideDown().animate({});
},

function () {
$(this).children('.overlay-container').children('.overlay-icons').stop().animate({
top:'0%',
opacity:0
});
$(this).children('.overlay-container').children('.overlay-meta').stop().slideUp().animate({});
});

$('.video-overlay-meta').hide();
$('div.video-post iframe, .video-overlay-meta').hover(
function() {
$('.video-overlay-meta').stop().slideDown('normal');
},

function () {
$('.video-overlay-meta').stop().slideUp('normal');
});


/**************** 09 *****************/
/*********** PRETTY PHOTO ************/
$("a[data-rel^='prettyPhoto']").prettyPhoto({
hook: 'data-rel',	
social_tools:'',
theme: 'facebook', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
});

/**************** 10 *****************/
/********** VERTICAL TABS ************/

$('ul.vnav').each(function(){
var $active, $content, $links = $(this).find('a');
$active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
$active.parent('li').addClass('active');
$content = $($active.attr('href'));
$links.not($active).each(function () {
$($(this).attr('href')).hide();
});
$(this).on('click', 'a', function(e){ 
$active.parent('li').removeClass('active');
$content.hide('normal');
$active = $(this);
$content = $($(this).attr('href'));
$active.parent('li').addClass('active');
$content.show('normal');
e.preventDefault();
});
});	

/**************** 11 *****************/
/************** TWEET ****************/

$(".tweet").tweet({ // twitter container
    username: "suresh_m", // twitter username
    join_text: "", // text of joining, empty fior this theme
    avatar_size: 40, // 0 avatarsize (no avatar) for this theme
    count: 1, // how many tweets will show
    loading_text: "<h3>Please wait, tweets still loading...</h3>", // message for loading tweets
    refresh_interval: 60000, // refresh rate, how much often tweets udate
    template: "{text}{time}" // template, show text and time of tweets
});

/**************** 12 *****************/
/************ ACCORDION **************/

var $container_accordion = $('.accordion > div'),
    $trigger = $('.accordion > h6');
    $container_accordion.hide();
    //$trigger.first().addClass('active').next().show();
    $trigger.on('click', function (e) {
        if ($(this).next().is(':hidden')) {
            $trigger.removeClass('active').next().slideUp();
            $(this).toggleClass('active').next().slideDown();
        }
    e.preventDefault();
});

/**************** 13 *****************/
/************** TAB *****************/
$('.tab-filter').each(function () {
var $active, $content, $links = $(this).find('a');
$active = $links.first().addClass('active');
$content = $($active.attr('href'));
$links.not(':first').each(function () {
$($(this).attr('href')).hide('fast');
});
$(this).on('click', 'a', function (e) {
$active.removeClass('active');
$content.hide('fast');
$active = $(this);
$content = $($(this).attr('href'));
$active.addClass('active');
$content.slideDown('fast');
e.preventDefault();
});
});


/**************** 14 *****************/
/********** TO TOP SCROLL ***********/

$(window).scroll(function () {
if ($(this).scrollTop() > 20) {
$('.scrollup').fadeIn();
}
else {
$('.scrollup').fadeOut();
}
});

$('.scrollup').click(function () {
$("html, body").animate({
scrollTop: 0
}, 300);
return false;
});

/**************** 15 *****************/
/************ PORTFOLIO *************/

var $container = $('.portfolio');
$container.imagesLoaded( function(){
$container.isotope({
 resizable: false, // disable normal resizing
// set columnWidth to a percentage of container width
masonry: { columnWidth: $container.width() / 12 },
itemSelector : '.item',
animationEngine: 'jquery',
animationOptions: {
duration: 600,
easing: 'linear'}

});
$(window).smartresize(function(){
$container.isotope({
// update columnWidth to a percentage of container width
masonry: { columnWidth: $container.width() / 12 }
});
});	
});

$('.filter a').click(function () {
var selector = $(this).attr('data-filter');
var $this = $(this);
// don't proceed if already selected
if ($this.hasClass('selected')) {
return;
}

var $optionSet = $this.parents('.filter');
// change selected class
$optionSet.find('.selected').removeClass('selected');
$this.addClass('selected');

$container.isotope({
filter: selector
});
return false;
});

/**************** 16 *****************/
/*************** GMAP ****************/

$('.map').gmap3({
action: 'addMarker',
address: "USA, Los Angelos, Street 43",
map: {
mapTypeControl: true,
panControl: true,
zoomControl: true,
scaleControl: true,
center: true,
zoom: 14,
mapTypeId: google.maps.MapTypeId.ROADMAP
}
});

/**************** 17 *****************/
/****** CONTACT FORM VALIDATE ********/

    $('#submit-contact').click(function () {
        $("#contact-form").validate({
            focusInvalid: true,
            errorContainer: ".error-container",
            errorLabelContainer: ".error-container",
            wrapper: "li",
            debug:true,
            rules: {
                name:{
                    minlength: 2,
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                subject:{
                    minlength: 4,
                    required: true
                },
                message:{
                    minlength: 4,
                        required: true
                }
            },
            messages: {
                name: "Please enter your name",
                email: "Please enter a valid email address",
                subject: "Please enter message subject",
                message: "Please enter your message"
            },
            submitHandler: function (form) {
                $.post('php/process_contact.php',
                     $("form#contact-form").serialize(),
                        function (data) {
                        $("form#contact-form").fadeOut(),
                        $('.success-message').fadeIn({duration: 800,easing: 'easeInOutExpo'}).html(data);
                });
            }
        });
    });

    $("#form_register").submit(function(){
        //alert($("#register_email").val());
        $.post("http://localhost/myezy/api/users/user", {"register_email" : $("#register_email").val(), "register_password" : $("#register_password").val()}, function (response) {
            if (response.ok == 1) {
                $("#success-container").html("<p>Account created successfully. Please click the validate link sent to your email. <strong>"+$("#register_email").val()+".</strong></p>").show();
            } else {
                var html = "";
                /*
                 for(var i = 0; i < response.errors.length; i++)
                 {
                 html += response.errors[i]+"<br />";
                 }
                 */
                $(".error-container").html(html).show();
            }
        }, 'json');
        return false;
    });
/*
    NRIC=850917-02-5543
    OtherID=
        agent=
            curVehNo=WUA1347
    doctype=ENQ
    idNo1=850917025543
    idNo2=
        iframe=0
    lang=ENG
    ncd_counter=1
    preInsCode=222
    preVehNo=WUA1347

    https://www.motortakaful.com/inc/ncd_soap_confirm_left.php?preVehNo=WUA1347&curVehNo=WUA1347&idNo1=850917025543&idNo2=&preInsCode=222&ncd_counter=1&lang=ENG&agent=&doctype=ENQ&NRIC=850917-02-5543&OtherID=&iframe=0
*/

    $(".ncd_testing").click(function() {
        var _event = "";
        var _finish	= "Enquire NCD"
        var _page = 0;
        var _task = 0;
        var emailAdd = "phoenix.suresh@gmail.com";
        var firstName = "FAREQ";
        var hpNo1 = "6016";
        var hpNo2 = "3920502";
        var idNo = "850917025543";
        var lastName = "RIZAL";
        var vehRegNo = "WUA1347";
        //var data = {"_event": _event, "_finish" : _finish, "_page": _page, "_task": _task, "emailAdd": emailAdd, "firstName": firstName, "hpNo1" : hpNo1, "hpNo2": hpNo2, "idNo" : idNo, "lastName": lastName, "vehRegNo" : vehRegNo};
        //var data = {"preVehNo": "WUA1347", "curVehNo":"WUA1347", "idNo1":"850917025543","idNo2":"", "preInsCode":"NCD00015153","ncd_counter":"1","lang":"ENG","agent":"","doctype":"ENQ","NRIC":"850917-02-5543","OtherID":"", "iframe":"0"};
        var data = {};
        $.get('http://localhost/myezy/ncd',
            data,
            function (data) {
                $("body").append(data);
            });
    });

    $("#facebook_register").live("click", function() {
        FB.login(function(response) {
            if (response.authResponse) {
                //console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    alert( response.name );
                    alert( response.email );

                    $("#jform_name").val(response.name);
                    $("#jform_username").val(response.email);
                    $("#jform_email1").val(response.email);
                    $("#jform_email2").val(response.email);
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email, publish_stream'});
    });



/* End Of jQuery or JS Custom Scripts - This line of code must stay intact */
});