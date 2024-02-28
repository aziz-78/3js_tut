import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// how textures work behind the scenes

// const image = new Image()
// const texture = new THREE.Texture(image)
// texture.colorSpace = THREE.SRGBColorSpace
// image.onload = ()=>{
//     texture.needsUpdate = true

// }
// image.src='./image.jpg'
// console.log(image.src)
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart= () =>{
    console.log("on start")
}
loadingManager.onLoad= () =>{
    console.log('All textures loaded!');
}
loadingManager.onProgress=(item, loaded, total)=>{
    console.log(`Loading ${item}, ${loaded} of ${total} files complete`);
}
loadingManager.onError=(url)=> {
    console.error(`Error loading texture: ${url}`);
}
const textureLoader = new THREE.TextureLoader(loadingManager)
//const img3 = textureLoader.load("textures/checkerboard-1024x1024.png") //generates anomaly like moire patterns
const img3 = textureLoader.load("./img3.jpg")
const paths=['./img2.png','image.jpg','/textures/door/alpha.jpg','/textures/door/ambientOcclusion.jpg','/textures/door/color.jpg','/textures/door/height.jpg','/textures/door/metalness.jpg','/textures/door/normal.jpg','/textures/door/roughness.jpg']
const textures = []
paths.forEach((path) => {
    const texture = textureLoader.load(path);
    textures.push(texture);
  });
const canvas = document.querySelector('canvas.webgl')
// img3.repeat.x = 2
// img3.repeat.y = 3

// img3.wrapS = THREE.RepeatWrapping
// img3.wrapT = THREE.RepeatWrapping

// img3.offset.x=1
// img3.offset.y =0.7

img3.center.x=0.5
img3.center.y=0.5
 img3.rotation = Math.PI 
img3.generateMipmaps = false
img3.minFilter = THREE.NearestFilter
img3.magFilter = THREE.NearestFilter //when using nearestfilter with minfilter we do not need  mipmapping so disable them
// Scene
const scene = new THREE.Scene()

//when preparing textures take care of 3 things
//1)weight
//2)size
//3)data

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshBasicMaterial({ map:img3 })
// let i = 0
// setInterval(()=>{
//     material.map = textures[i]
//     i++
// },2000)
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
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