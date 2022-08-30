// add custom theme js here

$(document).ready(function() {
var modal= $('#cart-modal');

$(".js-modal-open").click(function(){
    modal.addClass("active");
    $('#overlay').show();
  });
  
  $("#cart-modal-close").click(function(){
    modal.removeClass("active");
    $('#overlay').hide();
    
  });

  if($('#isGiftCard').length){
    $('.payment-buttons').find('button:eq(0)').hide();
    $('.shopify-payment-button').hide();
  }
});
  
  $(document).click(function(event) {
    //if you click on anything except the modal itself or the "open modal" link, close the modal
    if (!$(event.target).closest("#cart-modal,.js-modal-open").length) {
      $("body").find("#cart-modal").removeClass("active");
      $('#overlay').hide();
    }
});

// Update Back In Stock Modal Selected Value
$(document).ready(function() {
  $('#BIS_trigger').click(function() {
    $(this).attr('data-variant-id', getUrlParameter('variant'));
  });
});

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

$(document).ready(function() {
  $('body').on('click', '.sca-qv-optionrow.quick-cart-inner', function(){
    setTimeout(function(){
      var that = new theme.CartDrawer();
      theme.cart.getCart().then(function(cart) {
        theme.CartDrawer.prototype.buildCart.call(that, cart, false);
      });
  }, 250);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const productJson = [...document.querySelectorAll('[data-product-json]')];
  if (productJson.length > 0) {
    productJson.forEach((product) => { 
      const sectionId = "shopify-section-" + product.closest('[data-section-id]').dataset.sectionId;
      const variantSKU = document.querySelector('#' + sectionId + ' .variant-sku');
      const inputSelects = [...document.querySelectorAll('#' + sectionId + ' .single-option-selector')];
      const productInfo = JSON.parse(product.innerHTML);
      const inputValues = [];
      const optionValues = [];
      let count = 0;
      inputSelects.forEach((input) => {
        inputValues.push(input.value);
        optionValues.push(count);
        input.addEventListener('change', (evt) => {
          const currentValue = evt.currentTarget.value.toString();
          const changedIndex = inputSelects.indexOf(evt.target);
          inputValues[changedIndex] = currentValue;
          variantSKU.innerText = ' ';
          productInfo.variants.forEach((variant) => {
            if (JSON.stringify(variant.options) == JSON.stringify(inputValues)) {
              variantSKU.innerText = variant.sku;
            } 
          });
        });
        count += 1;
      });   
    });
  }
});