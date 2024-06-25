const jwt = require("jsonwebtoken");


 module.exports = function auth(req,res,next){
    const token = req.header("x-Token-aout");
    if(!token){
        return res.status(401).send("Yetkiniz Yok!")
    }

    try{
      const decodedToken = jwt.verify(token,"jwt")
      req.user = decodedToken;
      next();

    }
    catch(exx){
        res.status(400).send("hatalı token")
    }

}