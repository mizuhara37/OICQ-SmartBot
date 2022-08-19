const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const axios = require('axios');
const dayjs = require('dayjs');
const storage = new LocalStorage('./say');
var hour,min,i;
class time
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('Time Success！');
    }
    
    async onGroupMessage (session)
    {
        if(session.user_id==2854196310)
        {
            if(session.raw_message.indexOf('夜深人静')!=-1)
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
               s2='\n可达鸭今日已经发言' +a+'次\n\n群成员:\n'+s;
               session.reply('美好的一天有结束了，今天谁话最多呢？\n'+s2+'次\n\n好了，晚安...');
            }
            else
            if(session.raw_message.indexOf('你今天努力了吗')!=-1)
            {
                session.reply('早上好，各位');
                var justnow = dayjs().format('YYYY-MM-DD');
                session.reply('距离中考还有 '+dayjs('2023-6-17').diff(justnow, 'day')+' 天');
                var intro='',name='',zk='',date='',s,s1,s2,s3,i,早上,晚上,星期,最高温度,最低温度,风向,风速,日期;
                var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
                var httpRequest1 = new XMLHttpRequest();
                httpRequest1.open('GET', 'https://api.seniverse.com/v3/weather/daily.json?key=S4STumWS1Tkfdn8t3&location=ningbo&language=zh-Hans&unit=c&start=-1&days=2', true);
                httpRequest1.send();
                httpRequest1.onreadystatechange = function () {
                if (httpRequest1.readyState == 4 && httpRequest1.status == 200) {
                    var json = httpRequest1.responseText;
                // session.reply(json);
                var len=json.length,i;
                intro='下面为您播报今天的天气预报。';
                s='';
                var wz=json.indexOf("date");
                for(i=wz+7;i<len;i++)
                {
                    if(json[i]=='"') break;
                     else s=s+json[i];
                }
                日期=s;
                // console.log(s);
                s='';
                var wz=json.indexOf("text_day");
                for(i=wz+11;i<len;i++)
                {
                    if(json[i]=='"') break;
                     else s=s+json[i];
                }
                早上=s;
                // console.log(早上);
                s='';
                var wz=json.indexOf("text_night");
                for(i=wz+13;i<len;i++)
                {
                    if(json[i]=='"') break;
                     else s=s+json[i];
                }
                晚上=s;
                // console.log(晚上);
                s='';
                var wz=json.indexOf("high");
                for(i=wz+7;i<len;i++)
                {
                    if(json[i]=='"') break;
                     else s=s+json[i];
                }
                最高温度=s;
                // console.log(最高温度);
                s='';
                var wz=json.indexOf("low");
                for(i=wz+6;i<len;i++)
                {
                    if(json[i]=='"') break;
                     else s=s+json[i];
                }
                最低温度=s;
                // console.log(最低温度);
                s='';
                var wz=json.indexOf("wind_direction");
                for(i=wz+17;i<len;i++)
                {
                    if(json[i]=='"') break;
                     else s=s+json[i];
                }
                风向=s;
                // console.log(风向);
                s='';
                var wz=json.indexOf("wind_speed");
                for(i=wz+13;i<len;i++)
                {
                    if(json[i]=='"') break;
                     else s=s+json[i];
                }
                风速=s;
                s1='        '+intro+'\n        今天是'+日期+'白天天气'+早上+'，夜晚天气'+晚上+'。\n        今天最高温度'+最高温度+'°C，最低温度'+最低温度+'°C。\n        风速'+风速+'km/h，'+'风向'+风向+'。\n';
                session.reply(s1);
                session.reply('"盛年不重来，一日难再晨"，快为你追求的理想而奋斗吧!');
            }    
        }
      }
        }
    }
    
}
module.exports = time;