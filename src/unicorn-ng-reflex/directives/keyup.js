angular.module('unicornNgReflex').directive('reflexKeyup', function($q, reflexOnEvent) {
  return {
    restrict: 'A',

    require: '^reflex',

    link: function(scope, element, attrs, reflexCtrl){

      reflexOnEvent('keyup', element, function(){
        reflexCtrl.onStart()
        return $q.when(scope.$eval(attrs.reflexChange))
          .then(reflexCtrl.onSuccess, reflexCtrl.onError)
      })
    }
  }
})
