angular.module('unicornNgReflex').directive('reflex', function() {
  return {
    restrict: 'EA',
    controller: function(l10n, $rootScope) {
      var ctrl = this

      this.onStart = function() {
        $rootScope.$broadcast('unicornReflexStart')
        ctrl.message = ''
      }

      this.onError = function(error) {
        $rootScope.$broadcast('unicornReflexDone')
        if(error && error.data){
          ctrl.message = error.data.failure
        }
      }

      this.onSuccess = function() {
        $rootScope.$broadcast('unicornReflexDone')
      }

      return this
    }
  }
})
