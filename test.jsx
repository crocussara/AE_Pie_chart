// Pie Chart script hopefully

// Creating a floating window
var pieChartWindow = new Window("palette", "Pie Chart", undefined,);

// Setting window orientation (column = top to bottom, row =  left to right)
pieChartWindow.orientation = "column";

// creating a Static text (message)
var pieDescription = pieChartWindow.add("statictext" , undefined ,"This will be the description of how to use this script");

// creating a group
var group = pieChartWindow.add("group", undefined, "");
// setting group orientation (see window orientation)
group.orientation = "row";

// Create a number only input field
var numberInput = pieChartWindow.add("edittext", undefined, "", {
    // Only allows numeric input
    numericOnly: true 
});
// Set the maximum number of characters
numberInput.characters = 2; 

// adding buttons to group
var buttonOne = group.add("button", undefined, "Button 1");
var buttonTwo = group.add("button", undefined, "Button 2");

// the array of the dropdown list elements
var array = ["Test 1", "Test 2", "Test 3", "Test 4", "Test 5"];

//creating a dropdown list
var dropdown = pieChartWindow.add("dropdownlist", undefined, array);
// setting the automatic list element selection. the selection is defined by the index of the array element
dropdown.selection = 2;
// set dropdown list size. takes two values in an array what it assumes to be pixels. takes the argument undefined as well, but if you set it for the lenght then it will set it to 0
dropdown.size = [180, undefined];
// add extra item to the dropdown list. first is what (an item) second is the text
dropdown.add("item", "my extra item")

// creating a panel. it is like a group but has outline and a title
var panel = pieChartWindow.add("panel", undefined, "my panel");
// setting panel orientation (see window orientation)
panel.orientation = "row";

// adding a radiobutton to the panel
var radio = panel.add("radiobutton", undefined, "Radio");
// adding a checkbox to the panel
var checkbox = panel.add("checkbox", undefined, "Checkbox");

// add textpox where you can write text from the AE side
var textbox = pieChartWindow.add("edittext", undefined, "my input");
// add slider (where do you define the min max?)
var slider = pieChartWindow.add("slider", undefined, "");



// detect if button is clicked and then do...
buttonOne.onClick = function() {

    // run addButton function 
    addButton();
}



function addButton() {

    // alert mssg on click  
    // alert("hello you clicked button 1");

    var account = group.add("button", undefined, "Button 3");
    //Then update the main UI layout
    pieChartWindow.layout.layout(true);    
 
}

// setting floating window position
pieChartWindow.center();
// setting floating window to show up if the script is run
pieChartWindow.show();