// const { handleError } = require("../utils/handleErrors");
// const { verifyToken } = require("./Providers/jwt");

// const tokenGenerator = process.env.TOKEN_GENERATOR;

// const auth = (req, res, next) => {
//   if (tokenGenerator === "jwt") {
//     try {
//       const tokenFromClient = req.header("x-auth-token");
//       if (!tokenFromClient)
//         throw new Error("Authentication Error: Please Login");

//       const userInfo = verifyToken(tokenFromClient);
//       if (!userInfo) throw new Error("Authentication Error: Unauthorize user");

//       req.user = userInfo;
//       return next();
//     } catch (error) {
//       return handleError(res, 401, error.message);
//     }
//   }
//   return handleError(res, 500, "Noo Noo Noo... you did not use jwt!");
// };

// module.exports = auth;
const { handleError } = require("../utils/handleErrors");
const { verifyToken } = require("./Providers/jwt");

const tokenGenerator = process.env.TOKEN_GENERATOR;

const auth = (req, res, next) => {
  if (tokenGenerator === "jwt") {
    try {
      const tokenFromClient = req.header("x-auth-token");
      // console.log("Received token:", tokenFromClient);//to close console.log
     
      if (!tokenFromClient)
        throw new Error("Authentication Error: Please Login");

      const userInfo = verifyToken(tokenFromClient);
      // console.log("Decoded user info:", userInfo);//to close console.log
      if (!userInfo) throw new Error("Authentication Error: Unauthorize user");

      // Assuming your JWT payload includes an 'isSeller' field
      const { _id, username, isSeller } = userInfo;

      // Set user information including 'isSeller' in req.user
      req.user = {
        _id,
        username,
        isSeller,
      };

      return next();
    } catch (error) {
      return handleError(res, 401, error.message);
    }
  }
  return handleError(res, 500, "Noo Noo Noo... you did not use jwt!");
};

module.exports = auth;
