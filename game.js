// --- Scene setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- Ground ---
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100,100),
  new THREE.MeshStandardMaterial({color:0x228B22})
);
ground.rotation.x = -Math.PI/2;
scene.add(ground);

// --- Cube for reference ---
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({color:0xff0000})
);
cube.position.y = 1;
scene.add(cube);

// --- Lights ---
scene.add(new THREE.AmbientLight(0xffffff,0.5));
const dirLight = new THREE.DirectionalLight(0xffffff,1);
dirLight.position.set(5,10,7.5);
scene.add(dirLight);

// --- Controls ---
const controls = new THREE.PointerLockControls(camera, renderer.domElement);
const instructions = document.getElementById('instructions');
instructions.addEventListener('click', ()=>controls.lock());
controls.addEventListener('lock', ()=>instructions.style.display='none');
controls.addEventListener('unlock', ()=>instructions.style.display='');

// --- Movement ---
const move = {forward:false,backward:false,left:false,right:false};
const velocity = new THREE.Vector3();
const speed = 0.1;

document.addEventListener('keydown', e=>{
  if(e.code==='KeyW') move.forward=true;
  if(e.code==='KeyS') move.backward=true;
  if(e.code==='KeyA') move.left=true;
  if(e.code==='KeyD') move.right=true;
});
document.addEventListener('keyup', e=>{
  if(e.code==='KeyW') move.forward=false;
  if(e.code==='KeyS') move.backward=false;
  if(e.code==='KeyA') move.left=false;
  if(e.code==='KeyD') move.right=false;
});

// --- Animate loop ---
function animate(){
  requestAnimationFrame(animate);

  velocity.set(0,0,0);
  if(move.forward) velocity.z -= speed;
  if(move.backward) velocity.z += speed;
  if(move.left) velocity.x -= speed;
  if(move.right) velocity.x += speed;

  controls.moveRight(velocity.x);
  controls.moveForward(velocity.z);

  renderer.render(scene,camera);
}
animate();

// --- Handle window resize ---
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

