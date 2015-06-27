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
          list.addClass("connectedSortable active");
        } else if (n.status === "redcard") {
          list = $(".redcard ul");
          list.addClass("connectedSortable redcard");
        } else {
          list = $(".removed ul");
          list.addClass("connectedSortable removed");
        }

        li = document.createElement("li");
        $(li).attr("data-id", n.id);
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

      //var connectWith = $( "ul" ).sortable( "option", "connectWith" );

      //var newStatus = this.classList[2];
      //console.log(newStatus);
      //console.log(ui.item.data("id"));

      var list1 = $(".active li");
      var list2 = $(".redcard ul");
      var list3 = $(".removed ul");

      var arr1 = [];
      var arr2 = [];
      var arr3 = [];

      _.forEach(list1, function(n, key) {
        console.log(n, key);
      });

      //localStorage.setItem('items1', JSON.stringify(state));
      //localStorage.setItem('items2', JSON.stringify(state));
      //localStorage.setItem('items3', JSON.stringify(state));
    },
    receive: function( event, ui ) {
      var newStatus = this.classList[2];
      $.post(window.url + '/' + ui.item.data("id"), {status: newStatus}, function( data ) {
        //  console.log(data);
        //  console.log( data.name ); // John
        //  console.log( data.time ); // 2pm
      });
    }
  });

});