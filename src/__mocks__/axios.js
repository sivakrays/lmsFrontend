export default {
    create: jest.fn(() => ({
    get: jest.fn(()=> Promise.resolve({data:{}})),
    post : jest.fn(()=> Promise.resolve({data:{}})),
    interceptors: {
      request: {
        use: jest.fn(),
      },
      response: {
        use: jest.fn(),
      },
    },
    }))
   
};

