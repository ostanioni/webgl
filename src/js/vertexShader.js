// <script id="vertex-shader-2d" type="notjs">
     
// атрибут, который будет получать данные из буфера
attribute vec4 a_position;

// все шейдеры имеют функцию main
void main() {

  // gl_Position - специальная переменная вершинного шейдера,
  // которая отвечает за установку положения
  gl_Position = a_position;
}

// </script>