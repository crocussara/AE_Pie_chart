// Create a new window
var myWindow = new Window("palette", "Pie Chart", undefined);

// static text
var statText1 = myWindow.add("statictext", undefined, "How many slices do you need?");
// group1
var textGroup1 = myWindow.add("group", undefined, "");
textGroup1.orientation = "row";
// static text
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
// group1
var textGroup2 = myWindow.add("group", undefined, "");
textGroup2.orientation = "row"

// static text
var statText3 = textGroup2.add("statictext", undefined, "Do you want it 3D?");
var checkbox1 = textGroup2.add("checkbox", undefined, "");

// static text
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
    var sliceNamePanel = textInputPanel.add("panel", undefined, "name of the slice");
    sliceNamePanel.orientation = "column";

    var slicePercentagePanel = textInputPanel.add("panel", undefined, "percentage");
    slicePercentagePanel.orientation = "column";

    var sliceColor1Panel = textInputPanel.add("panel", undefined, "color");
    sliceColor1Panel.orientation = "column";

    for (var i = 0; i < count; i++) {

    
        var sliceName = sliceNamePanel.add("edittext", undefined, "", {
            multiline: false,
            enterKeySignalsOnChange: true,
            justify: "center"
        });
        sliceName.characters = 15; // Set the maximum number of characters for each input field
        sliceNames.push(sliceName);
    
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
        sliceColor1.characters = 15; // Set the maximum number of characters for each input field
        sliceColor1s.push(sliceColor1);
    }
    

    // Fit the window size to accommodate the text input fields
    myWindow.layout.layout(true);
    myWindow.layout.resize();
}

// Show the window
myWindow.show();