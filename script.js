'use strict';

// ── LOCALES ──────────────────────────────────────────────────────────
const LOCALES=[
  {code:'en',label:'English',      dir:'ltr'},
  {code:'es',label:'Español',      dir:'ltr'},
  {code:'it',label:'Italiano',     dir:'ltr'},
  {code:'fr',label:'Français',     dir:'ltr'},
  {code:'pt',label:'Português',    dir:'ltr'},
  {code:'ar',label:'العربية',     dir:'rtl'},
  {code:'de',label:'Deutsch',      dir:'ltr'},
  {code:'zh',label:'中文',         dir:'ltr'},
  {code:'ja',label:'日本語',       dir:'ltr'},
  {code:'ko',label:'한국어',       dir:'ltr'},
];

// ── UI STRINGS ────────────────────────────────────────────────────────
const UI={
en:{language:'Language',brandSub:'Leadership skills guide',searchLabel:'Search chapters',searchPlaceholder:'Try: empathy, goals, culture',wikiVersion:'Wiki v1',browseLearn:'Browse & learn',bookLabel:'Book',modeLabel:'Mode',heroEyebrow:'EXECUTIVE COMMUNICATION & PRESENCE',heroText:'Leading high-performance teams through self-awareness, emotional intelligence, influence, and colour-aware communication.',btnExplore:'Explore chapters',btnTool:'Comms Evaluator',btnConclusion:'Conclusion',arcNoteLabel:'ARC design lens',arcNoteTagline:'Anchor. Rhythm. Clarity.',arcNoteText:'The layout keeps the narrative anchored, the navigation rhythmic, and the copy clear.',overviewEyebrow:'Overview',overviewTitle:'What this book is about',partsEyebrow:'Five parts',partsTitle:'The book structure',chaptersEyebrow:'Chapter wiki',chaptersTitle:'Deep dive',filteredLabel:'Filtered chapters',clearFilters:'Clear filters',chapterCount:'{n} of {total} chapters shown',evalEyebrow:'Interactive tool',evalTitle:'Communication Style Evaluator',evalLede:'Use the Colours evaluator to assess communication style and get tailored recommendations.',evalNotice:'Nobody is just one style. Weight each behaviour — the Colour composition is revealed only when you analyse.',appendicesEyebrow:'Reference material',appendicesTitle:'Appendices',conclusionEyebrow:'Closing synthesis',conclusionSecTitle:'The conclusion in one place',partLabel:'Part',chaptersLabel:'chapters',conclusionLabel:'Conclusion',closeArc:'Close the arc',noMatches:'No matches',noMatchesHint:'Try a different search or clear the current filter.',noChapterSelected:'No chapter selected',nothingMatches:'Nothing matches this filter',useSearch:'Use the search box or part filters to bring chapters into view.',whyItMatters:'Why it matters',theoryDeepDive:'Theory deep-dive',putIntoPractice:'Put it into practice',chapterTakeaways:'Chapter takeaways',previous:'Previous',next:'Next',seeAppendices:'See appendices',focusThisPart:'Focus this part',coreSynthesis:'Core synthesis',partsLabel:'parts',appendicesNum:'appendices',adaptiveRange:'adaptive range',toolsLabel:'tools',footerText:'Leadership Workshop · The Adaptive Leader — a guide, not a label.',keyModels:'Key frameworks',colourAngle:'The four colours',leaderInAction:'Leader in action',watchOut:'Watch out for',btnSelfAssess:'Self-assess',saEyebrow:'Self-assessment',saTitle:'Colour Self-Assessment',saLede:'Discover your own colour balance and get personalised recommendations for self-awareness, emotional control, and adapting to each other colour.',saNotice:'Rate how well each statement describes your natural default — the colours are hidden until you reveal your profile.',laEyebrow:'Skills assessment',laTitle:'Leadership Skills Assessment',laLede:'Rate yourself across the 17 leadership topics and get a prioritised set of recommendations to improve.',laNotice:'Answer honestly for how you lead today, not how you aspire to — your lowest-scoring areas become your action plan.',btnLeadership:'Assess skills',navAbout:'About',aboutTitle:'About this guide',aboutBody1:'The Adaptive Leader consolidates the crucial topics for the professional development of your leadership skills — from self-awareness and emotional intelligence to communication, team-building, decision-making, coaching, and leading across cultures.',aboutBody2:'It is not intended to replace the book or the deep reading behind it. It is a guide — a fast, structured way to revisit the ideas, assess yourself, and put them into practice.',aboutCreditsLabel:'Credits',aboutPowered:'This application is powered by <strong>Leandro</strong>.',axAtBest:'At their best:',axUnderStress:'Under stress:',axToInfluence:'To influence:',axDo:'&#10003; Do',axAvoid:'&#10007; Avoid',axDaily:'Daily',axWeekly:'Weekly',axMonthly:'Monthly',axCatColour:'Colour & Behaviour',axCatSelf:'Self-Awareness & EQ',axCatComms:'Communication & Influence',axCatTeams:'Teams & Performance'},
es:{language:'Idioma',brandSub:'Guía de competencias de liderazgo',searchLabel:'Buscar capítulos',searchPlaceholder:'Ej: empatía, objetivos, cultura',wikiVersion:'Wiki v1',browseLearn:'Explorar y aprender',bookLabel:'Libro',modeLabel:'Modo',heroEyebrow:'COMUNICACIÓN EJECUTIVA Y PRESENCIA',heroText:'Liderar equipos de alto rendimiento mediante la autoconciencia, la inteligencia emocional, la influencia y la comunicación adaptativa.',btnExplore:'Explorar capítulos',btnTool:'Evaluador de Comms',btnConclusion:'Conclusión',arcNoteLabel:'Diseño ARC',arcNoteTagline:'Anclar. Ritmo. Claridad.',arcNoteText:'El diseño mantiene la narrativa anclada, la navegación rítmica y el texto claro.',overviewEyebrow:'Resumen',overviewTitle:'De qué trata este libro',partsEyebrow:'Cinco partes',partsTitle:'La estructura del libro',chaptersEyebrow:'Wiki de capítulos',chaptersTitle:'Exploración profunda',filteredLabel:'Capítulos filtrados',clearFilters:'Limpiar filtros',chapterCount:'{n} de {total} capítulos',evalEyebrow:'Herramienta interactiva',evalTitle:'Evaluador de Estilo de Comunicación',evalLede:'Usa el evaluador de colores para analizar el estilo de comunicación y obtener recomendaciones personalizadas.',evalNotice:'Nadie tiene un único estilo. Pesa cada comportamiento — la composición de colores se revela solo al analizar.',appendicesEyebrow:'Material de referencia',appendicesTitle:'Apéndices',conclusionEyebrow:'Síntesis final',conclusionSecTitle:'La conclusión en un solo lugar',partLabel:'Parte',chaptersLabel:'capítulos',conclusionLabel:'Conclusión',closeArc:'Cerrar el arco',noMatches:'Sin resultados',noMatchesHint:'Prueba otra búsqueda o elimina el filtro actual.',noChapterSelected:'Ningún capítulo seleccionado',nothingMatches:'Nada coincide con este filtro',useSearch:'Usa la búsqueda o los filtros por parte para mostrar capítulos.',whyItMatters:'Por qué importa',theoryDeepDive:'Fundamento teórico',putIntoPractice:'Ponlo en práctica',chapterTakeaways:'Ideas clave',previous:'Anterior',next:'Siguiente',seeAppendices:'Ver apéndices',focusThisPart:'Enfocar esta parte',coreSynthesis:'Síntesis central',partsLabel:'partes',appendicesNum:'apéndices',adaptiveRange:'rango adaptativo',toolsLabel:'herramientas',footerText:'Taller de Liderazgo · El Líder Adaptativo — una guía, no una etiqueta.',keyModels:'Marcos clave',colourAngle:'Los cuatro colores',leaderInAction:'Líder en acción',watchOut:'Ten cuidado con',btnSelfAssess:'Autoevaluación',saEyebrow:'Autoevaluación',saTitle:'Autoevaluación de Colores',saLede:'Descubre tu propio equilibrio de colores y obtén recomendaciones personalizadas para la autoconciencia, el control emocional y la influencia.',saNotice:'Evalúa qué tan bien describe cada afirmación tu comportamiento natural predeterminado — los colores se ocultan hasta que reveles tu perfil.',laEyebrow:'Evaluación de competencias',laTitle:'Evaluación de Competencias de Liderazgo',laLede:'Evalúate en los 17 temas de liderazgo y obtén un conjunto priorizado de recomendaciones para mejorar.',laNotice:'Responde con honestidad sobre cómo lideras hoy, no como aspiras — tus áreas con menor puntuación se convierten en tu plan de acción.',btnLeadership:'Evaluar competencias',navAbout:'Acerca de',aboutTitle:'Acerca de esta guía',aboutBody1:'El Líder Adaptativo consolida los temas cruciales para el desarrollo profesional de tus competencias de liderazgo — desde la autoconciencia y la inteligencia emocional hasta la comunicación, la construcción de equipos, la toma de decisiones, el coaching y liderar entre culturas.',aboutBody2:'No pretende reemplazar el libro ni la lectura profunda que hay detrás. Es una guía: una forma rápida y estructurada de revisar las ideas, evaluarte y ponerlas en práctica.',aboutCreditsLabel:'Créditos',aboutPowered:'Esta aplicación funciona gracias a <strong>Leandro</strong>.',axAtBest:'En su mejor versión:',axUnderStress:'Bajo presión:',axToInfluence:'Para influir:',axDo:'&#10003; Hacer',axAvoid:'&#10007; Evitar',axDaily:'Diario',axWeekly:'Semanal',axMonthly:'Mensual',axCatColour:'Color y comportamiento',axCatSelf:'Autoconsciencia e IE',axCatComms:'Comunicación e influencia',axCatTeams:'Equipos y rendimiento'},

it:{language:'Lingua',brandSub:'Guida alle competenze di leadership',searchLabel:'Cerca capitoli',searchPlaceholder:'Es: empatia, obiettivi, cultura',wikiVersion:'Wiki v1',browseLearn:'Esplora e impara',bookLabel:'Libro',modeLabel:'Modalità',heroEyebrow:'COMUNICAZIONE ESECUTIVA E PRESENZA',heroText:"Guidare team ad alte prestazioni attraverso la consapevolezza di sé, l'intelligenza emotiva, l'influenza e la comunicazione adattiva.",btnExplore:'Esplora i capitoli',btnTool:'Valutatore Comms',btnConclusion:'Conclusione',arcNoteLabel:'Design ARC',arcNoteTagline:'Ancorare. Ritmo. Chiarezza.',arcNoteText:'Il layout mantiene la narrazione ancorata, la navigazione ritmica e il testo chiaro.',overviewEyebrow:'Panoramica',overviewTitle:'Di cosa parla questo libro',partsEyebrow:'Cinque parti',partsTitle:'La struttura del libro',chaptersEyebrow:'Wiki dei capitoli',chaptersTitle:'Approfondimento',filteredLabel:'Capitoli filtrati',clearFilters:'Cancella filtri',chapterCount:'{n} di {total} capitoli',evalEyebrow:'Strumento interattivo',evalTitle:'Valutatore di Stile Comunicativo',evalLede:"Usa il valutatore dei colori per analizzare lo stile comunicativo e ottenere raccomandazioni personalizzate.",evalNotice:"Nessuno ha un unico stile. Pesa ogni comportamento — la composizione dei colori si rivela solo all'analisi.",appendicesEyebrow:'Materiale di riferimento',appendicesTitle:'Appendici',conclusionEyebrow:'Sintesi finale',conclusionSecTitle:'La conclusione in un unico posto',partLabel:'Parte',chaptersLabel:'capitoli',conclusionLabel:'Conclusione',closeArc:"Chiudi l'arco",noMatches:'Nessun risultato',noMatchesHint:'Prova una ricerca diversa o cancella il filtro attuale.',noChapterSelected:'Nessun capitolo selezionato',nothingMatches:'Niente corrisponde a questo filtro',useSearch:'Usa la ricerca o i filtri per parte per visualizzare i capitoli.',whyItMatters:'Perché è importante',theoryDeepDive:'Approfondimento teorico',putIntoPractice:'Mettilo in pratica',chapterTakeaways:'Punti chiave',previous:'Precedente',next:'Successivo',seeAppendices:'Vedi appendici',focusThisPart:'Concentrati su questa parte',coreSynthesis:'Sintesi centrale',partsLabel:'parti',appendicesNum:'appendici',adaptiveRange:'gamma adattiva',toolsLabel:'strumenti',footerText:"Workshop di Leadership · Il Leader Adattivo — una guida, non un'etichetta.",keyModels:'Framework chiave',colourAngle:'I quattro colori',leaderInAction:'Leader in azione',watchOut:'Attenzione a',btnSelfAssess:'Autovalutazione',saEyebrow:'Autovalutazione',saTitle:'Autovalutazione dei Colori',saLede:'Scopri il tuo equilibrio dei colori e ricevi raccomandazioni personalizzate per la consapevolezza di sé, il controllo emotivo e l influenza.',saNotice:'Valuta quanto bene ogni affermazione descrive il tuo comportamento naturale predefinito — i colori sono nascosti fino alla rivelazione del profilo.',laEyebrow:'Valutazione delle competenze',laTitle:'Valutazione delle Competenze di Leadership',laLede:'Valutati sui 17 temi della leadership e ottieni un insieme prioritizzato di raccomandazioni per migliorare.',laNotice:'Rispondi con onestà su come guidi oggi, non su come aspiri — le aree con punteggio più basso diventano il tuo piano d azione.',btnLeadership:'Valuta le competenze',navAbout:'Informazioni',aboutTitle:'Informazioni su questa guida',aboutBody1:'Il Leader Adattivo consolida i temi cruciali per lo sviluppo professionale delle tue competenze di leadership — dalla consapevolezza di sé e dall intelligenza emotiva alla comunicazione, alla costruzione del team, alle decisioni, al coaching e alla guida tra culture.',aboutBody2:'Non intende sostituire il libro né la lettura approfondita che lo sostiene. È una guida: un modo rapido e strutturato per rivedere le idee, valutarti e metterle in pratica.',aboutCreditsLabel:'Crediti',aboutPowered:'Questa applicazione è resa possibile da <strong>Leandro</strong>.',axAtBest:'Nel loro meglio:',axUnderStress:'Sotto pressione:',axToInfluence:'Per influenzare:',axDo:'&#10003; Fare',axAvoid:'&#10007; Evitare',axDaily:'Quotidiano',axWeekly:'Settimanale',axMonthly:'Mensile',axCatColour:'Colori e comportamento',axCatSelf:'Autoconsapevolezza e IE',axCatComms:'Comunicazione e influenza',axCatTeams:'Squadre e performance'},

fr:{language:'Langue',brandSub:'Guide des compétences de leadership',searchLabel:'Rechercher des chapitres',searchPlaceholder:'Ex : empathie, objectifs, culture',wikiVersion:'Wiki v1',browseLearn:'Explorer et apprendre',bookLabel:'Livre',modeLabel:'Mode',heroEyebrow:'COMMUNICATION EXÉCUTIVE ET PRÉSENCE',heroText:"Diriger des équipes haute performance grâce à la conscience de soi, l'intelligence émotionnelle, l'influence et la communication adaptative.",btnExplore:'Explorer les chapitres',btnTool:'Évaluateur Comms',btnConclusion:'Conclusion',arcNoteLabel:'Design ARC',arcNoteTagline:'Ancrer. Rythme. Clarté.',arcNoteText:'La mise en page maintient le récit ancré, la navigation rythmée et le texte clair.',overviewEyebrow:"Vue d'ensemble",overviewTitle:'De quoi parle ce livre',partsEyebrow:'Cinq parties',partsTitle:'La structure du livre',chaptersEyebrow:'Wiki des chapitres',chaptersTitle:'Exploration approfondie',filteredLabel:'Chapitres filtrés',clearFilters:'Effacer les filtres',chapterCount:'{n} sur {total} chapitres',evalEyebrow:'Outil interactif',evalTitle:'Évaluateur de Style de Communication',evalLede:"Utilisez l'évaluateur des couleurs pour analyser le style de communication et obtenir des recommandations personnalisées.",evalNotice:"Personne n'a un style unique. Pondérez chaque comportement — la composition des couleurs est révélée uniquement lors de l'analyse.",appendicesEyebrow:'Matériel de référence',appendicesTitle:'Annexes',conclusionEyebrow:'Synthèse finale',conclusionSecTitle:'La conclusion en un seul endroit',partLabel:'Partie',chaptersLabel:'chapitres',conclusionLabel:'Conclusion',closeArc:"Fermer l'arc",noMatches:'Aucun résultat',noMatchesHint:'Essayez une autre recherche ou effacez le filtre.',noChapterSelected:'Aucun chapitre sélectionné',nothingMatches:'Rien ne correspond à ce filtre',useSearch:'Utilisez la recherche ou les filtres par partie pour afficher les chapitres.',whyItMatters:"Pourquoi c'est important",theoryDeepDive:'Approfondissement théorique',putIntoPractice:'Passez à la pratique',chapterTakeaways:'Points clés',previous:'Précédent',next:'Suivant',seeAppendices:'Voir les annexes',focusThisPart:'Se concentrer sur cette partie',coreSynthesis:'Synthèse centrale',partsLabel:'parties',appendicesNum:'annexes',adaptiveRange:'gamme adaptative',toolsLabel:'outils',footerText:"Atelier de Leadership · Le Leader Adaptatif — un guide, pas une étiquette.",keyModels:'Cadres clés',colourAngle:'Les quatre couleurs',leaderInAction:'Leader en action',watchOut:'Attention à',btnSelfAssess:'Auto-évaluation',saEyebrow:'Auto-évaluation',saTitle:'Auto-évaluation des Couleurs',saLede:'Découvrez votre propre équilibre de couleurs et obtenez des recommandations personnalisées pour la conscience de soi, le contrôle émotionnel et l influence.',saNotice:'Évaluez dans quelle mesure chaque affirmation décrit votre comportement naturel par défaut — les couleurs sont masquées jusqu à la révélation du profil.',laEyebrow:'Évaluation des compétences',laTitle:'Évaluation des Compétences de Leadership',laLede:'Évaluez-vous sur les 17 thèmes du leadership et obtenez un ensemble priorisé de recommandations pour progresser.',laNotice:'Répondez honnêtement selon votre façon de diriger aujourd hui, non celle à laquelle vous aspirez — vos domaines les plus faibles deviennent votre plan d action.',btnLeadership:'Évaluer les compétences',navAbout:'À propos',aboutTitle:'À propos de ce guide',aboutBody1:'Le Leader Adaptatif regroupe les thèmes essentiels au développement professionnel de vos compétences en leadership — de la conscience de soi et de l intelligence émotionnelle à la communication, à la construction d équipe, à la décision, au coaching et au leadership interculturel.',aboutBody2:'Il n a pas vocation à remplacer le livre ni la lecture approfondie qui le sous-tend. C est un guide : un moyen rapide et structuré de revisiter les idées, de vous évaluer et de les mettre en pratique.',aboutCreditsLabel:'Crédits',aboutPowered:'Cette application est propulsée par <strong>Leandro</strong>.',axAtBest:'À leur meilleur:',axUnderStress:'Sous pression:',axToInfluence:'Pour influencer:',axDo:'&#10003; Faire',axAvoid:'&#10007; Éviter',axDaily:'Quotidien',axWeekly:'Hebdomadaire',axMonthly:'Mensuel',axCatColour:'Couleurs et comportement',axCatSelf:'Conscience de soi et IE',axCatComms:'Communication et influence',axCatTeams:'Équipes et performance'},

ar:{language:'اللغة',brandSub:'دليل مهارات القيادة',searchLabel:'البحث في الفصول',searchPlaceholder:'مثال: التعاطف، الأهداف، الثقافة',wikiVersion:'ويكي ن١',browseLearn:'تصفح وتعلّم',bookLabel:'الكتاب',modeLabel:'الوضع',heroEyebrow:'التواصل التنفيذي والحضور القيادي',heroText:'قيادة فرق عالية الأداء من خلال الوعي الذاتي والذكاء العاطفي والتأثير والتواصل التكيّفي.',btnExplore:'استكشاف الفصول',btnTool:'مُقيِّم التواصل',btnConclusion:'الخاتمة',arcNoteLabel:'نهج ARC التصميمي',arcNoteTagline:'تثبيت. إيقاع. وضوح.',arcNoteText:'يحافظ التصميم على ثبات السرد وإيقاع التنقل ووضوح المحتوى.',overviewEyebrow:'نظرة عامة',overviewTitle:'عم يتحدث هذا الكتاب',partsEyebrow:'خمسة أجزاء',partsTitle:'هيكل الكتاب',chaptersEyebrow:'ويكي الفصول',chaptersTitle:'استكشاف معمّق',filteredLabel:'الفصول المفلترة',clearFilters:'مسح الفلاتر',chapterCount:'{n} من أصل {total} فصل',evalEyebrow:'أداة تفاعلية',evalTitle:'مُقيِّم أسلوب التواصل',evalLede:'استخدم مُقيِّم الألوان لتحليل أسلوب التواصل والحصول على توصيات مخصصة.',evalNotice:'لا أحد يمتلك أسلوباً واحداً فقط. قيّم كل سلوك — يظهر تكوين الألوان عند التحليل.',appendicesEyebrow:'مواد مرجعية',appendicesTitle:'الملاحق',conclusionEyebrow:'التوليف الختامي',conclusionSecTitle:'الخاتمة في مكان واحد',partLabel:'الجزء',chaptersLabel:'فصول',conclusionLabel:'الخاتمة',closeArc:'إغلاق القوس',noMatches:'لا توجد نتائج',noMatchesHint:'جرّب بحثاً مختلفاً أو امسح الفلتر الحالي.',noChapterSelected:'لم يُختر أي فصل',nothingMatches:'لا شيء يطابق هذا الفلتر',useSearch:'استخدم البحث أو فلاتر الأجزاء لعرض الفصول.',whyItMatters:'لماذا يهم هذا',theoryDeepDive:'التعمق النظري',putIntoPractice:'طبّقه عملياً',chapterTakeaways:'خلاصة الفصل',previous:'السابق',next:'التالي',seeAppendices:'عرض الملاحق',focusThisPart:'التركيز على هذا الجزء',coreSynthesis:'التوليف الجوهري',partsLabel:'أجزاء',appendicesNum:'ملاحق',adaptiveRange:'النطاق التكيّفي',toolsLabel:'أدوات',footerText:'ورشة القيادة · القائد التكيّفي — دليل، لا صفة.',keyModels:'الأطر الرئيسية',colourAngle:'الألوان الأربعة',leaderInAction:'القائد في العمل',watchOut:'احذر من',btnSelfAssess:'تقييم ذاتي',saEyebrow:'التقييم الذاتي',saTitle:'التقييم الذاتي للألوان',saLede:'اكتشف توازن ألوانك الخاص واحصل على توصيات مخصصة للوعي الذاتي والتحكم العاطفي والتأثير.',saNotice:'قيّم مدى وصف كل عبارة لسلوكك الافتراضي الطبيعي — الألوان مخفية حتى تكشف عن ملفك الشخصي.',laEyebrow:'تقييم المهارات',laTitle:'تقييم مهارات القيادة',laLede:'قيّم نفسك عبر مواضيع القيادة السبعة عشر واحصل على مجموعة توصيات مرتّبة حسب الأولوية للتحسين.',laNotice:'أجب بصدق عن كيف تقود اليوم، لا كما تطمح — أدنى مجالاتك تقييمًا تصبح خطة عملك.',btnLeadership:'قيّم المهارات',navAbout:'حول',aboutTitle:'حول هذا الدليل',aboutBody1:'«القائد التكيّفي» يجمع المواضيع الجوهرية للتطوير المهني لمهاراتك القيادية — من الوعي بالذات والذكاء العاطفي إلى التواصل وبناء الفريق واتخاذ القرار والتدريب والقيادة عبر الثقافات.',aboutBody2:'لا يُقصد به أن يحل محل الكتاب ولا القراءة المتعمّقة التي وراءه. إنه دليل: طريقة سريعة ومنظّمة لمراجعة الأفكار وتقييم نفسك ووضعها موضع التطبيق.',aboutCreditsLabel:'شكر وتقدير',aboutPowered:'هذا التطبيق مُشغّل بواسطة <strong>Leandro</strong>.',axAtBest:'في أفضل حالاتهم:',axUnderStress:'تحت الضغط:',axToInfluence:'للتأثير عليهم:',axDo:'&#10003; افعل',axAvoid:'&#10007; تجنب',axDaily:'يومي',axWeekly:'أسبوعي',axMonthly:'شهري',axCatColour:'الألوان والسلوك',axCatSelf:'الوعي الذاتي والذكاء العاطفي',axCatComms:'التواصل والتأثير',axCatTeams:'الفرق والأداء'},

de:{language:'Sprache',brandSub:'Leitfaden für Führungskompetenzen',searchLabel:'Kapitel suchen',searchPlaceholder:'z. B. Empathie, Ziele, Kultur',wikiVersion:'Wiki v1',browseLearn:'Erkunden & Lernen',bookLabel:'Buch',modeLabel:'Modus',heroEyebrow:'EXECUTIVE COMMUNICATION UND PRÄSENZ',heroText:'Hochleistungsteams führen durch Selbstwahrnehmung, emotionale Intelligenz, Einfluss und adaptives Kommunizieren.',btnExplore:'Kapitel erkunden',btnTool:'Komm.-Evaluator',btnConclusion:'Fazit',arcNoteLabel:'ARC-Designprinzip',arcNoteTagline:'Verankern. Rhythmus. Klarheit.',arcNoteText:'Das Layout hält das Narrativ verankert, die Navigation rhythmisch und den Text klar.',overviewEyebrow:'Überblick',overviewTitle:'Worum geht es in diesem Buch',partsEyebrow:'Fünf Teile',partsTitle:'Die Buchstruktur',chaptersEyebrow:'Kapitel-Wiki',chaptersTitle:'Vertiefung',filteredLabel:'Gefilterte Kapitel',clearFilters:'Filter zurücksetzen',chapterCount:'{n} von {total} Kapiteln',evalEyebrow:'Interaktives Tool',evalTitle:'Kommunikationsstil-Evaluator',evalLede:'Nutze den Farben-Evaluator, um den Kommunikationsstil zu analysieren und maßgeschneiderte Empfehlungen zu erhalten.',evalNotice:'Niemand hat nur einen Stil. Gewichte jedes Verhalten — die Farbzusammensetzung wird erst bei der Analyse sichtbar.',appendicesEyebrow:'Referenzmaterial',appendicesTitle:'Anhänge',conclusionEyebrow:'Abschlusssynthese',conclusionSecTitle:'Das Fazit auf einen Blick',partLabel:'Teil',chaptersLabel:'Kapitel',conclusionLabel:'Fazit',closeArc:'Bogen schließen',noMatches:'Keine Ergebnisse',noMatchesHint:'Versuche eine andere Suche oder setze den Filter zurück.',noChapterSelected:'Kein Kapitel ausgewählt',nothingMatches:'Nichts entspricht diesem Filter',useSearch:'Nutze die Suche oder Teilfilter, um Kapitel anzuzeigen.',whyItMatters:'Warum es wichtig ist',theoryDeepDive:'Theoretischer Hintergrund',putIntoPractice:'In die Praxis umsetzen',chapterTakeaways:'Kernaussagen des Kapitels',previous:'Zurück',next:'Weiter',seeAppendices:'Anhänge ansehen',focusThisPart:'Diesen Teil fokussieren',coreSynthesis:'Kernsynthese',partsLabel:'Teile',appendicesNum:'Anhänge',adaptiveRange:'adaptives Spektrum',toolsLabel:'Tools',footerText:'Führungs-Workshop · Der Adaptive Leader — ein Leitfaden, kein Label.',keyModels:'Wichtige Modelle',colourAngle:'Die vier Farben',leaderInAction:'Führungskraft in der Praxis',watchOut:'Achtung',btnSelfAssess:'Selbstcheck',saEyebrow:'Selbsteinschätzung',saTitle:'Farben-Selbsteinschätzung',saLede:'Entdecken Sie Ihr eigenes Farbgleichgewicht und erhalten Sie personalisierte Empfehlungen für Selbstwahrnehmung, emotionale Regulierung und Einfluss.',saNotice:'Bewerten Sie, wie gut jede Aussage Ihr natürliches Standardverhalten beschreibt — die Farben sind verborgen, bis Sie Ihr Profil enthüllen.',laEyebrow:'Kompetenz-Check',laTitle:'Leadership-Kompetenz-Check',laLede:'Bewerten Sie sich in den 17 Führungsthemen und erhalten Sie priorisierte Empfehlungen zur Verbesserung.',laNotice:'Antworten Sie ehrlich danach, wie Sie heute führen, nicht wie Sie es anstreben — Ihre schwächsten Bereiche werden zu Ihrem Aktionsplan.',btnLeadership:'Kompetenzen prüfen',navAbout:'Über',aboutTitle:'Über diesen Leitfaden',aboutBody1:'Der Adaptive Leader bündelt die entscheidenden Themen für die berufliche Entwicklung Ihrer Führungskompetenzen — von Selbstwahrnehmung und emotionaler Intelligenz über Kommunikation, Teamaufbau, Entscheidungsfindung und Coaching bis zur Führung über Kulturen hinweg.',aboutBody2:'Er soll weder das Buch noch die vertiefte Lektüre dahinter ersetzen. Er ist ein Leitfaden — ein schneller, strukturierter Weg, die Ideen erneut aufzugreifen, sich selbst einzuschätzen und sie in die Praxis umzusetzen.',aboutCreditsLabel:'Mitwirkende',aboutPowered:'Diese Anwendung wird von <strong>Leandro</strong> betrieben.',axAtBest:'Auf der Höhe:',axUnderStress:'Unter Druck:',axToInfluence:'Um zu beeinflussen:',axDo:'&#10003; Tun',axAvoid:'&#10007; Vermeiden',axDaily:'Täglich',axWeekly:'Wöchentlich',axMonthly:'Monatlich',axCatColour:'Farben und Verhalten',axCatSelf:'Selbstwahrnehmung und EI',axCatComms:'Kommunikation und Einfluss',axCatTeams:'Teams und Leistung'},
zh:{language:'语言',brandSub:'领导力技能指南',searchLabel:'搜索章节',searchPlaceholder:'尝试：同理心、目标、文化',wikiVersion:'百科 v1',browseLearn:'浏览与学习',bookLabel:'书籍',modeLabel:'模式',heroEyebrow:'高管沟通与个人影响力',heroText:'通过自我意识、情商、影响力和适应性沟通，领导高绩效团队。',btnExplore:'探索章节',btnTool:'沟通评估工具',btnConclusion:'结论',arcNoteLabel:'ARC 设计理念',arcNoteTagline:'锚定·节奏·清晰',arcNoteText:'布局保持叙事稳定、导航有序、内容简洁明了。',overviewEyebrow:'概述',overviewTitle:'本书内容',partsEyebrow:'五个部分',partsTitle:'本书结构',chaptersEyebrow:'章节百科',chaptersTitle:'深度探索',filteredLabel:'筛选后的章节',clearFilters:'清除筛选',chapterCount:'显示 {n} / {total} 章',evalEyebrow:'互动工具',evalTitle:'沟通风格评估工具',evalLede:'使用颜色评估工具分析沟通风格，获取个性化建议。',evalNotice:'没有人只有一种风格。对每个行为打分——颜色构成仅在分析时显示。',appendicesEyebrow:'参考资料',appendicesTitle:'附录',conclusionEyebrow:'核心总结',conclusionSecTitle:'一览全书结论',partLabel:'第',chaptersLabel:'章',conclusionLabel:'结论',closeArc:'关闭弧线',noMatches:'无匹配结果',noMatchesHint:'请尝试不同的搜索或清除当前筛选条件。',noChapterSelected:'未选择章节',nothingMatches:'无内容匹配此筛选条件',useSearch:'请使用搜索框或部分筛选器重新显示章节。',whyItMatters:'为什么重要',theoryDeepDive:'理论深潜',putIntoPractice:'付诸实践',chapterTakeaways:'章节要点',previous:'上一章',next:'下一章',seeAppendices:'查看附录',focusThisPart:'聚焦此部分',coreSynthesis:'核心综合',partsLabel:'部分',appendicesNum:'附录',adaptiveRange:'适应性范围',toolsLabel:'工具',footerText:'领导力工作坊 · 适应型领导者 — 指南而非标签。',keyModels:'关键框架',colourAngle:'四种颜色',leaderInAction:'领导者实践',watchOut:'注意事项',btnSelfAssess:'自我评估',saEyebrow:'自我评估',saTitle:'颜色自我评估',saLede:'发现您自己的颜色平衡，并获得关于自我意识、情绪调节和影响力的个性化建议。',saNotice:'评估每个陈述对您自然默认行为的描述程度 — 颜色在您揭示个人资料之前保持隐藏。',laEyebrow:'技能评估',laTitle:'领导力技能评估',laLede:'针对 17 个领导力主题为自己评分，获得一份按优先级排序的改进建议。',laNotice:'请如实回答你今天的领导方式，而非你所向往的样子——得分最低的领域会成为你的行动计划。',btnLeadership:'评估技能',navAbout:'关于',aboutTitle:'关于本指南',aboutBody1:'《适应型领导者》汇集了对你领导力技能的职业发展至关重要的主题——从自我意识、情商，到沟通、团队建设、决策、教练辅导以及跨文化领导。',aboutBody2:'它无意取代原书或其背后的深度阅读。它只是一份指南——一种快速而有条理的方式，帮你重温理念、评估自己并付诸实践。',aboutCreditsLabel:'致谢',aboutPowered:'本应用由 <strong>Leandro</strong> 提供支持。',axAtBest:'最佳状态:',axUnderStress:'压力下:',axToInfluence:'如何影响:',axDo:'&#10003; 要做',axAvoid:'&#10007; 避免',axDaily:'每日',axWeekly:'每周',axMonthly:'每月',axCatColour:'颜色与行为',axCatSelf:'自我意识与情商',axCatComms:'沟通与影响力',axCatTeams:'团队与绩效'},

ja:{language:'言語',brandSub:'リーダーシップ・スキルガイド',searchLabel:'チャプターを検索',searchPlaceholder:'例：共感、目標、文化',wikiVersion:'ウィキ v1',browseLearn:'閲覧と学習',bookLabel:'書籍',modeLabel:'モード',heroEyebrow:'エグゼクティブ・コミュニケーションとプレゼンス',heroText:'自己認識・感情的知性・影響力・適応型コミュニケーションを通じて、高パフォーマンスチームを率いる。',btnExplore:'チャプターを探索',btnTool:'コミュニケーション評価',btnConclusion:'結論',arcNoteLabel:'ARCデザイン原則',arcNoteTagline:'定着。リズム。明快さ。',arcNoteText:'レイアウトは物語を定着させ、ナビゲーションにリズムを与え、テキストを明快に保ちます。',overviewEyebrow:'概要',overviewTitle:'この本の内容',partsEyebrow:'5つのパート',partsTitle:'本の構成',chaptersEyebrow:'チャプターウィキ',chaptersTitle:'詳細解説',filteredLabel:'フィルター済みチャプター',clearFilters:'フィルターをクリア',chapterCount:'{total}章中{n}章表示',evalEyebrow:'インタラクティブツール',evalTitle:'コミュニケーションスタイル評価ツール',evalLede:'カラー評価ツールを使ってコミュニケーションスタイルを分析し、個別の推奨事項を取得します。',evalNotice:'スタイルは一つではありません。各行動にウェイトを付けると、分析時にカラー構成が明らかになります。',appendicesEyebrow:'参考資料',appendicesTitle:'付録',conclusionEyebrow:'締めくくりの統合',conclusionSecTitle:'結論を一か所で',partLabel:'パート',chaptersLabel:'チャプター',conclusionLabel:'結論',closeArc:'アークを閉じる',noMatches:'一致なし',noMatchesHint:'別の検索を試すか、フィルターをクリアしてください。',noChapterSelected:'チャプター未選択',nothingMatches:'このフィルターに一致するものはありません',useSearch:'検索ボックスまたはパートフィルターを使用してチャプターを表示してください。',whyItMatters:'なぜ重要か',theoryDeepDive:'理論の深掘り',putIntoPractice:'実践する',chapterTakeaways:'チャプターの要点',previous:'前へ',next:'次へ',seeAppendices:'付録を見る',focusThisPart:'このパートに集中',coreSynthesis:'コア統合',partsLabel:'パート',appendicesNum:'付録',adaptiveRange:'適応の幅',toolsLabel:'ツール',footerText:'リーダーシップワークショップ · 適応型リーダー — ガイドであって、ラベルではありません。',keyModels:'主要フレームワーク',colourAngle:'4つの色',leaderInAction:'リーダーの実践',watchOut:'注意点',btnSelfAssess:'自己評価',saEyebrow:'自己評価',saTitle:'カラー自己評価',saLede:'自分自身のカラーバランスを発見し、自己認識、感情制御、他の色への適応に関する個別の推奨事項を取得します。',saNotice:'各ステートメントが自然なデフォルト行動をどの程度説明しているかを評価してください — プロファイルを公開するまで色は非表示です。',laEyebrow:'スキル評価',laTitle:'リーダーシップ・スキル評価',laLede:'17のリーダーシップ・テーマで自己評価し、改善のための優先順位付きの推奨事項を得ます。',laNotice:'憧れではなく、今のあなたの導き方について正直に答えてください——最も低いスコアの領域があなたの行動計画になります。',btnLeadership:'スキルを評価',navAbout:'概要',aboutTitle:'このガイドについて',aboutBody1:'『アダプティブ・リーダー』は、あなたのリーダーシップ・スキルの専門的成長に欠かせないテーマ——自己認識や感情的知性から、コミュニケーション、チームづくり、意思決定、コーチング、異文化リーダーシップまで——を凝縮したものです。',aboutBody2:'本書やその背後にある深い読書に取って代わるものではありません。これはガイドです——アイデアを再訪し、自己評価し、実践に移すための、速く構造化された方法です。',aboutCreditsLabel:'クレジット',aboutPowered:'このアプリケーションは <strong>Leandro</strong> によって提供されています。',axAtBest:'最高の状態:',axUnderStress:'プレッシャー下:',axToInfluence:'影響するには:',axDo:'&#10003; すること',axAvoid:'&#10007; 避けること',axDaily:'毎日',axWeekly:'毎週',axMonthly:'毎月',axCatColour:'色と行動',axCatSelf:'自己認識と感情知性',axCatComms:'コミュニケーションと影響力',axCatTeams:'チームとパフォーマンス'},

ko:{language:'언어',brandSub:'리더십 역량 가이드',searchLabel:'챕터 검색',searchPlaceholder:'예: 공감, 목표, 문화',wikiVersion:'위키 v1',browseLearn:'탐색하며 배우기',bookLabel:'도서',modeLabel:'모드',heroEyebrow:'경영진 커뮤니케이션 및 존재감',heroText:'자기 인식, 감성 지능, 영향력, 적응형 커뮤니케이션을 통해 고성과 팀을 이끕니다.',btnExplore:'챕터 탐색',btnTool:'소통 평가 도구',btnConclusion:'결론',arcNoteLabel:'ARC 디자인 원칙',arcNoteTagline:'고정. 리듬. 명확성.',arcNoteText:'레이아웃은 내러티브를 고정하고, 내비게이션에 리듬을 부여하며, 텍스트를 명확하게 유지합니다.',overviewEyebrow:'개요',overviewTitle:'이 책의 내용',partsEyebrow:'5개 파트',partsTitle:'책의 구성',chaptersEyebrow:'챕터 위키',chaptersTitle:'심층 탐구',filteredLabel:'필터된 챕터',clearFilters:'필터 초기화',chapterCount:'{total}개 중 {n}개 표시',evalEyebrow:'인터랙티브 도구',evalTitle:'커뮤니케이션 스타일 평가기',evalLede:'색깔 평가기를 사용하여 커뮤니케이션 스타일을 분석하고 맞춤형 권장 사항을 얻으세요.',evalNotice:'누구도 단 하나의 스타일만을 갖지 않습니다. 각 행동에 가중치를 부여하면 분석 시 색깔 구성이 공개됩니다.',appendicesEyebrow:'참고 자료',appendicesTitle:'부록',conclusionEyebrow:'마무리 종합',conclusionSecTitle:'한 곳에서 보는 결론',partLabel:'파트',chaptersLabel:'챕터',conclusionLabel:'결론',closeArc:'아크 닫기',noMatches:'일치 없음',noMatchesHint:'다른 검색어를 사용하거나 필터를 초기화하세요.',noChapterSelected:'선택된 챕터 없음',nothingMatches:'이 필터에 일치하는 항목이 없습니다',useSearch:'검색창 또는 파트 필터를 사용하여 챕터를 표시하세요.',whyItMatters:'왜 중요한가',theoryDeepDive:'이론 심화',putIntoPractice:'실천하기',chapterTakeaways:'챕터 핵심 사항',previous:'이전',next:'다음',seeAppendices:'부록 보기',focusThisPart:'이 파트에 집중',coreSynthesis:'핵심 종합',partsLabel:'파트',appendicesNum:'부록',adaptiveRange:'적응 범위',toolsLabel:'도구',footerText:'리더십 워크숍 · 적응형 리더 — 안내서이지, 레이블이 아닙니다.',keyModels:'핵심 프레임워크',colourAngle:'네 가지 색깔',leaderInAction:'리더의 실천',watchOut:'주의할 점',btnSelfAssess:'자기 평가',saEyebrow:'자기 평가',saTitle:'색깔 자기 평가',saLede:'자신의 색깔 균형을 발견하고 자기 인식, 감정 조절, 타 색깔 영향력에 대한 맞춤형 권장 사항을 얻으세요.',saNotice:'각 진술이 자신의 자연스러운 기본 행동을 얼마나 잘 설명하는지 평가하세요 — 색깔은 프로필을 공개할 때까지 숨겨져 있습니다.',laEyebrow:'역량 평가',laTitle:'리더십 역량 평가',laLede:'17가지 리더십 주제에 대해 자신을 평가하고 개선을 위한 우선순위별 권장 사항을 받으세요.',laNotice:'열망이 아니라 오늘 당신이 이끄는 방식에 대해 솔직하게 답하세요 — 가장 낮은 점수의 영역이 당신의 실행 계획이 됩니다.',btnLeadership:'역량 평가',navAbout:'소개',aboutTitle:'이 가이드 소개',aboutBody1:'《적응형 리더》는 리더십 역량의 전문적 성장에 결정적인 주제들 — 자기 인식과 감성지능에서 소통, 팀 빌딩, 의사결정, 코칭, 문화 간 리더십까지 — 을 응축한 것입니다.',aboutBody2:'책이나 그 배경의 깊은 독서를 대체하려는 것이 아닙니다. 이것은 가이드입니다 — 아이디어를 다시 살펴보고, 자신을 평가하고, 실천에 옥기는 빠르고 체계적인 방법입니다.',aboutCreditsLabel:'크레딧',aboutPowered:'이 애플리케이션은 <strong>Leandro</strong>가 제공합니다.',axAtBest:'최상의 상태:',axUnderStress:'압박 하:',axToInfluence:'영향력 행사:',axDo:'&#10003; 할 것',axAvoid:'&#10007; 피할 것',axDaily:'매일',axWeekly:'매주',axMonthly:'매월',axCatColour:'색깔과 행동',axCatSelf:'자기 인식과 감성지능',axCatComms:'소통과 영향력',axCatTeams:'팀과 성과'},
pt:{language:'Idioma',brandSub:'Guia de competências de liderança',searchLabel:'Pesquisar capítulos',searchPlaceholder:'Ex: empatia, objetivos, cultura',wikiVersion:'Wiki v1',browseLearn:'Explorar e aprender',bookLabel:'Livro',modeLabel:'Modo',heroEyebrow:'COMUNICAÇÃO EXECUTIVA E PRESENÇA',heroText:'Liderar equipas de alto desempenho através da autoconsciência, inteligência emocional, influência e comunicação adaptativa.',btnExplore:'Explorar capítulos',btnTool:'Avaliador de Comms',btnConclusion:'Conclusão',arcNoteLabel:'Design ARC',arcNoteTagline:'Ancorar. Ritmo. Clareza.',arcNoteText:'O layout mantém a narrativa ancorada, a navegação rítmica e o texto claro.',overviewEyebrow:'Visão geral',overviewTitle:'Do que trata este livro',partsEyebrow:'Cinco partes',partsTitle:'A estrutura do livro',chaptersEyebrow:'Wiki de capítulos',chaptersTitle:'Exploração profunda',filteredLabel:'Capítulos filtrados',clearFilters:'Limpar filtros',chapterCount:'{n} de {total} capítulos',evalEyebrow:'Ferramenta interativa',evalTitle:'Avaliador de Estilo de Comunicação',evalLede:'Usa o avaliador de cores para analisar o estilo de comunicação e obter recomendações personalizadas.',evalNotice:'Ninguém tem um único estilo. Pondera cada comportamento — a composição de cores revela-se apenas na análise.',appendicesEyebrow:'Material de referência',appendicesTitle:'Apêndices',conclusionEyebrow:'Síntese final',conclusionSecTitle:'A conclusão num só lugar',partLabel:'Parte',chaptersLabel:'capítulos',conclusionLabel:'Conclusão',closeArc:'Fechar o arco',noMatches:'Sem resultados',noMatchesHint:'Tenta outra pesquisa ou elimina o filtro atual.',noChapterSelected:'Nenhum capítulo selecionado',nothingMatches:'Nada corresponde a este filtro',useSearch:'Usa a pesquisa ou os filtros por parte para mostrar capítulos.',whyItMatters:'Porque é importante',theoryDeepDive:'Fundamento teórico',putIntoPractice:'Põe em prática',chapterTakeaways:'Ideias-chave',previous:'Anterior',next:'Seguinte',seeAppendices:'Ver apêndices',focusThisPart:'Focar nesta parte',coreSynthesis:'Síntese central',partsLabel:'partes',appendicesNum:'apêndices',adaptiveRange:'alcance adaptativo',toolsLabel:'ferramentas',footerText:'Workshop de Liderança · O Líder Adaptativo — um guia, não um rótulo.',keyModels:'Modelos-chave',colourAngle:'As quatro cores',leaderInAction:'Líder em ação',watchOut:'Atenção a',btnSelfAssess:'Autoavaliação',saEyebrow:'Autoavaliação',saTitle:'Autoavaliação de Cores',saLede:'Descobre o teu equilíbrio de cores e obtém recomendações personalizadas para a autoconsciência, controlo emocional e influência.',saNotice:'Avalia quão bem cada afirmação descreve o teu comportamento natural — as cores estão ocultas até revelares o teu perfil.',laEyebrow:'Avaliação de competências',laTitle:'Avaliação de Competências de Liderança',laLede:'Avalia-te nos 17 temas de liderança e obtém um conjunto priorizado de recomendações para melhorar.',laNotice:'Responde com honestidade sobre como lideras hoje, não como aspiras — as tuas áreas mais fracas tornam-se o teu plano de ação.',btnLeadership:'Avaliar competências',navAbout:'Sobre',aboutTitle:'Sobre este guia',aboutBody1:'O Líder Adaptativo consolida os temas cruciais para o desenvolvimento profissional das tuas competências de liderança — da autoconsciência e inteligência emocional à comunicação, construção de equipa, tomada de decisão, coaching e liderança entre culturas.',aboutBody2:'Não pretende substituir o livro nem a leitura aprofundada que o sustenta. É um guia — uma forma rápida e estruturada de rever as ideias, avaliares-te e pô-las em prática.',aboutCreditsLabel:'Créditos',aboutPowered:'Esta aplicação é desenvolvida por <strong>Leandro</strong>.',axAtBest:'No seu melhor:',axUnderStress:'Sob pressão:',axToInfluence:'Para influenciar:',axDo:'&#10003; Fazer',axAvoid:'&#10007; Evitar',axDaily:'Diário',axWeekly:'Semanal',axMonthly:'Mensal',axCatColour:'Cores e comportamento',axCatSelf:'Autoconsciência e IE',axCatComms:'Comunicação e influência',axCatTeams:'Equipas e desempenho'},
};
// ── BOOK CONTENT ─────────────────────────────────────────────────────
const LANG_BOOK={
en:{
  arc:[
    {title:'Anchor the reader',text:'A clear hierarchy, persistent navigation, and a stable chapter detail pane keep the experience easy to orient.'},
    {title:'Create rhythm',text:'Repeating card patterns, consistent section spacing, and grouped navigation make the book easy to scan.'},
    {title:'Protect clarity',text:'The palette stays restrained, typography carries the tone, and copy remains direct rather than decorative.'},
  ],
  parts:[
    {key:'I',  title:'Know Yourself',        focus:'Self-awareness and the language of colour',       outcome:'Recognise your default leadership style and how it shifts under pressure.'},
    {key:'II', title:'Master Your Emotions', focus:'Emotional intelligence and regulation',            outcome:'Notice and manage emotion in high-stakes moments.'},
    {key:'III',title:'Adapt to Others',      focus:'Communication, influence, and presence',          outcome:'Flex your style to influence, handle conflict, and land a message.'},
    {key:'IV', title:'Build the Team',       focus:'Trust, safety, rhythm, accountability',           outcome:'Create the conditions in which a team reliably performs.'},
    {key:'V',  title:'Decide & Grow',        focus:'Goals, decisions, coaching, culture',             outcome:'Set sharp goals, decide well under ambiguity, and grow your people.'},
  ],
  appendices:[
    {title:'Appendix A: The Colour Pocket Guide',           text:'A quick-reference companion for the four colours and their defaults.'},
    {title:'Appendix B: How to Communicate With Each Colour',text:'A communication cheat sheet for adapting tone, pace, and evidence.'},
    {title:"Appendix C: The Leader's Practice",             text:'A practice-oriented section for turning the framework into habits.'},
    {title:'Appendix D: Further Reading',                   text:'The research trail behind the models used throughout the book.'},
  ],
  conclusion:{
    title:'The Adaptive Leader',
    summary:'Leadership is not a fixed identity but a practised range: read yourself, read the person in front of you, and adapt how you show up so your intent lands.',
    synthesis:['Self-awareness gives you the map of your defaults and triggers.','Emotional intelligence lets you regulate yourself and meet others well.','Adaptation, team systems, decisions, coaching, and culture extend that range into the real work of leading people.'],
  },
  chapters:[
    {number:1,part:'I',title:'From Expert to Leader',
     summary:'The hardest promotion changes the meaning of good work: your value shifts from personal output to the output of the team you lead.',
     theme:'The transition from contributor to leader is a change of craft, not a simple promotion.',
     theory:"The leadership pipeline: each transition demands new skills, new time horizons, and new values — especially learning to value others' success as much as your own.",
     practice:'Name the three activities that made you successful as an individual contributor, then identify one task you should stop doing yourself and give away this week.',
     takeaways:["Your output becomes your team's output, not your personal work.",'The instincts that made you excellent can become liabilities when scaled across a team.','Leadership requires clarity, influence, composure, operational discipline, and presence.']},
    {number:2,part:'I',title:'The Four Colours: A Shared Language for Behaviour',
     summary:'Four colours — Red, Yellow, Green, and Blue — describe how people prefer to communicate, decide, and work in a way you can recall in the moment.',
     theme:'The model is a mirror and translator, not a label.',
     theory:'DISC and related four-quadrant models: Red maps to Dominance, Yellow to Influence, Green to Steadiness, and Blue to Conscientiousness.',
     practice:'Place yourself on the outgoing/reserved and task/people axes, name your dominant and secondary colour, and identify the colour diagonally opposite yours.',
     takeaways:['Two simple axes place almost anyone into one of four styles.','Each colour has a strength and a shadow under stress.','High-performing teams need all four preferences.']},
    {number:3,part:'I',title:'Leadership Self-Awareness',
     summary:'Self-awareness is the foundation of adaptive leadership because you cannot regulate, adapt, or flex a behaviour you cannot see.',
     theme:'What matters most is how you behave under pressure, not on a good day.',
     theory:"The Johari Window, Goleman's emotional intelligence model, and Tasha Eurich's work on the self-awareness gap all point to the same blind spot problem.",
     practice:'Review three recent moments you regretted, write down the trigger and the impact, then ask one trusted person what you do when stressed.',
     takeaways:['Behaviour under pressure is what the team remembers.','Triggers create the gap between stimulus and response.','External feedback is essential to shrink the blind spot.']},
    {number:4,part:'II',title:'Emotional Intelligence for Leaders',
     summary:'Emotional intelligence is the leadership mechanism that builds trust, defuses conflict, and lets hard messages land without breaking the relationship.',
     theme:'Leaders work through people, and people are not rational machines.',
     theory:"Goleman's model centres self-awareness, self-regulation, empathy, and social skill as the capabilities that matter most in leadership roles.",
     practice:'Name one positive and one negative emotional signal you saw in your last hard meeting, then write how you responded or should have responded.',
     takeaways:['Emotion is a core part of leadership, not a soft extra.','Leaders must read the emotional layer of the room.','Trust and hard decisions depend on emotional skill.']},
    {number:5,part:'II',title:'Self-Regulation: Composure Under Pressure',
     summary:'Composure is the visible form of leadership: when the news is bad, people watch the leader for the emotional tone before they watch for the answer.',
     theme:'Staying deliberate signals that the situation is survivable and thinking is still possible.',
     theory:'Self-regulation is built from practised tactics rather than personality: pause, reframe, breathe, and choose the smallest deliberate response that keeps the room steady.',
     practice:'Build a composure kit: the cues, phrases, and physical resets that help you stay deliberate when tension spikes.',
     takeaways:['A calm leader creates more problem-solving capacity in the team.','The goal is to choose a response instead of firing off a reaction.','Composure can be practised on purpose.']},
    {number:6,part:'II',title:'Empathy as a Leadership Skill',
     summary:'Real empathy is disciplined understanding: enough perspective to lead someone well, not softness or agreement for its own sake.',
     theme:'Empathy and high standards are compatible, and often inseparable.',
     theory:'Empathy lets leaders understand how a decision will land, which is why difficult calls are accepted more readily from leaders who understand the person in front of them.',
     practice:'Listen to someone to understand rather than to answer; reflect back what you heard before you solve anything.',
     takeaways:['Empathy is not the absence of hard calls.','Understanding another person improves leadership quality.','People accept difficult decisions more readily when they feel understood.']},
    {number:7,part:'III',title:'Adaptive Leadership: Flexing Your Style',
     summary:'Adaptive leadership asks whether you are flexing to the person in front of you or expecting them to adjust to your default style.',
     theme:'Influence, conflict, and feedback all change shape by colour.',
     theory:'Situational Leadership, the Platinum Rule, and Thomas–Kilmann conflict modes reinforce the same idea: effective leaders adapt the approach to the person and the moment.',
     practice:'Rewrite a real message in the colour of one person you need to influence, and notice your own conflict signature the next time friction rises.',
     takeaways:['Flexing is translation, not faking.','Each colour hears influence, conflict, and feedback differently.','A leader adapts the delivery without changing the intent.']},
    {number:8,part:'III',title:'Influence Without Authority',
     summary:'Most leadership outcomes depend on people you do not control, so influence becomes the durable alternative to positional power.',
     theme:'Power that has to be repeated loudly is usually not real influence.',
     theory:'Influence is built through trust, reciprocity, clarity, and timing — not through escalation or title alone.',
     practice:"Sharpen one ask by clarifying the outcome, the reason it matters, and what success looks like from the other person's perspective.",
     takeaways:['Authority is limited; influence is repeatable.','Escalating everything trains people to ignore you.','Good influence is specific, relational, and outcome-focused.']},
    {number:9,part:'III',title:'Navigating Difficult Conversations',
     summary:'Avoidance compounds problems, so the goal of a difficult conversation is to create movement while keeping the relationship intact.',
     theme:'Silence is itself a message.',
     theory:'Frameworks for hard conversations turn conflict into a sequence you can prepare: name the issue, stay factual, surface impact, and move toward agreement or next steps.',
     practice:'Prepare one conversation you have been postponing by writing the factual issue, the impact, and the one result you want to achieve.',
     takeaways:['The problem does not go away while you wait.','Avoidance tells people the issue is either unimportant or unsafe.','Strong leaders keep the relationship and address the issue.']},
    {number:10,part:'III',title:'Executive Communication & Presence',
     summary:'Presence is the ability to make the same idea land as leadership rather than noise, by being capable, credible, and trustworthy in how you show up.',
     theme:'Presence is practical, not mystical.',
     theory:'The 7-38-55 caveat and wider presence research show that delivery, confidence, and clarity shape whether the room believes the message.',
     practice:'Land one real message by tightening the point, removing filler, and aligning your tone to the outcome you want.',
     takeaways:['Presence changes how the message is received.','The delivery matters as much as the content.','Executive communication can be built deliberately.']},
    {number:11,part:'IV',title:'The Four Pillars of a High-Performance Team',
     summary:'High performance is a team property, not just a collection of strong individuals, and it depends on the conditions a leader creates on purpose.',
     theme:'Great teams are built from shared goals, trust, accountability, and operating rhythm.',
     theory:'Research on team effectiveness repeatedly points to the same pillars: shared purpose, clarity, safety, accountability, and the systems that make work visible.',
     practice:'Diagnose your team against the four pillars and name the one condition that is weakest right now.',
     takeaways:['Great teams are engineered, not assumed.','Talent alone does not guarantee performance.','The leader shapes the environment that performance grows in.']},
    {number:12,part:'IV',title:'Trust & Psychological Safety',
     summary:'Psychological safety means people can ask, disagree, admit mistakes, and raise bad news without being punished or humiliated.',
     theme:'Safety is the foundation that lets teams learn and improve.',
     theory:'Psychological safety is not niceness; it is the shared belief that interpersonal risk is possible without social cost.',
     practice:'Open the team up by inviting one honest concern, one question, and one disagreement in your next team conversation.',
     takeaways:['Safety does not mean lower standards.','Teams that cannot speak honestly cannot catch their own errors.','Trust and safety are preconditions for learning.']},
    {number:13,part:'IV',title:'Operating Rhythm & Accountability',
     summary:'A predictable operating rhythm replaces anxious status-chasing with calm visibility, keeping the work moving without the leader chasing every update.',
     theme:'Rhythm is the skeleton of a team.',
     theory:'Rituals and cadences create shared checkpoints for review, decision-making, and reflection so work stays visible and accountable.',
     practice:'Tune one ritual so it has a clearer purpose, a tighter agenda, or a cleaner decision rule.',
     takeaways:['Rhythm makes progress visible.','Bad rhythm becomes meeting overload.','Accountability needs cadence, not just intent.']},
    {number:14,part:'V',title:'Setting Goals That Drive Outcomes',
     summary:'Vague goals create motion without progress, so a leader must set goals specific enough to own, track, and finish.',
     theme:'Goals are decisions about where effort should go.',
     theory:'Clear goals connect action to outcomes by naming the result, the boundary, and the evidence that the work is done.',
     practice:'Sharpen one goal by rewriting it so the outcome, owner, and success measure are explicit.',
     takeaways:['Activity is not the same as progress.','A goal without clarity wastes effort downstream.','Good goals are ownable and measurable.']},
    {number:15,part:'V',title:'Decision Discipline Under Ambiguity',
     summary:'Leaders are paid to decide under incomplete information, and the job is to avoid both over-deliberation and reckless speed.',
     theme:'Decision discipline is a repeatable way to decide well at the right speed.',
     theory:'One-way and two-way doors, the 70% rule, pre-mortems, and disagree-and-commit give leaders a practical decision toolkit.',
     practice:'Pressure-test one live decision by classifying it, naming the assumptions, and running a quick pre-mortem before you commit.',
     takeaways:['Irreversible decisions deserve more care.','Reversible decisions should move faster.','A pre-mortem surfaces risks before they become real.']},
    {number:16,part:'V',title:'Coaching & Mentoring',
     summary:'Mentoring shares the path, coaching reveals the path within, and good leaders move fluidly between both depending on what the person needs.',
     theme:'Growing others is the multiplier that makes leadership scale.',
     theory:'The coaching mindset uses GROW, powerful questions, awareness, and responsibility to draw out ownership rather than hand over answers.',
     practice:'Before your next development conversation, diagnose whether the person needs mentoring or coaching, then ask two open questions if it is a coaching moment.',
     takeaways:['Mentoring gives experience; coaching draws out capability.','The right mode depends on the diagnosis, not preference.','Growth becomes a core part of leadership work.']},
    {number:17,part:'V',title:'Leading Across Cultures',
     summary:'Culture sets the baseline for what feels normal, and colour describes the individual against that baseline, so leaders need to read both.',
     theme:'Modern leadership requires cultural fluency, not a single home-culture default.',
     theory:"Models such as the Culture Map and Hofstede's dimensions help leaders calibrate directness, feedback, disagreement, and pace across contexts.",
     practice:'Map the two dimensions where your team differs most, set an explicit team norm, and check for culture before assuming a personal trait.',
     takeaways:['Culture changes what normal looks like.','Flexing across cultures is translation, not self-betrayal.','Explicit norms matter most when teams are diverse.']},
    {number:18,part:'V',title:'The Culture Map: Reading the Eight Scales',
     summary:'Erin Meyer\'s eight scales turn vague cultural friction into concrete, comparable dimensions — so you can place any culture, and yourself, and calibrate on purpose instead of guessing.',
     theme:'Culture is relative, not absolute: what matters is the gap between where you sit and where the other person sits on each scale.',
     theory:'The Culture Map maps eight behavioural scales — communicating, evaluating, persuading, leading, deciding, trusting, disagreeing, and scheduling — each a spectrum on which cultures sit relative to one another.',
     practice:'Plot your team on the eight scales, mark where you personally sit on each, and take the scale with the widest gap — turn it into one explicit team norm this week.',
     takeaways:['Culture is relative: judge the gap between two positions, never an absolute.','The same behaviour can read as respectful in one culture and rude in another.','Naming the scale turns invisible friction into a difference you can discuss and fix.']},
  ],
},
es:{
  arc:[
    {title:'Anclar al lector',text:'Una jerarquía clara, una navegación persistente y un panel de detalle estable mantienen la experiencia fácil de orientar.'},
    {title:'Crear ritmo',text:'Patrones de tarjetas repetidos, espaciado uniforme y navegación agrupada hacen que el libro sea fácil de escanear.'},
    {title:'Proteger la claridad',text:'La paleta es sobria, la tipografía lleva el tono y el texto es directo, no decorativo.'},
  ],
  parts:[
    {key:'I',  title:'Conócete a ti mismo',   focus:'Autoconciencia y el lenguaje del color',       outcome:'Reconoce tu estilo de liderazgo predeterminado y cómo cambia bajo presión.'},
    {key:'II', title:'Domina tus emociones',  focus:'Inteligencia emocional y regulación',          outcome:'Observa y gestiona la emoción en momentos de alta tensión.'},
    {key:'III',title:'Adáptate a los demás',  focus:'Comunicación, influencia y presencia',         outcome:'Flexibiliza tu estilo para influir, gestionar conflictos y transmitir mensajes.'},
    {key:'IV', title:'Construye el equipo',   focus:'Confianza, seguridad, ritmo y responsabilidad',outcome:'Crea las condiciones para que el equipo rinda de forma sostenida.'},
    {key:'V',  title:'Decide y crece',        focus:'Objetivos, decisiones, coaching y cultura',    outcome:'Fija objetivos claros, decide bajo ambigüedad y desarrolla a tu gente.'},
  ],
  appendices:[
    {title:'Apéndice A: Guía rápida de colores',          text:'Una referencia rápida de los cuatro colores y sus comportamientos predeterminados.'},
    {title:'Apéndice B: Cómo comunicarse con cada color', text:'Una guía de comunicación para adaptar el tono, el ritmo y la evidencia.'},
    {title:'Apéndice C: La práctica del líder',           text:'Una sección orientada a convertir el marco en hábitos.'},
    {title:'Apéndice D: Lecturas adicionales',            text:'Las fuentes de investigación detrás de los modelos del libro.'},
  ],
  conclusion:{
    title:'El Líder Adaptativo',
    summary:'El liderazgo no es una identidad fija sino un rango practicado: léete a ti mismo, lee a la persona frente a ti y adapta cómo te presentas para que tu intención llegue.',
    synthesis:['La autoconciencia te da el mapa de tus valores predeterminados y disparadores.','La inteligencia emocional te permite regularte y relacionarte bien con los demás.','La adaptación, los sistemas de equipo, las decisiones, el coaching y la cultura extienden ese rango al trabajo real de liderar personas.'],
  },
  chapters:[
    {number:1,part:'I',title:'De experto a líder',
     summary:'El ascenso más difícil cambia el significado del buen trabajo: tu valor ya no es tu producción personal sino la producción del equipo que lideras.',
     theme:'La transición de colaborador a líder es un cambio de oficio, no una simple promoción.',
     theory:'El pipeline de liderazgo: cada transición exige nuevas habilidades, nuevos horizontes y nuevos valores; sobre todo, aprender a valorar el éxito de los demás tanto como el propio.',
     practice:'Nombra las tres actividades que te hicieron exitoso como colaborador e identifica una tarea que puedas delegar esta semana sin rescatar a quien la recibe.',
     takeaways:['Tu resultado es el resultado de tu equipo.','Los instintos que te hicieron brillar pueden sabotear tu liderazgo.','El liderazgo requiere claridad, influencia, compostura, disciplina operativa y presencia.']},
    {number:2,part:'I',title:'Los cuatro colores: un lenguaje común para el comportamiento',
     summary:'Cuatro colores —Rojo, Amarillo, Verde y Azul— describen cómo prefieren comunicarse, decidir y trabajar las personas de forma recordable en el momento.',
     theme:'El modelo es un espejo y un traductor, no una etiqueta.',
     theory:'DISC y modelos relacionados de cuatro cuadrantes: Rojo = Dominancia, Amarillo = Influencia, Verde = Estabilidad, Azul = Consciencia.',
     practice:'Ubícate en los ejes saliente/reservado y tarea/personas, nombra tu color dominante y secundario e identifica el color diagonalmente opuesto.',
     takeaways:['Dos ejes simples ubican a casi todos en uno de cuatro estilos.','Cada color tiene una fortaleza y una sombra bajo estrés.','Los equipos de alto rendimiento necesitan los cuatro estilos.']},
    {number:3,part:'I',title:'Autoconciencia del líder',
     summary:'La autoconciencia es el cimiento del liderazgo adaptativo porque no puedes regular, adaptar ni flexibilizar un comportamiento que no puedes ver.',
     theme:'Lo que más importa es cómo te comportas bajo presión, no en un buen día.',
     theory:'La ventana de Johari, el modelo de inteligencia emocional de Goleman y los estudios de Tasha Eurich sobre la brecha de autoconciencia señalan el mismo problema del punto ciego.',
     practice:'Recuerda tres momentos recientes que lamentaste en el trabajo, escribe el disparador y el impacto, y pregunta a una persona qué haces cuando estás estresado.',
     takeaways:['El comportamiento bajo presión es lo que el equipo recuerda.','Los disparadores crean la brecha entre el estímulo y la respuesta.','La retroalimentación externa es esencial para reducir el punto ciego.']},
    {number:4,part:'II',title:'Inteligencia emocional para líderes',
     summary:'La inteligencia emocional es el mecanismo de liderazgo que construye confianza, desactiva conflictos y permite que los mensajes difíciles lleguen sin romper la relación.',
     theme:'Los líderes trabajan a través de personas, y las personas no son máquinas racionales.',
     theory:'El modelo de Goleman centra la autoconciencia, la autorregulación, la empatía y la habilidad social como las capacidades más importantes en los roles de liderazgo.',
     practice:'Nombra una señal emocional positiva y una negativa que viste en tu última reunión difícil y escribe cómo respondiste o deberías haber respondido.',
     takeaways:['La emoción es parte central del liderazgo, no un complemento blando.','Los líderes deben leer la capa emocional de la sala.','La confianza y las decisiones difíciles dependen de la habilidad emocional.']},
    {number:5,part:'II',title:'Autorregulación: compostura bajo presión',
     summary:'La compostura es la forma visible del liderazgo: cuando las noticias son malas, la gente observa al líder para tomar el tono emocional antes que la respuesta.',
     theme:'Mantenerse deliberado señala que la situación es superable y que aún es posible pensar.',
     theory:'La autorregulación se construye con tácticas practicadas: pausar, reencuadrar, respirar y elegir la respuesta más pequeña y deliberada que mantiene la calma.',
     practice:'Crea tu kit de compostura: las señales, frases y reinicios físicos que te ayudan a mantenerte deliberado cuando la tensión aumenta.',
     takeaways:['Un líder tranquilo crea más capacidad para resolver problemas en el equipo.','El objetivo es elegir una respuesta en lugar de disparar una reacción.','La compostura se puede practicar a propósito.']},
    {number:6,part:'II',title:'La empatía como habilidad de liderazgo',
     summary:'La empatía real es comprensión disciplinada: suficiente perspectiva para liderar bien a alguien, no suavidad o acuerdo por sí mismo.',
     theme:'La empatía y los altos estándares son compatibles y, a menudo, inseparables.',
     theory:'La empatía permite a los líderes entender cómo aterrizará una decisión, por eso las decisiones difíciles son aceptadas más fácilmente por líderes que comprenden a la persona frente a ellos.',
     practice:'Escucha a alguien para entender, no para responder; refleja lo que escuchaste antes de resolver nada.',
     takeaways:['La empatía no es la ausencia de decisiones difíciles.','Comprender a otra persona mejora la calidad del liderazgo.','Las personas aceptan decisiones difíciles más fácilmente cuando se sienten comprendidas.']},
    {number:7,part:'III',title:'Liderazgo adaptativo: flexibiliza tu estilo',
     summary:'El liderazgo adaptativo pregunta si te estás adaptando a la persona frente a ti o esperando que se adapte a tu estilo predeterminado.',
     theme:'La influencia, el conflicto y la retroalimentación cambian de forma según el color.',
     theory:'El Liderazgo Situacional, la Regla de Platino y los modos de conflicto de Thomas–Kilmann refuerzan la misma idea: los líderes efectivos adaptan el enfoque a la persona y al momento.',
     practice:'Reescribe un mensaje real en el color de alguien a quien necesitas influir y observa tu propia firma de conflicto la próxima vez que surja fricción.',
     takeaways:['Flexibilizarse es traducir, no fingir.','Cada color escucha la influencia, el conflicto y la retroalimentación de manera diferente.','Un líder adapta la entrega sin cambiar la intención.']},
    {number:8,part:'III',title:'Influir sin autoridad',
     summary:'La mayoría de los resultados de liderazgo dependen de personas que no controlas, por lo que la influencia se convierte en la alternativa duradera al poder posicional.',
     theme:'El poder que hay que repetir en voz alta generalmente no es influencia real.',
     theory:'La influencia se construye a través de la confianza, la reciprocidad, la claridad y el timing, no a través de la escalada o el título.',
     practice:'Afina una solicitud aclarando el resultado, la razón por la que importa y qué significa el éxito desde la perspectiva de la otra persona.',
     takeaways:['La autoridad es limitada; la influencia es repetible.','Escalar todo entrena a las personas para ignorarte.','La buena influencia es específica, relacional y orientada a resultados.']},
    {number:9,part:'III',title:'Navegar conversaciones difíciles',
     summary:'Evitar los problemas los amplifica, por lo que el objetivo de una conversación difícil es crear movimiento mientras se mantiene intacta la relación.',
     theme:'El silencio es en sí mismo un mensaje.',
     theory:'Los marcos para conversaciones difíciles convierten el conflicto en una secuencia que puedes preparar: nombra el problema, mantente factual, expón el impacto y avanza hacia el acuerdo.',
     practice:'Prepara una conversación que hayas estado posponiendo escribiendo el problema factual, el impacto y el resultado que quieres lograr.',
     takeaways:['El problema no desaparece mientras esperas.','Evitar le dice a la gente que el problema no importa o no es seguro.','Los líderes fuertes mantienen la relación y abordan el problema.']},
    {number:10,part:'III',title:'Comunicación ejecutiva y presencia',
     summary:'La presencia es la capacidad de hacer que la misma idea llegue como liderazgo en lugar de ruido, siendo capaz, creíble y confiable en cómo te presentas.',
     theme:'La presencia es práctica, no mística.',
     theory:'La advertencia del 7-38-55 y la investigación más amplia sobre presencia muestran que la entrega, la confianza y la claridad determinan si la sala cree en el mensaje.',
     practice:'Aterriza un mensaje real ajustando el punto, eliminando el relleno y alineando tu tono con el resultado que deseas.',
     takeaways:['La presencia cambia cómo se recibe el mensaje.','La entrega importa tanto como el contenido.','La comunicación ejecutiva se puede construir deliberadamente.']},
    {number:11,part:'IV',title:'Los cuatro pilares de un equipo de alto rendimiento',
     summary:'El alto rendimiento es una propiedad del equipo, no solo una colección de individuos fuertes, y depende de las condiciones que el líder crea a propósito.',
     theme:'Los grandes equipos se construyen con metas compartidas, confianza, responsabilidad y ritmo operativo.',
     theory:'La investigación sobre la efectividad del equipo señala repetidamente los mismos pilares: propósito compartido, claridad, seguridad, responsabilidad y los sistemas que hacen visible el trabajo.',
     practice:'Diagnostica tu equipo en los cuatro pilares y nombra la condición más débil en este momento.',
     takeaways:['Los grandes equipos se diseñan, no se asumen.','El talento solo no garantiza el rendimiento.','El líder da forma al entorno donde crece el rendimiento.']},
    {number:12,part:'IV',title:'Confianza y seguridad psicológica',
     summary:'La seguridad psicológica significa que las personas pueden preguntar, discrepar, admitir errores y dar malas noticias sin ser castigadas ni humilladas.',
     theme:'La seguridad es el cimiento que permite a los equipos aprender y mejorar.',
     theory:'La seguridad psicológica no es amabilidad; es la creencia compartida de que el riesgo interpersonal es posible sin coste social.',
     practice:'Abre el equipo invitando una preocupación honesta, una pregunta y un desacuerdo en tu próxima conversación de equipo.',
     takeaways:['Seguridad no significa estándares más bajos.','Los equipos que no pueden hablar honestamente no pueden detectar sus propios errores.','La confianza y la seguridad son condiciones previas para el aprendizaje.']},
    {number:13,part:'IV',title:'Ritmo operativo y responsabilidad',
     summary:'Un ritmo operativo predecible reemplaza la angustiosa persecución de estados con visibilidad tranquila, manteniendo el trabajo en movimiento sin que el líder persiga cada actualización.',
     theme:'El ritmo es el esqueleto de un equipo.',
     theory:'Los rituales y las cadencias crean puntos de control compartidos para la revisión, la toma de decisiones y la reflexión, de modo que el trabajo sea visible y responsable.',
     practice:'Afina un ritual para que tenga un propósito más claro, una agenda más ajustada o una regla de decisión más limpia.',
     takeaways:['El ritmo hace visible el progreso.','El mal ritmo se convierte en sobrecarga de reuniones.','La responsabilidad necesita cadencia, no solo intención.']},
    {number:14,part:'V',title:'Establecer objetivos que generen resultados',
     summary:'Los objetivos vagos crean movimiento sin progreso, por lo que un líder debe establecer objetivos lo suficientemente específicos como para ser propios, rastreables y terminables.',
     theme:'Los objetivos son decisiones sobre dónde debe ir el esfuerzo.',
     theory:'Los objetivos claros conectan la acción con los resultados nombrando el resultado, el límite y la evidencia de que el trabajo está hecho.',
     practice:'Afina un objetivo reescribiéndolo para que el resultado, el propietario y la medida de éxito sean explícitos.',
     takeaways:['La actividad no es lo mismo que el progreso.','Un objetivo sin claridad desperdicia el esfuerzo aguas abajo.','Los buenos objetivos son propietarios y medibles.']},
    {number:15,part:'V',title:'Disciplina de decisión bajo ambigüedad',
     summary:'Los líderes están pagados para decidir con información incompleta, y el trabajo es evitar tanto la deliberación excesiva como la velocidad imprudente.',
     theme:'La disciplina de decisión es una forma repetible de decidir bien a la velocidad correcta.',
     theory:'Las puertas de un solo y dos sentidos, la regla del 70%, los pre-mortems y el desacuerdo y compromiso dan a los líderes un kit de herramientas práctico.',
     practice:'Pon a prueba de presión una decisión real clasificándola, nombrando los supuestos y ejecutando un pre-mortem rápido antes de comprometerte.',
     takeaways:['Las decisiones irreversibles merecen más cuidado.','Las decisiones reversibles deben moverse más rápido.','Un pre-mortem descubre riesgos antes de que se vuelvan reales.']},
    {number:16,part:'V',title:'Coaching y mentoría',
     summary:'La mentoría comparte el camino, el coaching revela el camino interior, y los buenos líderes se mueven fluidamente entre ambos según lo que la persona necesita.',
     theme:'Desarrollar a otros es el multiplicador que hace escalar el liderazgo.',
     theory:'La mentalidad de coaching utiliza GROW, preguntas poderosas, conciencia y responsabilidad para sacar la propiedad en lugar de entregar respuestas.',
     practice:'Antes de tu próxima conversación de desarrollo, diagnostica si la persona necesita mentoría o coaching, luego haz dos preguntas abiertas si es un momento de coaching.',
     takeaways:['La mentoría da experiencia; el coaching desarrolla capacidad.','El modo correcto depende del diagnóstico, no de la preferencia.','El crecimiento se convierte en una parte central del trabajo de liderazgo.']},
    {number:17,part:'V',title:'Liderar en contextos multiculturales',
     summary:'La cultura establece la línea base de lo que parece normal, y el color describe al individuo frente a esa línea base, por lo que los líderes necesitan leer ambos.',
     theme:'El liderazgo moderno requiere fluidez cultural, no un valor predeterminado de cultura local.',
     theory:'Modelos como el Mapa de Cultura de Erin Meyer y las dimensiones de Hofstede ayudan a los líderes a calibrar la franqueza, la retroalimentación, el desacuerdo y el ritmo en diferentes contextos.',
     practice:'Mapea las dos dimensiones donde tu equipo difiere más, establece una norma explícita de equipo y verifica la cultura antes de asumir un rasgo personal.',
     takeaways:['La cultura cambia lo que parece normal.','Adaptarse entre culturas es traducir, no traicionarse.','Las normas explícitas importan más cuando los equipos son diversos.']},
    {number:18,part:'V',title:'El Mapa de Cultura: leer las ocho escalas',
     summary:'Las ocho escalas de Erin Meyer convierten la vaga fricción cultural en dimensiones concretas y comparables — para que puedas situar cualquier cultura, y a ti mismo, y calibrar a propósito en lugar de adivinar.',
     theme:'La cultura es relativa, no absoluta: lo que importa es la distancia entre dónde te sitúas tú y dónde se sitúa la otra persona en cada escala.',
     theory:'El Mapa de Cultura traza ocho escalas de comportamiento — comunicar, evaluar, persuadir, liderar, decidir, confiar, discrepar y planificar el tiempo — cada una un espectro en el que las culturas se sitúan unas respecto a otras.',
     practice:'Sitúa a tu equipo en las ocho escalas, marca dónde te sitúas tú en cada una, y toma la escala con mayor distancia — conviértela en una norma explícita de equipo esta semana.',
     takeaways:['La cultura es relativa: juzga la distancia entre dos posiciones, nunca un absoluto.','El mismo comportamiento puede leerse como respetuoso en una cultura y grosero en otra.','Nombrar la escala convierte la fricción invisible en una diferencia que puedes discutir y resolver.']},
  ],
},
};

// ── CHAPTER TITLE / PART OVERRIDES (IT, FR, AR, DE, ZH, JA, KO) ─────
const OVERRIDES={
  it:{
    parts:[
      {key:'I',  title:'Conosci te stesso',              focus:'Autoconsapevolezza e il linguaggio dei colori',   outcome:'Riconosci il tuo stile di leadership predefinito e come cambia sotto pressione.'},
      {key:'II', title:'Padroneggia le tue emozioni',    focus:'Intelligenza emotiva e regolazione',              outcome:'Osserva e gestisci le emozioni nei momenti ad alta posta.'},
      {key:'III',title:'Adattati agli altri',            focus:'Comunicazione, influenza e presenza',             outcome:'Flessibilizza il tuo stile per influenzare, gestire conflitti e trasmettere messaggi.'},
      {key:'IV', title:'Costruisci il team',             focus:'Fiducia, sicurezza, ritmo e responsabilità',      outcome:'Crea le condizioni affinché il team lavori in modo affidabile.'},
      {key:'V',  title:'Decidi e cresci',                focus:'Obiettivi, decisioni, coaching e cultura',        outcome:"Definisci obiettivi chiari, decidi bene nell'ambiguità e sviluppa le persone."},
    ],
    chapterTitles:['Da esperto a leader','I quattro colori: un linguaggio condiviso per il comportamento','Autoconsapevolezza del leader','Intelligenza emotiva per i leader','Autoregolazione: compostezza sotto pressione','L\'empatia come abilità di leadership','Leadership adattiva: flessibilizza il tuo stile','Influenzare senza autorità','Navigare le conversazioni difficili','Comunicazione esecutiva e presenza','I quattro pilastri di un team ad alte prestazioni','Fiducia e sicurezza psicologica','Ritmo operativo e responsabilità','Stabilire obiettivi che generino risultati','Disciplina decisionale nell\'ambiguità','Coaching e mentoring','Guidare in contesti multiculturali','La Culture Map: leggere le otto scale'],
    arc:[{title:'Ancorare il lettore',text:'Una gerarchia chiara, una navigazione persistente e un pannello stabile mantengono l\'esperienza facile da orientare.'},{title:'Creare ritmo',text:'Schemi di carte ripetuti e spaziatura uniforme rendono il libro facile da scorrere.'},{title:'Proteggere la chiarezza',text:'La palette rimane sobria, la tipografia porta il tono e il testo è diretto.'}],
    appendices:[{title:'Appendice A: Guida rapida ai colori',text:'Un riferimento rapido ai quattro colori e ai loro comportamenti predefiniti.'},{title:'Appendice B: Come comunicare con ogni colore',text:'Una guida di comunicazione per adattare tono, ritmo ed evidenza.'},{title:"Appendice C: La pratica del leader",text:'Una sezione orientata a trasformare il framework in abitudini.'},{title:'Appendice D: Letture consigliate',text:'Il percorso di ricerca dietro i modelli del libro.'}],
    conclusion:{title:'Il Leader Adattivo',summary:"La leadership non è un'identità fissa ma un raggio d'azione praticato: leggi te stesso, leggi la persona di fronte a te e adatta come ti presenti.",synthesis:['La consapevolezza di sé ti dà la mappa dei tuoi default e trigger.','L\'intelligenza emotiva ti permette di regolarti e relazionarti bene.','Adattamento, sistemi di team, decisioni, coaching e cultura estendono quel raggio al lavoro reale.']},
  },
  fr:{
    parts:[
      {key:'I',  title:'Connais-toi toi-même',           focus:'Conscience de soi et le langage des couleurs',    outcome:'Reconnais ton style de leadership par défaut et comment il évolue sous pression.'},
      {key:'II', title:'Maîtrise tes émotions',          focus:'Intelligence émotionnelle et régulation',         outcome:'Observe et gère les émotions dans les moments à forts enjeux.'},
      {key:'III',title:'Adapte-toi aux autres',          focus:'Communication, influence et présence',            outcome:'Assouplis ton style pour influencer, gérer les conflits et faire passer ton message.'},
      {key:'IV', title:"Construis l'équipe",             focus:'Confiance, sécurité, rythme et responsabilité',  outcome:"Crée les conditions pour que l'équipe performe durablement."},
      {key:'V',  title:'Décide et grandis',              focus:'Objectifs, décisions, coaching et culture',       outcome:"Fixe des objectifs précis, décide bien dans l'ambiguïté et développe tes collaborateurs."},
    ],
    chapterTitles:["De l'expert au leader","Les quatre couleurs : un langage commun pour les comportements","Conscience de soi du leader","Intelligence émotionnelle pour les leaders","Autorégulation : calme sous pression","L'empathie comme compétence de leadership","Leadership adaptatif : assouplir son style","Influencer sans autorité","Naviguer les conversations difficiles","Communication exécutive et présence","Les quatre piliers d'une équipe haute performance","Confiance et sécurité psychologique","Rythme opérationnel et responsabilité","Définir des objectifs qui génèrent des résultats","Discipline de décision dans l'ambiguïté","Coaching et mentorat","Manager dans des contextes multiculturels","La Culture Map : lire les huit échelles"],
    arc:[{title:'Ancrer le lecteur',text:'Une hiérarchie claire, une navigation persistante et un panneau stable maintiennent l\'expérience facile à orienter.'},{title:'Créer du rythme',text:'Des schémas de cartes répétés et un espacement uniforme rendent le livre facile à parcourir.'},{title:'Protéger la clarté',text:'La palette reste sobre, la typographie porte le ton et le texte est direct.'}],
    appendices:[{title:'Annexe A : Guide rapide des couleurs',text:'Un aide-mémoire des quatre couleurs et de leurs comportements par défaut.'},{title:'Annexe B : Comment communiquer avec chaque couleur',text:'Un guide de communication pour adapter le ton, le rythme et les preuves.'},{title:"Annexe C : La pratique du leader",text:'Une section orientée pratique pour transformer le cadre en habitudes.'},{title:'Annexe D : Lectures complémentaires',text:'Le parcours de recherche derrière les modèles du livre.'}],
    conclusion:{title:'Le Leader Adaptatif',summary:"Le leadership n'est pas une identité fixe mais une gamme pratiquée : lis-toi toi-même, lis la personne en face de toi, et adapte comment tu te présentes.",synthesis:['La conscience de soi te donne la carte de tes defaults et déclencheurs.',"L'intelligence émotionnelle te permet de te réguler et de bien rencontrer les autres.",'Adaptation, systèmes d\'équipe, décisions, coaching et culture étendent cette gamme au travail réel.']},
  },
  ar:{
    parts:[
      {key:'I',  title:'اعرف نفسك',            focus:'الوعي الذاتي ولغة الألوان',          outcome:'تعرّف على أسلوبك القيادي الافتراضي وكيف يتغير تحت الضغط.'},
      {key:'II', title:'أتقن عواطفك',          focus:'الذكاء العاطفي والتنظيم',             outcome:'لاحظ العاطفة وأدِرها في اللحظات عالية المخاطر.'},
      {key:'III',title:'تكيّف مع الآخرين',     focus:'التواصل والتأثير والحضور',            outcome:'مرّن أسلوبك للتأثير وإدارة النزاعات وإيصال الرسائل.'},
      {key:'IV', title:'ابنِ الفريق',           focus:'الثقة والأمان والإيقاع والمساءلة',   outcome:'أنشئ الظروف التي يؤدي فيها الفريق أداءً موثوقاً.'},
      {key:'V',  title:'قرّر وانمُ',            focus:'الأهداف والقرارات والتدريب والثقافة',outcome:'ضع أهدافاً محددة وقرّر جيداً في الغموض وطوّر موظفيك.'},
    ],
    chapterTitles:['من الخبير إلى القائد','الألوان الأربعة: لغة مشتركة للسلوك','الوعي الذاتي للقائد','الذكاء العاطفي للقادة','ضبط النفس: الرباطة تحت الضغط','التعاطف كمهارة قيادية','القيادة التكيفية: مرونة الأسلوب','التأثير بدون صلاحية','إدارة المحادثات الصعبة','التواصل التنفيذي والحضور','الركائز الأربع لفريق عالي الأداء','الثقة والسلامة النفسية','الإيقاع التشغيلي والمساءلة','وضع أهداف تحقق النتائج','انضباط القرار في ظل الغموض','التدريب والإرشاد','القيادة عبر الثقافات','خريطة الثقافة: قراءة المقاييس الثمانية'],
    arc:[{title:'تثبيت القارئ',text:'هيكل واضح وتنقل مستمر ولوحة فصل ثابتة تجعل التجربة سهلة التوجه.'},{title:'إنشاء الإيقاع',text:'أنماط البطاقات المتكررة والتباعد المنتظم يجعلان الكتاب سهل المسح.'},{title:'حماية الوضوح',text:'تظل لوحة الألوان مضبوطة والطباعة تحمل النبرة والنص مباشر.'}],
    appendices:[{title:'الملحق أ: دليل الألوان السريع',text:'مرجع سريع للألوان الأربعة وسلوكياتها الافتراضية.'},{title:'الملحق ب: كيفية التواصل مع كل لون',text:'دليل تواصل لتكييف النبرة والإيقاع والأدلة.'},{title:'الملحق ج: ممارسة القائد',text:'قسم موجه للتطبيق لتحويل الإطار إلى عادات.'},{title:'الملحق د: قراءات إضافية',text:'المسار البحثي وراء النماذج المستخدمة في الكتاب.'}],
    conclusion:{title:'القائد التكيّفي',summary:'القيادة ليست هوية ثابتة بل نطاق متدرّب: اقرأ نفسك واقرأ الشخص أمامك وكيّف كيفية ظهورك حتى تصل نيتك.',synthesis:['يمنحك الوعي الذاتي خريطة نمطك الافتراضي ومحفزاتك.','يتيح لك الذكاء العاطفي تنظيم نفسك ومقابلة الآخرين بشكل جيد.','تمتد القيادة التكيفية وأنظمة الفريق والقرارات والتدريب والثقافة إلى العمل الحقيقي لقيادة الناس.']},
  },
  de:{
    parts:[
      {key:'I',  title:'Kenne dich selbst',              focus:'Selbstwahrnehmung und die Sprache der Farben',     outcome:'Erkenne deinen Standard-Führungsstil und wie er sich unter Druck verändert.'},
      {key:'II', title:'Beherrsche deine Emotionen',     focus:'Emotionale Intelligenz und Regulierung',           outcome:'Nimm Emotionen wahr und manage sie in kritischen Momenten.'},
      {key:'III',title:'Passe dich anderen an',          focus:'Kommunikation, Einfluss und Präsenz',              outcome:'Flexibilisiere deinen Stil, um zu beeinflussen, Konflikte zu managen und Botschaften zu landen.'},
      {key:'IV', title:'Baue das Team auf',              focus:'Vertrauen, Sicherheit, Rhythmus und Verantwortung',outcome:'Schaffe die Bedingungen, unter denen ein Team zuverlässig performt.'},
      {key:'V',  title:'Entscheide und wachse',          focus:'Ziele, Entscheidungen, Coaching und Kultur',       outcome:'Setze klare Ziele, entscheide gut unter Unsicherheit und entwickle deine Mitarbeiter.'},
    ],
    chapterTitles:['Vom Experten zur Führungskraft','Die vier Farben: Eine gemeinsame Sprache für Verhalten','Selbstwahrnehmung als Führungskraft','Emotionale Intelligenz für Führungskräfte','Selbstregulierung: Fassung unter Druck','Empathie als Führungskompetenz','Adaptive Führung: Den eigenen Stil flexibilisieren','Einfluss ohne Autorität','Schwierige Gespräche navigieren','Executive Communication und Präsenz','Die vier Säulen eines Hochleistungsteams','Vertrauen und psychologische Sicherheit','Betriebsrhythmus und Verantwortlichkeit','Ziele setzen, die Ergebnisse liefern','Entscheidungsdisziplin unter Ambiguität','Coaching und Mentoring','Führung in interkulturellen Kontexten','Die Culture Map: die acht Skalen lesen'],
    arc:[{title:'Den Leser verankern',text:'Eine klare Hierarchie, persistente Navigation und ein stabiles Kapiteldetail halten die Erfahrung leicht orientierbar.'},{title:'Rhythmus schaffen',text:'Wiederholende Kartenmuster und einheitlicher Abstand machen das Buch leicht zu scannen.'},{title:'Klarheit schützen',text:'Die Palette bleibt zurückhaltend, Typografie trägt den Ton und Text bleibt direkt.'}],
    appendices:[{title:'Anhang A: Die Farb-Kurzreferenz',text:'Eine Schnellreferenz für die vier Farben und ihre Standardverhalten.'},{title:'Anhang B: Wie man mit jeder Farbe kommuniziert',text:'Ein Kommunikations-Spickzettel zur Anpassung von Ton, Tempo und Beweisen.'},{title:"Anhang C: Die Führungspraxis",text:'Ein praxisorientierter Abschnitt zur Umwandlung des Rahmens in Gewohnheiten.'},{title:'Anhang D: Weiterführende Literatur',text:'Der Forschungspfad hinter den im Buch verwendeten Modellen.'}],
    conclusion:{title:'Der Adaptive Leader',summary:'Führung ist keine feste Identität, sondern eine geübte Bandbreite: Lies dich selbst, lies die Person vor dir und passe an, wie du auftrittst.',synthesis:['Selbstwahrnehmung gibt dir die Karte deiner Standards und Auslöser.','Emotionale Intelligenz ermöglicht dir, dich zu regulieren und andere gut zu treffen.','Anpassung, Teamsysteme, Entscheidungen, Coaching und Kultur erweitern diese Bandbreite.']},
  },
  zh:{
    parts:[
      {key:'I',  title:'了解自己',   focus:'自我意识与颜色语言', outcome:'识别你默认的领导风格及其在压力下的变化。'},
      {key:'II', title:'掌控情绪',   focus:'情商与情绪调节',     outcome:'在高风险时刻觉察并管理情绪。'},
      {key:'III',title:'适应他人',   focus:'沟通、影响力与存在感',outcome:'灵活调整风格以施加影响、处理冲突并传递信息。'},
      {key:'IV', title:'打造团队',   focus:'信任、安全感、节奏与责任',outcome:'创造团队持续高绩效所需的条件。'},
      {key:'V',  title:'决策与成长', focus:'目标、决策、辅导与文化',outcome:'设定清晰目标，在模糊中做出明智决策，培养你的团队。'},
    ],
    chapterTitles:['从专家到领导者','四种颜色：行为的共同语言','领导者的自我意识','领导者的情商','自我调节：压力下的沉着','同理心作为领导技能','适应性领导：灵活运用风格','无权威的影响力','驾驭困难对话','高管沟通与个人影响力','高绩效团队的四大支柱','信任与心理安全','运营节奏与责任担当','设定驱动成果的目标','模糊环境下的决策纪律','辅导与指导','跨文化领导','文化地图：解读八大标尺'],
    arc:[{title:'锚定读者',text:'清晰的层次结构、持久的导航和稳定的章节详情面板使体验易于定位。'},{title:'创建节奏',text:'重复的卡片模式和一致的间距使书籍易于浏览。'},{title:'保护清晰度',text:'调色板保持克制，字体承载语气，文字直接而非装饰性。'}],
    appendices:[{title:'附录A：颜色速查手册',text:'四种颜色及其默认行为的快速参考手册。'},{title:'附录B：如何与每种颜色沟通',text:'适应语气、节奏和证据的沟通备忘单。'},{title:'附录C：领导者的实践',text:'将框架转化为习惯的实践导向部分。'},{title:'附录D：延伸阅读',text:'书中使用模型背后的研究路径。'}],
    conclusion:{title:'适应型领导者',summary:'领导力不是固定的身份，而是一种习得的范围：了解自己，了解面前的人，调整自己的呈现方式，让意图真正落地。',synthesis:['自我意识为你提供默认值和触发器的地图。','情商让你能够调节自己并与他人良好互动。','适应性、团队系统、决策、辅导和文化将这一范围延伸到真实的领导工作中。']},
  },
  ja:{
    parts:[
      {key:'I',  title:'自己を知る',               focus:'自己認識と色の言語',                outcome:'デフォルトのリーダーシップスタイルと、プレッシャー下での変化を認識する。'},
      {key:'II', title:'感情をコントロールする',    focus:'感情的知性と感情調節',              outcome:'ハイリスクな場面で感情を察知し、管理する。'},
      {key:'III',title:'他者に適応する',            focus:'コミュニケーション、影響力、プレゼンス',outcome:'スタイルを柔軟に変えて、影響を与え、対立を管理し、メッセージを届ける。'},
      {key:'IV', title:'チームを構築する',          focus:'信頼、安全、リズム、責任',          outcome:'チームが安定してパフォームできる環境を整える。'},
      {key:'V',  title:'決断と成長',                focus:'目標、意思決定、コーチング、文化',  outcome:'明確な目標を設定し、曖昧さの中で適切に決断し、人を育てる。'},
    ],
    chapterTitles:['専門家からリーダーへ','4つの色：行動の共通言語','リーダーとしての自己認識','リーダーのための感情的知性','自己制御：プレッシャー下での冷静さ','リーダーシップスキルとしての共感','適応型リーダーシップ：スタイルの柔軟化','権限なしの影響力','困難な会話のナビゲート','エグゼクティブコミュニケーションとプレゼンス','高パフォーマンスチームの4つの柱','信頼と心理的安全性','運営リズムと説明責任','成果を生む目標設定','曖昧さの中での意思決定の規律','コーチングとメンタリング','異文化間リーダーシップ','カルチャー・マップ：8つの尺度を読む'],
    arc:[{title:'読者を定着させる',text:'明確な階層、持続的なナビゲーション、安定したチャプター詳細ペインで体験を方向付けやすくします。'},{title:'リズムを作る',text:'繰り返すカードパターンと均一な間隔で本をスキャンしやすくします。'},{title:'明快さを守る',text:'パレットは抑制的で、タイポグラフィがトーンを運び、コピーは装飾的でなく直接的です。'}],
    appendices:[{title:'付録A：カラーポケットガイド',text:'4つの色とそのデフォルト動作のクイックリファレンス。'},{title:'付録B：各色とのコミュニケーション方法',text:'トーン、ペース、根拠を適応させるためのコミュニケーションチートシート。'},{title:'付録C：リーダーの実践',text:'フレームワークを習慣に変えるための実践指向セクション。'},{title:'付録D：参考文献',text:'本で使用されたモデルの研究の軌跡。'}],
    conclusion:{title:'適応型リーダー',summary:'リーダーシップは固定されたアイデンティティではなく、習得された範囲です：自己を読み、目の前の人を読み、意図が届くよう自分の見せ方を適応させる。',synthesis:['自己認識はあなたのデフォルトとトリガーの地図を与えます。','感情的知性はあなたが自己調節し、他者と良く出会えるようにします。','適応性、チームシステム、決断、コーチング、文化がその範囲を人々をリードする実際の仕事へと広げます。']},
  },
  ko:{
    parts:[
      {key:'I',  title:'자신을 알아가기',     focus:'자기 인식과 색깔의 언어',          outcome:'기본 리더십 스타일과 압박 하에서의 변화를 인식하세요.'},
      {key:'II', title:'감정 마스터하기',     focus:'감성 지능과 감정 조절',            outcome:'고위험 상황에서 감정을 인식하고 관리하세요.'},
      {key:'III',title:'타인에게 적응하기',   focus:'커뮤니케이션, 영향력, 존재감',     outcome:'스타일을 유연하게 조정하여 영향력을 발휘하고, 갈등을 해결하며 메시지를 전달하세요.'},
      {key:'IV', title:'팀 구축하기',         focus:'신뢰, 안전, 리듬, 책임감',        outcome:'팀이 안정적으로 성과를 낼 수 있는 환경을 만드세요.'},
      {key:'V',  title:'결정하고 성장하기',   focus:'목표, 결정, 코칭, 문화',          outcome:'명확한 목표를 설정하고, 모호함 속에서 올바른 결정을 내리며, 사람들을 성장시키세요.'},
    ],
    chapterTitles:['전문가에서 리더로','네 가지 색깔: 행동을 위한 공통 언어','리더의 자기 인식','리더를 위한 감성 지능','자기 조절: 압박 속의 침착함','리더십 기술로서의 공감','적응형 리더십: 스타일 유연화','권한 없는 영향력','어려운 대화 다루기','임원 커뮤니케이션과 존재감','고성과 팀의 네 가지 기둥','신뢰와 심리적 안전감','운영 리듬과 책임감','성과를 이끄는 목표 설정','모호함 속의 의사결정 규율','코칭과 멘토링','다문화 리더십','컬처 맵: 여덟 가지 척도 읽기'],
    arc:[{title:'독자 고정하기',text:'명확한 계층 구조, 지속적인 내비게이션, 안정적인 챕터 상세 패널이 경험을 쉽게 탐색할 수 있게 합니다.'},{title:'리듬 만들기',text:'반복되는 카드 패턴과 일관된 간격이 책을 스캔하기 쉽게 만듭니다.'},{title:'명확성 보호하기',text:'팔레트는 절제되고, 타이포그래피가 톤을 전달하며, 텍스트는 장식적이지 않고 직접적입니다.'}],
    appendices:[{title:'부록 A: 색깔 포켓 가이드',text:'네 가지 색깔과 기본 동작에 대한 빠른 참조 가이드.'},{title:'부록 B: 각 색깔과 소통하는 방법',text:'어조, 속도, 증거를 조정하기 위한 커뮤니케이션 치트시트.'},{title:'부록 C: 리더의 실천',text:'프레임워크를 습관으로 전환하는 실천 지향 섹션.'},{title:'부록 D: 추가 읽기',text:'책 전반에 사용된 모델 뒤의 연구 경로.'}],
    conclusion:{title:'적응형 리더',summary:'리더십은 고정된 정체성이 아니라 연습된 범위입니다: 자신을 읽고, 앞에 있는 사람을 읽고, 의도가 전달되도록 나타나는 방식을 조정하세요.',synthesis:['자기 인식은 기본값과 트리거의 지도를 제공합니다.','감성 지능은 자신을 조절하고 타인을 잘 만날 수 있게 합니다.','적응성, 팀 시스템, 결정, 코칭, 문화가 그 범위를 사람들을 이끄는 실제 작업으로 확장합니다.']},
  },
  pt:{
    parts:[
      {key:'I',  title:'Conhece-te a ti mesmo',       focus:'Autoconsciência e a linguagem das cores',       outcome:'Reconhece o teu estilo de liderança predefinido e como muda sob pressão.'},
      {key:'II', title:'Domina as tuas emoções',       focus:'Inteligência emocional e regulação',            outcome:'Observa e gere a emoção nos momentos de maior risco.'},
      {key:'III',title:'Adapta-te aos outros',         focus:'Comunicação, influência e presença',            outcome:'Flexibiliza o teu estilo para influenciar, gerir conflitos e transmitir mensagens.'},
      {key:'IV', title:'Constrói a equipa',            focus:'Confiança, segurança, ritmo e responsabilidade',outcome:'Cria as condições para que a equipa tenha um desempenho consistente.'},
      {key:'V',  title:'Decide e cresce',              focus:'Objetivos, decisões, coaching e cultura',       outcome:'Define objetivos claros, decide sob ambiguidade e desenvolve a tua equipa.'},
    ],
    chapterTitles:['De especialista a líder','As quatro cores: uma linguagem comum para o comportamento','Autoconhecimento do líder','Inteligência emocional para líderes','Autorregulação: compostura sob pressão','A empatia como competência de liderança','Liderança adaptativa: flexibiliza o teu estilo','Influenciar sem autoridade','Navegar conversas difíceis','Comunicação executiva e presença','Os quatro pilares de uma equipa de alto desempenho','Confiança e segurança psicológica','Ritmo operacional e responsabilidade','Definir objetivos que geram resultados','Disciplina de decisão sob ambiguidade','Coaching e mentoria','Liderar em contextos multiculturais','O Mapa de Cultura: ler as oito escalas'],
    arc:[{title:'Ancorar o leitor',text:'Uma hierarquia clara, navegação persistente e um painel de detalhe estável tornam a experiência fácil de orientar.'},{title:'Criar ritmo',text:'Padrões de cartão repetidos e espaçamento uniforme tornam o livro fácil de percorrer.'},{title:'Proteger a clareza',text:'A paleta é sóbria, a tipografia carrega o tom e o texto é direto, não decorativo.'}],
    appendices:[{title:'Apêndice A: Guia rápido de cores',text:'Uma referência rápida para as quatro cores e os seus comportamentos predefinidos.'},{title:'Apêndice B: Como comunicar com cada cor',text:'Um guia de comunicação para adaptar tom, ritmo e evidências.'},{title:"Apêndice C: A prática do líder",text:'Uma secção prática para transformar o modelo em hábitos.'},{title:'Apêndice D: Leitura adicional',text:'O percurso de investigação por detrás dos modelos usados ao longo do livro.'}],
    conclusion:{title:'O Líder Adaptativo',summary:'A liderança não é uma identidade fixa mas um alcance praticado: lê-te a ti mesmo, lê a pessoa à tua frente e adapta a forma como te apresentas para que a tua intenção chegue.',synthesis:['A autoconsciência dá-te o mapa dos teus padrões e gatilhos predefinidos.','A inteligência emocional permite-te regular-te e relacionar-te bem com os outros.','A adaptação, os sistemas de equipa, as decisões, o coaching e a cultura estendem esse alcance ao trabalho real de liderar pessoas.']},
  },};

// ── LOCALE RESOLVER ───────────────────────────────────────────────────
function enrichChapters(chapters,locale){
  if(!window.CHAPTERS_EXTRA) return chapters;
  // For non-EN locales, preserve translated theory AND translated annotations
  // (colourAngle, leaderInAction, watchOut, keyModels from CHAPTERS_I18N)
  // rather than overwriting with English-only content from CHAPTERS_EXTRA.
  const skipAnnotations=locale&&locale!=='en';
  return chapters.map(ch=>{
    const extra=window.CHAPTERS_EXTRA[ch.number]||{};
    if(skipAnnotations){
      // Skip all English-only extended annotation fields for non-EN locales
      const {theory,keyModels,colourAngle,leaderInAction,watchOut,...rest}=extra;
      return {...ch,...rest};
    }
    return {...ch,...extra};
  });
}
function getBook(locale){
  let book;
  if(locale==='en'){ book=LANG_BOOK.en; }
  else if(LANG_BOOK[locale]){
    book=LANG_BOOK[locale];
    // LANG_BOOK locales (es) still need the translated extended annotations
    // (colourAngle, leaderInAction, watchOut) merged from CHAPTERS_I18N, otherwise
    // those sections are stripped by enrichChapters and never shown.
    const i18nChapters=window.CHAPTERS_I18N?.[locale]||[];
    if(i18nChapters.length){
      book={...book, chapters: book.chapters.map(ch=>{
        const ext=i18nChapters.find(c=>c.number===ch.number);
        if(!ext) return ch;
        const merged={...ch};
        if(ext.colourAngle) merged.colourAngle=ext.colourAngle;
        if(ext.leaderInAction) merged.leaderInAction=ext.leaderInAction;
        if(ext.watchOut) merged.watchOut=ext.watchOut;
        if(ext.keyModels) merged.keyModels=ext.keyModels;
        return merged;
      })};
    }
  }
  else {
    const ov=OVERRIDES[locale];
    const i18nChapters=window.CHAPTERS_I18N?.[locale]||[];
    if(!ov){ book=LANG_BOOK.en; }
    else {
      const base=LANG_BOOK.en;
      const chapters=base.chapters.map((ch,i)=>{
        const i18n=i18nChapters.find(c=>c.number===ch.number)||{};
        return {
          ...ch,...i18n,
          title: ov.chapterTitles?.[i] ?? i18n.title ?? ch.title,
          number:ch.number, part:ch.part,
        };
      });
      const parts=(ov.parts||base.parts).map((p,i)=>({
        ...(base.parts[i]||{}), ...p,
      }));
      book={
        ...base, chapters, parts,
        arc:        ov.arc        ?? base.arc,
        appendices: ov.appendices ?? base.appendices,
        conclusion: ov.conclusion ?? base.conclusion,
      };
    }
  }
  const enriched = enrichChapters(book.chapters, locale);
  if(window.THEORY_HTML?.[locale]){
    const tH = window.THEORY_HTML[locale];
    return {...book, chapters: enriched.map(ch => tH[ch.number-1] ? {...ch, theory: tH[ch.number-1]} : ch)};
  }
  return {...book, chapters: enriched};
}

// ── STATE ─────────────────────────────────────────────────────────────
const state={
  locale: localStorage.getItem('al.locale')||'en',
  query:'',
  activePart:'all',
  activeChapter:1,
  activeSection:'chapters',
};

function t(key,vars={}){
  const pack=UI[state.locale]||UI.en;
  const str=pack[key]!==undefined?pack[key]:(UI.en[key]||key);
  return str.replace(/\{(\w+)\}/g,(_,k)=>String(vars[k]??''));
}

function applyLocaleMeta(){
  const loc=LOCALES.find(l=>l.code===state.locale)||LOCALES[0];
  document.documentElement.lang=loc.code;
  document.documentElement.dir=loc.dir;
  localStorage.setItem('al.locale',state.locale);
}

const $=id=>document.getElementById(id);

// ── DOM NODES ─────────────────────────────────────────────────────────
const nodes={
  langStrip:$('langStrip'),       topbarLabel:$('topbarLabel'),
  brandTitle:$('brandTitle'),     brandSub:$('brandSub'),
  searchLabel:$('searchLabel'),   chapterSearch:$('chapterSearch'),
  heroEyebrow:$('heroEyebrow'),   heroText:$('heroText'),
  btnExplore:$('btnExplore'),     btnTool:$('btnTool'),
  statGrid:$('statGrid'),
  partsEyebrow:$('partsEyebrow'), partsTitle:$('partsTitle'), partGrid:$('partGrid'),
  chaptersEyebrow:$('chaptersEyebrow'), chaptersTitle:$('chaptersTitle'),
  chapterDetail:$('chapterDetail'),
  evalEyebrow:$('evalEyebrow'),   evalTitle:$('evalTitle'),
  evalLede:$('evalLede'),         evalNotice:$('evalNotice'),
  saEyebrow:$('saEyebrow'),       saTitle:$('saTitle'),
  saLede:$('saLede'),             saNotice:$('saNotice'),
  btnSelfAssess:$('btnSelfAssess'),
  laEyebrow:$('laEyebrow'),       laTitle:$('laTitle'),
  laLede:$('laLede'),             laNotice:$('laNotice'),
  btnLeadership:$('btnLeadership'), navLeadership:$('navLeadership'),
  appendicesEyebrow:$('appendicesEyebrow'), appendicesTitle:$('appendicesTitle'),
  appendixGrid:$('appendixGrid'),
  btnAbout:$('btnAbout'),         navAbout:$('navAbout'),
  aboutOverlay:$('aboutOverlay'), aboutClose:$('aboutClose'),
  aboutTitle:$('aboutTitle'),     aboutBody1:$('aboutBody1'),
  aboutBody2:$('aboutBody2'),     aboutCreditsLabel:$('aboutCreditsLabel'),
  aboutPowered:$('aboutPowered'),
  sidebarNav:$('sidebarNav'),     footerText:$('footerText'),
};

// ── FILTER HELPERS ────────────────────────────────────────────────────
function chapterMatches(chapter){
  const partOk=state.activePart==='all'||chapter.part===state.activePart;
  const q=state.query.trim().toLowerCase();
  if(!q) return partOk;
  const hay=[chapter.title,chapter.summary,chapter.theme||'',chapter.theory||'',
             chapter.practice||'',( chapter.takeaways||[]).join(' ')].join(' ').toLowerCase();
  return partOk && hay.includes(q);
}
function getFC(){ return getBook(state.locale).chapters.filter(chapterMatches); }
// ── SECTION SWITCHER ─────────────────────────────────────────────────
const SWITCHABLE=['chapters','evaluator','self-assessment','leadership-assessment','appendices'];
function showSection(id){
  state.activeSection=id;
  SWITCHABLE.forEach(s=>{
    const el=document.getElementById(s);
    if(el) el.style.display=(s===id)?'':'none';
  });
  // Highlight active topbar nav btn
  document.querySelectorAll('.topbar-nav-btn[data-section]').forEach(b=>{
    b.classList.toggle('active',b.dataset.section===id);
  });
}
function scrollToId(id){
  const el=document.getElementById(id);
  if(!el) return;
  const topbarH=(document.querySelector('.topbar')?.offsetHeight||0)+8;
  const top=el.getBoundingClientRect().top+window.scrollY-topbarH;
  window.scrollTo({top,behavior:'smooth'});
}

function setActive(n){
  state.activeChapter=n;
  showSection('chapters');
  renderAll();
  scrollToId('chapters');
}

// ── RENDER: UI TEXT ───────────────────────────────────────────────────
function renderUIText(){
  const book=getBook(state.locale);
  nodes.topbarLabel.textContent=t('language');
  nodes.brandSub.textContent=t('brandSub');
  nodes.searchLabel.textContent=t('searchLabel');
  nodes.chapterSearch.placeholder=t('searchPlaceholder');
  nodes.heroEyebrow.textContent=t('heroEyebrow');
  nodes.heroText.textContent=t('heroText');
  nodes.btnExplore.textContent=t('btnExplore');
  nodes.btnTool.textContent=t('btnTool');
  nodes.partsEyebrow.textContent=t('partsEyebrow');
  nodes.partsTitle.textContent=t('partsTitle');
  nodes.chaptersEyebrow.textContent=t('chaptersEyebrow');
  nodes.chaptersTitle.textContent=t('chaptersTitle');
  nodes.evalEyebrow.textContent=t('evalEyebrow');
  nodes.evalTitle.textContent=t('evalTitle');
  nodes.evalLede.textContent=t('evalLede');
  nodes.evalNotice.textContent=t('evalNotice');
  nodes.saEyebrow.textContent=t('saEyebrow');
  nodes.saTitle.textContent=t('saTitle');
  nodes.saLede.textContent=t('saLede');
  nodes.saNotice.textContent=t('saNotice');
  nodes.btnSelfAssess.textContent=t('btnSelfAssess');
  nodes.laEyebrow.textContent=t('laEyebrow');
  nodes.laTitle.textContent=t('laTitle');
  nodes.laLede.textContent=t('laLede');
  nodes.laNotice.textContent=t('laNotice');
  nodes.btnLeadership.textContent=t('btnLeadership');
  if(nodes.navLeadership) nodes.navLeadership.textContent=t('btnLeadership');
  nodes.appendicesEyebrow.textContent=t('appendicesEyebrow');
  nodes.appendicesTitle.textContent=t('appendicesTitle');
  if(nodes.btnAbout){ nodes.btnAbout.setAttribute('data-tip',t('aboutTitle')); nodes.btnAbout.setAttribute('aria-label',t('aboutTitle')); }
  if(nodes.aboutTitle) nodes.aboutTitle.textContent=t('aboutTitle');
  if(nodes.aboutBody1) nodes.aboutBody1.textContent=t('aboutBody1');
  if(nodes.aboutBody2) nodes.aboutBody2.textContent=t('aboutBody2');
  if(nodes.aboutCreditsLabel) nodes.aboutCreditsLabel.textContent=t('aboutCreditsLabel');
  if(nodes.aboutPowered) nodes.aboutPowered.innerHTML=t('aboutPowered');
  nodes.footerText.textContent=t('footerText');
}

// ── RENDER: LANG STRIP ────────────────────────────────────────────────
function renderLangStrip(){
  nodes.langStrip.innerHTML=LOCALES.map(l=>
    `<button class="lang-btn${state.locale===l.code?' active':''}" data-lang="${l.code}" type="button" aria-pressed="${state.locale===l.code}">${l.label}</button>`
  ).join('');
  nodes.langStrip.querySelectorAll('[data-lang]').forEach(b=>
    b.addEventListener('click',()=>{ state.locale=b.dataset.lang; applyLocaleMeta(); renderAll(); }));
}

// ── RENDER: STATS ─────────────────────────────────────────────────────
function renderStats(){
  nodes.statGrid.innerHTML=[
    {v:'5', l:t('partsLabel')},
    {v:'18',l:t('chaptersLabel')},
    {v:'4', l:t('appendicesNum')},
    {v:'3', l:t('toolsLabel')},
  ].map(s=>`<div class="stat-card"><strong>${s.v}</strong><span>${s.l}</span></div>`).join('');
}

// ── RENDER: ARC GRID ──────────────────────────────────────────────────
function renderArcGrid(){
  nodes.arcGrid.innerHTML=getBook(state.locale).arc.map(c=>
    `<article class="arc-card"><h3>${c.title}</h3><p>${c.text}</p></article>`
  ).join('');
}

// ── RENDER: OVERVIEW LEDE ─────────────────────────────────────────────
function renderOverviewLede(){
  const book=getBook(state.locale);
  nodes.overviewLede.textContent=book.overviewLede||(UI[state.locale]||UI.en).overviewLede||'';
}

// ── RENDER: PARTS ─────────────────────────────────────────────────────
function renderPartGrid(){
  const book=getBook(state.locale);
  nodes.partGrid.innerHTML=book.parts.map(p=>`
    <article class="part-card">
      <span class="part-pill">${t('partLabel')} ${p.key}</span>
      <h3>${p.title}</h3><p>${p.focus}</p><p>${p.outcome}</p>
    </article>`).join('');
  nodes.partGrid.querySelectorAll('[data-part]').forEach(b=>
    b.addEventListener('click',()=>{ state.activePart=b.dataset.part; const fc=getFC(); state.activeChapter=fc[0]?.number??1; renderAll(); }));
}

// ── RENDER: APPENDICES ────────────────────────────────────────────────
// ── APPENDIX RICH CONTENT ─────────────────────────────────────────────
const AX={
 A:{colours:[
  {id:'red',  name:'Red — The Driver',  hex:'#d64550',onLight:false,
   traits:['Decisive','Results-focused','Direct','Competitive','Action-oriented'],
   best:'Creates momentum, makes fast decisions, drives for outcomes.',
   shadow:'Impatient, controlling, dismissive of emotion under pressure.',
   need:'Give the bottom line and a clear choice. Respect their time.'},
  {id:'yellow',name:'Yellow — The Inspirer',hex:'#f2b705',onLight:true,
   traits:['Enthusiastic','People-focused','Creative','Optimistic','Expressive'],
   best:'Energises teams, builds connection, inspires vision and possibility.',
   shadow:'Scattered, over-promises, avoids hard truths and detail.',
   need:'Bring energy and warmth. Connect to a bigger inspiring purpose.'},
  {id:'green', name:'Green — The Supporter',hex:'#2e9e5b',onLight:false,
   traits:['Patient','Loyal','Empathic','Steady','Harmony-seeking'],
   best:'Stabilises teams, builds deep trust, reliable and consistent.',
   shadow:'Avoids conflict, goes silent, agrees then disengages later.',
   need:'Build relationship first. Give time. Never rush or spring surprises.'},
  {id:'blue',  name:'Blue — The Analyst', hex:'#2e86c1',onLight:false,
   traits:['Analytical','Precise','Logical','Quality-focused','Structured'],
   best:'Ensures rigour, catches risks, delivers consistently high quality.',
   shadow:'Over-analyses, hyper-critical, emotionally distant, slow to decide.',
   need:'Bring data and evidence. Give time to verify. Never oversell or rush.'},
 ]},
 B:{comms:[
  {colour:'Red',  hex:'#d64550',onLight:false,
   open:'"Here\'s the bottom line — three options. You decide."',
   dos:['Lead with the result, then the reasoning','Bring clear options and let them choose','Stay confident — no hedging or filler','Respect their time; keep it short'],
   donts:['Don\'t bury the point in background','Don\'t take bluntness personally','Don\'t open with unrequested small talk','Don\'t raise problems without proposed solutions']},
  {colour:'Yellow',hex:'#f2b705',onLight:true,
   open:'"I\'ve got something I think you\'ll love — let\'s shape it together."',
   dos:['Bring energy and be genuinely warm','Connect the ask to a bigger inspiring purpose','Allow time to talk and feel recognised','Celebrate the idea before refining it'],
   donts:['Don\'t lead with data and analysis','Don\'t be cold or purely transactional','Don\'t rush to the action point immediately','Don\'t rely on them to track the detail']},
  {colour:'Green', hex:'#2e9e5b',onLight:false,
   open:'"No rush at all — I\'d value your honest view before we decide anything."',
   dos:['Build the relationship before the agenda','Explain the how — step by step','Offer reassurance and continuity','Give time to process before expecting a response'],
   donts:['Don\'t rush, pressure, or push for immediacy','Don\'t spring change without consultation','Don\'t mistake silence for agreement','Don\'t skip the personal connection']},
  {colour:'Blue',  hex:'#2e86c1',onLight:false,
   open:'"Here\'s the data and the structured case — take whatever time you need."',
   dos:['Come prepared with facts, evidence and structure','Give time and space to analyse','Send written follow-up with full detail','Acknowledge the risks honestly'],
   donts:['Don\'t oversell, hype, or exaggerate','Don\'t push for a fast commitment','Don\'t wing it or be vague on numbers','Don\'t pressure before they feel ready']},
 ]},
 C:{
  daily:[
   'Before a key conversation: "What colour is this person, and what do they need right now?"',
   'After a difficult interaction: "What triggered me — and what would I do differently?"',
   'At day\'s end: "Did I lead today, or did I just react?"',
   'When delegating: "Am I building capability, or just clearing my plate?"',
   'When solving a problem: "Is this mine to solve, or does solving it block someone else\'s growth?"',
  ],
  weekly:[
   'Review commitments made to your team. Were they clear? Were they kept?',
   'Identify one conversation you have been avoiding. Plan to have it this week.',
   'Ask one direct report: "What is one thing I could do that would make your work easier?"',
   'Check your team\'s emotional temperature: who seems disengaged, stressed, or disconnected?',
  ],
  monthly:[
   'What did your team deliver this month — and what conditions made that possible?',
   'Who on your team grew this month? Who did not? What explains the difference?',
   'What is one leadership habit you want to strengthen? What is your concrete plan?',
  ],
 },
 D:{books:[
  {cat:'Colour & Behaviour',items:[
   {title:'Surrounded by Idiots',author:'Thomas Erikson',note:'The bestselling plain-language introduction to the four-colour DISC model.'},
   {title:'Emotions of Normal People',author:'William Moulton Marston',note:'The 1928 original that introduced the four behavioural quadrants underlying DISC.'},
  ]},
  {cat:'Self-Awareness & EQ',items:[
   {title:'Emotional Intelligence',author:'Daniel Goleman',note:'The foundational argument that EQ predicts leadership effectiveness more than IQ.'},
   {title:'Insight',author:'Tasha Eurich',note:'Why self-awareness is rare — and the research-based practices that actually build it.'},
   {title:'Coaching for Performance',author:'John Whitmore',note:'The foundational GROW model and the coaching mindset every leader needs.'},
  ]},
  {cat:'Communication & Influence',items:[
   {title:'Crucial Conversations',author:'Patterson, Grenny et al.',note:'The practical framework for high-stakes conversations that produce movement and preserve trust.'},
   {title:'Influence',author:'Robert Cialdini',note:'The six principles of ethical persuasion, grounded in decades of social psychology research.'},
   {title:'The Culture Map',author:'Erin Meyer',note:'Eight scales on which cultures differ — essential reading for leading across borders.'},
  ]},
  {cat:'Teams & Performance',items:[
   {title:'The Five Dysfunctions of a Team',author:'Patrick Lencioni',note:'A causal model of why teams fail and the specific steps to address each dysfunction.'},
   {title:'Measure What Matters',author:'John Doerr',note:'The OKR framework for setting and tracking goals that drive real organisational movement.'},
   {title:'The Fearless Organization',author:'Amy Edmondson',note:'The science of psychological safety — creating teams where learning and truth-telling thrive.'},
  ]},
 ]},
};

function renderAppendices(){
 const locale=state.locale;
 const axContent=(window.AX_I18N&&window.AX_I18N[locale])||AX;
 const ap=getBook(locale).appendices;
 const L={a:ap[0]?.title||'Colour Pocket Guide',b:ap[1]?.title||'How to Communicate',c:ap[2]?.title||"The Leader's Practice",d:ap[3]?.title||'Further Reading'};
 nodes.appendixGrid.innerHTML=`
  <section class="ax-block">
   <div class="ax-head"><span class="ax-tag">A</span><h3>${L.a}</h3></div>
   <div class="ax-colour-grid">${axContent.A.colours.map(c=>{const tc=c.onLight?'var(--navy)':'#fff';return `<div class="ax-colour-card" style="--cc:${c.hex};color:${tc}">
    <strong>${c.name}</strong>
    <div class="ax-traits">${c.traits.map(tr=>`<span>${tr}</span>`).join('')}</div>
    <p><em>${t('axAtBest')}</em> ${c.best}</p>
    <p><em>${t('axUnderStress')}</em> ${c.shadow}</p>
    <p class="ax-need"><em>${t('axToInfluence')}</em> ${c.need}</p>
   </div>`;}).join('')}</div>
  </section>

  <section class="ax-block">
   <div class="ax-head"><span class="ax-tag">B</span><h3>${L.b}</h3></div>
   <div class="ax-comms-grid">${axContent.B.comms.map(c=>`<div class="ax-comms-card">
    <div class="ax-comms-hdr" style="background:${c.hex};color:${c.onLight?'var(--navy)':'#fff'}">${c.colour}</div>
    <div class="ax-comms-body">
     <p class="ax-phrase">\u201c${c.open.replace(/^"|"$/g,'')}\u201d</p>
     <div class="ax-do-dont">
      <div><strong>${t('axDo')}</strong><ul>${c.dos.map(d=>`<li>${d}</li>`).join('')}</ul></div>
      <div><strong>${t('axAvoid')}</strong><ul>${c.donts.map(d=>`<li>${d}</li>`).join('')}</ul></div>
     </div>
    </div>
   </div>`).join('')}</div>
  </section>

  <section class="ax-block">
   <div class="ax-head"><span class="ax-tag">C</span><h3>${L.c}</h3></div>
   <div class="ax-practice-grid">
    <div class="ax-practice-col"><h4>${t('axDaily')}</h4><ul>${axContent.C.daily.map(d=>`<li>${d}</li>`).join('')}</ul></div>
    <div class="ax-practice-col"><h4>${t('axWeekly')}</h4><ul>${axContent.C.weekly.map(d=>`<li>${d}</li>`).join('')}</ul></div>
    <div class="ax-practice-col"><h4>${t('axMonthly')}</h4><ul>${axContent.C.monthly.map(d=>`<li>${d}</li>`).join('')}</ul></div>
   </div>
  </section>

  <section class="ax-block">
   <div class="ax-head"><span class="ax-tag">D</span><h3>${L.d}</h3></div>
   <div class="ax-books-grid">${axContent.D.books.map((g,gi)=>`<div class="ax-book-group"><h4>${[t('axCatColour'),t('axCatSelf'),t('axCatComms'),t('axCatTeams')][gi]}</h4>${g.items.map(b=>`<div class="ax-book"><strong>${b.title}</strong> <span class="ax-author">${b.author}</span><p>${b.note}</p></div>`).join('')}</div>`).join('')}</div>
  </section>`;
}


// ── RENDER: SIDEBAR NAV ───────────────────────────────────────────────
function renderSidebarNav(fc){
  const book=getBook(state.locale);
  const groups=book.parts.map(p=>{
    const chs=fc.filter(c=>c.part===p.key);
    if(!chs.length) return '';
    return `<details class="nav-group"${chs.some(c=>c.number===state.activeChapter)?' open':''}>
      <summary><strong>${t('partLabel')} ${p.key} – ${p.title}</strong><span>${chs.length} ${t('chaptersLabel')}</span></summary>
      <div class="nav-items">
        ${chs.map(c=>`<button class="nav-item${c.number===state.activeChapter?' active':''}" data-chapter="${c.number}" type="button"><strong>${c.number}. ${c.title}</strong><span>${c.summary}</span></button>`).join('')}
      </div></details>`;
  }).join('');
  nodes.sidebarNav.innerHTML=groups+`
    <details class="nav-group">
      <summary><strong>${t('appendicesTitle')}</strong></summary>
      <div class="nav-items">
        <button class="nav-item" data-section="appendices" data-jump="#appendices" type="button"><strong>${t('appendicesTitle')}</strong></button>
      </div></details>`;
  nodes.sidebarNav.querySelectorAll('[data-chapter]').forEach(b=>b.addEventListener('click',()=>setActive(+b.dataset.chapter)));
  nodes.sidebarNav.querySelectorAll('[data-jump]').forEach(b=>b.addEventListener('click',()=>scrollToId(b.dataset.jump?.slice(1))));
  nodes.sidebarNav.querySelectorAll('[data-section]').forEach(b=>b.addEventListener('click',()=>showSection(b.dataset.section)));
}

// ── RENDER: CHAPTER LIST ──────────────────────────────────────────────
function renderChapterList(fc){
  if(!fc.length){
    nodes.chapterDetail.innerHTML=`<span class="eyebrow">${t('noChapterSelected')}</span><h3 class="chapter-title">${t('nothingMatches')}</h3><p class="summary">${t('useSearch')}</p>`;
    return;
  }
  if(!fc.some(c=>c.number===state.activeChapter)) state.activeChapter=fc[0].number;
}

// ── RENDER: CHAPTER DETAIL ────────────────────────────────────────────
function renderChapterDetail(fc){
  if(!fc.length) return;
  const active=fc.find(c=>c.number===state.activeChapter)??fc[0];
  const book=getBook(state.locale);
  const part=book.parts.find(p=>p.key===active.part);
  const idx=fc.findIndex(c=>c.number===active.number);
  const prev=fc[idx-1]??null;
  const next=fc[idx+1]??null;

  // Extended annotations are shown for EN/ES (full English/Spanish from CHAPTERS_EXTRA)
  // For all other locales the CHAPTERS_I18N data provides translated content
  const showExtended = true;

  const modelsHtml=showExtended&&(active.keyModels||[]).length?`
    <div class="detail-box">
      <h4>${t('keyModels')}</h4>
      ${(active.keyModels||[]).map(m=>`<div class="model-item"><strong class="model-name">${m.name}</strong><p>${m.desc}</p></div>`).join('')}
    </div>`:'';

  const colourHtml=showExtended&&active.colourAngle?`
    <div class="detail-box">
      <h4>${t('colourAngle')}</h4>
      <div class="colour-angles">
        <div class="colour-angle-item ca-red"><span class="ca-dot"></span><p><strong>Red:</strong> ${active.colourAngle.red||''}</p></div>
        <div class="colour-angle-item ca-yellow"><span class="ca-dot"></span><p><strong>Yellow:</strong> ${active.colourAngle.yellow||''}</p></div>
        <div class="colour-angle-item ca-green"><span class="ca-dot"></span><p><strong>Green:</strong> ${active.colourAngle.green||''}</p></div>
        <div class="colour-angle-item ca-blue"><span class="ca-dot"></span><p><strong>Blue:</strong> ${active.colourAngle.blue||''}</p></div>
      </div>
    </div>`:'';

  const scenarioHtml=showExtended&&active.leaderInAction?`
    <div class="detail-box scenario-box">
      <h4>${t('leaderInAction')}</h4>
      <blockquote>${active.leaderInAction}</blockquote>
    </div>`:'';

  const watchOutHtml=showExtended&&(active.watchOut||[]).length?`
    <div class="detail-box watch-out-box">
      <h4>${t('watchOut')}</h4>
      <ul>${(active.watchOut||[]).map(s=>`<li>${s}</li>`).join('')}</ul>
    </div>`:'';

  nodes.chapterDetail.innerHTML=`
    <span class="eyebrow">${t('partLabel')} ${active.part} – ${part?.title??''}</span>
    <h3 class="chapter-title">${active.number}. ${active.title}</h3>
    <p class="meta">${part?.focus??''}</p>
    <p class="summary">${active.summary}</p>
    <div class="detail-section">
      <div class="detail-box"><h4>${t('whyItMatters')}</h4><p>${active.theme||''}</p></div>
      <div class="detail-box"><h4>${t('theoryDeepDive')}</h4><div class="theory-content">${active.theory||''}</div></div>
      ${modelsHtml}
      ${colourHtml}
      <div class="detail-box"><h4>${t('putIntoPractice')}</h4><p>${active.practice||''}</p></div>
      ${scenarioHtml}
      ${watchOutHtml}
      <div class="detail-box"><h4>${t('chapterTakeaways')}</h4>
        <ul>${(active.takeaways||[]).map(s=>`<li>${s}</li>`).join('')}</ul>
      </div>
    </div>
    <div class="detail-actions">
      <button class="btn-secondary" data-step="prev" type="button" ${prev?'':'disabled'}>${t('previous')}</button>
      <button class="btn-secondary" data-step="next" type="button" ${next?'':'disabled'}>${t('next')}</button>
      <button class="btn btn-primary" data-jump="#appendices" data-section="appendices" type="button">${t('seeAppendices')}</button>
    </div>`;
  nodes.chapterDetail.querySelectorAll('[data-step]').forEach(b=>
    b.addEventListener('click',()=>{ const tgt=b.dataset.step==='prev'?prev:next; if(tgt) setActive(tgt.number); }));
  nodes.chapterDetail.querySelectorAll('[data-jump]').forEach(b=>
    b.addEventListener('click',()=>scrollToId(b.dataset.jump?.slice(1))));
}

// ── RENDER ALL ────────────────────────────────────────────────────────
function renderAll(){
  const fc=getFC();
  renderUIText();
  renderLangStrip();
  renderStats();
  renderPartGrid();
  renderAppendices();
  renderSidebarNav(fc);
  renderChapterList(fc);
  renderChapterDetail(fc);
}

// ── BIND ──────────────────────────────────────────────────────────────
nodes.chapterSearch.addEventListener('input',e=>{ state.query=e.target.value; renderAll(); });
// Section switcher: topbar + hero buttons with data-section
document.querySelectorAll('[data-section]').forEach(b=>{
  b.addEventListener('click',()=>{
    showSection(b.dataset.section);
    scrollToId(b.dataset.section==='self-assessment'?'self-assessment':b.dataset.section);
  });
});
// All other data-jump buttons (no data-section) just scroll with topbar offset
document.querySelectorAll('[data-jump]:not([data-section])').forEach(b=>{
  b.addEventListener('click',()=>scrollToId(b.dataset.jump?.slice(1)));
});
// Back to top
document.getElementById('btnBackToTop')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// About modal
function openAbout(){ if(!nodes.aboutOverlay) return; nodes.aboutOverlay.hidden=false; document.body.style.overflow='hidden'; nodes.aboutClose?.focus(); }
function closeAbout(){ if(!nodes.aboutOverlay) return; nodes.aboutOverlay.hidden=true; document.body.style.overflow=''; }
nodes.btnAbout?.addEventListener('click',openAbout);
nodes.aboutClose?.addEventListener('click',closeAbout);
nodes.aboutOverlay?.addEventListener('click',e=>{ if(e.target===nodes.aboutOverlay) closeAbout(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape' && nodes.aboutOverlay && !nodes.aboutOverlay.hidden) closeAbout(); });

// ── BOOT ──────────────────────────────────────────────────────────────
applyLocaleMeta();
renderAll();
showSection('chapters');
