const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;

class ai
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('AI Success！');//
    }
    
    async onGroupMessage (session)
    {var id,ask;
var r;
      var x = 1,y = 100;
      r=Math.round(Math.random()*(y-x)+x);
      if (((session.raw_message === 'AI')|| session.user_id=== ask || (r==37)) &&(session.group_id === 795689584)) 
      {
        if(session.raw_message!=='AI')
        {
              var id=session.raw_message;
              ask=0;
              var x = 1,y = 2;
              r=Math.round(Math.random()*(y-x)+x);
              if(r==1)
              {
                 var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
                 var httpRequest = new XMLHttpRequest();
                 var s='';
                 httpRequest.open('GET', 'https://api.ownthink.com/bot?appid=xiaosi&userid=user&spoken='+encodeURI(session.raw_message), true);
                 httpRequest.send();
                 httpRequest.onreadystatechange = function () {
                 if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                      var json = httpRequest.responseText;
                      var s=json;
                      var len=s.length;
                      var wz= json.indexOf("text");
                      var i;
                      s='';
                      for(i=wz+8;i<len;i++)
                      {
                           if(json[i]=='"') break;
                             else s=s+json[i];
                      }
                      session.reply(s);
                  }
              };
              }
              else
              {
                var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
                 var httpRequest = new XMLHttpRequest();
                 var s='';
                 httpRequest.open('GET', 'https://api.ownthink.com/kg/knowledge?entity='+encodeURI(session.raw_message), true);
                 httpRequest.send();
                 httpRequest.onreadystatechange = function () {
                 if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                      var json = httpRequest.responseText;
                      var s=json;
                      var len=s.length;
                      var wz= json.indexOf("desc");
                      var i;
                      s='';
                      for(i=wz+8;i<len;i++)
                      {
                           if(json[i]=='"') break;
                             else s=s+json[i];
                      }
                      if(s=='message') session.reply('我不知道欸');
                      else session.reply(s);
                  }
              };
              }
             
        } 
        else 
        {
            ask=session.user_id;
            session.reply("你要问什么");
        }
       
    }
    }
}
module.exports = ai;