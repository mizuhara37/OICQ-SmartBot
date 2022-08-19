const logger = require('../util/logger.js');
const config = require('../config.json');
const LocalStorage = require('node-localstorage').LocalStorage;
class toolbox
{
    constructor (client) {
       this.client = client;
    }

    activate () {
       logger.info('Toolbox组件加载成功！');
    }
    async onGroupMessage (session)
    {
        if(session.group_id === 795689584)
        {
          if(session.raw_message === '骗我')
          {
              const { segment } = require("oicq")
              var x = 1,y = 6;
              var r;
              r=Math.round(Math.random()*(y-x)+x);
              const me = [
                  "我骗你干甚？",
                  segment.image("img/cheat"+r+".jpg"),
              ]
              const mee = [
                  segment.video("img/cheat.mp4"),
              ]
              this.client.sendGroupMsg(session.group_id , me );
              this.client.sendGroupMsg(session.group_id, mee);
          }
          else if(session.raw_message === '拍拍我')
          {
              this.client.sendGroupPoke(session.group_id,session.user_id);
          }
          else if(session.raw_message.indexOf('moo')!=-1)
          {
              var s=`∝∝∝╬▅▅▆▅▆▅▆▇◤`;
              session.reply(s);
          }
          else if(session.raw_message.indexOf('du')!=-1 && session.raw_message.indexOf('psyduck')==-1)
          {
              var ss=`
      ...╭ ╯╭ ╯╭ ╯
      . ╭╩═╮╔════╗  ╔════╗   
      ╭╯嘟嘟  ~~❏❏❏❏ ╠╣~╟
      ╰⊙═⊙╯╚⊙═⊙╝ ╚⊙═⊙╝             
              `;
              session.reply(ss);
          }
          else if(session.raw_message === '源码')
          {
              var ssss='     https://github.com/mizuhara37/OICQ-SmartBot \n       该程序采用的是GNU 通用公共许可证,可以键入   许可证  访问详情';
              session.reply(ssss);
          }
          else if(session.raw_message==='许可证')
          {
              var sss=`
              GNU 通用公共许可证
              版本 3，2007 年 6 月 29 日
              
              版权所有 （C） 2007 自由软件基金会 <https://fsf.org/>
              每个人都可以复制和分发逐字副本
              ，但不允许更改它。
              
              序言
              
              GNU 通用公共许可证是一个自由的 copyleft 许可证，用于
              软件和其他类型的作品。
              
              大多数软件和其他实际作品的许可证都是设计的
              剥夺您分享和更改作品的自由。相比之下，
              GNU 通用公共许可证旨在保证您的自由
              共享和更改程序的所有版本 - 以确保它保持免费
              软件为其所有用户。我们，自由软件基金会，使用
              GNU 通用公共许可证适用于我们大多数软件;它也适用于
              作者以这种方式发布的任何其他作品。您可以将其应用于
              您的程序也是如此。
              
              当我们谈论自由软件时，我们指的是自由，而不是自由
              价格。我们的通用公共许可证旨在确保您
              有自由分发自由软件的副本（并收取费用）
              如果你愿意，他们），你会收到源代码，或者如果你
              想要它，你可以改变软件或使用它的一部分在新的
              免费程序，并且您知道您可以执行这些操作。
              
              为了保护您的权利，我们需要防止他人拒绝您
              这些权利或要求您放弃这些权利。因此，您有
              如果您分发软件副本，或者如果
              你修改它：尊重他人自由的责任。
              
              例如，如果您分发此类程序的副本，则
              免费或收费，您必须将相同的费用传递给收件人
              你得到的自由。您必须确保他们也收到
              或者可以获取源代码。你必须向他们展示这些术语，以便他们
              了解他们的权利。
              
              使用 GNU GPL 的开发人员通过两个步骤保护您的权利：
              （1） 主张软件的版权，以及 （2） 向您提供本许可证
              授予您复制、分发和/或修改它的法律许可。
              
              为了保护开发者和作者，GPL清楚地解释了
              此免费软件不作任何保证。对于用户的和
              作者的缘故，GPL要求修改后的版本被标记为
              改变了，这样他们的问题就不会被错误地归因于
              以前版本的作者。
              
              某些设备旨在拒绝用户访问安装或运行
              其中软件的修改版本，尽管制造商
              可以这样做。这从根本上与以下目标不相容：
              保护用户更改软件的自由。系统化
              这种滥用的模式发生在产品领域，供个人
              使用，这正是最不可接受的地方。因此，我们
              设计了这个版本的GPL来禁止那些人的做法
              产品。如果此类问题在其他领域出现，我们
              随时准备在将来的版本中将此规定扩展到这些域
              的 GPL，根据需要保护用户的自由。
              
              最后，每个程序都不断受到软件专利的威胁。
              各国不应允许专利限制开发和使用
              通用计算机上的软件，但在通用计算机上，我们希望
              避免专利应用于自由程序的特殊危险
              使其有效地专有。为了防止这种情况，GPL保证
              专利不能用于使程序非自由。      
              `
              session.reply(sss);
          }
        }
    }
}
module.exports = toolbox;