$(document).ready(function() {

    fadeAnimation();
    changeMenu();
    checkLanguage();

    
    
    
    function changeMenu() {
        $("#mobile-nav").css("display", "none");

        $(window).on("scroll", function() {
            let mediaQuery = window.matchMedia('(min-width: 1140px)').matches;
            scrollProgress();
            $(".checked-lang--box").removeClass("open");

            if(!mediaQuery) {
                $("#header").addClass("scroll");
                $("#mobile-nav a").on("click", function() {
                    $("#header").removeClass("open");
                });
            } else {
                if(window.scrollY > 100) {
                    $("#header").addClass("scroll");
                } else {
                    $("#header").removeClass("scroll");
                    $("#header").removeClass("open");
                }
            }            
        });

        $("#burger").on("click", function() {
            $("#mobile-nav").css("display", "flex");
            $("#header").toggleClass("open");
            
        });

        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        var xDown = null;
        var yDown = null;
        
        function getTouches(evt) {
            return evt.touches
        }
        
        function handleTouchStart(evt) {
            const firstTouch = getTouches(evt)[0];
            xDown = firstTouch.clientX;
            yDown = firstTouch.clientY;
        };
        
        function handleTouchMove(evt) {
            if(!document.getElementById("header").classList.contains("open")) return;
            if ( ! xDown || ! yDown ) {
                return;
            }
        
            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;
        
            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;
        
            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                if ( xDiff > 0 ) {
                    document.getElementById("header").classList.remove("open");
                    document.querySelector("body").classList.remove("noScroll");
                }        
            }
            xDown = null;
            yDown = null;
        }
    }

    function scrollProgress() {
        // main function
        var scrollAmount = $(window).scrollTop();
        var documentHeight = $(document).height();
        var windowHeight = $(window).height();
        var scrollPercent = (scrollAmount / (documentHeight - windowHeight)) * 100;
        
        // horizontal scroll bar
        $(".scrollBar").css("width", scrollPercent + "%");
    
    }

    function checkLanguage() {
        let value = $("#checked-lang--main").attr("value");
        let langUrl = "json/" + value + ".json";
        $("#checked-lang--main").attr("value", value).text(value);
        $("#"+value).addClass("none");

        langParse(langUrl);

        $("#checked-lang--main").on("click", function() {
            $(".checked-lang--box").toggleClass("open");
        });

        $(".checked-lang--key").on("click", function() {
            value = $(this).attr("value");
            langUrl = "json/" + value + ".json";
            $(".checked-lang--box").removeClass("open");
            $("#checked-lang--main").attr("value", value).text(value);
            $(".checked-lang--key").removeClass("none");
            $("#"+value).addClass("none");
            langParse(langUrl);
        });
    }

    function langParse(url) {
        var dataMain = (function () {
            var data = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': url,
                'dataType': "json",
                'success': function (json) {
                    data = json;
                }
            });
            return data;
        })();

        function translateLg(data) {

            let keysParents = Object.keys(data);

            for(let i = 0; i < keysParents.length; i++) {
                let ind = Object.keys(data[keysParents[i]]);
                let item = keysParents[i];
                enumerationOfProperties(item, ind, data);    
            } 
        };

        function enumerationOfProperties (item, ind, data) {           
            $("[data-" + item + "]").each(function() {
                let dataTr = $(this).attr("data-" + item);
                let text = "";
                for(let i = 0; i < ind.length; i++) {

                    if(ind[i] == dataTr) text = (data[item][dataTr]);
                }
                $(this).html(text);
            });
        }
        translateLg(dataMain);
    }

    function fadeAnimation() {
        let screenHeight = window.screen.height;
        let screenHeightFade = screenHeight*0.8;
        let heightOutAnim = 15;

        if(window.matchMedia('(min-width: 1140px)').matches) {
            screenHeightFade = screenHeight*.97;
            heightOutAnim = 10;
        }

        $(window).on("scroll", function() {
            fadeInAnimation();
            fadeOutAnimation();
        });

        function fadeInAnimation() {
            $(".fadeY" ).each(function( index ) {
                if(window.scrollY >= $(this).offset().top-screenHeightFade) {
                    $(this).addClass("show");
                }
            });
            $(".fadeXRight" ).each(function( index ) {
                if(window.scrollY >= $(this).offset().top-screenHeightFade) {
                    $(this).addClass("show");
                }
            });
            $(".fadeXLeft" ).each(function( index ) {
                if(window.scrollY >= $(this).offset().top-screenHeightFade) {
                    $(this).addClass("show");
                }
            });
            $(".fadeAddress" ).each(function( index ) {
                if(window.scrollY >= $(this).offset().top-screenHeightFade) {
                    $(this).addClass("show");
                }
            });
        }
        function fadeOutAnimation() {
            $(".fadeY" ).each(function( index ) {
                if((window.scrollY >= $(this).offset().top-heightOutAnim) || (window.scrollY < $(this).offset().top-screenHeightFade)) {
                    $(this).removeClass("show");
                }
            
            });
            $(".fadeXRight" ).each(function( index ) {
                if((window.scrollY >= $(this).offset().top-heightOutAnim) || (window.scrollY < $(this).offset().top-screenHeightFade)) {
                    $(this).removeClass("show");
                }
            });
            $(".fadeXLeft" ).each(function( index ) {
                if((window.scrollY >= $(this).offset().top-heightOutAnim) || (window.scrollY < $(this).offset().top-screenHeightFade)) {
                    $(this).removeClass("show");
                }
            });
            $(".fadeAddress").each(function( index ) {
                if((window.scrollY >= $(this).offset().top-heightOutAnim) || (window.scrollY < $(this).offset().top-screenHeightFade)) {
                    $(this).removeClass("show");
                }
            });
        }


    }

});


