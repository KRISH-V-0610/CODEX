import jwt from 'jsonwebtoken'

export const generateToken = (userId,res)=>{

  const token = jwt.sign({userId},process.env.JWT_SECRET_KEY)

  res.cookie("token",token,{
    httpOnly: true,//prevents XSS attacks cross-site scripting attacks
    secure: process.env.NODE_ENV === "production" ? true : false, // true for https
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // dynamic for localhost vs deployment
    secure: true, // set false only in localhost
    sameSite: "None", // "Strict" for localhost, "None" for cross-site
    // sameSite: "strict" // "strict" or "lax" CSRF protection 
  })

  return token;
}


