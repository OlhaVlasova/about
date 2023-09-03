$(document).ready(function() {

    fadeAnimation();
    changeMenu();
    checkLanguage();
    
    
    function changeMenu() {
        $("#mobile-nav").css("display", "none");

        $(window).on("scroll", function() {
            scrollProgress();
            $(".checked-lang--box").removeClass("open");
            if(window.scrollY > 100) {
                $("#header").addClass("scroll");
            } else {
                $("#header").removeClass("scroll");
                $("#header").removeClass("open");
            }
        });

        $("#burger").on("click", function() {
            $("#mobile-nav").css("display", "flex");
            $("#header").toggleClass("open");
            
        });
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
        const screenHeight = window.screen.height;
        const screenHeightFade = screenHeight*0.8;
        const heightOutAnim = 20;

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


