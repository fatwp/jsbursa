$(function() {
  "use strict";

  var list;

  //var data = localStorage.getItem('items');
  //if (data) {
  //  order = JSON.parse(data);
  //}

    function getStudent() {

    $.get( window.url, function( data ) {
      var li;
      _.forEach(data, function(n, key) {
        if (n.status === "active") {
          list = $(".active ul");
          list.addClass("connectedSortable");
        } else if (n.status === "redcard") {
          list = $(".redcard ul");
          list.append(li);
          list.addClass("connectedSortable");
        } else {
          list = $(".removed ul");
          list.addClass("connectedSortable");
          list.find("li").addClass("ui-state-disabled");
        }

        li = document.createElement("li");
        $(li).data("id", n.id);
        li.innerHTML = "<h3>" + n.name + "</h3><h4>" + n.pnone + "</h4>";
        list.append(li);

      });
    }, "json" );
  }

  getStudent();

  $( "ul" ).sortable({
    placeholder: "ui-state-highlight",
    connectWith: ".connectedSortable",
    change: function( event, ui ) {

      var list1 = $(".active ul");
      var list2 = $(".redcard ul");
      var list3 = $(".removed ul");

      var arr1 = [];
      var arr2 = [];
      var arr3 = [];

      var id = ui.item.data("id");
      localStorage.setItem('items1', JSON.stringify(state));
      //localStorage.setItem('items2', JSON.stringify(state));
      //localStorage.setItem('items3', JSON.stringify(state));
    }
  }).disableSelection();

});