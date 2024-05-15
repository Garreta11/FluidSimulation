import Common from './Common';
import Mouse from './Utils/Mouse';
import * as THREE from 'three';
import Simulation from './Simulation';

import face_vert from './shaders/face.vert';
import color_frag from './shaders/color.frag';

export default class Output {
  constructor() {
    this.init();
    this.mouse = Mouse;
  }

  init() {
    this.simulation = new Simulation();

    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();

    this.paletteColors = [
      new THREE.Color(0xdc026d), // Pink
      new THREE.Color(0x42bed7), // Light Blue
      new THREE.Color(0xf88f34), // Orange
      new THREE.Color(0x0600b5), // Dark Blue
      new THREE.Color(0x7a0497), //Purple
    ];

    console.log(this.paletteColors);

    this.output = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.RawShaderMaterial({
        vertexShader: face_vert,
        fragmentShader: color_frag,
        uniforms: {
          velocity: {
            value: this.simulation.fbos.vel_0.texture,
          },
          boundarySpace: {
            value: new THREE.Vector2(),
          },
          uColor0: {
            value: this.paletteColors[0],
          },
          uColor1: {
            value: this.paletteColors[1],
          },
          uColor2: {
            value: this.paletteColors[2],
          },
          uColor3: {
            value: this.paletteColors[3],
          },
          uColor4: {
            value: this.paletteColors[4],
          },
        },
      })
    );

    this.scene.add(this.output);
  }

  resize() {
    this.simulation.resize();
  }

  render() {
    Common.renderer.setRenderTarget(null);
    Common.renderer.render(this.scene, this.camera);
  }

  update() {
    this.simulation.update();
    this.render();
  }
}
