// Vertex Shader
const vertexShaderSource = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Fragment Shader
const fragmentShaderSource = `
precision mediump float;

uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform bool u_hdMode;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    if (u_hdMode) {
        // Apply sepia tone effect
        vec4 color = texture2D(u_texture, uv);
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        vec3 sepiaColor = vec3(gray * 1.2, gray * 0.9, gray * 0.6);
        gl_FragColor = vec4(sepiaColor, color.a);
    } else {
        // Regular rendering without any effects
        gl_FragColor = texture2D(u_texture, uv);
    }
}
`;
