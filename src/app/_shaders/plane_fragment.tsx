const glsl = (x: unknown) => x as string;

export default glsl`

precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

flat in float seed;
varying vec2 vUv;


float CIRCLE_SIZE = 5.0;



void main() {
   vec2 uv = (gl_FragCoord.xy)/u_resolution.xy;

   float opacity_alpha = (sin(seed * 23.15691 + u_time) * 0.5 + 0.5) * float(seed < 0.01);
   float color_alpha = sin(uv.x * 23.915 + uv.y * 7.12 + seed * 23.15691) * 0.5 + 0.5;

   vec3 color = mix(vec3(1.), vec3(0.204,0.329,0.82), pow(color_alpha, 2.));

   vec2 cUv = vUv * 2. - vec2(1.);

   float circle_alpha = smoothstep(CIRCLE_SIZE, CIRCLE_SIZE-0.05, length(cUv));



   gl_FragColor = vec4(100., 100., 100., 100.);
}`;
