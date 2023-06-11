precision mediump float;

uniform sampler2D uSampler;
uniform float R;
uniform float G;
uniform float B;

uniform float uTintAmount;

varying vec2 texcoords2;

void main() {
    vec4 uTint = vec4(R, G, B, 1.0);
    // Sample the texture at the current UV coordinates
    vec4 texel = texture2D(uSampler, texcoords2);

    // Mix the texture color with the tint color
    vec4 tintedTexel = mix(texel, uTint, uTintAmount);

    // Set the output color to the tinted texture color
    gl_FragColor = tintedTexel;
}