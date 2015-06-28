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
    _.forEach(active, function(n, key){
      console.log(n.id);
    });
  }
  var redcard = localStorage.getItem('redcard');
  if (redcard) {
    redcard = JSON.parse(redcard);
    _.forEach(redcard, function(n, key){
      console.log(n.id);
    });
  }
  var removed = localStorage.getItem('removed');
  if (removed) {
    removed = JSON.parse(removed);
    _.forEach(removed, function(n, key){
      console.log(n.id);
    });
  }

  $.get( window.url, function( data ) {
    var li;

    if (active && redcard && removed) {

      _.forEach(active, function (n, key) {
        list = $(".active ul");
        //getData1.push(n.id);
        li = document.createElement("li");
        $(li).attr("data-id", n.id);
        li.innerHTML = "<h3>" + n.name + "</h3><h4>" + n.phone + "</h4>";
        list.append(li);
      });

      _.forEach(redcard, function (n, key) {
        list = $(".redcard ul");
        //getData2.push(n.id);
        li = document.createElement("li");
        $(li).attr("data-id", n.id);
        li.innerHTML = "<h3>" + n.name + "</h3><h4>" + n.phone + "</h4>";
        list.append(li);
      });

      _.forEach(removed, function (n, key) {
        list = $(".removed ul");
        //getData3.push(n.id);
        li = document.createElement("li");
        $(li).attr("data-id", n.id);
        li.innerHTML = "<h3>" + n.name + "</h3><h4>" + n.phone + "</h4>";
        list.append(li);
      });

    } else {
      _.forEach(data, function(n, key) {
        if (n.status === "active") {
          list = $(".active ul");
          getData1.push(n.id);
        } else if (n.status === "redcard") {
          list = $(".redcard ul");
          getData2.push(n.id);
        } else {
          list = $(".removed ul");
          getData3.push(n.id);
        }
        li = document.createElement("li");
        $(li).attr("data-id", n.id);
        li.innerHTML = "<h3>" + n.name + "</h3><h4>" + n.phone + "</h4>";
        list.append(li);
      });

      console.log(getData1);
      console.log(getData2);
      console.log(getData3);
    }
  }, "json" );

  $("ul").sortable({
    placeholder: "ui-state-highlight",
    connectWith: "ul",
    update: function( event, ui ) {
      var lis = $('li:not(.ui-state-highlight)');

      _.forEach(lis, function(n, key) {
        var h3 = $(n).find('h3')[0].innerHTML;
        var h4 = $(n).find('h4')[0].innerHTML;
        var st = n.parentNode.parentNode.classList[1];
        if ( st === 'active') {
          setData1.push({ 'id':n.getAttribute('data-id'), 'name':h3, 'phone':h4});
        } else if ( st === 'redcard') {
          setData2.push({ 'id':n.getAttribute('data-id'), 'name':h3, 'phone':h4});
        } else if ( st === 'removed') {
          setData3.push({ 'id':n.getAttribute('data-id'), 'name':h3, 'phone':h4});
        }
      });

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
