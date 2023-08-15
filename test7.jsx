// Create a new window
var myWindow = new Window("palette", "Pie Chart", undefined);
// won't work if comp is not defined
var comp = app.project.activeItem;

// static text
var statText0 = myWindow.add("statictext", undefined, "Q: How is this pie called?");

var pieName = myWindow.add("edittext", undefined, "", {
    multiline: false,
    enterKeySignalsOnChange: true,
    justify: "center",
});

pieName.characters = 20;
var statText01 = myWindow.add("statictext", undefined, "Q: What is the size of the pie?");
// Create a number only input field

var sizeNumInput = myWindow.add("edittext", undefined, "", {
    multiline: false,
    enterKeySignalsOnChange: true,
    justify: "center",
    numericOnly: true, // Only allows numeric input
});

sizeNumInput.characters = 4;
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
var extrusionNumInput = textGroup2.add("edittext", undefined, "", {
    multiline: false,
    enterKeySignalsOnChange: true,
    justify: "center",
    numericOnly: true // Only allows numeric input
});


var statText4 = myWindow.add("statictext", undefined, "Is that so?");
// Create a button to submit the numeric input and create text input fields
var submitButton = myWindow.add("button", undefined, "Yepp!");

// Create a panel to hold the text input fields
var textInputPanel = myWindow.add("group");
textInputPanel.orientation = "row";

//these are needed for every input you want to add with a click
var sliceNames = [];
var slicePercentages = [];

// Define the button click event handler for the Submit button
submitButton.onClick = function() {
    var inputValue = Number(sliceNumInput.text);
    if (isNaN(inputValue) || inputValue < 1 || inputValue > 20) {
        alert("Invalid input! Please enter a number between 1 and 20.");
    } else {
        createTextInputFields(inputValue);   
        if (checkbox1.value == true) {
            alert('Make sure to set your 3D Renderer to CINEMA 4D if you want to use 3D pies!');
            app.executeCommand(2007);
        };
    };
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

    }
    

    // Fit the window size to accommodate the text input fields
    myWindow.layout.layout(true);
    myWindow.layout.resize();    
        
};

// so let's create all those slices and controls
    var submitButton2 = myWindow.add("button", undefined, "Bake it!");



        submitButton2.onClick = function() {
             
            var percSum = [];
            for (var m = 0; m < slicePercentages.length; m++) {
                percSum.push(Number(slicePercentages[m].text));
            }
            // Initialize a variable to store the sum
            var sum = 0;
            // Loop through each number in the array and add it to the sum
            for (var n = 0; n < percSum.length; n++) {
            sum = sum + percSum[n];
            }

            if (sum < 100) {
                alert("Be aware, the sum of all the percentage values is less than 100!");
                createPieChart()
            } if (sum > 100) {
                alert("The sum of all the percantage values is more than a 100! Ouch, try it again!");
            } if (sum == 100) {
                createPieChart()
            } 
                      
           
        };

function createPieChart() {

    // hard coded null names, if ever improved add null names here
            //var cntrlNullName = [" - CNTRL - slices" , " - CNTRL - colors" , " - CNTRL - size & extrusion" , " - CNTRL - position & rotation"];
            var cntrlNullName = [" - CNTRL - slices" , " - CNTRL - colors" , " - CNTRL - size" , " - CNTRL - position & rotation"];
            if (checkbox1.value == true) { 
                cntrlNullName[2] = cntrlNullName[2] +' & extrusion';
            };

            //updating the null names with the main pie name input
            for (var k = 0; k < cntrlNullName.length; k++) {
                cntrlNullName[k] = pieName.text + cntrlNullName[k];
            };
            // loop for creating the control nulls, and creating an array what can be later called when adding sliders to differnt nulls
            var cntrlNullS = [];
            for (var l = 0; l < cntrlNullName.length; l++) {
                var cntrlNull = comp.layers.addNull();
                cntrlNull.name = cntrlNullName[l];
                cntrlNullS.push(cntrlNull);
            };
           
            // ! putting the expression for the trim paths together with the inputs
            // Initialize an array starting with 0. This array will have one more length than your input
            var trimPathExpression = [0]; 
            // the 0 th element exception
            var previous = 'temp = thisComp.layer("' + cntrlNullName[0] + '").effect("'+ 1 + '.- ' + sliceNames[0].text +'")("Slider")';
            //add the 0th elemenent to the previous array
            trimPathExpression.push(previous);

            var next = '';            
            for (var i = 1; i < sliceNames.length; i++) {
                next = previous + ' + thisComp.layer("' + cntrlNullName[0] + '").effect("' + (i+1) + '.- ' + sliceNames[i].text +'")("Slider")';
                trimPathExpression.push(next);
                previous = next;               
            };

            // ! vars and maths for the size of the pie
            var size = 'Size';
            var extrusion = 'Extrusion';
            var effectsPropertySize = cntrlNullS[2].property("ADBE Effect Parade");
            var sliderSize = effectsPropertySize.addProperty("ADBE Slider Control");
            sliderSize.name = size;
            // set slider value , and add expression which devides the input number by 2
            sliderSize.slider.setValue(sizeNumInput.text);
            sliderSize.slider.expression = 'effect("' + size + '")(1)/2';
            if (checkbox1.value == true) {
                var sliderExtrusion = effectsPropertySize.addProperty("ADBE Slider Control");
                sliderExtrusion.name = extrusion;
                sliderExtrusion.slider.setValue(extrusionNumInput.text);
            };
             //! position to rotation cntrl to 3d
             cntrlNullS[3].threeDLayer = checkbox1.value;
             if (checkbox1.value == true) {
                var threeDRotationValue = 125;
                var threeDRotation = cntrlNullS[3].property("ADBE Transform Group");
                threeDRotation.property("ADBE Rotate X").setValue(threeDRotationValue);
            };
       
            
            for (var j = 0; j < sliceNames.length; j++) {
                var sliceNamePlusNumber = j+1 + '.- ' + sliceNames[j].text;
                var colorSelection = sliceNamePlusNumber + ' - color';
                var colorSelectionSide = sliceNamePlusNumber + ' - sidecolor';
                var sizeSelection = sliceNamePlusNumber + '-selection';
                var extrusionSelection = sliceNamePlusNumber + '-extrusion selection';
                var colorValue = [Math.random(),Math.random(),Math.random()];
                var myEllipseSize = 'temp = thisComp.layer("' + cntrlNullName[2] + '").effect("' + size + '")("Slider") + thisComp.layer("' + cntrlNullName[2] + '").effect("' + sizeSelection + '")("Slider"); [temp,temp]';
                var myStrokeSize = 'temp = thisComp.layer("' + cntrlNullName[2] + '").effect("' + size + '")("Slider")+ thisComp.layer("' + cntrlNullName[2] + '").effect("' + sizeSelection + '")("Slider")';
                var myStrokeColor = 'thisComp.layer("' + cntrlNullName[1] + '").effect("' + colorSelection + '")("Color")';
                var myStrokeSideColor = 'thisComp.layer("' + cntrlNullName[1] + '").effect("' + colorSelectionSide + '")("Color")';
                var myTrimStart = trimPathExpression[j];
                var myTrimEnd = trimPathExpression[j+1];
                var extrusionValue = 'thisComp.layer("' + cntrlNullName[2] + '").effect("' + extrusion + '")("Slider")+thisComp.layer("' + cntrlNullName[2] + '").effect("' + extrusionSelection + '")("Slider")';
                    
            var myShapeLayer = comp.layers.addShape();
            myShapeLayer.name = sliceNamePlusNumber;
            myShapeLayer.parent = cntrlNullS[3];
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
            myShapeStroke.property("ADBE Vector Stroke Color").expression = myStrokeColor;
            // 3D layer
            myShapeLayer.threeDLayer = checkbox1.value;
            
            // Trim path
            var myTrim = myShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Filter - Trim");
            // Trim Start
            myTrim.start.expression = myTrimStart;
            // Trim End
            myTrim.end.expression = myTrimEnd;

            //todo if 3d is checked, for the shape layers
            if (checkbox1.value == true) {
                var threeDSide = myShapeGroup.property("ADBE Vector Materials Group");
                threeDSide.addProperty("ADBE Vec3D Side RGB");
                threeDSide.property("ADBE Vec3D Side RGB").expression = myStrokeSideColor;
                //! Extrude the shape layer
                myShapeLayer.property("ADBE Extrsn Options Group").property("ADBE Extrsn Depth").expression = extrusionValue;
                
            };

            // todo add slider for - CNTRL - slices / - CNTRL - slices = cntrlNullS[0]
            var effectsProperty = cntrlNullS[0].property("ADBE Effect Parade");
            var sliderSize = effectsProperty.addProperty("ADBE Slider Control");
            // rename slider 1
            sliderSize.name = sliceNamePlusNumber;
            // set slider value
            sliderSize.slider.setValue(slicePercentages[j].text);


             // todo add slider for - CNTRL - size & extrusion / for each slice, so the slice can be highlighted
             var sliderSize = effectsPropertySize.addProperty("ADBE Slider Control");
             sliderSize.name = sizeSelection;
             // todo size and extrusion cntrl add extrusion sliders if 3d is thicked
             if (checkbox1.value == true) {
                var sliderExtrusion = effectsPropertySize.addProperty("ADBE Slider Control");
                sliderExtrusion.name = extrusionSelection;
            };

            //todo color picker 
            var effectsPropertyColor = cntrlNullS[1].property("ADBE Effect Parade");
            var sliderColor = effectsPropertyColor.addProperty("ADBE Color Control");
            sliderColor.name = colorSelection;
            sliderColor.color.setValue(colorValue);
            //todo side color picker , the same color but darkened
            var effectsPropertyColor = cntrlNullS[1].property("ADBE Effect Parade");
            var sliderColor = effectsPropertyColor.addProperty("ADBE Color Control");
            sliderColor.name = colorSelectionSide;
            sliderColor.color.setValue(colorValue*0.5);        

            };          

};
        

// Show the window
myWindow.show();

  