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

// Not working, unknown reason
document.getElementById('nearRange').addEventListener("change", function() {
    camera.near = document.getElementById('nearRange').value;
    camera.updateProjectionMatrix();
});

document.getElementById('textures').addEventListener("change", function() {
        // drop down accessor see README.txt
        var e = document.getElementById("textures");
        var str = e.options[e.selectedIndex].value;
        textureToUse = str;
});

document.getElementById('objectScaleRange').addEventListener("change", function() {
    var scale = document.getElementById('objectScaleRange').value;
    if (myObjects.length > 0) {
        myObjects[myObjects.length-1].scale.x = scale;
        myObjects[myObjects.length-1].scale.y = scale;
        myObjects[myObjects.length-1].scale.z = scale;
    }
});

var optionsBool = false;
document.getElementById('additionalOptions').addEventListener("click", function() {

    if (optionsBool) {
        document.getElementById("optionsContainer").style.display = "none";
        optionsBool = false;
    } else {
        optionsBool = true;
        document.getElementById("optionsContainer").style.display = "block";
    }
});

document.getElementById('addCube').addEventListener("click", addCube);

document.getElementById('addCone').addEventListener("click", addCone);

// Event Listenter to resize on window resize
// https://github.com/mrdoob/three.js/issues/69
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
