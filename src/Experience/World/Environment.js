import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    //Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("environment");
    }

    this.setFog();
  }
  setFog() {
    const fog = new THREE.Fog("#898376", 1, 1);
    this.scene.fog = fog;
  }
}
