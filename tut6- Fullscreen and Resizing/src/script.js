// import * as THREE from 'three';
// import { FontLoader } from 'three/addons/loaders/FontLoader.js';
// import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// // Create a scene
// const scene = new THREE.Scene();

// // Create a camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 300;

// // Create a renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Use the default Helvetiker font
// const loader = new FontLoader();

// // Load the default font
// loader.load('https://threejsfundamentals.org/threejs/resources/threejs/r125/fonts/helvetiker_regular.typeface.json', function (font) {

//     // Create TextGeometry using the loaded font
//     const geometry = new TextGeometry('Hello three.js!', {
//         font: font,
//         size: 80,
//         height: 5,
//         curveSegments: 12,
//         bevelEnabled: true,
//         bevelThickness: 10,
//         bevelSize: 8,
//         bevelOffset: 0,
//         bevelSegments: 5
//     });

//     // Create a material
//     const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color

//     // Create a mesh using the geometry and material
//     const textMesh = new THREE.Mesh(geometry, material);

//     // Add the text mesh to the scene
//     scene.add(textMesh);

//     // Render the scene
//     function animate() {
//         requestAnimationFrame(animate);
//         renderer.render(scene, camera);
//     }

//     animate();
// });





import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const canvas = document.querySelector('.webgl')
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Create a renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Load the font
const loader = new FontLoader();
loader.load('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json', function (font) {
    // Create TextGeometry
    const geometry = new TextGeometry('Aziz', {
        font: font,
        size: 2,
        height: 1,
        curveSegments: 40,
        
    });

    // Create a material
    const material = new THREE.MeshBasicMaterial({ color: 0x09ffe2 });

    // Create a mesh
    const mesh = new THREE.Mesh(geometry, material);

    // Add the mesh to the scene
    scene.add(mesh);

    // Render the scene
    renderer.render(scene, camera);
});

// Resize event listener
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);

    // Render the scene again on resize
    renderer.render(scene, camera);
});

// Fullscreen event listener
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        renderer.domElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
