const jwt =require("jsonwebtoken");

const secret = 'test';

module.exports.auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if(token)
    {
      const isCustomAuth = token?.length < 500;

      let decodedData;
  
      if (token && isCustomAuth) {      
        decodedData = jwt.verify(token, secret);
  
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
  
        req.userId = decodedData?.sub;
      }    
  
      next();
    }else{
      res.status(401).json({success:false,message:'Auth token missing'});
    }
    
  } catch (error) {
    //console.log(error);
    res.status(401).json({success:false,message:error.message});
  }
};
