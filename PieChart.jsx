// Pie Chart script, to create said charts. Adobe Extendscript, to use it with Adobe After Effects

// Sara Safrany https://github.com/crocussara 
// Portfolio: https://www.behance.net/safranysara
// Created: 2023
// Tested on Adobe AE CC 2020 and AE CC 2023

(function(thisObj) {
    scriptPieChart(thisObj)

    function scriptPieChart(thisObj) {
        var myWindow = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Pie Chart", undefined);

        // won't work if comp is not defined
        var comp = app.project.activeItem;
        
        var panel1 = myWindow.add("panel", undefined, undefined);

        var grp1 = panel1.add("group", undefined, "");
        var tx11 = grp1.add("statictext", undefined, "This pie is called");
        var pieName = grp1.add("edittext", undefined, "", {
            multiline: false,
            enterKeySignalsOnChange: true,
            justify: "center",
        });
        pieName.characters = 7;
        var tx12 = grp1.add("statictext", undefined, "!");

        var grp2 = panel1.add("group", undefined, "");
        var tx21 = grp2.add("statictext", undefined, "It is");
        var sizeNumInput = grp2.add("edittext", undefined, "", {
            multiline: false,
            enterKeySignalsOnChange: true,
            justify: "center",
            numericOnly: true, // Only allows numeric input
        });
        sizeNumInput.characters = 4;
        var tx22 = grp2.add("statictext", undefined, "pixels wide,");

        var grp3 = panel1.add("group", undefined, "");
        var tx31 = grp3.add("statictext", undefined, "and has");
        var sliceNumInput = grp3.add("edittext", undefined, "", {
            multiline: false,
            enterKeySignalsOnChange: true,
            justify: "center",
            numericOnly: true, // Only allows numeric input
        });
        sliceNumInput.characters = 2;
        var tx32 = grp3.add("statictext", undefined, "slices.");

        var grp4 = panel1.add("group", undefined, "");
        var tx41 = grp4.add("statictext", undefined, "It");
        var threeDBoolean = [];
        var dropDown1 = grp4.add("dropdownlist", undefined, ["isn't", "is"]);
        dropDown1.selection = 0;
        var tx42 = grp4.add("statictext", undefined, "3D, but if it is,");

        var grp5 = panel1.add("group", undefined, "");
        var tx51 = grp5.add("statictext", undefined, "it is");
        var extrusionNumInput = grp5.add("edittext", undefined, "", {
            multiline: false,
            enterKeySignalsOnChange: true,
            justify: "center",
            numericOnly: true // Only allows numeric input
        });
        extrusionNumInput.characters = 4;
        var tx52 = grp5.add("statictext", undefined, "px tall!");


        var tx01 = myWindow.add("statictext", undefined, "Is that so?");
        var submitButton = myWindow.add("button", undefined, "Yepp!");

        // Create a panel to hold the text input fields
        var textInputPanel = myWindow.add("group");
        textInputPanel.orientation = "row";
        //these are needed for every input you want to add with a click
        var sliceNames = [];
        var slicePercentages = [];

        // Define the button click event handler for the Submit button
        submitButton.onClick = function() {
            var numValue1 = Number(sliceNumInput.text);
            if (isNaN(numValue1) || numValue1 < 1 || numValue1 > 50) {
                alert("Invalid input! Please enter a number between 1 and 50.");
            } else {
                createTextInputFields(numValue1);   
            };
        };

        // Function to create text input fields based on the input value
        function createTextInputFields(count) {
            // Remove any existing text input fields from the panel
            while (textInputPanel.children.length > 0) {
                textInputPanel.remove(textInputPanel.children[0]);
            }
            
            //create named panels for the different elements
            var sliceNamePanel = textInputPanel.add("panel", undefined, "Name of the slice");
            sliceNamePanel.orientation = "column";

            var slicePercentagePanel = textInputPanel.add("panel", undefined, "Percentage");
            slicePercentagePanel.orientation = "column";

            for (var i = 0; i < count; i++) {

                //add as many sliceNames as many input value
                var sliceName = sliceNamePanel.add("edittext", undefined, "", {
                    multiline: false,
                    enterKeySignalsOnChange: true,
                    justify: "center"
                });
                sliceName.characters = 15; 
                sliceNames.push(sliceName); // push slice name into slice names
            
                var slicePercentage = slicePercentagePanel.add("edittext", undefined, "", {
                    multiline: false,
                    enterKeySignalsOnChange: true,
                    justify: "center",
                    // ! Only allows numeric input, but heck it doesn't really wwork. 
                    numericOnly: true 
                });
                slicePercentage.characters = 5; 
                slicePercentages.push(slicePercentage);

            }
            
            // Fit the window size to accommodate the text input fields
            myWindow.layout.layout(true);
            myWindow.layout.resize();    
                
        };

        // so let's create all those slices and controls
            var submitButton2 = myWindow.add("button", undefined, "Bake it!");



                submitButton2.onClick = function() {

                    // checking if inputs are correct and if everything is filled out correctly
                    var numValue2 = Number(sizeNumInput.text);
                    var numValue3 = Number(extrusionNumInput.text);
                    var percSum = [];
                        for (var m = 0; m < slicePercentages.length; m++) {
                            percSum.push(Number(slicePercentages[m].text));
                        }
                    var sum = 0;
                        // Loop through each number in the array and add it to the sum
                        for (var n = 0; n < percSum.length; n++) {
                        sum = sum + percSum[n];
                        }

                    var numValue4 = false;
                    for (var o = 0; o < slicePercentages.length; o++) {
                        if (slicePercentages[o].text === "") {
                            numValue4 = true;
                            break; // No need to continue checking if we found an empty element
                        };
                    };
                    var numValue5 = false;
                    for (var p = 0; p < sliceNames.length; p++) {
                        if (sliceNames[p].text === "") {
                            numValue5 = true;
                            break; // No need to continue checking if we found an empty element
                        };
                    };
                    // making sure that every neccessary field is filled and there are o alphabets where only numbers can be
                    if ( isNaN(numValue2) || isNaN(numValue3) ||isNaN(sum) || numValue4 == true || numValue5 == true || pieName.text === "" || sizeNumInput.text === "" || textInputPanel.children.length < 1 ){
                        alert("Invalid input! Check if you filled out everything correctly!");
                     } else {
                        // in the first code snippet i used a checkbox to see if the pie chart is 3D or not. Here i push the correct true or false values based on the dropdown menu (is or isn't)
                        if (dropDown1.selection.index == 0) {
                            threeDBoolean = false;
                        } else if (dropDown1.selection.index == 1) {
                            threeDBoolean = true;
                        }   
                        // doing some quick checks and if the value of all percantage values is more than a 100 then alert and abort, if less then just alert but continue, if it is 100 then just proceed
                        if (sum < 100) {
                            alert("Be aware, the sum of all the percentage values is less than 100! It is only "+ sum + "!");
                            if (threeDBoolean == true) {
                                alert('Make sure to set your 3D Renderer to CINEMA 4D if you want to use 3D pies!');
                                app.executeCommand(2007);
                            };
                            createPieChart()
                        } if (sum > 100) {
                            alert("The sum of all the percantage values is more than a 100! It is already " + sum + "! Ouch, try it again!"); 
                        } if (sum == 100) {
                            if (threeDBoolean == true) {
                                alert('Make sure to set your 3D Renderer to CINEMA 4D if you want to use 3D pies!');
                                app.executeCommand(2007);
                            };
                            createPieChart()
                        } 
                    };        
                
                };

        function createPieChart() {

                    // * hard coded null names, if ever improved add null names here
                    var cntrlNullName = [" - CNTRL - slices" , " - CNTRL - colors" , " - CNTRL - size" , " - CNTRL - position & rotation"];
                    if (threeDBoolean == true) { 
                        cntrlNullName[2] = cntrlNullName[2] +' & extrusion';
                    };

                    //updating the null names with the name of the Pie chart (var pieName)
                    for (var k = 0; k < cntrlNullName.length; k++) {
                        cntrlNullName[k] = pieName.text + cntrlNullName[k];
                    };
                    // loop for creating the control nulls, and creating an array what can be later called when adding sliders to differnt nulls. Changing the label color from the basic red
                    var cntrlNullS = [];
                    for (var l = 0; l < cntrlNullName.length; l++) {
                        var cntrlNull = comp.layers.addNull();
                        cntrlNull.label = 2;
                        cntrlNull.name = cntrlNullName[l];
                        cntrlNullS.push(cntrlNull);
                    };
                
                    // * putting the expression for the trim paths together with the inputs
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

                    //* ----- CNTRL - size & extrusion
                    var size = 'Size';
                    var extrusion = 'Extrusion';
                    var effectsPropertySize = cntrlNullS[2].property("ADBE Effect Parade");
                    var sliderSize = effectsPropertySize.addProperty("ADBE Slider Control");
                    sliderSize.name = size;
                    // set slider value , and add expression which devides the input number by 2
                    sliderSize.slider.setValue(sizeNumInput.text);
                    sliderSize.slider.expression = 'effect("' + size + '")(1)/2';
                    // only add the extrusion slider if a 3D pie is created
                    if (threeDBoolean == true) {
                        var sliderExtrusion = effectsPropertySize.addProperty("ADBE Slider Control");
                        sliderExtrusion.name = extrusion;
                        sliderExtrusion.slider.setValue(extrusionNumInput.text);
                    };


                    //* ----- CNTRL - size & extrusion
                    cntrlNullS[3].threeDLayer = threeDBoolean;
                    if (threeDBoolean == true) {
                        var threeDRotationValue = 125;
                        var threeDRotation = cntrlNullS[3].property("ADBE Transform Group");
                        threeDRotation.property("ADBE Rotate X").setValue(threeDRotationValue);
                    };


            
                    // setting up the vars and expression for the shape layers
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
                         
                    //* SLICE layers
                        var myShapeLayer = comp.layers.addShape();
                        myShapeLayer.label = 9;
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
                        myShapeLayer.threeDLayer = threeDBoolean;
                        
                        // Trim path
                        var myTrim = myShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Filter - Trim");
                        // Trim Start
                        myTrim.start.expression = myTrimStart;
                        // Trim End
                        myTrim.end.expression = myTrimEnd;

                        //if 3d is checked, for the shape layers
                        if (threeDBoolean == true) {
                            var threeDSide = myShapeGroup.property("ADBE Vector Materials Group");
                            threeDSide.addProperty("ADBE Vec3D Side RGB");
                            threeDSide.property("ADBE Vec3D Side RGB").expression = myStrokeSideColor;
                            myShapeLayer.property("ADBE Extrsn Options Group").property("ADBE Extrsn Depth").expression = extrusionValue;
                            
                        };

                        //* ----- CNTRL - slices (cntrlNullS[0])
                        var effectsProperty = cntrlNullS[0].property("ADBE Effect Parade");
                        var sliderSize = effectsProperty.addProperty("ADBE Slider Control");
                        sliderSize.name = sliceNamePlusNumber;
                        sliderSize.slider.setValue(slicePercentages[j].text);


                        //* ----- CNTRL - size & extrusion / a slider for each slice, so the slice can be highlighted
                        var sliderSize = effectsPropertySize.addProperty("ADBE Slider Control");
                        sliderSize.name = sizeSelection;
                        // if 3D add more sliders
                        if (threeDBoolean == true) {
                            var sliderExtrusion = effectsPropertySize.addProperty("ADBE Slider Control");
                            sliderExtrusion.name = extrusionSelection;
                        };

                        //* ----- CNTRL - color (cntrlNullS[1]) 
                        var effectsPropertyColor = cntrlNullS[1].property("ADBE Effect Parade");
                        var sliderColor = effectsPropertyColor.addProperty("ADBE Color Control");
                        sliderColor.name = colorSelection;
                        sliderColor.color.setValue(colorValue);
                        // if 3D, side color picker , the same color but darkened
                        if (threeDBoolean == true) {
                            var effectsPropertyColor = cntrlNullS[1].property("ADBE Effect Parade");
                            var sliderColor = effectsPropertyColor.addProperty("ADBE Color Control");
                            sliderColor.name = colorSelectionSide;
                            sliderColor.color.setValue(colorValue*0.5);
                        };   
                        // lock shape layer, since there are the CNTRL layers for control
                        myShapeLayer.locked = true;

                    };          

        };
                

        // Show the window
        //myWindow.show();
        myWindow.onResizing = myWindow.onResize = function () {
            this.layout.resize();
        };
        myWindow instanceof Window
            ? (myWindow.center(), myWindow.show()) : (myWindow.layout.layout(true), myWindow.layout.resize());

    }
})(this);

        