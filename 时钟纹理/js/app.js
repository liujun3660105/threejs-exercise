let camera, renderer, cube, scene;
function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 50;
    camera.position.y = 0;
    camera.position.x = 50;
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setClearColor(0xD1EEEE, 1.0);
    document.body.appendChild(renderer.domElement);

}
function animate(){
    // requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // cube.rotation.z += 0.01;
    renderer.render(scene, camera);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.render(scene, camera);
}
window.addEventListener('resize',onWindowResize,false);

function initObject(){
    // const geometry = new THREE.PlaneGeometry(300,300,1,1);
    const geometry = new THREE.BoxGeometry(200, 200, 200);

    // geometry.vertices[0].uv = new THREE.Vector2(0,0);
    // geometry.vertices[1].uv = new THREE.Vector2(2,0);
    // geometry.vertices[2].uv = new THREE.Vector2(2,2);
    // geometry.vertices[3].uv = new THREE.Vector2(0,2);
    // const texture = THREE.ImageUtils.loadTexture("./assets/crate.gif",null,function(texture){
    //     console.log(texture);
    // });
    const texture = new THREE.TextureLoader().load('assets/crate.gif');


    // const metrial = new THREE.MeshBasicMaterial({color:0x0000FF,side: THREE.DoubleSide});
    const matrial = new THREE.MeshBasicMaterial({map:texture});
    // , side:THREE.DoubleSide
    cube = new THREE.Mesh(geometry,matrial);
    new THREE.GLTFLoader().load('model/metro.glb',function(gltf){
        console.log(gltf);
        scene.add(gltf.scene);
        renderer.render(scene, camera);
    });
    // loader.load(`
    //   './metro.glb',
    //   function(gltf) {
    //     this.scene.add(gltf.scene);
    //   }.bind(this)
    // );
    // scene.add(cube);
    // scene.add(GLTFObj);
}
function initLight(){
              // create two three.js lights to illuminate the model
          //创建两个Three.js方向光照亮模型
          var directionalLight = new THREE.DirectionalLight(0xffffff,1);
          directionalLight.position.set(170, 270, 400).normalize();
          scene.add(directionalLight);

          var directionalLight2 = new THREE.DirectionalLight(0xffffff,1);
          directionalLight2.position.set(-170, 150, 100).normalize();
          scene.add(directionalLight2);
          
          var ambient = new THREE.AmbientLight(0x444444);
          scene.add(ambient);//环境光对象添加到scene场景中
          
          var point = new THREE.PointLight(0xffffff);
          //设置点光源位置  光源对象和模型对象的position属性一样是Vector3对象
          //PointLight的基类是Light  Light的基类是Object3D  点光源对象继承Object3D对象的位置属性position
          point.position.set(-100, 120, 30);
    // var lights = [];
    // lights[ 0 ] = new PointLight( 0xffffff, 1, 0 );
    // lights[ 1 ] = new PointLight( 0xffffff, 1, 0 );
    // lights[ 2 ] = new PointLight( 0xffffff, 1, 0 );

    // lights[ 0 ].position.set( 0, 200, 0 );
    // lights[ 1 ].position.set( 100, 200, 100 );
    // lights[ 2 ].position.set( - 100, - 200, - 100 );

    // scene.add( lights[ 0 ] );
    // scene.add( lights[ 1 ] );
    // scene.add( lights[ 2 ] );
}
init();
initObject();
initLight();
animate();
