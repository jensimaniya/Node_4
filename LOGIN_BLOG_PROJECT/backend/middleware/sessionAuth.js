const Session = require('../models/Session');

module.exports = async function(req, res, next){
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Session ')) {
    return res.status(401).json({ message: 'No session' });
  }
  const sessionId = auth.split(' ')[1];
  try {
    const session = await Session.findById(sessionId).populate('userId');
    if (!session) return res.status(401).json({ message: 'Invalid session' });
    req.user = session.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid session' });
  }
};
