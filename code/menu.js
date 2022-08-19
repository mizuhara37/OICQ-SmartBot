const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
var ask,id;
const storage2 = new LocalStorage('./bank');



class menu
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('Menu&Store组件加载成功！');
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
        if(session.group_id === 795689584)
        {
            if(session.raw_message==='菜单' || session.raw_message === '指令')
            {
                var s=`
菜单

一.热门
      1.签到(Remade)
      2.一言(Remade)
二.迈阿密西西比特币
      1.财产 / 我的 / 档案(New)
      2.商店(New)
      3.抽奖(New)
      4.看ta / 看ta档案 / 看ta财产
三.工具箱
      1.翻译
      2.AI
      3.发言榜(Remade)
四.娱乐
      1.音乐
      2.猜拳
      3.骗我(Remade)
      4.拍拍我
      5.moo
      6.do
五.自动化
      1.早起(New)
      2.夜深人静(New)
      3.今天你努力了吗(New)
      4.B站视频(New)
六.关于我
      1.源码
      2.许可证
                `
                session.reply(s);
            }
            else if ((session.raw_message === '商店' || session.user_id === ask) && (session.group_id === 795689584)) 
            {
                    if(session.raw_message!=='商店')
                    {
                          let list = storage2.getItem('coin');
                           if (!list) storage2.setItem('coin', '{}');
                          list = JSON.parse(list);
                          var coin = list[session.user_id];
                          var id=session.raw_message;
                          if(id === '管理员一周')
                          {
                              if(coin-1500<0)
                              {
                                  session.reply("你没有足够的MWBC");
                              }
                              else
                              {
                                this.addcoin(-1500,session.user_id);
                              session.reply('购买成功!请发送截图\n你目前还剩'+(coin-1500)+'个MWBC');
                              }
                              
                          }
                          else
                          if(id === '称号')
                          {
                            if(coin-100<0)
                            {
                              session.reply("你没有足够的MWBC");
                            }
                            else
                            {this.addcoin(-100,session.user_id);
                              session.reply('购买成功!请发送截图\n你目前还剩'+(coin-100)+'个MWBC');
                            }
                          }
                          id=0;
                    } 
                    else 
                    {
                        ask=session.user_id;
                        var s=`
商店
此处的迈阿密西西比特币简称MWBC
1.管理员一周  1,500 MWBC
2.称号 100 MWBC

输入产品名称,购买成功后发截图给Mizuhara37
                `
                        session.reply(s);
                    }
  
            }
        }
    }

}
module.exports = menu;