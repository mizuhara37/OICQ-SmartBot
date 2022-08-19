const logger = require('../util/logger.js');
const config = require('../config.json');
const { readyException } = require('jquery');
const LocalStorage = require('node-localstorage').LocalStorage;
var last,cnt;
var s,command;
var match;
class Soccer
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('Admin组件加载成功！');
    }
    async onGroupMessage (session)
    {
       if((session.raw_message === '!admin shutdown') && (session.group_id === 795689584) && session.user_id === 3103819396)
       {
            process.exit();
       }
       else
       if((session.raw_message === '掉了') && (session.group_id === 795689584) && session.user_id === 3103819396)
       {
         session.reply('https://mizuhara37.github.io/page/');
       }
      
    }
}
module.exports = Soccer;