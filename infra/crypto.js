const crypto = require("crypto");
const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    codificacao : "utf8",
    segredo : "grupo",
    tipo : "hex"
};


const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);


let crypt = function (senha) {
    const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    cipher.update(senha);
    return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
};


let decrypt = function (senha) {
    const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    decipher.update(senha, DADOS_CRIPTOGRAFAR.tipo);
    return decipher.final();
};

module.exports = {
    crypt:crypt,
    decrypt:decrypt
};