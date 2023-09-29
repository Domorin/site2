const glsl = (x: unknown) => x as string;

export default glsl`

precision highp float;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_brightness;
uniform float u_speed;
uniform float u_zoom;
uniform float u_thickness_factor;

float in_square(vec2 uv, float square_size)
{
    // Changing this value causes some funky shit
    float a = u_time + length(uv) * 3.141592653589 * sin(u_time * 0.12316);
    float s = sin(a);
    float c = cos(a);
    
    uv *= mat2(c, -s, s, c);
    
    return float(uv.x > -square_size && uv.x < square_size && uv.y > -square_size && uv.y < square_size);
}


void main()
{
   vec2 uv = (gl_FragCoord.xy)/u_resolution.xy;
    vec3 color = vec3(0.0,0.0,1);
    
    uv = uv * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;
    
    
    float ratio = u_resolution.x / u_resolution.y;
    
    uv *= 6.0;
    
    float a = u_time * 0.4 + length(uv) * 0.005 * sin(u_time * 0.25);
    float s = sin(a);
    float c = cos(a);
    
    uv *= mat2(c, -s, s, c);
    
    vec2 guv = fract(uv) - 0.5;
    vec2 id = floor(uv);
    
    float square_size = 1.00 + (sin(u_time * 0.623) + 1.0) * 0.5 * length(uv) * 0.125;    
    
    
    
    float square = 0.0;
    for(float col = -1.0; col < 2.0; col += 1.0)
    {
        for(float row = -1.0; row < 2.0; row += 1.0)
        {            
            square += in_square(vec2(guv.x + col, guv.y + row), square_size);
        }
        
    }    
    vec3 col = 0.5 + sin(u_time + vec3(square * 0.25, square * 2.354126, square * 13.42)) * 0.5;
    
  
   
    gl_FragColor = vec4(col, 1.0);
}`;
