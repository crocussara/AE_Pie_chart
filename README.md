# AE Pie Chart script


> [!IMPORTANT]
> Use the visual guide if you're just want to use the script.
> [Visual user guide here!](GUIDE.md)

## More technical stuff. Maybe? If not then just more verbousus explanations

 How is the whole thing builds up
 trim paths, the additions, etc

Pie Chart script, to create said charts. Adobe Extendscript, to use it with Adobe After Effects

Sara Safrany https://github.com/crocussara 
Portfolio: https://www.behance.net/safranysara
Created: 2023
Tested on Adobe AE CC 2020 and AE CC 2023


How does it work? Pretty simple, just import the script in your favourite way to After Effects.[^1]
What should you do, if you filled out everything and nothing happens? Well, so far all i can say is that restart the script. All known issues, bugs, and possible improvemnets are listed under the issues tab on github!

So you've opened up the script, and you can see it opening up as a new window in Aftwr Effects .To make sure that the scripts work, please have an active composition already in your AE file! First, just fill out the form, make sure that you fill out every field! (exception can be the 3d height of the pie, but I tried to word the panel in a way that it makes it obvious). 
 
Press yepp, fill out the slides. Make sure that you fill out every infut field, if you need less slices you can always lower the amount and press yepp again! When you're working and animating lots of chart data, it is really useful to name[^2] them, so don't be lazy, it'll be really helpful when it comes to control too!

When you're finished with all of this, press bake so the script can bake you a delicious looking pie chart!

* You might get alert messages if you exceeded 100 with the sum of percentage values, and in this case, you have to fix it, before being able to execute the script properly.
* If the sum is less than a 100 then tho you get an alert message, the baking will happen!
* If you choose to create a fancy 3D pie, make sure you set the render engine to Cinema4D, when you get the pop up window. (it'll open up the settings for you, but you have to change the engine). This is because extrusion is a cinema4D renderer engine specific thing in After Effects.

Now the script has run, and you are left with a bunch of layers. What are these?

First of all, be so kind and make sure to have the layers names displayed on the timeline panel instead of the source names!
* You now have two different type of layers created in your comp. The green labelled ones, the shape layers, containing a slice each, locked, you probably don't have to do anything with those (opacity, individual movement can be done).
* Second, you have got 4 different null layers:
  * "your specific name" - CNTRL - position & rotation
  * "your specific name" - CNTRL - size (& extrusion if you made a 3d pie)
  * "your specific name" - CNTRL - color
  * "your specific name" - CNTRL - slices

 These null layers have different functions, and can provide you with a much niceer experience when it comes to animation than if you would have to do everything on each layer manually.

### Position and rotation
Pretty self explanatory, this is the classic parent layer, use its position and rotation values to move and rotate the pie If you use a 3D pie the null layer is automatically rotated to 125 degrees on the X axis so the 3D-ness is visiable.


 ### Size
 This one is already a bit more complicated.Open up the effects window and you will see a bunch of sliders added to this layer! The first slider is responsible for the overall size, change the value here and everything grows, srinks. Then each slice has an individual control slider as well.
This can be useful if you want to put the emphasis on a slice: highlight them without making its value any different.

If you choose to have a 3D pie, you will find even more sliders here. These are the extrusion sliders, the first is an overall extrusion again, then the rest is for individual highlights.

Have fun playing with them!

### Color
The pie comes with automatically generated random colors, those can be changed, fixed here!
Again, in the effects panel where you can see these values the best. It would had been over of my level of coding to provide the script with color input fields, and it’s easier like this, using adobe-s own color picker I think. If you have a 3D pie, it comes with auto generated side colors, it is set to be a darker variety of the slice's main color, but only on generation, it can be changed now from this null layer.

### Slices
Again effects panel and sliders. If you change one value the other ones are still keeping their percentage values.
 
Be careful, there won't be any alert messages in this stage if your values are exceeding 100!

Oh one more thing: often when the pie is generated, AE clames that there are faulty expressions on some of the layers. There aren't. If you press uu what opens up all the expressions, you can see that there are no faults there, and the error message will dissappear as well.

 If not, or anything else, don't be afraid of writing a message.
 I hope you will have a good time. This is my very first AE script to write, I hope it works as good to you as it did to me!
 
 Sara

  [^1]: If you haven't used scripts before this can be  * File > Scripts > Run script file..  * File > Scripts > Install script file..  * File > Scripts > Install ScriptUI panel.. Whichever suits you! If you just run the script, then you have to store it in a location you can find it later if needed. In case of installing them, you will always be able to access it from either your scripts menu (if you installed as a script file) or from the windows menu (if you installed as a scriptUI file). Be aware, that if you installed it, you might have to restart your AE in order to show up!!
  [^2]:  A slight cheat if you really dispise having an easy time, you can have the same name fore more than one slices.


  Hmmm what else is  there to be talked about?

  Oh that amazing tree I found! That was livesaving
