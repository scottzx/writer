import { AlertCircle, Code, DollarSign, Microscope, Scale, Sparkles, TrendingUp, Users } from "lucide-react"

// Timeline Event Structure (matches TimelineItem component)
export interface TimelineEvent {
  year: string // e.g., "2024-01-15", "2025年3月"
  impact: "High" | "Medium"
  title: string
  desc: string
  active?: boolean
  icon?: any // Lucide icon component
}

// Detailed Analysis Structure (matches right panel of TimelineAnalysis)
export interface EventDetails {
  title: string
  priority: "高度重要" | "中等重要"
  background: string // 历史背景
  participants: string[] // 关键参与者
  impacts: {
    technical?: string // 技术层面影响
    social?: string // 社会层面影响
    economic?: string // 经济层面影响
  }
  status: {
    type: "已完成" | "进行中" | "待观察"
    description: string // Status explanation
  }
  timeline: TimelineEvent[] // Timeline items
}

export interface NewsCardData {
  title: string
  source: string
  time: string
  snippet: string // Brief 2-3 sentence summary for card display
  score: string
  trend: "up" | "down"
  color: string
  url: string
  category: string
  details: EventDetails // Complete data for TimelineAnalysis modal
}

export const newsCenterData: NewsCardData[] = [
  // 1. 钻石项链贬值
  {
    title: "女子吐槽14万买的钻石项链如今200块都不值",
    source: "知乎",
    time: "10小时前",
    snippet: "广东一位女士十年前花14万元购入的钻石项链，如今多家回收商拒收或报价仅200元。此事引发全网对钻石保值神话的集体反思，网友调侃「钻石恒久远」的真相竟是「卖不掉就永流传」。",
    score: "9.2",
    trend: "up",
    color: "text-blue-500",
    url: "https://www.zhihu.com/question/1995872467995027269",
    category: "社会争议",
    details: {
      title: "钻石保值神话破灭事件",
      priority: "高度重要",
      background: "2025年1月，广东一位女子在社交媒体上吐槽，自己结婚时花14万买的钻石项链，如今想变现时连200元都卖不出去。多家回收商表示30分以下碎钻因鉴定成本高，回收市场接近零估值。该事件迅速引发全网对钻石保值能力的讨论。",
      participants: ["钻石消费者", "珠宝回收商", "戴比尔斯", "培育钻厂商", "中国珠宝协会"],
      impacts: {
        social: "引发了消费者对奢侈品保值的反思，更多人开始质疑「钻石恒久远」营销口号的真实性。讨论集中在消费主义陷阱、理性消费观念的转变。",
        economic: "钻石二级市场流动性差，回收渠道狭窄。30分以下碎钻因鉴定成本高于本身价值，几乎无回收价值。培育钻石的兴起也冲击了天然钻石市场。",
      },
      status: {
        type: "待观察",
        description: "钻石行业面临信任危机，消费者投资偏好转向黄金等传统保值品",
      },
      timeline: [
        {
          year: "2015年",
          impact: "Medium",
          title: "购买钻石项链",
          desc: "广东女子花费14万元购买钻石项链作为结婚饰品",
          active: true,
          icon: Sparkles,
        },
        {
          year: "2025年1月",
          impact: "High",
          title: "尝试变现遭遇暴击",
          desc: "多家回收商报价仅200元或拒收，引发网络热议",
          icon: AlertCircle,
        },
        {
          year: "2025年1月",
          impact: "High",
          title: "全网讨论钻石保值",
          desc: "事件登上热搜，引发对钻石保值神话的集体反思",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 2. 比格比萨环卫工福利
  {
    title: "比格比萨推出「环卫工人49.99元吃自助」福利日活动引热议",
    source: "知乎",
    time: "1天前",
    snippet: "比格比萨宣布1月26日为环卫工人提供49.99元自助餐优惠，原价79.99元。网友质疑「缺乏诚意」，认为50元对环卫工人来说仍然偏高，甚至比平日65岁以上优惠还贵。",
    score: "7.8",
    trend: "up",
    color: "text-blue-500",
    url: "https://www.zhihu.com/question/1995527451237975359",
    category: "社会争议",
    details: {
      title: "比格比萨福利日争议",
      priority: "中等重要",
      background: "2025年1月14日，连锁餐饮品牌比格比萨宣布推出「环卫工人福利日」活动，1月26日持工作证或工作服的环卫工人可享受49.99元自助餐优惠（原价79.99元）。该活动引发网友质疑，认为企业缺乏诚意。",
      participants: ["比格比萨", "赵志强（创始人）", "环卫工人群体", "网友", "媒体评论员"],
      impacts: {
        social: "引发对企业公益行为动机的讨论。有人认为企业确实在做善举，有人质疑这是营销作秀。讨论集中在企业社会责任与商业营销的边界。",
        economic: "餐饮行业竞争激烈，品牌通过话题营销获得曝光。但争议也可能对品牌形象造成损害。",
      },
      status: {
        type: "待观察",
        description: "事件持续发酵，品牌公关效果待评估",
      },
      timeline: [
        {
          year: "2025年1月14日",
          impact: "High",
          title: "推出环卫工福利日",
          desc: "比格比萨宣布49.99元环卫工人自助优惠活动",
          active: true,
          icon: Users,
        },
        {
          year: "2025年1月15日",
          impact: "High",
          title: "网友质疑缺乏诚意",
          desc: "网友指出50元对环卫工人仍偏高，且比65岁以上优惠还贵",
          icon: AlertCircle,
        },
        {
          year: "2025年1月15日",
          impact: "Medium",
          title: "创始人回应",
          desc: "赵志强回应称定价已是最低成本，对各阶层平等对待",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 3. 黑珍珠餐厅服务员辱骂顾客
  {
    title: "上海黑珍珠餐厅服务员不满顾客拍照需求，在朋友圈辱骂顾客被开除",
    source: "知乎",
    time: "2天前",
    snippet: "上海一家人均消费765元的黑珍珠餐厅，服务员因不满顾客拍照需求，在朋友圈「挂」出顾客未打码照片并进行辱骂：「两个人才吃一千四，什么时候吃到一万四再让我这样服务你好吗？」餐厅已开除涉事员工。",
    score: "8.5",
    trend: "up",
    color: "text-blue-500",
    url: "https://www.zhihu.com/question/1995467173875905801",
    category: "社会争议",
    details: {
      title: "高端餐厅服务质量争议",
      priority: "高度重要",
      background: "2025年1月，上海某黑珍珠餐厅（人均消费765元）服务员帮顾客拍照后心生不满，在朋友圈发布顾客未打码照片，配文「两个人才吃一千四」并进行辱骂攻击，称「长这样我真可怜你」。",
      participants: ["涉事服务员", "顾客", "黑珍珠餐厅", "餐厅老板", "网友评论者"],
      impacts: {
        social: "引发对服务业态度、消费者权益保护的讨论。高端餐厅是否匹配其服务价格成为热议话题。",
        economic: "涉事餐厅品牌形象受损，可能影响后续客流量。行业反思服务质量与定价匹配。",
      },
      status: {
        type: "已完成",
        description: "涉事员工已被开除，餐厅公开道歉",
      },
      timeline: [
        {
          year: "2025年1月",
          impact: "High",
          title: "就餐拍照引发不满",
          desc: "顾客在就餐时让服务员帮忙拍照，因效果不满意要求重拍",
          active: true,
          icon: AlertCircle,
        },
        {
          year: "2025年1月",
          impact: "High",
          title: "朋友圈辱骂顾客",
          desc: "服务员在朋友圈挂出顾客照片并进行辱骂",
          icon: AlertCircle,
        },
        {
          year: "2025年1月16日",
          impact: "High",
          title: "员工被开除",
          desc: "餐厅发布声明，开除涉事员工并公开道歉",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 4. 网络主播偷税案
  {
    title: "税务部门曝光2起网络主播偷税案，三千万粉丝网红彭十六偷税216.32万元",
    source: "知乎",
    time: "3天前",
    snippet: "重庆、甘肃两地税务部门曝光2起网络主播偷税案件。拥有3000万粉丝的网红「彭十六」（彭煊之）通过隐匿收入、虚假申报少缴税费216.32万元，被追缴税款、滞纳金并罚款共计415.05万元。",
    score: "9.5",
    trend: "up",
    color: "text-blue-500",
    url: "https://www.zhihu.com/question/1994850753785847957",
    category: "社会争议",
    details: {
      title: "网络主播偷税案",
      priority: "高度重要",
      background: "2025年1月，国家税务总局曝光2起网络主播偷税案件。彭煊之（彭十六）在2021-2023年期间通过隐匿收入、虚假申报等方式少缴税费216.32万元。杨遂娃在2022-2024年期间偷税101.64万元。两人均被依法处罚。",
      participants: ["彭煊之（彭十六）", "杨遂娃", "重庆市税务局第三稽查局", "甘肃省税务局", "各大直播平台"],
      impacts: {
        social: "网红主播税务问题持续引发关注。行业监管趋严，倒逼主播合规纳税。粉丝对网红的道德评价受影响。",
        economic: "直播行业税务合规成本上升。平台加强对主播的税务管理。违规主播面临禁言、封号等处罚。",
      },
      status: {
        type: "已完成",
        description: "涉案税费款、滞纳金及罚款均已追缴入库，涉事主播被多平台禁言",
      },
      timeline: [
        {
          year: "2021-2023年",
          impact: "High",
          title: "隐匿收入偷税",
          desc: "彭煊之通过隐匿收入、虚假申报等方式少缴税费",
          active: true,
          icon: AlertCircle,
        },
        {
          year: "2025年1月",
          impact: "High",
          title: "税务部门曝光",
          desc: "重庆、甘肃税务部门公开曝光2起偷税案件",
          icon: TrendingUp,
        },
        {
          year: "2025年1月",
          impact: "Medium",
          title: "处罚执行",
          desc: "追缴税款、滞纳金并罚款共计415.05万元",
          icon: Scale,
        },
      ],
    },
  },

  // 5. 无座票乘客站一等座车厢
  {
    title: "无座票乘客站一等座车厢被要求离开，12306称无座票仅限二等车厢",
    source: "知乎",
    time: "3天前",
    snippet: "持二等座无座票乘客因车厢拥挤前往一等座车厢连接处站立，被列车员告知「一等座不允许无座旅客逗留」。12306回应：无座票仅限二等车厢，越席乘车需补票差价。",
    score: "6.8",
    trend: "down",
    color: "text-blue-500",
    url: "https://www.zhihu.com/question/1995120350212618006",
    category: "社会争议",
    details: {
      title: "高铁无座票争议",
      priority: "中等重要",
      background: "一位持二等座无座票的乘客因车厢拥挤，前往一等座车厢连接处站立，被列车员要求离开。12306客服明确表示：高铁无座票仅限在二等座车厢乘坐，不得进入一等座车厢。",
      participants: ["持无座票乘客", "列车员", "12306客服", "中国铁路", "网友评论者"],
      impacts: {
        social: "引发对铁路服务公平性的讨论。有人认为规定合理，有人质疑不够人性化。讨论集中在无座票乘客权益保障。",
        economic: "一等座价格为二等座1.7倍，服务对等原则要求限制无座乘客进入。",
      },
      status: {
        type: "已完成",
        description: "12306明确规则，无座票乘客需遵守车厢限制规定",
      },
      timeline: [
        {
          year: "2025年1月",
          impact: "Medium",
          title: "乘客站一等座车厢",
          desc: "持二等座无座票乘客因车厢拥挤前往一等座车厢连接处",
          active: true,
          icon: AlertCircle,
        },
        {
          year: "2025年1月",
          impact: "Medium",
          title: "被列车员要求离开",
          desc: "列车员告知「一等座不允许无座旅客逗留」",
          icon: AlertCircle,
        },
        {
          year: "2025年1月14日",
          impact: "Medium",
          title: "12306回应",
          desc: "客服回应：无座票仅限二等车厢，越席乘车需补票",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 6. 女子向出轨丈夫道歉
  {
    title: "曝丈夫出轨女子已连续道歉6天",
    source: "微博",
    time: "1小时前",
    snippet: "河南三门峡女子牛某某因曝光出轨丈夫及第三者信息，被法院判决侵犯名誉权需公开道歉。自1月12日起，她连续发布「道歉」视频，详细提及丈夫真实姓名及婚外情细节，6天涨粉近60万。",
    score: "8.9",
    trend: "up",
    color: "text-red-500",
    url: "https://s.weibo.com/weibo?q=%E6%9B%9D%E4%B8%88%E5%A4%AB%E5%87%BA%E8%BD%A8%E5%A5%B3%E5%AD%90%E5%B7%B2%E8%BF%9E%E7%BB%AD%E9%81%93%E6%AD%896%E5%A4%A9",
    category: "社会争议",
    details: {
      title: "连续道歉事件",
      priority: "高度重要",
      background: "河南三门峡牛某某因丈夫高某与已婚女同事持续5年婚外情，在社交平台曝光二人信息，被丈夫起诉侵犯名誉权。法院判决牛某某公开道歉。自1月12日起，她连续6天发布道歉视频。",
      participants: ["牛某某（当事人）", "高某（丈夫）", "第三者", "法院", "耿村煤矿（丈夫单位）"],
      impacts: {
        social: "引发对婚姻、道德、法律边界的讨论。有人支持女方维权，有人质疑道歉方式。涉及名誉权与言论自由的平衡。",
        economic: "事件带来巨大流量，账号涨粉近60万。丈夫被停职调查。",
      },
      status: {
        type: "进行中",
        description: "女子持续发布道歉视频，已进行6天，事件仍在发酵",
      },
      timeline: [
        {
          year: "2020-2025年",
          impact: "High",
          title: "丈夫持续5年婚外情",
          desc: "高某与已婚女同事保持婚外关系长达5年",
          active: true,
          icon: AlertCircle,
        },
        {
          year: "2025年",
          impact: "High",
          title: "法院判决",
          desc: "法院判决牛某某侵犯名誉权，需公开道歉",
          icon: Scale,
        },
        {
          year: "2025年1月12日-17日",
          impact: "High",
          title: "连续6天道歉",
          desc: "牛某某连续6天发布道歉视频，详细披露婚外情细节",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 7. 男子喉咙痛进ICU
  {
    title: "男子从喉咙痛到进ICU只用1小时",
    source: "微博",
    time: "2小时前",
    snippet: "陕西西安张先生因喉咙剧痛，1小时内从发病发展至被送入ICU抢救。诊断为急性会厌炎伴脓肿及喉水肿，会厌严重水肿堵塞气道。专家提醒：此病进展以分钟为单位，一旦出现呼吸困难须立即就医。",
    score: "8.2",
    trend: "up",
    color: "text-red-500",
    url: "https://s.weibo.com/weibo?q=%23%E7%94%B7%E5%AD%90%E4%BB%8E%E5%96%89%E5%92%99%E7%97%9B%E5%88%B0%E8%BF%9BICU%E5%8F%AA%E7%94%A81%E5%B0%8F%E6%97%B6",
    category: "社会争议",
    details: {
      title: "急性会厌炎致命风险",
      priority: "高度重要",
      background: "西安张先生因喉咙剧痛就诊，病情在1小时内急转直下，被诊断为急性会厌炎。会厌是喉部的「安全阀门」，一旦严重水肿，几分钟内就能导致窒息，被称为「隐形杀手」。",
      participants: ["张先生（患者）", "急诊医生", "耳鼻喉科医生", "医学专家"],
      impacts: {
        social: "引发对急性会厌炎的认识和警惕。网友分享类似经历，呼吁重视喉咙痛症状。",
        technical: "急性会厌炎起病急骤，多在夜间突然发生，可伴有剧烈喉痛、吞咽困难、呼吸困难。与普通感冒喉咙痛不同，需立即就医。",
      },
      status: {
        type: "已完成",
        description: "患者经紧急手术解除梗阻后脱险，已康复出院",
      },
      timeline: [
        {
          year: "2025年1月",
          impact: "High",
          title: "喉咙剧痛",
          desc: "张先生因喉咙剧痛、呼吸困难、声音嘶哑紧急送医",
          active: true,
          icon: AlertCircle,
        },
        {
          year: "2025年1月",
          impact: "High",
          title: "诊断急性会厌炎",
          desc: "会厌严重水肿堵塞气道，被紧急送入ICU抢救",
          icon: Microscope,
        },
        {
          year: "2025年1月",
          impact: "Medium",
          title: "紧急手术脱险",
          desc: "经紧急手术解除梗阻，患者成功脱险",
          icon: Sparkles,
        },
      ],
    },
  },

  // 8. 多校撤销艺术专业
  {
    title: "多校撤销艺术专业",
    source: "百度热搜",
    time: "6小时前",
    snippet: "吉林大学停招19个专业，其中6个属于艺术学类。2014-2023年间，服装与服饰设计、产品设计、视觉传达设计等专业撤销数量较多。高校专业调整适应产业转型需求，新增智慧、智能、储能等前沿交叉领域专业。",
    score: "7.2",
    trend: "down",
    color: "text-blue-600",
    url: "https://www.baidu.com/s?wd=%E5%A4%9A%E6%A0%A1%E6%92%A4%E9%94%80%E8%89%BA%E6%9C%AF%E4%B8%93%E4%B8%9A",
    category: "经济消费",
    details: {
      title: "高校专业调整",
      priority: "中等重要",
      background: "教育部发布2024年度普通高等学校本科专业备案和审批结果，全国高校撤销专业点1428个。吉林大学停招19个专业，其中6个为艺术学类专业。多所高校撤销艺术类专业，适应产业转型需求。",
      participants: ["教育部", "各高校", "艺术专业学生", "就业市场", "产业界"],
      impacts: {
        social: "引发对高等教育与就业市场匹配的讨论。艺术类专业就业前景受质疑。",
        economic: "高校专业优化频率加快，新设前沿交叉领域专业，撤销就业率低的专业。",
      },
      status: {
        type: "待观察",
        description: "高校专业持续调整中，艺术专业学生面临转专业或就业压力",
      },
      timeline: [
        {
          year: "2014-2023年",
          impact: "Medium",
          title: "艺术专业撤销潮",
          desc: "服装设计、产品设计、视觉传达等专业撤销数量较多",
          active: true,
          icon: TrendingUp,
        },
        {
          year: "2024年",
          impact: "Medium",
          title: "1428个专业点被撤销",
          desc: "教育部发布结果，全国高校撤销专业点1428个",
          icon: AlertCircle,
        },
        {
          year: "2025年1月",
          impact: "Medium",
          title: "吉林大学停招19专业",
          desc: "吉林大学停招19个专业，其中6个为艺术学类",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 9. 西红柿价格暴涨
  {
    title: "两个西红柿就要10块钱",
    source: "百度热搜",
    time: "1天前",
    snippet: "全国多地西红柿价格明显上涨，零售价飙升至7-10元/斤。农业农村部数据显示，2026年1月1日至16日，西红柿平均批发价格为每公斤8.61元，同比上涨80.9%。网友调侃「鸡蛋都快配不上西红柿了」。",
    score: "7.5",
    trend: "up",
    color: "text-blue-600",
    url: "https://www.baidu.com/s?wd=%E2%80%9C%E4%B8%A4%E4%B8%AA%E8%A5%BF%E7%BA%A2%E6%9F%BF%E5%B0%B1%E8%A6%8110%E5%9D%97%E9%92%B1%E2%80%9D",
    category: "经济消费",
    details: {
      title: "西红柿价格暴涨",
      priority: "中等重要",
      background: "2025年秋冬以来，全国西红柿价格持续上涨。2026年1月，批发均价达到每公斤8.59元，同比上涨76.4%。不利天气接连冲击，影响了当季产量与上市节奏，导致供应紧张、价格飙升。",
      participants: ["消费者", "农业农村部", "蔬菜批发商", "零售商", "农民"],
      impacts: {
        social: "消费者日常生活受影响，引发对食品价格通胀的担忧。",
        economic: "西红柿价格上涨推高CPI，专家预计高价态势可能持续至3月下旬。",
      },
      status: {
        type: "进行中",
        description: "价格仍在高位运行，预计3月下旬后可能回落",
      },
      timeline: [
        {
          year: "2025年秋冬",
          impact: "Medium",
          title: "天气影响产量",
          desc: "不利天气接连冲击，影响当季产量与上市节奏",
          active: true,
          icon: AlertCircle,
        },
        {
          year: "2025年12月",
          impact: "High",
          title: "价格开始上涨",
          desc: "全国西红柿市场批发均价同比上涨76.4%",
          icon: TrendingUp,
        },
        {
          year: "2026年1月",
          impact: "High",
          title: "零售价飙至7-10元/斤",
          desc: "多地西红柿零售价飙升，网友热议鸡蛋配不上西红柿",
          icon: DollarSign,
        },
      ],
    },
  },

  // 10. 50万亿存款到期
  {
    title: "50万亿天量存款将到期 流向受关注",
    source: "百度热搜",
    time: "8小时前",
    snippet: "2026年中国将迎来50万亿定期存款到期潮，市场称为「笼中虎出笼」。机构分析：真正流向资本市场的「脱媒」资金每年仅3-12万亿元。大部分资金将在银行存款体系内部进行边际优化，留存率长期超90%。",
    score: "8.8",
    trend: "up",
    color: "text-blue-600",
    url: "https://www.baidu.com/s?wd=50%E4%B8%87%E4%BA%BF%E5%A4%A9%E9%87%8F%E5%AD%98%E6%AC%BE%E5%B0%86%E5%88%B0%E6%9C%9F+%E6%B5%81%E5%90%91%E5%8F%97%E5%8F%97%E5%85%B3%E6%B3%A8",
    category: "经济消费",
    details: {
      title: "天量存款到期潮",
      priority: "高度重要",
      background: "2026年中国将迎来约50万亿元定期存款到期潮，源于2022-2023年集中存入的三年期产品。市场将这场天量资金迁徙称为「笼中虎出笼」。中金预测居民储蓄率可能降至10%-12.5%，新增2-4万亿活化资金。",
      participants: ["储户", "银行", "证券公司", "中金公司", "监管部门"],
      impacts: {
        economic: "50万亿资金流向影响股市、债市、楼市。分析人士称流入股市规模较缓和，购房与房贷偿还仍是重要去向。",
        social: "居民储蓄偏好依旧强烈，理财方式趋于保守。",
      },
      status: {
        type: "待观察",
        description: "资金流向尚未确定，市场密切关注中",
      },
      timeline: [
        {
          year: "2022-2023年",
          impact: "High",
          title: "大量存入定期",
          desc: "受房地产调整、股市债市震荡影响，资金回流银行定期存款",
          active: true,
          icon: TrendingUp,
        },
        {
          year: "2026年",
          impact: "High",
          title: "50万亿到期潮",
          desc: "集中到期的定期存款规模达50万亿元",
          icon: AlertCircle,
        },
        {
          year: "2026年上半年",
          impact: "Medium",
          title: "资金重新配置",
          desc: "大部分资金在银行体系内边际优化，小部分流向其他投资",
          icon: DollarSign,
        },
      ],
    },
  },

  // 11. 男孩凌晨5点起床写作业晕倒
  {
    title: "男孩凌晨5点起床写作业突然晕倒",
    source: "微博",
    time: "1天前",
    snippet: "一名男孩为了完成作业，凌晨5点起床学习后突然晕倒。该事件引发对学生课业压力、睡眠不足的广泛关注。教育专家呼吁合理安排作息时间，保证学生充足睡眠。",
    score: "7.9",
    trend: "up",
    color: "text-red-500",
    url: "https://s.weibo.com/weibo?q=%23%E7%94%B7%E5%AD%A9%E5%87%8C%E6%99%A85%E7%82%B9%E8%B5%B7%E5%BA%8A%E5%86%99%E4%BD%9C%E4%B8%9A%E7%AA%81%E7%84%B6%E6%99%95%E5%80%92",
    category: "社会争议",
    details: {
      title: "学生课业压力事件",
      priority: "中等重要",
      background: "一名男孩为了完成作业，凌晨5点起床学习后突然晕倒。该事件引发对学生课业压力、睡眠不足的广泛关注。调查显示大部分学生睡得晚是因为作业多、课业压力大。",
      participants: ["学生", "家长", "教育专家", "学校", "网友"],
      impacts: {
        social: "引发对应试教育、学生压力的讨论。呼吁合理安排作息，保证充足睡眠。",
        technical: "专家建议小学生每天睡眠时间应不少于10小时，初中生不少于9小时。",
      },
      status: {
        type: "待观察",
        description: "教育部门需关注学生课业负担问题",
      },
      timeline: [
        {
          year: "2025年1月",
          impact: "High",
          title: "凌晨5点起床写作业",
          desc: "男孩为完成作业，凌晨5点起床学习",
          active: true,
          icon: AlertCircle,
        },
        {
          year: "2025年1月",
          impact: "High",
          title: "突然晕倒",
          desc: "因睡眠不足、课业压力，男孩突然晕倒",
          icon: AlertCircle,
        },
        {
          year: "2025年1月",
          impact: "Medium",
          title: "引发关注",
          desc: "事件引发对学生压力、睡眠问题的广泛讨论",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 12. 强奸幼女被判8年
  {
    title: "强奸幼女被判8年医生父亲是检察官",
    source: "微博",
    time: "2天前",
    snippet: "一起强奸幼女案件的判决引发争议，被告人被判处8年有期徒刑。因其父亲是检察官，网友对司法公正产生质疑。该案件涉及司法公正、量刑标准等敏感话题。",
    score: "8.3",
    trend: "up",
    color: "text-red-500",
    url: "https://s.weibo.com/weibo?q=%E5%BC%BA%E5%A5%B8%E5%B9%BC%E5%A5%B3%E8%A2%AB%E5%88%A48%E5%B9%B4%E5%8C%BB%E7%94%B6%E4%BA%B2%E6%98%AF%E6%A3%80%E5%AF%9F%E5%AE%98",
    category: "社会争议",
    details: {
      title: "司法公正争议",
      priority: "高度重要",
      background: "一起强奸幼女案件的判决引发关注，被告人被判处8年有期徒刑。因其父亲是检察官，网友对司法公正、量刑标准产生质疑。案件涉及司法公正、权力影响等敏感话题。",
      participants: ["被告人", "检察官父亲", "法院", "网友", "法律专家"],
      impacts: {
        social: "引发对司法公正、权力影响的质疑。讨论集中在量刑是否适当、是否存在权力干预。",
        technical: "法律专业人士对判决结果进行分析和解读。",
      },
      status: {
        type: "待观察",
        description: "案件仍在审理中，需进一步关注后续发展",
      },
      timeline: [
        {
          year: "2024年",
          impact: "High",
          title: "案件发生",
          desc: "强奸幼女案件发生，被告人被逮捕",
          active: true,
          icon: AlertCircle,
        },
        {
          year: "2025年",
          impact: "High",
          title: "一审判决",
          desc: "法院一审判决被告人8年有期徒刑",
          icon: Scale,
        },
        {
          year: "2025年1月",
          impact: "High",
          title: "引发争议",
          desc: "因被告人父亲是检察官，引发对司法公正的质疑",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 13. 道歉变处刑
  {
    title: "道歉变处刑道德正义不等于合法判断",
    source: "微博",
    time: "2天前",
    snippet: "网络暴力、道德审判现象引发讨论。专家指出，道德正义不等于合法判断，网络暴力和道德审判可能侵犯他人名誉权、隐私权。需要区分道德谴责与法律制裁的边界。",
    score: "7.1",
    trend: "down",
    color: "text-red-500",
    url: "https://s.weibo.com/weibo?q=%23%E9%81%93%E5%BE%B7%E5%8F%98%E5%A4%84%E5%88%91%E9%81%93%E5%BE%B7%E6%AD%A3%E4%B9%89%E4%B8%8D%E7%AD%89%E4%BA%8E%E5%90%88%E6%B3%95%E5%88%A4%E6%96%AD",
    category: "社会争议",
    details: {
      title: "网络暴力边界",
      priority: "中等重要",
      background: "多起网络暴力、道德审判事件引发社会关注。专家指出，网络上的道德审判可能侵犯他人合法权益。需要区分道德谴责与法律制裁的边界，理性表达观点。",
      participants: ["网友", "法律专家", "平台", "媒体", "受害者"],
      impacts: {
        social: "引发对网络暴力、道德审判的反思。呼吁理性表达，遵守法律底线。",
        technical: "法律专家解读名誉权、隐私权保护，网络言论的法律边界。",
      },
      status: {
        type: "待观察",
        description: "网络暴力现象仍存在，需持续关注和治理",
      },
      timeline: [
        {
          year: "2024-2025年",
          impact: "High",
          title: "多起网络暴力事件",
          desc: "网络上出现多起道德审判、网络暴力事件",
          active: true,
          icon: AlertCircle,
        },
        {
          year: "2025年1月",
          impact: "Medium",
          title: "专家发声",
          desc: "法律专家指出道德正义不等于合法判断",
          icon: TrendingUp,
        },
        {
          year: "2025年",
          impact: "Medium",
          title: "平台治理",
          desc: "社交平台加强网络暴力治理，完善举报机制",
          icon: Scale,
        },
      ],
    },
  },

  // 14. 装死羊身价30万
  {
    title: "装死羊身价飙至30万主人仍不卖",
    source: "百度热搜",
    time: "1天前",
    snippet: "宁夏一只小羊凭「选择性装死」绝技走红，相关视频播放量破千万。其身价从420元飙至30万元，主人拒绝售卖，想借热度推广家乡特产。",
    score: "6.5",
    trend: "up",
    color: "text-blue-600",
    url: "https://www.baidu.com/s?wd=%E2%80%9C%E8%A3%85%E6%AD%BB%E7%BE%8A%E2%80%9D%E8%BA%AB%E4%BB%B7%E9%A3%99%E8%87%B330%E4%B8%87%E4%B8%BB%E4%BA%BA%E4%BB%8D%E4%B8%8D%E5%8D%96",
    category: "经济消费",
    details: {
      title: "网络经济现象",
      priority: "中等重要",
      background: "宁夏一只小羊凭「选择性装死」绝技走红网络，相关视频播放量破千万。其身价从420元飙至30万元，主人拒绝售卖，想借热度推广家乡特产。体现了网络时代的新型经济现象。",
      participants: ["羊主人", "小羊", "网友", "媒体", "地方特产推广者"],
      impacts: {
        social: "体现网络时代的新型经济现象，短视频平台创造的价值。",
        economic: "网络流量变现的新模式，地方特产推广的创新方式。",
      },
      status: {
        type: "进行中",
        description: "小羊成为网络红人，主人借此推广家乡特产",
      },
      timeline: [
        {
          year: "2024年",
          impact: "Medium",
          title: "小羊学会装死",
          desc: "小羊展现「选择性装死」绝技，被主人拍摄视频",
          active: true,
          icon: Sparkles,
        },
        {
          year: "2025年1月",
          impact: "High",
          title: "视频走红",
          desc: "相关视频播放量破千万，小羊成为网络红人",
          icon: TrendingUp,
        },
        {
          year: "2025年1月",
          impact: "Medium",
          title: "身价飙至30万",
          desc: "小羊身价从420元飙至30万元，主人拒绝售卖",
          icon: DollarSign,
        },
      ],
    },
  },

  // 15. 乡村蛋糕店走红
  {
    title: "乡村蛋糕店走红 4寸仅卖10元",
    source: "百度热搜",
    time: "2天前",
    snippet: "河南周口一乡村蛋糕店因低价走红，吸引大批顾客。1月16日店主接受采访时称，店铺开在村里自己家，不要房租但位置偏僻，定价高了没人买。4寸蛋糕仅需10元，没指望赚多少钱，只当找个活干。",
    score: "6.8",
    trend: "up",
    color: "text-blue-600",
    url: "https://www.baidu.com/s?wd=%E4%B9%A1%E6%9D%91%E8%9B%8B%E7%B3%95%E5%BA%97%E8%B5%B0%E7%BA%A2+4%E5%AF%B8%E4%BB%85%E5%8D%9610%E5%85%83",
    category: "经济消费",
    details: {
      title: "消费降级现象",
      priority: "中等重要",
      background: "河南周口一乡村蛋糕店因低价走红网络。4寸蛋糕仅需10元，远低于城市价格。店主表示店铺开在村里自己家，不要房租，定价高了没人买。体现了消费降级、价格亲民的商业策略。",
      participants: ["店主", "顾客", "网友", "媒体", "烘焙行业"],
      impacts: {
        social: "体现消费降级、价格亲民的商业策略，受到网友好评。",
        economic: "低成本运营模式：不要房租、位置偏僻，定价亲民也能盈利。",
      },
      status: {
        type: "进行中",
        description: "乡村蛋糕店持续走红，吸引大批顾客",
      },
      timeline: [
        {
          year: "2024年",
          impact: "Medium",
          title: "开设乡村蛋糕店",
          desc: "店主在村里自己家开设蛋糕店，不要房租",
          active: true,
          icon: Sparkles,
        },
        {
          year: "2025年1月",
          impact: "High",
          title: "因低价走红",
          desc: "4寸蛋糕10元的价格引发关注，店铺走红网络",
          icon: TrendingUp,
        },
        {
          year: "2025年1月",
          impact: "Medium",
          title: "顾客盈门",
          desc: "吸引大批顾客前来购买",
          icon: Users,
        },
      ],
    },
  },

  // 16. BBA在中国遇冷
  {
    title: "奔驰宝马奥迪在中国市场集体遇冷",
    source: "今日头条",
    time: "1天前",
    snippet: "最新财报显示，传统豪华车品牌BBA（奔驰、宝马、奥迪）在中国市场的销量出现下滑。国产新能源汽车崛起，市场竞争加剧，传统豪华品牌面临转型压力。",
    score: "7.6",
    trend: "down",
    color: "text-red-600",
    url: "https://www.toutiao.com/trending/7596297035712564787/",
    category: "经济消费",
    details: {
      title: "豪华车市场变化",
      priority: "中等重要",
      background: "最新财报显示，传统豪华车品牌BBA（奔驰、宝马、奥迪）在中国市场的销量出现下滑。奥迪是唯一实现增长的品牌。国产新能源汽车崛起，市场竞争加剧，传统豪华品牌面临转型压力。",
      participants: ["奔驰", "宝马", "奥迪", "国产新能源车企", "消费者"],
      impacts: {
        economic: "传统豪华车品牌在中国市场遇冷，销量下滑。国产新能源车崛起，抢占市场份额。",
        social: "消费者购车偏好发生变化，更倾向于选择国产新能源汽车。",
      },
      status: {
        type: "进行中",
        description: "BBA品牌面临转型压力，加速电动化布局",
      },
      timeline: [
        {
          year: "2024年",
          impact: "High",
          title: "国产新能源崛起",
          desc: "国产新能源汽车技术进步，市场份额快速提升",
          active: true,
          icon: TrendingUp,
        },
        {
          year: "2024年Q4",
          impact: "Medium",
          title: "BBA销量下滑",
          desc: "奔驰、宝马在中国市场销量出现下滑",
          icon: AlertCircle,
        },
        {
          year: "2025年",
          impact: "Medium",
          title: "奥迪唯一增长",
          desc: "奥迪是BBA中唯一实现增长的品牌",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 17. 程序员年终总结
  {
    title: "【2025年终总结】对象有了，工作没了",
    source: "掘金",
    time: "3天前",
    snippet: "一篇程序员年终总结引发关注：2025年很安稳，没有涨薪也没有被裁员，工作了以后才明白「平静」是一种幸福。不要对工作赋予太多意义和价值，自己的生活才是最重要的。",
    score: "8.1",
    trend: "up",
    color: "text-purple-500",
    url: "https://juejin.cn/post/7595484390428688419",
    category: "科技职场",
    details: {
      title: "程序员职业现状",
      priority: "中等重要",
      background: "一篇程序员年终总结在技术社区引发关注。作者回顾2025年：没有涨薪、没有被裁员、找到了对象。反思了程序员职业发展、工作与生活的平衡等问题。",
      participants: ["程序员", "技术社区", "企业HR", "猎头", "网友"],
      impacts: {
        social: "引发程序员群体对职业发展、工作生活平衡的共鸣和讨论。",
        technical: "AI时代程序员价值重新评估，职业发展路径需要多元化。",
      },
      status: {
        type: "已完成",
        description: "年终总结引发广泛讨论，成为技术社区热门话题",
      },
      timeline: [
        {
          year: "2025年全年",
          impact: "Medium",
          title: "工作平稳",
          desc: "没有涨薪、没有被裁员，工作相对平稳",
          active: true,
          icon: Code,
        },
        {
          year: "2025年",
          impact: "High",
          title: "找到对象",
          desc: "个人生活方面找到了伴侣",
          icon: Sparkles,
        },
        {
          year: "2025年12月",
          impact: "Medium",
          title: "发布年终总结",
          desc: "在技术社区发布年终总结，引发共鸣",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 18. 程序员接单指南
  {
    title: "2026年程序员接单全指南：平台这么多，别再选错了",
    source: "掘金",
    time: "5天前",
    snippet: "随着经济环境变化，越来越多的程序员开始考虑接单副业。本文详细对比各大接单平台的特点、收益、风险，帮助程序员选择适合自己的平台。",
    score: "7.3",
    trend: "up",
    color: "text-purple-500",
    url: "https://juejin.cn/post/7595365551607185459",
    category: "科技职场",
    details: {
      title: "程序员副业生态",
      priority: "中等重要",
      background: "随着经济环境变化，越来越多的程序员开始考虑接单副业。各类接单平台层出不穷，本文对比了各平台的特点、收益、风险，帮助程序员选择适合自己的平台。",
      participants: ["程序员", "接单平台", "客户", "自由职业者", "猎头"],
      impacts: {
        social: "程序员职业发展多元化，副业成为常态。",
        economic: "自由职业生态成熟，平台竞争加剧。",
      },
      status: {
        type: "待观察",
        description: "接单市场持续发展，平台竞争加剧",
      },
      timeline: [
        {
          year: "2024年",
          impact: "Medium",
          title: "经济环境变化",
          desc: "经济环境变化，程序员开始寻找副业",
          active: true,
          icon: TrendingUp,
        },
        {
          year: "2024-2025年",
          impact: "High",
          title: "接单平台兴起",
          desc: "各类程序员接单平台涌现",
          icon: Code,
        },
        {
          year: "2026年1月",
          impact: "Medium",
          title: "发布接单指南",
          desc: "发布2026年程序员接单全指南",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 19. 2025代码进化论
  {
    title: "2025代码进化论：从跟风Cursor到皈依Trae",
    source: "掘金",
    time: "4天前",
    snippet: "一位程序员回顾2025年使用AI编程工具的经历：从年初跟风使用Cursor，到年底「皈依」Trae。反思了AI工具对程序员职业的影响，以及如何在AI时代保持竞争力。",
    score: "7.7",
    trend: "up",
    color: "text-purple-500",
    url: "https://juejin.cn/post/7595311405751386158",
    category: "科技职场",
    details: {
      title: "AI编程工具变迁",
      priority: "中等重要",
      background: "一位程序员回顾2025年使用AI编程工具的经历。年初跟风使用Cursor，后来发现Trae更适合自己。反思了AI工具对程序员职业的影响，以及如何在AI时代保持核心竞争力。",
      participants: ["程序员", "AI工具开发者", "Cursor", "Trae", "技术社区"],
      impacts: {
        technical: "AI编程工具快速发展，程序员需要不断学习和适应新工具。",
        social: "AI时代程序员价值重新评估，需要找到自己的定位。",
      },
      status: {
        type: "已完成",
        description: "文章引发技术社区广泛讨论",
      },
      timeline: [
        {
          year: "2025年初",
          impact: "Medium",
          title: "使用Cursor",
          desc: "跟风使用AI编程工具Cursor",
          active: true,
          icon: Code,
        },
        {
          year: "2025年中",
          impact: "Medium",
          title: "尝试其他工具",
          desc: "尝试了多种AI编程工具",
          icon: Code,
        },
        {
          year: "2025年底",
          impact: "High",
          title: "皈依Trae",
          desc: "发现Trae更适合自己，总结AI工具使用经验",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 20. 20岁迈巴赫公益
  {
    title: "20岁迈巴赫车主把车身贴满宝贝回家",
    source: "百度热搜",
    time: "2天前",
    snippet: "湖南长沙一位20岁的迈巴赫S480车主，车身贴满「宝贝回家」寻亲启事，引发关注。车主表示寻亲启事是自己一张张贴上去的，即使将来会留胶也不后悔，希望通过这种方式让更多人看到寻亲信息。",
    score: "8.4",
    trend: "up",
    color: "text-blue-600",
    url: "https://www.baidu.com/s?wd=20%E5%B2%81%E8%BF%88%E5%B7%B4%E8%B5%AB%E8%BD%A6%E4%B8%BB%E6%8A%8A%E8%BA%AB%E8%B4%B4%E6%BB%A1%E5%AE%9D%E5%9B%9E%E5%AE%B6",
    category: "社会民生",
    details: {
      title: "公益行为引发讨论",
      priority: "中等重要",
      background: "湖南长沙一位20岁的迈巴赫S480车主，车身贴满「宝贝回家」寻亲启事。车主表示寻亲启事是自己一张张贴上去的，即使将来会留胶也不后悔。这种公益行为引发网友关注和讨论。",
      participants: ["20岁车主", "寻亲家庭", "宝贝回家公益", "网友", "媒体"],
      impacts: {
        social: "公益行为引发关注，展现年轻人的社会责任感。",
      },
      status: {
        type: "进行中",
        description: "公益行为持续进行中，帮助更多寻亲家庭",
      },
      timeline: [
        {
          year: "2024年",
          impact: "Medium",
          title: "了解寻亲公益",
          desc: "20岁车主了解到「宝贝回家」寻亲公益",
          active: true,
          icon: Users,
        },
        {
          year: "2025年1月",
          impact: "High",
          title: "贴满寻亲启事",
          desc: "将迈巴赫车身贴满「宝贝回家」寻亲启事",
          icon: Sparkles,
        },
        {
          year: "2025年1月",
          impact: "High",
          title: "引发关注",
          desc: "公益行为引发网友关注和讨论",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 21. 2千万成年人患ADHD
  {
    title: "2千万成年人患ADHD 存过早死亡风险",
    source: "百度热搜",
    time: "5天前",
    snippet: "国内2000万成年人被困「失控人生」，患ADHD（注意缺陷多动障碍），存在过早死亡风险。专家指出：ADHD源于儿童期的神经发育障碍，30%-50%儿童患者的症状会持续至成年，不是懒，是大脑藏着场「隐形病」。",
    score: "7.4",
    trend: "up",
    color: "text-blue-600",
    url: "https://www.baidu.com/s?wd=2%E5%8D%83%E4%B8%87%E6%88%90%E5%B9%B4%E4%BA%BA%E6%82%A3ADHD+%E5%AD%98%E8%BF%87%E6%97%A9%E6%AD%BB%E4%BA%A1%E9%A3%8E%E9%99%A9",
    category: "社会民生",
    details: {
      title: "成人ADHD关注度",
      priority: "中等重要",
      background: "国内2000万成年人患有ADHD，存在过早死亡风险。ADHD是一种源于儿童期的神经发育障碍，过去长期被视为儿童疾病。专家呼吁关注成人ADHD，提供医疗和心理支持。",
      participants: ["ADHD患者", "医学专家", "心理医生", "患者家属", "社会工作者"],
      impacts: {
        social: "引发对成人ADHD的关注和讨论，呼吁社会理解和包容。",
        technical: "ADHD需要专业诊断和治疗，不是简单的「懒惰」或「不自律」。",
      },
      status: {
        type: "待观察",
        description: "成人ADHD诊断和治疗体系仍需完善",
      },
      timeline: [
        {
          year: "儿童期",
          impact: "Medium",
          title: "ADHD发病",
          desc: "儿童期发病，症状持续至成年",
          active: true,
          icon: AlertCircle,
        },
        {
          year: "2025年",
          impact: "Medium",
          title: "关注成人ADHD",
          desc: "专家呼吁关注成人ADHD患者",
          icon: TrendingUp,
        },
        {
          year: "未来",
          impact: "Medium",
          title: "完善诊断治疗",
          desc: "需要建立完善的成人ADHD诊断和治疗体系",
          icon: Microscope,
        },
      ],
    },
  },

  // 22. 帕梅拉胖了6公斤
  {
    title: "帕梅拉胖了6公斤",
    source: "微博",
    time: "1天前",
    snippet: "健身博主帕梅拉（Pamela Reif）在社交媒体上分享自己胖了6公斤，引发对身材焦虑的讨论。她表示接受自己的身体变化，倡导健康的生活方式。",
    score: "6.2",
    trend: "down",
    color: "text-red-500",
    url: "https://s.weibo.com/weibo?q=%E5%B8%95%E6%A2%85%E6%8B%89%E8%83%96%E4%BA%866%E5%85%AC%E6%96%A4",
    category: "社会民生",
    details: {
      title: "身材焦虑话题",
      priority: "中等重要",
      background: "健身博主帕梅拉在社交媒体上分享自己胖了6公斤，引发对身材焦虑的讨论。她表示接受自己的身体变化，倡导健康的生活方式，引发了网友对身体积极性、审美多元化的讨论。",
      participants: ["帕梅拉", "粉丝", "网友", "健身博主", "心理学家"],
      impacts: {
        social: "引发对身体积极性、审美多元化的讨论。",
      },
      status: {
        type: "已完成",
        description: "倡导健康生活方式，接受身体变化",
      },
      timeline: [
        {
          year: "2024年",
          impact: "Medium",
          title: "体重增加",
          desc: "帕梅拉的体重增加了6公斤",
          active: true,
          icon: Users,
        },
        {
          year: "2025年1月",
          impact: "Medium",
          title: "社交媒体分享",
          desc: "在社交媒体上分享自己的身体变化",
          icon: TrendingUp,
        },
        {
          year: "2025年1月",
          impact: "Medium",
          title: "倡导健康生活",
          desc: "倡导健康的生活方式，接受身体变化",
          icon: Sparkles,
        },
      ],
    },
  },

  // 23. 体检报告癌症信号
  {
    title: "体检报告里这些字眼或是癌症信号",
    source: "微博",
    time: "2天前",
    snippet: "医学专家提醒：体检报告中的一些字眼可能是癌症的预警信号。建议定期体检，早发现早治疗。同时提醒不要过度焦虑，应该咨询专业医生获取准确诊断。",
    score: "7.8",
    trend: "up",
    color: "text-red-500",
    url: "https://s.weibo.com/weibo?q=%23%E4%BD%93%E6%A3%80%E6%8A%A5%E5%91%8A%E9%87%8C%E8%BF%99%E4%BA%9B%E5%AD%97%E7%9C%BC%E6%98%AF%E7%99%8C%E7%97%87%E4%BF%A1%E5%8F%B7",
    category: "社会民生",
    details: {
      title: "健康焦虑话题",
      priority: "中等重要",
      background: "医学专家提醒：体检报告中的一些字眼可能是癌症的预警信号。建议定期体检，早发现早治疗。同时提醒不要过度焦虑，应该咨询专业医生获取准确诊断。",
      participants: ["医生", "体检者", "网友", "健康专家", "心理学家"],
      impacts: {
        social: "引发对健康体检的重视，但也带来健康焦虑。",
      },
      status: {
        type: "待观察",
        description: "提醒重视体检，但避免过度焦虑",
      },
      timeline: [
        {
          year: "2024年",
          impact: "Medium",
          title: "发布体检指南",
          desc: "医学专家发布体检报告解读指南",
          active: true,
          icon: Microscope,
        },
        {
          year: "2025年1月",
          impact: "Medium",
          title: "引发关注",
          desc: "体检报告癌症信号话题登上热搜",
          icon: TrendingUp,
        },
        {
          year: "2025年",
          impact: "Medium",
          title: "理性对待",
          desc: "专家提醒不要过度焦虑，应咨询专业医生",
          icon: AlertCircle,
        },
      ],
    },
  },

  // 24. 我的2025
  {
    title: "我的2025：做项目、跑副业、见人、奔波、搬家、维权、再回上海",
    source: "掘金",
    time: "5天前",
    snippet: "一位程序员的2025年终总结：做项目、跑副业、见人、奔波、搬家、维权、再回上海。经历了工作变动、居住地迁移、法律维权等多个重要事件，是充满挑战和变化的一年。",
    score: "7.0",
    trend: "up",
    color: "text-purple-500",
    url: "https://juejin.cn/post/7595147871939493934",
    category: "科技职场",
    details: {
      title: "程序员年度回顾",
      priority: "中等重要",
      background: "一位程序员回顾2025年：做项目、跑副业、见人、奔波、搬家、维权、再回上海。经历了工作变动、居住地迁移、法律维权等多个重要事件，展现了程序员群体面临的挑战和机遇。",
      participants: ["程序员作者", "技术社区", "房东", "律师", "朋友"],
      impacts: {
        social: "展现程序员群体的生活状态，引发共鸣和讨论。",
      },
      status: {
        type: "已完成",
        description: "2025年结束，作者总结全年经历",
      },
      timeline: [
        {
          year: "2025年",
          impact: "Medium",
          title: "做项目、跑副业",
          desc: "同时进行多个项目，发展副业",
          active: true,
          icon: Code,
        },
        {
          year: "2025年",
          impact: "Medium",
          title: "搬家、维权",
          desc: "经历搬家、维权等事件",
          icon: AlertCircle,
        },
        {
          year: "2025年底",
          impact: "Medium",
          title: "回到上海",
          desc: "最终回到上海，结束一年的奔波",
          icon: TrendingUp,
        },
      ],
    },
  },

  // 25. 西贝关闭102家店
  {
    title: "西贝将关闭102家店，4000名员工失业下岗。贾国龙：被污蔑125天，尽力了",
    source: "虎扑",
    time: "3天前",
    snippet: "西贝餐饮集团宣布将关闭102家门店，导致约4000名员工失业下岗。创始人贾国龙回应称「被污蔑125天，尽力了」。此前罗永浩曾批评西贝的价格策略，引发争议。",
    score: "7.5",
    trend: "up",
    color: "text-red-500",
    url: "https://bbs.hupu.com/636937050.html",
    category: "经济消费",
    details: {
      title: "餐饮行业调整",
      priority: "中等重要",
      background: "西贝餐饮集团宣布关闭102家门店，约4000名员工受影响。创始人贾国龙称此前被罗永浩批评为「污蔑」持续125天。事件反映了餐饮行业面临的经营压力和调整。",
      participants: ["西贝餐饮", "贾国龙", "罗永浩", "员工", "网友"],
      impacts: {
        economic: "餐饮行业面临经营压力，关闭门店、裁员应对。",
        social: "引发对企业家言辞、企业社会责任的讨论。",
      },
      status: {
        type: "已完成",
        description: "门店关闭完成，员工遣散工作已进行",
      },
      timeline: [
        {
          year: "2024年",
          impact: "High",
          title: "罗永浩批评",
          desc: "罗永浩批评西贝价格策略，引发争议",
          active: true,
          icon: AlertCircle,
        },
        {
          year: "2024-2025年",
          impact: "Medium",
          title: "持续125天争议",
          desc: "贾国龙称被「污蔑」持续125天",
          icon: AlertCircle,
        },
        {
          year: "2025年1月",
          impact: "High",
          title: "关闭102家店",
          desc: "宣布关闭102家门店，4000名员工受影响",
          icon: AlertCircle,
        },
      ],
    },
  },
]
