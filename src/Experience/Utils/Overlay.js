import * as THREE from "three";
import Experience from "../Experience";
import OverlayVertexShader from "../Shaders/Overlay/vertex.glsl";
import OverlayFragmentShader from "../Shaders/Overlay/fragment.glsl";
import { gsap } from "gsap";

export default class Overlay {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.loadingBarElement = document.querySelector(".progressing");
    this.loadingContainer = document.querySelector(".container");
    this.setOverlay();

    this.loadingManager = new THREE.LoadingManager(
      // Loaded
      () => {
        gsap.delayedCall(0.5, () => {
          gsap.to(this.overlayMaterial.uniforms.uAlpha, {
            duration: 3,
            value: 0,
            delay: 1,
          });
          // this.loadingContainer.style.opacity = 0;
        });
      },

      // Progress
      (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = (itemsLoaded / itemsTotal) * 100;
        this.loadingBarElement.style.width = `${progressRatio}%`;
      }
    );
  }

  setOverlay() {
    const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
    this.overlayMaterial = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: OverlayVertexShader,
      fragmentShader: OverlayFragmentShader,
      uniforms: {
        uAlpha: { value: 1 },
      },
    });
    const overlay = new THREE.Mesh(overlayGeometry, this.overlayMaterial);
    this.scene.add(overlay);
  }
}
