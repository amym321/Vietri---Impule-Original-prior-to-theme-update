

    
(function( jQuery ){
  var $module = jQuery('#m-1628003929995').children('.module');
  $module.gfV2HeroBanner({});
  
})( window.GemQuery || jQuery );
    
(function( jQuery ){
  var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
  var $module = jQuery('#m-1628003942651').children('.module');
  if (mode == 'production') {
    if($module.data('widget') == 'dedicatedPage'){
      (function e(){var e=document.createElement("script");
          e.type="text/javascript",e.async=!0, e.src="//staticw2.yotpo.com//widget.js";
          var t=document.getElementsByTagName("script")[0];
          t.parentNode.insertBefore(e,t)})();
    }
  }
})( window.GemQuery || jQuery );
    
    
        jQuery(function() {
          var $module = jQuery('#m-1628004758794').children('.module');
        }); 
    
    
        jQuery(function() {
          var $module = jQuery('#m-1628005784627').children('.module');
        }); 
    
    
        jQuery(function() {
          var $module = jQuery('#m-1628008584296').children('.module');
        }); 
    
    
        jQuery(function() {
          var $module = jQuery('#m-1628012468863').children('.module');
        }); 
    
    
        jQuery(function() {
            var $module = jQuery('#m-1628004758764').children('.module');   
            var navspeed = $module.data('navspeed'),
                autoplaytimeout = $module.data('autoplaytimeout'),
                autoplayhoverpause = $module.data('autoplayhoverpause'),
                navlg = $module.data('navlg'),
                navmd = $module.data('navmd'),
                navsm = $module.data('navsm'),
                navxs = $module.data('navxs'),
                collg = $module.data('collg'),
                colmd = $module.data('colmd'),
                colsm = $module.data('colsm'),
                colxs = $module.data('colxs'),
                dotslg = $module.data('dotslg'),
                dotsmd = $module.data('dotsmd'),
                dotssm = $module.data('dotssm'),
                dotsxs = $module.data('dotsxs'),
                marginlg = parseInt($module.data('marginlg')),
                marginmd = parseInt($module.data('marginmd')),
                marginsm = parseInt($module.data('marginsm')),
                marginxs = parseInt($module.data('marginxs'));

            var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
            if(mode == 'production') {
                var autoplay = $module.data('autoplay'), 
                    loop = $module.data('loop');
            } else {
                var autoplay = 0, 
                    loop = 0;
            }
        
            $module.owlCarousel({
                mouseDrag: false,
                autoplayHoverPause: autoplayhoverpause,
                autoplay: autoplay,
                autoplayTimeout: autoplaytimeout,
                loop: loop,
                navSpeed: navspeed,
                autoWidth: !1,
                responsiveClass:true,
                responsive:{
                    0:{
                        items:colxs,
                        nav: navxs,
                        dots:dotsxs,
                        margin: marginxs
                    },
                    768:{
                        items:colsm,
                        nav: navsm,
                        dots:dotssm,
                        margin: marginsm
                    },
                    992:{
                        items:colmd,
                        nav: navmd,
                        dots:dotsmd,
                        margin: marginmd
                    },
                    1200:{
                        items:collg,
                        nav: navlg,
                        dots:dotslg,
                        margin: marginlg
                    }
                }
            }); 
        }); 
    
    
(function( jQuery ){
  var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
  var $module = jQuery('#m-1628003297432').children('.module');
  if (mode == 'production') {
    if($module.data('widget') == 'dedicatedPage'){
      (function e(){var e=document.createElement("script");
          e.type="text/javascript",e.async=!0, e.src="//staticw2.yotpo.com//widget.js";
          var t=document.getElementsByTagName("script")[0];
          t.parentNode.insertBefore(e,t)})();
    }
  }
})( window.GemQuery || jQuery );
    
    
(function( jQuery ){
  var mode = jQuery('.gryffeditor').hasClass('editing') ? 'dev' : 'production';
  var $module = jQuery('#m-1628003258313').children('.module');
  if (mode == 'production') {
    if($module.data('widget') == 'dedicatedPage'){
      (function e(){var e=document.createElement("script");
          e.type="text/javascript",e.async=!0, e.src="//staticw2.yotpo.com//widget.js";
          var t=document.getElementsByTagName("script")[0];
          t.parentNode.insertBefore(e,t)})();
    }
  }
})( window.GemQuery || jQuery );
    