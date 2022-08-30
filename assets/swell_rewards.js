(function() {
  $(document).ready(function(){
    $(document).on("swell:setup", function() {
      // show order summary on mobile
      if (window.location.href.indexOf("checkouts") > -1 && $("#swell-checkout").length > 0) {
        $(".order-summary-toggle").click();
      }
      Swell.Campaign.initializeCampaigns(".swell-campaign-list", SwellConfig.Campaign.opts);
      SwellConfig.Campaign.customCampaign();
      Swell.Referral.initializeReferral(".swell-referral", SwellConfig.Referral.opts);
      SwellConfig.Referral.populateReferrals(".swell-referral-table .table-data");
      
      $("#swell-post-checkout").show();

      SwellConfig.Tier.initializeDummyTier();
      SwellConfig.Tier.initializeCustomTierProperties();
      SwellConfig.Tier.initializeTiers(".swell-tier-table");
      SwellConfig.Tier.showCurrentTierColumnMobile();

      $(".swell-referral-loader").hide();

      $("body").on("click", ".swell-status-row .tier", function(e){
        $(".swell-tier-table").removeClass("silver gold platinum");
        if ($(e.currentTarget).hasClass("silver")) {
          $(".swell-tier-table").addClass("silver");
        } else if ($(e.currentTarget).hasClass("gold")) {
          $(".swell-tier-table").addClass("gold");
        } else if ($(e.currentTarget).hasClass("platinum")) {
          $(".swell-tier-table").addClass("platinum");
        }
      });

      $(document).on("swell:referral:success", function() {
        swellAPI.refreshCustomerDetails(function() {
          SwellConfig.Referral.populateReferrals(".swell-referral-table .table-data");
        });
      });

      $(document).on("swell:referral:error", function(jqXHR, textStatus, errorThrown) {
        $(".refer-customer-error").remove();
        var error_message = "";
        if(textStatus && textStatus === "EMAILS_ALREADY_PURCHASED"){
          error_message = '<p class="refer-customer-error">Oops! Looks like this person has already made a purchase. Try referring another friend.</p>';
        } else if(textStatus && textStatus === "Please enter a valid email address"){
          error_message = '<p class="refer-customer-error">Please enter valid email addresses seperated with commas</p>';
        }

        $(".swell-referral-form-header-details").append(error_message);
        $("#swell-referral-refer-emails").addClass("error-border");
      });

      $('body').on('click', '.close-checkout-popup', function(){
        $("#swell-post-checkout").hide();
      });

    });
  });
}).call(this);

(function() {
  window.SwellConfig = window.SwellConfig || {};

  SwellConfig.Campaign = {
    opts: {
      templates: {
        campaign: '<li class="swell-campaign"> <div class="swell-campaign-content" data-display-mode="modal" data-campaign-id="<%= campaign.id %>"> <div class="swell-campaign-image"> <img class="swell-campaign-image-content" src="<%= campaign.background_image_url %>" alt="<%= campaign.title %>"> <div class="swell-campaign-content-holder"> <div class="swell-campaign-type"> <span class="swell-campaign-type-content"><%= campaign.title %></span> </div> <div class="swell-campaign-value"> <span class="swell-campaign-value-content"><%= campaign.reward_text %></span> </div> </div> </div> </div> </li>'
      }
    }
    ,
    customCampaign: function()
    {
      $(".swell-campaign-list").append('<li class="swell-campaign swell-custom-campaign"> <div class="swell-campaign-content"> <div class="swell-custom-campaign-image"> <img src="//cdn.shopify.com/s/files/1/0082/8692/8959/t/164/assets/swell-custom-campaign.jpg?v=49633697433653335421655932193" alt="caption_img" class="swell-campaign-logo"> </div> </div> </li>');
    }
  };

}).call(this);

(function() {
  window.SwellConfig = window.SwellConfig || {};

  SwellConfig.Referral = {
    opts: {
      localization: {
        referralRegisterHeading: "<span class='refer-heading'>REFER A FRIEND</span>Give $20, Get $20",
        referralRegisterFormDetails: "First, please submit your email below.",
        referralRegisterFormEmail: "Your Email",
        referralRegisterFormSubmit: "Next",
        referralRegisterDetails: "<%= referralCampaign.details %>",

        referralReferHeading: "<span class='refer-heading'>REFER A FRIEND</span>Give $20, Get $20",
        referralReferFormEmails: "Your Friends' Email (separated by commas)",
        referralReferFormSubmit: "Send",
        referralReferFormDetails: "Now, enter your friends' emails below.",
        referralReferFormEmailsDetails: "",
        referralReferDetails: "<%= referralCampaign.details %>",

        referralReferMediaDetails: "You can also share your link with the buttons below.",

        referralShareFacebook: "Share",
        referralShareTwitter: "Tweet",
        referralShareMessenger: "Message",
        referralShareSMS: "SMS",
        referralShareCopy: "Copy Link",

        referralFacebookIcon: "swell-icon-fb",
        referralTwitterIcon: "swell-icon-twitter",
        referralMessengerIcon: "swell-icon-messenger",
        referralSMSIcon: "swell-icon-sms",
        referralLinkIcon: "swell-icon-copy-link",

        referralThanksHeading: "Thanks for Referring!",
        referralThanksDetails: "Remind your friends to check their emails.",

        referralCopyHeading: "",
        referralCopyButton: "COPY LINK",
        referralCopyDetails: "Copy link and share with your friends."
      },
      templates: {
        referralRegister: '<div class="swell-referral-register"> <h2 class="swell-referral-heading"><%= localization.referralRegisterHeading %></h2> <p class="swell-referral-details"><%= localization.referralRegisterDetails %></p> <div class="swell-border"></div> <div class="swell-referral-form-wrapper"> <form name="swell-referral-register-form" id="swell-referral-register-form" method="POST" action="."> <div class="swell-referral-form-header"> <p class="swell-referral-form-header-details"><%= localization.referralRegisterFormDetails %></p> </div> <div class="swell-referral-form-body"> <ul class="swell-referral-form-list"> <li class="swell-referral-form-list-field"> <input class="swell-referral-form-list-field-input" type="email" name="swell-referral-register-email" id="swell-referral-register-email" required="required" placeholder="<%= localization.referralRegisterFormEmail %>"> </li> <li class="swell-referral-form-list-field"> <input class="swell-referral-form-list-submit" type="submit" name="swell-referral-register-submit" id="swell-referral-register-submit" value="<%= localization.referralRegisterFormSubmit %>"> </li> </ul> </div> </form> </div> </div>',
        referralRefer: '<div class="swell-referral-refer"> <h2 class="swell-referral-heading"><%= localization.referralReferHeading %></h2> <p class="swell-referral-details"><%= localization.referralReferDetails %></p> <div class="swell-border"></div> <div class="swell-referral-form-wrapper"> <form class="swell-referral-form" name="swell-referral-refer-form" id="swell-referral-refer-form" method="POST" action="."> <div class="swell-referral-form-header"> <p class="swell-referral-form-header-details"><%= localization.referralReferFormDetails %></p> </div> <div class="swell-referral-form-body"> <ul class="swell-referral-form-list"> <li class="swell-referral-form-list-field"> <input class="swell-referral-form-list-field-input" type="text" name="swell-referral-refer-emails" id="swell-referral-refer-emails" required="required" placeholder="<%= localization.referralReferFormEmails %>"> </li> <li class="swell-referral-form-list-field"> <input class="swell-referral-form-list-submit" type="submit" name="swell-referral-refer-submit" id="swell-referral-refer-submit" value="<%= localization.referralReferFormSubmit %>"> </li> </ul> </div> </form> </div> <div class="swell-referral-media-wrapper"> <p class="swell-referral-media-details"><%= localization.referralReferMediaDetails %></p> <ul class="swell-referral-media-list"> <li class="swell-referral-medium swell-share-referral-facebook"> <div class="swell-referral-medium-content"> <i class=" <%= localization.referralFacebookIcon %>" aria-hidden="true"></i> <div><%= localization.referralShareFacebook %></div> </div> </li> <li class="swell-referral-medium swell-share-referral-twitter"> <div class="swell-referral-medium-content"> <i class="<%= localization.referralTwitterIcon %>" aria-hidden="true"></i> <div><%= localization.referralShareTwitter %></div> </div> </li> <li class="swell-referral-medium swell-share-referral-messenger"> <div class="swell-referral-medium-content"> <i class="<%= localization.referralMessengerIcon %>" aria-hidden="true"></i> <div><%= localization.referralShareMessenger %></div> </div> </li> <li class="swell-referral-medium swell-share-referral-sms show-on-mobile"> <div class="swell-referral-medium-content"> <i class="<%= localization.referralSMSIcon %>" aria-hidden="true"></i> <div><%= localization.referralShareSMS %></div> </div> </li> <li class="swell-referral-medium swell-share-referral-copy"> <div class="swell-referral-medium-content"> <i class="<%= localization.referralLinkIcon %>" aria-hidden="true"></i> <div><%= localization.referralShareCopy %></div> </div> </li> </ul> </div> </div> ',
        referralThanks: '<div class="swell-referral-thanks"> <div class="back-link-holder"> <span class="swell-referral-back-link"></span> </div> <h2 class="swell-referral-heading"><%= localization.referralThanksHeading %></h2> <p class="swell-referral-details"> <%= localization.referralThanksDetails %> </p> </div>'
      }
    },
    populateReferrals: function(containerSelector) {
      if (spapi.authenticated) {
        if($(containerSelector).length == 0) {
          return;
        }
        $(containerSelector).html("");
        var referral_receipts = spapi.customer.referral_receipts;
        if (referral_receipts.length > 0) {
          $.each(referral_receipts, function( index, item ) {
            status = "Invited";
            if (item.completed_at != null){
              status =  "<span>Purchased</span>" + " (" + spapi.activeReferralCampaign.reward_text + " earned" + ")";
            }
            $(containerSelector).append("<tr><td>"+ item.email+ "</td><td>" + status + "</td></tr>");
          });
        }
      }
    }
  };

}).call(this);

(function() {
  window.SwellConfig = window.SwellConfig || {};

  SwellConfig.Tier = {
    showCurrentTierColumnMobile: function(){
      if (spapi.authenticated && spapi.customer.vip_tier) {
        $(".swell-tier-table").addClass(spapi.customer.vip_tier.name.toLocaleLowerCase());
      } else {
        $(".swell-tier-table").addClass("silver");
      }
    },
    getCustomerTierId: function() {
      var customer_tier, intro_tier, tiers;
      customer_tier = spapi.customer.vip_tier;
      tiers = spapi.activeVipTiers;
      if (customer_tier) {
        return customer_tier.id;
      } else {
        intro_tier = $.grep(tiers, function(e) {
          return e.swellrequiredAmountSpent === "$0" && e.swellrequiredAmountSpentCents === 0 && e.swellrequiredPointsEarned === 0 && e.swellrequiredPurchasesMade === 0 && e.swellrequiredReferralsCompleted === 0;
        });
        if (intro_tier.length > 0) {
          return intro_tier[0].id;
        } else {
          return null;
        }
      }
    },
    getCustomerTierRank: function() {
      var customer_tier, intro_tier, rank, tiers;
      customer_tier = spapi.customer.vip_tier;
      tiers = spapi.activeVipTiers;
      if (customer_tier && customer_tier.id) {
        rank = $.grep(tiers, function(e) {
          return e.id === customer_tier.id;
        })[0].rank;
        return rank;
      } else {
        intro_tier = $.grep(tiers, function(e) {
          return e.swellrequiredAmountSpent === "$0" && e.swellrequiredAmountSpentCents === 0 && e.swellrequiredPointsEarned === 0 && e.swellrequiredPurchasesMade === 0 && e.swellrequiredReferralsCompleted === 0;
        });
        if (intro_tier.length > 0) {
          return intro_tier[0].rank;
        } else {
          return null;
        }
      }
    },
    getTierByRank: function(rank) {
      var tiers;
      tiers = spapi.activeVipTiers;
      return $.grep(tiers, function(e) {
        return e.rank === rank;
      })[0];
    },
    setupCustomerTierStatus: function() {
      var customer_tier_id, customer_tier_rank, next_tier, points_required;

      customer_tier_id = SwellConfig.Tier.getCustomerTierId();
      customer_tier_rank = SwellConfig.Tier.getCustomerTierRank();
      next_tier = SwellConfig.Tier.getTierByRank(customer_tier_rank + 1);
      
      $(".swell-tier-table thead").prepend("<tr class=\"swell-tier-status-row\">\n  <th scope=\"row\"></th>\n</tr>");
      $.each(spapi.activeVipTiers, function(index, tier) {
        $(".swell-tier-status-row").append("<th data-tier-id='" + tier.id + "'></th>");
        $($('.swell-status-row li')[index]).attr("data-tier-id", tier.id);
      });
      
      $("[data-tier-id=\"" + customer_tier_id + "\"]").addClass("swell-tier-active");
      $(".swell-tier-status-row th[data-tier-id=\"" + customer_tier_id + "\"]").append("<span class= 'current-status'>CURRENT<br> STATUS</span>");
      $(".swell-status-row li[data-tier-id=\"" + customer_tier_id + "\"]").prepend("<span class='current-status'>Current Status</span>");

      if (customer_tier_id != spapi.activeVipTiers[spapi.activeVipTiers.length - 1].id) {
        points_required = (next_tier.points_earned - spapi.customer.points_earned);
        if (points_required < 0) {
          points_required = 0;
        }
        $(".swell-tier-status-row th[data-tier-id=\"" + next_tier.id + "\"]").append("<span class='next-status'>Earn " + points_required + " points more to earn " + next_tier.name + "</span>");
        $(".swell-status-row li[data-tier-id=\"" + next_tier.id + "\"]").append("<span class='next-status'>Earn " + points_required + " points more to earn " + next_tier.name + "</span>");
      }
    },
    initializeDummyTier: function() {
      var k, len, tier, tiers;
      tiers = spapi.activeVipTiers;
      for (k = 0, len = tiers.length; k < len; k++) {
        tier = tiers[k];
        tier.rank += 1;
      }
      return tiers.unshift({
        id: -1,
        rank: 0,
        name: "Silver Member",
        points: "Create an account",
        one_point_multiplier: "1x",
        free_shipping: "",
        donation: "",
        swellrequiredAmountSpent: "$0",
        swellrequiredAmountSpentCents: 0,
        swellrequiredPointsEarned: 0,
        swellrequiredPurchasesMade: 0,
        swellrequiredReferralsCompleted: 0
      });
    },
    initializeCustomTierProperties: function() {
      spapi.activeVipTiers[1].name = spapi.activeVipTiers[1].name;
      spapi.activeVipTiers[1].points = "<span>Earn</span> " + spapi.activeVipTiers[1].points_earned + " Points";
      spapi.activeVipTiers[1].one_point_multiplier = "1.5x";
      spapi.activeVipTiers[1].free_shipping = "";
      spapi.activeVipTiers[1].donation = "";
      
      spapi.activeVipTiers[2].name = spapi.activeVipTiers[2].name;
      spapi.activeVipTiers[2].points = "<span>Earn</span> " +  spapi.activeVipTiers[2].points_earned + " Points";
      spapi.activeVipTiers[2].one_point_multiplier = "2x";
      spapi.activeVipTiers[2].free_shipping = "<i class=\"circle\" aria-hidden=\"true\"></i>";
      spapi.activeVipTiers[2].donation = "<i class=\"circle\" aria-hidden=\"true\"></i>";
    },
    initializeTiers: function(containerSelector) {
      var i, j, key, properties, property, ref, ref1, tiers;
      if ($(containerSelector).length === 0) {
        return "";
      }
      tiers = spapi.activeVipTiers;
      properties = {
        header: {
          name: {
            className: "swell-tier-names",
            title: ""
          },
          points: {
            className: "swell-tier-values",
            title: "Benefits"
          }
        },
        body: {
          one_point_multiplier: {
            title: "Point Multiplier"
          },
          free_shipping: {
            title: "Free Shipping"
          },
          donation: {
            title: "Donation made in name"
          }
        }
      };
      $(containerSelector).append("<thead></thead>");
      $(containerSelector).append("<tbody></tbody>");
      j = 0;
      ref = properties.header;
      for (key in ref) {
        property = ref[key];
        $(containerSelector).find("thead").append("<tr class=\"" + property.className + "\">\n  <th scope=\"row\">" + property.title + "</th>\n</tr>");
        tiers.forEach(function(tier) {
          return $(containerSelector).find("thead tr:eq(" + j + ")").append("<th scope=\"col\" data-tier-id=\"" + tier.id + "\">" + tier[key] + "</th>");
        });
        j++;
      }
      i = 0;
      ref1 = properties.body;
      for (key in ref1) {
        property = ref1[key];
        $(containerSelector).find("tbody").append("<tr>\n  <th scope=\"row\">" + property.title + "</th>\n</tr>");
        tiers.forEach(function(tier) {
          return $(containerSelector).find("tbody tr:eq(" + i + ")").append("<td data-tier-id=\"" + tier.id + "\">" + tier[key] + "</td>");
        });
        i++;
      }
      if (spapi.authenticated) {
        return SwellConfig.Tier.setupCustomerTierStatus();
      }
    }
  };

}).call(this);
