angular.module('unicornNgReflex').directive('reflexBlur', function($q, reflexOnEvent) {
  return {
    restrict: 'A',

    require: '^reflex',

    link: function(scope, element, attrs, reflexCtrl){

      reflexOnEvent('blur', element, function(){
        reflexCtrl.onStart()
        return $q.when(scope.$eval(attrs.reflexBlur))
          .then(reflexCtrl.onSuccess, reflexCtrl.onError)
      })
    }
  }
})
