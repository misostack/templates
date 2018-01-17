import './Site.scss';
import Site from './modules/site';
(function( $ ) {
  console.log('Jquery version ' + $.fn.jquery);  
  $(document).ready(function($) {
    Site.bootstrap();
  });
})(jQuery);