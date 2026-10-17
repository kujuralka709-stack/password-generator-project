const password = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const message = document.getElementById("message");

lengthSlider.addEventListener("input", function () {
    lengthValue.textContent = lengthSlider.value;
});

function generatePassword() {
    let characters = "";

    if (document.getElementById("uppercase").checked) {
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (document.getElementById("lowercase").checked) {
        characters += "abcdefghijklmnopqrstuvwxyz";
    }

    if (document.getElementById("numbers").checked) {
        characters += "0123456789";
    }

    if (document.getElementById("symbols").checked) {
        characters += "!@#$%^&*()_+-=";
    }

    if (characters.length === 0) {
        password.value = "";
        message.textContent = "Please select at least one option!";
        message.style.color = "red";
        return;
    }

    const length = Number(lengthSlider.value);
    let result = "";

    // Secure random character selection
    const randomValues = new Uint32Array(length);
    const max = Math.floor(4294967296 / characters.length)
        * characters.length;

    for (let i = 0; i < length; i++) {
        let value;

        do {
            crypto.getRandomValues(randomValues.subarray(i, i + 1));
            value = randomValues[i];
        } while (value >= max);

        result += characters[value % characters.length];
    }

    password.value = result;
    message.textContent = "Password generated successfully!";
    message.style.color = "green";
}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", async function () {
    if (!password.value) {
        message.textContent = "Generate a password first!";
        message.style.color = "red";
        return;
    }

    try {
        await navigator.clipboard.writeText(password.value);
        message.textContent = "Password copied successfully!";
        message.style.color = "green";
    } catch (error) {
        message.textContent = "Copy failed. Please copy it manually.";
        message.style.color = "red";
    }
});