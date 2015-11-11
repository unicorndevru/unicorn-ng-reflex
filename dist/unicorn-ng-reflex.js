'use strict';

angular.module('unicornNgReflex', []);
'use strict';

angular.module('unicornNgReflex').factory('reflexOnEvent', ["$timeout", function ($timeout) {
  return function (eventName, element, handler) {
    var isDisabledByreflex = false;

    var elementScope = angular.element(element).scope();
    var isDisabledElement = null;
    var parentWatcherOff = null;

    if (eventName === 'submit') {
      isDisabledElement = element.find('button');
    } else {
      isDisabledElement = element;
    }

    function disbaledAttrValueUpdate() {
      if (element) {
        var isDisabledOutside = Boolean(elementScope.$eval(isDisabledElement.attr('ng-disabled')));
        if (isDisabledByreflex || isDisabledOutside) {
          element.attr('disabled', 'disabled');
        } else {
          element.removeAttr('disabled');
        }
      }
    }

    function eventHandler() {
      isDisabledByreflex = true;
      disbaledAttrValueUpdate();
      handler().finally(function () {
        $timeout(function () {
          isDisabledByreflex = false;
          disbaledAttrValueUpdate();
        }, 500, false);
      });
    }

    element.bind(eventName, eventHandler);

    function stopreflexing() {
      if (element) {
        element.unbind(eventName, eventHandler);
        if (parentWatcherOff) {
          parentWatcherOff();
        }
        element = null;
      }
    }

    elementScope.$on('$destroy', stopreflexing);

    return stopreflexing;
  };
}]);
'use strict';

angular.module('unicornNgReflex').directive('reflexSubmit', ["$q", "reflexOnEvent", function ($q, reflexOnEvent) {
  return {
    restrict: 'A',

    require: '^reflex',

    link: function link(scope, element, attrs, reflexCtrl) {

      reflexOnEvent('submit', element, function () {
        reflexCtrl.onStart();
        return $q.when(scope.$eval(attrs.reflexSubmit)).then(reflexCtrl.onSuccess, reflexCtrl.onError);
      });
    }
  };
}]);
'use strict';

angular.module('unicornNgReflex').directive('reflex', function () {
  return {
    restrict: 'EA',
    controller: ["l10n", "$rootScope", function controller(l10n, $rootScope) {
      var ctrl = this;

      this.onStart = function () {
        $rootScope.$broadcast('unicornReflexStart');
        ctrl.message = '';
      };

      this.onError = function (error) {
        $rootScope.$broadcast('unicornReflexDone');
        if (error && error.data) {
          ctrl.message = error.data.failure;
        }
      };

      this.onSuccess = function () {
        $rootScope.$broadcast('unicornReflexDone');
      };

      return this;
    }]
  };
});
'use strict';

angular.module('unicornNgReflex').directive('reflexMessage', function () {
  return {
    restrict: 'E',
    require: '^reflex',
    template: '\n      <div ng-if="reflexCtrl.message" ng-click="reflexCtrl.message = \'\'" class="panel">\n        <div l10n-t="{{ reflexCtrl.message }}" class="reflex-content"></div>\n      </div>\n    ',
    scope: {},
    link: function link(scope, element, attrs, reflexCtrl) {
      return scope.reflexCtrl = reflexCtrl;
    }
  };
});
'use strict';

angular.module('unicornNgReflex').directive('reflexKeyup', ["$q", "reflexOnEvent", function ($q, reflexOnEvent) {
  return {
    restrict: 'A',

    require: '^reflex',

    link: function link(scope, element, attrs, reflexCtrl) {

      reflexOnEvent('keyup', element, function () {
        reflexCtrl.onStart();
        return $q.when(scope.$eval(attrs.reflexChange)).then(reflexCtrl.onSuccess, reflexCtrl.onError);
      });
    }
  };
}]);
'use strict';

angular.module('unicornNgReflex').directive('reflexInit', ["$q", function ($q) {
  return {
    restrict: 'A',

    require: '^reflex',

    link: function link(scope, element, attrs, reflexCtrl) {
      reflexCtrl.onStart();
      return $q.when(scope.$eval(attrs.reflexInit)).then(reflexCtrl.onSuccess, reflexCtrl.onError);
    }
  };
}]);
'use strict';

angular.module('unicornNgReflex').directive('reflexClick', ["$q", "reflexOnEvent", function ($q, reflexOnEvent) {
  return {
    restrict: 'A',

    require: '^reflex',

    link: function link(scope, element, attrs, reflexCtrl) {

      reflexOnEvent('click', element, function () {
        reflexCtrl.onStart();
        return $q.when(scope.$eval(attrs.reflexClick)).then(reflexCtrl.onSuccess, reflexCtrl.onError);
      });
    }
  };
}]);
'use strict';

angular.module('unicornNgReflex').directive('reflexBlur', ["$q", "reflexOnEvent", function ($q, reflexOnEvent) {
  return {
    restrict: 'A',

    require: '^reflex',

    link: function link(scope, element, attrs, reflexCtrl) {

      reflexOnEvent('blur', element, function () {
        reflexCtrl.onStart();
        return $q.when(scope.$eval(attrs.reflexBlur)).then(reflexCtrl.onSuccess, reflexCtrl.onError);
      });
    }
  };
}]);