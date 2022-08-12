import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.Authorization.split(" ")[1];

    let decodedData = jwt.verify(token, "test");

    req.userId = decodedData?.id;

    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
