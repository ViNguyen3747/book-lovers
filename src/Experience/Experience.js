import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources";
import sources from "./sources";
import Debug from "./Utils/Debug";

let instance = null;

export default class Experience {
  constructor(canvas) {
    //Singleton ==> not creating new experience for the following times, only returns the first instance
    if (instance) {
      return instance;
    }
    instance = this;

    //global access
    window.experience = this;

    //Options
    this.canvas = canvas;

    //Setup
    this.debug = new Debug(); //add #debug in url for debugging tools
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    //Size Resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    //Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  //good for cases when the object going out the sight of the scene
  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    // Traverse the whole scene to dispose everything in the scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();

        // Loop through the material properties
        for (const key in child.material) {
          const value = child.material[key];

          // Test if there is a dispose function
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    //dispose the orbitcontrols of camera
    this.camera.controls.dispose();

    //dispsoe WEbGLRenderer
    this.renderer.instance.dispose();

    //dispose the debug
    if (this.debug.active) this.debug.ui.destroy();
  }
}
