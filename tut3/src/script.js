import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

mesh.position.set(0.7,-0.6,1)

const group = new THREE.Group()
scene.add(group)
group.scale.y = 2
group.position.y = -1
group.rotation.x= Math.PI*0.25

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:"blue"})
)


group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0x00ff00})
)

cube2.position.x=2
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)

cube3.position.x=-2
group.add(cube3)



 mesh.rotation.y = Math.PI * 0.25
 mesh.rotation.x = Math.PI * 0.25
 mesh.rotation.reorder("YXZ")
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)
mesh.scale.set(2,0.5,0.5)



/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 4
 

scene.add(camera)

console.log(mesh.position.distanceTo(camera.position))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)