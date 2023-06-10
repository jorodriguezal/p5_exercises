let lens_pg, kaleidoscope_pg, dysmorphic_pg;
let kaleidoscope, lens, dysmorphic;
let segments;
let magnification;
let lens_radius;
let angelus;
let distanceThresholdSlider;
let img;
let fileInput;
let currentShader = "bright"; // initialize currentShader to "bright"

function preload() {
  quant = readShader("quant.frag", { varyings: Tree.texcoords2 });

  bright = readShader("bright.frag", { varyings: Tree.texcoords2 });

  woo = readShader("woo.frag", { varyings: Tree.texcoords2 });

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

  woo_pg = createGraphics(width, height, WEBGL);
  woo_pg.colorMode(RGB, 1);
  woo_pg.textureMode(NORMAL);
  woo_pg.shader(woo);

  distanceThresholdSlider = createSlider(0, 1000, 100, 10);
  distanceThresholdSlider.position(width - 120, 20);
  distanceThresholdSlider.style("width", "80px");

  quantization = createSlider(1, 50, 30, 1);
  quantization.position(20, 20);

  // create file input element
  fileInput = createFileInput(handleFile);
  fileInput.position(20, 50);

  // create button to flip between bright and woo shaders
  let shaderButton = createButton("Switch Shader");
  shaderButton.position(width - 120, 50);
  shaderButton.mousePressed(() => {
    if (currentShader === "bright") {
      currentShader = "woo";
    } else {
      currentShader = "bright";
    }
  });
}

function draw() {
  if (img) {
    if (currentShader === "woo") { // check currentShader value
      woo_pg.background(125);
      woo.setUniform("texture", img);
      woo_pg.emitPointerPosition(woo, mouseX, mouseY, "iMouse");
      woo.setUniform("iChannel0", img);
      woo_pg.emitResolution(woo, "iResolution");
      woo_pg.emitResolution(woo);
      woo.setUniform("radio", distanceThresholdSlider.value());
      pg = woo_pg;
      pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);
    } else {
      bright_pg.emitPointerPosition(bright, mouseX, mouseY, "iMouse");
      bright.setUniform("texture", img);
      bright.setUniform("distanceThreshold", distanceThresholdSlider.value());
      pg = bright_pg;
      pg.quad(-1, 1, 1, 1, 1, -1, -1, -1);
    }

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
