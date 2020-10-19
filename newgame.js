
import * as THREE from '/node_modules/three/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js'


var scene, camera, renderer, controls;




init();



function init() {

    // Create Scene, Create Camera, Create Renderer
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);
    scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);


    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4; // Camera Positioned Outside Mesh


    // Create a Renderer Calling WebGL method
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement); // Display on DOM


    // renderer.render(scene, camera)



    // Create Orbital Controls
    controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 2.5, 5); //x y z 
    controls.update();

    // Create Axis Helper
    // scene.add(new THREE.AxesHelper(500));



    // START LIGHT
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 50, 1000);
    scene.add(hemiLight);

    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(5, 5, -5);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add(dirLight);
    // END LIGHT


    // ground
    var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);




    // model 
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
        }
    );

    // renderer = new THREE.WebGLRenderer({ antialias: true });

    animate();


}


// Create a Rendering Method to render Everything Out To The Scene - Looping every 60 sec.
function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);


};


// import { GUI } from '/node_modules/three/examples/jsm/libs/dat.gui.module.js'

animate();






