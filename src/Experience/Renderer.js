import * as THREE from "three";
import Experience from "./Experience";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.debug = this.experience.debug;

    //Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("colorBackground");
    }

    this.setInstance();
  }

  setInstance() {
    this.debugObject = { background: "#16191e" };
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio * 1.5, 2));
    if (this.debug.active) {
      this.debugFolder.addColor(this.debugObject, "background").onChange(() => {
        this.instance.setClearColor(this.debugFolder.background);
      });
    }
    this.instance.setClearColor(this.debugObject.background);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
