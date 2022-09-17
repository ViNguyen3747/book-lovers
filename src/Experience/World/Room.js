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
      this.coffeeDebug = this.debug.ui.addFolder("coffee");
    }

    //setup
    this.firstResource = this.resources.items.firstModel;
    this.firstBakedTexture = this.resources.items.firstTexture;
    this.firstBakedTexture.encoding = THREE.sRGBEncoding;
    this.firstBakedTexture.flipY = false;

    this.secondResource = this.resources.items.secondModel;
    this.secondBakedTexture = this.resources.items.secondTexture;
    this.secondBakedTexture.encoding = THREE.sRGBEncoding;
    this.secondBakedTexture.flipY = false;

    this.groundResource = this.resources.items.groundModel;
    this.groundTexture = this.resources.items.groundTexture;
    this.groundTexture.encoding = THREE.sRGBEncoding;
    this.groundTexture.flipY = false;

    this.setMaterial();
    this.setModel();
  }
  setMaterial() {
    this.debugObject = { coffee: "#090501" };
    this.firstBakedMaterial = new THREE.MeshBasicMaterial({
      map: this.firstBakedTexture,
    });
    this.secondBakedMaterial = new THREE.MeshBasicMaterial({
      map: this.secondBakedTexture,
    });
    this.groundMaterial = new THREE.MeshBasicMaterial({
      map: this.groundTexture,
    });
    this.lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffdb });
    this.coffeeMaterial = new THREE.MeshBasicMaterial({
      color: this.debugObject.coffee,
    });
    console.log(this.coffeeMaterial);
    this.panelMaterial = new THREE.MeshBasicMaterial({ color: 0xffc28f });
  }
  setModel() {
    //First Group
    this.firstModel = this.firstResource.scene;
    this.firstModel.traverse((child) => {
      child.material = this.firstBakedMaterial;
    });
    this.firstModel.position.x = 1;
    this.firstModel.position.y = -2;

    //Second Group
    this.secondModel = this.secondResource.scene;
    this.secondModel.traverse((child) => {
      child.material = this.secondBakedMaterial;
    });
    this.secondModel.position.x = 1;
    this.secondModel.position.y = -2;

    //Ground
    this.groundModel = this.groundResource.scene;
    this.groundModel.traverse((child) => {
      child.material = this.groundMaterial;
    });
    this.groundModel.position.x = 1;
    this.groundModel.position.y = -2;

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

    this.setDebug();

    this.scene.add(this.firstModel, this.secondModel, this.groundModel);
  }

  setDebug() {
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
      this.coffeeDebug.addColor(this.debugObject, "coffee").onChange(() => {
        this.coffeeMaterial.color.set(this.debugObject.coffee);
      });
    }
  }
}
