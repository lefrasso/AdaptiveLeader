// Simplified Chinese (zh) — authored translations for the four English-only
// chapters (11, 15, 16, 22) plus the updated conclusion. Consumed by
// scripts/translate-team-chapters.mjs. HTML tags and data-* markers preserved.
import chapter11 from "./zh-11.mjs";
import chapter15 from "./zh-15.mjs";
import chapter16 from "./zh-16.mjs";
import chapter22 from "./zh-22.mjs";

const chineseTranslations = {
  conclusion: {
    summary: `领导力并非一种固定身份，而是一系列通过实践不断拓展的能力。本指南旨在帮助你真正培养这些能力，而不只是阅读相关知识。全书分为五个部分、共二十二章，带你从管理自己走向成就他人；每个核心理念都配有背后的研究依据、用于实践的四色语言、真实的领导行动案例，以及一项可以立即尝试的练习。`,
    synthesis: [
      `了解自己：梳理你的默认风格、触发因素，以及你在压力下会如何改变。`,
      `驾驭情绪：读懂现场，并在风险最高时调节好自己的状态。`,
      `适应他人：灵活调整风格，以施加影响、处理冲突并让信息真正传达。`,
      `建设团队：塑造让人们能够持续可靠地发挥的人员构成、信任、安全感、节奏与责任机制。`,
      `决策与成长：在模糊中作出明智选择，辅导团队成员，跨文化领导，并以持续学习的心态不断进步。`,
    ],
  },
  chapters: {
    11: chapter11,
    15: chapter15,
    16: chapter16,
    22: chapter22,
  },
};

export default chineseTranslations;