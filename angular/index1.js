var jsbursa = angular.module('jsbursa', []);

jsbursa.controller('usersList', function ($scope) {
  $scope.users = [
    {"id":"1","name":"Jeremy Lane","phone":"(466) 514-6617","status":"redcard"},
    {"id":"2","name":"Austin Hunt","phone":"(314) 333-4959","status":"removed"},
    //{"id":"3","name":"Ronald Campbell","phone":"(686) 869-6077","status":"removed"},
    //{"id":"4","name":"Don Stewart","phone":"(328) 747-6780","status":"removed"},
    //{"id":"5","name":"Jeremiah Jordan","phone":"(769) 969-5203","status":"removed"},
    //{"id":"6","name":"Susie Frazier","phone":"(917) 781-9869","status":"removed"},
    //{"id":"7","name":"Sally Larson","phone":"(965) 429-2716","status":"redcard"},
    //{"id":"8","name":"Glenn Berry","phone":"(266) 740-2428","status":"removed"},
    //{"id":"9","name":"Cordelia Frazier","phone":"(288) 290-8309","status":"removed"},
    //{"id":"10","name":"Clara Howard","phone":"(366) 905-2199","status":"removed"},
    {"id":"19","name":"Lula Rowe","phone":"(864) 257-6838","status":"removed"},
    {"id":"20","name":"Hilda Fowler","phone":"(575) 328-1234","status":"removed"}
  ];

  $scope.add = function() {
    $scope.users.push(angular.copy($scope.newUser));
    $scope.newUser.name = '';
    $scope.newUser.phone = '';
  };

  $scope.delete = function(item) {
    var ind = $scope.users.indexOf(item);
    $scope.users.splice(ind, 1);
  };

});

jsbursa.directive('draggableList', function() {
  return{
    scope: {
      users: '=items'
    },
    template: '<ul data-role="dlist"><li ng-repeat="item in users" data-id={{item.id}}><h3>{{item.name}}</h3><h4>{{item.phone}}</h4><a href="#" ng-click="delete(item)">delete</a></li></ul>',
    link: function($scope, $element) {
      //console.log($scope, $element);

      $scope.$watch('users', function(){
        //console.log('dwesf' + $scope.users);

      }, true);

      var arrElementToMove = [];

      $element.find('ul').sortable({
        connectWith: "ul",
        start: function(event, ui) {
          var startIndex = $element.find('li').index(ui.item);
          arrElementToMove = $scope.users[startIndex];
          $scope.users.splice(startIndex,1);
        },
        stop: function(event, ui) {
          var lastIndex = $element.find('li').index(ui.item);
          $scope.users.splice(lastIndex, 0, arrElementToMove);
          console.log('New scope', $scope.users);
          console.log(lastIndex);
          $scope.$applyAsync();
        },

        change: function( event, ui ) {
          //console.log(ui);
          //$scope.$applyAsinc();
        }
      });
      //console.log($element.find('ul'));
    }
  }

});