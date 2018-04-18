// Initialization of Canvas

// global Scene
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
// Field of View, Aspect Ratio, Near-, Far-Clipping Pane
var camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 50 );
camera.position.z = (window.innerWidth / window.innerHeight) * 3;

var loader = new THREE.FontLoader();

// Put on screen canvas
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// add to 
document.body.appendChild( renderer.domElement );
// Init new OrbitControls object
controls = new THREE.OrbitControls(camera, renderer.domElement);
orbitControls();

// Material is a texture applied to the geometry
var material = new THREE.MeshBasicMaterial( { color: 0x355e3b } );

loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
    var geometry = new THREE.TextGeometry( 'Project Part 4', {
        font: font,
        size: 0.4,
        height: 0.01,
        curveSegments: 15
    });
    //geometry.center();
    geometry.translate( -2, -2, 2 )
    var text = new THREE.Mesh( geometry, material );
    scene.add( text )
});

var add3DMeshObject = function(myShape) {
    switch (myShape) {
        case 'cube':
            console.log(myShape)
            var geometry = new THREE.BoxGeometry( 0, 0, 0 ); 
            geometry.translate( -1, 1, 3 )
            // Mesh takes a geometry and applies a material to it so it can then be placed on the scene
            var cube = new THREE.Mesh( geometry, material );
            scene.add( cube );
    }
}

var light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 0, 100, 90 );
scene.add( light );

// Utility Functions

function orbitControls() {
    // inspired by: https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_orbit.html
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;
    controls.panningMode = THREE.HorizontalPanning;
    controls.minDistance = 0;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2; // Rotate like a circle
}

// Alternative to using setInterval(), more efficient
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
