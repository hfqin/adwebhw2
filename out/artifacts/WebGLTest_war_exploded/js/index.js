var scene = new THREE.Scene();


var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT =
    window.innerHeight;
var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
    NEAR = 0.3, FAR = 1000;
camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.set(0, 15, 50);
camera.lookAt(new THREE.Vector3(0, 15, 0));

scene.add(camera);


var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
var container = document.getElementById("ThreeJS");
container.appendChild(renderer.domElement);


var light = new THREE.PointLight(0xffff00);
light.position.set(0, 100, 0);
scene.add(light);
var spotlight = new THREE.SpotLight(0xffff00);
spotlight.position.set(-60, 150, -30);
spotlight.shadowDarkness = 0.95;
spotlight.intensity = 2;
spotlight.castShadow = true;
scene.add(spotlight);


var skyBoxGeometry = new THREE.CubeGeometry(500, 500, 500);
var skyBoxMaterial = new THREE.MeshBasicMaterial(
    {color: 0x9999ff, side: THREE.BackSide});
var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
scene.add(skyBox);


var floorTexture = new
    THREE.ImageUtils.loadTexture("image/checkerboard.jpg");
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(2, 2);
var floorMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture,
    side: THREE.DoubleSide
});
var floorGeometry = new THREE.PlaneGeometry(500, 500, 5, 5);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -0.5;
floor.rotation.x = Math.PI / 2;
scene.add(floor);


var cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
var crateTexture = new THREE.ImageUtils.loadTexture("image/crate.gif");
var crateMaterial = new THREE.MeshBasicMaterial({map: crateTexture});
var cube = new THREE.Mesh(cubeGeometry, crateMaterial);
cube.position.set(0, 15, 0);
scene.add(cube);


var sphereGeometry = new THREE.SphereGeometry(8, 32, 16);
var sphereMaterial = new THREE.MeshPhongMaterial({color: 0x8888ff});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(30, 10, -30);
scene.add(sphere);


renderer.shadowMapEnabled = true;
cube.castShadow = true;
sphere.castShadow = true;
floor.receiveShadow = true;


var render = function () {
    requestAnimationFrame(render);
    cube.rotation.y += 0.02;
    renderer.render(scene, camera);
};
render();

$(document).keypress(function(e)
{
    console.log(e.which);
    switch(e.which)
    {

        // user presses the "w"
        case 119:    camera.translateZ(-5);
            break;

        // user presses the "s" key
        case 115:   camera.translateZ(5);
            break;

        // user presses the "a" key
        case 97:   camera.translateX(-5);
            break;

        // user presses the "d" key
        case 100:   camera.translateX(5);
            break;
        case 113:   camera.rotateY(-50);
            break;
        case 101:   camera.rotateY(50);
            break;
        default:
            break;
    }
});

var lastX = 0;
$("body").mousemove(function(e) {

});