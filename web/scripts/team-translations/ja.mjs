// Japanese (ja) — authored translations for the four English-only chapters
// (11, 15, 16, 22) plus the updated conclusion. Consumed by
// scripts/translate-team-chapters.mjs. HTML tags and data-* markers preserved.
import chapter11 from "./ja-11.mjs";
import chapter15 from "./ja-15.mjs";
import chapter16 from "./ja-16.mjs";
import chapter22 from "./ja-22.mjs";

const japaneseTranslations = {
  conclusion: {
    summary: `リーダーシップは固定されたアイデンティティではなく、実践によって広げていく行動の幅である。本書は、それについて読むだけでなく、実際に力を伸ばすためにつくられている。全五部・二十二章を通じて、自分を導くことから他者を成長させることへと進み、各章では中核となる考え方に、その背景にある研究、実践に使える四色の言語、リーダーの行動事例、そして試すための演習を組み合わせている。`,
    synthesis: [
      `自分を知る：自分の基本スタイル、引き金となる要因、プレッシャー下での変化を把握する。`,
      `感情を使いこなす：場の空気を読み、最も重要な局面で自分を整える。`,
      `相手に適応する：影響力を発揮し、対立に対処し、メッセージを届かせるためにスタイルを柔軟に変える。`,
      `チームをつくる：人が安定して力を発揮できる編成、信頼、安全性、リズム、説明責任を整える。`,
      `決断し、成長する：曖昧さの中で賢く選び、人を育て、文化を越えて導き、学び続ける姿勢で改善を重ねる。`,
    ],
  },
  chapters: {
    11: chapter11,
    15: chapter15,
    16: chapter16,
    22: chapter22,
  },
};

export default japaneseTranslations;