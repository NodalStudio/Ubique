import { yahoo } from './lib/datafeed/yahoo.js';

// Example 1: Download historical data for AAPL
const options = { symbol: 'AAPL', from: '2015-01-02', to: '2015-01-08', period: 'd', fmt: 'YYYY-MM-DD' };
yahoo(options).then(data => {
  console.log(data);
}).catch(err => {
  console.error(err);
});
