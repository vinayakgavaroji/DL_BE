const fs = require('fs');

let errorLogger = (err, req, res, next) => {
  let errorlogged = "" + new Date() + " " + err.stack + "\n";
  if(err){
    fs.appendFile('error.log', errorlogged, (err) => {
      if(err) return err;
    })
    if(err.status){
      res.status(err.status);
    }else{
      res.status(500);
    }
    res.json({message: err.message})
  }
  next();
}

module.exports = errorLogger;