// Arabic (ar) — authored translations for the four English-only chapters
// (11, 15, 16, 22) plus the updated conclusion. Consumed by
// scripts/translate-team-chapters.mjs. HTML tags and data-* markers preserved.
import chapter11 from "./ar-11.mjs";
import chapter15 from "./ar-15.mjs";
import chapter16 from "./ar-16.mjs";
import chapter22 from "./ar-22.mjs";

const arabicTranslations = {
  conclusion: {
    summary: `القيادة ليست هوية ثابتة، بل نطاقًا من السلوكيات يُصقل بالممارسة؛ وقد صُمم هذا الدليل ليساعدك على تطويره، لا مجرد القراءة عنه. تنقلك فصوله الاثنان والعشرون، عبر خمسة أجزاء، من إدارة نفسك إلى تنمية الآخرين، ويربط كل فصل فكرته المحورية بالبحث الذي تستند إليه، ولغة الألوان الأربعة اللازمة لتطبيقها، وقصة لقائد في الميدان، وممارسة يمكنك تجربتها.`,
    synthesis: [
      `اعرف نفسك: ارسم خريطة أسلوبك الافتراضي، ومحفزاتك، وكيف يتغير سلوكك تحت الضغط.`,
      `أتقن عواطفك: اقرأ ما يدور حولك، ونظّم استجابتك حين تبلغ المخاطر ذروتها.`,
      `تكيّف مع الآخرين: عدّل أسلوبك لتؤثر، وتدير النزاع، وتضمن وصول رسالتك.`,
      `ابنِ الفريق: صمّم التكوين والثقة والسلامة والإيقاع والمساءلة التي تمكّن الأشخاص من الأداء الموثوق.`,
      `قرّر وانمُ: أحسن الاختيار وسط الغموض، ودرّب أفرادك، وقُد عبر الثقافات، وواصل التحسن بعقلية المتعلم الدائم.`,
    ],
  },
  chapters: {
    11: chapter11,
    15: chapter15,
    16: chapter16,
    22: chapter22,
  },
};

export default arabicTranslations;