import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'


const gui  = new GUI()
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')
const loadingManager = new THREE.LoadingManager()
loadingManager.onLoad = () =>{
    console.log('Everything finished loading.')
}
loadingManager.onProgress = (item,loaded,total) =>{
    console.log(`Loading ${item}, ${loaded} of ${total} files complete`);
}
loadingManager.onError = (url) =>{
    console.log( `There was an error loading ${url}` )
}
const textureLoader = new THREE.TextureLoader(loadingManager)
const paths = ["/textures/door/alpha.jpg","/textures/door/ambientOcclusion.jpg","/textures/door/color.jpg","/textures/door/height.jpg","/textures/door/metalness.jpg","/textures/door/normal.jpg","/textures/door/roughness.jpg","/textures/matcaps/1.png","/textures/matcaps/3.png","/textures/matcaps/8.png","/textures/gradients/5.jpg"]
const textures = []

paths.forEach((path)=>{
    const texture = textureLoader.load(path)
    textures.push(texture)
})

const door  = textures[9]
door.colorSpace = THREE.SRGBColorSpace



//const axeshelper = new THREE.AxesHelper(10)
const geometry = new THREE.TorusGeometry(4, 1, 8, 40 )
// const material = new THREE.MeshBasicMaterial()
// material.map = textures[2]
//material.color = new THREE.Color(0xafff14)
//material.opacity= 0.5
//material.transparent = true
//material.alphaMap = textures[0]
//material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true
// material.wireframe = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = textures[9]

//const  material = new THREE.MeshDepthMaterial()

//const material =new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()
// const texture1 = textures[10]
// texture1.magFilter = THREE.NearestFilter
// texture1.minFilter = THREE.NearestFilter
// texture1.generateMipmaps = false
// material.gradientMap = texture1

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.7
// material.roughness = 0.2
// material.map = textures[2]
// material.aoMap = textures[1]
// material.aoMapIntensity = 1
//material.displacementMap = textures[3]
//material.displacementScale = 0.1
//material.metalnessMap = textures[4]
//material.roughnessMap = textures[6]
//material.normalMap = textures[5]
//material.normalScale.set(1,1)
//material.transparent = true
//material.alphaMap = textures[0]

const material = new THREE.MeshPhysicalMaterial()
// material.metalness = 0.7
// material.roughness = 0.2
material.map = textures[2]
// material.aoMap = textures[1]
// material.aoMapIntensity = 1
// material.displacementMap = textures[3]
// material.displacementScale = 0.1
//material.metalnessMap = textures[4]
//material.roughnessMap = textures[6]
// material.normalMap = textures[5]
// material.normalScale.set(1,1)
//material.transparent = true
//material.alphaMap = textures[0]
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1,1,1)
// gui.add(material,"sheen").min(0).max(1).step(.0001);
// gui.add(material,"sheenRoughness").min(0).max(1).step(.0001);
// gui.addColor(material,"sheenColor")
// gui.add(material,"clearcoat").min(0).max(1).step(0.0001);
// gui.add(material,"clearcoatRoughness").min(0).max(1).step(0.0001);

// material.iridescence = 1
// material.iridescenceIOR =1
//material.iridescenceThicknessRange = [100,1000]
// gui.add(material,"metalness").min(0).max(1).step(0.0001)
// gui.add(material,"roughness").min(0).max(1).step(0.0001)

// gui.add(material,"iridescence").min(0).max(1).step(0.0001)
// gui.add(material,"iridescenceIOR").min(1).max(2.333).step(0.0001)

// gui.add(material.iridescenceThicknessRange, "0").min(1).max(1000).step(0.0001)
// gui.add(material.iridescenceThicknessRange, "1").min(1).max(1000).step(0.0001)

material.transmission = 1.5
material.ior = 1.55
material.thickness =0.5

gui.add(material,"transmission").min(0).max(2).step(0.0001)
gui.add(material,"ior").min(0).max(2.333).step(0.0001)
gui.add(material,"thickness").min(0).max(1).step(0.0001)


const mesh   = new THREE.Mesh(geometry,material)


mesh.position.x = 15

    

const geometry1 = new THREE.BoxGeometry(3,3,3)
//const material1= new THREE.MeshBasicMaterial({ map:door})
const mesh1  = new THREE.Mesh(geometry1,material)
let mesh3
mesh1.position.x = -8
// Scene
const scene = new THREE.Scene()
scene.add(mesh)
scene.add(mesh1)

const rgbLoader =  new RGBELoader()
rgbLoader.load('./textures/environmentMap/4k.hdr',(emap)=>{
    emap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = emap
    scene.environment   = emap
})



// const ambientLight = new THREE.AmbientLight (0xffffff, 1);
// scene.add(ambientLight)
// const pointLight = new THREE.PointLight(0xffffff,30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

//scene.add(axeshelper)
const loader = new FontLoader();

loader.load('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json', function (font) {
    // Create TextGeometry
    const geometry3 = new TextGeometry('Minhaj', {
        font: font,
        size: 2,
        height: 1,
        curveSegments: 40,
        
    });

    // Create a material
    //const material3 = new THREE.MeshBasicMaterial({ color: 0x09ffe2 });

    // Create a mesh
    mesh3 = new THREE.Mesh(geometry3, material);
    
    // Add the mesh to the scene
    scene.add(mesh3);

    // Render the scene
    renderer.render(scene, camera);
});

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
camera.position.z = 2
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

    mesh.rotation.y = 0.1 * elapsedTime
    mesh1.rotation.y =0.1* elapsedTime
    

    mesh.rotation.x = -0.15 * elapsedTime
    mesh1.rotation.x =-0.15* elapsedTime
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()