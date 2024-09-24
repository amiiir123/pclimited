


const getBaseUrl = (req) => {
    const baseUrl = req.baseUrl || 'app'; // Fallback to '/app' if baseUrl is not defined
    return baseUrl
};

module.exports = getBaseUrl;
