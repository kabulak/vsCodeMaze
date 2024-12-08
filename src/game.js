// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const starsCount = 5000;
const starGeometry = new THREE.BufferGeometry();
const starPositions = new Float32Array(starsCount * 3);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add an OrbitControls (for interactivity)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

// Resize the renderer on window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Create a Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}

animate();
for (let i = 0; i < starsCount; i++) {
    starPositions[i * 3] = Math.random() * 200 - 100;  // X
    starPositions[i * 3 + 1] = Math.random() * 200 - 100;  // Y
    starPositions[i * 3 + 2] = Math.random() * 200 - 100;  // Z
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

// Define the material for the stars
const starMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.5,  // size of stars
    transparent: true,
    opacity: 0.7
});

// Create the stars using Points object
const stars = new THREE.Points(starGeometry, starMaterial);

// Add stars to the scene
scene.add(stars);


// Raycaster and Mouse Vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        // Change the color of the first intersected object
        intersects[0].object.material.color.set(Math.random() * 0xffffff);
    }
});

