

    
    
    
    
    
    
    
    
    
(function( jQuery ){
  var $module = jQuery('#m-1620177413089').children('.module');
  var videoUrl = jQuery.trim($module.attr('data-url'));
  var autoPause = $module.attr('data-autopause');
  var autoPlay = $module.attr('data-autoplay');
  var videoloop = $module.attr('data-videoloop');
  var videoMute = $module.attr('data-videomute');
  var byline = $module.attr('data-byline');
  var showtitle = $module.attr('data-showtitle');
  var showportrait = $module.attr('data-showportrait');

  setTimeout(function() {
    var videoWrapper = $module.children('.vimeo_video');
    videoWrapper.empty().append('<div id="vimeo-wrapper-1620177413089"></div>');

    var options = {
      url: videoUrl,
      loop: videoloop,
      autoplay: autoPlay,
      autopause: autoPause,
      byline: byline,
      title: showtitle,
      muted: videoMute,
      portrait: showportrait
    };
    var player = new Vimeo.Player("vimeo-wrapper-1620177413089", options);

    player.on('loaded', function() {	
      var $playerFrame = $module.find('iframe');	
      var width = parseInt($playerFrame.attr('width'));	
      var height = parseInt($playerFrame.attr('height'));	
      if (width != NaN && height != NaN) {	
        $module.find('.videoFullScreen').css('padding-bottom', (height / width * 100) + '%');	
      }	
    });	
    
    $module.on('pausevideo', function() {	
      player.pause();	
    });
  }, 100);
})( window.GemQuery || jQuery );
    