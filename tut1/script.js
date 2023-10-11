const scene = new THREE.Scene()
const element = document.querySelector(".webgl")
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color:0xff0000})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh) 

const sizes  = {
    width:800,
    height:600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2
scene.add(camera)
console.log(element)
const renderer = new THREE.WebGLRenderer({
    canvas:element
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
