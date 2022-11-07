const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const router = express.Router();

const Account = require("../models/accounts");

router.get("/", (request, response) => {
  Account.find().then((data) => {
    response.send(data);
  });
});

router.get("/:status", (request, response) => {
  Account.find({ status: request.params.status }).then((data) => {
      if (request.params.status == "active") {
        response.send(data);
      }

      if (request.params.status == "inactive") {
        response.send(data);
      }
  });
});

router.get("/show-account/:id", (request, response) => {
  Account.findOne({ _id: request.params.id }).then((data) => {
    response.send(data);
  });
});

router.post("/auth-user", async (request, response) => {
  try {
    const id = await _parseIdFromToken(request.body.token);

    const user = await _getUser({
      _id: id
    });

    response.status(200).send({
      user: user
    });
  } catch (exception) {
    console.log(exception);
    response.status(400).send({error: "Error fetching user details"});
  }
});

router.post("/login", async (request, response) => {
  try {
    const user = await _getUser({accountUserName: request.body.accountUserName});

    await _validateUserLogin(request.body.accountPassword, user);

    const token = jwt.sign({
      userId: user._id
    }, 
    "RANDOM-TOKEN",
    { expiresIn: "24h" });

    response.status(200).send({
      message: "Login Successful",
      token,
    });

  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});

router.post("/", async (request, response) => {
  console.log(request);
  try {
    await _validateNewUser(request);

    const encryptedPassword = await _encryptPassword(request.body.accountPassword);
    const date = new Date().toLocaleString();

    // request.body.createdAt = date;
    const newAccount = new Account(request.body);
    newAccount.accountPassword = encryptedPassword;
    newAccount.status = "active";
    newAccount.createdAt = date;

    await newAccount.save().then((account) => {
      if (account._id) {
        response.status(201).send({account: account, message: "Account Registered"});
      } else {
        response.status(400).send({error: "Request failed."});
      }
    });
  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});

router.put("/edit-account/:id", (request, response) => {
  let error = new Error('AccountUpdateException');
  error.message = 'Error in updating account';

  try {
    const date = new Date().toLocaleString();
    request.body.updatedAt = date;

    Account.updateOne({ _id: request.params.id }, [{ $set: request.body}]).then((data) => {
      console.log(data);
      if (data.modifiedCount > 0) {
        response.status(201).send({message: "Account Updated"});
      } else {
        throw error;
      }
    });
  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});

router.put("/inactivate-account/:id", (request, response) => {
  let error = new Error('AccountUpdateException');
  error.message = 'Error in updating account';

  try {
    const date = new Date().toLocaleString();
    request.body.updatedAt = date;
    request.body.status == "inactive"

    Account.updateOne({ _id: request.params.id }, [{ $set: request.body}]).then((data) => {
      console.log(data);
      if (data.modifiedCount > 0) {
        response.status(201).send({message: "Account Updated"});
      } else {
        throw error;
      }
    });
  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});

router.delete("/:id", (request, response) => {
  try {
    Account.deleteOne({ _id: request.params.id }).then((data) => {
      if (data.deletedCount > 0) {
        response.status(202).send({message: "Account Deleted"});
      } else {
        throw error;
      }
    });
  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});

/**
 * This function validates user if already existing
 * @param {Object} request 
 * @throws {Error} User already exist
 */
const _validateNewUser = async (request) => {
  await Account.findOne({
    lastName: request.body.lastName,
    firstName: request.body.firstName,
    middleName: request.body.middleName,
    suffix: request.body.suffix,
    birthDate: request.body.birthDate,
  }).then((data) => {
    if (data !== null) {
      const error = new Error('UserRegistrationException');
      error.message = 'User already exist';
      throw error;
    }
  });
};

/**
 * This function encrypts the given password
 * @param {string} password 
 * @throws {Error} Error encrypting password 
 */
const _encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10).
    then((hashedPassword) => {
      return hashedPassword;
    }).
    catch((err) => {
      console.log(err);
      const error = new Error('UserRegistrationException');
      error.message = 'Error encrypting password';
      throw error;
    })
};

/**
 * This function fetches the user from the Database
 * @param {Object} condition 
 * @returns {Object} user
 */
const _getUser = async (condition) => {
  return await Account.findOne(condition).then((user) => {
    if (user !== null) {
      return user;
    }

    const error = new Error('UserLoginException');
    error.message = 'Invalid Username, no user found';
    throw error;
  }).catch((err) => {
    const error = new Error('UserLoginException');
    error.message = 'Invalid Username, no user found';
    throw error;
  });
};

/**
 * This function validates the entered password with the hashed password from the database
 * @param {string} password
 * @param {Object} user 
 * @throws {UserLoginException} Incorrect Password
 */
const _validateUserLogin = async (password, user) => {
  const result = await bcrypt.compare(password, user.accountPassword);
  
  if (!result) {
    const error = new Error('UserLoginException');
    error.message = 'Incorrect Password!';
    throw error;
  }
};

const _parseIdFromToken = async (authToken) => {
  const decoded = jwt_decode(authToken, {header: false});

  if (decoded.userId) {
    return decoded.userId
  }
  
  const error = new Error('AuthenticationException');
  error.message = 'Invalid Authentication Token';
  throw error;
};

module.exports = router;