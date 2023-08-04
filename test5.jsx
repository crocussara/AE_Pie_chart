// Create a new window
var myWindow = new Window("palette", "Pie Chart", undefined);


var submitButton = myWindow.add("button", undefined, "Create!");

var checkbox = myWindow.add("checkbox", undefined, "3D");
    

// Define the button click event handler
submitButton.onClick = function() {
    var numGroups = textFields.length;
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {

                var nullName = "CNTRL size & extrusion";
                var SliderName1 = "Size";
                var SliderValue1 = "300";
                var SliderName2 = "Extrusion";
                var SliderValue2 = "80";

            var sizeNullLayer = comp.layers.addNull();
            // Rename null
            sizeNullLayer.name = nullName;
            // add slider 1
            var effectsProperty = sizeNullLayer.property("ADBE Effect Parade");
            var sliderSize = effectsProperty.addProperty("ADBE Slider Control");
            // rename slider 1
            sliderSize.name = SliderName1;
            // set slider value
            sliderSize.slider.setValue(SliderValue1);
            var sliderExtr = effectsProperty.addProperty("ADBE Slider Control");
            sliderExtr.name = SliderName2;
            sliderExtr.slider.setValue(SliderValue2);
            // THIS IS HOW TO ADD EXPRESSIONS TO SLIDERS sliderExtr.slider.expression = "time*30";

                var myEllipseSize = 'temp = thisComp.layer("CNTRL size & extrusion").effect("Size")("Slider"); [temp, temp]';
                var myStrokeSize = 'temp = thisComp.layer("CNTRL size & extrusion").effect("Size")("Slider")';
                var myStrokeColor = [0,0,0.5];
                var myTrimStart = "wiggle(1,20)";
                var myTrimEnd = "time*10";
                var is3D = checkbox.value;
        
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
            // is 3D
            myShapeLayer.threeDLayer = is3D;

            
    } else {
        alert("Please select a composition in After Effects before running this script.");
    }
};



// Show the window
myWindow.show();
