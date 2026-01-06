import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/OBJLoader.js';

document.addEventListener('DOMContentLoaded', () => {

    const debugEl = document.getElementById('debug');
    function debugLog(msg) {
        console.log(msg);
        if(debugEl){
            debugEl.innerHTML += msg + '<br>';
        }
    }

    debugLog('Three.js DOMContentLoaded');

    const canvas = document.getElementById('three-canvas');
    const sizes = { width: window.innerWidth, height: window.innerHeight };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
    camera.position.set(0,1.5,4);
    scene.add(camera);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5,5,5);
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true, alpha:true});
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.minDistance = 2;
    controls.maxDistance = 6;

    // OBJ loader
    const objLoader = new OBJLoader();
    let ring = null;

    objLoader.load(
        'img/3D/Ring.obj', // relatív útvonal a projektben
        (object) => {
            debugLog('OBJ load SUCCESS!');
            ring = object;
            ring.traverse((child) => {
                if(child.isMesh){
                    child.material = new THREE.MeshStandardMaterial({color:0xffffff, metalness:0.6, roughness:0.25});
                }
            });
            ring.scale.set(1,1,1);
            ring.rotation.x = -Math.PI/2;
            scene.add(ring);
            debugLog('OBJ added to scene');
        },
        (xhr) => {
            let percent = xhr.total ? ((xhr.loaded/xhr.total)*100).toFixed(0) : '?';
            debugLog(`OBJ loading: ${percent}%`);
        },
        (error) => {
            debugLog('OBJ load ERROR: '+error);
        }
    );

    // animate loop
    const clock = new THREE.Clock();
    function animate(){
        requestAnimationFrame(animate);
        if(ring) ring.position.y = Math.sin(clock.elapsedTime)*0.05;
        controls.update();
        renderer.render(scene,camera);
    }
    animate();
    debugLog('Animation loop started');

    // resize
    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width/sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
        debugLog('Window resized');
    });

});