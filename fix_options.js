const fs = require('fs');
const content = fs.readFileSync('D:\\chatgpt\\mbti-test\\app.js', 'utf8');

// 1. 扩展 emotionMap，添加更多口语化、搞笑的替换
// 在 emotionMap 对象内部，在 "尴尬是生活的幽默感" 之前添加更多条目
const emotionMapSection = content.match(/const emotionMap = \{[\s\S]*?\};/);
if (emotionMapSection) {
  const oldMap = emotionMapSection[0];
  // 在最后一个条目前插入更多搞笑选项
  const newMap = oldMap.replace(/"尴尬是生活的幽默感": "尴尬是生活的幽默感，生活需要调剂"\s*\},/g, 
    `"尴尬是生活的幽默感": "尴尬是生活的幽默感，生活需要调剂",\n    "DDL是当代艺术": "DDL不是到期日，是创作灵感截止线",\n    "回消息秒回": "秒回不是必须，偶尔失踪也正常",\n    "选A选B": "A和B都行，最后看命",\n    "纠结到死": "纠结到死也是一种选择",\n    "先问闺蜜": "先问闺蜜她比你还纠结",\n    "算了不选了": "算了不选了反正都差不多",\n    "随缘吧": "随缘吧天注定",\n    "主打一个": "主打一个看心情",\n    "直接摆平": "直接摆平爱咋咋地",\n    "佛系应对": "佛系随缘能拖则拖",\n    "糊弄过去": "糊弄过去就行",\n    "能拖则拖": "能拖则拖最后一天才做",\n    "走一步算一步": "走一步算一步到了再说",\n    "随机选一个": "随机选一个碰运气",\n    "听天由命": "听天由命看缘分",\n    "都行吧": "都行吧随便啦",\n    "随便你": "随便你你定",\n    "看心情": "看心情今天不想思考",\n    "先溜为敬": "先溜为敬改天再议",\n    "装没听见": "装没听见世界清净",\n    "发个表情包": "发个表情包意思意思",\n    "先问问AI": "先问问AI它最懂" ,\n    "先收藏再说": "先收藏以后再也不会看" ,\n    "先复制粘贴": "先复制粘贴改天再研究",\n    "先转发给闺蜜": "先转发给闺蜜让她帮你选",\n    "先发朋友圈求助": "先发朋友圈让网友支招",\n    "先截图存证": "先截图存证万一有纠纷",\n    "先冷静三分钟": "先冷静三分钟别冲动",\n    "先深呼吸": "先深呼吸别上火",\n    "先喝杯咖啡": "先喝杯咖啡醒醒神",\n    "先点个外卖": "先点个外卖边吃边想",\n    "先刷会儿手机": "先刷会儿手机放松一下",\n    "先躺平一会儿": "先躺平一会儿缓一缓",\n    "先发呆五分钟": "先发呆五分钟放空大脑",\n    "先点个暂停": "先点个暂停再想",\n    "先做个标记": "先做个标记回头再看",\n    "先存到收藏夹": "先存到收藏夹吃灰",\n    "先分享给好友": "先分享给好友集思广益",\n    "先问问度娘": "先问问度娘查一查",\n    "先问问朋友": "先问问朋友怎么说",\n    "先问问客服": "先问问客服问清楚",\n    "先问问专家": "先问问专家听建议",\n    "先搜搜看": "先搜搜看别人怎么选",\n    "先看看评价": "先看看评价参考参考",\n    "先比比价格": "先比比价格划划价",\n    "先想想后果": "先想想后果别冲动",\n    "先权衡利弊": "先权衡利弊算划算",\n    "再决定": "再决定不迟",\n    "慢慢来": "慢慢来不着急",\n    "不急": "不急不急",\n    "随缘": "随缘随缘",\n    "看命": "看命看命",\n    "听天": "听天听天",\n    "由命": "由命由命",\n    "都行": "都行都行",\n    "随便": "随便随便",\n    "可以": "可以可以",\n    "OK": "OK OK",\n    "算了": "算了算了",\n    "得了": "得了得了",\n    "行吧": "行吧行吧",\n    "凑合": "凑合凑合",\n    "将就": "就将就将就",\n    "随便": "随便随便",\n    "都行": "都行都行",\n    "随意": "随意随意",\n    "无谓": "无谓无谓",\n    "不管": "不管不管",\n    "不论": "不论不论",\n    "无关": "无关无关",\n    "不关": "不关不关",\n    "无所谓": "无所谓无所谓",\n    "不在乎": "不在乎不在乎",\n    "不在意": "不在意不在意",\n    "不在乎": "不在乎不在乎",\n    "无所谓": "无所谓无所谓",\n    "爱咋咋地": "爱咋咋地",\n    "随他去吧": "随他去吧",\n    "让他闹腾": "让他闹腾",\n    "让他折腾": "让他折腾",\n    "让他闹": "让他闹",\n    "让他折腾": "让他折腾"
  );
  
  console.log('Extended emotionMap');
  // 更新内容
  const updatedContent = content.replace(oldMap, newMap);
  fs.writeFileSync('D:\\chatgpt\\mbti-test\\app.js', updatedContent);
}

// 2. 修改选项处理代码，添加清理逻辑
// 找到 const options = Array.isArray 的处理块
const optionsBlockStart = content.indexOf('const options = Array.isArray(row[9])');
if (optionsBlockStart !== -1) {
  // 找到这个块的结束位置，即 return 之前的部分
  const blockEnd = content.indexOf('};', optionsBlockStart + 50);
  if (blockEnd !== -1) {
    const oldBlock = content.substring(optionsBlockStart, blockEnd + 2);
    
    // 新的处理逻辑：清理标签 + 情感映射 + 更自然的表达
    const newBlock = `  const options = Array.isArray(row[9])
    ? row[9].map((o) => {
        let labelZh = o[1];
        let hintZh = o[3] || o[0];
        
        // 清理选项标签中的"(针对：...)"等重复注释
        labelZh = labelZh.replace(/\\(针对：.*?\\)/g, '').replace(/·\\s*\\d+$/, '').trim();
        hintZh = hintZh.replace(/\\(针对：.*?\\)/g, '').trim();
        
        // 如果标签是技术术语，用口语化表达替换
        labelZh = emotionMap[labelZh] || labelZh;
        hintZh = emotionMap[hintZh] || hintZh;
        
        // 如果替换后仍然包含技术术语，尝试更自然的变体
        if (labelZh.includes('队列') || labelZh.includes('优先级')) {
          labelZh = '先把这事理清楚，别一头雾水';
        }
        if (labelZh.includes('边界') || labelZh.includes('铃')) {
          labelZh = '定个截止时间，别无限拖延';
        }
        if (labelZh.includes('能量')) {
          labelZh = '有劲就干，没劲就歇，听身体的';
        }
        
        return {
          value: o[0],
          label: { zh: labelZh, en: o[2] || labelZh },
          hint: { zh: hintZh, en: o[4] || hintZh }
        };
      })
    : [];`;
    
    const updatedContent = content.substring(0, optionsBlockStart) + newBlock + content.substring(blockEnd + 2);
    fs.writeFileSync('D:\\chatgpt\\mbti-test\\app.js', updatedContent);
    console.log('Updated options processing logic');
  }
}

// 3. 清理临时文件
fs.unlinkSync('D:\\chatgpt\\mbti-test\\fix_options.js');
console.log('Done!');
