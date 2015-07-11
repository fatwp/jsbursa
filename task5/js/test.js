$(function() {
  "use strict";

  var list;

  var getData1 = [];
  var getData2 = [];
  var getData3 = [];

  var setData1 = [];
  var setData2 = [];
  var setData3 = [];



  var active = localStorage.getItem('active');
  if (active) {
    active = JSON.parse(active);
    console.log(active);
  }
  var redcard = localStorage.getItem('redcard');
  if (redcard) {
    redcard = JSON.parse(redcard);
  }
  var removed = localStorage.getItem('removed');
  if (removed) {
    removed = JSON.parse(removed);
  }

  function sort(getArray, localArray) {
    var deleteArray = _.difference(localArray, getArray);
    var newArray = _.difference(getArray, localArray);
    var myRes = _.union(_.difference(localArray, deleteArray), newArray);
    return myRes;
  }

  $.get( window.url, function( data ) {
    var li;

    _.forEach(data, function(n, key) {
      li = document.createElement("li");
      if (n.status === "active") {
        list = $(".active ul");
        getData1.push(n.id);
      } else if (n.status === "redcard") {
        list = $(".redcard ul");
        getData2.push(n.id);
      } else if (n.status === "removed") {
        list = $(".removed ul");
        getData3.push(n.id);
      }
      $(li).attr("data-id", n.id);
      li.innerHTML = "<h3>" + n.name + "</h3><h4>" + n.phone + "</h4>";
      list.append(li);
    });

    if( active !== null ){
      console.log('2');
      var activeNew = sort(getData1, active);
      console.log(active);
      localStorage.setItem('active', JSON.stringify(activeNew));

      var list1 = $(".active ul");
      list1.innerHTML = '';

      _.forEach(activeNew, function (n, key) {
        li = document.createElement("li");
        _.forEach(data, function(nn, key) {
          if (n === nn.id) {
            $(li).attr("data-id", nn.id);
            li.innerHTML = "<h3>" + nn.name + "</h3><h4>" + nn.phone + "</h4>";
            list1.append(li);
            setData1.push(nn.id);
          }
        });
      });
      localStorage.setItem('active', JSON.stringify(setData1));
    }

    if( redcard !== null ){
      var redcardNew = sort(getData2, redcard);

      list = $(".redcard ul");
      list.innerHTML = '';
      _.forEach(redcardNew, function (n, key) {
        li = document.createElement("li");
        _.forEach(data, function(nn, key) {
          if (nn.id === n) {
            $(li).attr("data-id", nn.id);
            li.innerHTML = "<h3>" + nn.name + "</h3><h4>" + nn.phone + "</h4>";
            list.append(li);
            setData2.push(nn.id);
          }
        });
      });
      localStorage.setItem('redcard', JSON.stringify(setData2));
    }

    if( removed !== null ) {
      var removedNew = sort(getData3, removed);
      list = $(".removed ul");
      list.innerHTML = '';
      _.forEach(removedNew, function (n, key) {
        li = document.createElement("li");
        _.forEach(data, function(nn, key) {
          if (nn.id === n) {
            $(li).attr("data-id", nn.id);
            li.innerHTML = "<h3>" + nn.name + "</h3><h4>" + nn.phone + "</h4>";
            list.append(li);
            setData3.push(nn.id);
          }
        });
      });
      //localStorage.removeItem('removed');
      localStorage.setItem('removed', JSON.stringify(setData3));
    }

    console.log('get: ' + getData1);
    console.log('-------------------');
    console.log('storage: ' + active);
    console.log('-------------------');
    var active_diff = _.difference(active,getData1);
    console.log('delete: ' + active_diff);
    console.log('-------------------');
    var active_new = _.difference(getData1, active);
    console.log('add: ' + active_new);
    console.log('-------------------');
    console.log('new: ' + _.difference(active, active_diff));
    console.log('-------------------');
    console.log(_.union(_.difference(active, active_diff), active_new));

  }, "json" );

  $("ul").sortable({
    placeholder: "ui-state-highlight",
    connectWith: "ul",
    update: function( event, ui ) {
      var lis = $('li:not(.ui-state-highlight)');
      setData1 = [];
      setData2 = [];
      setData3 = [];

      _.forEach(lis, function(n, key) {
        var st = n.parentNode.parentNode.classList[1];
        if ( st === 'active') {
          setData1.push(n.getAttribute('data-id'));
        } else if ( st === 'redcard') {
          setData2.push(n.getAttribute('data-id'));
        } else if ( st === 'removed') {
          setData3.push(n.getAttribute('data-id'));
        }
      });

      localStorage.clear();

      localStorage.setItem('active', JSON.stringify(setData1));
      localStorage.setItem('redcard', JSON.stringify(setData2));
      localStorage.setItem('removed', JSON.stringify(setData3));

    },
    receive: function( event, ui ) {
      var newStatus = this.parentNode.classList[1];
      var oldStatus = ui.sender[0].parentNode.classList[1];

      if(oldStatus !== 'removed') {
        $.post(window.url + '/' + ui.item.data("id"), {status: newStatus}, function (data) {
        })
          .done(function () {
          })
          .fail(function () {
            $(ui.sender).sortable('cancel');
          });
      } else {
        $(ui.sender).sortable('cancel');
      }
    }
  });
});
/**
 * Created by V on 6/28/15.
 */
