/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {
  'use strict';
  $.fn.equalizeHeights = function(){
    return this.height( Math.max.apply(this, $(this).map(function(i,e){return $(e).height();}).get() ) );
  };

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.my_custom_behavior = {
    attach: function (context, settings) {

      // Place your code here.

    }
  };
  
  function equalizeTeam() {
    if($('.our-team').length > 0) {
      $('.our-team .team-member').css({'height': 'auto'});
      if($(window).width() > 992 ) {
        $('.our-team').each(function() {
          $('.team-member', $(this)).equalizeHeights();
        });
      }
    }
  }
  
  function equalizeTwoColImageSection() {
    if($('.two-cols-image-section').length > 0) {
      $('.two-cols-image-section').each(function() {
        var $item = $(this);
        $('.col-left, .col-right', $item).css({'height': 'auto'});
        if($(window).width() > 992 ) {
          $('.col-left, .col-right', $item).equalizeHeights();
        }
      });
    }
  }
  
  function equalizeResources() {
    if($('.additional-resources').length > 0) {
      $('.additional-resources .resource-item-wrapper').css({'height': 'auto'});
      if($(window).width() > 992 ) {
        $('.additional-resources').each(function() {
          $('.resource-item-wrapper', $(this)).equalizeHeights();
        });
      }
    }
  }
  
  function equalizeNewsBlocks() {
  if($('.region-newsblock').length > 0) {
      $('.region-newsblock .views-row').css({'height': 'auto'});
      if($(window).width() > 992 ) {
        $('.region-newsblock').each(function() {
          $('.views-row', $(this)).equalizeHeights();
        });
      }
    }
  }
  
  function equalizeLogos() {
  if($('.two-cols-image-section').length > 0) {
      $('.two-cols-image-section .logo').css({'height': 'auto', 'padding': 0});
      if($(window).width() > 992 ) {
        $('.two-cols-image-section').each(function() {
          $('.logo', $(this)).equalizeHeights();
          $('.logo', $(this)).each(function(e) {
            $(this).css({'padding-top': (($(this).height() - $('img', $(this)).height())/2) + 'px'});
          });
          
          
        });
      }
    }
  }
  
  
  function windowLoad() {
    equalizeTwoColImageSection();
    equalizeNewsBlocks();
    equalizeTeam();
    equalizeResources();
    equalizeLogos();
  }
  
  function windowResize() {
    equalizeTwoColImageSection();
    equalizeNewsBlocks();
    equalizeTeam();
    equalizeResources();
    equalizeLogos();
  }
  
  
  
  $(document).ready(function() {
    var searchExpanded = false;
    
    if($('.search-form').length > 0) {
      $('.search-form').each(function() {
        $('input[type="text"]', $(this)).attr({'placeholder': 'Search'});
      });
    }
    
    if($('.form-file').length > 1000) {
      $('.form-file').each(function() {
        var $item = $(this);
        var $parent = $item.parents('.form-managed-file');
        $item.wrap( "<div class='form-file-wrapper'></div>" );
        var $filename = $('<div class="file-name">');
        $parent.append($filename);
        
        
        //changing file name on file selection
        $item.change(function(e){
          var fileName = e.target.files[0].name;
          if(fileName!==''){
            $filename.text(fileName);
          }
        });
      });
    }
    
    
    $('.menu-toggle').click(function(e) {
      e.preventDefault();
      $(this).toggleClass('menu-toggle--active');
      $('#navigation').toggleClass('open--menu');
    });
    
    $(document).bind('click touchstart', function(e) {
      var $clicked = $(e.target);
      var $nav = $('#navigation');
      if($nav.hasClass('open--menu')) {
        if ($clicked.parents('#navigation').length > 0 || 
          $clicked.attr('id')==='navigation' || 
          $clicked.parents('.menu-toggle').length > 0 || 
          $clicked.hasClass('menu-toggle'))  {
  //          Do nothing
        } else {
          $nav.toggleClass('open--menu');
          $('.menu-toggle').toggleClass('menu-toggle--active');
        }
      }
      
      if(!($nav.hasClass('open--menu'))) {
        if($clicked.parents('#block-search-form.active').length == 0) {
          $('#block-search-form').removeClass('active');
        }
        
        if ($clicked.parents('#block-ccsf-translation-ccsf-translation-form').length > 0 || 
          $clicked.parents('#block-ccsf-translation-ccsf-translation-icon').length > 0 )  {
  //          Do nothing
        } else {
          $('#block-ccsf-translation-ccsf-translation-form').removeClass('active');
        }
      }
    });
    
    
    $('#primary-navigation').each(function() {
      var $navWrapper = $('#navigation');
      var $nav = $(this);
      $('.is-expanded', $nav).each(function() {
        var $navHeader = $(this);
        var $itemHeader = $('a:eq(0)', $navHeader);
        var $itemMenus = $('.menu', $navHeader);
        $itemHeader.click(function(e) {
          if($navWrapper.hasClass('open--menu')) {
//            e.stopImmediatePropagation();
            if($itemHeader.hasClass('is-active-trail')) {
              // do nothing here, just redirect to the target link
            } else {
              e.preventDefault();
              $itemHeader.toggleClass('is-active-trail');
              $itemMenus.stop().slideToggle();
              $('.is-expanded', $nav).not($navHeader).each(function() {
                $('a:eq(0)', $(this)).removeClass('is-active-trail');
                $('.menu', $(this)).slideUp();
              });
              
            }
          }
        });
      });
    });
    
    
    if($('#block-search-form').length > 0) {
      $('#block-search-form').each(function() {
        var $formSearchWrapper = $(this);
        $('.form-submit', $formSearchWrapper).click(function() {
          if($formSearchWrapper.hasClass('active') || $formSearchWrapper.parents('.open--menu').length > 0) {
            // do the search
          } else {
            $formSearchWrapper.addClass('active');
            return false;
          }
        });
      });
    }
    
    $('#block-ccsf-translation-ccsf-translation-icon').click(function(e) {
      $('#block-ccsf-translation-ccsf-translation-form').toggleClass('active')
    });
    
    
    if($('.two-col-carousel').length > 0) {
      var settings ={
        auto: false,
        pager: false,
        controls: true,
        responsive:true,
        easing: 'easeInOutExpo',
        pause:3000
      };
      var callSlider = $('.two-col-carousel').bxSlider(settings);
      $(window).resize(function(){
        settings.startSlide = callSlider.getCurrentSlide();
          callSlider.reloadSlider(settings);
        });
//      $('.two-col-carousel').bxSlider({
//        
//      });
    }
//      $jq(".two-col-carousel").owlCarousel({
//        navigation : true, // Show next and prev buttons
//        slideSpeed : 300,
//        paginationSpeed : 400,
//        singleItem:true
//
//          // "singleItem:true" is a shortcut for:
//          // items : 1, 
//          // itemsDesktop : false,
//          // itemsDesktopSmall : false,
//          // itemsTablet: false,
//          // itemsMobile : false
//      });
    
    
    // Equalize columns on page resize
    $(window).load(windowLoad);
    $(window).resize(windowResize);
    
    
    
    
    if($('.faq-item').length > 0) {
      $('.faq-item').each(function() {
        var $item = $(this);
        var $itemHeader = $('.item-header', $item);
        var $itemContent = $('.item-content', $item);
        $itemHeader.click(function(e) {
          e.preventDefault();
          $item.toggleClass('expanded');
          $itemContent.slideToggle();
        });
      });
    }
    
    
    
    if($('.video__play-trigger').length > 0) {
      $('.video__play-trigger').click(function(e) {
        e.preventDefault();
        var $parent = $('.video-embed');
        $parent.append('<iframe src="'+$(this).attr('href')+'/?autoplay=1" width="100" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
        return false;
      });
    }
    
    
    
    if($(".form-select").length > 1000){
      $(".form-select").each(function () {
        var $this = $(this), numberOfOptions = $(this).children('option').length;
        var selected = $this.find("option[selected]");
        var placeholder = $this.attr('placeholder');
          
        // Hides the select element
        $this.addClass('s-hidden');

        // Wrap the select element in a div
        $this.wrap('<div class="select"></div>');

        // Insert a styled div to sit over the top of the hidden select element
        $this.after('<div class="styledSelect"></div>');

         // Cache the styled div
        var $styledSelect = $this.next('div.styledSelect');

        // Show the first select option in the styled div
        if(selected.length > 0) {
          $styledSelect.text(selected.text());//$this.children('option').eq(0).text());
        } else if (placeholder && placeholder.length > 0){
          $styledSelect.text($this.attr('placeholder'));
        } else {
          $styledSelect.text($this.children('option').eq(0).text());
        }

        // Insert an unordered list after the styled div and also cache the list
        var $list = $('<ul />', {'class': 'options'}).insertAfter($styledSelect);

        // Insert a list item into the unordered list for each select option
        for (var i = 0; i < numberOfOptions; i++) {
          $('<li />', {text: $this.children('option').eq(i).text(), rel: $this.children('option').eq(i).val()}).appendTo($list);
        }

        // Cache the list items
        var $listItems = $list.children('li');

        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        $styledSelect.click(function (e) {
          e.stopPropagation();
          var $item = $(this);
          var $list = $(this).next('ul.options').hide();
          
          if($item.hasClass('active')) {
            $item.removeClass('active');
            $list.stop().hide();
          } else {
            $item.addClass('active');
            $list.stop().show();
          }
        });

        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        $listItems.click(function (e) {
          e.stopPropagation();
          $styledSelect.text($(this).text()).removeClass('active');
          $this.val($(this).attr('rel'));
          $list.hide();
        });

        // Hides the unordered list when clicking outside of it
        $(document).click(function () {
           $styledSelect.removeClass('active');
           $list.hide();
        });
      });
    }
  });

})(jQuery, Drupal, this, this.document);
