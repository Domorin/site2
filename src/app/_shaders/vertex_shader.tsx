const glsl = (x: unknown) => x as string;

export default glsl`

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;

varying vec3 vColor;

flat out float seed;
flat out float mouse_alpha;

attribute float a_seed;
attribute float line_seed;

varying vec2 vUv;
// varying float mouse_alpha;

void main() {
	seed = line_seed;
	vUv = uv;


	float x_time = u_time * (a_seed) * 0.2;
	float y_time = u_time * (a_seed) * 0.2;

	vec2 oscillated_pos = vec2(position.x + sin(x_time + a_seed * 17.641) * 15., position.y + sin(y_time + a_seed * 23.195) * 23.);


	

	
	vec2 world_pos = (modelMatrix * vec4(oscillated_pos,0., 1.0)).xy;
	float raw_mouse_alpha = max(1.0 - distance(u_mouse / u_resolution, (world_pos / u_resolution)), 0.0);
	float dist_to_mouse_alpha = pow(raw_mouse_alpha, 25.0);
	mouse_alpha = raw_mouse_alpha;
	vec2 attracted_pos = mix(world_pos.xy, u_mouse, max(dist_to_mouse_alpha, 0.0));
	vec4 new_pos = inverse(modelMatrix) * vec4(attracted_pos, 0., 1.0);


	vec4 modelViewPosition = modelViewMatrix * vec4(vec3(new_pos.xy, 0.), 1.0);	

	gl_Position = projectionMatrix * modelViewPosition; 


	
	gl_Position = projectionMatrix * modelViewPosition;

	// gl_Position = mvPosition;
}
`;
