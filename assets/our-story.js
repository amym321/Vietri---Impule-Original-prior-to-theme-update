// our story menu 

  function menuActive(){
  var ourStory = $('a#our-story');
  var ourMission = $('a#our-mission');
  var ourCraft = $('a#our-craft');
  var ourArtisans = $('a#our-artisans');
        if (window.location.href.indexOf('our-story') > 0) {
            ourStory.addClass('active');
        }else {
          ourStory.removeClass('active');
        }
        if (window.location.href.indexOf('our-mission') > 0) {
            ourMission.addClass('active');
        }else {
          ourMission.removeClass('active');
        }
        if (window.location.href.indexOf('our-craft') > 0) {
            ourCraft.addClass('active');
        }else {
          ourCraft.removeClass('active');
        }
        if (window.location.href.indexOf('our-artisans') > 0) {
            ourArtisans.addClass('active');
        }else {
          ourArtisans.removeClass('active');
        }
  };
menuActive();

// injects iframe src on click

function updateQueryStringParameter(uri) {
  return uri;
}
var Story = $('#Vimeo-our-story iframe');
var Craft = $('#Vimeo-our-craft iframe');
var Artisan = $('#Vimeo-our-artisans iframe');

$('#story .image-row__placeholder').click(function() {
  var Updatedurl = updateQueryStringParameter( 'https://player.vimeo.com/video/127605694?title=0&byline=0&portrait=0&autoplay=1#t=2s');
  $('#story .vp-preview').hide();
  Story.attr('src', Updatedurl); 
});
$('#craft .image-row__placeholder').click(function() {
  var Updatedurl = updateQueryStringParameter( 'https://player.vimeo.com/video/284902419?title=0&byline=0&portrait=0&autoplay=1#t=2s');
  $('#craft .vp-preview').hide();
  Craft.attr('src', Updatedurl); 
});
$('#artisan .image-row__placeholder').click(function() {
  var Updatedurl = updateQueryStringParameter( 'https://player.vimeo.com/video/268397712?title=0&byline=0&portrait=0&autoplay=1#t=2s');
  $('#artisan .vp-preview').hide();
  Artisan.attr('src', Updatedurl); 
});