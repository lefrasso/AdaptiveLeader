// Enriches each chapter's theory deep-dive with one extra, high-value framework
// bullet, in every locale. Idempotent (marker data-more="1"). Run AFTER
// scripts/extract-chapters.mjs and scripts/extract-i18n.mjs, which regenerate
// the per-locale JSON.  Run:  node scripts/expand-theory.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const chDir = resolve(here, "..", "src", "lib", "chapters");

const LOCALES = ["en", "es", "it", "fr", "pt", "ar", "de", "zh", "ja", "ko"];

// One extra theory bullet per chapter, per locale. Named models/researchers
// (Grove, GROW, Project Aristotle, BLUF) stay in Latin script across languages.
const li = (html) => `<li data-more="1">${html}</li>`;

const ADDITIONS = {
  1: {
    en: li(`<strong>Managerial leverage (Grove):</strong> your output is your team's output multiplied by your influence, so time spent developing one person compounds across everything they later do.`),
    es: li(`<strong>Apalancamiento directivo (Grove):</strong> tu resultado es el de tu equipo multiplicado por tu influencia, así que el tiempo dedicado a desarrollar a una persona se multiplica en todo lo que haga después.`),
    it: li(`<strong>Leva manageriale (Grove):</strong> il tuo risultato è quello del tuo team moltiplicato per la tua influenza, quindi il tempo speso a far crescere una persona si moltiplica in tutto ciò che farà in seguito.`),
    fr: li(`<strong>Effet de levier managérial (Grove) :</strong> votre production est celle de votre équipe multipliée par votre influence, donc le temps consacré à développer une personne se démultiplie dans tout ce qu'elle fera ensuite.`),
    pt: li(`<strong>Alavancagem de gestão (Grove):</strong> o teu resultado é o da tua equipa multiplicado pela tua influência, por isso o tempo investido a desenvolver uma pessoa multiplica-se em tudo o que ela fizer depois.`),
    ar: li(`<strong>الرافعة الإدارية (غروف):</strong> ناتجك هو ناتج فريقك مضروباً في تأثيرك، لذا فإن الوقت المستثمر في تطوير شخص واحد يتضاعف في كل ما يفعله لاحقاً.`),
    de: li(`<strong>Managementhebel (Grove):</strong> deine Leistung ist die deines Teams multipliziert mit deinem Einfluss — Zeit für die Entwicklung eines Menschen wirkt sich auf alles aus, was er später tut.`),
    zh: li(`<strong>管理杠杆（格罗夫）：</strong>你的产出等于团队产出乘以你的影响力，因此培养一个人所花的时间，会在他此后所做的一切中成倍放大。`),
    ja: li(`<strong>マネジメント・レバレッジ（グローブ）：</strong>あなたの成果はチームの成果に影響力を掛けたもの。一人を育てる時間は、その人が後に行うすべてに複利で効いてくる。`),
    ko: li(`<strong>관리 레버리지(그로브):</strong> 당신의 성과는 팀의 성과에 영향력을 곱한 것이며, 한 사람을 키우는 데 쓴 시간은 그가 이후에 하는 모든 일에서 복리로 커진다.`),
  },
  2: {
    en: li(`<strong>Blends, not boxes:</strong> most people lead with a primary and a secondary colour and shift under pressure, so read the pattern over time rather than fixing a single label.`),
    es: li(`<strong>Mezclas, no casillas:</strong> la mayoría lidera con un color primario y otro secundario y cambia bajo presión, así que lee el patrón a lo largo del tiempo en vez de fijar una sola etiqueta.`),
    it: li(`<strong>Combinazioni, non caselle:</strong> la maggior parte guida con un colore primario e uno secondario e cambia sotto pressione, quindi leggi lo schema nel tempo invece di fissare una sola etichetta.`),
    fr: li(`<strong>Des nuances, pas des cases :</strong> la plupart des gens agissent avec une couleur primaire et une secondaire et changent sous pression ; lisez le motif dans la durée plutôt que de figer une étiquette.`),
    pt: li(`<strong>Misturas, não caixas:</strong> a maioria lidera com uma cor primária e outra secundária e muda sob pressão, por isso lê o padrão ao longo do tempo em vez de fixar um único rótulo.`),
    ar: li(`<strong>مزيج لا خانات:</strong> يقود معظم الناس بلون أساسي وآخر ثانوي ويتغيرون تحت الضغط، لذا اقرأ النمط عبر الوقت بدل تثبيت تصنيف واحد.`),
    de: li(`<strong>Mischungen, keine Schubladen:</strong> die meisten führen mit einer primären und einer sekundären Farbe und wechseln unter Druck — lies das Muster über die Zeit, statt ein Etikett festzuschreiben.`),
    zh: li(`<strong>是组合，而非标签：</strong>多数人以一种主色和一种辅色行事，并在压力下转变，因此要在时间中读取行为模式，而不是固定单一标签。`),
    ja: li(`<strong>ラベルではなく組み合わせ：</strong>多くの人は主色と副色で動き、プレッシャー下で変化する。単一のラベルで固定せず、時間をかけてパターンを読む。`),
    ko: li(`<strong>상자가 아니라 조합:</strong> 대부분은 주색과 보조색으로 행동하며 압박 속에서 바뀌므로, 하나의 라벨로 고정하지 말고 시간에 걸쳐 패턴을 읽어라.`),
  },
  3: {
    en: li(`<strong>The 360° mirror:</strong> structured feedback from peers, reports and managers reaches the blind quadrant that self-reflection alone can never see.`),
    es: li(`<strong>El espejo de 360°:</strong> la retroalimentación estructurada de pares, colaboradores y jefes alcanza el cuadrante ciego que la sola autorreflexión nunca puede ver.`),
    it: li(`<strong>Lo specchio a 360°:</strong> il feedback strutturato di colleghi, collaboratori e capi raggiunge il quadrante cieco che la sola autoriflessione non vedrà mai.`),
    fr: li(`<strong>Le miroir à 360° :</strong> un retour structuré des pairs, des collaborateurs et des managers atteint le quadrant aveugle que l'introspection seule ne verra jamais.`),
    pt: li(`<strong>O espelho de 360°:</strong> o feedback estruturado de pares, colaboradores e chefias alcança o quadrante cego que a autorreflexão sozinha nunca vê.`),
    ar: li(`<strong>مرآة الـ360°:</strong> التغذية الراجعة المنظّمة من الزملاء والمرؤوسين والمديرين تصل إلى المربّع الأعمى الذي لا يراه التأمل الذاتي وحده.`),
    de: li(`<strong>Der 360°-Spiegel:</strong> strukturiertes Feedback von Kollegen, Mitarbeitenden und Vorgesetzten erreicht den blinden Quadranten, den Selbstreflexion allein nie sieht.`),
    zh: li(`<strong>360°镜子：</strong>来自同事、下属与上级的结构化反馈，能触及仅靠自省永远看不到的“盲区”象限。`),
    ja: li(`<strong>360度の鏡：</strong>同僚・部下・上司からの体系的なフィードバックは、自己内省だけでは決して見えない「盲点」の領域に届く。`),
    ko: li(`<strong>360도 거울:</strong> 동료·부하·상사의 구조화된 피드백은 자기성찰만으로는 결코 볼 수 없는 '맹점' 영역에 닿는다.`),
  },
  4: {
    en: li(`<strong>The amygdala hijack:</strong> under threat, emotion reaches the brain before reason does, so simply naming the feeling re-engages judgement and restores choice.`),
    es: li(`<strong>El secuestro de la amígdala:</strong> ante una amenaza, la emoción llega al cerebro antes que la razón, así que nombrar el sentimiento reactiva el juicio y devuelve la capacidad de elegir.`),
    it: li(`<strong>Il sequestro dell'amigdala:</strong> di fronte a una minaccia l'emozione raggiunge il cervello prima della ragione, quindi dare un nome al sentimento riattiva il giudizio e restituisce la scelta.`),
    fr: li(`<strong>Le détournement de l'amygdale :</strong> face à une menace, l'émotion atteint le cerveau avant la raison ; nommer le ressenti réactive le jugement et rend le choix possible.`),
    pt: li(`<strong>O sequestro da amígdala:</strong> perante uma ameaça, a emoção chega ao cérebro antes da razão, por isso nomear o sentimento reativa o discernimento e devolve a escolha.`),
    ar: li(`<strong>اختطاف اللوزة الدماغية:</strong> عند التهديد تصل العاطفة إلى الدماغ قبل العقل، لذا فإن مجرد تسمية الشعور يعيد تفعيل الحكم ويستعيد القدرة على الاختيار.`),
    de: li(`<strong>Die Amygdala-Entführung:</strong> unter Bedrohung erreicht Emotion das Gehirn vor der Vernunft — das Gefühl zu benennen aktiviert das Urteilsvermögen wieder und stellt die Wahl her.`),
    zh: li(`<strong>杏仁核劫持：</strong>受到威胁时，情绪比理性更早抵达大脑，因此仅仅“说出”感受，就能重新启动判断、恢复选择。`),
    ja: li(`<strong>扁桃体ハイジャック：</strong>脅威を感じると感情が理性より先に脳に届く。感情に名前を付けるだけで判断力が戻り、選択が可能になる。`),
    ko: li(`<strong>편도체 납치:</strong> 위협을 받으면 감정이 이성보다 먼저 뇌에 도달하므로, 감정에 이름을 붙이는 것만으로 판단력이 되살아나고 선택이 회복된다.`),
  },
  5: {
    en: li(`<strong>The six-second pause:</strong> the first neurochemical surge of an emotion subsides within seconds, so one deliberate breath converts a reaction into a chosen response.`),
    es: li(`<strong>La pausa de seis segundos:</strong> la primera oleada neuroquímica de una emoción se disipa en segundos, así que una respiración deliberada convierte una reacción en una respuesta elegida.`),
    it: li(`<strong>La pausa di sei secondi:</strong> la prima ondata neurochimica di un'emozione svanisce in pochi secondi, quindi un respiro consapevole trasforma una reazione in una risposta scelta.`),
    fr: li(`<strong>La pause de six secondes :</strong> la première vague neurochimique d'une émotion retombe en quelques secondes ; une respiration délibérée transforme une réaction en réponse choisie.`),
    pt: li(`<strong>A pausa de seis segundos:</strong> a primeira onda neuroquímica de uma emoção dissipa-se em segundos, por isso uma respiração deliberada transforma uma reação numa resposta escolhida.`),
    ar: li(`<strong>وقفة الست ثوانٍ:</strong> تهدأ الموجة العصبية الكيميائية الأولى للعاطفة خلال ثوانٍ، لذا فإن نَفَساً واحداً متعمَّداً يحوّل ردّ الفعل إلى استجابة مختارة.`),
    de: li(`<strong>Die Sechs-Sekunden-Pause:</strong> der erste neurochemische Schub einer Emotion klingt in Sekunden ab — ein bewusster Atemzug macht aus einer Reaktion eine gewählte Antwort.`),
    zh: li(`<strong>六秒暂停：</strong>情绪最初的神经化学冲动会在数秒内消退，因此一次刻意的呼吸就能把“反应”变成“选择过的回应”。`),
    ja: li(`<strong>6秒の間：</strong>感情の最初の神経化学的な高まりは数秒で収まる。意図的な一呼吸が、反射的な反応を「選んだ対応」に変える。`),
    ko: li(`<strong>6초의 멈춤:</strong> 감정의 첫 신경화학적 파도는 몇 초 안에 가라앉으므로, 의도적인 한 번의 호흡이 반응을 '선택한 대응'으로 바꾼다.`),
  },
  6: {
    en: li(`<strong>Cognitive vs. affective empathy:</strong> understanding how someone thinks guides the decision, while feeling what they feel builds the connection — leaders need both, held with boundaries.`),
    es: li(`<strong>Empatía cognitiva y afectiva:</strong> entender cómo piensa alguien guía la decisión, mientras que sentir lo que siente construye el vínculo; el líder necesita ambas, con límites.`),
    it: li(`<strong>Empatia cognitiva e affettiva:</strong> capire come pensa una persona guida la decisione, mentre sentire ciò che prova costruisce il legame — il leader ha bisogno di entrambe, con dei limiti.`),
    fr: li(`<strong>Empathie cognitive et affective :</strong> comprendre comment l'autre pense guide la décision, tandis que ressentir ce qu'il ressent crée le lien — le leader a besoin des deux, avec des limites.`),
    pt: li(`<strong>Empatia cognitiva e afetiva:</strong> entender como alguém pensa guia a decisão, enquanto sentir o que essa pessoa sente cria a ligação — o líder precisa de ambas, com limites.`),
    ar: li(`<strong>التعاطف المعرفي والوجداني:</strong> فهم طريقة تفكير الآخر يوجّه القرار، بينما الشعور بما يشعر به يبني الصلة؛ يحتاج القائد إلى الاثنين معاً، مع وضع حدود.`),
    de: li(`<strong>Kognitive vs. affektive Empathie:</strong> zu verstehen, wie jemand denkt, lenkt die Entscheidung; zu fühlen, was er fühlt, schafft die Verbindung — Führungskräfte brauchen beides, mit Grenzen.`),
    zh: li(`<strong>认知同理与情感同理：</strong>理解对方如何思考，指导决策；感受对方的感受，建立连接——领导者两者都需要，并需设定边界。`),
    ja: li(`<strong>認知的共感と情動的共感：</strong>相手の考え方を理解することは判断を導き、相手の感情を感じることはつながりを生む。リーダーには両方が、境界とともに必要だ。`),
    ko: li(`<strong>인지적 공감과 정서적 공감:</strong> 상대가 어떻게 생각하는지 이해하면 판단이 서고, 상대의 감정을 느끼면 관계가 생긴다 — 리더에게는 경계와 함께 둘 다 필요하다.`),
  },
  7: {
    en: li(`<strong>Readiness, not a fixed style:</strong> diagnose the person's competence and commitment for the specific task before deciding how much to direct, coach, support or delegate.`),
    es: li(`<strong>Madurez, no estilo fijo:</strong> diagnostica la competencia y el compromiso de la persona para la tarea concreta antes de decidir cuánto dirigir, entrenar, apoyar o delegar.`),
    it: li(`<strong>Prontezza, non stile fisso:</strong> valuta competenza e impegno della persona per il compito specifico prima di decidere quanto dirigere, allenare, sostenere o delegare.`),
    fr: li(`<strong>La maturité, pas un style figé :</strong> évaluez la compétence et l'engagement de la personne pour la tâche précise avant de décider s'il faut diriger, coacher, soutenir ou déléguer.`),
    pt: li(`<strong>Prontidão, não estilo fixo:</strong> diagnostica a competência e o empenho da pessoa para a tarefa concreta antes de decidir quanto dirigir, treinar, apoiar ou delegar.`),
    ar: li(`<strong>الجاهزية لا الأسلوب الثابت:</strong> شخّص كفاءة الشخص والتزامه تجاه المهمة المحددة قبل أن تقرر مقدار التوجيه أو التدريب أو الدعم أو التفويض.`),
    de: li(`<strong>Reifegrad statt festem Stil:</strong> beurteile Kompetenz und Engagement der Person für die konkrete Aufgabe, bevor du entscheidest, wie viel du anweist, coachst, unterstützt oder delegierst.`),
    zh: li(`<strong>看准备度，而非固定风格：</strong>先诊断此人对具体任务的能力与意愿，再决定给予多少指导、辅导、支持或授权。`),
    ja: li(`<strong>固定スタイルではなく成熟度：</strong>その課題に対する本人の能力と意欲を見極めてから、どこまで指示・コーチ・支援・委任するかを決める。`),
    ko: li(`<strong>고정된 스타일이 아니라 준비도:</strong> 특정 과업에 대한 그 사람의 역량과 의지를 진단한 뒤, 얼마나 지시·코칭·지원·위임할지 정하라.`),
  },
  8: {
    en: li(`<strong>Give first (reciprocity):</strong> durable influence is built by offering help, credit and cover before you need anything — authority that must be asserted loudly is usually weak influence.`),
    es: li(`<strong>Da primero (reciprocidad):</strong> la influencia duradera se construye ofreciendo ayuda, reconocimiento y respaldo antes de necesitar algo; la autoridad que hay que imponer a gritos suele ser influencia débil.`),
    it: li(`<strong>Dai per primo (reciprocità):</strong> l'influenza duratura si costruisce offrendo aiuto, riconoscimento e copertura prima di aver bisogno di qualcosa — l'autorità che va imposta ad alta voce è di solito influenza debole.`),
    fr: li(`<strong>Donner d'abord (réciprocité) :</strong> l'influence durable se bâtit en offrant aide, reconnaissance et soutien avant d'avoir besoin de quoi que ce soit — une autorité qu'il faut imposer bruyamment est une influence faible.`),
    pt: li(`<strong>Dá primeiro (reciprocidade):</strong> a influência duradoura constrói-se oferecendo ajuda, reconhecimento e apoio antes de precisares de algo — a autoridade que tem de ser imposta aos gritos costuma ser influência fraca.`),
    ar: li(`<strong>ابدأ بالعطاء (المعاملة بالمثل):</strong> يُبنى التأثير الدائم بتقديم المساعدة والتقدير والحماية قبل أن تحتاج شيئاً؛ والسلطة التي تُفرَض بصوت عالٍ غالباً ما تكون تأثيراً ضعيفاً.`),
    de: li(`<strong>Zuerst geben (Reziprozität):</strong> dauerhafter Einfluss entsteht, indem du Hilfe, Anerkennung und Rückendeckung gibst, bevor du etwas brauchst — Autorität, die man laut behaupten muss, ist meist schwacher Einfluss.`),
    zh: li(`<strong>先付出（互惠）：</strong>持久的影响力，来自在你有所求之前先提供帮助、给予功劳与担当；需要大声宣示的权威，通常是薄弱的影响力。`),
    ja: li(`<strong>先に与える（返報性）：</strong>持続する影響力は、何かを必要とする前に助け・功績・後ろ盾を差し出すことで築かれる。声高に主張せねばならない権威は、たいてい弱い影響力だ。`),
    ko: li(`<strong>먼저 주라(상호성):</strong> 지속적 영향력은 무언가 필요하기 전에 도움·공로·방패를 먼저 내어줄 때 쌓인다 — 큰 소리로 주장해야 하는 권위는 대개 약한 영향력이다.`),
  },
  9: {
    en: li(`<strong>Impact, not intent:</strong> name the behaviour and its concrete effect without assigning motive, which keeps the other person problem-solving instead of defending themselves.`),
    es: li(`<strong>Impacto, no intención:</strong> describe la conducta y su efecto concreto sin atribuir motivos, lo que mantiene a la otra persona resolviendo el problema en vez de defenderse.`),
    it: li(`<strong>Impatto, non intenzione:</strong> descrivi il comportamento e il suo effetto concreto senza attribuire moventi, così l'altra persona resta a risolvere il problema invece di difendersi.`),
    fr: li(`<strong>L'impact, pas l'intention :</strong> nommez le comportement et son effet concret sans prêter d'intention, ce qui maintient l'autre en résolution de problème plutôt qu'en défense.`),
    pt: li(`<strong>Impacto, não intenção:</strong> descreve o comportamento e o seu efeito concreto sem atribuir motivos, o que mantém a outra pessoa a resolver o problema em vez de se defender.`),
    ar: li(`<strong>الأثر لا النية:</strong> صِف السلوك وأثره الملموس دون افتراض الدافع، فذلك يُبقي الطرف الآخر منشغلاً بحل المشكلة بدل الدفاع عن نفسه.`),
    de: li(`<strong>Wirkung, nicht Absicht:</strong> benenne das Verhalten und seine konkrete Wirkung, ohne ein Motiv zu unterstellen — so bleibt das Gegenüber beim Lösen statt beim Verteidigen.`),
    zh: li(`<strong>谈影响，而非动机：</strong>只描述行为及其具体影响，不揣测动机，这样对方会继续解决问题，而不是自我辩护。`),
    ja: li(`<strong>意図ではなく影響：</strong>動機を決めつけず、行動とその具体的な影響を述べる。そうすれば相手は自己弁護ではなく問題解決にとどまる。`),
    ko: li(`<strong>의도가 아니라 영향:</strong> 동기를 단정하지 말고 행동과 그 구체적 영향을 말하라 — 그러면 상대는 방어가 아니라 문제 해결에 머문다.`),
  },
  10: {
    en: li(`<strong>Bottom line up front (BLUF):</strong> audiences judge competence in seconds, so leading with the headline and cutting the filler makes the same message land as leadership.`),
    es: li(`<strong>Lo importante primero (BLUF):</strong> la audiencia juzga la competencia en segundos, así que empezar por la conclusión y eliminar el relleno hace que el mismo mensaje suene a liderazgo.`),
    it: li(`<strong>Prima la conclusione (BLUF):</strong> il pubblico giudica la competenza in pochi secondi, quindi partire dal messaggio chiave ed eliminare il superfluo fa arrivare lo stesso contenuto come leadership.`),
    fr: li(`<strong>L'essentiel d'abord (BLUF) :</strong> l'auditoire juge la compétence en quelques secondes ; commencer par la conclusion et couper le superflu fait passer le même message comme du leadership.`),
    pt: li(`<strong>O essencial primeiro (BLUF):</strong> a audiência julga a competência em segundos, por isso começar pela conclusão e cortar o excesso faz a mesma mensagem soar a liderança.`),
    ar: li(`<strong>الخلاصة أولاً (BLUF):</strong> يحكم الجمهور على الكفاءة في ثوانٍ، لذا فإن البدء بالنتيجة وحذف الحشو يجعل الرسالة نفسها تصل كقيادة.`),
    de: li(`<strong>Kernaussage zuerst (BLUF):</strong> Zuhörer beurteilen Kompetenz in Sekunden — mit der Hauptaussage zu beginnen und Füllwörter zu streichen lässt dieselbe Botschaft als Führung wirken.`),
    zh: li(`<strong>结论先行（BLUF）：</strong>听众在几秒内就会判断你的能力，因此先说要点、去掉冗余，能让同样的信息更像“领导力”。`),
    ja: li(`<strong>結論から（BLUF）：</strong>聞き手は数秒で力量を判断する。要点から始めて余分を削ると、同じメッセージがリーダーシップとして伝わる。`),
    ko: li(`<strong>결론부터(BLUF):</strong> 청중은 몇 초 만에 역량을 판단하므로, 핵심부터 말하고 군더더기를 덜어내면 같은 메시지가 리더십으로 전달된다.`),
  },
  11: {
    en: li(`<strong>Project Aristotle:</strong> Google found that how a team works — safety, dependability, structure, meaning and impact — predicts performance far more than who is on it.`),
    es: li(`<strong>Proyecto Aristóteles:</strong> Google descubrió que cómo trabaja un equipo —seguridad, fiabilidad, estructura, sentido e impacto— predice el desempeño mucho más que quién lo integra.`),
    it: li(`<strong>Project Aristotle:</strong> Google ha scoperto che come lavora un team — sicurezza, affidabilità, struttura, significato e impatto — predice le prestazioni molto più di chi ne fa parte.`),
    fr: li(`<strong>Projet Aristote :</strong> Google a découvert que la façon dont une équipe fonctionne — sécurité, fiabilité, structure, sens et impact — prédit la performance bien plus que sa composition.`),
    pt: li(`<strong>Projeto Aristóteles:</strong> a Google descobriu que como uma equipa trabalha — segurança, fiabilidade, estrutura, sentido e impacto — prevê o desempenho muito mais do que quem a compõe.`),
    ar: li(`<strong>مشروع أرسطو:</strong> اكتشفت غوغل أن كيفية عمل الفريق — الأمان والموثوقية والبنية والمعنى والأثر — تتنبأ بالأداء أكثر بكثير من هويّة أعضائه.`),
    de: li(`<strong>Project Aristotle:</strong> Google fand heraus, dass wie ein Team arbeitet — Sicherheit, Verlässlichkeit, Struktur, Sinn und Wirkung — die Leistung weit besser vorhersagt als wer darin ist.`),
    zh: li(`<strong>亚里士多德计划：</strong>谷歌发现，团队“如何协作”——安全感、可靠性、结构、意义与影响——对绩效的预测力，远胜于“成员是谁”。`),
    ja: li(`<strong>プロジェクト・アリストテレス：</strong>グーグルは、チームの「働き方」——安全性・信頼性・構造・意味・影響——が、「誰がいるか」よりはるかに成果を予測すると突き止めた。`),
    ko: li(`<strong>아리스토텔레스 프로젝트:</strong> 구글은 팀이 '어떻게 일하는가'—안전감·신뢰성·구조·의미·영향—가 '누가 있는가'보다 성과를 훨씬 잘 예측한다는 것을 발견했다.`),
  },
  12: {
    en: li(`<strong>Safety is not comfort:</strong> psychological safety lets people take interpersonal risks without punishment, which raises standards by surfacing problems early rather than lowering the bar.`),
    es: li(`<strong>Seguridad no es comodidad:</strong> la seguridad psicológica permite asumir riesgos interpersonales sin castigo, lo que eleva el nivel al sacar los problemas a la luz pronto, no al bajar la vara.`),
    it: li(`<strong>Sicurezza non è comfort:</strong> la sicurezza psicologica permette di correre rischi interpersonali senza punizioni, alzando gli standard perché fa emergere i problemi presto invece di abbassare l'asticella.`),
    fr: li(`<strong>La sécurité n'est pas le confort :</strong> la sécurité psychologique permet de prendre des risques interpersonnels sans sanction, ce qui élève les exigences en révélant tôt les problèmes plutôt qu'en baissant la barre.`),
    pt: li(`<strong>Segurança não é conforto:</strong> a segurança psicológica permite assumir riscos interpessoais sem punição, o que eleva os padrões ao trazer os problemas à luz cedo, e não ao baixar a fasquia.`),
    ar: li(`<strong>الأمان ليس راحة:</strong> يتيح الأمان النفسي خوض المخاطر بين الأشخاص دون عقاب، فيرفع المعايير بإظهار المشكلات مبكراً بدل خفض السقف.`),
    de: li(`<strong>Sicherheit ist keine Bequemlichkeit:</strong> psychologische Sicherheit erlaubt zwischenmenschliche Risiken ohne Bestrafung — das hebt die Standards, weil Probleme früh sichtbar werden, statt die Latte zu senken.`),
    zh: li(`<strong>安全不等于舒适：</strong>心理安全让人敢于承担人际风险而不被惩罚，从而通过及早暴露问题来提升标准，而非降低标准。`),
    ja: li(`<strong>安全は快適ではない：</strong>心理的安全性は、罰を恐れず対人リスクを取れる状態。基準を下げるのではなく、問題を早期に表面化させて基準を上げる。`),
    ko: li(`<strong>안전은 편안함이 아니다:</strong> 심리적 안전은 처벌 없이 대인 리스크를 감수하게 하며, 기준을 낮추는 게 아니라 문제를 일찍 드러내 기준을 높인다.`),
  },
  13: {
    en: li(`<strong>Cadence beats intensity:</strong> a predictable rhythm of one-to-ones, clear metrics and visible commitments turns accountability into a system instead of a personality.`),
    es: li(`<strong>El ritmo vence a la intensidad:</strong> una cadencia predecible de uno a uno, métricas claras y compromisos visibles convierte la rendición de cuentas en un sistema en lugar de una personalidad.`),
    it: li(`<strong>La cadenza batte l'intensità:</strong> un ritmo prevedibile di uno-a-uno, metriche chiare e impegni visibili trasforma la responsabilità in un sistema anziché in una personalità.`),
    fr: li(`<strong>La cadence l'emporte sur l'intensité :</strong> un rythme prévisible d'entretiens individuels, d'indicateurs clairs et d'engagements visibles fait de la responsabilité un système plutôt qu'une personnalité.`),
    pt: li(`<strong>A cadência vence a intensidade:</strong> um ritmo previsível de reuniões individuais, métricas claras e compromissos visíveis torna a responsabilização um sistema em vez de uma personalidade.`),
    ar: li(`<strong>الإيقاع يتغلب على الحدّة:</strong> إيقاع منتظم من اللقاءات الفردية ومقاييس واضحة والتزامات مرئية يحوّل المساءلة إلى نظام بدل أن تكون سمة شخصية.`),
    de: li(`<strong>Rhythmus schlägt Intensität:</strong> ein verlässlicher Takt aus Einzelgesprächen, klaren Kennzahlen und sichtbaren Zusagen macht Verantwortlichkeit zum System statt zur Charakterfrage.`),
    zh: li(`<strong>节奏胜过强度：</strong>可预期的一对一、清晰的指标与可见的承诺所构成的节奏，让“问责”成为一套系统，而非某种性格。`),
    ja: li(`<strong>強度より周期：</strong>1on1・明確な指標・可視化された約束という予測可能なリズムが、説明責任を「性格」ではなく「仕組み」に変える。`),
    ko: li(`<strong>강도보다 리듬:</strong> 예측 가능한 1:1, 명확한 지표, 가시적 약속의 리듬은 책임을 '성격'이 아니라 '시스템'으로 만든다.`),
  },
  14: {
    en: li(`<strong>Outcomes over output:</strong> state the result and the evidence of done, and keep ambitious targets (a 70% hit is a win) separate from firm commitments.`),
    es: li(`<strong>Resultados, no actividad:</strong> define el resultado y la evidencia de "hecho", y separa las metas ambiciosas (alcanzar el 70% ya es un éxito) de los compromisos firmes.`),
    it: li(`<strong>Risultati, non attività:</strong> definisci l'esito e la prova del "fatto", e tieni separati gli obiettivi ambiziosi (raggiungere il 70% è un successo) dagli impegni fermi.`),
    fr: li(`<strong>Les résultats, pas l'activité :</strong> énoncez le résultat et la preuve du « fait », et distinguez les cibles ambitieuses (atteindre 70 % est une réussite) des engagements fermes.`),
    pt: li(`<strong>Resultados, não atividade:</strong> define o resultado e a evidência de "feito", e separa as metas ambiciosas (chegar a 70% é uma vitória) dos compromissos firmes.`),
    ar: li(`<strong>النتائج لا النشاط:</strong> حدّد النتيجة ودليل "الإنجاز"، وافصل الأهداف الطموحة (تحقيق 70% يُعدّ نجاحاً) عن الالتزامات الثابتة.`),
    de: li(`<strong>Ergebnisse statt Aktivität:</strong> benenne das Resultat und den Nachweis für „fertig", und trenne ambitionierte Ziele (70% erreicht ist ein Erfolg) von festen Zusagen.`),
    zh: li(`<strong>重结果，而非活动：</strong>写清结果与“完成”的证据，并把雄心目标（达成70%即算成功）与硬性承诺区分开来。`),
    ja: li(`<strong>活動より成果：</strong>結果と「完了」の証拠を明示し、野心的な目標（70%達成で成功）と確固たるコミットメントを分ける。`),
    ko: li(`<strong>활동이 아니라 성과:</strong> 결과와 '완료'의 증거를 명시하고, 야심찬 목표(70% 달성이면 성공)와 확정 약속을 분리하라.`),
  },
  15: {
    en: li(`<strong>One-way vs. two-way doors:</strong> make reversible decisions fast and at the lowest level; reserve slow, senior deliberation for the few that truly cannot be undone.`),
    es: li(`<strong>Puertas de una vs. dos vías:</strong> toma rápido y al nivel más bajo las decisiones reversibles; reserva la deliberación lenta y de alto nivel para las pocas que de verdad no se pueden deshacer.`),
    it: li(`<strong>Porte a senso unico o doppio:</strong> prendi in fretta e al livello più basso le decisioni reversibili; riserva la riflessione lenta e ai vertici alle poche davvero irreversibili.`),
    fr: li(`<strong>Portes à sens unique ou double :</strong> prenez vite et au plus bas niveau les décisions réversibles ; réservez la délibération lente et dirigeante aux rares vraiment irréversibles.`),
    pt: li(`<strong>Portas de sentido único ou duplo:</strong> toma depressa e ao nível mais baixo as decisões reversíveis; reserva a deliberação lenta e de topo para as poucas que não se podem mesmo desfazer.`),
    ar: li(`<strong>أبواب باتجاه واحد أو اتجاهين:</strong> اتّخذ القرارات القابلة للتراجع بسرعة وعلى أدنى مستوى، واحفظ التداول البطيء والرفيع للقرارات القليلة التي لا يمكن التراجع عنها فعلاً.`),
    de: li(`<strong>Einweg- vs. Zweiwege-Türen:</strong> triff umkehrbare Entscheidungen schnell und auf niedrigster Ebene; reserviere langsames, hochrangiges Abwägen für die wenigen wirklich unumkehrbaren.`),
    zh: li(`<strong>单向门与双向门：</strong>可逆的决策要快、要下放到最低层级；只有极少数真正不可逆的，才值得高层慢慢斟酌。`),
    ja: li(`<strong>一方通行か両開きの扉か：</strong>取り消せる決定は速く、できるだけ下位で。時間をかけた上位での熟考は、本当に取り返しのつかない少数だけに使う。`),
    ko: li(`<strong>일방통행 문 vs 양방향 문:</strong> 되돌릴 수 있는 결정은 빠르게, 최대한 낮은 단계에서 내려라; 느리고 고위급의 숙고는 정말 되돌릴 수 없는 소수에만 남겨두라.`),
  },
  16: {
    en: li(`<strong>Ask, don't tell (GROW):</strong> drawing out a person's own thinking builds ownership and capability far more durably than handing over your answer.`),
    es: li(`<strong>Preguntar, no decir (GROW):</strong> hacer aflorar el propio pensamiento de la persona genera responsabilidad y capacidad mucho más duraderas que darle tu respuesta.`),
    it: li(`<strong>Chiedere, non dire (GROW):</strong> far emergere il pensiero della persona costruisce responsabilità e capacità molto più durature del consegnarle la tua risposta.`),
    fr: li(`<strong>Questionner, pas dicter (GROW) :</strong> faire émerger la pensée de la personne développe l'appropriation et la compétence bien plus durablement que lui donner votre réponse.`),
    pt: li(`<strong>Perguntar, não dizer (GROW):</strong> fazer emergir o próprio pensamento da pessoa gera responsabilidade e capacidade muito mais duradouras do que dar-lhe a tua resposta.`),
    ar: li(`<strong>اسأل ولا تُملِ (GROW):</strong> استخراج تفكير الشخص نفسه يبني الملكية والقدرة بشكل أدوم بكثير من إعطائه إجابتك.`),
    de: li(`<strong>Fragen statt sagen (GROW):</strong> das eigene Denken der Person hervorzulocken schafft Eigenverantwortung und Können weit dauerhafter, als ihr deine Antwort zu geben.`),
    zh: li(`<strong>多问，少给答案（GROW）：</strong>引导对方说出自己的思考，比直接给答案更能持久地培养其主人翁意识与能力。`),
    ja: li(`<strong>教えるより問う（GROW）：</strong>本人の思考を引き出す方が、答えを渡すよりもはるかに持続的に当事者意識と能力を育てる。`),
    ko: li(`<strong>말하지 말고 물어라(GROW):</strong> 상대의 생각을 끌어내는 것이 답을 건네는 것보다 훨씬 오래가는 주인의식과 역량을 키운다.`),
  },
  17: {
    en: li(`<strong>Culture is relative:</strong> what matters is the gap between your position and theirs on each scale — the same feedback lands very differently on a direct German and an indirect Japanese colleague.`),
    es: li(`<strong>La cultura es relativa:</strong> lo que importa es la distancia entre tu posición y la de la otra persona en cada escala; el mismo comentario cae muy distinto en un colega alemán directo y en uno japonés indirecto.`),
    it: li(`<strong>La cultura è relativa:</strong> ciò che conta è la distanza tra la tua posizione e la sua su ogni scala — lo stesso feedback arriva in modo molto diverso a un collega tedesco diretto e a uno giapponese indiretto.`),
    fr: li(`<strong>La culture est relative :</strong> ce qui compte est l'écart entre votre position et la sienne sur chaque échelle — un même retour est reçu très différemment par un collègue allemand direct et un collègue japonais indirect.`),
    pt: li(`<strong>A cultura é relativa:</strong> o que importa é a distância entre a tua posição e a da outra pessoa em cada escala — o mesmo feedback cai de forma muito diferente num colega alemão direto e num japonês indireto.`),
    ar: li(`<strong>الثقافة نسبية:</strong> المهم هو الفجوة بين موقعك وموقع الآخر على كل مقياس؛ فالتغذية الراجعة نفسها تصل بشكل مختلف تماماً لزميل ألماني مباشر وآخر ياباني غير مباشر.`),
    de: li(`<strong>Kultur ist relativ:</strong> entscheidend ist der Abstand zwischen deiner Position und ihrer auf jeder Skala — dasselbe Feedback kommt bei einem direkten deutschen und einem indirekten japanischen Kollegen völlig anders an.`),
    zh: li(`<strong>文化是相对的：</strong>重要的是你与对方在每个维度上的“落差”——同样的反馈，对直接的德国同事和含蓄的日本同事，感受截然不同。`),
    ja: li(`<strong>文化は相対的：</strong>大切なのは各スケール上での自分と相手の「差」だ。同じフィードバックでも、直接的なドイツ人と間接的な日本人の同僚では受け取り方がまるで違う。`),
    ko: li(`<strong>문화는 상대적이다:</strong> 중요한 것은 각 척도에서 당신과 상대의 '차이'다 — 같은 피드백도 직접적인 독일 동료와 간접적인 일본 동료에게 전혀 다르게 다가온다.`),
  },
  18: {
    en: li(`<strong>Read both layers:</strong> an individual's colour sits on top of a cultural baseline, so check for a cultural explanation before judging a behaviour as a personal trait.`),
    es: li(`<strong>Lee las dos capas:</strong> el color de una persona se asienta sobre una base cultural, así que busca una explicación cultural antes de juzgar una conducta como rasgo personal.`),
    it: li(`<strong>Leggi entrambi gli strati:</strong> il colore di una persona poggia su una base culturale, quindi cerca una spiegazione culturale prima di giudicare un comportamento come tratto personale.`),
    fr: li(`<strong>Lisez les deux couches :</strong> la couleur d'une personne repose sur un socle culturel ; cherchez une explication culturelle avant de juger un comportement comme un trait personnel.`),
    pt: li(`<strong>Lê as duas camadas:</strong> a cor de uma pessoa assenta sobre uma base cultural, por isso procura uma explicação cultural antes de julgar um comportamento como traço pessoal.`),
    ar: li(`<strong>اقرأ الطبقتين:</strong> يقوم لون الفرد فوق أساس ثقافي، لذا ابحث عن تفسير ثقافي قبل الحكم على سلوك بأنه سمة شخصية.`),
    de: li(`<strong>Lies beide Ebenen:</strong> die Farbe eines Menschen liegt über einer kulturellen Grundlinie — prüfe auf eine kulturelle Erklärung, bevor du ein Verhalten als persönliche Eigenschaft beurteilst.`),
    zh: li(`<strong>读懂两层：</strong>个人的“颜色”叠加在文化基线之上，因此在把某种行为判断为个人特质之前，先寻找文化层面的解释。`),
    ja: li(`<strong>二つの層を読む：</strong>個人の「色」は文化的な基準線の上に乗っている。ある行動を個人の特性と決めつける前に、文化的な説明がないか確かめる。`),
    ko: li(`<strong>두 층을 읽어라:</strong> 개인의 '색'은 문화적 기준선 위에 놓여 있으므로, 어떤 행동을 개인의 특성으로 판단하기 전에 문화적 설명이 없는지 확인하라.`),
  },
};

function inject(html, li) {
  if (!html || !li) return html;
  if (html.includes('data-more="1"')) return html; // already enriched
  const i = html.indexOf("</ul>");
  if (i === -1) return html + `<ul>${li}</ul>`;
  return html.slice(0, i) + li + html.slice(i);
}

let touched = 0;
for (const locale of LOCALES) {
  const file = resolve(chDir, `${locale}.json`);
  if (!existsSync(file)) continue;
  const book = JSON.parse(readFileSync(file, "utf8"));
  let count = 0;
  for (const ch of book.chapters) {
    const li = ADDITIONS[ch.number]?.[locale];
    if (!li) continue;
    const next = inject(ch.theoryHtml, li);
    if (next !== ch.theoryHtml) {
      ch.theoryHtml = next;
      count++;
    }
  }
  if (count) {
    writeFileSync(file, JSON.stringify(book, null, 2) + "\n", "utf8");
    touched++;
  }
  console.log(`${locale}: enriched ${count} chapters`);
}
console.log(`Done — updated ${touched} locale file(s).`);
