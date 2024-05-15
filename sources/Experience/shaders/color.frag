precision highp float;
uniform sampler2D velocity;
varying vec2 uv;

varying vec3 vColor0;
varying vec3 vColor1;
varying vec3 vColor2;
varying vec3 vColor3;
varying vec3 vColor4;

void main(){

    vec2 vel = texture2D(velocity, uv).xy;
    float len = length(vel);
    vel = vel * 0.5 + 0.5;
    
    vec3 color = vec3(vel.x, vel.y, 1.0);
    color = mix(vec3(1.0), vColor0, len);

    color *= mix(vColor1, color, len);

    color *= mix(vColor2, color, len);
    color *= mix(vColor3, color, len);
    color *= mix(vColor4, color, len);

    color = clamp(color, 0., 1.);


    gl_FragColor = vec4(color,  1.0);
    gl_FragColor = vec4(vec3(len),  1.0);
}
