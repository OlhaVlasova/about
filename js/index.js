$(document).ready(function() {


    changeMenu();
    checkLanguage();
    fadeAnim();
    
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
        var round = Math.round(scrollPercent);
        
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

    function fadeAnim() {

        const fadeY = document.querySelectorAll(".fadeY");
        const fadeXRight = document.querySelectorAll(".fadeXRight");
        const fadeXLeft = document.querySelectorAll(".fadeXLeft");

        // Intersection Observer function
        const observer = new IntersectionObserver( 
            entries => {
            entries.forEach(entry => {
                // When an entry enters the viewport, add the class "show":
                entry.target.classList.toggle("show", entry.isIntersecting)

        
                // To keep entries from fading out after, unobserve the entry with:
                // if (entry.isIntersecting) observer.unobserve(entry.target)
            })
            }, 
            {
            // Threshold of 1 = 100% - entry needed to be in viewport before the class "show" is added
            threshold: 1,
            rootMargin: "80px",
            }        
        )
        

        // Intersection Observer to observe the cards
        fadeY.forEach(card => { 
            observer.observe(card) 
        });
        fadeXRight.forEach(card => { 
            observer.observe(card) 
        });
        fadeXLeft.forEach(card => { 
            observer.observe(card) 
        });
    }









});


