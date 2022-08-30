$(document).ready(function () {

    $(".grid-product__link").each(function(){
        var defaultUrl = $(this).find(".grid-product__color-image.is-active").data('variant-url');
        $(this).attr('href', defaultUrl);
    });
});