const Account = require("../models/Account");

// [GET] /api/account/login
exports.checkLogin = async (req, res, next) => {
  try {
    const [account, _] = await Account.findOne(req.body.username);
    const [acc] = account;
    if (acc) {
        req.body = {
            idaccount : acc.idaccount,
            username : acc.username,
            password : acc.password,
            permission : acc.permission,
        }
        next()
    }else{
        res.status(403).send("KHON TON TAI TAI KHOANG NAY");
    }
  } catch (err) {
    next({
      message: "ERROR IS NOT VALID",
      method: req.method,
      error: err.message = "ERROR IS NOT VALID",
    });
  }
};
// [GET] /api/account/login
exports.admin = async(req,res , next) => {
    const permission = req.body.permission ;
    if(permission === 'admin') {
        const [accounts , _] = await Account.find();
        const customers = accounts.filter((x) => x.permission !== permission );
        res.status(200).json({ admin:req.body , customers: {results:
            customers
       } });
    }else{
        next();
    }
   
}
// [POST] /api/account/signup
exports.login = async (req, res, next) => {
     res.status(200).json(req.body);
};

// Check sign up
// [POST] /api/account/signup
exports.checkSignUp = async( req,res,next) => {
    try {
          const [account, _] = await Account.findOne(req.body.username);
          if(account[0]) {
                res.status(401).send("USERNAME DA TON TAI");
          }else{
             next();
          }
    }catch(err) {
        next("ERROR SERVER");
    }
}

// sign up
// [POST] /api/account/signup
exports.signup = async(req, res,next) => {
    const {username , password} = req.body;
        try {
            const newAccount = new Account(username,password);
             await newAccount.save();
            res.status(200).json("SIGN UP SUCCESSFUL");
        }  catch(err) {
            next(err);
        }      
}

exports.account = async (req,res,next) => {
    const [accounts , _] = await Account.find();
    res.status(200).json(accounts);
}

// [GET]/api/login 
//[POST]/api/signup 
exports.error = async (err, req, res, next) => {
  res.status(401).json(err);
};

