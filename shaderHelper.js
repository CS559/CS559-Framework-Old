/*jshint esversion: 6 */ 
// @ts-check

//import THREE from "three";

//////////////////////////////////
// Ugly hack to avoid typescript warnings
// @ts-ignore
let THREEmod = THREE;

// import * as THREEmod from "../Libs/three.module";

// this takes an object that describes a shader material and adds the
// shader code (if provided) to it.
// if the shader code is not there, it gives a default shader
const defaultVertexShader = `
    void main()
    {
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;
const defaultFragmentShader = `
    void main()
    {
        gl_FragColor = vec4(0.4,0.4,0.6,1);
    }
`;
const errorFragmentShader = `
    void main()
    {
        gl_FragColor = vec4(0.8,0.4,0.4,1);
    }
`;

/**
 * 
 * @param {string} url 
 * @param {THREE.ShaderMaterial} material 
 */
function loadFragmentShader(url,material)
{
    let loader = new THREEmod.FileLoader();
    loader.load(url,
            /* onload = */ function(data) {
                material.fragmentShader = data.toString();
                material.needsUpdate = true;
            },
            /* onprogress = */ function(xhr) {
            },
            /* onerror = */ function(err) {
                console.log(`Failed to Load Shader (file:${url})`);
                console.log(`Error: ${err}`);
                material.fragmentShader = errorFragmentShader;
                material.needsUpdate = true;
            }
        );
}

/**
 * 
 * @param {string} url 
 * @param {THREE.ShaderMaterial} material 
 */
function loadVertexShader(url,material)
{
    let loader = new THREEmod.FileLoader();
    loader.load(url,
            /* onload = */ function(data) {
                material.vertexShader = data.toString();
                material.needsUpdate = true;
            },
            /* onprogress = */ function(xhr) {
            },
            /* onerror = */ function(err) {
                console.log(`Failed to Load Shader (file:${url})`);
                console.log(`Error: ${err}`);
                material.fragmentShader = errorFragmentShader;
                material.needsUpdate = true;
            }
        );
}

/**
 * Create a Shader Material from a set of shader files
 * Creates the material with default shaders, and async loads the
 * shaders from file and swaps them in when they are ready.
 * 
 * @param {string} vertexShaderURL 
 * @param {string} fragmentShaderURL
 * @param {THREE.ShaderMaterialParameters} [properties] 
 * @returns {THREE.ShaderMaterial} 
 */
export function shaderMaterial(vertexShaderURL, fragmentShaderURL, properties={})
{
    if (!properties) properties = {};

    let sm = new THREEmod.ShaderMaterial(properties);
    // create a default shader until the real ones load
    sm.vertexShader = defaultVertexShader;
    sm.fragmentShader = defaultFragmentShader;
    sm.needsUpdate = true;
    // these will be loaded asynchronously
    loadVertexShader(vertexShaderURL,sm);
    loadFragmentShader(fragmentShaderURL,sm);
    // the material is ready for use, even if it has the default shader
    return sm;
}
