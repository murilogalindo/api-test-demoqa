const request = require('supertest');
//API: https://demoqa.com/swagger/ 
// real path application
const app = require('../../integration/app');


module.exports = request(app);
