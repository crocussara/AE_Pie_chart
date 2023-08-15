// var comp = app.project.activeItem;
// // Create a new UI window
// var myWindow = new Window("palette", "Create 3D Shape Layer", undefined, {resizeable: true});

// // Add a button to the UI window
// var createButton = myWindow.add("button", undefined, "Create 3D Shape Layer");
// createButton.onClick = function() {
   
    
//     // Change the renderer to Cinema 4D
//     //comp.renderer = "CINEMA 4D";
//     //app.executeCommand(app.findMenuCommandId("Composition Settings"));
//     alert('Make sure to set your 3D Renderer to CINEMA 4D if you want to use 3D pies!');
//     app.executeCommand(2007);

//      // Create a new shape layer
//      var shapeLayer = comp.layers.addShape();
    
//      // Enable 3D for the shape layer
//      shapeLayer.threeDLayer = true;
    
// };

// // Show the UI window
// myWindow.show();


var myComp = app.project.activeItem;

// Create a new UI window
var myWindow = new Window("palette", "Create 3D Extruded Circle", undefined, {resizeable: true});

// Add a button to the UI window
var createButton = myWindow.add("button", undefined, "Create 3D Extruded Circle");
createButton.onClick = function() {
    
    var myShapeLayer = myComp.layers.addShape();
    
    var myShapeLayerContents = myShapeLayer.property("ADBE Root Vectors Group");
    var myShapeGroup = myShapeLayerContents.addProperty("ADBE Vector Group");
    var myEllipse = myShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
    
            // Ellipse size
            myEllipse.property("ADBE Vector Ellipse Size").expression = '[200, 200]';
            //Ellipse stroke
            var myShapeStroke = myShapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
            // Stroke size
            myShapeStroke.property("ADBE Vector Stroke Width").expression = '20';
            alert("11");
            myShapeLayer.threeDLayer = true;
            //! this causes adobe to crash
            var bb = myShapeGroup.property("ADBE Vector Group");
            alert("11");
            bb.addProperty("ADBE Vec3D Side RGB");
            alert("11");
  
  


    
    //! Extrude the shape layer
    myShapeLayer.property("ADBE Extrsn Options Group").property("ADBE Extrsn Depth").setValue(100);
    alert("1");
    
};

// Show the UI window
myWindow.show();
