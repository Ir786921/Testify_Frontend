import * as tf from "@tensorflow/tfjs";

/**
 * Function to detect blur in an image using Laplacian variance.
 * @param {HTMLImageElement} imageElement - The image to analyze.
 * @returns {Promise<boolean>} - True if the image is blurry, false otherwise.
 */
const isImageBlurry = async (imageElement) => {
  return new Promise((resolve) => {
    // Convert image to grayscale tensor
    const imageTensor = tf.browser.fromPixels(imageElement).mean(2).toFloat();

    // Define the Laplacian kernel for edge detection
    const laplacianKernel = tf.tensor2d([[0, 1, 0], [1, -4, 1], [0, 1, 0]], [3, 3], "float32");

    // Apply the Laplacian filter
    const laplacian = imageTensor.conv2d(laplacianKernel, 1, "same").abs();

    // Compute variance of the Laplacian
    const variance = laplacian.mean().dataSync()[0];

    console.log("🔍 Laplacian Variance:", variance);

    // Set a threshold (experiment with values)
    resolve(variance < 10); // If variance is low, image is blurry
  });
};

export default isImageBlurry;