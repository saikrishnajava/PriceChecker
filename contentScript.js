chrome.runtime.sendMessage({ action: 'displayPrice', price: 'Loading...' });

const getProductPrice = async () => {
  try {
    const productNameElement = document.querySelector('#productTitle');
    const productName = productNameElement?.innerText.trim();

    if (!productName) {
      throw new Error('Product name not found');
    }

    const encodedProductName = encodeURIComponent(productName);
    const apiUrl = `https://api.bestbuy.com/v1/products((search=${encodedProductName}))?apiKey=bGdPjL2B9yOKR9MbtEpfmCXr&format=json`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const price = data?.products?.[0]?.salePrice;
    if (price) {
      chrome.runtime.sendMessage({ action: 'displayPrice', price });
    } else {
      throw new Error('Price not found');
    }
  } catch (error) {
    console.error('Error:', error);
    chrome.runtime.sendMessage({ action: 'displayPrice', price: 'Error' });
  }
};

getProductPrice();
