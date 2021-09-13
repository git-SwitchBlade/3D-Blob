let width, 
    height, 
    scene, 
    camera, 
    renderer, 
    geometry, 
    material, 
    icosahedron, 
    ambientLight,
    lights;

width = window.innerWidth;
height = window.innerHeight;

function init(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1f1f1f);

  camera = new THREE.PerspectiveCamera(35, width / height, 1, 1000);
  camera.position.set(0, 0, 8);
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor('#1e272e', 1.0);
  renderer.setSize(width, height);

  // Geometry
  var sphere_geometry = new THREE.SphereGeometry(1, 128, 128);
  var material = new THREE.MeshNormalMaterial();

  var sphere = new THREE.Mesh(sphere_geometry, material);
  scene.add(sphere);

  // Lights
  ambientLight = new THREE.HemisphereLight(0x111111, 0x000000, 5);
  lights = new THREE.PointLight(0xf00555, 1.5);
  lights.position.set(0, 0, 3);
  lights.castShadow = true;
  scene.add(ambientLight);
  scene.add(lights);

  // Updating
  const update = () => {
    const time = performance.now() * 0.001;
    //console.log(time);

    var k = 1.5;
    for (var i = 0; i < sphere.geometry.vertices.length; i++) {
        var p = sphere.geometry.vertices[i];
        p.normalize().multiplyScalar(0.75 + 0.2 * noise.perlin3(p.x * k + time, p.y * k, p.z * k));
    }
    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true;
  sphere.geometry.verticesNeedUpdate = true;    
  };

  // Window Resizing
  window.onresize = function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    var aspectRatio = window.innerWidth / window.innerHeight;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
  };

  // Rendering
  const render = function() {
    renderer.render(scene, camera);
    // sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.001;
    update();
    requestAnimationFrame(render);
  };
  render();
  document.body.appendChild(renderer.domElement);
}

window.onload = init();
