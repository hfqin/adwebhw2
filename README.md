# 高级Web_homework2说明文档，WebGL之Three.js学习使用总结 #
WebGL实践，张江校区部分景观游览

**使用Three.js开发**

## 相机的使用 ##
相机的创建
`camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);`

相机的位置
`camera.position.set(x, y, z);`

相机的朝向
`camera.lookAt(new THREE.Vector3(x, y, z));`

## 几何形状的使用 ##
圆柱  `new THREE.CylinderGeometry(45, 45, 20, 360);`

球体  `new THREE.SphereGeometry(500, 360, 360);`

立方体  `new THREE.CubeGeometry(x, y, z);`

## 材质的使用 ##

材质和几何体构成网格，决定几何体是否像金属，透明与否，已经是否显示成线框。

`MeshBasicMaterial：`对光照无感，给几何体一种简单的颜色或显示线框

`MeshLambertMaterial：`这种材质对光照有反应，用于创建暗淡的不发光的物体

`MeshPhongMaterial：`这种材质对光照也有反应，用于创建金属类明亮的物体

**本次主要使用MeshPhongMaterial这种材质，更贴近真实世界**

给几何形状添加颜色

    var blueFloorGeometry1 = new THREE.CubeGeometry(650, 10, 60);
    var blueFloorMaterial = new THREE.MeshPhongMaterial({color: 0x0000ff});
    var blueFloor1 = new THREE.Mesh(blueFloorGeometry1, blueFloorMaterial);


给几何形状添加贴图

    var doorRoomGeometry = new THREE.CubeGeometry(30, 25, 15);
    var doorRoomTexture = new THREE.ImageUtils.loadTexture("image/doorRoom.PNG");
    var doorRoomMaterial = new THREE.MeshPhongMaterial({map: doorRoomTexture});
    var doorRoom = new THREE.Mesh(doorRoomGeometry, doorRoomMaterial);

## 光与影的使用 ##
**光**

光分为环境光`THREE.AmbientLight`，点光源`THREE.PointLight`，平行光`THREE.DirectionalLight`，聚光灯`THREE.SpotLight`4种

**阴影**

明暗是相对的，阴影的形成也就是因为比周围获得的光照更少。因此，要形成阴影，光源必不可少。

在Three.js中，能形成阴影的光源只有THREE.DirectionalLight与THREE.SpotLight；而相对地，能表现阴影效果的材质只有THREE.LambertMaterial与THREE.PhongMaterial。

首先，我们需要在初始化时，告诉渲染器渲染阴影： `renderer.shadowMapEnabled = true; `

然后，对于光源以及所有要产生阴影的物体调用： `xxx.castShadow = true; `

对于待接收阴影的物体调用： `xxx.receiveShadow = true;`

## 场景和渲染器 ##
**场景**

场景就是需要绘制的对象,通过`var scene = new THREE.Scene(); `创建，所有光源，几何形状等都需要add到场景中。

**渲染器**

渲染器是绘制的载体（可以挂靠到浏览器的DOM元素中）,通过设置`{antialias: true}`可以抗锯齿，提高显示效果。如下：创建了一个WebGL的渲染器（注意Three.js也支持非3D的Canvas2D的渲染器），然后挂靠为HTML文档body的DOM子元素。

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    var container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);

渲染时，循环操作，每60秒绘制一下场景。之所以使用requestAnimationFrame方法，而不是setInterval是因为前者更能节省资源（在浏览器页面切换时，会暂停执行）。

    function render() {  
        requestAnimationFrame( render );  
        renderer.render( scene, camera );  
    }  
    render();  
    
## 坐标系，地图的绘制与景观游览 ##
**坐标系**

在WebGL中，坐标系为右手坐标系，右手食指朝上为y轴正方向，中指朝向自己为z轴正方向，此时大拇指朝向为x轴正方向。

**地图绘制**

本次homework根据复旦张江校区部分建筑的分布情况，按比例计算，在坐标系中规划处相应的位置，并加入一些几何形状，模拟出校区的部分景观。

**景观游览**

景观游览通过移动相机位置来实现，通过一定顺序改变相机的position可移动在地图中的位置，通过旋转相机可在一个位置观看周围的立体景观。


项目链接 [https://github.com/hfqin/adwebhw2]
