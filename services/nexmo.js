const Nexmo = require('nexmo');
const config = require('../config')

const instance = new Nexmo({
  apiKey: config.nexmo.apiKey,
  apiSecret: config.nexmo.apiSecret,
})

module.exports = {
  nexmo: instance,
  
  /**
   * sendNotification
   * @param {String} hostPhone Host phone
   * @param {String} visitorName Visitor name
   */
  sendNotification: (hostPhone, visitorName) => new Promise((resolve, reject) => {
    const msg = `Hola!, ${visitorName} te está esperando en la recepción`;
    const opts = { type: 'unicode' }
    instance.message.sendSms(config.nexmo.brandName, hostPhone, msg, opts (err, response) => {
      if(err) reject({ err });
      else if (response.messages[0].status === '0') resolve({ phone: hostPhone })
      else reject({ response })
    });
  })
}
