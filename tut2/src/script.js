import * as THREE from 'three'
// script.js
const scene = new THREE.Scene();//creates scene , which is where all are elements are rendered
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);// sets the vertical view,aspect_ratio,near-clipping,far clipping

const canvas = document.querySelector("#webgl")// gets the canvas element from index.html
const renderer = new THREE.WebGLRenderer({canvas: canvas}); //creating the render and specifying it to render in canvas we got from html
renderer.setSize(window.innerWidth, window.innerHeight);//sets the render size


const geometry = new THREE.BoxGeometry(2,2,2); //specifies the material shape and size
//const texture = new THREE.TextureLoader().load('images.png');
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 ,wireframe:true });     //wireframe
//const material = new THREE.MeshBasicMaterial({ color: 0x0000ff ,map:texture }); //image on all sides of box
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 10;

const animate = () => {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    

    renderer.render(scene, camera);
};

animate();
