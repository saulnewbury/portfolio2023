#define PI 3.1415926535897932384626433832795
#define TAU 6.283185307179586

varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;

// NOISE
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

float lines(vec2 uv, float offset) {
  if (offset < 0.5) {

  return smoothstep(
    0.0, 0.5 + offset * 0.5,
    abs(0.5 * (sin(uv.x * 30.0) + offset * 2.0))
  );
  } else {
     return smoothstep(
    0.3, 0.6 + offset * 0.5,
    abs(0.6 * (sin(uv.x * 30.0) + offset * 2.0))
  );
  }
}

mat2 rotate2D(float angle) {
  return mat2(
    cos(angle), -sin(angle), sin(angle), cos(angle)
  );
}

void main()
{
  // Egg
   vec3 baseFirst = vec3(255./255., 167./255., 117./255.);
  //  vec3 accent = vec3(255./255., 165./255., 115./255.); // dark
   vec3 accent = vec3(255./255., 165./255., 135./255.); // dark
   vec3 baseSecond =  vec3(255./255., 211./255., 198./255.); // main

   float n = noise(vPosition + uTime);

   vec2 baseUV = rotate2D(n) * vPosition.xy * .01; //.005
   float basePattern = lines(baseUV, 0.1); // .1
   float secondPattern = lines(baseUV, .5); // .05
   float thirdPattern = lines(baseUV, .6); // .005 

   vec3 baseColor = mix(baseSecond, baseFirst, basePattern);
   vec3 secondBaseColor = mix(baseColor, accent, secondPattern);

  gl_FragColor = vec4(vec3(secondBaseColor), 1.0);


  
}