async function fetchData() {
    try {
        const response = await fetch('/api/stock-data');
        const data = await response.json();
        
        document.getElementById('symbol').innerText = data.symbol;
        document.getElementById('time').innerText = new Date(data.timestamp).toLocaleTimeString();
        const priceElement = document.getElementById('price');
        priceElement.innerText = data.price;
        priceElement.className = data.price >= 190 ? 'positive' : 'negative';
        
        document.getElementById('volume').innerText = data.volume;
        const changeElement = document.getElementById('change');
        changeElement.innerText = data.change;
        changeElement.className = data.change >= 0 ? 'positive' : 'negative';
        
        document.getElementById('range').innerText = `${data.low} - ${data.high}`;
        document.getElementById('tradingVolume').innerText = data.volume;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

setInterval(fetchData, 1000); // Update every second
