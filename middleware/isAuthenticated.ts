export{};
const jwt = require('jsonwebtoken');

function isAuthenticated(req: { headers: { [x: string]: any; }; userId: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; token?: any; error?: any; }): any; new(): any; }; }; }, next: () => void) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: { id: any; }) => {
    if (err) {
      return res.status(401).json({ message: 'Unautshorized', token: token, error:err });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = isAuthenticated;

