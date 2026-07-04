// 南部县常见柑橘病虫害知识库（本地 Mock 数据）
// 真实项目中应来自后端接口，此处为 Demo 演示数据

export type PestCategory = "虫害" | "病害";
export type Severity = "轻" | "中" | "重";
export type IllustrationKey =
  | "spider"
  | "anthracnose"
  | "leafminer"
  | "canker"
  | "scaleInsect"
  | "rustMite"
  | "footRot"
  | "gummosis";

export interface Pest {
  id: string;
  name: string;
  alias: string; // 俗称
  category: PestCategory;
  severity: Severity;
  description: string;
  symptoms: string[]; // 典型症状
  recognitionBasis: string[]; // 识别依据（展示给农户）
  prevention: {
    agricultural: string[]; // 农业防治
    chemical: string[]; // 化学防治
    cautions: string[]; // 用药注意
  };
  riskNote: string;
  accentColor: string; // 卡片主色 hex
  illustration: IllustrationKey;
  season: string; // 高发季节
  safetyPeriod: number; // 采前禁用天数
  peakMonths: number[]; // 高发月份（1-12）
}

export const PESTS: Pest[] = [
  {
    id: "red-spider",
    name: "红蜘蛛",
    alias: "柑橘全爪螨",
    category: "虫害",
    severity: "中",
    description:
      "柑橘上最常见的螨类害虫，刺吸叶片汁液，严重时导致大量落叶、落果，影响树势和产量。",
    symptoms: [
      "叶片正面出现灰白色失绿小点",
      "叶背可见红色或暗红色小点（虫体）",
      "严重时叶片灰白枯黄、易脱落",
      "春梢与秋梢期高发",
    ],
    recognitionBasis: [
      "叶片正面密布针尖大小灰白失绿斑点",
      "叶背观察到红色或暗红色活动虫体",
      "为害主要集中在春梢老熟期与秋梢期",
    ],
    prevention: {
      agricultural: [
        "冬季清园，剪除病虫枝、清扫落叶集中烧毁",
        "合理修剪，改善树体通风透光",
        "加强肥水管理，增强树势",
      ],
      chemical: [
        "春季发芽前喷石硫合剂清园",
        "发生期选用阿维菌素、螺螨酯、乙螨唑等轮换使用",
        "重点喷叶背，喷匀喷透",
      ],
      cautions: [
        "螨类易产生抗药性，同一药剂一季最多使用 2 次",
        "阿维菌素对鱼、蜂高毒，花期与水源地慎用",
        "采果前 30 天停止用药",
      ],
    },
    riskNote:
      "若整园 50% 以上叶片出现失绿斑点并开始落叶，说明虫口密度较大，建议尽快联系农技人员统一指导防治，避免单家单户打药造成扩散反复。",
    accentColor: "#DC2626",
    illustration: "spider",
    season: "春梢与秋梢期（3-5 月、9-11 月）",
    safetyPeriod: 30,
    peakMonths: [3, 4, 5, 9, 10, 11],
  },
  {
    id: "anthracnose",
    name: "炭疽病",
    alias: "炭疽",
    category: "病害",
    severity: "重",
    description:
      "由真菌引起的常见病害，为害叶片、枝梢、果实，造成落叶、枯枝、落果，储运期可继续扩展。",
    symptoms: [
      "叶片出现黄褐色小点，扩大成圆形或不规则病斑",
      "病斑中央灰白，边缘深褐色，常呈轮纹状",
      "嫩梢、嫩叶受害易枯死呈'爆皮'状",
      "果面出现凹陷褐斑，潮湿时溢出橘红色黏孢团",
    ],
    recognitionBasis: [
      "病斑中央灰白色、边缘深褐色，有轮纹",
      "潮湿环境下病部出现橘红色孢子团",
      "多发生在嫩梢、嫩叶与近熟果实上",
    ],
    prevention: {
      agricultural: [
        "冬季清园，剪除病枝病叶并烧毁",
        "加强排水，降低园内湿度",
        "增施有机肥和钾肥，提高抗病力",
      ],
      chemical: [
        "春梢萌发期、幼果期喷保护性杀菌剂（如代森锰锌）",
        "发病初期选用咪鲜胺、苯醚甲环唑、溴菌腈等",
        "连喷 2-3 次，间隔 7-10 天",
      ],
      cautions: [
        "采果前 21 天停止使用咪鲜胺",
        "药剂轮换使用，避免单一药剂产生抗性",
        "储运前对果品进行分选，剔除病果",
      ],
    },
    riskNote:
      "炭疽病在多雨高湿季节传播迅速，若发现嫩梢大面积枯死或近熟果大量出现凹陷褐斑，应立即联系农技人员评估是否需要统一防治，避免果实损失扩大。",
    accentColor: "#B45309",
    illustration: "anthracnose",
    season: "春雨季 / 梅雨季（4-6 月、9 月）",
    safetyPeriod: 21,
    peakMonths: [4, 5, 6, 9],
  },
  {
    id: "leafminer",
    name: "潜叶蛾",
    alias: "绘图虫",
    category: "虫害",
    severity: "轻",
    description:
      "幼虫潜入嫩叶表皮下取食叶肉，形成弯曲银白色虫道，使叶片卷曲硬化，影响新梢生长，并诱发溃疡病。",
    symptoms: [
      "嫩叶出现弯曲银白色虫道",
      "叶片卷曲、硬化、皱缩",
      "受害严重时新梢枯萎",
      "秋梢萌发期危害最重",
    ],
    recognitionBasis: [
      "嫩叶上可见弯曲银白色透明虫道",
      "虫道末端常见黑色虫粪或蛹",
      "主要发生在嫩梢生长期，老叶少见",
    ],
    prevention: {
      agricultural: [
        "统一抹梢控梢，避免嫩梢抽发不齐",
        "剪除受害嫩梢集中销毁",
        "秋梢萌发期重点防控",
      ],
      chemical: [
        "嫩梢长 0.5-1cm 时喷第一次药",
        "选用阿维菌素、高效氯氟氰菊酯、虱螨脲等",
        "连喷 2 次，间隔 7 天",
      ],
      cautions: [
        "重点喷嫩梢嫩叶，老叶不必全株重喷",
        "菊酯类对天敌与鱼蜂有影响，注意使用环境",
        "嫩梢期避免使用易产生药害的乳油剂型",
      ],
    },
    riskNote:
      "潜叶蛾造成的伤口易诱发柑橘溃疡病，若发现虫道附近出现水渍状病斑，建议同时排查溃疡病并联系农技人员综合判断。",
    accentColor: "#0891B2",
    illustration: "leafminer",
    season: "夏秋梢期（7-9 月）",
    safetyPeriod: 14,
    peakMonths: [7, 8, 9],
  },
  {
    id: "canker",
    name: "溃疡病",
    alias: "柑橘溃疡病",
    category: "病害",
    severity: "重",
    description:
      "国内外重要检疫性细菌病害，为害叶片、枝梢、果实，形成木栓化病斑，严重时落叶落果，影响出口与销售。",
    symptoms: [
      "叶片出现针头大黄色油渍状小点",
      "病斑隆起木栓化，中央凹陷呈火山口状",
      "病斑周围有黄色晕圈",
      "果实病斑类似叶片，影响外观与商品性",
    ],
    recognitionBasis: [
      "病斑木栓化隆起，中央呈火山口状开裂",
      "病斑周围有明显黄色晕圈",
      "叶片、嫩梢、果实同时发病",
    ],
    prevention: {
      agricultural: [
        "严禁从疫区引进苗木和接穗",
        "剪除病枝病叶病果，集中烧毁",
        "加强潜叶蛾防治，减少伤口感染",
      ],
      chemical: [
        "春梢期、幼果期、秋梢期各喷 1-2 次铜制剂",
        "选用氢氧化铜、春雷霉素、噻菌铜等",
        "台风暴雨后立即补喷保护",
      ],
      cautions: [
        "铜制剂不可与酸性农药混用",
        "高温强光下使用铜制剂易产生药害",
        "溃疡病为检疫对象，发现疑似应同时上报",
      ],
    },
    riskNote:
      "溃疡病是检疫性病害，一旦疑似确诊，除防治外还应向当地农技部门或县农业局上报，便于统一监测与管控，避免大面积扩散。",
    accentColor: "#7C3AED",
    illustration: "canker",
    season: "夏秋高温多雨季（5-9 月）",
    safetyPeriod: 30,
    peakMonths: [5, 6, 7, 8, 9],
  },
  {
    id: "scale-insect",
    name: "介壳虫",
    alias: "矢尖蚧",
    category: "虫害",
    severity: "中",
    description:
      "雌成虫及若虫固定在枝干、叶片、果实上吸食汁液，造成树势衰弱、叶片黄化、果实品质下降，并诱发煤烟病。",
    symptoms: [
      "枝干上有褐色或灰白色圆形隆起虫体",
      "虫体表面有蜡质分泌物，似蜡壳",
      "被害叶片发黄、易脱落",
      "果实表面出现虫体附着痕迹",
      "诱发煤烟病，叶片表面有黑色霉层",
    ],
    recognitionBasis: [
      "枝干、叶片可见圆形或椭圆形隆起虫体",
      "虫体表面覆盖蜡质壳，不易脱落",
      "虫体周围常有黑色煤烟状霉层",
      "多发生在树冠内膛荫蔽枝条",
    ],
    prevention: {
      agricultural: [
        "冬季清园，剪除被害枝条并烧毁",
        "合理修剪，改善树冠通风透光",
        "加强肥水管理，增强树势",
        "保护天敌如瓢虫、寄生蜂",
      ],
      chemical: [
        "若虫孵化盛期是防治关键期（5-6 月、7-8 月）",
        "选用噻嗪酮、毒死蜱、矿物油等",
        "喷药前先刮除部分蜡壳提高药效",
        "连喷 2-3 次，间隔 10-15 天",
      ],
      cautions: [
        "成虫蜡壳抗药性强，应在若虫期防治",
        "矿物油在高温下易产生药害，避开烈日时段",
        "保护天敌，避免广谱杀虫剂滥用",
        "采果前 30 天停止用药",
      ],
    },
    riskNote:
      "介壳虫一旦大面积发生，防治难度较大。若发现整园枝条虫体密度高，建议联系农技人员制定综合防治方案，避免单次用药效果不佳。",
    accentColor: "#8B5CF6",
    illustration: "scaleInsect",
    season: "若虫孵化期（5-6 月、7-8 月）",
    safetyPeriod: 30,
    peakMonths: [5, 6, 7, 8],
  },
  {
    id: "rust-mite",
    name: "锈壁虱",
    alias: "柑橘锈螨",
    category: "虫害",
    severity: "轻",
    description:
      "螨类害虫，主要在叶背吸食汁液，造成叶背黄褐色锈斑，果实表面出现黑褐色麻点，影响果实外观与商品性。",
    symptoms: [
      "叶背出现黄褐色或黑褐色锈斑",
      "果实表面有密集黑褐色小点（俗称麻果）",
      "锈斑区域叶片逐渐枯黄",
      "高温干旱季节危害加重",
    ],
    recognitionBasis: [
      "叶背黄褐色锈斑，用手摸有粗糙感",
      "果实表面密集黑褐色小点",
      "用放大镜观察可见黄色或白色活动螨体",
      "多发生在高温干旱季节",
    ],
    prevention: {
      agricultural: [
        "冬季清园，喷施石硫合剂",
        "加强水分管理，避免干旱加剧危害",
        "合理修剪，改善通风透光",
        "保护捕食螨等天敌",
      ],
      chemical: [
        "发生初期选用阿维菌素、螺螨酯",
        "重点喷叶背和果实表面",
        "连喷 2 次，间隔 7-10 天",
        "避免高温时段喷药防止药害",
      ],
      cautions: [
        "锈壁虱体型微小，需仔细检查叶背",
        "高温干旱期易爆发，需提前预防",
        "阿维菌素对鱼蜂有毒，注意使用安全",
        "采收前 21 天停止用药",
      ],
    },
    riskNote:
      "锈壁虱危害主要影响果实外观，虽不致命但严重影响商品价值。若发现果实大面积出现麻点，建议尽快防治。",
    accentColor: "#D97706",
    illustration: "rustMite",
    season: "高温干旱季（6-9 月）",
    safetyPeriod: 21,
    peakMonths: [6, 7, 8, 9],
  },
  {
    id: "foot-rot",
    name: "脚腐病",
    alias: "柑橘根腐病",
    category: "病害",
    severity: "重",
    description:
      "由真菌引起的根颈部病害，造成根颈部腐烂、树势衰弱、叶片黄化卷曲，严重时整株死亡。",
    symptoms: [
      "根颈部皮层褐变、腐烂、流胶",
      "叶片黄化、卷曲、易脱落",
      "树势衰弱，新梢生长不良",
      "严重时整株枯死",
    ],
    recognitionBasis: [
      "根颈部皮层褐变腐烂，有酒糟味",
      "剥开皮层可见褐色腐烂层",
      "叶片黄化卷曲，从顶部向下发展",
      "土壤排水不良、积水易发病",
    ],
    prevention: {
      agricultural: [
        "改善排水，避免根颈部积水",
        "嫁接时提高嫁接口高度，避免病菌侵染",
        "发现病株及时刮除腐烂皮层并涂药",
        "加强土壤管理，避免板结",
      ],
      chemical: [
        "刮除病部后涂刷甲霜灵、代森锰锌",
        "根部浇灌甲霜灵锰锌、多菌灵",
        "连施 2-3 次，间隔 10-15 天",
        "结合土壤消毒剂使用",
      ],
      cautions: [
        "刮病部时刀具需消毒避免交叉感染",
        "施药后覆盖新鲜土壤促进愈合",
        "严重病株建议挖除防止传染",
        "嫁接苗需选用抗病砧木",
      ],
    },
    riskNote:
      "脚腐病一旦发生往往危害严重，若发现多株树同时发病，需立即排查排水问题并联系农技人员制定综合救治方案，避免大面积死亡。",
    accentColor: "#DC2626",
    illustration: "footRot",
    season: "雨季积水期（4-7 月）",
    safetyPeriod: 30,
    peakMonths: [4, 5, 6, 7],
  },
  {
    id: "gummosis",
    name: "树脂病",
    alias: "流胶病",
    category: "病害",
    severity: "中",
    description:
      "由真菌引起的树干病害，造成树干流胶、皮层腐烂，叶片边缘黄化，严重时树势衰弱、枝干枯死。",
    symptoms: [
      "树干皮层开裂、流胶",
      "流胶处皮层褐变腐烂",
      "叶片边缘黄化、卷曲",
      "病枝生长衰弱或枯死",
      "多发生在冻害或机械损伤后",
    ],
    recognitionBasis: [
      "树干或枝条有琥珀色或褐色胶状物流出",
      "流胶处皮层褐变腐烂",
      "叶片边缘黄化，从叶尖向叶基扩展",
      "常发生在伤口或冻害部位",
    ],
    prevention: {
      agricultural: [
        "避免树干机械损伤",
        "冬季防冻，减轻冻害诱因",
        "刮除病部坏死组织并涂药",
        "加强肥水管理增强树势",
      ],
      chemical: [
        "刮病部后涂刷石硫合剂、甲霜灵",
        "喷施代森锰锌保护树干",
        "雨季前提前喷药预防",
        "连涂 2-3 次",
      ],
      cautions: [
        "刮病部刀具需消毒避免传播",
        "流胶病常与冻害并发，需注意防冻",
        "涂药后保护伤口促进愈合",
        "严重病枝可考虑剪除",
      ],
    },
    riskNote:
      "树脂病常因冻害或伤口诱发，若发现多株树干同时流胶，需排查是否有冻害或机械损伤史，并联系农技人员制定综合防治。",
    accentColor: "#A16207",
    illustration: "gummosis",
    season: "冻害后或雨季（冬春交界）",
    safetyPeriod: 30,
    peakMonths: [11, 12, 1, 2, 3],
  },
];

export const PEST_MAP: Record<string, Pest> = PESTS.reduce(
  (acc, p) => ({ ...acc, [p.id]: p }),
  {} as Record<string, Pest>
);

// 根据示例图 key 返回模拟识别结果（含置信度与备选）
export interface ScanResult {
  pestId: string;
  confidence: number;
  alternatives: { pestId: string; confidence: number }[];
}

export function mockScan(sampleKey: string): ScanResult {
  // sampleKey 即对应 pestId，模拟主识别 + 1-2 个备选
  const main = sampleKey;
  const others = PESTS.filter((p) => p.id !== main).map((p) => ({
    pestId: p.id,
    confidence: Math.round(8 + Math.random() * 14), // 备选低置信度
  }));
  const confidenceMap: Record<string, number> = {
    "red-spider": 88,
    anthracnose: 84,
    leafminer: 91,
    canker: 79,
  };
  return {
    pestId: main,
    confidence: confidenceMap[main] ?? 80,
    alternatives: others.sort((a, b) => b.confidence - a.confidence).slice(0, 2),
  };
}
