const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }
    return this._process(message, key, 'encrypt');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }
    return this._process(encryptedMessage, key, 'decrypt');
  }

  _process(input, key, method) {
    const A = 65;
    const Z = 90;
    const ALPHABET_SIZE = 26;

    const inputUpper = input.toUpperCase();
    const keyUpper = key.toUpperCase();
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < inputUpper.length; i++) {
      const charCode = inputUpper.charCodeAt(i);
      if (charCode >= A && charCode <= Z) {
        const shift = keyUpper.charCodeAt(keyIndex % keyUpper.length) - A;
        const newCharCode =
          method === 'encrypt'
            ? ((charCode - A + shift) % ALPHABET_SIZE) + A
            : ((charCode - A - shift + ALPHABET_SIZE) % ALPHABET_SIZE) + A;
        result += String.fromCharCode(newCharCode);
        keyIndex++;
      } else {
        result += inputUpper[i];
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }

}

module.exports = {
  VigenereCipheringMachine
};
