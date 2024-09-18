export const vertex = `
varying vec2 vUv;
uniform float uTime;
uniform float uAmplitude;
uniform float uWaveLength;
void main() {
    vUv = uv;
    vec3 newPosition = position;

    float wave = uAmplitude * sin(position.y * uWaveLength + uTime);
    newPosition.z = position.z + wave; 

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const fragment = `
// uniform sampler2D uTexture1;
// uniform sampler2D uTexture2;
// varying vec2 vUv;

// void main() {
//     vec2 squareSize = vec2(0.44, 0.18);
//     vec2 position = vec2(0.28, 0.74); 

//     vec2 uvInSquare = (vUv - position) / squareSize;

//     bool inSquare = uvInSquare.x >= 0.0 && uvInSquare.x <= 1.0 &&
//                     uvInSquare.y >= 0.0 && uvInSquare.y <= 1.0;

//     vec4 color1 = texture2D(uTexture1, uvInSquare); 
//     vec4 color2 = texture2D(uTexture2, vUv);

//     vec4 finalColor = inSquare ? color1 : color2;
//     gl_FragColor = finalColor;
// }


uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uTextTexture; // Text texture uniform
varying vec2 vUv;

void main() {
    // Define the size and position of the first texture (uTexture1)
    vec2 squareSize = vec2(0.44, 0.18);
    vec2 position = vec2(0.28, 0.74); 

    vec2 uvInSquare = (vUv - position) / squareSize;

    bool inSquare = uvInSquare.x >= 0.0 && uvInSquare.x <= 1.0 &&
                    uvInSquare.y >= 0.0 && uvInSquare.y <= 1.0;

    vec4 color1 = texture2D(uTexture1, uvInSquare); 
    vec4 color2 = texture2D(uTexture2, vUv);

    // Define the position and size of the text texture
    vec2 textPosition = vec2(0, 0.13); // Adjust this to move the text
    vec2 textSize = vec2(1, 1);     // Adjust the size of the text

    // Calculate UVs for the text texture
    vec2 uvInTextArea = (vUv - textPosition) / textSize;

    // Sample the text texture
    vec4 textColor = texture2D(uTextTexture, uvInTextArea);
    
    // Ensure the text only appears within the defined area
    bool inTextArea = uvInTextArea.x >= 0.0 && uvInTextArea.x <= 1.0 &&
                      uvInTextArea.y >= 0.0 && uvInTextArea.y <= 1.0;

    // Combine the two textures with the text overlay
    vec4 finalColor = mix(color2, textColor, inTextArea ? textColor.a : 0.0);
    finalColor = inSquare ? color1 : finalColor;
    
    gl_FragColor = finalColor;
}

    `;
