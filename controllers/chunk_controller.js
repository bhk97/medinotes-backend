const sessionModel = require('../models/session.model');
exports.uploadChunk = async (req, res, next) => {
  try {
    const { sessionId, chunkNumber } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ status: false, message: 'No file uploaded' });

    // Save chunk path in session
    const session = await sessionModel.findById(sessionId);
    if (!session) return res.status(404).json({ status: false, message: 'Session not found' });

    session.chunks.push({ chunkNumber: Number(chunkNumber), path: file.path });
    await session.save();

    res.status(200).json({ status: true, message: 'Chunk uploaded successfully', path: file.path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};
