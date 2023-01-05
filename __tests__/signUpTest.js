const { loginCtrl } = require("../controller/authController");
require("dotenv").config();
const { connectMongo, disconnectMongo } = require("../db/db");
const { User } = require("../service/schemas/userModel");


describe("test DB signUp", () => {
    beforeAll(async() => {
        await connectMongo();
    });

    afterAll(async() => {
        await disconnectMongo()
    });

    test("should check DB sign up", async() => {


        const mReq = {
            body: {
                email: "joker666@gmail.com",
                password: "joker666",
            },
        };

        const mRes = {
            status: function(status) {
                this.statusCode = status;
                return this;
            },
            json: function(data) {
                this.token = data.token;
                this.user = data.user;
            },
        };

        const mockNext = jest.fn();

        await loginCtrl(mReq, mRes, mockNext());

        const testUser = await User.findOne({ email: "joker666@gmail.com" });

        expect(mRes.statusCode).toBe(200)
        expect(testUser.email).toBe("joker666@gmail.com")
        expect(typeof(testUser)).toBe('object')
        expect(typeof(testUser.email)).toBe("string");
        expect(typeof(testUser.token)).toBe('string')
        expect(typeof(testUser.subscription)).toBe("string");
        expect(mockNext).toHaveBeenCalled();
        console.log(testUser)

    })
})