(function api() {
  'use strict';

  function extend(Child, Parent) {
    var F = function func() {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
  }

  function User(data) {
    this.id = data.id;
    this.name = data.name;
    this.phone = data.phone;
    this.role = data.role;
  }

  function Student(data) {
    Student.superclass.constructor.apply(this, arguments);
    this.strikes = data.strikes;
  }

  extend(Student, User);

  function Support(data) {
    Support.superclass.constructor.apply(this, arguments);
    this.location = data.location;
  }
  extend(Support, User);

  function Admin() {
    Admin.superclass.constructor.apply(this, arguments);
  }
  extend(Admin, User);

  User.load = function usrLoad(callback) {
    var x = new XMLHttpRequest();
    x.open('GET', window.crudURL);
    x.setRequestHeader('Content-Type', 'application/json');
    x.send();
    x.addEventListener('readystatechange', function listen() {
      var i;
      var list;
      var arr = [];
      if (x.status === 200) {
        if (x.readyState === x.DONE) {
          list = JSON.parse(x.responseText);
          for (i = 0; i < list.length; i++) {
            if (list[i].role === 'Student') {
              arr.push(new Student(list[i]));
            } else if (list[i].role === 'Support') {
              arr.push(new Support(list[i]));
            } else if (list[i].role === 'Administrator') {
              arr.push(new Admin(list[i]));
            }
          }
          callback(null, arr);
        }
      }
    });
  };

  User.prototype.save = function usersave(callback) {
    var user = this;
    if (user.id ){
      var xx = new XMLHttpRequest();
      xx.open('PUT', window.crudURL + '/' + user.id);
      xx.setRequestHeader('Content-Type', 'application/json');
      xx.send(JSON.stringify(user));
      xx.addEventListener('readystatechange', function loadusrs() {
        if (xx.status === 200) {
          if (xx.readyState === xx.DONE) {
            callback(null);
          }
        }
      });
    } else {
      var x = new XMLHttpRequest();
      x.open('POST', window.crudURL);
      x.setRequestHeader('Content-Type', 'application/json');
      x.send(JSON.stringify(user));
      x.addEventListener('readystatechange', function loadusrs() {
        if (x.status === 200) {
          if (x.readyState === x.DONE) {
            user.id = JSON.parse(x.responseText).id;
            callback(null);
          }
        }
      });
    }
  };

  User.prototype.remove = function userremove(callback) {
    var user = this;
    var x = new XMLHttpRequest();
    x.open('DELETE', window.crudURL + '/' + user.id);
    x.setRequestHeader('Content-Type', 'application/json');
    x.send(JSON.stringify(user));
    x.addEventListener('readystatechange', function onremove() {
      if (x.status === 200) {
        if (x.readyState === x.DONE) {
          callback(null);
        }
      }
    });
  };

  Admin.prototype.save = function adminsave(callback) {

  };

  Admin.prototype.remove = function adminsave(callback) {

  };

  window.User = User;
  window.Student = Student;
  window.Support = Support;
  window.Admin = Admin;
})();
