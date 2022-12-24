const Validator = require("fastest-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const v = new Validator();
const schema = {
  email: { type: "string", required: true },
  password: { type: "string", min: 6, max: 30, required: true },
};
const check = v.compile(schema);
exports.save = async (req, res) => {
  const userCreate = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role || "client",
  };

  const checked = check(userCreate);
  if (typeof checked === "object") {
    return res.status(200).json({
      message: "Created user failed",
      error: checked,
    });
  } else {
    const [userDb, _] = await User.findOne(userCreate.email);
    if (userDb && userDb[0]) {
      return res.json({
        message: "User already exists",
      });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userCreate.password, salt, (err, hash) => {
          if (hash) {
            userCreate.password = hash;
            const user = new User(
              userCreate.email,
              userCreate.password,
              userCreate.role
            );
            user.save()
            .then((user) => {
              return res
                .json({
                  message: "User created successfully",
                  user: user,
                })
                
            })
            .catch((err) => {
                return res.json({
                  message: "Error creating user",
                  error: err,
                });
              });
          } else {
            return res.status(404).json({
              message: "Error creating user",
            });
          }
        });
      });
    }
  }
};
exports.index = async (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        message: "Get users successfully",
        users: users[0],
        total_users: users[0].length,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error while getting users",
        error: err,
      });
    });
};

exports.show = async (req, res) => {
  const schema = {
    email: { type: "email", required: true },
  };
  const check = v.compile(schema);
  const checked = check({ email: req.body.email });
  if (typeof checked === "object") {
    return res.status(404).json({
      message: "Invalid ",
      error: checked,
    });
  } else {
    User.findOne(req.body.email)
      .then((user) => {
        res.status(200).json({
          message: "Get user successfully",
          user: user[0],
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error server",
          error: err,
        });
      });
  }
};

exports.update = async (req, res) => {
  const schema = {
    password: { type: "string", min: 6, max: 30, required: true },
  };
  const check = v.compile(schema);
  const checked = check({ password: req.body.password });

  if (typeof checked === "object") {
    return res.status(404).json({
      message: "Invalid ",
      error: checked,
    });
  } else {
    User.findOne(req.params.id).then((user) => {
      if (user && user[0]) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (hash) {
              User.update(hash, req.params.id).then((user) => {
                return res.status(200).json({
                  message: "Updated password successfully",
                  user: user[0],
                });
              });
            } else {
              return res.status(404).json({
                message: "Email not found or id not found",
              });
            }
          });
        });
      } else {
        return res.status(404).json({
          message: "Email not found",
        });
      }
    });
  }
};

exports.destroy = async (req, res) => {
  User.findOne(req.params.id).then((user) => {
    if (user && user[0]) {
      User.destroy(req.params.id)
        .then((result) => {
          if (result && result[0].affectedRows == 1) {
            return res.status(200).json({
              message: "Deleted user successfully",
              result: result[0],
            });
          } else {
            return res.status(400).json({
              message: "User id not found",
              result: result,
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error server",
            error: err,
          });
        });
    }else{
        return res.status(400).json({
            message: "User id not found",
            result: result,
          });
    }
  })
  .catch(err => {
    res.status(500).json({
        message: "Error server",
        error: err,
      });
  })
};

exports.login = async (req,res) => {
    
    const userLogin = {
        email : req.body.email,
        password:req.body.password
    }

    const checked = check(userLogin);
    if(typeof checked === 'object' ) {
        return res.status(200).json({
            message :"Invalid ",
            error:  checked
        })
    }else{
    User.findOne(req.body.email)
        .then(user => {
          
            if(user && user[0]) {
                    bcrypt.compare(req.body.password, user[0][0].password , (err, result) => {
                        if(result) {
                         
                            var token = jwt.sign({
                                email:user[0][0].email,
                                id : user[0][0].id
                            }, process.env.JWT_KEY, (err,token) => {
                             return  res.status(200).json({
                                    message:"Authentication successfully",
                                    token : token
                                })
                            })
                        }else{
                           return  res.status(404).json({
                                message:"Authentication failed",
                                result :result
                            })
                        }
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                message:"Error server",
                error : err
            })
        })
    }
}
