import * as THREE from '/node_modules/three/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js'


// import { GUI } from '/node_modules/three/examples/jsm/libs/dat.gui.module.js'


// Create Scene, Create Camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4; // Camera Positioned Outside Mesh


// Create a Renderer Calling WebGL method
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Display on DOM
function render() { // Create Render shortcut Method
    renderer.render(scene, camera)
}


// Create Orbital Controls
var controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 2.5, 5); //x y z 
controls.update();

// Create Axis Helper
scene.add(new THREE.AxesHelper(500));






// Create a Rendering Method to render Everything Out To The Scene - Looping every 60 sec.
var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    render();  // renderer.render(scene, camera);




};






// var light = new THREE.DirectionalLight();
// scene.add(light);

// var helper = new THREE.DirectionalLightHelper(light);
// scene.add(helper);






// var loader = new GLTFLoader();
var loader = new GLTFLoader();
loader.load('/public_html/threejs/assets/garen/scene.gltf',
    function (gltf) {
        scene.add(gltf.scene);


    }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
        console.log('An error happened');
    });




animate();






