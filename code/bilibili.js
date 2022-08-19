const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;

var ask,id,title,img,desc,owner,json;

function sleep(ms){
  var start=Date.now(),end = start+ms;
  while(Date.now() < end);
  return;
}

class bilibili
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('BiliBili组件加载成功！');
    }
    async onGroupMessage (session)
    {
      if ((session.group_id === 795689584)) 
      {
            if(session.raw_message.indexOf('BV')!=-1)
            {
            var id=session.raw_message;
            var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
            var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
            httpRequest.open('GET', 'http://api.bilibili.com/x/web-interface/view?bvid='+id, true);//第二步：打开连接  将请求参数写在url中  ps:"http://localhost:8080/rest/xxx"
            httpRequest.send();
            httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                      json = httpRequest.responseText;
                      var tt= eval("(" + json + ")");
                      title = tt["data"]["title"]+'\n';
                       desc = tt["data"]["desc"]+'\n';
                       img = tt["data"]["pic"];
                       owner = 'Up主:'+tt["data"]["owner"]["name"]+'\n';
                        id=0;
                    var path = 'https://bilibili.com/video/'+session.raw_message;
                    const { segment } = require("oicq")
                      const me = [
                      segment.image(img),
                      title,
                      owner,
                      desc,
                      path
                      ]
                      session.reply(me);     
                }
              }
              } 
            }
    }
}
module.exports = bilibili;
// http://api.bilibili.com/x/web-interface/view?bvid=BV17f4y1G7JU