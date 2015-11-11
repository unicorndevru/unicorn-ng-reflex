angular.module('unicornNgReflex').directive('reflexSubmit', function($q, reflexOnEvent){
  return {
    restrict: 'A',

    require: '^reflex',

    link: function(scope, element, attrs, reflexCtrl) {

      reflexOnEvent('submit', element, function(){
        reflexCtrl.onStart()
        return $q.when(scope.$eval(attrs.reflexSubmit))
          .then(reflexCtrl.onSuccess, reflexCtrl.onError)
      })
    }
  }
})
