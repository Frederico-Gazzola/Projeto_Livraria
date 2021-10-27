import * as THREE from './three.js'
import { OrbitControls } from './OrbitControls.js'
import { GLTFLoader } from './GLTFLoader.js';

const scene = new THREE.Scene()

const light = new THREE.PointLight()
light.position.set(0.8, 1.4, 1.0)
scene.add(light)

const clock = new THREE.Clock();
const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: document.querySelector("canvas")
})
renderer.setClearColor( 0x000000, 0 );

const camera = new THREE.PerspectiveCamera(
    70,
    2,
    1,
    1000
)
camera.position.set(0, 0, 0)
camera.lookAt(0,0,0)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 0, 0)
controls.maxPolarAngle = Math.PI / 2.1
controls.minPolarAngle = Math.PI / 3
controls.minAzimuthAngle  = -Math.PI * 6.1
controls.maxAzimuthAngle = Math.PI * 6.1
controls.minDistance = 40
controls.maxDistance = 100

var loader = new GLTFLoader();
let mixer: THREE.AnimationMixer
loader.load( 'public/dist/models/scene.gltf', function ( gltf ) {
    mixer = new THREE.AnimationMixer(gltf.scene)
	mixer.clipAction((gltf as any).animations[0]).play()
	scene.add( gltf.scene );
});

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
  
    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  
      // update any render target sizes here
    }
}

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    resizeCanvasToDisplaySize();
    render()
}

function animate() {
    resizeCanvasToDisplaySize();
    requestAnimationFrame(animate)
    if (mixer) {
        mixer.update(clock.getDelta())  
    }
    controls.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()