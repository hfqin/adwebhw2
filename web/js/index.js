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


var light = new THREE.PointLight(0xffb515);
light.position.set(0, 100, 0);
scene.add(light);
//var spotlight = new THREE.SpotLight(0xffff00);
//spotlight.position.set(-60, 150, -30);
//spotlight.shadowDarkness = 0.95;
//spotlight.intensity = 2;
//spotlight.castShadow = true;
//scene.add(spotlight);


var skyBoxGeometry = new THREE.CubeGeometry(500, 500, 500);
var skyBoxMaterial = new THREE.MeshBasicMaterial(
    {color: 0xB5E3F5, side: THREE.BackSide});
var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
scene.add(skyBox);


var floorTexture = new
    THREE.ImageUtils.loadTexture("image/checkerboard.jpg");
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(10, 10);
var floorMaterial = new THREE.MeshBasicMaterial({
    map: floorTexture,
    side: THREE.DoubleSide
});
var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 5, 5);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -0.5;
floor.rotation.x = Math.PI / 2;
scene.add(floor);


var cubeGeometry = new THREE.CubeGeometry(10, 10, 10);
var cubewall = new THREE.CubeGeometry(100, 10, 10);
var crateTexture = new THREE.ImageUtils.loadTexture("image/crate.gif");
var crateMaterial = new THREE.MeshBasicMaterial({map: crateTexture});
var cube = new THREE.Mesh(cubeGeometry, crateMaterial);
cube.position.set(0, 15, 0);
var cube1 = new THREE.Mesh(cubeGeometry, crateMaterial);
cube1.position.set(10, 15, 50);
var cube2 = new THREE.Mesh(cubeGeometry, crateMaterial);
cube2.position.set(0, 35, 33);
var cube3 = new THREE.Mesh(cubeGeometry, crateMaterial);
cube3.position.set(40, 5, 0);
scene.add(cube);
scene.add(cube1);
scene.add(cube2);
scene.add(cube3);


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
var lastX;
var lastY;
var lastTime = 0;
//$(document).mousemove(function(e){
//    console.log(e);
//    console.log(e.offsetX+" "+ e.offsetY);
//    var offsetX = e.offsetX - lastX;
//    var offsetY = e.offsetY - lastY;
//    var offsetTime = e.timeStamp - lastTime;
//    console.log(offsetX);
//    if (offsetTime >= 100) {
//        if (offsetX<0) {
//            camera.rotateY(-50);
//        }
//        if (offsetX>0) {
//            camera.rotateY(50);
//        }
//        if(offsetY<0) {
//            camera.rotateX(-50);
//
//            camera.lookAt(new THREE.Vector3(0, 15, 0));
//            console.log(camera);
//        }
//        if(offsetY>0) {
//            camera.rotateX(50);
//            camera.lookAt(new THREE.Vector3(0, 15, 0));
//        }
//        lastTime = e.timeStamp;
//    }
//    lastY = e.offsetY;
//    lastX = e.offsetX;
//});
var lastX = 0;
$("body").mousemove(function(e) {

});


function draw3D()  {
    var controls;

    function animate() {
        requestAnimationFrame(animate);

        pyramid1.rotateY(Math.PI/180);
        sphere.rotateY(Math.PI/180);
        cube.rotateY(Math.PI/180);
        multi.rotateY(Math.PI/480);
        renderer.render(scene, camera);
    }
    function updateControls() {
        controls.update();
    }

    var geo = new THREE.CylinderGeometry(0,2,2,4,1, true);
    var pyramid1 = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({color:0xff0000}));
    pyramid1.position.set(-2.5, -1, 0);

    geo = new THREE.SphereGeometry(1, 25, 25);
    var sphere = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({color:0x00ff00}));
    sphere.position.set(2.5, -1, 0);

    geo = new THREE.CubeGeometry(2,2,2);
    var cube = new THREE.Mesh(geo,new THREE.MeshPhongMaterial({color:0x0000ff })   );
    cube.position.set(0, 1, 0);

    var camera = new THREE.PerspectiveCamera(  45, 1024/500,0.1, 100);
    camera.position.z = 10;
    camera.position.y = 1;

    controls = new THREE.OrbitControls( camera );
    controls.addEventListener( 'change', updateControls );

    var multi = new THREE.Object3D();
    pyramid1.castShadow = true; sphere.castShadow = true;
    multi.add(cube);
    multi.add(pyramid1);
    multi.add(sphere);
    multi.position.z = 0;

    geo = new THREE.PlaneGeometry(20, 25);
    var floor = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color :0xcfcfcf}));
    floor.material.side = THREE.DoubleSide;
    floor.rotation.x = Math.PI/2;
    floor.position.y = -2;
    floor.receiveShadow = true;

    var light = new THREE.DirectionalLight(0xe0e0e0);
    light.position.set(5,2,5).normalize();
    light.castShadow = true;
    light.shadowDarkness = 0.5;
    light.shadowCameraRight = 5;
    light.shadowCameraLeft = -5;
    light.shadowCameraTop = 5;
    light.shadowCameraBottom = -5;
    light.shadowCameraNear = 2;
    light.shadowCameraFar = 100;

    var scene = new THREE.Scene();
    scene.add(floor);
    scene.add(multi);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x101010));

    var div = document.getElementById("ThreeJS");

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(1024,500);
    renderer.setClearColor(0x000000, 1);
    renderer.shadowMapEnabled = true;
    div.appendChild( renderer.domElement );
    animate();

}
