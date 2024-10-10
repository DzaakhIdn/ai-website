async function generateImage() {
    const promptElement = document.getElementById("prompt");
    const resultContainer = document.getElementById("result-container");
    const loader = document.getElementById("loader");

    const userPrompt = promptElement.value.trim();
    if (!userPrompt) return;
    
    loader.style.display = "block";

    resultContainer.innerHTML = "";
    resultContainer.appendChild(loader);

    const apiKey = "https://widipe.com/ai/text2img";

    try {
      const prompt = `${apiKey}?text=${encodeURIComponent(userPrompt)}`;
      const response = await fetch(prompt);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Mengubah respons menjadi (gambar)
      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);

      const resultImage = document.createElement("img");
      resultImage.src = imgUrl;
      resultImage.alt = "Gambar Hasil";
      resultImage.setAttribute("class", "result-image");

      loader.style.display = "none";
      resultContainer.appendChild(resultImage);
      resultContainer.scrollTop = resultContainer.scrollHeight;
    } catch (error) {
      console.error(error);
      const errorMessage = document.createElement("div");
      errorMessage.innerHTML = "Gagal menghasilkan gambar.";
      resultContainer.appendChild(errorMessage);
    }

    promptElement.value = ""; // Mengosongkan input setelah pengiriman
  }