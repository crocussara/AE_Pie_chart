// Pie Chart script hopefully

var pieChartWindow = new Window("palette", "Pie Chart", undefined);

pieChartWindow.orientation = "column";

var pieDescription = pieChartWindow.add("statictext" , undefined ,"This will be the description of how to use this script");
var group = pieChartWindow.add("group", undefined, "");
group.orientation = "row";

var buttonOne = group.add("button", undefined, "Button 1");
var buttonTwo = group.add("button", undefined, "Button 2");


pieChartWindow.center();
pieChartWindow.show();