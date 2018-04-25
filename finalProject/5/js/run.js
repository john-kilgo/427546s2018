// Initialization of Canvas

var camera, scene, renderer, controls;

// Objects on Canvas
var cubes = [], plane;

var initialize = function() {
    camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 50 );
    camera.position.z = 20//(window.innerWidth / window.innerHeight) * 3;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x202020 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls();

    // Refresh scene
    animate();
}

// Populate the Scene
initialize();
// Add a Light Source
addLight();
// Add the plane
plane();

// Orbit Controls Library
function orbitControls() {
    // inspired by: https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_orbit.html
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;
    controls.panningMode = THREE.HorizontalPanning;
    controls.minDistance = 0;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2; // Rotate like a circle
}

// Add Objects
function addCube() {
    var material = new THREE.MeshBasicMaterial( { color: 0x355e3b } );
    var geometry = new THREE.BoxGeometry( 0, 0, 0 ); 
    geometry.translate( -1, 1, 3 )
    // Mesh takes a geometry and applies a material to it so it can then be placed on the scene
    cubes.push( new THREE.Mesh( geometry, material ));
    scene.add( cubes[cubes.length-1] );
    console.log(cubes.length)
}

function plane() {
    var geometry = new THREE.BoxGeometry( 20, 20, 0.25 ); 
    //var geometry = new THREE.PlaneGeometry( 20, 20,);
    var material = new THREE.MeshBasicMaterial( {color: 0xC0C0C0} );
    plane = new THREE.Mesh( geometry, material );
    plane.position.y = 2;
    scene.add( plane );

}

function addLight() {
    var geometry = new THREE.SphereGeometry( 1, 8, 6 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var lightSource = new THREE.Mesh( geometry, material );

    var light = new THREE.PointLight( 0xff0000, 1, 100 );
    light.position.set( 5, 5, 5 );
    scene.add( light );
    light.add( lightSource );
}

// Alternative to using setInterval(), more efficient
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
