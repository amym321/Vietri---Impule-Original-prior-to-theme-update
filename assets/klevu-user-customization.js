var klevu_uc_helpers = {

  changeImageSize: function (product, newSize, oldSize) {
    if (product.image) {
      product.image = product.image.indexOf(oldSize) !== -1 ? product.image.replace(oldSize, newSize) : product.image;
    }
    if (product.imageUrl) {
      product.imageUrl = product.imageUrl.indexOf(oldSize) !== -1 ? product.imageUrl.replace(oldSize, newSize) : product.imageUrl;
    };
    if (product.imageHover) {
      product.imageHover = product.imageHover.indexOf(oldSize) !== -1 ? product.imageHover.replace(oldSize, newSize) : product.imageHover;
    };
    product.productImage = product.image;
  },

  changeSwatchesImage: function (product) {
    // Old St. Nick
    try {
      for (var i = 0; i < product.swatches.swatch.length; i++) {
        var element = product.swatches.swatch[i];
        if (element.color.toLowerCase() === 'old st. nick') {
          element.swatchImage = '//cdn.shopify.com/s/files/1/0082/8692/8959/t/30/assets/old-st-nick.png';
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  swatchImagesInColorFacet: function (results) {
    var kuFilterHeads = document.getElementsByClassName('kuFilterHead');
    var kuColorFilter = document.getElementById('kuFilterNames-color') !== null ? document.getElementById('kuFilterNames-color') : false;
    if (!kuColorFilter) return;
    var kuColorFilters = kuColorFilter !== false ? kuColorFilter.getElementsByClassName('kuFilterLabel') : false;
    if (!kuColorFilters) return;
    var whereToInsert = kuColorFilter.querySelectorAll('ul>li>a');
    // kuColorFilters = kuColorFilter.querySelectorAll('ul > li > a');
    var kuColorCounts = kuColorFilter.getElementsByClassName('kuFilterTotal');
    var kuFilterBoxes = document.getElementsByClassName('kuFilterBox');
    var kuColors = [];
    var pullColor = '';
    var swatchContainer = document.createElement('span');
    var imgPath = [];
    var colorPath = results[0].image ? results[0].image : '';
    var filePath = colorPath.split('/products/');

    filePath = filePath[0] + '/t/24/assets/';

    // if (kuColorFilter && filePath) {
    if (!filePath) return;

    var pullColors = kuColorFilters;

    for (var i = 0; i < pullColors.length; i++) {
      pullColor = pullColors[i].innerHTML;

      if (pullColor) {
        pullColor = pullColor.replace(/\s+/g, '-').toLowerCase();

        switch (true) {
          case (pullColor.toLowerCase() === 'old-st.-nick'): pullColor = 'old-st-nick';
            break;
          // case (pullColor.toLowerCase() === 'black'): pullColor = 'two-tone-black';
          //   break;
          // case (pullColor.toLowerCase() === 'white'): pullColor = 'two-tone-white';
          //   break;
          case (pullColor.toLowerCase() === 'light-pink'): pullColor = 'pink';
            break;
          case (pullColor.toLowerCase() === 'snow'): pullColor = 'aurora-snow';
            break;
          default:
            break;
        }

        // background-color: silver
        // #kuFilterNames-color>ul>li>a[title="Silver"]>span
        kuColors.push(pullColor);
      }

      swatchContainer = '';


      imgPath[i] = filePath + pullColor + '.png';
      swatchContainer = document.createElement('span');
      swatchContainer.style.backgroundImage = "url('" + imgPath[i] + "')";
      swatchContainer.style.width = '35px';
      swatchContainer.style.height = '35px';
      swatchContainer.style.display = "inline-block";
      swatchContainer.style.backgroundSize = "contain";
      // swatchContainer.style.marginRight = "10px";
      // swatchContainer.style.border = "1px solid #cbcbcb";
      swatchContainer.setAttribute('class', 'kuFilterSwatch');
      whereToInsert[i].insertAdjacentElement('afterbegin', swatchContainer);
      kuColorCounts[i].className += " kuFilterCount";

    }
    // }
  },

  addKlevuClassToSRLP: function () {
    document.getElementsByTagName('body')[0].classList.add('klevu-custom-SRLP');
  },

  addSearchTermToHeader: function () {
    if (document.querySelector('.section-header__title') && document.querySelectorAll('.klevu-title__for').length === 0) {
      document.querySelector('.section-header__title').innerHTML += '<span class="klevu-title__for">for</span><span class="klevu-title__term">"' + klevu_searchedTerm + '"</span>';
    }
  },

  addTotalSearchResults: function () {

    if (!document.querySelector('.kuSortHeader')) return;
    var totalLPResults = klevu_pagination.totalLandingResultsFound ? klevu_pagination.totalLandingResultsFound : false;
    var klevuTotalResults = document.createElement('div');
    // add total results found title
    if (totalLPResults) {
      klevuTotalResults.setAttribute("id", "klevu-custom-total-results");
      klevuTotalResults.setAttribute("class", "klevu-custom-total-results");
      klevuTotalResults.innerHTML += '<span id="ku-total-results">' + klevu_pagination.totalLandingResultsFound + '</span><span>products</span>';
    }
    if (!document.getElementById('klevu-custom-total-results')) {
      document.querySelector('.kuSortHeader').insertAdjacentElement('afterbegin', klevuTotalResults);
    }
    document.getElementById('ku-total-results').innerText = totalLPResults;
  },

  insertSelectedFilter: function () {
    if (!document.getElementById('ku-search-filter-tags_copy')) {
      document.getElementById('kuFilters').insertAdjacentHTML('afterbegin', '<div id="ku-search-filter-tags_copy"></div>')
    }

    var filterSvg = '<svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-filter" viewBox="0 0 64 64"><path d="M48 42h10M48 42a5 5 0 1 1-5-5 5 5 0 0 1 5 5zM7 42h31M16 22H6M16 22a5 5 0 1 1 5 5 5 5 0 0 1-5-5zM57 22H26"></path></svg>'
    var filterButton = '<button class="ku-mob-filter_button">' + filterSvg + ' Filter<span class="ku-selected-count"></span></button>';
    if (!document.querySelector('.ku-mob-filter_button')) {
      document.querySelector('.kuSortingOpt').insertAdjacentHTML('afterbegin', filterButton);

      document.querySelector('.ku-mob-filter_button').addEventListener('click', function () {
        document.getElementById('kuFilters').classList.add('mob-filter__open');
        document.querySelector('html').classList.add('js-drawer-open');
      });
    }

    var selectedFacet = document.querySelectorAll('#ku-search-filter-tags .ku-search-filter-tag');

    selectedFacet = Array.prototype.slice.call(selectedFacet);

    if (selectedFacet && selectedFacet.length > 0) {

      document.querySelector('.ku-selected-count').innerText = ' (' + selectedFacet.length + ')';

      document.querySelector('.ku-mob-filter_button').classList.add('ku-filter-selected');

      selectedFacet.forEach(function (tag) {
        document.getElementById('ku-search-filter-tags_copy').insertAdjacentElement('beforeend', tag);
      });

    } else {
      document.querySelector('.ku-mob-filter_button').classList.remove('ku-filter-selected');
    }
  },

  screenWidthCheck: function (screenWidth) {
    if (!screenWidth) screenWidth = 748;
    var widthOfScreen = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return widthOfScreen <= screenWidth;
  },

  closeFirstThreeFacets: function () {
    for (var j = 0; j < document.querySelectorAll('.kuFilterBox > .kuFilterHead').length; j++) {
      if (document.querySelectorAll('.kuFilterBox > .kuFilterHead')[j].id === 'kuFilterHead-type') {
        document.querySelectorAll('.kuFilterBox > .kuFilterHead')[j].click();
      }
    }

    for (var i = 0; i < 3; i++) { // FIRST THREE (3!!!) elements!!!!!!!
      if (document.querySelectorAll('.kuFilterBox > .kuFilterHead')[i].id.indexOf("kuFilterHead-color") !== -1) return; // don't trigger the click if this is Color facet
      document.querySelectorAll('.kuFilterBox > .kuFilterHead')[i].click();
    }
  }

}

var klevu_uc = {
  landingFilters: {
    loadingFiltersFor: "search-query",
    // function for showing filters from the given xml
    showFilters: function (filters) {

      var filterBox = document.getElementById('kuFilters'),
        i, len, j = 0, k = 0,
        filterBoxIds = new Array(),
        multiselectClass = '',
        filterByDoc = klevu_commons.isMobileDevice() ? document.getElementById("kuFilterRefineMobile") : document.getElementById("klevuNarrowByLabel");

      klevuLandingFilterTxt = '';
      filterBox.innerHTML = '';

      if ('undefined' !== typeof klevu_multiSelectFilters && klevu_multiSelectFilters) {
        multiselectClass = ' kuMulticheck';
      }
      // if filters are found in the received xml,
      // show the filters based on their type.
      if (filters && filters.length > 0) {
        filterBox.className = "kuFilters" + multiselectClass;
        for (i = 0, len = filters.length; i < len; i++) {
          if (filters[i].key === 'Price Range' && !klevu_showPrices) {
            continue;
          }
          filterBoxIds[j] = klevu_landingFilters.displayFiltersData(filters[i]);
          j++;
        }
        filterBox.innerHTML = klevuLandingFilterTxt;
        if ('undefined' !== typeof filterByDoc && filterByDoc) {
          if (klevuLandingFilterTxt.trim().length === 0) {
            filterByDoc.style.display = "none";
          } else {
            filterByDoc.style.display = "block";
          }
        }

        for (i = 0, len = filterBoxIds.length; i < len; i++) {
          if (filterBoxIds[i] && filterBoxIds[i].trim() != '') {
            document.getElementById(filterBoxIds[i]).style.height = "auto";
          }
        }

        //if( 'undefined' !== typeof klevu_userOptions.landingFilterPosition && klevu_userOptions.landingFilterPosition === 'top' ){
        j = 0;
        for (k = 0, len = filters.length; k < len; k++) {
          var key = filters[k].key.replace(' ', '_'),
            filterOptions = filters[k].options;
          for (var i = 0; i < filterOptions.length; i++) {
            var selected = filterOptions[i].isSelected,
              kuid = i + key + '~text';
            if (selected.trim() === 'true') {
              klevu_landingFilters.showSelectedFilter(kuid, filterOptions[i].name, j, filters[k].label);
              j++;
            }
          }
        }
        if ('undefined' !== typeof klevu_showPriceSlider && klevu_showPriceSlider &&
          klevu_userOptions.selectedLandingFilters.indexOf("klevu_price") !== -1) {
          klevu_landingFilters.showSelectedFilter(null, klevu_userOptions.selectedLandingFilters.match(/klevu_price:[0-9.\- ]*;*/)[0], j, null, 'Price-Range');
          j++;
        }
        if (j === 0) {
          klevu_landingFilters.showSelectedFilter(null, null, -1);
        }
        //}
        //below three lines solve rendering issue for mac browsers like chrome and safari
        filterBox.style.display = 'none';
        filterBox.offsetHeight;
        filterBox.style.display = 'block';
        if (document.getElementById('kuFilterRefineMobile') && klevu_commons.isMobileDevice() &&
          (!klevu_userOptions.checkScreenSizeForShowingFiltersInMobile || screen.width < 768)) {
          klevu_landingFilters.showFiltersOnMobile(!(j === 0));
        }
      } else {
        filterBox.className = "kuFilters disableKuFilter" + multiselectClass;
      }
      klevu_uc_helpers.addTotalSearchResults();
      klevu_uc_helpers.insertSelectedFilter();

      if (klevu_uc_helpers.screenWidthCheck(768)) {

        if (!filterBox.classList.contains('mob-filter__open')) {
          document.querySelector('html').classList.remove('js-drawer-open');
        }

        var mobFilterHeader = '<div class="ku-mob-filter-header">' +
          '<span>Filter</span><button id="ku-filter-close"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-close" viewBox="0 0 64 64"><path d="M19 17.61l27.12 27.13m0-27.12L19 44.74"></path></svg></button>' +
          '</div>';
        if (!document.querySelector('.ku-mob-filter-header')) {
          filterBox.insertAdjacentHTML('afterbegin', mobFilterHeader);
          function closeFilter() {
            document.getElementById('ku-filter-close').addEventListener('click', function () {
              document.getElementById('kuFilters').classList.remove('mob-filter__open');
              document.querySelector('html').classList.remove('js-drawer-open');
            });
          }
          setTimeout(closeFilter, 0)
        }
      }
    },

    // function for showing other filters
    displayFiltersData: function (filter) {
      if (filter) {
        var labelToPut = klevu_translateFilterLabel(filter.label).toUpperCase(),
          pricingFilter = false,
          msrpFilter = false,
          filterBox = '',
          filterOptions = filter.options,
          key = filter.key.replace(' ', '_'), label,
          inStockFilter = false,
          isAnyOptionSelected = false,
          truncatedLabel,
          hoverClass = "kuHover";

        if (filter.label.toLowerCase() === 'price range') {
          pricingFilter = true;
        }

        if (filter.label === 'MSRP') {
          msrpFilter = true;
        }

        if (filter.key === 'inStock') {
          inStockFilter = true;
        }

        if (klevu_commons.isMobileDevice()) {
          hoverClass = "";
        }

        if (filterOptions.length > 6) {
          filterBox += '<div class="kuFilterBox ' + hoverClass + '" id="kuFilterBox-' + key + '">';
        } else {
          filterBox += '<div class="kuFilterBox ' + hoverClass + '" style="height:auto;" id="kuFilterBox-' + key + '">';
        }
        filterBox += '<div class="kuFilterHead kuCollapse"' +
          ' id="kuFilterHead-' + key +
          '" onclick="klevu_landingFilters.collapseExpand(' +
          ' \'kuFilterHead-' + key + '\', \'kuFilterNames-' + key +
          '\', \'kuShowOpt-' + key + '\', \'kuHideOpt-' +
          key + '\', \'kuFilterBox-' + key +
          '\' );">' + labelToPut + '</div>' +
          '<div class="kuFilterNames" id="kuFilterNames-' +
          key + '">' + '<ul>';

        for (var i = 0, len = filterOptions.length; i < len; i++) {
          var selected = filterOptions[i].isSelected,
            kuid = i + key + '~text',
            kuClass = '',
            kuCounterClass = 'kuFilterTotal',
            counterText = filterOptions[i].count,
            onclickCall = 'klevu_landingFilters.sendQuery(\'' + kuid + '\', true );';

          if (selected.trim() === 'true') {
            kuClass = 'kuSelected';
            kuCounterClass = 'kuFilterCancel';
            if ('undefined' !== typeof klevu_multiSelectFilters && klevu_multiSelectFilters) {
              counterText = filterOptions[i].count;
              isAnyOptionSelected = true;
            } else {
              counterText = 'X';
            }
            onclickCall = 'klevu_landingFilters.cancelFilter(\'' + kuid + '\'); ';
          }

          label = filterOptions[i].name;

          if (msrpFilter) {
            if (label.trim().length > 0) {
              label = '$' + Number(label).toFixed(2);
            }
          }

          if (inStockFilter) {
            label = label.replace("No", "Ei").replace("Yes", "KyllÃ¤");
          }


          if (pricingFilter) {
            label = klevu_commons.replaceCurrencyWithItsSymbol(label, klevu_storeLandingCurrency);
            truncatedLabel = label;
            label = '';
          } else {
            if (klevu_userOptions.truncateFilterLabel) {
              truncatedLabel = label.trunc(18);
            } else {
              truncatedLabel = label;
            }
          }

          filterBox += '<li id="' + i + key + '" class="' + kuClass +
            '"><a href="javascript:void(0);" onclick="' +
            onclickCall + '" title="' + label + '"><span class="kuFilterLabel">' +
            truncatedLabel + '</span><span class="' +
            kuCounterClass + '">' + counterText + '</span></a></li>' +
            '<input type="hidden" id="' + kuid + '" value="' +
            klevu_commons.escapeHtml(filterOptions[i].value) + '"/>';
        }
        filterBox += '</ul></div></div>';

        if (filterOptions.length > 6) {
          if (isAnyOptionSelected) {
            filterBox = filterBox.replace('<div class="kuFilterBox ' + hoverClass + '" id="kuFilterBox-' + key + '">',
              '<div class="kuFilterBox ' + hoverClass + '" style="height:auto;" id="kuFilterBox-' + key + '">');
          } else {
            filterBox += '<div class="kuShowOpt" id="kuShowOpt-' + key +
              '" style="display:block;text-align:center;">' +
              '<a href="javascript:klevu_landingFilters.showAll( \'kuFilterBox-' + key +
              '\' );" title="' + klevu_uiLabels.showMore + '"><img src="' +
              klevu_userOptions.viewMoreImageUrl +
              '" alt="' + klevu_uiLabels.showMore + '"/></a></div><div class="kuHideOpt" id="kuHideOpt-' + key +
              '" style="display:none;text-align:center;">' +
              '<a href="javascript:void(0);" onclick="klevu_landingFilters.hideAll(\'kuFilterBox-' + key +
              '\');" title="' + klevu_uiLabels.showLess + '"><img src="' +
              klevu_userOptions.viewLessImageUrl + '" alt="' + klevu_uiLabels.showLess + '"/></a></div>';
          }
        }
        klevuLandingFilterTxt += filterBox;
        if (filterOptions.length > 0 && filterOptions.length < 6) {
          return 'kuFilterBox-' + key;
        }
      }
    },

    displayPricingSlider: function () {
      var labelToPut = klevu_translateFilterLabel('PRICE RANGE').toUpperCase(),
        filterBox = '',
        filterOptions = 1,
        key = 'Price-Range', kuid,
        i = 0, len, selected,
        kuClass, kuCounterClass,
        counterText, onclickCall,
        label,
        pricingFilterClass = 'klevuPriceRangeSlider';

      if (filterOptions.length > 6) {
        filterBox += '<div class="kuFilterBox" id="kuFilterBox-' + key + '">';
      } else {
        filterBox += '<div class="kuFilterBox" style="height:auto;" id="kuFilterBox-' + key + '">';
      }
      filterBox += '<div class="kuFilterHead kuCollapse"' +
        ' id="kuFilterHead-' + key +
        '" onclick="klevu_landingFilters.collapseExpand(' +
        ' \'kuFilterHead-' + key + '\', \'kuFilterNames-' + key +
        '\', \'kuShowOpt-' + key + '\', \'kuHideOpt-' +
        key + '\', \'kuFilterBox-' + key +
        '\' );">' + labelToPut + '</div>' +
        '<div class="kuFilterNames" id="kuFilterNames-' +
        key + '">';

      if ('undefined' !== typeof klevu_current_version && klevu_current_version) {
        klevuPluginVersion = klevu_commons.compareVersionNumbers(klevu_current_version, '2.0.2');
        if (!isNaN(klevuPluginVersion) && klevuPluginVersion >= 0) {
          pricingFilterClass = 'kuPriceRangeSlider';
        }
        klevuPluginVersion = klevu_commons.compareVersionNumbers(klevu_current_version, '2.0.0');
        if (!isNaN(klevuPluginVersion) && klevuPluginVersion < 0) {
          klevuPluginVersion = klevu_commons.compareVersionNumbers(klevu_current_version, '1.2.5');
          if (!isNaN(klevuPluginVersion) && klevuPluginVersion >= 0) {
            pricingFilterClass = 'kuPriceRangeSlider';
          }
        }
      }
      if ('undefined' !== typeof klevu_shopifyStore && klevu_shopifyStore) {
        pricingFilterClass = 'kuPriceRangeSlider';
      }
      filterBox += '<div class="' + pricingFilterClass + '"><div id="ku-price-range"></div>';
      filterBox += '<div > <span id="ku-from-price"></span>&nbsp; <span id="ku-to-price"></span></div></div>';
      filterBox += '</div></div>';

      return filterBox;
    },

    // function for sending query for the selected filter
    sendQuery: function (kuid, first) {
      var selectedFilters,
        doc = document,
        formattedFilters = '',
        predefinedFilters = '',
        filtersBox = document.getElementById('kuFilters'),
        checkBoxes,
        priceFilter = '';
      if (first) {
        document.getElementById(kuid.split('~')[0]).className = 'kuSelected';
      }
      if ('undefined' !== typeof klevu_userFilterResults) {
        predefinedFilters = klevu_userFilterResults;
      }
      checkBoxes = getElementsByClassName('kuSelected', 'li');

      selectedFilters = '';
      for (var i = 0, len = checkBoxes.length; i < len; i++) {
        formattedFilters = klevu_commons.unescapeHtml(document.getElementById(checkBoxes[i].id +
          '~text').value);
        if (predefinedFilters.indexOf(formattedFilters) !== -1) { continue; }
        if (selectedFilters.trim() === '') {
          selectedFilters += formattedFilters;
        } else {
          selectedFilters += ";;" + formattedFilters;
        }
      }
      if ('undefined' !== typeof klevu_showPriceSlider && klevu_showPriceSlider &&
        klevu_userOptions.selectedLandingFilters.indexOf("klevu_price") !== -1) {
        priceFilter = ";;" + klevu_userOptions.selectedLandingFilters.match(/klevu_price:[0-9.\- ]*;*/)[0];
      }
      klevu_userOptions.selectedLandingFilters = selectedFilters + priceFilter;
      if (klevu_addSelectedFiltersToUrl) {
        klevu_commons.addSelectedFiltersToPageUrl(klevu_userOptions.selectedLandingFilters, klevu_productFilterParam);
      }
      klevu_pagination.landingStartPosition = 0;
      if ('undefined' === typeof klevu_multiSelectFilters || !klevu_multiSelectFilters) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }
      //klevu_lpShowLoader();
      if (document.getElementById("kuProductContent")) {
        document.getElementById('kuProductContent').style.opacity = "0.3";
      }
      klevu_landingFilters.loadingFiltersFor = "filter-selection";
      klevu_search.fetchResults(document.getElementById('searchedKeyword').value, 'klp');
      return false;
    },

    // function for showing all filters
    showAll: function (boxId, link) {
      var doc = document,
        box = document.getElementById(boxId),
        key = boxId.substring(boxId.indexOf('-') + 1, boxId.length);

      box.style.height = "auto";
      box.style.overflow = "visible";
      document.getElementById('kuShowOpt-' + key).style.display = "none";
      document.getElementById('kuHideOpt-' + key).style.display = "block";
    },

    // function for hiding filters
    hideAll: function (boxId) {
      var doc = document,
        box = document.getElementById(boxId),
        key = boxId.substring(boxId.indexOf('-') + 1, boxId.length);

      box.style.height = "";
      box.style.overflow = "hidden";
      document.getElementById('kuShowOpt-' + key).style.display = "block";
      document.getElementById('kuHideOpt-' + key).style.display = "none";
    },

    showSelectedFilter: function (kuid, selectedFilter, i, filterLabel, filterType) {
      var doc = document,
        selectedFilterDoc = document.getElementById('ku-search-filter-tags'),
        clearAllEl = document.getElementById('kuClearAllFilters'),
        filterHeadText = '',
        priceFilter = '';
      if (selectedFilterDoc) {
        if (i === -1) {
          selectedFilterDoc.innerHTML = "";
          return;
        }
        if (i === 0) {
          selectedFilterDoc.innerHTML = "";
        }
        // if( filterLabel ){
        //   filterHeadText = '';
        // }      
        if (undefined !== typeof filterType && filterType === 'Price-Range') {
          if (!document.getElementById('kuPriceRangeTag')) {
            selectedFilter = selectedFilter.split(':')[1];
            filterHeadText = klevu_translateFilterLabel('PRICE RANGE').toUpperCase() + " : ";
            selectedFilterDoc.innerHTML += '<span class="ku-search-filter-tag" id="kuPriceRangeTag"> ' + filterHeadText + selectedFilter + ' <a class="ku-search-filter-remove" onclick="klevu_landingFilters.cancelPriceSliderFilter(); ">x</a></span> ';
          }
        } else {
          selectedFilterDoc.innerHTML += '<span class="ku-search-filter-tag"><span>' + selectedFilter + '</span><a class="ku-search-filter-remove" onclick="klevu_landingFilters.cancelFilter(\'' + kuid + '\'); "><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-close" viewBox="0 0 64 64"><path d="M19 17.61l27.12 27.13m0-27.12L19 44.74"></path></svg></a></span> ';
        }
        if (document.getElementById('kuClearAllFilters')) {
          document.getElementById('kuClearAllFilters').parentNode.removeChild(document.getElementById('kuClearAllFilters'));
        }
        selectedFilterDoc.innerHTML += '<span class="ku-search-filter-remove-all" id="kuClearAllFilters" onclick="klevu_landingFilters.clearAllFilters(); "><a> ' + klevu_uiLabels.clearAll + '</a></span>';
      }

    },

    // function for removing a filter selection
    cancelFilter: function (id) {
      document.getElementById(id.split('~')[0]).className = "";
      klevu_landingFilters.sendQuery(id, false);
    },

    cancelPriceSliderFilter: function () {
      klevu_userOptions.selectedLandingFilters = klevu_userOptions.selectedLandingFilters.replace(/klevu_price:[0-9.\- ]*;*/, '');
      klevu_landingFilters.sendQuery('', false);
    },

    clearAllFilters: function () {
      var checkBoxes = getElementsByClassName('kuSelected', 'li');
      for (var i = 0, len = checkBoxes.length; i < len; i++) {
        checkBoxes[i].className = "";
      }
      if (document.getElementById('kuPriceRangeTag')) {
        klevu_userOptions.selectedLandingFilters = klevu_userOptions.selectedLandingFilters.replace(/klevu_price:[0-9.\- ]*;*/, '');
      }
      klevu_landingFilters.sendQuery('', false);
    },

    // function for expanding/collapsing filter boxes
    collapseExpand: function (mainId, nameId, showId, hideId, filterId) {
      var doc = document,
        mainBox = document.getElementById(mainId),
        nameBox = document.getElementById(nameId),
        showBox = document.getElementById(showId),
        hideBox = document.getElementById(hideId),
        filterBox = document.getElementById(filterId);

      if (mainBox.className.indexOf('kuCollapse') !== -1) {
        mainBox.className = 'kuFilterHead kuExpand';
        nameBox.style.display = 'none';
        if (showBox) {
          showBox.style.display = 'none';
        }
        if (hideBox) {
          hideBox.style.display = 'none';
        }
        klevu_landingFilters.filterHeight = filterBox.style.height;
        filterBox.style.height = "50px";
      } else if (mainBox.className.indexOf('kuExpand') !== -1) {
        mainBox.className = 'kuFilterHead kuCollapse';
        nameBox.style.display = 'block';
        if (showBox) {
          showBox.style.display = 'block';
        }
        if (hideBox) {
          hideBox.style.display = 'none';
        }
        if (showBox && hideBox) {
          klevu_landingFilters.hideAll(filterId);
        } else {
          filterBox.style.height = 'auto';
        }
      }
    },

    showFiltersOnMobile: function (updateRefineByDiv) {
      var doc = document,
        filtersDiv = document.getElementById('kuFilters'),
        narrowByDiv = document.getElementById('kuFilterRefineMobile');
      updateRefineByDiv = typeof updateRefineByDiv !== 'undefined' ? updateRefineByDiv : true;
      if (narrowByDiv.className.indexOf('kuCollapse') !== -1) {
        if (updateRefineByDiv) {
          narrowByDiv.className = 'kuFilterRefineMobile kuExpand';
          filtersDiv.style.cssText += ";display : none;";
        } else {
          filtersDiv.style.cssText += ";display : block;";
        }

      } else if (narrowByDiv.className.indexOf('kuExpand') !== -1) {
        if (updateRefineByDiv) {
          narrowByDiv.className = 'kuFilterRefineMobile kuCollapse';
          filtersDiv.style.cssText += ";display : block;";
        } else {
          filtersDiv.style.cssText += ";display : none;";
        }
        var filterBoxes = getElementsByClassName('kuFilterHead', 'div');
        for (var i = 0, len = filterBoxes.length; i < len; i++) {
          if (filterBoxes[i].className.indexOf('kuCollapse') !== -1) {
            filterBoxes[i].click();
          }
        }
      }
    }
  },
  addAutocompleteLayoutToPage: function (parent) {
    var searchingAreaDiv,
      cmsContentDiv,
      cmsContentHeading,
      categoryDiv,
      productHeading,
      productDiv,
      fluidDiv,
      hoverDiv,
      hoverFluidDiv,
      suggestionsBlock,
      resultsBlock;

    // fluid div
    if (klevu_fluidLayoutEnabled) {
      fluidDiv = this.addElementToParent(parent, 'div', {
        'class': 'klevu-fluid'
      });
    } else {
      fluidDiv = parent;
    }

    // loader
    loaderContainerDiv = this.addElementToParent(fluidDiv, 'div', {
      'class': 'klevu-searching-area-l2',
      'id': 'loaderContainer',
      'style': 'display:none;'
    });
    this.addLoaderDiv(loaderContainerDiv);

    // Arrow
    this.addElementToParent(fluidDiv, 'div', {
      'class': 'klevu-arrow',
      'id': 'klevuArrow',
      'style': 'display:none;'
    });

    // searching area
    searchingAreaDiv = this.addElementToParent(fluidDiv, 'div', {
      'class': 'klevu-searching-area-l2',
      'id': 'klevuSearchingArea',
      'style': 'display:none;'
    });

    if (klevu_showPopularSearches || klevu_showRecentSerches ||
      klevu_userOptions.showRecentlyViewedItems || klevu_userOptions.showTrendingProducts) {
      hoverDiv = document.createElement('div');
      hoverDiv.setAttribute('class', 'klevu-pt-rs-hover');
      hoverDiv.setAttribute('id', 'klevu-pt-rs-hover');
      hoverDiv.style.display = "none";
      if (klevu_fluidLayoutEnabled) {
        hoverFluidDiv = document.createElement('div');
        hoverFluidDiv.setAttribute('class', 'klevu-fluid');
        hoverFluidDiv.appendChild(hoverDiv);
        parent.appendChild(hoverFluidDiv);
      } else {
        parent.appendChild(hoverDiv);
      }

      var addDiv = false;
      // add popular searches div
      if (klevu_showPopularSearches) {
        addDiv = this.addPopularSearchesDiv(hoverDiv);
      }

      // add recent searches div
      if (klevu_showRecentSerches) {
        addDiv = this.addRecentSearchesDiv(hoverDiv);
      }

      if (!addDiv) {
        hoverDiv.style.display = "none";
      }
    }


    closeButton = this.addElementToParent(searchingAreaDiv, 'div', {
      'class': 'klevuCustomClosebtnBlock',
      'id': 'klevuCustomCloseActivate'
    });
    closeButton.innerHTML = '<a href="#" class="klevuCustomClosebtn" onclick="klevu_layout.clearResults(event, \'docClick\');"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="30" height="30" viewBox="0 0 612.043 612.043" style="enable-background:new 0 0 612.043 612.043;" xml:space="preserve"><path d="M397.503,306.011l195.577-195.577c25.27-25.269,25.27-66.213,0-91.482c-25.269-25.269-66.213-25.269-91.481,0L306.022,214.551L110.445,18.974c-25.269-25.269-66.213-25.269-91.482,0s-25.269,66.213,0,91.482L214.54,306.033L18.963,501.61c-25.269,25.269-25.269,66.213,0,91.481c25.269,25.27,66.213,25.27,91.482,0l195.577-195.576l195.577,195.576c25.269,25.27,66.213,25.27,91.481,0c25.27-25.269,25.27-66.213,0-91.481L397.503,306.011z"></path></svg></a>';


    // no-results div
    this.addElementToParent(searchingAreaDiv, 'div', {
      'class': 'klevuNoResults klevuNoResults-new',
      'id': 'klevuSearchNoResults',
      'style': 'display:none;'
    });

    // banner ad block - top
    if ('undefined' !== typeof klevu_showBannerAds && klevu_showBannerAds) {
      this.addElementToParent(searchingAreaDiv, 'div', {
        'class': 'klevu-banner-ad',
        'id': 'klevuBannerAdTop',
        'style': 'padding:0px;'
      });
    }

    // suggestions block
    suggestionsBlock = this.addElementToParent(searchingAreaDiv, 'div', {
      'class': 'klevuSuggestionsBlock',
      'id': 'klevuSuggestionsBlock'
    });

    // Autosuggestion
    this.addElementToParent(suggestionsBlock, 'div', {
      'class': 'klevuAutoSuggestion-l2',
      'id': 'klevuAutoCompleteArea',
      'style': 'display:none;'
    });

    // CMS
    cmsContentDiv = this.addElementToParent(suggestionsBlock, 'div', {
      'class': 'klevuAutoSuggestion-l2',
      'id': 'klevuCmsContentArea',
      'style': 'display:none;'
    });

    cmsContentHeading = this.addElementToParent(suggestionsBlock, 'div', {
      'class': 'klevuSuggestionHeading',
      'style': 'display:none;'
    });
    cmsContentHeading.innerHTML = '<span class="klevuHeadingText">Pages</span>';

    // category
    categoryDiv = this.addElementToParent(suggestionsBlock, 'div', {
      'class': 'klevuAutoSuggestion-l2',
      'id': 'klevuCategoryArea',
      'style': 'display:none;'
    });


    //results block
    resultsBlock = this.addElementToParent(searchingAreaDiv, 'div', {
      'class': 'klevuResultsBlock',
      'id': 'klevuResultsBlock'
    });

    // Products
    productHeading = this.addElementToParent(resultsBlock, 'div', {
      'class': 'klevuSuggestionHeading',
      'id': 'klevuProductHeading',
      'style': 'display:none;'
    });

    productDiv = this.addElementToParent(resultsBlock, 'div', {
      'class': 'klevuSearchResults-l2',
      'id': 'productsList',
      'style': 'display:none;'
    });

    //static block
    staticDiv = this.addElementToParent(searchingAreaDiv, 'div', {
      'class': 'klevuAutoSuggestion-l2',
      'id': 'klevuStaticArea',
      'style': 'display:block;'
    });

    staticDivHead = this.addElementToParent(staticDiv, 'div', {
      'class': 'klevuSuggestionHeading'
    });
    staticDivHead.innerHTML = '<span class="klevuHeadingText">Looking for information?</span>';
    staticDivList = this.addElementToParent(staticDiv, 'ul', {
      'class': 'klevuULStaticAreaList'
    });
    staticDivList.innerHTML += '<li><a href="/pages/order-lookup">Order Status</a></li>';
    staticDivList.innerHTML += '<li><a href="/pages/shipping-returns">Shipping & Returns</a></li>';
    staticDivList.innerHTML += '<li><a href="/pages/contact-us">Contact Us</a></li>';

    // banner ad block - bottom
    if ('undefined' !== typeof klevu_showBannerAds && klevu_showBannerAds) {
      this.addElementToParent(searchingAreaDiv, 'div', {
        'class': 'klevu-banner-ad',
        'id': 'klevuBannerAdBottom',
        'style': 'padding:0px;'
      });
    }
  },
  showResultsData: function (response) {
    var doc = document,
      noOtherDataAvailable = true,
      klevuSearchNoResult = document.getElementById('klevuSearchNoResults'),
      arrowDiv = document.getElementById('klevuArrow'),
      noResultLayout,
      noResultLayoutWrapper,
      noResultLayoutLoaded;


    // hide loader
    this.hideLoader();
    if (klevu_searchedTerm.length === 0) {
      return;
    }
    //hide no-results div
    if (klevuSearchNoResult) {
      klevuSearchNoResult.style.display = "none";
    }

    // show autosuggestion
    if (klevu_showAdvancedAutosuggestionLayout) {
      this.showAdvancedAutoSuggestions(response.autoComplete, noOtherDataAvailable, response.meta);
    } else {
      this.showAutoSuggestions(response.autoComplete, response.meta);

      // show cms content
      this.showCmsContent(response.pages);

      // show filters
      this.showCategories(response.categories);

      // check if other data is available
      if ((response.autoComplete && response.autoComplete.length > 0) ||
        (response.categories && response.categories.length > 0) ||
        (response.pages && response.pages.length > 0)) {
        noOtherDataAvailable = false;
      }
      // show products
      this.showProducts(response.meta, response.result, noOtherDataAvailable, response.popularProducts);

      if (!noOtherDataAvailable || response.result.length > 0) {
        klevu_commons.showBannerAdForGivenTerm(klevu_searchedTerm);
      } else {
        klevu_commons.showBannerAdForGivenTerm("");
      }
    }
    document.getElementById('klevuSearchingArea').style.cssText += ";display : block !important;";
    if (arrowDiv) {
      arrowDiv.style.display = "none"; // removing !important added at the time of clearing results.
    }

    // add class to the search-container, which pointing on No-result page
    noResultLayout = document.getElementById('klevuSearchNoResults');
    noResultLayoutWrapper = document.getElementById('klevuSearchingArea');

    function hasClass(element, className) {
      return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }

    noResultLayoutLoaded = hasClass(noResultLayoutWrapper, 'noResultLayoutLoaded');

    if (noResultLayout.style.display !== 'none' && !noResultLayoutLoaded) {
      noResultLayoutWrapper.classList.add('noResultLayoutLoaded');
    } else if (noResultLayout.style.display === 'none' && noResultLayoutLoaded) {
      noResultLayoutWrapper.classList.remove('noResultLayoutLoaded');
    }
    // END OF add class to the search-container, which pointing on No-result page

  },
  showLandingPageData: function (product) {
    var toReturn = '',
      toAppendwithSalePrice = '',
      priceWithCurrency = '',
      appendCurrencyAtLast = false,
      salepriceClass = 'kuSalePrice',
      priceFormatter, priceToSet,
      showToLabel = false,
      additionalParams = '',
      keywords = document.getElementById('searchedKeyword').value,
      trackingParams = "",
      trackingEventHtml = "",
      i = 0, currentSwatch, swatchEventHandlerHtml,
      swatchFocusHandler, swatchBlurHandler, swatchColor,
      swatchCount = 0, swatchesShown = false, swatchesHtml = "",
      totalSwatchesToShow = 5;

    product = klevu_productCustomizations(product);
    if (product.productImage.trim().length === 0) {
      product.productImage = klevu_userOptions.noImageUrl;
    }

    if (klevu_apiKey === 'klevu-13939350527231') {
      toAppendwithSalePrice = '<span class="priceGreyText">Starting Price</span>';
    }

    if (klevu_userOptions.openProductClicksInNewWindow) {
      additionalParams = ' target="_blank"';
    } else {
      additionalParams = ' onclick="klevu_analytics.stopClickDefault( event );"';
    }
    trackingParams = '{' +
      'data: {' +
      'code: \'' + escape(product.productCode) + '\',' +
      'url: \'' + escape(product.productUrl) + '\',' +
      'name: \'' + escape(product.productName) + '\',' +
      'salePrice: \'' + escape(product.salePrice) + '\',' +
      'rating: \'' + escape(product.rating) + '\',' +
      'position: ' + product.productPosition + ',' +
      'category: \'' + escape(product.category) + '\',' +
      'sku: \'' + escape(product.sku) + '\'' +
      '},' +
      'apiKey: null,' +
      'keywordsLP: \'' + escape(keywords) + '\'' +
      '}';

    if (klevu_commons.isMobileDevice()) {
      trackingEventHtml = ' onclick="return klevu_analytics.trackClickedProduct(event, ' + trackingParams + ');" >';
    } else {
      trackingEventHtml = ' onmousedown="return klevu_analytics.trackClickedProduct(event, ' + trackingParams + ');" ' + additionalParams + '>';
    }
    try {
      // code for the result block
      toReturn += '<li>';
      if (product.inStock && product.inStock.toLowerCase() === 'no') {
        toReturn += '<div class="grid-product__tag grid-product__tag--sold-out">Sold Out</div>';
      }
      if (product.badge && product.badge.toLowerCase() === 'new') {
        toReturn += '<div class="grid-product__tag grid-product__tag--new">New</div>';
      }
      toReturn += '<div class="klevuImgWrap">';
      toReturn += '<a href="' + product.productUrl.replace(/"/g, "%22") + '" ';
      if (klevu_userOptions.showRolloverImage && product.imageHover) {
        toReturn += ' onmouseleave = "klevu_commons.updateProductThumbnailImage(\'' + escape(product.productImage) + '\', \'klevuProductImage-' + product.id + '\');" ' +
          ' onmouseenter = "klevu_commons.updateProductThumbnailImage(\'' + escape(product.imageHover) + '\', \'klevuProductImage-' + product.id + '\');" ';
      }
      toReturn += ' target="_blank" ' + trackingEventHtml +
        '<img id= "klevuProductImage-' + product.id + '" src="' + product.productImage + '" onerror="this.onerror=null;this.src=\'' +
        klevu_userOptions.noImageUrl + '\';" alt="' + klevu_commons.escapeHtml(product.productName) + '"/>';

      toReturn += '</a></div>'; //closing image wrap


    } catch (e) { }

    if ('undefined' !== typeof klevu_showDiscountBadge &&
      klevu_showDiscountBadge && product.discount != '' &&
      product.discount != '0' && product.discount != '0.0') {
      if (klevu_uiLabels.discountBadgeText.indexOf("#") === -1) {
        toReturn += '<div class="kuDiscountBadge">' +
          klevu_uiLabels.discountBadgeText + ' ' +
          Number(product.discount).toFixed(0) +
          '%</div>';
      } else {
        toReturn += '<div class="kuDiscountBadge">' +
          klevu_uiLabels.discountBadgeText.replace("#", Number(product.discount).toFixed(0) + "%") +
          '</div>';
      }
    }
    toReturn += '<div class="kuNameDesc">';
    toReturn += '<div class="kuName"><a href="' + product.productUrl.replace(/"/g, "%22") +
      '" target="_blank" ' + trackingEventHtml;
    toReturn += product.productName + '</a></div>';
    toReturn += '<div class="kuDesc">' + product.productDescription + '</div>';


    toReturn += '<div class="kuPrice">';
    if (klevu_showPrices) {
      if (klevu_userOptions.showOnlyOriginalAndSalePrices) {
        toReturn += klevu_commons.showOriginalAndSalePrices('LANDING', product,
          salepriceClass, 'kuSalePrice kuSpecialPrice');
      } else {
        toReturn += klevu_commons.showProductPrices('LANDING', product,
          salepriceClass, 'kuSalePrice kuSpecialPrice');
      }
    }
    toReturn += '</div>';

    if (product.rating.trim().length > 0 && !isNaN(Number(product.rating)) &&
      Number(product.rating) <= 5 && Number(product.rating) >= 0) {
      var starWidth = 20 * Number(product.rating);
      toReturn += '<div class="kuStarsSmall">' +
        '<div class="kuRating" style="width:' + starWidth +
        '%;"></div></div>';
    }

    if (klevu_userOptions.showProductSwatches && product.swatches && product.swatches.swatch && product.swatches.swatch.length > 0) {
      totalSwatchesToShow = product.swatches.swatch.length > totalSwatchesToShow ? totalSwatchesToShow : product.swatches.swatch.length;
      for (i = 0; i < totalSwatchesToShow; i++) {
        currentSwatch = product.swatches.swatch[i];
        if (currentSwatch.image) {
          swatchesShown = true;
          swatchColor = currentSwatch.color.replace(/ /g, "").replace(/-/g, "");
          if (!currentSwatch.swatchImage && !klevu_commons.isValidCSSColor(swatchColor)) {
            swatchesHtml += '<div class="klevuSwatchItem klevuDefaultSwatch">';
          } else {
            swatchesHtml += '<div class="klevuSwatchItem">';
          }
          swatchFocusHandler = 'klevu_commons.updateProductThumbnailImage(\'' + escape(currentSwatch.image) + '\', \'klevuProductImage-' + product.id + '\');';
          swatchBlurHandler = 'klevu_commons.updateProductThumbnailImage(\'' + escape(product.productImage) + '\', \'klevuProductImage-' + product.id + '\');';
          if (klevu_commons.isMobileDevice()) {
            swatchEventHandlerHtml = ' onclick = "' + swatchFocusHandler + '" ';
          } else {
            swatchEventHandlerHtml = ' onmouseleave = "' + swatchBlurHandler + '" onmouseenter = "' + swatchFocusHandler + '" ';
          }

          swatchesHtml += '<a href = "javascript:void(0);" class = "klevuSwatchLink" ' + swatchEventHandlerHtml;
          swatchesHtml += ' style = "background-color:' + swatchColor +
            '; background-image:url(\'' + currentSwatch.swatchImage + '\');" title="' + currentSwatch.color + '">';
          swatchesHtml += '</a></div>';
        } else {
          swatchCount += 1;
        }
      }
      if (product.swatches.swatch.length > totalSwatchesToShow) {
        swatchCount += product.swatches.swatch.length - totalSwatchesToShow;
      }
      if (!swatchesShown) {
        swatchesHtml = '<div class="klevuSwatches" style="display:none;">' + swatchesHtml;
      } else {
        swatchesHtml = '<div class="klevuSwatches">' + swatchesHtml;
      }
      swatchCount += (product.swatches.numberOfAdditionalVariants ? +(product.swatches.numberOfAdditionalVariants) : 0);
      if (swatchCount > 0 && swatchesShown) {
        swatchesHtml += '<div class = "klevuSwatchItem klevuSwatchMore">' +
          '<a href = "' + product.productUrl.replace(/"/g, "%22") + '" class = "klevuSwatchLink"' + trackingEventHtml +
          '<span class = "klevuSwatchMoreText">+' + swatchCount + '</span></a></div>';
      }

      swatchesHtml += '</div>';
      toReturn += swatchesHtml;
    }

    if (klevu_userOptions.vatCaption.trim().length > 0) {
      toReturn += '<div class="klevu-vat-caption">(' + klevu_userOptions.vatCaption + ')</div>';
    }

    if (product.totalProductVariants && product.totalProductVariants != '0' && !swatchesShown) {
      if (klevu_uiLabels.variants.indexOf("#") === -1) {
        toReturn += '<div class="klevu-variants">+' + product.totalProductVariants +
          ' ' + klevu_uiLabels.variants + '</div>';
      } else {
        toReturn += '<div class="klevu-variants">' +
          klevu_uiLabels.variants.replace("#", product.totalProductVariants) + '</div>';
      }
    }
    if (klevu_userOptions.outOfStockCaption.trim().length > 0) {
      if ((product.inStock) && product.inStock.toLowerCase() === 'no') {
        toReturn += '<div class="klevu-out-of-stock">' +
          klevu_userOptions.outOfStockCaption + '</div>';
      }
    }

    toReturn += '</div>';
    if (klevu_commons.showAddToCartButton(product.inStock, product.hideAddToCart)) {
      if (!(product.isCustomOptionsAvailable && product.isCustomOptionsAvailable === "yes") &&
        (!product.totalProductVariants || product.totalProductVariants == '0')) {
        toReturn += '<div class="kuAddtocart">' +
          '<input type="text" name="klevu-qty" id="klevu-qty-' +
          escape(product.productCode) + '" placeholder="' +
          klevu_uiLabels.addToCartPlaceholder + '"/>' +
          '<a href="javascript:klevu_lpSendProductToCart(\'' +
          escape(product.productCode) + '\', \'' +
          escape(product.productUrl) + '\', \'klevu-qty-' +
          escape(product.productCode) + '\');" ' +
          'class="kuAddtocartBtn">' + klevu_userOptions.addToCartButton + '</a>' +
          '</div>';
      } else {
        toReturn += '<div class="kuAddtocart">' +
          '<a href="' + product.productUrl.replace(/"/g, "%22") +
          '" class="kuAddtocartBtn">' + klevu_userOptions.addToCartButton + '</a>' +
          '</div>';
      }
      toReturn += '<div class="klevu-clearboth-listview"></div>';
    }
    toReturn += '<div class="kuClearLeft"></div>';
    toReturn += '</li>';

    return toReturn;
  },
  showAutocompleteProducts: function (product) {
    var productHtml = '',
      trackingParams = '',
      imgAlt,
      imgAltDiv = document.createElement('div');
    product = klevu_productCustomizations(product);
    if (product.productImage.trim().length === 0) {
      product.productImage = klevu_userOptions.noImageUrl;
    }
    if (klevu_userOptions.openProductClicksInNewWindow) {
      additionalParams = ' target="_blank"';
    } else {
      additionalParams = ' onclick="klevu_analytics.stopClickDefault( event );"';
    }
    trackingParams = '{' +
      'data: {' +
      'code: \'' + escape(product.productCode) + '\',' +
      'url: \'' + escape(product.productUrl) + '\',' +
      'name: \'' + escape(product.productName) + '\',' +
      'salePrice: \'' + escape(product.salePrice) + '\',' +
      'rating: \'' + escape(product.rating) + '\',' +
      'position: ' + product.productPosition + ',' +
      'category: \'' + escape(product.category) + '\',' +
      'sku: \'' + escape(product.sku) + '\'' +
      '}' +
      '}';
    imgAltDiv.innerHTML = product.productName;
    imgAlt = imgAltDiv.textContent || imgAltDiv.innerText || "";
    productHtml += '<li>';

    productHtml += '<a href="' + product.productUrl.replace(/"/g, "%22") + '" class="klevu-result-box-l2" ';
    if (klevu_commons.isMobileDevice()) {
      productHtml += ' onclick="return  klevu_analytics.trackClickedProduct(event, ' + trackingParams + ');"  >';
    } else {
      productHtml += ' onmousedown="return  klevu_analytics.trackClickedProduct(event, ' + trackingParams + ');" ' +
        additionalParams + ' >';
    }

    productHtml += '<div class="klevu-img-wrap-l2">';
    if (product.inStock && product.inStock === 'no') {
      productHtml += '<div class="grid-product__tag grid-product__tag--sold-out">Sold Out</div>';
    }
    if (product.badge && product.badge.toLowerCase() === 'new') {
      productHtml += '<div class="grid-product__tag grid-product__tag--new">New</div>';
    }
    productHtml += '<img src="' + product.productImage +
      '" onerror="this.onerror=null;this.src=\'' + klevu_userOptions.noImageUrl +
      '\';" alt="' + klevu_commons.escapeHtml(imgAlt) + '" /></div>';
    if ('undefined' !== typeof klevu_showDiscountBadge &&
      klevu_showDiscountBadge && product.discount != '' &&
      product.discount != '0' && product.discount != '0.0') {
      if (klevu_uiLabels.discountBadgeText.indexOf("#") === -1) {
        productHtml += '<div class="klevu-discount-badge-l2">' +
          klevu_uiLabels.discountBadgeText + ' ' + Number(product.discount).toFixed(0) +
          '%</div>';
      } else {
        productHtml += '<div class="klevu-discount-badge-l2">' +
          klevu_uiLabels.discountBadgeText.replace("#", Number(product.discount).toFixed(0) + "%") +
          '</div>';

      }
    }
    productHtml += '<div class="klevu-name-desc-l2">';
    productHtml += '<div class="klevu-name-l2">' + product.productName + '</div>' +
      '<div class="klevu-desc-l2">' + product.productDescription + '</div>';
    // show prices
    if (klevu_showPrices) {
      productHtml += '<div class="klevu-price-l2">';
      if (klevu_userOptions.showOnlyOriginalAndSalePrices) {
        productHtml += klevu_commons.showOriginalAndSalePrices('SLIM', product, 'klevu-saleprice-l2',
          'klevu-saleprice-l2 klevu-special-price-l2');
      } else {
        productHtml += klevu_commons.showProductPrices('SLIM', product, 'klevu-saleprice-l2',
          'klevu-saleprice-l2 klevu-special-price-l2');
      }
      if (klevu_userOptions.vatCaption.trim().length > 0) {
        productHtml += '<span class="klevu-vat-caption-l2">(' +
          klevu_userOptions.vatCaption + ')</span>';
      }
      productHtml += '</div>';
    }
    if (product.rating.trim().length > 0 && !isNaN(Number(product.rating)) &&
      Number(product.rating) <= 5 && Number(product.rating) >= 0) {
      var starWidth = 20 * Number(product.rating);
      productHtml += '<div class="klevu-stars-small-l2">' +
        '<div class="klevu-rating-l2" style="width:' + starWidth +
        '%;"></div></div>';
    }
    if (klevu_userOptions.outOfStockCaption.trim().length > 0) {
      if (product.inStock && product.inStock === 'no') {
        productHtml += '<div class="klevu-out-of-stock-l2">' +
          klevu_userOptions.outOfStockCaption + '</div>';
      }
    }
    productHtml += '</div><div class="klevu-clear-left"></div></a></li>';
    return productHtml;
  }
}


function klevu_afterLandingResultsLoaded(results) {
  if (results.length <= 0) {
    return;
  }
  klevu_uc_helpers.swatchImagesInColorFacet(results);
  klevu_uc_helpers.addKlevuClassToSRLP();
  klevu_uc_helpers.addSearchTermToHeader();
  klevu_uc_helpers.closeFirstThreeFacets();
}

function klevu_uc_productCustomizations(product) {
  if (product.length <= 0) {
    return;
  }
  klevu_uc_helpers.changeImageSize(product, '_540x540', '_medium');
  klevu_uc_helpers.changeSwatchesImage(product);


  return product;
}


