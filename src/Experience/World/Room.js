import * as THREE from "three";
import Experience from "../Experience.js";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("modelPosition");
    }
    //setup
    this.firstResource = this.resources.items.firstModel;
    this.secondResource = this.resources.items.secondModel;
    this.firstBakedTexture = this.resources.items.firstTexture;
    this.secondBakedTexture = this.resources.items.secondTexture;
    this.firstBakedTexture.flipY = false;
    this.secondBakedTexture.flipY = false;
    this.setMaterial();
    this.setModel();
    console.log(this.secondBakedMaterial);
  }
  setMaterial() {
    this.firstBakedMaterial = new THREE.MeshBasicMaterial({
      map: this.firstBakedTexture,
    });
    this.secondBakedMaterial = new THREE.MeshBasicMaterial({
      map: this.secondBakedTexture,
    });
    this.lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffdb });
    this.coffeeMaterial = new THREE.MeshBasicMaterial({ color: 0x371d08 });
    this.panelMaterial = new THREE.MeshBasicMaterial({ color: 0xffc28f });
  }
  setModel() {
    this.firstModel = this.firstResource.scene;
    this.firstModel.traverse((child) => {
      child.material = this.firstBakedMaterial;
    });

    this.secondModel = this.secondResource.scene;
    this.secondModel.traverse((child) => {
      child.material = this.secondBakedMaterial;
    });

    const coffee = this.secondModel.children.find(
      (child) => child.name === "coffee"
    );
    coffee.material = this.coffeeMaterial;

    const windowGlass = this.secondModel.children.find(
      (child) => child.name === "windowglass"
    );
    windowGlass.material = this.lightMaterial;

    const lightBulbs = this.secondModel.children.find(
      (child) => child.name === "Light"
    );
    lightBulbs.material = this.lightMaterial;
    const panel = this.secondModel.children.find(
      (child) => child.name === "Panel"
    );
    panel.material = this.lightMaterial;
    if (this.debug.active) {
      this.debugFolder
        .add(this.secondModel.position, "x")
        .name("modelX")
        .min(-10)
        .max(10)
        .step(0.001);
      this.debugFolder
        .add(this.secondModel.position, "y")
        .name("modelY")
        .min(-10)
        .max(10)
        .step(0.001);
      this.debugFolder
        .add(this.secondModel.position, "z")
        .name("modelZ")
        .min(-10)
        .max(10)
        .step(0.001);
    }

    this.firstModel.position.y = -2;
    this.secondModel.position.y = -2;
    this.firstModel.position.x = 1;
    this.secondModel.position.x = 1;
    this.scene.add(this.firstModel, this.secondModel);
  }
}
