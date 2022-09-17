import Experience from "../Experience";
import Environment from "./Environment";
import Room from "./Room";
import * as THREE from "three";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      //setup
      this.room = new Room();
      // this.environment = new Environment();
    });
  }

  update() {}
}
