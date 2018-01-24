var Site = Site || {};
(function( $ ) {
  Site = {
    //properites  
    bootstrap : function(){   
      console.log('init site bootstrap');
      this.highlightcode();
      this.navBarEvent();
      this.scrollEvent();
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
      var navbar_scroll = scrolltop - $('.header').outerHeight();
      navbar_scroll = Math.max(0,navbar_scroll);
      if ( parseInt(navbar_scroll) > 0 ) {
        $navbar.addClass('navbar-fixed-active');
      }else{        
        $navbar.removeClass('navbar-fixed-active');
      }
    },
    // navbar-menu
    navBarEvent: function(){
      
      $('.navbar-menu li').hover(function(){
        // hover in
        var offset = $(this).offset();
        $(this).addClass('hover');
      },function(){
        // hover out
        $(this).removeClass('hover');
      });
    }
  };
})(jQuery);
export default Site;