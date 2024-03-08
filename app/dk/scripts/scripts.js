$(document).ready(function() {
    
    openFullMenu = (function(bIsFromStart) {
        window.scrollTo(0,0);
        $('.full-menu').css({
            width:$(window).width() + "px",
            height:$(window).height() + "px"
        });
        if(bIsFromStart) {
            $('.full-menu').show();
            $('.full-menu .close').hide();
        }
        else {
            $('.full-menu').fadeIn();
            $('.full-menu .close').show();
        }
        
    });
    
    closeFullMenu = (function() {
        $('.stock').show();
        $('.full-menu').fadeOut();
    });
      
    
    showSystemLoad = (function() {
        $('.system-load').css({
            width:$(window).width() + "px",
            height:$(document).height() + "px"
        });
        $('.system-load').show();
    });
    
    hideSystemLoad = (function() {
        $('.system-load').fadeOut();        
    });
    
    openFullMenu();
});