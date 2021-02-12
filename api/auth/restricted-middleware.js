const jwt=require('jsonwebtoken');
 
const secrets=require('../config/secrets');

module.exports = (req, res, next) => {
  // add code here to verify users are logged in

  //grab the token from header
  //expecting in client side:
  // Authorization:Bearer <token>
  // wl ?. save if headers.authorization is unassigned - can access deep in objects
  const token=req.headers?.authorization?.split(" ")[1];
  if(token){
    //verify against the secret
    jwt.verify(token,secrets.jwtSecret,(err,decodedToken)=>{
      if(err){
        res.status(401).json({message:"you can touch!"})
      }else{
        //save the decoded token in request
        req.decodedJWT=decodedToken;
        next()
      }
    })

  }else{
    res.status(401).json({message: "You can't pass!"})
  }
};
