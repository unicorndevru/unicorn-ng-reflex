angular.module('unicornNgReflex').directive('reflexClick', function($q, reflexOnEvent){
  return {
    restrict: 'A',

    require: '^reflex',

    link: function(scope, element, attrs, reflexCtrl) {

      reflexOnEvent('click', element, function(){
        reflexCtrl.onStart()
        return $q.when(scope.$eval(attrs.reflexClick))
          .then(reflexCtrl.onSuccess, reflexCtrl.onError)
      })
    }
  }
})
