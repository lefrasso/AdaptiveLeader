// Korean (ko) — authored translations for the four English-only chapters
// (11, 15, 16, 22) plus the updated conclusion. Consumed by
// scripts/translate-team-chapters.mjs. HTML tags and data-* markers preserved.
import chapter11 from "./ko-11.mjs";
import chapter15 from "./ko-15.mjs";
import chapter16 from "./ko-16.mjs";
import chapter22 from "./ko-22.mjs";

const koreanTranslations = {
  conclusion: {
    summary: `리더십은 고정된 정체성이 아니라 연습을 통해 넓혀 가는 행동의 범위다. 이 안내서는 리더십을 읽는 데 그치지 않고 실제로 개발하도록 돕기 위해 만들어졌다. 다섯 개 부와 스물두 개 장은 자신을 이끄는 일에서 다른 사람을 성장시키는 일까지 안내하며, 각 핵심 개념을 그 배경 연구, 실천에 활용할 수 있는 네 가지 색상의 언어, 행동으로 보여 주는 리더의 사례, 직접 시도할 연습과 연결한다.`,
    synthesis: [
      `자신을 이해하라: 기본 성향과 촉발 요인, 압박 속에서 어떻게 달라지는지 파악한다.`,
      `감정을 다스려라: 상황을 읽고 가장 중요한 순간에 자신을 조절한다.`,
      `다른 사람에게 적응하라: 영향력을 발휘하고 갈등을 다루며 메시지를 전달하도록 스타일을 유연하게 바꾼다.`,
      `팀을 구축하라: 사람들이 안정적으로 성과를 내는 구성, 신뢰, 안전감, 리듬, 책임 체계를 만든다.`,
      `결정하고 성장하라: 모호함 속에서 현명하게 선택하고, 구성원을 코칭하고, 문화를 넘어 이끌며, 끊임없이 배우는 사고방식으로 계속 발전한다.`,
    ],
  },
  chapters: {
    11: chapter11,
    15: chapter15,
    16: chapter16,
    22: chapter22,
  },
};

export default koreanTranslations;