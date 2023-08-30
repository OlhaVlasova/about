$(document).ready(function() {


    langParse("../json/en.json")

    function langParse(url) {
        var data = (function () {
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
            console.log(ind)          
            $("[data-" + item + "]").each(function() {
                let dataTr = $(this).attr("data-" + item);
                let text = "";
                ind.forEach(element => {
                    if(element == dataTr) text = (data[item][dataTr]);
                });
                $(this).html(text);
            });
        }

        
        
        translateLg(data);


    }









});


