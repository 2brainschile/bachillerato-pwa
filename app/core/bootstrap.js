require('./vendor')();

angular.module('bachillerato', [
  'ngSanitize',
  'ui.router',
//  'firebase',
  'angularRipple',
  require('./config').name,
  require('./controllers').name,
  require('./services').name
])
.run(function ($rootScope, $interval, lettersService) {

  $rootScope.binaryLetters = lettersService.getRandomString(5);

  let i = 0;

  while (i < 30) {
    i++;
    $rootScope.binaryLetters = lettersService.moveLetter($rootScope.binaryLetters);
  }

  $interval(function() {
    $rootScope.binaryLetters = lettersService.moveLetter($rootScope.binaryLetters);
  }, 100);

})
;

// $(window, document, undefined).ready(function() {

//   var $ripples = $('.ripples');

//   $ripples.on('click.Ripples', function(e) {

//     var $this = $(this);
//     var $offset = $this.parent().offset();
//     var $circle = $this.find('.ripplesCircle');

//     var x = e.pageX - $offset.left;
//     var y = e.pageY - $offset.top;

//     $circle.css({
//       top: y + 'px',
//       left: x + 'px'
//     });

//     $this.addClass('is-active');

//   });

//   $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
//     $(this).removeClass('is-active');
//   });

// });
