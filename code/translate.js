const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
var ask;
class translate
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('翻译组件加载成功！');
    }
    async onGroupMessage (session)
    {
        if((session.raw_message=== '翻译' || session.user_id=== ask) && (session.group_id === 795689584)) 
        {
            if(session.raw_message!=='翻译')
            {
              ask=0;
                 var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
                 var httpRequest = new XMLHttpRequest();
                 var s='';
                 httpRequest.open('GET', 'http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i='+encodeURI(session.raw_message), true);
                 httpRequest.send();
                 httpRequest.onreadystatechange = function () {
                 if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                      var json = httpRequest.responseText;
                      var s=json;
                      var len=s.length;
                      var wz= json.indexOf("tgt");
                      var i;
                      s='';
                      for(i=wz+6;i<len;i++)
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
            ask=session.user_id;
            session.reply("你要翻译什么");
        }
    }
    }
}
module.exports =  translate;