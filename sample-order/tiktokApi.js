const axios = require('axios');

class TikTokApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.tiktok.com/shop/v1'; // Replace with actual TikTok Shop API base URL
  }

  async getOrders() {
    try {
      const response = await axios.get(`${this.baseUrl}/orders`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
}

module.exports = TikTokApi;