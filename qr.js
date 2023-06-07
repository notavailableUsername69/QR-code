// Check if the browser supports the required APIs
if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const resultText = document.getElementById('resultText');

  // Access the camera stream and display it in the video element
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
    })
    .catch(function(error) {
      console.error('Error accessing camera:', error);
    });

  // Capture a frame from the video stream and process it
  function captureFrame() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Process the captured image using a QR code decoding library
    const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    const qrCodeResult = decodeQRCode(imageData);

    if (qrCodeResult) {
      resultText.textContent = 'QR Code: ' + qrCodeResult;
    } else {
      resultText.textContent = 'No QR code detected.';
    }

    // Capture the next frame
    requestAnimationFrame(captureFrame);
  }

  // Function to decode the QR code using a decoding library (not included in this example)
  function decodeQRCode(imageData) {
    // Replace this function with a QR code decoding library of your choice
    // The library should accept the image data and return the decoded QR code as a string
    // You can use existing libraries like ZXing or QuaggaJS

    // For demonstration purposes, we'll assume the QR code contains plain text
    const fakeDecodingLibrary = {
      decode: function(imageData) {
        return 'Example QR Code';
      }
    };

    return fakeDecodingLibrary.decode(imageData);
  }

  // Start capturing frames
  captureFrame();
} else {
  // Browser does not support required APIs
  console.error('getUserMedia API not available');
  resultText.textContent = 'Camera access not supported.';
}