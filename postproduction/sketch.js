let lens_pg, kaleidoscope_pg, dysmorphic_pg;
let kaleidoscope, lens, dysmorphic;
let segments;
let magnification;
let lens_radius;
let angelus;

function preload() {
  quant = readShader('quant.frag',
                            { varyings: Tree.texcoords2 });
  img = loadImage('myImage.jpg');
}

function setup() {
  createCanvas(600, 600);
  quant_pg = createGraphics(width, height, WEBGL);
  quant_pg.colorMode(RGB, 1);
  quant_pg.textureMode(NORMAL);
  quant_pg.shader(quant);
 
//   magnification = createSlider(0.1, 9, 3, 0.1);
//   magnification.position(width - 120, 10);
//   magnification.style('width', '80px');
//   magnification.input(() => {
//     lens.setUniform('magnification', magnification.value())
//     });
//   lens.setUniform('magnification', magnification.value());
//   lens_radius = createSlider(0, 500, 150, 1);
//   lens_radius.position(width - 120, 35);
//   lens_radius.style('width', '80px');
//   lens_radius.input(() => {
//     lens.setUniform('lens_radius', lens_radius.value())
//     });
//   lens.setUniform('lens_radius', lens_radius.value());
segments = createSlider(1, 20, 1, 1);
//   segments.position(10, 10);
}

function draw() {
  quant_pg.background(125);
  quant.setUniform('texture', img);
  quant.setUniform('uDivisor', segments.value());
  quant_pg.emitResolution(quant);
  pg = quant_pg;
  pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);
  image(pg, 0, 0);
}