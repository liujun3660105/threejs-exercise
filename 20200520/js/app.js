let camera, renderer, cube, scene;

function initCubeObject(){
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const texture = new THREE.TextureLoader().load('pic/1.jpg');
    // const material = new THREE.MeshBasicMaterial({map:texture });

    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

function initObject() {
    const geometry = new THREE.CylinderGeometry(50,50,200,320);
    const material = new THREE.MeshLambertMaterial({color:0xFFFFFF});
    const mesh = new THREE.Mesh(geometry,material);
    mesh.position = new THREE.Vector3(0,0,0);
    scene.add(mesh);
}


function initLineObject(){
    const geometry = new THREE.Geometry();
    const material = new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});
    const startColor = new THREE.Color(0x444444);
    const endColor = new THREE.Color(0xFF0000);
    //线的材质可以由两点的颜色决定

    const startPoint = new THREE.Vector3(-500, 0, 0);
    const endPoint = new THREE.Vector3(500, 0, 0);
    geometry.vertices.push(startPoint);
    geometry.vertices.push(endPoint);
    // geometry.colors.push(startColor,endColor);LineBasicMaterial
    for(var i=0;i<=20;i++){
        var line = new THREE.Line(geometry,new THREE.LineBasicMaterial({
            color:0x000000,
            opacity:0.2
        }));
        line.position.z = (i*50)-500;
        scene.add(line);
        var line = new THREE.Line(geometry,new THREE.LineBasicMaterial({
            color:0x000000,
            opacity:0.2
        }));
        line.position.x = (i*50)-500;
        line.rotation.y = 90*Math.PI/180;
        scene.add(line);
    }


    // const line = new THREE.Line( geometry, material, THREE.LineSegments );
    // scene.add(line);

}


function initLight() {
    const light = new THREE.DirectionalLight(0xFF0000, 1, 0);
    light.position.set(0, 0, 100);
    scene.add(light);
    // let light = new THREE.AmbientLight(0xFF0000);
    // light.position.set(100,100,200);
    // scene.add(light);
    // light = new THREE.PointLight(0x00FF00);
    // light.position.set(0,0,300);
    // scene.add(light);
}
function init() {
    scene = new THREE.Scene();//创建场景
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);

    //正投影
    // var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
    // 将浏览器窗口的宽度和高度作为了视景体的高度和宽度，相机正好在窗口的中心点上。这也是我们一般的设置方法，基本上为了方便，我们不会设置其他的值。 

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth,window.innerHeight);//设置render大小
    renderer.setClearColor(0xD1EEEE, 1.0);//设置背景颜色
    
    document.body.appendChild(renderer.domElement);


    // camera.position.z = 1;


    camera.position.x = 100;
    camera.position.y = 100;
    camera.position.z = 500;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 10;
    camera.lookAt({
        x : 100,
        y : 20,
        z : 200
    });
}


function animate() {
    // requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.clear();
    renderer.render(scene, camera);
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.render(scene, camera);
}
window.addEventListener('resize', onWindowResize, false);

init();
initLight();
// initCubeObject();
// initLineObject();
initObject()

animate();