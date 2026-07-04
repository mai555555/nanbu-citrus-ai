// 写实风格"病叶照片"的 SVG 缩略图
// 使用渐变、纹理、真实叶片形状模拟照片效果
import type { IllustrationKey } from "@/data/pests";

interface SampleImage {
  key: string; // 与 pestId 对应
  label: string;
  description: string;
}

export const SAMPLE_IMAGES: SampleImage[] = [
  {
    key: "red-spider",
    label: "叶片失绿斑点",
    description: "叶面密布灰白点，叶背红色小点，疑似红蜘蛛",
  },
  {
    key: "anthracnose",
    label: "叶片轮纹病斑",
    description: "病斑中央灰白、边缘深褐，疑似炭疽病",
  },
  {
    key: "leafminer",
    label: "叶片银白虫道",
    description: "嫩叶弯曲银白虫道，疑似潜叶蛾",
  },
  {
    key: "canker",
    label: "叶片火山口病斑",
    description: "木栓化隆起带黄晕，疑似溃疡病",
  },
  {
    key: "scale-insect",
    label: "枝条虫体附着",
    description: "枝条有褐色圆形虫体，疑似介壳虫",
  },
  {
    key: "rust-mite",
    label: "叶背锈色斑",
    description: "叶背黄褐色锈斑，疑似锈壁虱",
  },
  {
    key: "foot-rot",
    label: "根颈腐烂症状",
    description: "叶片黄化卷曲，根颈部褐变，疑似脚腐病",
  },
  {
    key: "gummosis",
    label: "树干流胶症状",
    description: "树干流胶，叶片边缘黄化，疑似树脂病",
  },
];

// 写实风格病叶 SVG
export function sampleSvgDataUri(key: IllustrationKey): string {
  const svgs: Record<IllustrationKey, string> = {
    // 红蜘蛛：叶片正面密布灰白失绿斑点，叶背有红色虫体
    spider: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
      <defs>
        <linearGradient id='leafGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='#2d5a1c'/>
          <stop offset='40%' stop-color='#1f4412'/>
          <stop offset='100%' stop-color='#153609'/>
        </linearGradient>
        <filter id='noise'>
          <feTurbulence baseFrequency='0.04' numOctaves='3' result='noise'/>
          <feDiffuseLighting in='noise' lighting-color='#fff' surfaceScale='1.5' result='light'>
            <feDistantLight azimuth='45' elevation='60'/>
          </feDiffuseLighting>
          <feBlend in='SourceGraphic' in2='light' mode='multiply'/>
        </filter>
        <radialGradient id='spotGrad' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stop-color='#d8d8c0' stop-opacity='0.9'/>
          <stop offset='100%' stop-color='#c0c0a8' stop-opacity='0'/>
        </radialGradient>
      </defs>
      <rect width='400' height='300' fill='#0a1505'/>
      <ellipse cx='200' cy='150' rx='160' ry='100' fill='url(#leafGrad)' filter='url(#noise)'/>
      <path d='M60 150 L340 150' stroke='#0a1f05' stroke-width='1' opacity='0.4'/>
      <path d='M120 90 L280 210' stroke='#0a1f05' stroke-width='0.5' opacity='0.3'/>
      <path d='M160 60 L240 240' stroke='#0a1f05' stroke-width='0.5' opacity='0.3'/>
      <!-- 失绿斑点 -->
      <g fill='url(#spotGrad)' opacity='0.85'>
        <ellipse cx='80' cy='120' rx='4' ry='3'/><ellipse cx='95' cy='100' rx='3.5' ry='2.8'/>
        <ellipse cx='130' cy='115' rx='4' ry='3'/><ellipse cx='155' cy='105' rx='3' ry='2.5'/>
        <ellipse cx='180' cy='125' rx='5' ry='4'/><ellipse cx='210' cy='110' rx='4' ry='3'/>
        <ellipse cx='240' cy='130' rx='4.5' ry='3.5'/><ellipse cx='270' cy='115' rx='4' ry='3'/>
        <ellipse cx='300' cy='125' rx='3.5' ry='2.8'/><ellipse cx='85' cy='150' rx='4' ry='3'/>
        <ellipse cx='115' cy='145' rx='3' ry='2.5'/><ellipse cx='145' cy='155' rx='4' ry='3'/>
        <ellipse cx='175' cy='150' rx='5' ry='4'/><ellipse cx='205' cy='155' rx='4' ry='3'/>
        <ellipse cx='235' cy='150' rx='4.5' ry='3.5'/><ellipse cx='265' cy='160' rx='3' ry='2.5'/>
        <ellipse cx='295' cy='145' rx='4' ry='3'/><ellipse cx='90' cy='180' rx='3.5' ry='2.8'/>
        <ellipse cx='120' cy='175' rx='4' ry='3'/><ellipse cx='150' cy='190' rx='3' ry='2.5'/>
        <ellipse cx='180' cy='180' rx='4' ry='3'/><ellipse cx='210' cy='185' rx='5' ry='4'/>
        <ellipse cx='240' cy='190' rx='4' ry='3'/><ellipse cx='270' cy='175' rx='3.5' ry='2.8'/>
        <ellipse cx='300' cy='180' rx='4' ry='3'/>
      </g>
      <!-- 红蜘蛛虫体 -->
      <g fill='#b91c1c'>
        <circle cx='175' cy='155' r='3.5'/><circle cx='200' cy='140' r='3'/>
        <circle cx='230' cy='160' r='3.5'/><circle cx='260' cy='150' r='2.5'/>
      </g>
      <!-- 虫体高光 -->
      <g fill='#dc2626' opacity='0.6'>
        <circle cx='174' cy='154' r='1'/><circle cx='199' cy='139' r='0.8'/>
        <circle cx='229' cy='159' r='1'/><circle cx='259' cy='149' r='0.6'/>
      </g>
    </svg>`,
    
    // 炭疽病：叶片上圆形病斑，中央灰白边缘深褐
    anthracnose: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
      <defs>
        <linearGradient id='leafGrad2' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='#2d5a1c'/>
          <stop offset='40%' stop-color='#1f4412'/>
          <stop offset='100%' stop-color='#153609'/>
        </linearGradient>
        <filter id='noise2'>
          <feTurbulence baseFrequency='0.05' numOctaves='3' result='noise'/>
          <feDiffuseLighting in='noise' lighting-color='#fff' surfaceScale='1.5' result='light'>
            <feDistantLight azimuth='45' elevation='55'/>
          </feDiffuseLighting>
          <feBlend in='SourceGraphic' in2='light' mode='multiply'/>
        </filter>
        <radialGradient id='anthSpot1' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stop-color='#2a1808'/>
          <stop offset='30%' stop-color='#5c3a1a'/>
          <stop offset='60%' stop-color='#c9b88a'/>
          <stop offset='100%' stop-color='#8a6d3b'/>
        </radialGradient>
        <radialGradient id='anthSpot2' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stop-color='#1a1006'/>
          <stop offset='25%' stop-color='#3a2510'/>
          <stop offset='70%' stop-color='#6b4423'/>
        </radialGradient>
      </defs>
      <rect width='400' height='300' fill='#0a1505'/>
      <ellipse cx='200' cy='150' rx='160' ry='100' fill='url(#leafGrad2)' filter='url(#noise2)'/>
      <path d='M60 150 L340 150' stroke='#0a1f05' stroke-width='1' opacity='0.4'/>
      <!-- 主病斑 -->
      <ellipse cx='180' cy='140' rx='32' ry='28' fill='url(#anthSpot1)' opacity='0.95'/>
      <ellipse cx='180' cy='140' rx='22' ry='18' fill='#c9b88a' opacity='0.85'/>
      <ellipse cx='180' cy='140' rx='14' ry='11' fill='#5c3a1a'/>
      <ellipse cx='180' cy='140' rx='6' ry='5' fill='#2a1808'/>
      <!-- 孢子堆 -->
      <g fill='#f97316' opacity='0.75'>
        <circle cx='172' cy='136' r='1.5'/><circle cx='188' cy='142' r='1.2'/>
        <circle cx='175' cy='148' r='1'/><circle cx='183' cy='133' r='0.8'/>
      </g>
      <!-- 次病斑 -->
      <ellipse cx='260' cy='170' rx='18' ry='15' fill='url(#anthSpot2)' opacity='0.9'/>
      <ellipse cx='260' cy='170' rx='12' ry='10' fill='#6b4423'/>
      <ellipse cx='260' cy='170' rx='6' ry='5' fill='#3a2510'/>
      <!-- 边缘晕圈 -->
      <ellipse cx='180' cy='140' rx='36' ry='32' fill='none' stroke='#5c3a1a' stroke-width='0.5' opacity='0.5'/>
      <ellipse cx='260' cy='170' rx='22' ry='18' fill='none' stroke='#3a2510' stroke-width='0.5' opacity='0.4'/>
    </svg>`,
    
    // 潜叶蛾：银白色弯曲虫道
    leafminer: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
      <defs>
        <linearGradient id='leafGrad3' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='#3d6e28'/>
          <stop offset='40%' stop-color='#2a5a1e'/>
          <stop offset='100%' stop-color='#1a4010'/>
        </linearGradient>
        <linearGradient id='tunnelGrad' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stop-color='#e8e8d0' stop-opacity='0.9'/>
          <stop offset='50%' stop-color='#f5f5e5' stop-opacity='0.85'/>
          <stop offset='100%' stop-color='#e0e0c8' stop-opacity='0.9'/>
        </linearGradient>
        <filter id='noise3'>
          <feTurbulence baseFrequency='0.04' numOctaves='2'/>
        </filter>
      </defs>
      <rect width='400' height='300' fill='#0a1505'/>
      <ellipse cx='200' cy='150' rx='160' ry='100' fill='url(#leafGrad3)'/>
      <path d='M60 150 L340 150' stroke='#0a1f05' stroke-width='1' opacity='0.35'/>
      <!-- 主虫道 -->
      <path d='M70 165 Q95 140 120 160 Q145 180 170 150 Q195 120 220 155 Q245 175 270 145 Q290 125 310 155 Q320 170 300 185'
        fill='none' stroke='url(#tunnelGrad)' stroke-width='4' opacity='0.92'/>
      <!-- 虫道边缘 -->
      <path d='M70 165 Q95 140 120 160 Q145 180 170 150 Q195 120 220 155 Q245 175 270 145 Q290 125 310 155'
        fill='none' stroke='#c0c0a8' stroke-width='1' opacity='0.4'/>
      <!-- 蛹/幼虫 -->
      <ellipse cx='305' cy='182' rx='4' ry='3' fill='#1a1a1a'/>
      <ellipse cx='305' cy='182' rx='2' ry='1.5' fill='#0f0f0f'/>
      <!-- 次虫道 -->
      <path d='M90 100 Q110 85 130 105 Q150 115 140 130'
        fill='none' stroke='#e5e5cc' stroke-width='2.5' opacity='0.7'/>
      <path d='M280 90 Q300 80 320 100'
        fill='none' stroke='#e5e5cc' stroke-width='2' opacity='0.6'/>
      <!-- 新嫩叶区域 -->
      <path d='M300 150 Q320 130 340 155 Q350 170 330 185'
        fill='none' stroke='#3d6e28' stroke-width='2' opacity='0.5'/>
    </svg>`,
    
    // 溃疡病：木栓化火山口状病斑，带黄晕
    canker: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
      <defs>
        <linearGradient id='leafGrad4' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='#2d5a1c'/>
          <stop offset='40%' stop-color='#1f4412'/>
          <stop offset='100%' stop-color='#153609'/>
        </linearGradient>
        <radialGradient id='cankerSpot' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stop-color='#1a1006'/>
          <stop offset='15%' stop-color='#2a1810'/>
          <stop offset='40%' stop-color='#5c3a1a'/>
          <stop offset='70%' stop-color='#6b4423'/>
          <stop offset='100%' stop-color='#4a2f15'/>
        </radialGradient>
      </defs>
      <rect width='400' height='300' fill='#0a1505'/>
      <ellipse cx='200' cy='150' rx='160' ry='100' fill='url(#leafGrad4)'/>
      <path d='M60 150 L340 150' stroke='#0a1f05' stroke-width='1' opacity='0.4'/>
      <!-- 黄晕 -->
      <ellipse cx='185' cy='150' rx='40' ry='35' fill='#fbbf24' opacity='0.35'/>
      <ellipse cx='185' cy='150' rx='35' ry='30' fill='#fbbf24' opacity='0.25'/>
      <!-- 主病斑 -->
      <ellipse cx='185' cy='150' rx='26' ry='22' fill='url(#cankerSpot)' opacity='0.95'/>
      <ellipse cx='185' cy='150' rx='18' ry='15' fill='#5c3a1a'/>
      <ellipse cx='185' cy='150' rx='10' ry='8' fill='#2a1810'/>
      <ellipse cx='185' cy='150' rx='4' ry='3' fill='#1a1006'/>
      <!-- 火山口裂痕 -->
      <line x1='175' y1='140' x2='195' y2='160' stroke='#0a0605' stroke-width='0.8'/>
      <line x1='195' y1='140' x2='175' y2='160' stroke='#0a0605' stroke-width='0.8'/>
      <line x1='185' y1='142' x2='185' y2='158' stroke='#0a0605' stroke-width='0.6'/>
      <!-- 小病斑 -->
      <ellipse cx='270' cy='120' rx='20' ry='16' fill='#fbbf24' opacity='0.25'/>
      <ellipse cx='270' cy='120' rx='12' ry='10' fill='#6b4423'/>
      <ellipse cx='270' cy='120' rx='6' ry='5' fill='#3a2510'/>
      <ellipse cx='270' cy='120' rx='2.5' ry='2' fill='#1a1006'/>
      <!-- 边缘晕 -->
      <ellipse cx='185' cy='150' rx='44' ry='38' fill='none' stroke='#fbbf24' stroke-width='0.5' opacity='0.3'/>
    </svg>`,
    
    // 介壳虫：枝条上有褐色圆形虫体附着
    scaleInsect: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
      <defs>
        <linearGradient id='branchGrad' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stop-color='#4a3020'/>
          <stop offset='50%' stop-color='#5a4030'/>
          <stop offset='100%' stop-color='#3a2015'/>
        </linearGradient>
        <linearGradient id='scaleGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='#5a4a3a'/>
          <stop offset='40%' stop-color='#4a3a2a'/>
          <stop offset='100%' stop-color='#3a2a1a'/>
        </linearGradient>
        <linearGradient id='leafGrad5' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='#2d5a1c'/>
          <stop offset='100%' stop-color='#153609'/>
        </linearGradient>
      </defs>
      <rect width='400' height='300' fill='#0a1505'/>
      <!-- 枝条 -->
      <path d='M50 120 Q120 110 200 115 Q280 120 350 110' fill='none' stroke='url(#branchGrad)' stroke-width='16' stroke-linecap='round'/>
      <path d='M50 120 Q120 110 200 115 Q280 120 350 110' fill='none' stroke='#2a1810' stroke-width='2' opacity='0.4'/>
      <!-- 叶片 -->
      <ellipse cx='140' cy='160' rx='50' ry='30' fill='url(#leafGrad5)' opacity='0.8'/>
      <ellipse cx='260' cy='155' rx='45' ry='28' fill='url(#leafGrad5)' opacity='0.8'/>
      <!-- 介壳虫虫体 -->
      <g fill='url(#scaleGrad)' opacity='0.9'>
        <ellipse cx='100' cy='115' rx='8' ry='6'/><ellipse cx='130' cy='110' rx='7' ry='5'/>
        <ellipse cx='160' cy='113' rx='9' ry='7'/><ellipse cx='190' cy='115' rx='8' ry='6'/>
        <ellipse cx='220' cy='118' rx='7' ry='5'/><ellipse cx='250' cy='120' rx='8' ry='6'/>
        <ellipse cx='280' cy='115' rx='9' ry='7'/><ellipse cx='310' cy='108' rx='7' ry='5'/>
      </g>
      <!-- 虫体高光 -->
      <g fill='#6a5a4a' opacity='0.5'>
        <ellipse cx='98' cy='113' rx='2' ry='1.5'/><ellipse cx='128' cy='108' rx='1.8' ry='1.2'/>
        <ellipse cx='158' cy='111' rx='2.5' ry='2'/><ellipse cx='188' cy='113' rx='2' ry='1.5'/>
        <ellipse cx='218' cy='116' rx='1.8' ry='1.2'/><ellipse cx='248' cy='118' rx='2' ry='1.5'/>
        <ellipse cx='278' cy='113' rx='2.5' ry='2'/><ellipse cx='308' cy='106' rx='1.8' ry='1.2'/>
      </g>
      <!-- 蜕皮痕迹 -->
      <g fill='#7a6a5a' opacity='0.3'>
        <ellipse cx='95' cy='118' rx='2' ry='1'/><ellipse cx='155' cy='116' rx='2.5' ry='1.2'/>
        <ellipse cx='275' cy='118' rx='2' ry='1'/><ellipse cx='305' cy='112' rx='2' ry='1'/>
      </g>
    </svg>`,
    
    // 锈壁虱：叶背黄褐色锈斑
    rustMite: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
      <defs>
        <linearGradient id='leafGrad6' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='#2d5a1c'/>
          <stop offset='40%' stop-color='#1f4412'/>
          <stop offset='100%' stop-color='#153609'/>
        </linearGradient>
        <linearGradient id='rustGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='#b8860b'/>
          <stop offset='40%' stop-color='#a07008'/>
          <stop offset='100%' stop-color='#8b5a05'/>
        </linearGradient>
        <radialGradient id='rustSpot' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stop-color='#c9a020'/>
          <stop offset='60%' stop-color='#a07008'/>
          <stop offset='100%' stop-color='#8b5a05'/>
        </radialGradient>
      </defs>
      <rect width='400' height='300' fill='#0a1505'/>
      <!-- 叶片（背面视角） -->
      <ellipse cx='200' cy='150' rx='160' ry='100' fill='url(#leafGrad6)'/>
      <path d='M60 150 L340 150' stroke='#0a1f05' stroke-width='1' opacity='0.4'/>
      <!-- 锈斑区域 -->
      <g opacity='0.9'>
        <ellipse cx='120' cy='130' rx='30' ry='25' fill='url(#rustSpot)'/>
        <ellipse cx='180' cy='140' rx='35' ry='28' fill='url(#rustGrad)'/>
        <ellipse cx='250' cy='155' rx='40' ry='32' fill='url(#rustSpot)' opacity='0.85'/>
        <ellipse cx='300' cy='135' rx='25' ry='20' fill='url(#rustGrad)'/>
      </g>
      <!-- 锈斑边缘 -->
      <g fill='none' stroke='#a07008' stroke-width='0.5' opacity='0.4'>
        <ellipse cx='120' cy='130' rx='32' ry='27'/>
        <ellipse cx='180' cy='140' rx='37' ry='30'/>
        <ellipse cx='250' cy='155' rx='42' ry='34'/>
        <ellipse cx='300' cy='135' rx='27' ry='22'/>
      </g>
      <!-- 细小锈点 -->
      <g fill='#c9a020' opacity='0.7'>
        <circle cx='100' cy='120' r='2'/><circle cx='130' cy='110' r='1.5'/>
        <circle cx='150' cy='125' r='2'/><circle cx='200' cy='130' r='2.5'/>
        <circle cx='230' cy='140' r='2'/><circle cx='270' cy='130' r='1.5'/>
        <circle cx='290' cy='145' r='2'/><circle cx='310' cy='125' r='1.5'/>
      </g>
    </svg>`,
    
    // 脚腐病：根颈部腐烂，叶片黄化
    footRot: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
      <defs>
        <linearGradient id='leafGrad7' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='#b8a820'/>
          <stop offset='40%' stop-color='#a09018'/>
          <stop offset='100%' stop-color='#8a7810'/>
        </linearGradient>
        <linearGradient id='rotGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' stop-color='#3a2815'/>
          <stop offset='50%' stop-color='#2a1810'/>
          <stop offset='100%' stop-color='#1a1008'/>
        </linearGradient>
        <linearGradient id='trunkGrad' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stop-color='#5a4030'/>
          <stop offset='50%' stop-color='#4a3020'/>
          <stop offset='100%' stop-color='#3a2015'/>
        </linearGradient>
      </defs>
      <rect width='400' height='300' fill='#0a1505'/>
      <!-- 树干 -->
      <rect x='180' y='230' width='40' height='70' fill='url(#trunkGrad)'/>
      <rect x='175' y='295' width='50' height='10' fill='url(#rotGrad)'/>
      <!-- 腐烂区域 -->
      <ellipse cx='200' cy='300' rx='35' ry='12' fill='#2a1810' opacity='0.9'/>
      <ellipse cx='200' cy='295' rx='28' ry='8' fill='#1a1008'/>
      <!-- 流胶 -->
      <path d='M185 298 Q180 310 175 320' fill='none' stroke='#4a3020' stroke-width='3' opacity='0.6'/>
      <path d='M215 298 Q220 310 225 320' fill='none' stroke='#4a3020' stroke-width='2' opacity='0.5'/>
      <!-- 黄化叶片 -->
      <ellipse cx='120' cy='120' rx='60' ry='35' fill='url(#leafGrad7)' opacity='0.85'/>
      <ellipse cx='200' cy='100' rx='55' ry='32' fill='url(#leafGrad7)' opacity='0.9'/>
      <ellipse cx='280' cy='130' rx='50' ry='30' fill='url(#leafGrad7)' opacity='0.8'/>
      <!-- 叶脉 -->
      <path d='M80 120 L160 120' stroke='#8a7810' stroke-width='0.5' opacity='0.4'/>
      <path d='M160 100 L240 100' stroke='#8a7810' stroke-width='0.5' opacity='0.4'/>
      <path d='M240 130 L320 130' stroke='#8a7810' stroke-width='0.5' opacity='0.4'/>
      <!-- 卷曲边缘 -->
      <path d='M60 120 Q50 110 55 130' fill='none' stroke='#a09018' stroke-width='1' opacity='0.5'/>
      <path d='M340 130 Q350 120 345 140' fill='none' stroke='#a09018' stroke-width='1' opacity='0.5'/>
    </svg>`,
    
    // 树脂病：树干流胶，叶片边缘黄化
    gummosis: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
      <defs>
        <linearGradient id='leafGrad8' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stop-color='#2d5a1c'/>
          <stop offset='70%' stop-color='#1f4412'/>
          <stop offset='100%' stop-color='#b8a820'/>
        </linearGradient>
        <linearGradient id='trunkGrad2' x1='0%' y1='0%' x2='100%' y2='0%'>
          <stop offset='0%' stop-color='#5a4030'/>
          <stop offset='50%' stop-color='#4a3020'/>
          <stop offset='100%' stop-color='#3a2015'/>
        </linearGradient>
        <linearGradient id='gumGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' stop-color='#d4a050'/>
          <stop offset='100%' stop-color='#c08030'/>
        </linearGradient>
      </defs>
      <rect width='400' height='300' fill='#0a1505'/>
      <!-- 树干 -->
      <rect x='175' y='180' width='50' height='120' fill='url(#trunkGrad2)'/>
      <!-- 流胶 -->
      <g fill='url(#gumGrad)' opacity='0.8'>
        <ellipse cx='195' cy='220' rx='8' ry='4'/>
        <path d='M188 220 Q185 250 182 280 L178 280 Q180 250 185 220 Z'/>
        <ellipse cx='205' cy='240' rx='6' ry='3'/>
        <path d='M200 240 Q198 270 196 300 L192 300 Q194 270 198 240 Z'/>
      </g>
      <!-- 流胶高光 -->
      <g fill='#e8b860' opacity='0.5'>
        <ellipse cx='193' cy='218' rx='2' ry='1'/>
        <ellipse cx='203' cy='238' rx='1.5' ry='0.8'/>
      </g>
      <!-- 叶片 -->
      <ellipse cx='100' cy='80' rx='55' ry='30' fill='url(#leafGrad8)' opacity='0.85'/>
      <ellipse cx='200' cy='60' rx='50' ry='28' fill='url(#leafGrad8)' opacity='0.9'/>
      <ellipse cx='300' cy='85' rx='52' ry='32' fill='url(#leafGrad8)' opacity='0.85'/>
      <!-- 叶脉 -->
      <path d='M55 80 L145 80' stroke='#1f4412' stroke-width='0.5' opacity='0.3'/>
      <path d='M160 60 L240 60' stroke='#1f4412' stroke-width='0.5' opacity='0.3'/>
      <path d='M255 85 L345 85' stroke='#1f4412' stroke-width='0.5' opacity='0.3'/>
      <!-- 边缘黄化 -->
      <path d='M140 75 Q145 65 150 70' fill='none' stroke='#b8a820' stroke-width='1.5' opacity='0.7'/>
      <path d='M240 55 Q250 45 255 50' fill='none' stroke='#b8a820' stroke-width='1.5' opacity='0.7'/>
      <path d='M340 80 Q350 70 355 75' fill='none' stroke='#b8a820' stroke-width='1.5' opacity='0.7'/>
      <!-- 病斑 -->
      <g fill='#4a3020' opacity='0.6'>
        <circle cx='120' cy='75' r='3'/><circle cx='200' cy='55' r='2.5'/>
        <circle cx='280' cy='80' r='3'/><circle cx='310' cy='75' r='2'/>
      </g>
    </svg>`,
  };
  const svg = svgs[key];
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}