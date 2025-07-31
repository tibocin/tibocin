// bitcoin-status.js
// Purpose: Handle real-time Bitcoin status updates (block height, price, node count)
// Related components: HTML sidebar, CSS styling
// Tags: javascript, bitcoin, api, real-time, status

class BitcoinStatus {
    constructor() {
        this.init();
    }

    init() {
        this.startBitcoinStatus();
    }

    async startBitcoinStatus() {
        await this.updateBitcoinStatus();
        // Update every 30 seconds
        setInterval(() => this.updateBitcoinStatus(), 30000);
    }

    async updateBitcoinStatus() {
        try {
            // Fetch Bitcoin block height
            const blockResponse = await fetch('https://blockstream.info/api/blocks/tip/height');
            const blockHeight = await blockResponse.text();
            document.getElementById('blockHeight').textContent = `#${parseInt(blockHeight).toLocaleString()}`;

            // Fetch Bitcoin price
            const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
            const priceData = await priceResponse.json();
            const price = priceData.bitcoin.usd;
            document.getElementById('bitcoinPrice').textContent = `$${price.toLocaleString()}`;

            // Fetch node count (estimated)
            const nodeResponse = await fetch('https://bitnodes.io/api/v1/snapshots/latest/');
            const nodeData = await nodeResponse.json();
            const nodeCount = Object.keys(nodeData.nodes || {}).length;
            document.getElementById('nodeCount').textContent = `${nodeCount.toLocaleString()}`;

        } catch (error) {
            console.log('Error fetching Bitcoin data:', error);
            // Fallback values
            document.getElementById('blockHeight').textContent = 'Loading...';
            document.getElementById('bitcoinPrice').textContent = 'Loading...';
            document.getElementById('nodeCount').textContent = 'Loading...';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BitcoinStatus();
}); 