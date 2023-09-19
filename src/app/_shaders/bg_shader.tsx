const glsl = (x: unknown) => x as string;

export default glsl`

precision highp float;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

float amount = 20.;
float remove_percent = 0.;
float attraction_value = 50.;

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}


vec2 circle_center(vec2 g_id, vec2 offset) {
   //return vec2(sin(u_time), cos(u_time + g_id.x * 23.123)) * 0.1;
   vec2 circle_center = vec2(sin(g_id.x * 124.1345 + g_id.y * 7.742), cos(g_id.y * 57.91 + 12.9 * g_id.x)) * sin(u_time * 0.1 * (0.5+rand(g_id)) + g_id.x * 124.123 + g_id.y * 79.123) * 0.5;

   vec2 abs_circle_center = (circle_center + 1.) * 0.5;
   // [0, 1]
   abs_circle_center += g_id;
   // [6, 7]
   abs_circle_center = abs_circle_center / (amount);

   vec2 rel_mouse = ((u_mouse.xy + offset) / u_resolution.xy);
   rel_mouse.x *= u_resolution.x / u_resolution.y;


   float mouse_dist_raw = pow(max(1.0 - distance(rel_mouse, abs_circle_center), 0.0), attraction_value);

   abs_circle_center = mix(abs_circle_center, rel_mouse, mouse_dist_raw);


   return ((abs_circle_center * amount - g_id) * 2.) - 1.;

   //return circle_center;
   //return vec2(0.1, 0.1) + sin(u_time + g_id.x) * 0.1;
}

float distanceFromLine(vec2 p, vec2 uv, vec2 o_uv, float seed) {
   // https://stackoverflow.com/questions/48628082/draw-a-line-segment-in-a-fragment-shader
   vec2 pa = p - uv, ba = o_uv - uv;
   float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );

   float dist = distance(p, uv);
   float thickness = 0.03;// * 1./pow(dist, 0.6);
   

   return smoothstep(thickness, thickness-0.01, length(pa - ba*h));
}

float line(vec2 uv, vec2 g_id, vec2 offset, float seed) {
   float line = 0.;
   for(float x = -1.; x <= 1.; x+=1.)
   {
      for(float y = -1.; y <= 1.; y+=1.) {
         vec2 coord = vec2(x,y);
         
         // if(y == 0. && x == 0.)
         // {
         //    continue;
         // }

         float seed = rand(g_id + coord);

         // 0.5, 0.5
         // -1.5, -1.5
         line += distanceFromLine(uv, circle_center(g_id, offset)+0.0001, circle_center(g_id + coord, offset) + coord * 2., seed) * float(seed > remove_percent);
      }
   }
   return line;
}

float circle(vec2 uv, vec2 g_id, vec2 offset) {
   vec2 circle_center = circle_center(g_id, offset);

   vec2 abs_circle_center = (circle_center + 1.) * 0.5;
   // [0, 1]
   abs_circle_center += g_id;
   // [6, 7]
   abs_circle_center = abs_circle_center / (amount);

   vec2 rel_mouse = ((u_mouse.xy + offset) / u_resolution.xy);
   rel_mouse.x *= u_resolution.x / u_resolution.y;


   float mouse_dist_raw = distance(rel_mouse, abs_circle_center);

   abs_circle_center = mix(rel_mouse, abs_circle_center, 1.0 - 1.0/(1.-mouse_dist_raw));



   float mouse_radius = 0.01;
   float mouse_dist = pow(1./(1. + pow(distance(rel_mouse, abs_circle_center), 0.5) - mouse_radius), 15.);

   float seed = rand(g_id);  


   float glow_alpha = pow((sin(u_time * 0.1 + rand(g_id * 19.9123) * 23.915) + 1.) * 0.5 * float(seed > 0.95), 1000.);
   float total_alpha = mouse_dist + glow_alpha;


   float radius = rand(g_id) * 0.5 + 0.5;
   radius *= 0.;

   vec2 c_uv = uv * 2. - 1.;

   float circle_glow = pow(1./(1. + distance(c_uv, circle_center) - radius), 20.);
   //float circle_base = smoothstep(radius, radius/2., distance(c_uv, circle_center));


   
   float line_alpha = line(c_uv, g_id, offset, seed);

   float circle_alpha = circle_glow * total_alpha;

   float line_alpha_wave = sin(seed * 114.37623 + u_time * (seed * 0.5 + 0.5)) * 0.1;

   return (circle_alpha + line_alpha * (line_alpha_wave + pow(mouse_dist, 10.0)));
   //return mouse_dist;
}


void main() {
   vec2 offset = vec2(u_time * 10., 0.);

   vec2 uv = (gl_FragCoord.xy + offset)/u_resolution.xy;

   uv.x *= u_resolution.x / u_resolution.y;


   vec2 big_uv = uv * amount;

   vec2 g_id = floor(big_uv);
   vec2 g_uv = mod(big_uv, 1.);   
   // (0.5, 0.1)

   float circle_alpha = 0.;

   vec3 color = vec3(0.);
   for(float x = -1.; x <= 1.; x+=1.)
   {
      for(float y = -1.; y <= 1.; y+=1.) {
         vec2 coord = vec2(x,y);

         float seed = rand(g_id + coord);

         // 0.5, 0.5         
         circle_alpha += circle(g_uv - coord, g_id + coord, offset) * float(seed > remove_percent);
         // vec3 pretty_color = mix(vec3(0.949,0.733,0.02), vec3(0.204,0.329,0.82), float(rand(g_id + coord) > 0.5));

         color = mix(vec3(1.), vec3(0.204,0.329,0.82), float(rand(g_id + coord * 23.1293) > 0.1));
         
      }
   }

   circle_alpha = min(circle_alpha, 1.0);   

   

   // gl_FragColor = vec4(vec3(distance(gl_FragCoord.xy / u_resolution.xy, u_mouse.xy / u_resolution.xy) * 20.), 1.0);
   gl_FragColor = vec4(vec3(0.), 1.) + vec4(color, 1.0) * pow(circle_alpha, 1.0);

   // gl_FragColor = vec4(gl_FragColor.xyz, 0.0);
   // gl_FragColor = mix(vec4(1.,0.,0.,1.), vec4(1.), distanceFromLine(uv, m_uv, vec2(0.5)));
}`;
