// 创建webGL上下文
const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
// 创建WebGL程序，其实是一个WebGLProgram对象，它是给GPU最终运行着色器的程序。
// 先写两个着色器
const vertex = `
  attribute vec2 position;

  void main() { 
      gl_PointSize = 1.0; 
      gl_Position = vec4(position, 1.0, 1.0); 
  }
`; 

const fragment = `
  precision mediump float; 
  void main() 
  { 
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
  } 
`;