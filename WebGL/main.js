// 创建webGL上下文
const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
// 创建WebGL程序，其实是一个WebGLProgram对象，它是给GPU最终运行着色器的程序。

// 先写两个着色器
// GLSL(OpenGL着色语言OpenGL Shading Language)
// attribute 表示声明变量，vec2 是变量的类型，它表示一个二维向量
const vertex = `
  attribute vec2 position;
  varying vec3 color;
  void main() { 
      color = vec3(0.5+position*0.5,0.0);
      gl_Position = vec4(position, 1.0, 1.0); 
  }
`;

// 在片元着色器里，我们可以通过设置 gl_FragColor 的值来定义和改变图形的颜色。
// gl_FragColor 是 WebGL 片元着色器的内置变量，表示当前像素点颜色，它是一个用 RGBA 色值表示的四维向量数据。
const fragment = `
  precision mediump float;
  varying vec3 color;
  void main() { 
    gl_FragColor = vec4(color,1.0); 
  } 
`;

// 将着色器分别创建成shader对象。
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);

// 创建 WebGLProgram 对象，并将这两个 shader 关联到这个对象上
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// 启用WebGLProgram 对象
gl.useProgram(program);

// 定义类型化数组
const points = new Float32Array([-1, -1, 0, 1, 1, -1,]);

// 将定义好的数据写入 WebGL 的缓冲区
// 创建缓存对象
const bufferId = gl.createBuffer();
// 将它绑定为当前操作对象
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
// 把数据写入缓存对象
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

// 将 buffer 的数据绑定给顶点着色器的 position 变量
// 获取顶点着色器中的position变量的地址
const vPosition = gl.getAttribLocation(program, 'position');
// 给变量设置长度和类型
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
// 激活这个变量
gl.enableVertexAttribArray(vPosition);

// 清除当前画布
gl.clear(gl.COLOR_BUFFER_BIT);
// 传入绘制模式
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);

