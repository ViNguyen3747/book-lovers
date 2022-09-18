import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import EventEmitter from "./EventEmitter";
import Overlay from "./Overlay";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;

    //Setup
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.overlay = new Overlay();

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    // Draco loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("draco/");

    this.loaders.gltfLoader = new GLTFLoader(this.overlay.loadingManager);
    this.loaders.gltfLoader.setDRACOLoader(dracoLoader);
    this.loaders.textureLoader = new THREE.TextureLoader(
      this.overlay.loadingManager
    );
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      switch (source.type) {
        case "gltfModel":
          this.loaders.gltfLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;
        case "texture":
          this.loaders.textureLoader.load(source.path, (file) => {
            this.sourceLoaded(source, file);
          });
          break;
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
