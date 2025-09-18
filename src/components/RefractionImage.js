import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const RefractionImage = ({ 
  src, 
  alt = "Refraction Image", 
  className = "",
  width = 300,
  height = 300 
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    uniform vec2 u_resolution;
    uniform float u_time;
    varying vec2 v_texCoord;
    varying vec2 v_position;

    void main() {
      vec2 zeroToOne = a_position / u_resolution;
      vec2 zeroToTwo = zeroToOne * 2.0;
      vec2 clipSpace = zeroToTwo - 1.0;
      
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      v_texCoord = a_texCoord;
      v_position = a_position;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    
    uniform sampler2D u_image;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    
    varying vec2 v_texCoord;
    varying vec2 v_position;

    // Noise function for distortion
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    vec2 getRefractionOffset(vec2 uv, float time) {
      // Create multiple layers of distortion for realistic refraction
      float wave1 = sin(uv.x * 10.0 + time * 2.0) * 0.01;
      float wave2 = cos(uv.y * 8.0 + time * 1.5) * 0.008;
      float wave3 = sin((uv.x + uv.y) * 6.0 + time * 3.0) * 0.006;
      
      // Add noise-based distortion
      vec2 noiseUV = uv * 5.0 + time * 0.1;
      float noiseValue = noise(noiseUV) * 0.015;
      
      // Combine waves and noise
      vec2 offset = vec2(
        wave1 + wave3 + noiseValue,
        wave2 + wave3 + noiseValue * 0.7
      );
      
      // Add radial distortion from center
      vec2 center = vec2(0.5, 0.5);
      vec2 toCenter = uv - center;
      float dist = length(toCenter);
      float radialDistortion = sin(dist * 15.0 - time * 4.0) * 0.005 * (1.0 - dist);
      offset += toCenter * radialDistortion;
      
      return offset;
    }

    vec3 getRefractedColor(vec2 uv, float time) {
      // Get base refraction offset
      vec2 offset = getRefractionOffset(uv, time);
      
      // Sample RGB channels with slight chromatic aberration
      float r = texture2D(u_image, uv + offset * 1.2).r;
      float g = texture2D(u_image, uv + offset).g;
      float b = texture2D(u_image, uv + offset * 0.8).b;
      
      return vec3(r, g, b);
    }

    void main() {
      vec2 uv = v_texCoord;
      
      // Get refracted color
      vec3 color = getRefractedColor(uv, u_time);
      
      // Add some brightness variation to simulate light refraction
      float brightness = 1.0 + sin(uv.x * 20.0 + u_time * 2.0) * 0.1 + 
                                cos(uv.y * 15.0 + u_time * 1.8) * 0.08;
      color *= brightness;
      
      // Add subtle color shift for more realistic refraction
      color.rgb += vec3(
        sin(u_time + uv.x * 10.0) * 0.02,
        cos(u_time + uv.y * 12.0) * 0.015,
        sin(u_time * 1.3 + (uv.x + uv.y) * 8.0) * 0.01
      );
      
      // Ensure color stays in valid range
      color = clamp(color, 0.0, 1.0);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Helper function to create shader
    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    // Helper function to create program
    const createProgram = (gl, vertexShader, fragmentShader) => {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    };

    // Create shaders and program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    if (!program) return;

    // Get attribute and uniform locations
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const imageLocation = gl.getUniformLocation(program, 'u_image');

    // Create buffers
    const positionBuffer = gl.createBuffer();
    const texCoordBuffer = gl.createBuffer();

    // Set up geometry (full canvas rectangle)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0, 0,
      width, 0,
      0, height,
      0, height,
      width, 0,
      width, height,
    ]), gl.STATIC_DRAW);

    // Set up texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      0, 1,
      1, 0,
      1, 1,
    ]), gl.STATIC_DRAW);

    // Load and create texture
    const texture = gl.createTexture();
    const image = new Image();
    
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      
      // Set texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Start render loop
      startRenderLoop();
    };

    image.crossOrigin = 'anonymous';
    image.src = `${process.env.PUBLIC_URL}${src}`;

    const startRenderLoop = () => {
      const startTime = Date.now();

      const render = () => {
        const currentTime = (Date.now() - startTime) / 1000;

        // Set viewport and clear
        gl.viewport(0, 0, width, height);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Use program
        gl.useProgram(program);

        // Set up position attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        // Set up texture coordinate attribute
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.enableVertexAttribArray(texCoordLocation);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

        // Set uniforms
        gl.uniform2f(resolutionLocation, width, height);
        gl.uniform1f(timeLocation, currentTime);

        // Bind texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(imageLocation, 0);

        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        animationRef.current = requestAnimationFrame(render);
      };

      render();
    };

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [src, width, height]);

  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-lg shadow-2xl border-2 border-purple-400/30"
        style={{ 
          filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))'
        }}
      />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
    </motion.div>
  );
};

export default RefractionImage;