import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '7d', // Optional: Token expiration
  });

  res.cookie('token', token, {
    httpOnly: true,            // Prevents XSS attacks
    secure: true,              // Send only over HTTPS
    sameSite: 'None',          // Allow cross-site (for frontend-backend on different domains)
  });

  return token;
};
