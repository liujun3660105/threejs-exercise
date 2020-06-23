<template>
  <div id="scene"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
    window.addEventListener('resize',this.onResize)
  },
  methods: {
    init() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const k = width / height;
      const s = 200;
      //Init scene
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x222222);
      //Init camera
      this.camera = new THREE.PerspectiveCamera(25, k, 1, 100);
      this.camera.position.set(8, 4, 0);

      //Init mesh
      let geometry = new THREE.BoxGeometry(1, 1, 1);
      let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      let cube = new THREE.Mesh(geometry, material);
      this.scene.add(cube);

      //Init light
      let ambientLight = new THREE.AmbientLight(0xfafafa, 0.25);
      ambientLight.position.set(200, 90, 40);

      let pointLight1 = new THREE.PointLight(0xfafafa, 0.4);
      pointLight1.position.set(200, 90, 40);

      let pointLight2 = new THREE.PointLight(0xfafafa, 0.4);
      pointLight2.position.set(200, 90, -40);
      this.scene.add(ambientLight, pointLight1, pointLight2);

      //辅助网格线
      let gridHelper = new THREE.GridHelper(
        60,
        160,
        new THREE.Color(0x555555),
        new THREE.Color(0x333333)
      );
      this.scene.add(gridHelper);

      let axesHelper = new THREE.AxesHelper(250);
      this.scene.add(axesHelper);

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(width, height);
      //   this.renderer.render(this.scene,this.camera);
      this.render();
      let container = document.getElementById("scene");

      container.appendChild(this.renderer.domElement);
      let controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.addEventListener("change", this.render);
      //   controls.update();
      //   addEventListener
    },
    render() {
      this.renderer.render(this.scene, this.camera);
    },
    onResize(){
        this.camera.aspect = window.innerWidth/window.innerHeight;
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        // this.renderer.render(this.scene, this.camera);
    },
    animate(){
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>

<style scoped>
</style>