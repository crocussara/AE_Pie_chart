// Create a new window
var myWindow = new Window("palette", "Pie Chart", undefined);


var numberField = ['"Null 1"', '"Null 2"', '"Null 3"', '"Null 4"']
var sliderControl = ['"orange"', '"dragonfruit"', '"paprika"', '"antibiotics"' ]
//const variable = "someValue";
//const s = `sometext ${variable} sometext`;

var submitButton2 = myWindow.add("button", undefined, "Create!");

var myArray = [0]; // Initialize an empty array
var previous = 'temp = thisComp.layer(' + numberField[0] + ').effect('+ sliderControl[0] +')("Slider")';
myArray.push(previous);

var next = '';


        submitButton2.onClick = function() {
            var comp = app.project.activeItem;
            
            for (var i = 1; i < numberField.length; i++) {
                next = previous + ' + thisComp.layer(' + numberField[i] + ').effect('+ sliderControl[i] +')("Slider")';
                myArray.push(next);
                previous = next;

               
            };

            

            for (var j = 1; j < numberField.length; j++) {

                
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

            alert(previous);

            
            
        };





// Loop through the numberField array and concatenate the strings
// for (var i = 0; i < numberField.length; i++) {
//   result += previous + ' + sometext ' + numberField[i] + ' moretext';
// }

// // Add a static text element to the window to display the result
// var staticText = win.add('statictext', undefined, result);

// // Show the window
// win.show();


// function MyComponent() {
//   const myArray = []; // Initialize an empty array

//   // Append elements to the array using push()
//   myArray.push('item1');
//   myArray.push('item2');
//   myArray.push('item3');

//   return (
//     <div>
//       {/* Render the array elements */}
//       {myArray.map((item, index) => (
//         <p key={index}>{item}</p>
//       ))}
//     </div>
//   );
// }

// export default MyComponent;

    




// Show the window
myWindow.show();

  