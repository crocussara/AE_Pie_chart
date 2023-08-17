(function(thisObj) {
    scriptBuildUI(thisObj)

    function scriptBuildUI(thisObj) {
        var win = (thisObj instanceof Panel) ? thisObj : new Window("palette", "ScriptUI Template", undefined);
        win.spacing = 5;
        var boo = [];
        var groupOne = win.add("group", undefined, "GroupOne");
        var dropDown = groupOne.add("dropdownlist", undefined, ["isn't", "is"]);
        dropDown.selection = 0;
        var button = groupOne.add("button", undefined, "Alert");

      

        

        win.onResizing = win.onResize = function() {
            this.layout.resize();
        };

        button.onClick = function() {
            if (dropDown.selection.index == 0) {
                boo = false;
            }
            if (dropDown.selection.index == 1) {
                boo = true;
            }            

            alert(boo);
        }

        if (win instanceof Window) {
            win.center();
            win.show();
        } else {
            win.layout.layout(true);
            win.layout.resize();
        }
    }
})(this);

