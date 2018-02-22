// John Kilgo
// Homework #1
// JavaScript Code

var canvas = null;
var context = null;
var startPoint = null;
var polygon = false;
var polygonStart = undefined;
var endPoint = null;
var priorHandler = {
    "mousedown" : undefined,
    "mouseup" : undefined,
    "mousemove" : undefined
}
var image = undefined;

// Provide feedback to user
var myStatus = function (str) {
    document.getElementById("status").innerHTML = str;
}

// Setup the canvas
var setupCanvas = function (id) {
    canvas = document.getElementById(id)
    context = canvas.getContext("2d");
    context.fillStyle = "#D3D3D3";
    context.fillRect(0, 0, canvas.width, canvas.height);
    image = context.getImageData(0, 0, canvas.width, canvas.height);

    document.getElementById("line").addEventListener("click", function() {
        removeHandler();
        document.getElementById("specialMessage").innerHTML = "Hold and click.";
        priorHandler.mousedown = lineStart;
        priorHandler.mousemove = lineMove;
        priorHandler.mouseup = lineEnd;
        addHandler();
        myStatus("loaded line");
    });

    document.getElementById("circle").addEventListener("click", function() {
        removeHandler();
        document.getElementById("specialMessage").innerHTML = "Hold and click.";
        priorHandler.mousedown = circleStart;
        priorHandler.mousemove = circleMove;
        priorHandler.mouseup = circleEnd;
        addHandler();
        myStatus("loaded circle");
    });

    document.getElementById("ellipse").addEventListener("click", function() {
        removeHandler();
        document.getElementById("specialMessage").innerHTML = "Hold and click.";
        priorHandler.mousedown = ellipseStart;
        priorHandler.mousemove = ellipseMove;
        priorHandler.mouseup = ellipseEnd;
        addHandler();
        myStatus("loaded ellipse");
    });

    document.getElementById("rectangle").addEventListener("click", function() {
        removeHandler();
        document.getElementById("specialMessage").innerHTML = "Hold and click.";
        priorHandler.mousedown = rectStart;
        priorHandler.mousemove = rectMove;
        priorHandler.mouseup = rectEnd;
        addHandler();
        myStatus("loaded rectangle");
    });

    document.getElementById("polyline").addEventListener("click", function() {
        removeHandler();
        document.getElementById("specialMessage").innerHTML = "Double click to stop Polyline";
        priorHandler.mousedown = polylineStart;
        priorHandler.mousemove = polylineMove;
        // priorHandler.mouseup = polylineEnd;
        startPoint = undefined;
        endPoint = undefined;
        addHandler();
        myStatus("loaded polyline");
    });

    document.getElementById("polygon").addEventListener("click", function() {
        removeHandler();
        document.getElementById("specialMessage").innerHTML = "Point and click.";
        priorHandler.mousedown = polylineStart;
        priorHandler.mousemove = polylineMove;
        //priorHandler.mouseup = polylineEnd;
        polygonStart = undefined;
        startPoint = undefined;
        endPoint = undefined;
        polygon = true;
        addHandler();
        document.getElementById("endPolygon").style.visibility = "visible";
        myStatus("loaded polygon");
    });

    document.getElementById("endPolygon").addEventListener("click", function() {
        context.putImageData(image, 0, 0);
        if (polygon) {
            line(
                endPoint.x,
                endPoint.y,
                polygonStart.x,
                polygonStart.y
            )
            image = context.getImageData(0, 0, canvas.width, canvas.height);
            removeHandler();
            myStatus("ended polygon");
            polygon = false;
        }
        else {
            myStatus("not a polygon");
        }
        document.getElementById("endPolygon").style.visibility = "hidden";
    });

    document.getElementById("clear").addEventListener("click", function() {
        removeHandler()
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#D3D3D3";
        context.fillRect(0, 0, canvas.width, canvas.height);
        image = context.getImageData(0, 0, canvas.width, canvas.height);
        myStatus("board reset");
    });

    canvas.addEventListener("mousemove", function (event) {
        var point = translate(event.clientX, event.clientY);

        document.getElementById("x").innerHTML = point.x;
        document.getElementById("y").innerHTML = point.y;
    })

    canvas.addEventListener("dblclick", function (event) {
        removeHandler();
    })

}

// Handler
var removeHandler = function () {
    context.putImageData(image, 0, 0);
    if (priorHandler.mousedown) {
        canvas.removeEventListener("mousedown", priorHandler.mousedown);
        priorHandler.mousedown = undefined;
    }
    if (priorHandler.mouseup) {
        canvas.removeEventListener("mouseup", priorHandler.mouseup);
        priorHandler.mouseup = undefined;
    }
    if (priorHandler.mousemove) {
        canvas.removeEventListener("mousemove", priorHandler.mousemove);
        priorHandler.mousemove = undefined;
    }
    document.getElementById("endPolygon").style.visibility = "hidden";
    document.getElementById("specialMessage").innerHTML = "&nbsp;";
}

var addHandler = function () {
    image = context.getImageData(0, 0, canvas.width, canvas.height);
    startPoint = undefined;
    endPoint = undefined;
    if (priorHandler.mousedown) {
        canvas.addEventListener("mousedown", priorHandler.mousedown);
    }
    if (priorHandler.mouseup) {
        canvas.addEventListener("mouseup", priorHandler.mouseup);
    }
    if (priorHandler.mousemove) {
        canvas.addEventListener("mousemove", priorHandler.mousemove);
    }
}

// Pixel primitive
var pixel = function (x, y) {
    context.beginPath();
    context.fillStyle = "#581845";
    context.fillRect(x, y, 1, 1);
    context.closePath();  
    context.fill();
}

// Translating the coordinate from mouse event to a simpler
// representation on the canvas.
// Taken from corehtml5canvas.com/code-live/ch02/example-2.15/example.js
// Lines 69-73
var translate = function (x, y) {
    var boundingRect = canvas.getBoundingClientRect();
    return { 
        x: x - Math.round(boundingRect.left),
        y: y - Math.round(boundingRect.top) 
    };
}

///////// Ellipse
var ellipseStart = function (event) {
    startPoint = translate(event.clientX, event.clientY);
}

var ellipseMove = function (event) {
    context.putImageData(image, 0, 0);
    var tempEnd = translate(event.clientX, event.clientY);
    ellipse(
        startPoint.x,
        startPoint.y,
        Math.abs(tempEnd.x - startPoint.x),
        Math.abs(tempEnd.y - startPoint.y)
    )
}

var ellipseEnd = function (event) {
    endPoint = translate(event.clientX, event.clientY);

    ellipse(
        startPoint.x,
        startPoint.y,
        Math.abs(endPoint.x - startPoint.x),
        Math.abs(endPoint.y - startPoint.y)
    )
    image = context.getImageData(0, 0, canvas.width, canvas.height);
    startPoint = undefined;
    myStatus("ellipse drawn");
}

///////// Circle
var circleStart = function (event) {
    startPoint = translate(event.clientX, event.clientY);
}

var circleMove = function (event) {
    context.putImageData(image, 0, 0);
    var tempEnd = translate(event.clientX, event.clientY);
    var radius = Math.sqrt(
        Math.pow((tempEnd.x - startPoint.x), 2),
        Math.pow((tempEnd.y - startPoint.y), 2),
    )
    ellipse(
        startPoint.x,
        startPoint.y,
        radius,
        radius
    )
}

// circle radius - http://www.dummies.com/education/math/calculus/how-to-graph-a-circle/
var circleEnd = function (event) {
    endPoint = translate(event.clientX, event.clientY);

    var radius = Math.sqrt(
        Math.pow((endPoint.x - startPoint.x), 2),
        Math.pow((endPoint.y - startPoint.y), 2),
    )
    ellipse(
        startPoint.x,
        startPoint.y,
        radius,
        radius
    )
    image = context.getImageData(0, 0, canvas.width, canvas.height);
    startPoint = undefined;
    myStatus("circle drawn");
}


///////// Rectangle
var rectStart = function (event) {
    startPoint = translate(event.clientX, event.clientY);
}

var rectMove = function (event) {
    context.putImageData(image, 0, 0);
    var tempEnd = translate(event.clientX, event.clientY);
    line(startPoint.x,startPoint.y,startPoint.x,tempEnd.y)
    line(startPoint.x,startPoint.y,tempEnd.x,startPoint.y)
    line(tempEnd.x,startPoint.y,tempEnd.x,tempEnd.y)
    line(startPoint.x,tempEnd.y,tempEnd.x,tempEnd.y)
}

var rectEnd = function (event) {
    endPoint = translate(event.clientX, event.clientY);

    line(startPoint.x,startPoint.y,startPoint.x,endPoint.y)
    line(startPoint.x,startPoint.y,endPoint.x,startPoint.y)
    line(endPoint.x,startPoint.y,endPoint.x,endPoint.y)
    line(startPoint.x,endPoint.y,endPoint.x,endPoint.y)
    image = context.getImageData(0, 0, canvas.width, canvas.height);
    startPoint = undefined;

    myStatus("plotted rectangle");
}

///////// Line
var lineStart = function (event) {
    startPoint = translate(event.clientX, event.clientY);
}

var lineMove = function (event) {
    context.putImageData(image, 0, 0);
    var tempEnd = translate(event.clientX, event.clientY);
    line(
        startPoint.x,
        startPoint.y,
        tempEnd.x,
        tempEnd.y
    )
}

var lineEnd = function (event) {
    endPoint = translate(event.clientX, event.clientY);
    line(
        startPoint.x,
        startPoint.y,
        endPoint.x,
        endPoint.y
    )
    image = context.getImageData(0, 0, canvas.width, canvas.height);
    startPoint = undefined;
    myStatus("line plotted");
}

///////// (Poly) Line
var polylineStart = function (event) {
    if (polygon && polygonStart == undefined)
        polygonStart = startPoint;

    startPoint = translate(event.clientX, event.clientY);
    if (endPoint) {
        line(
            endPoint.x,
            endPoint.y,
            startPoint.x,
            startPoint.y,
        )
        endPoint = startPoint;
    }
    else {
        pixel(startPoint.x, startPoint.y);
        endPoint = startPoint;
    }
    image = context.getImageData(0, 0, canvas.width, canvas.height);
}

var polylineMove = function (event) {
    context.putImageData(image, 0, 0);
    var tempEnd = translate(event.clientX, event.clientY);
    line(
        endPoint.x,
        endPoint.y,
        tempEnd.x,
        tempEnd.y
    )
}

// var polylineEnd = function (event) {
//     endPoint = translate(event.clientX, event.clientY);
//     line(
//         startPoint.x,
//         startPoint.y,
//         endPoint.x,
//         endPoint.y
//     )
//     canvas.removeEventListener("mouseup", priorHandler.mouseup);
//     myStatus("line plotted");
// }

// Draw a line
// from https://www.geeksforgeeks.org/mid-point-line-generation-algorithm/
// and from https://stackoverflow.com/questions/4672279/bresenham-algorithm-in-javascript
var line = function (x1, y1, x2, y2) {
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var x = x1;
    var y = y1;

    var err = dx - dy;
 
    while( true ){
        pixel(x, y);
 
        if ( (x == x2) && (y == y2) ) break;

        var e2 = 2 * err;
        if (e2 > -dy) { 
            err -= dy; 
            x  += sx; 
        }

        if (e2 < dx) { 
            err += dx; 
            y  += sy; 
        }
    }
}

// Draw Ellipse
// Needed to use algorithm from: http://www.eazynotes.com/notes/computer-graphics/algorithms/mid-point-elliplse-algorithm.pdf

var ellipsePoint = function (xc, yc, x, y) {
    pixel(xc + x, yc + y);
    pixel(xc - x, yc + y);
    pixel(xc + x, yc - y);
    pixel(xc - x, yc -y);
}

var ellipse = function(xc, yc, rx, ry) {
    var rxsq = rx * rx;
    var rysq = ry * ry;
    var x = 0;
    var y = ry;
    var px = 0;
    var py = 2 * rxsq * y;

    ellipsePoint(xc, yc, x, y);

    var p = rysq - (rxsq * ry) + (0.25 * rxsq)
    while (px < py) {
        x = x + 1;
        px = px + 2 * rysq;
        if (p < 0)
            p = p + rysq + px;
        else {
            y = y - 1;
            py = py - 2 * rxsq;
            p = p + rysq + px - py;
        }
        ellipsePoint(xc, yc, x, y);
    }

    p = rysq * Math.pow((x + 0.5), 2) + rxsq * Math.pow((y - 1), 2) - rxsq * rysq;

    while (y > 0) {
        y = y - 1;
        py = py - 2 * rxsq;
        if (p > 0)
            p = p + rxsq - py;
        else {
            x = x + 1;
            px = px + 2 * rysq;
            p = p + rxsq - py + px;
        }
        ellipsePoint(xc, yc, x, y);
    }
}


