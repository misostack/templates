import './Site.scss';
import Site from './modules/site';
import Lazy from 'jquery-lazy';
(function( $ ) {
  console.log('Jquery version ' + $.fn.jquery);  
  $(document).ready(function($) {
    Site.bootstrap();
  });
})(jQuery);