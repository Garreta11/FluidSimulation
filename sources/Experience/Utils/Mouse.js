import * as THREE from 'three';
import Common from '../Common';

class Mouse {
  constructor() {
    this.mouseMoved = false;
    this.coords = new THREE.Vector2();
    this.coords_old = new THREE.Vector2();
    this.diff = new THREE.Vector2();
    this.timer = null;
    this.count = 0;

    this.movementStoppedLogged = false;
  }

  init() {
    document.body.addEventListener(
      'mousemove',
      this.onDocumentMouseMove.bind(this),
      false
    );

    document.body.addEventListener(
      'touchstart',
      this.onDocumentTouchStart.bind(this),
      false
    );

    document.body.addEventListener(
      'touchmove',
      this.onDocumentTouchMove.bind(this),
      false
    );
  }

  setCoords(x, y) {
    if (this.timer) clearTimeout(this.timer);
    this.coords.set((x / Common.width) * 2 - 1, -(y / Common.height) * 2 + 1);
    this.mouseMoved = true;
    this.timer = setTimeout(() => {
      this.mouseMoved = false;
    }, 100);
  }

  onDocumentMouseMove(event) {
    this.setCoords(event.clientX, event.clientY);
  }

  onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
      // event.preventDefault();
      this.setCoords(event.touches[0].pageX, event.touches[0].pageY);
    }
  }
  onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
      // event.preventDefault();

      this.setCoords(event.touches[0].pageX, event.touches[0].pageY);
    }
  }

  update() {
    this.diff.subVectors(this.coords, this.coords_old);
    this.coords_old.copy(this.coords);

    // If there's no change in mouse position, start the timeout
    if (this.diff.x === 0 && this.diff.y === 0) {
      if (!this.movementStoppedTimeout) {
        this.movementStoppedTimeout = setTimeout(() => {
          this.movementStoppedLogged = true;
          this.movementStoppedTimeout = null; // Reset the timeout
        }, 500); // Adjust the duration as needed
      }
    } else {
      this.movementStoppedLogged = false;
      // If there's a change, clear the timeout
      clearTimeout(this.movementStoppedTimeout);
      this.movementStoppedTimeout = null;
    }

    if (this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0);
  }
}

export default new Mouse();
