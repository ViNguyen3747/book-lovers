import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import Experience from "./Experience";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("camera");
    }
    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );

    this.instance.position.set(7, 5, 10);
    this.scene.add(this.instance);
    if (this.debug.active) {
      this.debugFolder
        .add(this.instance.position, "x")
        .name("cameraX")
        .min(-10)
        .max(20)
        .step(0.001);
      this.debugFolder
        .add(this.instance.position, "y")
        .name("cameraY")
        .min(-10)
        .max(20)
        .step(0.001);
      this.debugFolder
        .add(this.instance.position, "z")
        .name("cameraX")
        .min(-10)
        .max(20)
        .step(0.001);
    }
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.minDistance = 7;
    this.controls.maxDistance = 10;
    this.controls.enableDamping = true;
    this.controls.maxPolarAngle = 1.5;
    if (this.debug.active) {
      this.debugFolder
        .add(this.controls, "maxPolarAngle")
        .name("cameraAngle")
        .min(-10)
        .max(10)
        .step(0.001);
    }
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
