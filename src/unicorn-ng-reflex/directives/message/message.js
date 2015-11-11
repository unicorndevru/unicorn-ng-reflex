angular.module('unicornNgReflex').directive('reflexMessage', function() {
  return {
    restrict: 'E',
    require: '^reflex',
    template: `
      <div ng-if="reflexCtrl.message" ng-click="reflexCtrl.message = ''" class="panel">
        <div l10n-t="{{ reflexCtrl.message }}" class="reflex-content"></div>
      </div>
    `,
    scope: {},
    link: function(scope, element, attrs, reflexCtrl) {
      return scope.reflexCtrl = reflexCtrl
    }
  }
})
