$(document).bind('mobileinit', function () {
    $.mobile.selectmenu.prototype.options.nativeMenu = false;
    if ("ontouchstart" in document.documentElement)
        $('html').addClass('touch');
});
$(document).bind('pageinit', function (event) {
    //var activePage = $.mobile.activePage.attr("id");
    slideshow();
});

$(document).bind("pagebeforeshow", function (e, data) {

    if ($.mobile.pageData) {
        console.log("Parameters =");
        console.log($.mobile.pageData);
    }
    if ($.mobile.pageData && $.mobile.pageData.search) {
        console.log("Parameter search=" + $.mobile.pageData.search);
    }
});

$(window).load(function () {
    slideshow();
    buttons();
    navController();
});


function listviewCallback(text, searchString) {
    $('#select-customer-container').addClass('active rsNoDrag').click(function () {
        $('#select-customer-container').removeClass('active rsNoDrag');
        $('#select-customer').find('a[data-icon="delete"]').click();
    }).children().click(function (e) {
        return false;
    });
    $('#select-customer a[data-icon="delete"]').click(function () {
        $('#select-customer-container').click();
    });

    return text.toLowerCase().indexOf(searchString) === -1;
}

function slideshow() {
    var winH, winW, options, slider;
    winW = 1024;
    winH = 768;
    winH = $(window).height();
    winW = $(window).width();
    options = ({
        arrowsNav: false,
        loop: false,
        keyboardNavEnabled: true,
        controlsInside: false,
        imageScaleMode: 'fit',
        arrowsNavAutoHide: false,
        autoScaleSlider: true,
        autoScaleSliderWidth: winW,
        autoScaleSliderHeight: winH,
        controlNavigation: 'none',
        thumbsFitInViewport: false,
        navigateByClick: false,
        startSlideId: 0,
        slidesSpacing:0,
        autoPlay: false,
        transitionType: 'move',
        nonDraggableClassEnabled: true,
        globalCaption: true,
        block: {
            fadeEffect: true
        },
        deeplinking: {
            enabled: true,
            change: true,
            prefix: 'slide-'
        }
    });
    $('.royalSlider').each(function(){
        var thisSlider = '#' + $(this).attr('id');
        $(thisSlider).royalSlider(options).css('display', 'block');

            var slider = $(thisSlider).data('royalSlider');
 

            // slider.ev.on('rsAfterSlideChange', function (event) {
            //     slider.currSlide.holder.addClass('rsActiveSlide').siblings().removeClass('rsActiveSlide');
            //     var thisSlide = $('.rsActiveSlide');
            // });

            slider.ev.on('rsAfterInit', function (slider) {
                navController();
            });
    });
    $(window).trigger('resize');
    
}
function panelToggle(panelID){
    this.panel = panelID;
    var defaultPanel = $('#mobile-nav');
    if (panelID == undefined)
        panelID = defaultPanel;
    else
        panelID = $("#"+panelID);

    var wH = $(window).height();
    var ulH = wH - $(this.panel).find('.content-top').height();
    panelID.find('.nav-columns').css('height',ulH+'px');
    if ($('body').hasClass('panel-open')){
        panelID.css('height', wH);
        $('body').removeClass('panel-open');
    } else{
        $('body').addClass('panel-open');
    } 
}

function navController(slider){
  $('.panel ul.nav-columns a').on('click',function(event){
        var slide, menu, link, thisCol = undefined;
        
        var slider = $('#full-width-slider').data('royalSlider');

        thisCol = '#' + $(this).parent('.nav-column').attr('id');
        menu = $(this).data('menu');
        link = $(this).data('link');
        slide = $(this).data('slide');

        $(thisCol).removeClass('active');
        $(menu).addClass('active').siblings('.nav-column').removeClass('active'); // change/animate active menu

        console.log(thisCol, menu, link, slide);
        if (menu == undefined && slide == undefined && link !== undefined){
            panelToggle();
            window.setTimeout(function() {
                $.mobile.changePage(link);
            }, 500);    
        } else if (menu && link !== undefined){
            window.setTimeout(function() {
                $.mobile.changePage(link);
            }, 500);    
        } else if (slide && link !== undefined){
            window.setTimeout(function() {
                $.mobile.changePage(link);
            }, 500);  
            slide = slide - 1;
            slider.goTo(slide);
            panelToggle();
        }
        else if (slide !== undefined && link == undefined){
            slide = slide - 1;
            slider.goTo(slide);
            panelToggle();
        }
        if (event.preventDefault) { event.preventDefault(); } else { event.returnValue = false; }

    });
}


function buttons(){
    $('.face-mask').on('click',function(){
        $('body').removeClass('panel-open');
    });
}
