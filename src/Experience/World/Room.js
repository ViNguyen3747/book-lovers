import * as THREE from "three";
import Experience from "../Experience.js";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    //setup
    this.firstResource = this.resources.items.roomModel;
    this.firstBakedTexture = this.resources.items.roomTexture;
    this.firstBakedTexture.encoding = THREE.LinearEncoding;
    this.firstBakedTexture.magFilter = THREE.LinearFilter;
    this.firstBakedTexture.minFilter = THREE.LinearFilter;
    this.firstBakedTexture.flipY = false;

    this.groundResource = this.resources.items.groundModel;
    this.groundTexture = this.resources.items.groundTexture;
    this.groundTexture.encoding = THREE.LinearEncoding;
    this.groundTexture.magFilter = THREE.LinearFilter;
    this.groundTexture.minFilter = THREE.LinearFilter;
    this.groundTexture.flipY = false;

    this.setMaterial();
    this.setModel();
  }
  setMaterial() {
    this.firstBakedMaterial = new THREE.MeshBasicMaterial({
      map: this.firstBakedTexture,
    });
    this.groundMaterial = new THREE.MeshBasicMaterial({
      map: this.groundTexture,
    });

    this.textMaterial = new THREE.MeshBasicMaterial({ color: 0xaf7450 });
  }
  setModel() {
    //First Group
    this.firstModel = this.firstResource.scene;
    this.firstModel.traverse((child) => {
      if (child.name === "Text") child.material = this.textMaterial;
      else child.material = this.firstBakedMaterial;
    });
    this.firstModel.position.y = -2;
    //Ground
    this.groundModel = this.groundResource.scene;
    this.groundModel.traverse((child) => {
      child.material = this.groundMaterial;
    });
    this.groundModel.position.y = -2;

    this.scene.add(this.firstModel, this.groundModel);
  }
}
