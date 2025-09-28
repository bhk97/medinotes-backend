const ChunkModel = require('../models/chunk.model');

class ChunkService {
    static async saveChunk(sessionId, chunkNumber, filePath) {
        try {
            const chunk = new ChunkModel({ sessionId, chunkNumber, filePath });
            return await chunk.save();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ChunkService;
