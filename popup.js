const inputText = document.getElementById("inputText");
const translateBtn = document.getElementById("translateBtn");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");

const API_URL = 'http://localhost:3000/translate';

chrome.storage.local.get('selectedText', (data) => {
    if (data.selectedText) {
        inputText.value = data.selectedText;
    }
});

translateBtn.addEventListener("click", async () => {
    errorDiv.textContent = '';
    resultDiv.textContent = 'Перевод...';

    const text = inputText.value.trim();
    if (!text) {
        resultDiv.textContent = '';
        errorDiv.textContent = 'Введите текст для перевода';
        return;
    }
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, target_lang: 'RU' }),
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText || 'Ошибка перевода');
        }

        const data = await response.json();
        if (data.translations && data.translations.length > 0) {
            resultDiv.textContent = data.translations[0].text;
        } else {
            throw new Error('Неверный ответ от сервера');
        }
    } catch (error) {
        resultDiv.textContent = '';
        errorDiv.textContent = 'Ошибка: ' + error.message;
    }
});