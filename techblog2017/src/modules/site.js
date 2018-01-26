var Site = Site || {};
(function( $ ) {
  Site = {
    //properites  
    bootstrap : function(){   
      console.log('init site bootstrap');
      this.highlightcode();
      this.navBarEvent();
      this.scrollEvent();
      this.lazyLoading();
      this.scrollpy();
    },
    // highlight code
    highlightcode: function(){
      // hljs.configure({
      //   tabReplace: '    ', // 4 spaces
      //   classPrefix: '', // don't append class prefix
      //   useBR: true
      // })
      // hljs.initHighlighting();      
      // console.log(hljs.listLanguages());
      // hljs.configure({useBR: true});
      Prism.highlightAll();
    },
    // scrollpy
    scrollpy: function(){
      if( $('.article-scrollby').length > 0 ){
        var $article_scrollby = $('.article-scrollby');
        var article_tiles = $article_scrollby.find(':header');
        var $article_scrollby_sidebar = $($article_scrollby.attr('data-target'));
        var pos_buffer = $('.navbar-fixed').outerHeight(true) + parseInt($('.main-content').css('padding-top'));
        if( $article_scrollby_sidebar.length > 0 ){
          var $article_scrollpy_links = $article_scrollby_sidebar.find('.article-scrollpy-links');
          article_tiles.each(function(index, ele){
            $(ele).attr('id', 'article-titles-' + index);
            $article_scrollpy_links.append('<li><a class="article-titles-link" href="javascript:void(0);" data-href="#' + 'article-titles-' + index + '">' + $(ele).text() + '</a></li>');
          });
          // add click event
          $article_scrollpy_links.on('click','.article-titles-link', function(){
            Site.smoothScrollToElement( $(this).attr('data-href'), -1 * pos_buffer);
          });          
        }
      }
    },
    // lazy loading
    lazyLoading: function(){
      $('.lazy').Lazy({
        // your configuration goes here
        placeholder: "data:image/gif;base64,R0lGODlhEALAPQAPzl5uLr9Nrl8e7...",
        onError: function(element) {
          // console.log('error loading ' + element.data('src'));
        }
      });
    },
    // scroll event
    scrollEvent: function(){
      this.dynamicPosition();
      $(window).scroll(function () {
        Site.dynamicPosition();
      })      
    },
    // dynamicPosition
    dynamicPosition: function(){
      var scrolltop = $(window).scrollTop();  
      var $navbar = $('.navbar-fixed');
      var $sidebar_fixed = $('.sidebar-fixed');
      var navbar_scroll = scrolltop - $('.header').outerHeight();
      var sidebar_scroll = scrolltop;
      navbar_scroll = Math.max(0,navbar_scroll);

      if ( parseInt(navbar_scroll) > 0 ) {
        $navbar.addClass('navbar-fixed-active');
        $('body').addClass('active-scroll');
      }else{    
        $navbar.removeClass('navbar-fixed-active');
        $('body').removeClass('active-scroll');
      }
    },
    // navbar-menu
    navBarEvent: function(){
      // navbar ui
      $('.navbar-menu li').has('ul').addClass('has-children');
      $('.navbar-menu li').hover(function(){
        // hover in
        var offset = $(this).offset();
        $(this).addClass('hover');
      },function(){
        // hover out
        $(this).removeClass('hover');
      });
    },
    // smoothScrollTo
    smoothScrollTo: function ( pos, callback) {
      $('html, body')
      .animate({ scrollTop: pos }, 500)
      .promise()
      .then(function(){
          // callback code here
          if (typeof callback === "function") {
              callback();
          }
      });
    },
    smoothScrollToElement: function( selector, pos_buffer ) {
      if( $(selector).length > 0 ){
        var pos = $(selector).offset().top + pos_buffer;
        this.smoothScrollTo(pos, null);
      }
    }
  };
})(jQuery);
export default Site;