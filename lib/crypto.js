import crypto from 'crypto';

const createHash = (data, salt = '') => {
    let hash = crypto.createHash('sha256');
    hash.update(data + salt);
    return hash.digest('hex');
  };
const compareHash = (attempted, stored, salt) => {
    return stored === createHash(attempted, salt);
  };
const createRandom32String = () => {
    return crypto.randomBytes(32).toString('hex');
  };

module.exports = { createHash, compareHash, createRandom32String };