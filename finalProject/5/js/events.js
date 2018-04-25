// Events

controlsBool = true;
document.getElementById('orbitControls').addEventListener("click", function() {
    if (controlsBool) {
        controls.enabled = false;
        document.getElementById('orbitControls').innerHTML = "Enable Rotation"
        controlsBool = false;
    } else {
        controls.enabled = true;
        document.getElementById('orbitControls').innerHTML = "Disable Rotation"
        controlsBool = true;
    }
});

document.getElementById('resetControls').addEventListener("click", function() {
    controls.reset();
});

document.getElementById('addCube').addEventListener("click", addCube);


// Event Listenter to resize on window resize
// https://github.com/mrdoob/three.js/issues/69
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
