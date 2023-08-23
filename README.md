# AE Pie Chart script
## Do you need some fancy animatable pie charts in after effects? 
### Well, this script got you covered, you can bake the most conviniently structured hassle free pies with it!

> [!IMPORTANT]
> [Visual user guide here!](GUIDE.md)


How does it work? Pretty simple, just import the script in your favourite way to After Effects.[^1]

So you've opened up the script, and you can see this panel in front of you .To make sure that the scripts work, please have an active composition already in your AE file! First, just fill out the form, make sure that you fill out every field!<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 572.76 1393.43"/>![image](https://github.com/crocussara/AE_Pie_chart/assets/120991342/14d99121-63dc-4263-ab2b-e90330a3c18c)

 (exception can be the 3d height of the pie, but I tried to word the panel in a way that it makes it obvious). Maybe an image with some text on it would be more suiting here.
Press yepp, fill out the slides. Make sure that you fill out every infut field, if you need less slices you can always lower the amount and press yepp again! when you're working and animating lots of chart data, it is really useful to name them, so don't be lazy, it'll be really helpful when it comes to control too! (a slight cheat if you really dispise having an easy time, you can have the same name fore more than one slices)
When you're finished with all of this, press bake so the script can bake you a delicious looking pie chart!
You might get alert messages if you exceeded 100 with the sum of percentage values, and in this case, you have to fix it, before being able to execute the script properly.
If the sum is less than a 100 then tho you get an alert message, the baking will happen!
If you choose to create a fancy 3D pie, make sure you set the render engine to Cinema4d, when you get the pop up window. (it'll open up the settings for you, but you have to change the engine). this is because extrusion is a cinema4d renderer engine specific thing in after effects.

Now the script has run, and you are left with a bunch of layers. What are these?
First of all, be so kind and make sure to have the layers names displayed on the timeline panel instead of the source names!
You now have two different type of layers created in your comp. The green labelled ones, the shape layers, containing a slice each, locked, you probably don't have to do anything with those (opacity, individual movement can be done).
Second, you have got 4 different null layers:
 "your specific name" - CNTRL - position & rotation
 "your specific name" - CNTRL - size (& extrusion if you made a 3d pie)
 "your specific name" - CNTRL - color
 "your specific name" - CNTRL - slices

 These null layers have different functions, and can provide you with a much niceer experience when it comes to animation than if you would have to do everything on each layer manually.

 Position and rotation, pretty self explanatory, this is the classic parent layer, use its position and rotation values to move and rotate the pie
 If you use a 3d pie the null layer is automatically rotated to 125 degrees on the x axis so the 3dimentionalism is visiable.

 Size: this one is already a bit more complicated! Open up the effects window and you will see a bunch of sliders added to this layer! 
 The first slider is responsible for the overall size, change the value here and everything grows, srinks.
 then each slice has an individual control slider as well! This can be useful if you want to put the emphasis on a slice: highlight them without making its value any different.
 If you choose to have a 3d pie, you will find even more sliders here! these are the extrusion sliders, the first is an overall extrusion again, then the rest is for individual highlights. Have fun playing with them!

 Color: The pie comes with automatically generated random colors, those can be changed, fixed here! Again, in the effects panel where you can see these values the best. It would had been over of my level of coding to provide the script with color input fields, and it is easier like this, using adobe-s own color picker I think.
 If you have a 3d pie, it comes with auto generated side colors, it is set to be a darker variety of the slice's main color, but only on generation, it can be changed now from this null layer.

 Slices: Again effects panel, in the form of sliders. If you change one value the other ones are not changing, just moving with it (maybe this sentence makes no sense). Be careful, there won't be any alert messages in this stage if your values are exceeding 100!

 Hmmm I think that's it. MAny stuff can be cut out, with some nice visual images tho.
 Oh one more thing: often when the pie is generated, AE clames that there are faulty expressions on some of the layers. There aren't. If you press uu what opens up all the expressions, you can see that there are no faults there, and the error message will dissappear as well.

 If not, or anything else, don't be afraid of writing a message.
 I hope you will have a good time. This is my very first AE script to write, I hope it works as good to you as it did to me!
 Sara


 ## More technical stuff. Maybe? If not then just more verbousus explanations

 How is the whole thing builds up
 trim paths, the additions, etc

 Different shape of charts:
  donought, an easy fix
  other, maybe even user input? Could be an interesing thing to play with, so far I dunno how should I do it

  That small cheat value, what sometimes needed for seemlessness!

  disecting a slice onto further slices

  How could I hide the bake it button in the beggining?

  keep the input data if the slice value is refressed?

  Add and subtract buttons to add slices instead of a number input? Maybe? not totally convinced?

  [^1]: If you haven't used scripts before this can be
  * File > Scripts > Run script file..
  * File > Scripts > Install script file..
  * File > Scripts > Install ScriptUI panel..
Whichever suits you! If you just run the script, then you have to store it in a location you can find it later if needed. In case of installing them, you will always be able to access it from either your scripts menu (if you installed as a script file) or from the windows menu (if you installed as a scriptUI file). Be aware, that if you installed it, you might have to restart your AE in order to show up!!


  Hmmm what else is  there to be talked about?

  Oh that amazing tree I found! That was livesaving
