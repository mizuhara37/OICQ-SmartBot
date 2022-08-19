const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const storage = new LocalStorage('./say');
const axios = require('axios');
const dayjs = require('dayjs');
 var xwsh=0;
 const attempt=0;
var id = [];
var cnt;
var xs;
class Say {
    constructor (client) {
        this.client = client;
    }
    
    refresh () {
        const now = dayjs().format('DD/MM/YYYY');
        if (now !== storage.getItem('date')) {
            storage.setItem('user', '{}');
            storage.setItem('psyduck','0');
            storage.setItem('seed', Math.round(Math.random() * 100));
            storage.setItem('date', now);
        }
    }
    
    attempt (id,name) {
      let list = storage.getItem('user');
      if (!list) storage.setItem('user', '{}');
      list = JSON.parse(list);
      const attempt = list[id];
      
      if (!attempt) {
          list[id] = 1;
          storage.setItem('user', JSON.stringify(list));
          return 1;
      }
      list[id] = attempt + 1;
      storage.setItem('user', JSON.stringify(list));
      return attempt + 1;
  }
    activate () {
        logger.info('Say Success');
    }
    async onGroupMessage (session) {
      if(session.group_id === 795689584)
      {
         var psyduck = '签到 一言 财产 夜深人静 今天你努力了吗 商店 猜拳 AI 翻译 骗我 moo 音乐 源码 许可证 发言榜 我的 档案';
         if(psyduck.indexOf(session.raw_message)!=-1)
         {
              var cnt=0;
              var s=session.raw_message;
              if(s == '签到') cnt++;
              else if(s == '一言') cnt++;
              else if(s == '财产' || s=='moo' || s=='源码' || s=='许可证' || s=='发言榜' || s=='档案' || s=='我的') cnt++;
              else if(s.indexOf('夜深人静')!=-1) cnt=cnt+1;
              else if(s.indexOf('今天你努力了吗')!=-1) cnt=cnt+5;
              else if(s=='商店' || s=='AI' || s=='猜拳' || s=='翻译' || s=='骗我' || s=='音乐' || s=='抽奖') cnt=cnt+2;
              var a = parseInt(storage.getItem('psyduck'));
              storage.setItem('psyduck',(a+cnt));
              // else if(s=='')
         }
         this.refresh();
         var i;
         const attempt = await this.attempt(session.nickname);
         if(session.raw_message === '发言榜')
         {
          let list = storage.getItem('user');
          if (!list) storage.setItem('user', '{}');
          list = JSON.parse(list);
          var jsonStr = JSON.stringify(list);
          var s='',s2='';
          var a = parseInt(storage.getItem('psyduck'));
          for(i=0;i<jsonStr.length;i++)
            if(jsonStr[i]==',') s=s+'次\n';
             else if (jsonStr[i]==':') s=s+'  '+jsonStr[i]+'  ';
             else if(jsonStr[i]!=='{' && jsonStr[i]!=='"' && jsonStr[i]!=='}') s=s+jsonStr[i];
              session.reply('可达鸭今日已经发言' +a+'次\n\n群成员:\n'+s+'次');
         }
    }
  }
}
  module.exports = Say;