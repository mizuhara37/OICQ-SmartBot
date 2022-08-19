const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const storage2 = new LocalStorage('./bank');
var s,id;
var r,q,bot;
function sleep(ms){
  var start=Date.now(),end = start+ms;
  while(Date.now() < end);
  return;
}
class stjdb
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('猜拳组件加载成功！');
    }
    addcoin (x,id) {
      let list = storage2.getItem('coin');
      if (!list) storage2.setItem('coin', '{}');
      list = JSON.parse(list);
      const attempt = list[id];
      
      if (!attempt) {
          list[id] = x;
          storage2.setItem('coin', JSON.stringify(list));
          return x;
      }
      list[id] = attempt + x;
      storage2.setItem('coin', JSON.stringify(list));
      // return attempt + 1;
  }
    async onGroupMessage (session)
    {
      if((session.raw_message === '猜拳' || session.user_id === id) && (session.group_id === 795689584))
      {
          
          if(session.raw_message === '猜拳') {session.reply('猜拳 你只需回复 石头 剪刀 布');id = session.user_id;}
          else
          {
              s=session.raw_message;//1 石头 2 剪刀 3布
              if(s=='石头' || s=='剪刀' || s=='布')
              {
                  id = session.user_id;
                  var x = 1,y = 6000,FR= 0;
                  var FRqwq=new Array;
                  r=Math.round(Math.random()*(y-x)+x);
                  for(var i=0;i<6000;i++){
                    FRqwq[i]=i+1;
                  }
                  FRqwq.sort(function(){ 
                    return 0.5 - Math.random(); }
                  );
                  for(var i=0;i<2000;i++){
                    if(r==FRqwq[i]){
                      r=1;FR=1;break;
                    }
                  }
                  if(FR!=1){
                    for(var i=2000;i<4000;i++){
                      if(r==FRqwq[i]){
                        r=2;FR=1;break;
                      }
                    }
                  }
                  if(FR!=1)r=3;
                  id=0;
                  if(s=='石头') q=1;
                  else if(s=='剪刀') q=2;
                  else q=3;
                  if(r==1) bot='石头'
                  else if(r==2) bot='剪刀';
                  else bot='布';
                  if(r==1 && q==1) session.reply('平局(我出的是 '+bot+' )');
                  if(r==1 && q==2) {session.reply('你输了(我出的是 '+bot+' )');this.addcoin(-10,session.user_id);}
                  if(r==1 && q==3) {session.reply('你赢了(我出的是 '+bot+' )');this.addcoin(25,session.user_id);}
                  if(r==2 && q==1) {session.reply('你赢了(我出的是 '+bot+' )');this.addcoin(25,session.user_id);}
                  if(r==2 && q==2) session.reply('平局(我出的是 '+bot+' )');
                  if(r==2 && q==3) {session.reply('你输了(我出的是 '+bot+' )');this.addcoin(-10,session.user_id);}
                  if(r==3 && q==1) {session.reply('你输了(我出的是 '+bot+' )');this.addcoin(-10,session.user_id);}
                  if(r==3 && q==2) {session.reply('你赢了(我出的是 '+bot+' )');this.addcoin(25,session.user_id);}
                  if(r==3 && q==3) session.reply('平局(我出的是 '+bot+' )');
                  // var userid = session.user_id;
                  // let list = storage2.getItem('coin');
                  //       if (!list) storage2.setItem('coin', '{}');
                  //       var id = userid;
                  //       list = JSON.parse(list);
                  //       var you = list[userid];
                  //       if(you == null) you = 0;
                  // session.reply('@'+session.nickname+'，你目前拥有'+you+'个迈阿密西西比特币');
              }
              
          }
        
      }
    }
}
module.exports = stjdb;