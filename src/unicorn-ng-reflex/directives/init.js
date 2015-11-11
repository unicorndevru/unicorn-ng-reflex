angular.module('unicornNgReflex').directive('reflexInit', function($q){
  return {
    restrict: 'A',

    require: '^reflex',


    link: function(scope, element, attrs, reflexCtrl) {
      reflexCtrl.onStart()
      return $q.when(scope.$eval(attrs.reflexInit))
        .then(reflexCtrl.onSuccess, reflexCtrl.onError)
    }
  }
})
