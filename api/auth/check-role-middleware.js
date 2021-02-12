//like a middleware factory - function that creates middleware function
//this function takes in 'role' parameter and returns a new function
module.exports= role=> {
    return function(req,res,next){
        if(((req?.decodedJWT?.role) || "") === role){
            next()
        }else{
            res.status(403).json({message: "sorry not authorized"})
        }
    }
}