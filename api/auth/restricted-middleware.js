const jwt=require('jsonwebtoken');
 
const secrets=require('../config/secrets');

module.exports = (req, res, next) => {
  // add code here to verify users are logged in

  //grab the token from header
  //expecting in client side:
  // Authorization:Bearer <token>
  // wl ?. save if headers.authorization is unassigned - can access deep in objects
  console.log('auth in restricted=',req.headers.authorization);
  const token=req.headers?.authorization?.split(" ")[1];
  if(token){
    //verify against the secret,
    //with the third param as call back that gives error and decodedToken
    jwt.verify(token,secrets.jwtSecret,(err,decodedToken)=>{
      if(err){
        res.status(401).json({message:"auth error! you can't touch!"})
      }else{//authorized user! here
        //save the decoded token in request - for other functions
        req.decodedJWT=decodedToken;
        next()
      }
    })

  }else{
    res.status(401).json({message: "Auth Error ! You can't pass!"})
  }
};
