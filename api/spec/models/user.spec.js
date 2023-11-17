const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });
  
  it("can save a user", (done) => {
    const user = new User({
      email: "testsomeone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
        });



        done();
      });
    });
    it("updates a bio", (done) =>{
      const testUser = new User({
        email: "test email",
        password: 123
      })
      // i added on test
      testUser.updateOne(
        { _id: testUser.userId },
        { $set: { bio: "do a test" } }
      );
      expect(testUser.bio).toEqual('do a test')
      done();
    })
  });
});
