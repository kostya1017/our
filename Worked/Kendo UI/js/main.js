var expanding = false;
$(document).ready(function() {
    var treeview = $("#treeview").kendoTreeView({
		dragAndDrop: true,
		select: onSelectTreeView,
        dataSource: {
            data: [{text: 'Expand All', expanded: true, items: Niches}]
        },
        loadOnDemand: false
    }).data("kendoTreeView"),

    handleTextBox = function(callback) {
        return function(e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                callback(e);
            }
        };
    };
    
    initComboBox();

    var kkgdata = [];
	var subdata = [];

    $("#publist").kendoListView({
		dataSource: {data: kkgdata},
       selectable: true,       
       template: "<div>#:item #<span class='clsdiv'>X</span></div>" 
    });
    var publistView = $("#publist").data("kendoListView");	
	
	$("#sublist").kendoListView({
      dataSource: {data: kkgdata},
       selectable: true,       
       template: "<div>#: item #</div>" 
    });
	var sublistView = $("#sublist").data("kendoListView");
	
	$("#serlist").kendoListView({
      dataSource: {data: kkgdata},
       selectable: true,       
       template: "<div>#: item #</div>"       
    });
	var serlistView = $("#serlist").data("kendoListView");
	
	$(".clsdiv").click(function(item) {
		console.log(item);
	});   

    //combobox init    

   
	
	$("#addbtn").click(function(){					
		var selectedNode = treeview.select();
			treeview.append(
			{
				text:$(".niche-name-text").val(),
				nickname:$(".niche-nickname-text").val(),
				publisher:$("#pubComboBox").data('kendoComboBox').value(),
				subscriber:$("#subComboBox").data('kendoComboBox').value()
			},
			selectedNode
			);
			
			kkgdata.push({item: $("#pubComboBox").data('kendoComboBox').value()});
			var publistView = $("#publist").data("kendoListView");
			var datas = new kendo.data.DataSource({
				data: kkgdata
			});
			publistView.setDataSource(datas);
			
			subdata.push({item: $("#subComboBox").data('kendoComboBox').value()});
			var sublistView = $("#sublist").data("kendoListView");
			var sdatas = new kendo.data.DataSource({
				data: subdata
			});
			sublistView.setDataSource(sdatas);
			//console.log(datas);
		});		
	$("#updateBtn").click(function(){
		alert("ehl");
		var selectedNode = treeview.select();
		var item = treeview.dataItem(selectedNode);
		
		item.set("text",$(".niche-name-text").val());
		item.set("nickname",$(".niche-nickname-text").val());
		item.set("nickname",$("#pubComboBox").data('kendoComboBox').value());
		item.set("nickname",$("#pubComboBox").data('kendoComboBox').value());
	});
	
	
	/*$("#expandAllNodes")
	.text(expanding ? "Collapse All":"Expand All" )
	.click(function() {
		if (!expanding)
		  treeview.expand(".k-item");
		else
		 treeview.collapse(".k-item");
		expanding = !expanding;
		$(this).text(expanding ? "Collapse All":"Expand All" );
	});
	*/
	var ascending = false;
	 $("#sortBtn")
		.text(ascending ? "Sort ascending" : "Sort descending")
		.click(function() {
			treeview.dataSource.sort({
				field: "text",
				dir: ascending ? "asc" : "desc"
			});

			ascending = !ascending;

			$(this).text(ascending ? "Sort ascending" : "Sort descending")
		});


    
});
 function initComboBox() {
      $("#pubComboBox").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: pubScriber,
        filter: "contains",
        suggest: true,
        index: 3
      });

      $("#subComboBox").kendoComboBox({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: subScriber,
          filter: "contains",
          suggest: true,
          index: 3
      });
}
function onSelectTreeView(e){
	var tv = $('#treeview').data('kendoTreeView');

	var item = tv.dataItem(e.node);
	if(item.level()>0)
	{
		$(".niche-name-text").val(item.text);
		$(".niche-nickname-text").val(item.nickname);
		$("#pubComboBox").data('kendoComboBox').value(item.publisher);
		$("#subComboBox").data('kendoComboBox').value(item.subscriber);
	} else {
		if (!expanding)
		  treeview.expand(".k-item");
		else
		 treeview.collapse(".k-item");
	}
			
}	