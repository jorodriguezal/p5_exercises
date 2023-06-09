let lens_pg, kaleidoscope_pg, dysmorphic_pg;
let kaleidoscope, lens, dysmorphic;
let segments;
let magnification;
let lens_radius;
let angelus;
let distanceThresholdSlider;
let img;
let fileInput;

function preload() {
  quant = readShader("quant.frag", { varyings: Tree.texcoords2 });

  bright = readShader("bright.frag", { varyings: Tree.texcoords2 });

  img = loadImage("myImage.jpg");
}

function setup() {
  createCanvas(700, 500);
  quant_pg = createGraphics(width, height, WEBGL);
  quant_pg.colorMode(RGB, 1);
  quant_pg.textureMode(NORMAL);
  quant_pg.shader(quant);

  bright_pg = createGraphics(width, height, WEBGL);
  bright_pg.colorMode(RGB, 1);
  bright_pg.textureMode(NORMAL);
  bright_pg.shader(bright);

  distanceThresholdSlider = createSlider(0, 1000, 100, 10);
  distanceThresholdSlider.position(width - 120, 20);
  distanceThresholdSlider.style("width", "80px");

  quantization = createSlider(1, 50, 30, 1);
  quantization.position(20, 20);

  // create file input element
  fileInput = createFileInput(handleFile);
  fileInput.position(20, 50);
}

function draw() {
  if (img) {
    bright_pg.emitPointerPosition(bright, mouseX, mouseY, "iMouse");
    bright.setUniform("texture", img);
    bright.setUniform("distanceThreshold", distanceThresholdSlider.value());
    pg = bright_pg;
    pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);

    quant_pg.background(125);
    quant.setUniform("texture", pg);
    quant.setUniform("uDivisor", quantization.value());
    quant_pg.emitResolution(quant);
    pg = quant_pg;
    pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);

    image(pg, 0, 0);
  }
}

function handleFile(file) {
  if (file.type === "image") {
    img = loadImage(
      file.data,
      () => {
        console.log("Image loaded successfully");
      },
      () => {
        console.log("Error loading image");
      }
    );
  } else {
    console.log("Not an image file");
  }
}
