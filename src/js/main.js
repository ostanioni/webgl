const canvas = document.getElementById('Cnvs');
const gl = canvas.getContext("webgl");


const vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
const fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
   
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = createProgram(gl, vertexShader, fragmentShader); // создаем программу
const positionAttributeLocation = gl.getAttribLocation(program, "a_position"); // получить ссылку на атрибут для только что созданной программы
const positionBuffer = gl.createBuffer(); // Атрибуты получают данные от буферов, поэтому нам нужно создать буфер

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.clearColor(0, 0, 0, 0);// очищаем canvas
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program); // Указываем WebGL, какую шейдерную программу нужно выполнить

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); // Привязываем буфер положений

gl.enableVertexAttribArray(positionAttributeLocation);
// Указываем атрибуту, как получать данные от positionBuffer (ARRAY_BUFFER)
var size = 2;          // 2 компоненты на итерацию
var type = gl.FLOAT;   // наши данные - 32-битные числа с плавающей точкой
var normalize = false; // не нормализовать данные
var stride = 0;        // 0 = перемещаться на size * sizeof(type) каждую итерацию для получения следующего положения
var offset = 0;        // начинать с начала буфера
gl.vertexAttribPointer( positionAttributeLocation, size, type, normalize, stride, offset );

const positions = [ // три двумерных точки
    0, 0,
    0, 0.5,
    0.7, 0,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW); // Теперь можно наполнить буфер данными, указав буфер через его точку связи

var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 3;
gl.drawArrays(primitiveType, offset, count);

function createShader(gl, type, source) {
    var shader = gl.createShader(type);   // создание шейдера
    gl.shaderSource(shader, source);      // устанавливаем шейдеру его программный код
    gl.compileShader(shader);             // компилируем шейдер
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {                        // если компиляция прошла успешно - возвращаем шейдер
      return shader;
    }
   
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }

  function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram(); // создание программы
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
   
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }

