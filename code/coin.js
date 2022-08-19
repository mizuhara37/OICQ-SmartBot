const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const storage = new LocalStorage('./bank');
const storage2 = new LocalStorage('./say');
var ask,id,ask2,id2;
class Coin
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('Coin组件加载成功！');
    }
   //  Test  Group 748571332
   addcoin (x,id) {
    let list = storage.getItem('coin');
    if (!list) storage.setItem('coin', '{}');
    list = JSON.parse(list);
    const attempt = list[id];
    
    if (!attempt) {
        list[id] = x;
        storage.setItem('coin', JSON.stringify(list));
        return x;
    }
    list[id] = attempt + x;
    storage.setItem('coin', JSON.stringify(list));
    // return attempt + 1;
}
   attempt (id,name) {
      let list = storage.getItem('username');
      if (!list) storage.setItem('username', '{}');
      list = JSON.parse(list);
      const attempt = list[id];
      
      if (!attempt) {
          list[id] = name;
          storage.setItem('username', JSON.stringify(list));
          return name;
      }
      list[id] = name;
      storage.setItem('username', JSON.stringify(list));
      return name;
  }
    async onGroupMessage (session)
    {
      if(session.group_id === 795689584)
      {
            this.attempt(session.user_id,session.nickname);
      }
      if((session.raw_message === '档案' || session.raw_message === '我的' || session.raw_message === '财产') && session.group_id === 795689584)
      {
            let list = storage.getItem('coin');
            if (!list) storage.setItem('coin', '{}');
            var id = session.user_id;
            list = JSON.parse(list);
            var you = list[id];
            if(you == null) you = 0;
            let list2 = storage.getItem('named');
            if (!list2) storage.setItem('named', '{}');
            var id = session.user_id;
            list2 = JSON.parse(list2);
            var named = list2[id];
            if(named == null) named = '';
                        else named = '['+named+']';
            let list3 = storage2.getItem('user');
            if (!list3) storage.setItem('user', '{}');
            var id = session.nickname;
            list3 = JSON.parse(list3);
            var saying = list3[id];
            if(saying==null) saying='0';
            session.reply(named+'  '+session.nickname+"\n你目前拥有"+you+'个迈阿密西西比特币\n你今天已经发了'+saying+'次言了');
      }
      else
      if ((session.raw_message === '看ta档案' || session.raw_message === '看ta' || session.raw_message === '看ta财产'|| session.user_id === ask) && (session.group_id === 795689584)) 
          {
                  if(session.raw_message != '看ta档案' && session.raw_message != '看ta' && session.raw_message != '看ta财产')
                  {
                        var userid=session.raw_message;
                        
                        let li = storage.getItem('username');
                        li = JSON.parse(li);
                        var nickname = li[userid];
                        if(nickname==null) nickname = '此人未发言找不到ta的用户名';

                        let list = storage.getItem('coin');
                        if (!list) storage.setItem('coin', '{}');
                        var id = userid;
                        list = JSON.parse(list);
                        var you = list[userid];
                        if(you == null) you = 0;

                        let list2 = storage.getItem('named');
                        if (!list2) storage.setItem('named', '{}');
                        var id = userid;
                        list2 = JSON.parse(list2);
                        var named = list2[id];
                        if(named == null) named = '';
                        else named = '['+named+']  ';

                        let list3 = storage2.getItem('user');
                        if (!list3) storage.setItem('user', '{}');
                        var id = nickname;
                        list3 = JSON.parse(list3);
                        var saying = list3[id];
                        if(saying==null) saying='0';

                        session.reply(named+nickname+"\nTa目前拥有"+you+'个迈阿密西西比特币\nTa今天已经发了'+saying+'次言了');
                        userid=0;
                        ask=0;
                  } 
                  else 
                  {
                      ask=session.user_id;
                      session.reply("那个人的QQ号");
                  }

          }
          else if((session.raw_message === '抽奖' || session.user_id === ask2)&& session.group_id === 795689584)
          {
                
                let list = storage.getItem('coin');
                        if (!list) storage.setItem('coin', '{}');
                        userid=session.user_id;
                        var id = userid;
                        list = JSON.parse(list);
                        var you = list[userid];
                        if(you == null) you = 0;
                if(you-50<0) session.reply('你没有足够的MWBC');
                else
                {session.reply('哈哈害来咯,抽奖将花费50MWBC');
                  var x = 1,y = 1000,FR = 0;
                  var r=Math.round(Math.random()*(y-x)+x);
                  var FRqwq=new Array;
                  for(var i=0;i<1000;i++){
                    FRqwq[i]=i+1;
                  }
                  FRqwq.sort(function(){ 
                    return 0.5 - Math.random(); }
                  );
                  for(var i=0;i<500;i++){
                    if(r==FRqwq[i]){
                      r=1;FR=1;break;
                    }
                  }
                  if(FR!=1){
                    for(var i=500;i<900;i++){
                      if(r==FRqwq[i]){
                        r=2;FR=1;break;
                      }
                    }
                  }
                  if(FR!=1)r=3;
                  if(r==1)
                  {
                     session.reply('抱歉您没抽中...');
                     this.addcoin(-50,session.user_id);
                  }
                  else
                  if(r==2)
                  {
                    session.reply('您获得了175个MWBC');
                    this.addcoin(125,session.user_id);
                  }
                  else
                  {
                    session.reply('您获得了500个MWBC');
                    this.addcoin(450,session.user_id);
                  }
                }
                
          }
    }
}
module.exports = Coin;