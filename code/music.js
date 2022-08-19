const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
var ask,id;
class fuc1
{
    constructor (client) {
       this.client = client;
    }
    activate () {
       logger.info('Music Success！');
    }
    
    async onGroupMessage (session)
    {

          if ((session.raw_message === '音乐' || session.user_id === ask) && (session.group_id === 795689584)) 
          {
                  if(session.raw_message!=='音乐')
                  {
                        var id=session.raw_message;
                        session.group.shareMusic("163",id);
                        id=0;
                  } 
                  else 
                  {
                      ask=session.user_id;
                      session.reply("告诉我这首歌的网易云id吧");
                  }

          }
    }
    
}
module.exports = fuc1;