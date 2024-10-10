async function generateImage() {
    const promptElement = document.getElementById("prompt");
    const resultContainer = document.getElementById("result-container");
    const userMessage = document.createElement("div");
    userMessage.classList.add("result-message", "user-message");
    userMessage.innerText = promptElement.value;

    resultContainer.appendChild(userMessage);

    const apiKey = "https://widipe.com/dalle"; 

    try {
      const prompt = `${apiKey}?text=${encodeURIComponent(promptElement.value)}`;
      const response = await fetch(prompt);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const resultMessage = document.createElement("div");
      resultMessage.classList.add("result-message");
      resultMessage.innerHTML = data.result;

      resultContainer.appendChild(resultMessage);
      resultContainer.scrollTop = resultContainer.scrollHeight; 
    } catch (error) {
      console.error(error);
      const errorMessage = document.createElement("div");
      errorMessage.classList.add("result-message");
      errorMessage.innerHTML = "Gagal menghasilkan gambar.";
      resultContainer.appendChild(errorMessage);
    }

    promptElement.value = "";
  }