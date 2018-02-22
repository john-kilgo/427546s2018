John Kilgo
Program #1
Readme

Sources Used
-> HTML5 Skeleton - https://www.w3schools.com/html/html5_intro.asp
-> Canvas Info  - https://www.w3schools.com/graphics/canvas_reference.asp
-> Midpoint Line Generation - https://www.geeksforgeeks.org/mid-point-line-generation-algorithm/, https://stackoverflow.com/questions/4672279/bresenham-algorithm-in-javascript
-> Mouse Events - https://www.w3schools.com/tags/ref_eventattributes.asp
-> Add event Listener - https://www.w3schools.com/jsref/met_element_addeventlistener.asp
-> Translating mouse position - http://corehtml5canvas.com/code-live/ch02/example-2.15/example.js
-> Midpoint Ellipse resources 
    -> started here: http://www.cpp.edu/~raheja/CS445/MEA.pdf
    -> found this to be easier to review: http://www.eazynotes.com/notes/computer-graphics/algorithms/mid-point-elliplse-algorithm.pdf

How To Operate

Instructions are displayed for the user when visiting the application.

For most, it is point, hold, drag and release. For polyline and polygon, one can point and click and still get the rubberbanding functionality.

General Information

I used many online resources. Since I was unfamiliar with the coordinate system of canvas having the y start from the top, I relied heavily on the examples cited above to implement the ellipse and polyline that use the midpoint method.

As I learned more about the canvas, my code base grew. Had I had much more time, I would have tried to optimize further. But first I got my buttons working and drawing without rubberbanding for all objects. Then I went back and did my best to shoehorn in rubberbanding which works with the exception of a bug that the current rubberbanding line segement will remain when you go off the canvas to click a new button (but clicking a new button gets rid of the extraneous line).

My submission includes code written by myself, using references for general knowledge, and notices of where I have borrowed or copied from other sources.

This is entirely my own work, except as disclosed in 
the documentation and as commented within my work.

I gave help to the following persons:
None

Signed John W Kilgo VI, 2/21/2018