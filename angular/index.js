angular.module('jsbursa', []);
angular.module('jsbursa').controller('myController', function($scope) {
  $scope.students = [
    {name: 'Vasya', phone: ' 01', id: 1, status: 'yu'}, {name: 'Petya', phone: ' 02', id: 2, status: 'rr'}, {
      name: 'Julia',
      phone: '02',
      id: 3,
      status: 'op'
    }];
  $scope.otherUsers = [{name: 'Ted', phone: ' 45', id: 7, status: 'ui'}];

  $scope.add = function() {
    $scope.users.push(angular.copy($scope.newUser));
    $scope.newUser.name = '';
    $scope.newUser.phone = '';
  };
  $scope.remove = function(item) {
    var index = $scope.users.indexOf(item);
    $scope.users.splice(index, 1);
  }
});

angular.module('jsbursa').directive('draggableList', function() {


  return {
    restrict: 'E',
    scope: {
      items: '=items',
      id: '@id'
    },
    template: '<ul ><li   ng-repeat="item in items" data-info={{item}}><h3>{{item.name}}</h3><h4>{{item.phone}}</h4></li></ul>',
    controller: function($scope) {
      var data = localStorage.getItem($scope.id);
      if (data) {
        $scope.items = JSON.parse(data);//xor($scope.items, JSON.parse(data));
      }
      if (!$scope.items) {
        $scope.items = [];
      }
    },
    link: function($scope, $element) {
      var $ul = $element.find('ul');
      $ul.sortable({
        connectWith: 'draggable-list ul',
        start: function(event, ui) {
          $scope.startIndex = ui.item.index();
        },
        stop: function(event, ui) {
          var movedItem;
          if (ui.item.parent()[0] === event.target) {
            movedItem = $scope.items.splice($scope.startIndex, 1)[0];
            $scope.items.splice(ui.item.index(), 0, movedItem);
            $scope.$applyAsync();
            if ($scope.id) {
              localStorage.setItem($scope.id, JSON.stringify($scope.items));
            }
          }
        },
        receive: function(event, ui) {
          var tempItems;
          var newItem = $(ui.item).data('info');
          $scope.items.splice(ui.item.index(), 0, newItem);
          tempItems = angular.copy($scope.items);
          $scope.items = [];
          $scope.$applyAsync();
          setTimeout(function putItemsBack() {
            $scope.items = tempItems;
            $scope.$applyAsync();
            if ($scope.id) {
              localStorage.setItem($scope.id, JSON.stringify($scope.items));
            }
          }, 0);
        },
        remove: function(event, ui) {
          $scope.items.splice($scope.startIndex, 1);
          $scope.$applyAsync();
        }
      }).disableSelection();
      $scope.$watch('items', function() {
        console.log($scope.items);
      }, true);
    }
  }
})