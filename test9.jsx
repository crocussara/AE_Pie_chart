var win = new Window("palette", "Fonts", undefined);


win.orientation = "column";




var winGraphics = win.graphics;


var red = winGraphics.newPen(winGraphics.BrushType.SOLID_COLOR, [1,0,0], 1);


var blue = winGraphics.newPen(winGraphics.BrushType.SOLID_COLOR, [0,0,1], 1);


var gray = winGraphics.newPen(winGraphics.BrushType.SOLID_COLOR, [0.5,0.5,0.5], 1);




//Create fonts


var ariaBold24Font = ScriptUI.newFont("Arial", ScriptUI.FontStyle.BOLD, 24);


var arialReg10Font = ScriptUI.newFont("Arial", ScriptUI.FontStyle.REGULAR, 10);


var arialItalic18Font = ScriptUI.newFont("Arial", ScriptUI.FontStyle.ITALIC, 18);


var gillSansBold20Font = ScriptUI.newFont("Gill Sans", ScriptUI.FontStyle.BOLD, 20);




//Sample text


var a = win.add("statictext", undefined, "abcdefghijklmnopqrstuvwxyz");


var b = win.add("statictext", undefined, "abcdefghijklmnopqrstuvwxyz");


var c = win.add("statictext", undefined, "abcdefghijklmnopqrstuvwxyz");


var d = win.add("statictext", undefined, "abcdefghijklmnopqrstuvwxyz");


var e = win.add("statictext", undefined, "abcdefghijklmnopqrstuvwxyz");


var f = win.add("statictext", undefined, "abcdefghijklmnopqrstuvwxyz");




//Apply font styles


a.graphics.font = ariaBold24Font;


b.graphics.font = arialReg10Font;


c.graphics.font = arialItalic18Font;


d.graphics.font = gillSansBold20Font;


e.graphics.font = ariaBold24Font;


f.graphics.font = gillSansBold20Font;




//Apply color


a.graphics.foregroundColor = blue;


e.graphics.foregroundColor = red;


f.graphics.foregroundColor = gray;




win.center();


win.show();