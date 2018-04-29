// Initialization of Canvas

var camera, scene, renderer, controls, axesHelper;

// Objects on Canvas
var myObjects = [], plane, materials = {}, textures = [];

// drop down accessor see README.txt
var e = document.getElementById("textures");
var textureToUse = e.options[e.selectedIndex].value;

textures.push("cat");
textures.push("grass");
textures.push("map");
textures.push("mountain");

// for ( var i= 0; i < textures.length; ) {
//     var str = textures[i];
//     var img = 'textures/'+ str +'.jpg';
//     var texture = new THREE.TextureLoader().load( img );
//     materials[str] = new THREE.MeshBasicMaterial( { map: texture } );
// }

var texture = new THREE.TextureLoader().load( 'textures/grass.jpg' );
materials["grass"] = new THREE.MeshBasicMaterial( { map: texture } );

var texture = new THREE.TextureLoader().load( 'textures/cat.jpg' );
materials["cat"] = new THREE.MeshBasicMaterial( { map: texture } );

var initialize = function() {
    camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 2000 );
    camera.position.z = 20//(window.innerWidth / window.innerHeight) * 3;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x202020 );

    var axesHelper = new THREE.AxesHelper( 10 );
    scene.add( axesHelper );

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
    var geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
    geometry.translate( -1, 1, 3 )
    // Mesh takes a geometry and applies a material to it so it can then be placed on the scene
    myObjects.push( new THREE.Mesh( geometry, materials[textureToUse] ));
    scene.add( myObjects[myObjects.length-1] );
    console.log(myObjects.length)
}

function addCone() {
    var geometry = new THREE.ConeGeometry( 4, 12, 32 );
    geometry.translate( -4, 6, 1 )
    // Mesh takes a geometry and applies a material to it so it can then be placed on the scene
    myObjects.push( new THREE.Mesh( geometry, materials[textureToUse] ));
    scene.add( myObjects[myObjects.length-1] );
    console.log(myObjects.length)
}


function plane() {
    var geometry = new THREE.BoxGeometry( 20, 0.25, 20 );
    geometry.translate( -1, 0, 0 )
    plane = new THREE.Mesh( geometry, materials["grass"] );
    plane.position.y = -0.2;
    scene.add( plane );
    console.log(plane.material)
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
    // camera.lookAt( scene.position );
    // camera.near = document.getElementById('nearRange').value;
    // camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}
