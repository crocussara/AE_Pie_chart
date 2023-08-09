// Create a new window
var myWindow = new Window("palette", "Pie Chart", undefined);

// static text
var statText0 = myWindow.add("statictext", undefined, "How is this pie called?");
var pieName = myWindow.add("edittext", undefined, "", {
    multiline: false,
    enterKeySignalsOnChange: true,
    justify: "center",
});
pieName.characters = 20;
var statText1 = myWindow.add("statictext", undefined, "How many slices do you need?");
var textGroup1 = myWindow.add("group", undefined, "");
textGroup1.orientation = "row";
var statText2 = textGroup1.add("statictext", undefined, "I need");
// Create a number only input field
var sliceNumInput = textGroup1.add("edittext", undefined, "", {
    multiline: false,
    enterKeySignalsOnChange: true,
    justify: "center",
    numericOnly: true // Only allows numeric input
});
sliceNumInput.characters = 2; // Set the maximum number of characters
// static text
var statText3 = textGroup1.add("statictext", undefined, "slices!");
var textGroup2 = myWindow.add("group", undefined, "");
textGroup2.orientation = "row"

var statText3 = textGroup2.add("statictext", undefined, "Do you want it 3D?");
var checkbox1 = textGroup2.add("checkbox", undefined, "");

var statText4 = myWindow.add("statictext", undefined, "Is that so?");
// Create a button to submit the numeric input and create text input fields
var submitButton = myWindow.add("button", undefined, "Yepp!");

// Create a panel to hold the text input fields
var textInputPanel = myWindow.add("group");
textInputPanel.orientation = "row";

//these are needed for every input you want to add with a click
var sliceNames = [];
var slicePercentages = [];
var sliceColor1s = [];
var sliceColor2s = [];

// Define the button click event handler for the Submit button
submitButton.onClick = function() {
    var inputValue = Number(sliceNumInput.text);
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
    //create named panels for the different elements
    var sliceNamePanel = textInputPanel.add("panel", undefined, "name of the slice");
    sliceNamePanel.orientation = "column";

    var slicePercentagePanel = textInputPanel.add("panel", undefined, "percentage");
    slicePercentagePanel.orientation = "column";

    var sliceColor1Panel = textInputPanel.add("panel", undefined, "color");
    sliceColor1Panel.orientation = "column";

    for (var i = 0; i < count; i++) {

            //add as manz sliceNames as many input value
            var sliceName = sliceNamePanel.add("edittext", undefined, "", {
            multiline: false,
            enterKeySignalsOnChange: true,
            justify: "center"
        });
        sliceName.characters = 15; // Set the maximum number of characters for each input field
        sliceNames.push(sliceName); // push slice name into slice names
    
        var slicePercentage = slicePercentagePanel.add("edittext", undefined, "", {
            multiline: false,
            enterKeySignalsOnChange: true,
            justify: "center",
            numericOnly: true // Only allows numeric input
        });
        slicePercentage.characters = 5; // Set the maximum number of characters for each input field
        slicePercentages.push(slicePercentage);

        var sliceColor1 = sliceColor1Panel.add("edittext", undefined, "", {
            multiline: false,
            enterKeySignalsOnChange: true,
            justify: "center"
        });
        sliceColor1.characters = 6; // Set the maximum number of characters for each input field
        sliceColor1s.push(sliceColor1);
    }
    

    // Fit the window size to accommodate the text input fields
    myWindow.layout.layout(true);
    myWindow.layout.resize();    
}



// create! button
var submitButton2 = myWindow.add("button", undefined, "Create!");

        submitButton2.onClick = function() {

            

            // temporary hard coded arrays
            var numberField = ['"Null 1"', '"Null 2"', '"Null 3"', '"Null 4"'];
            var sliderControl = sliceNames.text;

            // Initialize an array starting with 0. This array will have one more length than your input
            //todo Remember to rename myArray to something useful
            var myArray = [0]; 
            // the 0 th element exception
            var previous = 'temp = thisComp.layer(' + numberField[0] + ').effect("'+ sliceNames[0].text +'")("Slider")';
            //add the 0th elemenent to the previous array
            myArray.push(previous);

            var next = '';

            var comp = app.project.activeItem;
            
            for (var i = 0; i < sliceNumInput.text; i++) {
                next = previous + ' + thisComp.layer(' + numberField[i] + ').effect("'+ sliceNames[i].text +'")("Slider")';
                myArray.push(next);
                previous = next;
               
            };



            for (var j = 0; j < sliceNumInput.text; j++) {
            
                var myEllipseSize = 'temp = thisComp.layer("CNTRL size & extrusion").effect("Size")("Slider"); [temp, temp]';
                var myStrokeSize = 'temp = thisComp.layer("CNTRL size & extrusion").effect("Size")("Slider")';
                var myStrokeColor = [0,0,0.5];
                var myTrimStart = myArray[j];
                var myTrimEnd = myArray[j+1];
                    
            var myShapeLayer = comp.layers.addShape();
            var myShapeLayerContents = myShapeLayer.property("ADBE Root Vectors Group");
            var myShapeGroup = myShapeLayerContents.addProperty("ADBE Vector Group");
            var myEllipse = myShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
            // Ellipse size
            myEllipse.property("ADBE Vector Ellipse Size").expression = myEllipseSize;
            //Ellipse stroke
            var myShapeStroke = myShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
            // Stroke size
            myShapeStroke.property("ADBE Vector Stroke Width").expression = myStrokeSize;
            // Stroke color
            myShapeStroke.property("ADBE Vector Stroke Color").setValue(myStrokeColor);
            
            // Trim path
            var myTrim = myShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Filter - Trim");
            // Trim Start
            myTrim.start.expression = myTrimStart;
            // Trim End
            myTrim.end.expression = myTrimEnd;

            };          
            
        };

// Show the window
myWindow.show();

  