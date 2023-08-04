// Create a new window
var myWindow = new Window("dialog", "Number Input Window");

// Create a number only input field
var numberInput = myWindow.add("edittext", undefined, "", {
    multiline: false,
    enterKeySignalsOnChange: true,
    justify: "center",
    numericOnly: true // Only allows numeric input
});
numberInput.characters = 2; // Set the maximum number of characters

// Create a panel to hold the text input fields
var textInputPanel = myWindow.add("panel", undefined, "Text Input Fields");
textInputPanel.orientation = "column";

// Create a button to submit the numeric input and create text input fields
var submitButton = myWindow.add("button", undefined, "Submit");

// Create a button to display the array of input values and create null layers
var displayValuesButton = myWindow.add("button", undefined, "Display Values");

// Array to store the values of the text input fields
var inputValues = [];

// Define the button click event handler for the Submit button
submitButton.onClick = function() {
    var inputValue = Number(numberInput.text);
    if (isNaN(inputValue) || inputValue < 1 || inputValue > 99) {
        alert("Invalid input! Please enter a number between 1 and 99.");
    } else {
        createTextInputFields(inputValue);
    }
};

// Define the button click event handler for the Display Values button
displayValuesButton.onClick = function() {
    alert("Input Values: " + inputValues.join(", "));
    createNullLayers(inputValues);
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
        var textField = textInputPanel.add("edittext", undefined, "Input " + (i + 1));
        textField.characters = 10; // Set the maximum number of characters for each input field
        textField.onChange = function() {
            inputValues[this.index] = this.text; // Store the value in the inputValues array
        };
        textField.index = i; // Store the index of the text field as a custom property
    }

    // Fit the window size to accommodate the text input fields
    myWindow.layout.layout(true);
    myWindow.layout.resize();
}

// Function to create null layers with names from the inputValues array
function createNullLayers(namesArray) {
    var comp = app.project.activeItem; // Get the active composition
    if (comp && comp instanceof CompItem) {
        for (var i = 0; i < namesArray.length; i++) {
            var nullLayer = comp.layers.addNull(); // Create a null layer
            nullLayer.name = namesArray[i]; // Set the name of the null layer from the array element
        }
    } else {
        alert("Please select a composition in After Effects before running this script.");
    }
}

// Show the window
myWindow.show();
