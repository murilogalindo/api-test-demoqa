const { default: expect } = require('expect')
const request = require('supertest')
const baseURLAc = 'https://demoqa.com/Account/v1';
const baseURLBo = 'https://demoqa.com/BookStore/v1';
//generate random number 
const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
let userID; // variable that will store the userId
let username; //variable that will store the username used when creating the user
let token; //variable to store the token generated in Generate Token

describe('Create User Test', () => {
  it('must create a new user with name and password', async () => {
    const resposta = await request(baseURLAc)
      .post('/User')
      .send({
        userName: `Murilo${random}`,
        password: '@Muri123456'
      });

      userID = resposta.body.userID
      username = resposta.body.username
    console.log(resposta.body);
    expect(resposta.status).toBe(201); 
    console.log("userID", userID)

     // Assert: Verify operators fields
     expect(resposta.body).toHaveProperty('userID');
     expect(resposta.body).toHaveProperty('username');
     expect(resposta.body).toHaveProperty('books'); 

     // Assert: Type filds
     expect(typeof resposta.body.userID).toBe('string');
     expect(typeof resposta.body.username).toBe('string');
     expect(Array.isArray(resposta.body.books)).toBe(true);

     console.log("User created successfully:", username, "-", userID);
 
     
  });
});

describe('Token generation test', () => {
    it('must generate an authentication token', async () => {
      const resposta = await request(baseURLAc)
        .post('/GenerateToken')
        .send({
          userName: `${username}`,
          password: '@Muri123456'
        });
  
      token = resposta.body.token
      console.log(resposta.body);
      expect(resposta.status).toBe(200); 
      
    // Assert: Expected structure
    expect(resposta.body).toHaveProperty('token');
    expect(resposta.body).toHaveProperty('expires');
    expect(resposta.body).toHaveProperty('status');
    expect(resposta.body).toHaveProperty('result');

    
      expect(resposta.body.status).toBe('Success');
      expect(resposta.body.result).toBe('User authorized successfully.');

      console.log(" Token gerado:", token);

    });
  });
  
  describe('Authorization test', () => {
    it('must check if the user is authorized', async () => {
      const resposta = await request(baseURLAc)
        .post('/Authorized')
        .send({
          userName: `${username}`,
          password: '@Muri123456'
        });
  
      console.log(resposta.body);
      expect(resposta.status).toBe(200); 

      //Assert 
      expect(resposta.body).toBe(true);

    });
  });
  describe('List Books Test', () => {
    it('must list all books in the system', async () => {
      const resposta = await request(baseURLBo)
        .get('/Books')
        
      console.log(resposta.body);
      expect(resposta.status).toBe(200); 
    });
  });
  describe('Book Store Test', () => {
    it('must check if the user is authorized', async () => {
      const resposta = await request(baseURLBo)
      .post('/Books')
      .set('Authorization', `Bearer ${token}`) //Bearer Token
      .send({
        userId: `${userID}`,
        collectionOfIsbns: [
          { isbn: '9781449365035' },
          { isbn: '9781491904244' }
        ]
      });
      console.log("token", token)
      console.log(resposta.body);
      expect(resposta.status).toBe(201); 
    });
  });
  describe('List Detail Books Test', () => {
    it('should list all books of a user', async () => {
      const resposta = await request(baseURLAc)
        .get('/User', `${userID}`)
        
      console.log(resposta.body);
      expect(resposta.status).toBe(200); 

    });
  });