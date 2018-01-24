var Site = Site || {};
(function( $ ) {
  Site = {
    //properites  
    bootstrap : function(){   
      console.log('init site bootstrap');
      this.highlightcode();
      this.navbarmenu();
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
    // navbar-menu
    navbarmenu: function(){
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