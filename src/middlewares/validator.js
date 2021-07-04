const UserModule = require('../models/users');

const bcrypt = require('bcrypt');
const base64 = require('base-64');

module.exports = async (req, res, next) => {
  /*
    req.headers.authorization is : "Basic sdkjdsljd="
    To get username and password from this, take the following steps:
      - Turn that string into an array by splitting on ' '
      - Pop off the last value
      - Decode that encoded string so it returns to user:pass
      - Split on ':' to turn it into an array
      - Pull username and password from that array
  */

      let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
      let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
      let decodedString = base64.decode(encodedString); // "username:password"
      let [username, password] = decodedString.split(':'); // username, password

    try
    {
        const user = await UserModule.findOne({ username: username })
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            req.user=user
         next()
        }
        else {
            
        next(" ")
        res.status(401).json({error:"invalid credantiols"});

        }
    }

    catch(e)
    {
        res.status(401).json({error:e.message});

    }
    
  };