// Create a new window
var myWindow = new Window("palette", "Pie Chart", undefined);

// static text
var statText1 = myWindow.add("statictext", undefined, "How many slices do you need?");

// group1
var textGroup1 = myWindow.add("group", undefined, "");
textGroup1.orientation = "row"

// static text
var statText2 = textGroup1.add("statictext", undefined, "I need");

// Create a number only input field
var numberInput = textGroup1.add("edittext", undefined, "", {
    multiline: false,
    enterKeySignalsOnChange: true,
    justify: "center",
    numericOnly: true // Only allows numeric input
});
numberInput.characters = 2; // Set the maximum number of characters

// static text
var statText3 = textGroup1.add("statictext", undefined, "slices!");

// group1
var textGroup2 = myWindow.add("group", undefined, "");
textGroup2.orientation = "row"

// static text
var statText3 = textGroup2.add("statictext", undefined, "Do you want it 3D?");

var checkbox1 = textGroup2.add("checkbox", undefined, "");

// static text
var statText4 = myWindow.add("statictext", undefined, "Is everything correct?");

// Create a button to submit the numeric input and create text input fields
var submitButton = myWindow.add("button", undefined, "Yepp!");

// Create a panel to hold the text input fields
var textInputPanel = myWindow.add("panel", undefined, "The yummey slices!");
textInputPanel.orientation = "column";

var submitButton2 = myWindow.add("button", undefined, "Create!");
    
var textFields = [];
var numberFields = [];




// Define the button click event handler for the Submit button
submitButton.onClick = function() {
    var inputValue = Number(numberInput.text);
    if (isNaN(inputValue) || inputValue < 1 || inputValue > 20) {
        alert("Invalid input! Please enter a number between 1 and 20.");
    } else {
        createTextInputFields(inputValue);

        

    }
};


// Function to create text input fields based on the input value
function createTextInputFields(count) {
    // Remove any existing text input fields from the panel
    while (textInputPanel.children.length > 0) {
        textInputPanel.remove(textInputPanel.children[0]);

        
    }

    

    // Create text input fields based on the input value
    inputValues = [];


    
    for (var i = 0; i < count; i++) {
        var group = textInputPanel.add("group");
        group.orientation = "row";
    
        var textField = group.add("edittext", undefined, "Input " + i, {
            multiline: false,
            enterKeySignalsOnChange: true,
            justify: "center"
        });
        textField.characters = 15; // Set the maximum number of characters for each input field
        textFields.push(textField);
    
        var numberField = group.add("edittext", undefined, "", {
            multiline: false,
            enterKeySignalsOnChange: true,
            justify: "center",
            numericOnly: true // Only allows numeric input
        });
        numberField.characters = 5; // Set the maximum number of characters for each input field
        numberFields.push(numberField);
    }
    

    // Fit the window size to accommodate the text input fields
    myWindow.layout.layout(true);
    myWindow.layout.resize();
}

// Define the button click event handler
submitButton2.onClick = function() {
    var numGroups = textFields.length;
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        for (var i = 0; i < numGroups; i++) {
            var nameValue = textFields[i].text;
            var opacityValue = Number(numberFields[i].text);
            if (isNaN(opacityValue) || opacityValue < 0 || opacityValue > 100) {
                alert("Invalid opacity value! Please enter a number between 0 and 100.");
                return; // Stop further execution
            }

            var myEllipseSize = [opacityValue,opacityValue];
            var myFillColor = [0.5, 0.5, 1.0];

            var myShapeLayer = comp.layers.addShape();
            var myShapeLayerContents = myShapeLayer.property("ADBE Root Vectors Group");
            var myShapeGroup = myShapeLayerContents.addProperty("ADBE Vector Group");
            var myEllipse = myShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
            myEllipse.property("ADBE Vector Ellipse Size").setValue(myEllipseSize);
            var myShapeFill = myShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
            myShapeFill.property("ADBE Vector Fill Color").setValue(myFillColor);

            myShapeLayer.name = nameValue;
            myShapeLayer.opacity.setValue(opacityValue); // Set the opacity value as a fraction between 0 and 1
        }
    } else {
        alert("Please select a composition in After Effects before running this script.");
    }
};



// Show the window
myWindow.show();
