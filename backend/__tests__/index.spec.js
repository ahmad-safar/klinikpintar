const request = require("supertest");
const { app } = require('../dist/app')

describe("Test the root path", () => {
    test("It should return 'Hello World!'", async () => {
        const res = await request(app)
            .get('/')

        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual('Hello World!')
    });
});
