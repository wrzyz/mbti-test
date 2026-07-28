import json
import random
import re
import os

random.seed(20260728)

# 丰富分类
CATEGORIES = [
    {"id":"love","zh":"恋爱","en":"Love","emoji":"💘"},
    {"id":"study","zh":"学习","en":"Study","emoji":"📚"},
    {"id":"work","zh":"职场","en":"Work","emoji":"💼"},
    {"id":"life","zh":"人生","en":"Life","emoji":"🌱"},
    {"id":"funny","zh":"搞笑","en":"Funny","emoji":"😂"},
    {"id":"anime","zh":"动漫","en":"Anime","emoji":"🎌"},
    {"id":"game","zh":"游戏","en":"Games","emoji":"🎮"},
    {"id":"family","zh":"家庭","en":"Family","emoji":"🏠"},
    {"id":"digital","zh":"社媒","en":"Social","emoji":"📱"},
    {"id":"travel","zh":"出行","en":"Travel","emoji":"🚇"},
    {"id":"food","zh":"饮食","en":"Food","emoji":"🍜"},
    {"id":"money","zh":"金钱","en":"Money","emoji":"💸"},
    {"id":"dead","zh":"社死时刻","en":"SocialDeath","emoji":"😰"},
    {"id":"fish","zh":"摸鱼时刻","en":"FishAround","emoji":"🐟"},
    {"id":"drama","zh":"追剧","en":"WatchDrama","emoji":"📺"},
    {"id":"eat","zh":"吃吃喝喝","en":"EatWell","emoji":"🥟"}
]

AXES = ["EI", "SN", "TF", "JP"]
POLES = {"EI": ["E", "I"], "SN": ["S", "N"], "TF": ["T", "F"], "JP": ["J", "P"]}

# 更网感、更共鸣的场景库
STEMS = {
    "love": {"EI": ["约会时消息突然弹出前任的点赞", "刚发完朋友圈立刻收到相亲群的@", "第一次单独见家长就翻车", "对方突然说想认真谈关系让你措手不及", "约会被问工资/房子/计划像被审问", "刚送完礼物对方说太贵重了"], "SN": ["对方说要仪式感你准备了惊喜但TA没看懂", "聊天记录里永远只有表情包和哈哈哈", "约会攻略发三次都得不到反馈", "纪念日礼物选了TA可能喜欢的其实不喜欢", "感情目标都是成长结果成了互相内耗", "对方说想要一点仪式感"]},
    "study": {"EI": ["小组作业所有人已读不回", "课堂当众点名让你分享观点", "自习室只剩你对着空气背书", "同学拉你对答案到图书馆闭馆", "线上讨论你哑火其他人高潮", "导师组会轮到你汇报PPT没做完"], "SN": ["论文选题大到能装宇宙", "复习提纲越写越长越看不懂", "错题本比教科书还厚", "老师说理解别背你把笔记抄三遍", "考点传说版本多到分不清真假", "实验结果和理论模型完全不沾边"]},
    "work": {"EI": ["晨会突然点到你同步进度", "团建玩游戏你要当队长", "客户局需要你破冰围观全在看你", "跨部门群@你要你一个方案", "客户突然找你说话全组在看你", "领导突然问你怎么看"], "SN": ["需求文档写了个感觉对就行", "复盘只聊愿景不讲数据", "故障原因像侦探小说", "OKR写得像诗同事方案全是细节清单", "老板只要方向你不要路径", "需求反复变更不知道信哪个版本"]},
    "life": {"EI": ["邻居开始长聊人生", "朋友婚礼你被拉去致辞", "小区群为停车吵翻", "陌生人问路还想听故事", "家庭聚餐要先敬酒", "旧同学聚会全是回忆杀"], "SN": ["人生规划写到第三页空白", "你想看说明书对方看星空", "日常决策变成哲学题", "搬家清物品像考古", "你列利弊对方谈命运", "周末安排只写随便转转"]},
    "funny": {"EI": ["社死名场面正在直播", "表情包本人出现在现场", "你被拉去当气氛组", "朋友让你当众讲冷笑话", "语音误触发到家族群", "你笑点太低全场安静"], "SN": ["热搜逻辑像脱口秀稿", "你较真细节对方在玩梗", "段子背后其实有数据", "现实bug比剧本更荒诞", "你想还原真相对方要包袱", "迷因解释需要三页注释"]},
    "dead": {"EI": ["最尴尬时刻恰好直播", "表情包本人被认出", "语音房全家群误触", "全场安静讲冷笑话", "聚会被点名表演", "社死瞬间被转发群"], "SN": ["热搜像脱口秀", "较真玩梗不理解", "段子真相难辨", "现实bug更离谱", "想解释大家看热闹", "较真玩梗当狂欢"]},
    "fish": {"EI": ["会议中摸鱼被发现", "工作时领导刷手机走来", "同事八卦你忍不住插嘴", "工作群消息秒回", "同事偷懒你也放松", "上班刷短视频同事喊"], "SN": ["摸鱼技巧像学术课题", "上班找借口刷视频", "摸鱼时间精确计算", "摸鱼发现重要邮件", "摸鱼被发现屏幕内容", "摸鱼时发现重要消息弹出"]},
    "drama": {"EI": ["安利新番没人看过", "漫展cos围观", "角色曲合唱嗨", "直播间弹幕要你说话", "追剧神转折剧透", "同好聚会自我介绍滔滔不绝"], "SN": ["剧情杀无铺垫", "设定集厚如防身书", "关系图复杂过地铁", "隐藏结局靠氛围", "攻略对线党争论", "画面分镜考据争论"]},
    "eat": {"EI": ["火锅局第一个点菜", "等位陌生人聊天", "朋友点评味道", "直播连麦邀请", "聚餐结尾感言", "食堂拥挤挤中间"], "SN": ["菜单氛围无重量", "网红店传说差距大", "你看配料对方摆盘", "黑暗料理超前", "你要复现对方惊喜", "账单精彩如小说"]},
}

OPTION_TEMPLATES = {
    "EI": [["直接把「{scene)」变成自己的高光时刻，开麦就整", "站在中间位把尴尬当开场白，社死变社牛", "拉队友一起表演双人相声，冷场变热场", "用表情包终结冷场，让对方笑出声"], ["主动自我介绍把「{scene)」变成认识新朋友的机会", "站到边缘位默默观察然后用实力反转", "抛一个轻松话题带着「{scene)」往前走", "简短回应避免扩大事态，低调处理"]],
    "SN": [["按优先级拆解「{scene)」的核心约束条件", "深挖现象背后的模式和故事", "用小步验证的方式调整策略逐步收敛", "保留创意火花但要落地实操补丁"], ["列出清单优先解决关键要素", "先预设三种不同结局再选择路径", "确认事实边界后再进行评论解释", "允许浪漫思维但必须有可执行方案"]],
    "TF": [["对齐规则和后果再给出建设性意见", "先共情安抚情绪再展开理性分析", "将复杂议题拆解成可讨论的具体要点", "优先修复关系裂痕而非单纯对错评判"], ["设定明确边界同时提供多个可行方案", "先表达理解认同再提出实用建议", "使用利弊分析工具辅助决策过程", "先询问对方真正需求然后再设计方案"]],
    "JP": [["锁定优先级防止「{scene)」被其他事项干扰", "把它当作支线情节不必死磕主线任务", "拆分成三个可阶段性完成的目标", "先配合当前状态再谈判计划安排"], ["设立截止点和验收标准控制范围", "保留弹性余地应对突发转向", "最小闭环验证后再向外扩展", "跟随能量流动一步一回头评估路线"]],
}

QUOTES = ["活着就是各种缝缝补补修修补补", "成年人的崩溃从关微信开始", "别回头身后没有灯火眼里皆是迷茫", "生活不止眼前的苟且还有明天的房租", "道理我都懂但还是过不好这一生", "早睡早起身体好熬夜秃头烦恼多", "世上无难事只怕有心人有钱万事不难", "努力不一定成功但不努力一定很爽", "风吹日晒雨淋生活就像麻辣烫", "人生没有彩排每一天都是直播", "面子是给穷人看的尊严是给富人用的", "成年人的世界里没有容易二字只有房贷", "别人家的孩子你家的镜子照出来自己", "理想很丰满现实很骨感钱包更瘪", "嘴上说着躺平心里比谁都卷", "当代年轻人三大病：选择困难症拖延症纠结症"]

STYLE_MODS = [("（轻一点）", " (lighter)"), ("（稳一点）", " (steadier)"), ("（酷一点）", " (cooler)"), ("（笑着来）", " (with a grin)"), ("（少内耗）", " (less spiral)"), ("（真实点）", " (real talk)"), ("（来点狠的）", " (go hard)"), ("（随便啦）", " (whatever)")]

def make_question():
    topic = random.choice(list(STEMS.keys()))
    axis = random.choice(AXES)
    stems_list = STEMS.get(topic, {}).get(axis, STEMS["life"][axis])
    stem_base = random.choice(stems_list)
    scene_match = re.search(r'「([^」]+)」', stem_base)
    scene_phrase = scene_match.group(1) if scene_match else stem_base.split("，")[-1].split("。")[0] if "，" in stem_base else stem_base[:20]
    topic_words = ["社死", "翻车", "社牛", "摸鱼", "追剧", "吃瓜", "绝绝子", "真的谢", "拿捏", "破防", "emo", "躺平", "摆烂", "yyds", "栓Q"]
    word_random = random.choice(topic_words)
    twists = ["还尽量不翻车", "并给自己留退路", "同时不想消耗社交电量", "还得给未来自己擦屁股"]
    pressures = ["朋友圈已准备好截图", "时间只给你八秒决策", "旁白开始阴阳怪气", "BGM突然变得很燃"]
    twist, pressure = random.choice(twists), random.choice(pressures)
    stem_chinese = f"{stem_base}，{twist}。{pressure}。面对「{scene_phrase}」，你会？"
    quote_chinese = random.choice(QUOTES)
    options = []
    template_set = OPTION_TEMPLATES[axis][0]
    for idx, base_tpl in enumerate(template_set):
        option_text = base_tpl.replace("{scene)", f'"{scene_phrase}"') + random.choice(STYLE_MODS)[0]
        en_text = base_tpl.replace("{scene)", f'"{scene_phrase}"') + random.choice(STYLE_MODS)[1]
        val = POLES[axis][idx % 2]
        options.append({"value": val, "label": {"zh": option_text, "en": en_text}, "hint": {"zh": POLE_ZH.get(val, val), "en": POLE_EN.get(val, val)}})
    return {"id": None, "axis": axis, "category": {"zh": topic, "en": topic}, "topic": topic, "tags": [topic, axis.lower()], "kicker": {"zh": f"{word_random}{topic} · {axis}", "en": f"{word_random}{topic} · {axis}"}, "text": {"zh": stem_chinese, "en": stem_chinese}, "quote": {"zh": quote_chinese, "en": "Quote: " + quote_chinese}, "options": options}

def generate_unique_questions(count=10000):
    unique_set = set()
    new_questions = []
    attempts = 0
    max_attempts = count * 8
    print(f"开始生成 {count} 道唯一题目...")
    while len(new_questions) < count and attempts < max_attempts:
        attempts += 1
        q = make_question()
        key_parts = [q["text"]["zh"]]
        for opt in q["options"]:
            key_parts.append(opt["label"]["zh"])
        key = "|".join(key_parts)
        if key not in unique_set:
            unique_set.add(key)
            new_questions.append(q)
        if attempts % 3000 == 0:
            print(f"已生成 {len(new_questions)} 道题目（尝试了 {attempts} 次）")
    print(f"完成！最终获得 {len(new_questions)} 道唯一题目，尝试次数：{attempts}")
    return new_questions

# 加载或初始化现有题库
bank_path = "bank_30k_plus.json"
try:
    with open(bank_path, "r", encoding="utf-8") as f:
        existing_rows = json.load(f)
    print(f"加载现有题库：{len(existing_rows)} 题")
except:
    existing_rows = []
    print("未发现现有题库，将从零开始")

current_total = len(existing_rows)
target_total = max(30000, current_total * 2)
needed = target_total - current_total
if needed < 5000: needed = 5000
print(f"需要扩展 {needed} 题达到目标 {target_total}")

new_questions = generate_unique_questions(needed)
all_rows = []

# 合并现有题库
for row in existing_rows:
    if isinstance(row, list) and len(row) >= 10:
        all_rows.append(row)
    elif isinstance(row, dict):
        all_rows.append([1, "EI", "love", "测试题", "Test", "Quote", "Quote", "Kicker", "Kicker", [{"value":"E","label":{"zh":"A","en":"A"},"hint":{"zh":"A","en":"A"}}]])

# 添加新题目（压缩格式，节省内存）
for i, q in enumerate(new_questions, start=len(all_rows) + 1):
    all_rows.append([i, q["axis"], q["topic"], q["text"]["zh"], q["text"]["en"], q["quote"]["zh"], q["quote"]["en"], q["kicker"]["zh"], q["kicker"]["en"], q["options"]])

# 写入新题库
with open(bank_path, "w", encoding="utf-8") as f:
    json.dump(all_rows, f, ensure_ascii=False, indent=2)

print(f"新题库已写入：{bank_path} ({len(all_rows)} 题)")

# 统计
axes_count = {}
topic_count = {}
for row in all_rows:
    axes_count[row[1]] = axes_count.get(row[1], 0) + 1
    topic_count[row[2]] = topic_count.get(row[2], 0) + 1

print(f"\n=== 统计 ===\n总题数：{len(all_rows)}\n轴分布：{axes_count}\n类别分布：{topic_count}")

# 验证唯一性
verify_set = set()
for row in all_rows:
    key = "|".join([row[3], row[4], row[5], row[6]])
    if key in verify_set:
        print(f"警告：发现重复题目！ID: {row[0]}")
    verify_set.add(key)

print(f"唯一性验证：{len(verify_set)} 个唯一题目集合")
