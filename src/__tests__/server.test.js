('use strict');
const supergoose = require('@code-fellows/supergoose');
const {server} = require('../server');
//Accessing app to have the ability to send mockRequests
const mockRequest = supergoose(server);
describe('API Server', () => {

  let testId=0
  let data={}


  it('add user', async () => {

     data={
        "username":"bahsssaaaer",
    "password":"123456626"
    }
    const result = await mockRequest.post('/user/signup').send(data);
testId=result.body._id
console.log(testId)

    expect(result.status).toEqual(201);

  })

  it('Sign in', async () => {

 
   const result = await mockRequest.post('/user/signin')
   .auth('bahsssaaaer', '123456626')

testId=result.body._id
console.log(testId)

   expect(result.status).toEqual(200);

 })


 

});
