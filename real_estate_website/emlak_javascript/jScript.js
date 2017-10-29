$(document).ready(function() {
    
    $(".mainNav").click(function(e){
                var linkHref = $(this).attr('href');
                $('html, body').animate({
                    scrollTop: $(linkHref).offset().top 
                }, 1000, "swing");
                
                e.preventDefault();
            });
    
    
    $(".siber").animate({height: "toggle"}, 2000);
    
   

});