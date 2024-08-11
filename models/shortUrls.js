const mongoose = require('mongoose');

// Use async function to dynamically import nanoid
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: async function () {
            const { nanoid } = await import('nanoid');
            return nanoid(10); // Generate a unique short URL with 10 characters
        }
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
});

// Ensure that the `short` field is populated before saving
shortUrlSchema.pre('save', async function(next) {
    if (!this.short) {
        const { nanoid } = await import('nanoid');
        this.short = nanoid(10);
    }
    next();
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
