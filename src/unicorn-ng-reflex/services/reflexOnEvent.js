angular.module('unicornNgReflex').factory('reflexOnEvent', function($timeout){
  return function(eventName, element, handler) {
    let isDisabledByreflex = false

    let elementScope = angular.element(element).scope()
    let isDisabledElement = null
    let parentWatcherOff = null

    if(eventName === 'submit'){
      isDisabledElement = element.find('button')
    } else {
      isDisabledElement = element
    }

    function disbaledAttrValueUpdate (){
      if(element){
        var isDisabledOutside = Boolean(elementScope.$eval(isDisabledElement.attr('ng-disabled')))
        if (isDisabledByreflex || isDisabledOutside) {
          element.attr('disabled', 'disabled')
        } else {
          element.removeAttr('disabled')
        }
      }
    }

    function eventHandler(){
      isDisabledByreflex = true
      disbaledAttrValueUpdate()
      handler()
        .finally(function(){
          $timeout(function(){
            isDisabledByreflex = false
            disbaledAttrValueUpdate()
          }, 500, false)
        })
    }

    element.bind(eventName, eventHandler)

    function stopreflexing(){
      if(element){
        element.unbind(eventName, eventHandler)
        if(parentWatcherOff){
          parentWatcherOff()
        }
        element = null
      }
    }

    elementScope.$on('$destroy', stopreflexing)

    return stopreflexing
  }
})
