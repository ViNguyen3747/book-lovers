uniform float uAlpha;

void main () {
    gl_FragColor = vec4(22.0 / 255.0f, 25.0 / 255.0f, 30.0 / 255.0f, uAlpha);
}