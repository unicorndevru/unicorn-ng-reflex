# unicorn-ng-reflex

A module to relief pain with async forms, buttons, etc.


### Install
```
  npm install unicorn-ng-reflex --save
```
or
```
  bower install unicorn-ng-reflex --save
```

### How to use

Forms:

```html
<reflex>
  <form reflex-submit="submitSimpleNumber(number)">
    <input
      reflex-blur="isNumberIsEven(number)"
      type="text"
      ng-model="number"/>
    <button type="submit">
      Submit
    </button>
  </form>
  <reflex-message>
  </reflex-message>
<reflex>
```
```javascript

$scope.doSomeStuff = function(number){
  return $resource.get('/checknumber', { number }).$promise
}

$scope.isNumberIsEven = function(number){
  if(number % 2 === 0){
    return true
  } else {
    return $q.reject({ messsage: 'number isn’t even'})
  }
}
```

Or just buttons:


```html
<reflex>
  <button reflex-click="checkSomething()">
    Submit
  </button>
  <reflex-message>
  </reflex-message>
<reflex>
```
```javascript

$scope.checkSomething = function(){
  return $resource.get('/checksomething').$promise
}
```


Just return promise from handler passed to one of directives: `reflex-click`, `reflex-submit`, `reflex-blur`, `reflex-keyup`, script will block button until promise is pending and broadcast events:
`unicornReflexStart` when action just happen and `unicornReflexDone` when promise is resolved or rejected.

Don't forget to wrap your elements in `<reflex>`
