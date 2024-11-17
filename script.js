const imageFileInput = document.querySelector("#imageFileInput");
const canvas = document.querySelector("#meme");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");

let image = null; // To hold the loaded image

// When an image is selected
imageFileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    alert("Please select a valid image file.");
    return;
  }

  const imageDataUrl = URL.createObjectURL(file);

  image = new Image();
  image.src = imageDataUrl;

  image.onload = () => {
    updateMemeCanvas();
  };

  image.onerror = () => {
    alert("Failed to load the image. Please try again with a valid file.");
  };
});

// Update the meme whenever text inputs change
topTextInput.addEventListener("input", updateMemeCanvas);
bottomTextInput.addEventListener("input", updateMemeCanvas);

function updateMemeCanvas() {
  if (!image) return;

  const ctx = canvas.getContext("2d");

  // Resize canvas to match image dimensions
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw the image on the canvas
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Text styling
  const fontSize = Math.floor(canvas.width / 10);
  ctx.font = `${fontSize}px Impact`;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.lineWidth = fontSize / 10;

  // Draw top text
  ctx.textBaseline = "top";
  ctx.fillText(topTextInput.value, canvas.width / 2, 10);
  ctx.strokeText(topTextInput.value, canvas.width / 2, 10);

  // Draw bottom text
  ctx.textBaseline = "bottom";
  ctx.fillText(bottomTextInput.value, canvas.width / 2, canvas.height - 10);
  ctx.strokeText(bottomTextInput.value, canvas.width / 2, canvas.height - 10);
}

// Download the generated meme
function download_image() {
  if (!image) {
    alert("Please upload an image and add text before downloading.");
    return;
  }

  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
