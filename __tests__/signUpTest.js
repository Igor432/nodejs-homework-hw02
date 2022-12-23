const { loginCtrl } = require("../controller/authController");
require("dotenv").config();
const { start } = require("../server");


describe("sign up text", () => {



    test("should check if sign up return token+user/subscription field", async() => {


        const mReq = {
            body: {
                'email': "batman666@gmail.com",
                'password': "batman666",
            },
        };

        const mRes = {

            status: function(status) {
                this.statusCode = status
                return this
            },
            json: function(data) {
                this.token = data.token
                this.user = data.user
            }
        }


        const mockNext = jest.fn();

        await loginCtrl(mReq, mRes, mockNext());

        expect(mRes.statusCode).toBe(200)
        expect(typeof(mRes.user)).toBe('object')
        expect(typeof(mRes.user.email)).toBe('string')
        expect(typeof(mRes.user.subscription)).toBe('string')
        expect(mockNext).toHaveBeenCalled()



        console.log(mRes.statusCode);
        console.log(mRes.token);
        console.log(mRes.user);



    });
});
