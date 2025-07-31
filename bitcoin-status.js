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

            // Fetch node count with caching (50 requests/day limit)
            await this.updateNodeCountWithCache();

        } catch (error) {
            console.log('Error fetching Bitcoin data:', error);
            // Fallback values
            document.getElementById('blockHeight').textContent = 'Loading...';
            document.getElementById('bitcoinPrice').textContent = 'Loading...';
            document.getElementById('nodeCount').textContent = 'Loading...';
        }
    }

    async updateNodeCountWithCache() {
        const CACHE_KEY = 'bitcoin_node_count_cache';
        const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        try {
            // Check if we have cached data
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const cacheData = JSON.parse(cached);
                const now = Date.now();
                
                // If cache is still valid (less than 24 hours old)
                if (now - cacheData.timestamp < CACHE_DURATION) {
                    document.getElementById('nodeCount').textContent = cacheData.nodeCount.toLocaleString();
                    console.log('Using cached node count:', cacheData.nodeCount);
                    return;
                }
            }
            
            // Cache expired or doesn't exist, fetch new data
            console.log('Fetching fresh node count data...');
            const nodeResponse = await fetch('https://bitnodes.io/api/v1/snapshots/latest/');
            const nodeData = await nodeResponse.json();
            const nodeCount = Object.keys(nodeData.nodes || {}).length;
            
            // Cache the new data
            const cacheData = {
                nodeCount: nodeCount,
                timestamp: Date.now()
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
            
            document.getElementById('nodeCount').textContent = nodeCount.toLocaleString();
            console.log('Updated node count cache:', nodeCount);
            
        } catch (error) {
            console.log('Error fetching node count:', error);
            
            // Try to use cached data even if expired as fallback
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const cacheData = JSON.parse(cached);
                document.getElementById('nodeCount').textContent = cacheData.nodeCount.toLocaleString() + ' (cached)';
                console.log('Using expired cache as fallback:', cacheData.nodeCount);
            } else {
                document.getElementById('nodeCount').textContent = 'Error';
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BitcoinStatus();
}); 