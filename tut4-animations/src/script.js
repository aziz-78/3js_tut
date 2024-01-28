import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.SphereGeometry(0.5,32,16)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
mesh.position.x= 0
mesh.position.y = 0
// Sizes
const sizes = {
    width: 1500,
    height: 800
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
//let time  = Date.now()

// const animate = () => {
//     requestAnimationFrame(animate);
//     // const current  =Date.now()
//     // const delta = current - time
//     // time= current
//     // console.log(delta)
//     // Move the mesh up and down
//     // Rotate the cube
//     mesh.rotation.x += 0.01;
//     mesh.rotation.y += 0.01;

//     // Move the cube up and down
//     mesh.position.y =  1 * Math.sin(Date.now() * 0.001);
//     // Move the mesh forward
//     mesh.position.x += 0.01;

    

//     // Render the scene
//     renderer.render(scene, camera);
//   };

//   // Handle window resize
//   window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//   });


  // Start the animation

  const time = new THREE.Clock()
  const animate =()=>{
    
      const elspsedtime = time.getElapsedTime()
      mesh.position.y = Math.sin(elspsedtime)
      mesh.position.x = Math.cos(elspsedtime)
      renderer.render(scene,camera)
      requestAnimationFrame(animate)
  }
  animate();