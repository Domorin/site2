const glsl = (x: unknown) => x as string;

export default glsl`

precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec3 vColor;
flat in float seed;
varying vec2 vUv;
// varying float mouse_alpha;
flat in float mouse_alpha;


void main() {
   vec2 uv = (gl_FragCoord.xy)/u_resolution.xy + u_time * 0.01;

   float opacity_alpha = pow((sin(seed * 23.15691 + u_time * 0.01) * 0.5 + 0.5), 1.);
   float color_alpha = sin(uv.x * 23.915 + uv.y * 7.12 + seed * 23.15691) * 0.5 + 0.5; 

   vec3 color = mix(vec3(max(0.5, seed)), vec3(0.204,0.329,0.82), pow(color_alpha, 2.));

   float calc_mouse_alpha = pow(mouse_alpha, 50.);
   gl_FragColor = vec4(color, max(opacity_alpha * 0.35, calc_mouse_alpha));
   // gl_FragColor = vec4(1.);

   // gl_FragColor = vec4(seed, seed, seed, 1.0);

}`;
