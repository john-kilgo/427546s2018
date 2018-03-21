// John Kilgo
// Homework #2
// JavaScript Code

var canvasWheel = document.getElementById("canvasWheel");
var contextWheel = canvasWheel.getContext("2d");

var scoreInput = document.getElementById('wheelScore');
var radiusInput = document.getElementById('wheelRadius');

// Setup the canvasWheel Wheel
var setupWheel = function(score, radius) {

    contextWheel.beginPath();
    contextWheel.fillStyle = "#D3D3D3";
    contextWheel.fillRect(0, 0, canvasWheel.width, canvasWheel.height);

    var x0 = canvasWheel.width / 2
    var y0 = canvasWheel.height / 2;

    // attributes
    contextWheel.lineWidth = 1;
    contextWheel.strokeStyle = '#000';
    // arc(x-center, y-center, radius, starting angle, ending angle);

    // outside of wheel
    if (score == 100) {
        contextWheel.arc(x0, y0, radius, 0, 2 * Math.PI);
    } 
    else if (score >= 80 && score < 100) {
        contextWheel.ellipse(x0, y0, radius, radius * (score / 100), 0, 0, 2 * Math.PI);
    } 
    else { // for scores of 79 and below, inclusive. Obviously a score less than 3 will blow this up as you need at least three line segments to close a polygon.
        // Attempt at multisided polygon via https://codepen.io/gibatronic/pen/ogeOeY
        contextWheel.moveTo(x0 + radius * Math.cos(0), y0 + radius * Math.sin(0));
        
        for (var i = 1; i < score; i++) {
          contextWheel.lineTo(x0 + radius * Math.cos(i * 2 * Math.PI / score), y0 + radius * Math.sin(i * 2 * Math.PI / score));
        }         
    }
    contextWheel.fillStyle = '#fff';
    contextWheel.fill();
    contextWheel.stroke();

    // inner hub
    contextWheel.beginPath();
    contextWheel.arc(x0, y0, radius * 0.2, 0, 2 * Math.PI);
    contextWheel.stroke();

    document.getElementById("applyWheel").addEventListener("click", function() {
        setupWheel(scoreInput.value,radiusInput.value);
    });

}

setupWheel(scoreInput.value,radiusInput.value);

