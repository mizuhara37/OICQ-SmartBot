const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
const storage = new LocalStorage('./qiandao');
const storage2 = new LocalStorage('./bank');
const axios = require('axios');
const dayjs = require('dayjs');
var luck,flag=false;
const day = parseInt(dayjs().format('DD'));
const month = parseInt(dayjs().format('MM'));




class qiandao {
    constructor (client) {
        this.client = client;
    }
    
    refresh (id) {
        const now = dayjs().format('DD/MM/YYYY');
       
        if (now !== storage.getItem('date')) 
        { 
            storage.setItem('user', '{}');
            storage.setItem('seed', Math.round(Math.random() * 100));
            storage.setItem('date', now);
            storage.setItem('first','0');
        }
    }
    
    attempt (id) {
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
        return attempt + 1;
    }
    activate () {
        logger.info('签到组件加载成功！');
    }
    
    async onGroupMessage (session) {
        // console.log(session.user_id);
        this.refresh(session.group_id);

        if( storage.getItem('first')==0 && session.group_id === 795689584 && session.user_id !=2854196310) 
        {
            storage.setItem('first','1');
            session.reply("早起身体好！金币+200");
            this.addcoin(200,session.user_id);
        }
        
        if(session.raw_message === '福星高照' && session.group_id === 795689584 && session.user_id === 3103819396) luck=true;
        if(session.raw_message === '关闭福星高照' && session.group_id === 795689584 && session.user_id === 3103819396) luck=false;
        if ((session.raw_message === '签到') && (session.group_id === 795689584)) {
            const attempt = await this.attempt(parseInt(session.user_id));
        if(luck || (month === 8 && (day>=17 && day<=23)))
        {
          const jrrp = 100;
          var sentence='天随人愿、吉人天相、福星高照、一路福星\n游泳中考加油啊！(≧∇≦)ﾉ';
          session.reply('签到成功(≧▽≦)！\n你今天的人品是:'+ jrrp+',\n'+sentence);
          if(attempt<=1) this.addcoin(jrrp,session.user_id);
          
        }
        else
            if (attempt <= 1) {
                const jrrp = parseInt(session.user_id / this.seed % 101);
                var x=jrrp;
                var sentence;
                if(x===0) sentence = '0人品，你今天要小心咯';
                else if(x>0 &&x <=30) sentence = '希望明天能够好点吧';
                else if(x>30 && x<=60) sentence = '奈斯!你今天的人品不错啊!';
                else if(x>60&& x<100 ) sentence = '今天会是一个很棒的一天吧!';
                else if(x==100) sentence = '天随人愿、吉人天相、福星高照、一路福星';
                session.reply('签到成功(≧▽≦)！\n你今天的人品是:'+ jrrp+',\n'+sentence);
            } else if (attempt == 2) {
                session.reply('你知道吗，反复签到可是要掉脑袋的(๑•﹏•)');
            } 
            else {
                try {
                    this.client.setGroupBan(session.group_id, session.user_id, attempt);
                
                    //const poisonous = await axios.get('https://api.muxiaoguo.cn/api/dujitang');
                    //session.reply(poisonous.data.data.comment);config.workgroup.includes(
                        // Class Group 661222218
                        // Test  Group 748571332
                } catch (e) {}
            }
        }
    }

    get seed () {
        return parseInt(storage.getItem('seed'));
    }
}

module.exports = qiandao;