attribute vec3 position;
uniform vec2 px;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
varying vec3 vColor0;
varying vec3 vColor1;
varying vec3 vColor2;
varying vec3 vColor3;
varying vec3 vColor4;
varying vec2 uv;
precision highp float;

void main() {

  vec3 pos = position;
  uv = 0.5 + pos.xy * 0.5;
  vec2 n = sign(pos.xy);
  pos.xy = abs(pos.xy) - px * 1.0;
  pos.xy *= n;

  vColor0 = uColor0;
  vColor1 = uColor1;
  vColor2 = uColor2;
  vColor3 = uColor3;
  vColor4 = uColor4;

  gl_Position = vec4(pos, 1.0);
}