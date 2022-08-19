const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const axios = require('axios');
const dayjs = require('dayjs');
class yiyan
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('Yiyan Success！');
    }

    async onGroupMessage (session)
    {
      if ((session.raw_message === '一言') && (session.group_id === 795689584)) 
      {
          {
                var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
                var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
                httpRequest.open('GET', 'https://v1.hitokoto.cn/?c=a&c=b&c=i&c=k', true);//第二步：打开连接  将请求参数写在url中  ps:"http://localhost:8080/rest/xxx"
                httpRequest.send();
                httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                var json = httpRequest.responseText;
                var len=json.length;
                var s;
                var wz,i;
                s='';
                var wz=json.indexOf("hitokoto");
                for(i=wz+11;i<len;i++)
                {
                    if(json[i]=='"') break;
                     else s=s+json[i];
                }
                var yiyan=s;
                s='';
                var wz=json.indexOf("from");
                for(i=wz+7;i<len;i++)
                {
                    if(json[i]=='"') break;
                     else s=s+json[i];
                }
                var from=s;
                s='';
                var wz=json.indexOf("from_who");
                for(i=wz+11;i<len;i++)
                {
                    if(json[i]=='"') break;
                     else s=s+json[i];
                }
                var who=s;
                if(who==='ull,') who='';
                session.reply('        '+yiyan+'\n         ---《'+from+'》'+who);
            }
        };
        }
        
    }
    }
    
}
module.exports = yiyan;