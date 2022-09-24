import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;
    this.setFog();
  }
  setFog() {
    const fog = new THREE.Fog("#16191e", 1, 5);
    this.scene.fog = fog;
  }
}
