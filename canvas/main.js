const canvas = document.querySelector('canvas');
// 拿到canvas2D上下文
const context = canvas.getContext('2d');
const rectSize = [100, 100];
// 设置色
context.fillStyle = 'red';
// 暂存画布状态
context.save();
// 平移变换
context.translate(-0.5 * rectSize[0], -0.5 * rectSize[1]);
// 声明现在绘制的路径
context.beginPath();
// 绘制
context.rect(0.5 * canvas.width, 0.5 * canvas.height, ...rectSize);
context.closePath();
// 将绘制的内容输出到画布中
context.fill();
// 恢复画布状态
context.restore();
context.fillStyle = 'skyblue';
context.beginPath();
context.rect(0.5 * canvas.width, 0.5 * canvas.height, ...rectSize);
context.fill();
