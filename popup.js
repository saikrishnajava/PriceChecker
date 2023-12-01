chrome.runtime.sendMessage({ action: 'displayPrice' }, (response) => {
  document.getElementById('price').innerText = response.price;
});
