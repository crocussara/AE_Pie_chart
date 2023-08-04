// Create a new window
var myWindow = new Window("dialog", "Four Text and Number Inputs");

// Array to store the text and number input fields
var textFields = [];
var numberFields = [];

// Create four groups, each containing a text input and a number input
for (var i = 1; i <= 4; i++) {
    var group = myWindow.add("group");
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

// Create a button
var submitButton = myWindow.add("button", undefined, "Submit");

// Define the button click event handler
submitButton.onClick = function() {
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

            var nullLayer = comp.layers.addNull();
            nullLayer.name = nameValue;
            nullLayer.opacity.setValue(opacityValue); // Set the opacity value as a fraction between 0 and 1
        }
    } else {
        alert("Please select a composition in After Effects before running this script.");
    }
};

// Show the window
myWindow.show();
