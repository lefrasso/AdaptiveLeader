// Authored translations for the Colour Self-Assessment tool.
// Deep-merges the `self` namespace into each non-English messages/<loc>.json.
// ICU placeholders ({n} {total} {name} {colour} {pct} {archetype} {primary}
// {secondary} {p} {s} {who}) and <b> tags are preserved verbatim.
// Arrays are REPLACED wholesale, so each array is provided complete.
// Run: node scripts/translate-self.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const msgDir = resolve(here, "..", "messages");

function deepMerge(base, override) {
  const out = { ...base };
  for (const k of Object.keys(override)) {
    const b = base[k];
    const o = override[k];
    if (b && o && typeof b === "object" && typeof o === "object" && !Array.isArray(b) && !Array.isArray(o)) {
      out[k] = deepMerge(b, o);
    } else {
      out[k] = o;
    }
  }
  return out;
}

const T = {
  es: {
    self: {
      meta: {
        title: `Autoevaluación de colores`,
        description: `Descubre tu equilibrio de colores y lo que significa para tu autoconocimiento, tu regulación emocional y tu adaptación a cada uno de los otros colores.`,
      },
      header: {
        eyebrow: `AUTOCONOCIMIENTO E INTELIGENCIA EMOCIONAL`,
        title: `Autoevaluación de colores`,
        lead: `Descubre tu propio equilibrio de colores y entiende lo que significa para tu autoconocimiento, tu regulación emocional y tus mayores retos de adaptación con cada uno de los otros colores.`,
      },
      notice: `<b>Evalúate con honestidad.</b> Cada afirmación aparece en orden aleatorio con el color oculto. Puntúa cuánto describe tu tendencia natural, no tu mejor día ni cómo aspiras a ser. El perfil y todas las recomendaciones aparecen solo cuando lo revelas.`,
      nameLabel: `Tu nombre (opcional)`,
      namePlaceholder: `p. ej. Alex, para un informe personalizado`,
      nameHint: `Usa los deslizadores para mostrar con qué intensidad te describe cada afirmación. Un 0 significa que no te describe en absoluto; 100 significa que te describe a la perfección.`,
      rateTitle: `Puntúa las afirmaciones`,
      rateSub: `Los colores están ocultos y las opciones se barajan: puntúa lo que sientes verdadero, no lo que suena bien`,
      notRated: `Sin puntuar aún`,
      splitCap: `Cómo se reparten tus puntuaciones en este aspecto (= 100%)`,
      progress: `{n} de {total} aspectos puntuados`,
      reveal: `Revelar mi perfil`,
      colours: {
        red: { name: `Rojo`, archetype: `El Impulsor` },
        yellow: { name: `Amarillo`, archetype: `El Inspirador` },
        green: { name: `Verde`, archetype: `El Apoyo` },
        blue: { name: `Azul`, archetype: `El Analista` },
      },
      questions: {
        work: {
          aspect: `Cómo trabajo`,
          prompt: `¿Qué describe mejor tu estilo de trabajo natural?`,
          options: {
            red: `Me gusta tomar las riendas, marcar el ritmo y hacer avanzar las cosas con decisión.`,
            yellow: `Disfruto colaborar, compartir ideas y dar energía a quienes me rodean.`,
            green: `Prefiero trabajar de forma constante, generar confianza y apoyar al equipo.`,
            blue: `Me gusta planificar con cuidado, asegurar la calidad y analizar antes de actuar.`,
          },
        },
        pressure: {
          aspect: `Bajo presión`,
          prompt: `Cuando el estrés es alto, ¿cómo respondes de forma natural?`,
          options: {
            red: `Me vuelvo más directo y empujo con más fuerza: los resultados son lo que más importa.`,
            yellow: `Busco personas con quienes generar ideas y busco soluciones creativas.`,
            green: `Me quedo callado, lo proceso internamente y necesito tiempo antes de responder.`,
            blue: `Profundizo en los datos y busco más información antes de decidir.`,
          },
        },
        comms: {
          aspect: `Comunicación`,
          prompt: `¿Cómo te expresas de forma natural?`,
          options: {
            red: `Voy al grano rápido: directo, breve y centrado en los resultados.`,
            yellow: `Comunico con energía e historias, haciéndolo personal y atractivo.`,
            green: `Soy cálido y paciente, cuidadoso de preservar la relación en todo lo que digo.`,
            blue: `Soy preciso y estructurado, presentando hechos y razonamientos con claridad.`,
          },
        },
        decisions: {
          aspect: `Tomar decisiones`,
          prompt: `¿Cómo abordas una decisión importante?`,
          options: {
            red: `Decido rápido con la información que tengo: importan la velocidad y el impulso.`,
            yellow: `Consulto a otros y sigo mi instinto cuando la energía se siente adecuada.`,
            green: `Busco consenso y me tomo tiempo para considerar el impacto en todos.`,
            blue: `Reúno todos los datos disponibles y lo pienso metódicamente antes de comprometerme.`,
          },
        },
        motivation: {
          aspect: `Qué me impulsa`,
          prompt: `¿Qué te motiva de verdad en el trabajo?`,
          options: {
            red: `Lograr resultados, ganar y tener el control de los desenlaces.`,
            yellow: `El reconocimiento, la conexión, la variedad y la emoción de las ideas nuevas.`,
            green: `La armonía, la estabilidad y saber que el equipo está apoyado y valorado.`,
            blue: `La precisión, el dominio, la estructura y entregar un trabajo de calidad constante.`,
          },
        },
        conflict: {
          aspect: `Manejar el conflicto`,
          prompt: `Cuando hay un desacuerdo genuino, ¿cómo respondes normalmente?`,
          options: {
            red: `Lo abordo directamente y digo lo que pienso, aunque genere fricción.`,
            yellow: `Lo desvío con humor o energía para mantener el ambiente positivo.`,
            green: `Absorbo la tensión en silencio y evito la confrontación para mantener la paz.`,
            blue: `Me retiro y analizo la situación antes de decidir si intervenir y cómo.`,
          },
        },
        feedback: {
          aspect: `Recibir retroalimentación`,
          prompt: `¿Cómo respondes normalmente a la retroalimentación crítica?`,
          options: {
            red: `Escucho lo que es útil, lo evalúo rápido y sigo adelante.`,
            yellow: `Al principio me lo tomo como algo personal, pero me recupero rápido y encuentro el lado positivo.`,
            green: `Lo siento profundamente, puedo estar de acuerdo aunque discrepe, y lo proceso despacio.`,
            blue: `Lo analizo con cuidado en busca de exactitud y justicia antes de aceptarlo o rechazarlo.`,
          },
        },
        strength: {
          aspect: `Tu mayor aportación`,
          prompt: `¿Qué dice la gente de forma más fiable que es tu mayor valor para un equipo?`,
          options: {
            red: `Hacer que las cosas se hagan: entrego resultados incluso bajo presión.`,
            yellow: `Aportar energía y unir al equipo en torno a una visión compartida.`,
            green: `Ser el ancla estable: fiable, tranquilo y siempre de confianza.`,
            blue: `Asegurar el rigor: encontrar el fallo, la brecha o el riesgo que otros pasan por alto.`,
          },
        },
      },
      self: {
        red: {
          strengths: [
            `Decidido y orientado a la acción: creas impulso cuando otros dudan.`,
            `Comunicador directo: la gente siempre sabe a qué atenerse contigo.`,
            `Mucha energía y empuje: te exiges a ti mismo y a los demás un alto estándar.`,
          ],
          shadow: [
            `Bajo presión: te vuelves controlador, brusco e impaciente.`,
            `Puedes pasar por alto el impacto emocional de tu franqueza en los demás.`,
            `Puedes confundir velocidad con calidad: decidir rápido no siempre es decidir bien.`,
          ],
          blindSpots: [
            `Cómo cae tu franqueza en personas con menos poder o autoridad que tú.`,
            `El coste de tu impaciencia sobre la seguridad psicológica de tu equipo.`,
            `Las decisiones que apresuraste y que luego resultaron necesitar más deliberación.`,
          ],
          question: `¿Voy rápido porque es genuinamente el ritmo correcto, o porque me incomoda la incertidumbre de esperar?`,
        },
        yellow: {
          strengths: [
            `Inspirador y estimulante: haces que la gente quiera formar parte de lo que haces.`,
            `Creativo y optimista: ves posibilidad donde otros ven problemas.`,
            `Relacional por naturaleza: creas conexión y calidez en los equipos con rapidez.`,
          ],
          shadow: [
            `Bajo presión: te dispersas, prometes de más y pierdes el seguimiento.`,
            `Tu entusiasmo puede parecer poco fiable a colegas analíticos o centrados en resultados.`,
            `Puedes evitar verdades difíciles para preservar la energía positiva de la sala.`,
          ],
          blindSpots: [
            `Los compromisos que asumiste y que silenciosamente se te escaparon del radar.`,
            `Cómo tu energía y tu ritmo pueden abrumar a colegas más callados.`,
            `La brecha entre lo inspirado que te sientes y lo que realmente se entrega.`,
          ],
          question: `¿Estoy motivado porque esto es genuinamente lo correcto, o porque me entusiasma la idea y evito la disciplina que exige?`,
        },
        green: {
          strengths: [
            `Fiable, leal y de confianza: la persona con la que el equipo cuenta.`,
            `Paciente y genuinamente empático: la gente se siente escuchada y segura a tu lado.`,
            `Una presencia estabilizadora bajo presión: tu calma se convierte en la calma de todo el equipo.`,
          ],
          shadow: [
            `Bajo presión: te callas, evitas el conflicto y acumulas resentimiento en silencio.`,
            `A menudo asientes en la sala y discrepas en privado: tu silencio confunde a los demás.`,
            `Tu complacencia puede privar al equipo de la fricción honesta que en realidad necesita.`,
          ],
          blindSpots: [
            `Cómo se interpreta tu silencio como acuerdo, incluso cuando no lo es.`,
            `El coste a largo plazo de tragarte el desacuerdo y la decepción no expresada.`,
            `Cómo tu evitación del conflicto a veces te protege más a ti que a la relación.`,
          ],
          question: `¿Estoy siendo paciente porque la situación lo pide de verdad, o estoy evitando una conversación que sé que debo tener?`,
        },
        blue: {
          strengths: [
            `Analítico y preciso: captas lo que otros pasan por alto.`,
            `Altos estándares que protegen la calidad de forma constante en todo el equipo.`,
            `Estructurado y fiable: tus planes y análisis resisten el escrutinio.`,
          ],
          shadow: [
            `Bajo presión: te vuelves hipercrítico, retraído y propenso a la parálisis por análisis.`,
            `Tu reserva emocional puede parecer indiferencia o frialdad, aunque de verdad te importe.`,
            `Tus estándares pueden ralentizar al equipo: no toda decisión merece el mismo nivel de rigor.`,
          ],
          blindSpots: [
            `Cómo se malinterpreta tu silencio en las reuniones como desaprobación o desconexión.`,
            `La dimensión emocional de situaciones que analizas como puros problemas lógicos.`,
            `El patrón de buscar más datos como forma de posponer la incomodidad de comprometerte.`,
          ],
          question: `¿Reúno más información porque de verdad la necesito, o porque estoy posponiendo la incomodidad de decidir con lo que ya tengo?`,
        },
      },
      emotion: {
        red: {
          triggers: [
            `La incompetencia o la pereza visible en los demás`,
            `La deliberación interminable y la indecisión`,
            `Ser cuestionado o desafiado en público`,
            `La ineficiencia y el esfuerzo malgastado`,
          ],
          warning: [
            `La voz sube o se vuelve más aguda y cortante`,
            `Empiezas a completar las frases de los demás`,
            `El sarcasmo o el desdén entra en tu tono`,
            `Te inclinas físicamente o te apoderas del espacio de la conversación`,
          ],
          recovery: [
            `Movimiento físico: un breve paseo interrumpe el ciclo de activación.`,
            `Completa una pequeña tarea concreta para recuperar la sensación de control e impulso.`,
            `Nombra lo que sientes antes de responder: esto es frustración por el ritmo, no por la persona.`,
          ],
          practice: `Antes de responder cuando te activas: una respiración deliberada y luego pregúntate: ¿esto es urgente, o solo incómodo para mí ahora mismo?`,
        },
        yellow: {
          triggers: [
            `Ser ignorado, desestimado o interrumpido al hablar`,
            `El aburrimiento y la repetición sin variedad ni novedad`,
            `El conflicto que se siente personal o que ataca la relación`,
            `Sentirte limitado, microgestionado o subestimado`,
          ],
          warning: [
            `Hablar más rápido y saltar entre temas a mitad de frase`,
            `Asumir compromisos que no has pensado bien`,
            `Usar el humor o la energía para desviar un punto serio o difícil`,
            `Una energía que se lee como actuación en lugar de presencia genuina`,
          ],
          recovery: [
            `Conexión social: una breve conversación con alguien de confianza te ancla rápido.`,
            `Anota las tres cosas que de verdad importan ahora en lugar de todo.`,
            `Baja el tono deliberadamente: respira más lento, reduce el ritmo, crea una pausa.`,
          ],
          practice: `Después de cada reunión importante: escribe un compromiso concreto con una fecha específica y una persona responsable nombrada.`,
        },
        green: {
          triggers: [
            `El conflicto directo o la confrontación pública`,
            `El cambio repentino sin consulta ni aviso`,
            `Ser empujado o presionado a decidir rápido`,
            `La crítica hecha delante de otros`,
          ],
          warning: [
            `Quedarte callado en reuniones donde normalmente aportas`,
            `Asentir en voz alta mientras sientes lo contrario por dentro`,
            `Volverte pasivo o retirarte suavemente de la conversación`,
            `El resentimiento que crece despacio bajo una superficie calmada y complaciente`,
          ],
          recovery: [
            `Tiempo a solas para procesar: forzarte a hablar antes de estar listo rara vez lleva a algo productivo.`,
            `Una conversación individual de confianza que saque a la luz lo que de verdad piensas.`,
            `Un siguiente paso claro y sencillo para crear movimiento y recuperar la sensación de agencia.`,
          ],
          practice: `En tu próxima situación difícil: nombra tu opinión honesta en voz alta, antes de nombrar la de la otra persona.`,
        },
        blue: {
          triggers: [
            `El descuido, la imprecisión o los recortes en la calidad`,
            `Que te pidan comprometerte antes de sentir que tienes suficiente información`,
            `El entusiasmo y la fanfarria sin respaldo en la evidencia`,
            `La presión emocional para asentir cuando la lógica aún no lo sostiene`,
          ],
          warning: [
            `Volverte progresivamente más callado a medida que avanza la reunión`,
            `Señalar cada vez más riesgos en lugar de involucrarte en soluciones`,
            `Retirarte de la discusión grupal hacia notas o análisis privados`,
            `El tono se vuelve cortante y puramente factual, perdiendo toda calidez y conexión`,
          ],
          recovery: [
            `Anota los hechos que ya conoces: esto rompe la espiral de incertidumbre e impotencia.`,
            `Estrecha la pregunta: no qué deberíamos hacer, sino cuál es la única decisión que necesito tomar ahora.`,
            `Una breve pausa física: cinco minutos lejos de la pantalla reinician el bucle de análisis.`,
          ],
          practice: `Encuentra una decisión esta semana en la que tengas el 70% de la información que quieres, y tómala sin esperar el 30% restante.`,
        },
      },
      influence: {
        red: {
          yellow: {
            challenge: `Tu franqueza corta la energía y el flujo de ideas del Amarillo: se siente acallado en lugar de incluido.`,
            adapt: `Empieza con entusiasmo y conecta la idea con una visión más amplia antes de aterrizar en una decisión.`,
            phrase: `Me encanta hacia dónde puede ir esto: aquí está lo esencial para que ayudes a darle forma.`,
          },
          green: {
            challenge: `Tu ritmo y tu franqueza abruman al Verde, que necesita tiempo y calidez antes de poder implicarse de verdad.`,
            adapt: `Baja el ritmo de forma deliberada, construye primero la relación, pregunta antes de afirmar.`,
            phrase: `Sin ninguna prisa: ¿cuál es tu opinión sincera sobre esto?`,
          },
          blue: {
            challenge: `Tú quieres decidir rápido; el Azul no se comprometerá sin quedar satisfecho con la evidencia.`,
            adapt: `Trae los datos, presenta tu análisis y dale tiempo para verificar antes de esperar una decisión.`,
            phrase: `Esta es la evidencia con la que trabajo: ¿qué preguntas te suscita?`,
          },
        },
        yellow: {
          red: {
            challenge: `Tu entusiasmo y tus historias pierden al Rojo rápidamente: necesita lo esencial, no el viaje.`,
            adapt: `Empieza con el resultado y la decisión requerida; corta la narrativa; deja que elija.`,
            phrase: `En resumen: esto es lo que propongo, por qué gana y qué necesito de ti.`,
          },
          green: {
            challenge: `Tu mucha energía y tu ritmo pueden abrumar al Verde: necesita calidez y espacio genuino, no intensidad.`,
            adapt: `Entra en calor en lo personal primero, iguala su ritmo y consulta antes de lanzarte al discurso.`,
            phrase: `Antes de compartir mi idea, de verdad me encantaría escuchar la tuya primero.`,
          },
          blue: {
            challenge: `Tu optimismo sin evidencia pierde al Azul por completo: el entusiasmo no sustituye a los datos.`,
            adapt: `Ven preparado con evidencia, reconoce los riesgos con honestidad y deja que analice antes de comprometerse.`,
            phrase: `Aquí están los datos que lo respaldan: tómate el tiempo que necesites para revisarlos bien.`,
          },
        },
        green: {
          red: {
            challenge: `Tu enfoque cuidadoso y suave se lee como indecisión o falta de convicción para el Rojo: se desconecta rápido.`,
            adapt: `Sé directo y claro, empieza con lo esencial, haz una propuesta concreta en lugar de una sugerencia abierta.`,
            phrase: `Quiero ser directo: esto es lo que propongo y por qué creo que es lo correcto.`,
          },
          yellow: {
            challenge: `Tu ritmo mesurado y tu reserva no encajan con la energía del Amarillo: interpreta tu calma como desconexión.`,
            adapt: `Iguala su energía de forma deliberada, conecta en la dimensión humana de la idea, muestra entusiasmo visible.`,
            phrase: `Esto de verdad me entusiasma, y aquí está por qué importa para el equipo.`,
          },
          blue: {
            challenge: `Tu enfoque relacional puede parecer impreciso o insuficientemente riguroso para el Azul.`,
            adapt: `Respalda tu postura con lógica, estructura tu argumento con claridad y trae evidencia junto con la perspectiva.`,
            phrase: `Lo he pensado con cuidado: aquí está el caso estructurado a favor.`,
          },
        },
        blue: {
          red: {
            challenge: `Tu detalle y tu proceso pierden al Rojo de inmediato: deja de escuchar antes de que llegues a tu punto.`,
            adapt: `Conclusión primero: expón tu conclusión al inicio y ten los datos de apoyo listos como respaldo, nunca empieces por ellos.`,
            phrase: `Resumen rápido: la recomendación y las dos razones clave; el detalle está disponible si lo necesitas.`,
          },
          yellow: {
            challenge: `Tu análisis estructurado se siente seco y desalentador para el Amarillo: se desconecta antes de que llegues a la idea clave.`,
            adapt: `Abre con visión y posibilidad, aporta calidez genuina, usa una historia convincente antes del análisis.`,
            phrase: `Esto podría ser algo importante, y los datos lo respaldan de forma convincente.`,
          },
          green: {
            challenge: `Tu reserva emocional se lee como fría o distante, aunque tu intención sea reflexiva y considerada.`,
            adapt: `Muestra interés genuino en su perspectiva primero y reconoce la relación antes que la lógica.`,
            phrase: `De verdad valoro tu opinión sobre esto antes de compartir lo que he encontrado: ¿cuál es tu lectura honesta?`,
          },
        },
      },
      results: {
        title: `Tu perfil de colores`,
        titleNamed: `Perfil de colores — {name}`,
        sub: `Color principal: {colour} ({pct}%). Tu mezcla completa e ideas personalizadas aparecen abajo.`,
        you: `Tú`,
        compTitle: `Tu composición de colores`,
        profileTag: `TU PERFIL DE COLORES · {archetype}`,
        profileTitleBlend: `Mezcla {primary} / {secondary}`,
        profileTitleLed: `Perfil liderado por {primary}`,
        narrStrong: `{who} lideras con fuerza con {primary} ({p}%): la energía de {archetype} moldea tu estilo por defecto.`,
        narrEven: `{who} muestras una mezcla pareja {primary}/{secondary} ({p}% / {s}%): te mueves entre ambos modos según el contexto y lo que esté en juego.`,
        narrSecondary: `{who} eres principalmente {primary} ({p}%) con un {secondary} secundario significativo ({s}%).`,
        tiers: { dominant: `Dominante`, secondary: `Secundario`, minor: `Menor`, low: `Bajo` },
        saTitle: `Autoconocimiento`,
        saSub: `Tus fortalezas naturales, comportamientos de sombra y puntos ciegos`,
        saStrengths: `Tus fortalezas naturales`,
        saShadow: `Tu sombra bajo estrés`,
        saBlind: `Puntos ciegos a vigilar`,
        ecTitle: `Control emocional`,
        ecSub: `Tus detonantes, señales de alerta temprana y movimientos de recuperación`,
        ecTriggers: `Qué te detona`,
        ecWarning: `Señales de alerta temprana`,
        ecRecovery: `Movimientos de recuperación y práctica diaria`,
        infTitle: `Influir en los otros colores`,
        infSub: `Tu mayor reto y cómo adaptarte para cada color con el que trabajas`,
        infChallenge: `El reto`,
        infAdapt: `Cómo adaptarte`,
        colourTag: `{name} — {archetype}`,
        retake: `Repetir la evaluación`,
        print: `Imprimir / Guardar como PDF`,
      },
      footer: `Programa de preparación para el liderazgo · Autoevaluación de colores: un espejo para crecer, no una casilla en la que encasillarte.`,
    },
  },

  it: {
    self: {
      meta: {
        title: `Autovalutazione dei colori`,
        description: `Scopri il tuo equilibrio di colori e cosa significa per la tua consapevolezza di sé, la regolazione emotiva e l'adattamento a ciascun altro colore.`,
      },
      header: {
        eyebrow: `CONSAPEVOLEZZA DI SÉ E INTELLIGENZA EMOTIVA`,
        title: `Autovalutazione dei colori`,
        lead: `Scopri il tuo equilibrio di colori e comprendi cosa significa per la tua consapevolezza di sé, la tua regolazione emotiva e le tue maggiori sfide di adattamento con ciascun altro colore.`,
      },
      notice: `<b>Valutati con onestà.</b> Ogni affermazione appare in ordine casuale con il colore nascosto. Valuta quanto descrive la tua tendenza naturale, non la tua giornata migliore né come aspiri a essere. Il profilo e tutte le raccomandazioni appaiono solo quando riveli.`,
      nameLabel: `Il tuo nome (facoltativo)`,
      namePlaceholder: `es. Alex, per un report personalizzato`,
      nameHint: `Usa i cursori per mostrare quanto fortemente ogni affermazione ti descrive. Un punteggio di 0 significa che non ti descrive affatto; 100 significa che ti descrive perfettamente.`,
      rateTitle: `Valuta le affermazioni`,
      rateSub: `I colori sono nascosti e le opzioni sono mescolate: valuta ciò che senti vero, non ciò che suona giusto`,
      notRated: `Non ancora valutato`,
      splitCap: `Come si ripartiscono le tue valutazioni su questo aspetto (= 100%)`,
      progress: `{n} di {total} aspetti valutati`,
      reveal: `Rivela il mio profilo`,
      colours: {
        red: { name: `Rosso`, archetype: `Il Trascinatore` },
        yellow: { name: `Giallo`, archetype: `L'Ispiratore` },
        green: { name: `Verde`, archetype: `Il Sostenitore` },
        blue: { name: `Blu`, archetype: `L'Analista` },
      },
      questions: {
        work: {
          aspect: `Come lavoro`,
          prompt: `Cosa descrive meglio il tuo stile di lavoro naturale?`,
          options: {
            red: `Mi piace prendere in mano la situazione, dettare il ritmo e far procedere le cose con decisione.`,
            yellow: `Mi piace collaborare, condividere idee e dare energia alle persone intorno a me.`,
            green: `Preferisco lavorare in modo costante, costruire fiducia e sostenere la squadra.`,
            blue: `Mi piace pianificare con cura, garantire la qualità e analizzare prima di agire.`,
          },
        },
        pressure: {
          aspect: `Sotto pressione`,
          prompt: `Quando lo stress è alto, come rispondi naturalmente?`,
          options: {
            red: `Divento più diretto e spingo di più: contano soprattutto i risultati.`,
            yellow: `Cerco persone con cui fare brainstorming e cerco soluzioni creative.`,
            green: `Divento silenzioso, elaboro dentro di me e ho bisogno di tempo prima di rispondere.`,
            blue: `Scavo più a fondo nei dati e cerco più informazioni prima di decidere.`,
          },
        },
        comms: {
          aspect: `Comunicazione`,
          prompt: `Come ti esprimi naturalmente?`,
          options: {
            red: `Vado dritto al punto: diretto, breve e concentrato sui risultati.`,
            yellow: `Comunico con energia e storie, rendendolo personale e coinvolgente.`,
            green: `Sono caloroso e paziente, attento a preservare la relazione in tutto ciò che dico.`,
            blue: `Sono preciso e strutturato, presentando fatti e ragionamenti con chiarezza.`,
          },
        },
        decisions: {
          aspect: `Prendere decisioni`,
          prompt: `Come affronti una decisione importante?`,
          options: {
            red: `Decido in fretta con le informazioni che ho: contano velocità e slancio.`,
            yellow: `Consulto gli altri e seguo l'istinto quando l'energia è quella giusta.`,
            green: `Cerco il consenso e mi prendo il tempo per considerare l'impatto su tutti.`,
            blue: `Raccolgo tutti i dati disponibili e ci ragiono con metodo prima di impegnarmi.`,
          },
        },
        motivation: {
          aspect: `Cosa mi spinge`,
          prompt: `Cosa ti motiva davvero al lavoro?`,
          options: {
            red: `Raggiungere risultati, vincere ed avere il controllo degli esiti.`,
            yellow: `Il riconoscimento, la connessione, la varietà e l'entusiasmo delle nuove idee.`,
            green: `L'armonia, la stabilità e sapere che la squadra è sostenuta e valorizzata.`,
            blue: `L'accuratezza, la padronanza, la struttura e consegnare un lavoro costantemente di alta qualità.`,
          },
        },
        conflict: {
          aspect: `Gestire il conflitto`,
          prompt: `Quando c'è un disaccordo autentico, come rispondi di solito?`,
          options: {
            red: `Lo affronto direttamente e dico ciò che penso, anche se crea attrito.`,
            yellow: `Lo devio con umorismo o energia per mantenere l'umore positivo.`,
            green: `Assorbo la tensione in silenzio ed evito il confronto per mantenere la pace.`,
            blue: `Mi ritiro e analizzo la situazione prima di decidere se e come intervenire.`,
          },
        },
        feedback: {
          aspect: `Ricevere feedback`,
          prompt: `Come rispondi di solito a un feedback critico?`,
          options: {
            red: `Ascolto ciò che è utile, lo valuto in fretta e vado avanti.`,
            yellow: `All'inizio la prendo sul personale ma mi riprendo in fretta e trovo il lato positivo.`,
            green: `Lo sento profondamente, posso essere d'accordo anche quando dissento, e lo elaboro lentamente.`,
            blue: `Lo analizzo con cura per accuratezza ed equità prima di accettarlo o rifiutarlo.`,
          },
        },
        strength: {
          aspect: `Il tuo contributo più grande`,
          prompt: `Cosa dicono di te in modo più affidabile come il tuo maggior valore per una squadra?`,
          options: {
            red: `Portare a termine le cose: consegno risultati anche sotto pressione.`,
            yellow: `Portare energia e radunare la squadra attorno a una visione condivisa.`,
            green: `Essere l'ancora stabile: affidabile, calmo e sempre degno di fiducia.`,
            blue: `Garantire il rigore: trovare il difetto, la lacuna o il rischio che gli altri non vedono.`,
          },
        },
      },
      self: {
        red: {
          strengths: [
            `Deciso e orientato all'azione: crei slancio quando gli altri esitano.`,
            `Comunicatore diretto: le persone sanno sempre a che punto sono con te.`,
            `Grande energia e spinta: pretendi standard alti da te e dagli altri.`,
          ],
          shadow: [
            `Sotto pressione: diventi controllante, brusco e impaziente.`,
            `Puoi trascurare l'impatto emotivo della tua schiettezza sugli altri.`,
            `Puoi confondere velocità e qualità: decidere in fretta non è sempre decidere bene.`,
          ],
          blindSpots: [
            `Come cade la tua schiettezza su persone con meno potere o autorità di te.`,
            `Il costo della tua impazienza sulla sicurezza psicologica della squadra.`,
            `Le decisioni che hai affrettato e che poi si sono rivelate bisognose di più riflessione.`,
          ],
          question: `Vado veloce perché è davvero il ritmo giusto, o perché sono a disagio con l'incertezza dell'attesa?`,
        },
        yellow: {
          strengths: [
            `Ispiratore ed entusiasmante: fai venire voglia alle persone di far parte di ciò che fai.`,
            `Creativo e ottimista: vedi possibilità dove gli altri vedono problemi.`,
            `Relazionale per natura: costruisci connessione e calore nelle squadre in fretta.`,
          ],
          shadow: [
            `Sotto pressione: ti disperdi, prometti troppo e perdi il seguito.`,
            `Il tuo entusiasmo può sembrare inaffidabile a colleghi analitici o orientati ai risultati.`,
            `Puoi evitare verità difficili per preservare l'energia positiva nella stanza.`,
          ],
          blindSpots: [
            `Gli impegni che hai preso e che silenziosamente sono usciti dal tuo radar.`,
            `Come la tua energia e il tuo ritmo possono travolgere i colleghi più silenziosi.`,
            `Il divario tra quanto ti senti ispirato e ciò che viene davvero consegnato.`,
          ],
          question: `Sono entusiasta perché è davvero la cosa giusta, o perché mi eccita l'idea ed evito la disciplina che richiede?`,
        },
        green: {
          strengths: [
            `Affidabile, leale e degno di fiducia: la persona su cui la squadra conta.`,
            `Paziente e genuinamente empatico: le persone si sentono ascoltate e al sicuro con te.`,
            `Una presenza stabilizzante sotto pressione: la tua calma diventa la calma di tutta la squadra.`,
          ],
          shadow: [
            `Sotto pressione: taci, eviti il conflitto e covi risentimento in silenzio.`,
            `Spesso sei d'accordo nella stanza e dissenti in privato: il tuo silenzio inganna gli altri.`,
            `La tua arrendevolezza può privare la squadra dell'attrito onesto di cui ha davvero bisogno.`,
          ],
          blindSpots: [
            `Come il tuo silenzio viene letto come consenso, anche quando non lo è.`,
            `Il costo a lungo termine dell'ingoiare il dissenso e la delusione non detta.`,
            `Come la tua evitazione del conflitto a volte protegge te più della relazione.`,
          ],
          question: `Sono paziente perché la situazione lo richiede davvero, o sto evitando una conversazione che so di dover avere?`,
        },
        blue: {
          strengths: [
            `Analitico e preciso: cogli ciò che gli altri non vedono.`,
            `Standard alti che proteggono in modo costante la qualità di tutta la squadra.`,
            `Strutturato e affidabile: i tuoi piani e le tue analisi reggono all'esame.`,
          ],
          shadow: [
            `Sotto pressione: diventi ipercritico, ti ritiri e sei incline alla paralisi da analisi.`,
            `La tua riservatezza emotiva può sembrare indifferenza o freddezza, anche quando ci tieni davvero.`,
            `I tuoi standard possono rallentare la squadra: non ogni decisione merita lo stesso rigore.`,
          ],
          blindSpots: [
            `Come il tuo silenzio nelle riunioni viene frainteso come disapprovazione o disimpegno.`,
            `La dimensione emotiva di situazioni che analizzi come puri problemi logici.`,
            `Lo schema di cercare più dati come modo per rimandare il disagio di impegnarti.`,
          ],
          question: `Sto raccogliendo più informazioni perché ne ho davvero bisogno, o perché sto rimandando il disagio di decidere con ciò che ho già?`,
        },
      },
      emotion: {
        red: {
          triggers: [
            `L'incompetenza o la pigrizia visibile negli altri`,
            `La deliberazione infinita e l'indecisione`,
            `Essere messo in discussione o sfidato in pubblico`,
            `L'inefficienza e lo sforzo sprecato`,
          ],
          warning: [
            `La voce si alza o diventa più tagliente e secca`,
            `Inizi a completare le frasi degli altri`,
            `Il sarcasmo o il tono sprezzante entra nella tua voce`,
            `Ti sporgi fisicamente o ti impossessi dello spazio della conversazione`,
          ],
          recovery: [
            `Movimento fisico: una breve camminata interrompe il ciclo di attivazione.`,
            `Completa un piccolo compito concreto per ripristinare il senso di controllo e slancio.`,
            `Nomina ciò che provi prima di rispondere: è frustrazione per il ritmo, non per la persona.`,
          ],
          practice: `Prima di rispondere quando sei attivato: un respiro deliberato, poi chiediti: è urgente, o solo scomodo per me in questo momento?`,
        },
        yellow: {
          triggers: [
            `Essere ignorato, liquidato o interrotto mentre parli`,
            `La noia e la ripetizione senza varietà né novità`,
            `Il conflitto che sembra personale o che attacca la relazione`,
            `Sentirti costretto, microgestito o sottovalutato`,
          ],
          warning: [
            `Parlare più in fretta e saltare tra i temi a metà frase`,
            `Prendere impegni che non hai pensato bene`,
            `Usare umorismo o energia per sviare un punto serio o difficile`,
            `Un'energia che si legge come una performance più che presenza autentica`,
          ],
          recovery: [
            `Connessione sociale: una breve conversazione con qualcuno di cui ti fidi ti ancora in fretta.`,
            `Scrivi le tre cose che contano davvero adesso invece di tutto.`,
            `Abbassa deliberatamente il tono: rallenta il respiro, riduci il ritmo, crea una pausa.`,
          ],
          practice: `Dopo ogni riunione importante: scrivi un impegno concreto con una data precisa e una persona responsabile con nome e cognome.`,
        },
        green: {
          triggers: [
            `Il conflitto diretto o il confronto pubblico`,
            `Il cambiamento improvviso senza consultazione né preavviso`,
            `Essere spinto o messo sotto pressione a decidere in fretta`,
            `La critica fatta davanti agli altri`,
          ],
          warning: [
            `Restare in silenzio in riunioni in cui di solito contribuisci`,
            `Essere d'accordo ad alta voce mentre dentro senti il contrario`,
            `Diventare passivo o ritirarti dolcemente dalla conversazione`,
            `Il risentimento che cresce lentamente sotto una superficie calma e accomodante`,
          ],
          recovery: [
            `Tempo tranquillo da solo per elaborare: costringerti a parlare prima di essere pronto raramente porta a qualcosa di produttivo.`,
            `Una conversazione individuale di fiducia che faccia emergere ciò che pensi davvero.`,
            `Un passo successivo chiaro e semplice per creare movimento e ripristinare il senso di iniziativa.`,
          ],
          practice: `Nella tua prossima situazione difficile: nomina il tuo punto di vista onesto ad alta voce, prima di nominare quello dell'altra persona.`,
        },
        blue: {
          triggers: [
            `La sciatteria, l'imprecisione o le scorciatoie sulla qualità`,
            `Che ti chiedano di impegnarti prima di sentirti con abbastanza informazioni`,
            `L'entusiasmo e la propaganda non sostenuti da prove`,
            `La pressione emotiva a essere d'accordo quando la logica non lo sostiene ancora`,
          ],
          warning: [
            `Diventare progressivamente più silenzioso col procedere della riunione`,
            `Segnalare sempre più rischi invece di impegnarti nelle soluzioni`,
            `Ritirarti dalla discussione di gruppo verso appunti o analisi private`,
            `Il tono diventa secco e puramente fattuale, perdendo ogni calore e connessione`,
          ],
          recovery: [
            `Scrivi i fatti che già conosci: questo spezza la spirale di incertezza e impotenza.`,
            `Restringi la domanda: non cosa dovremmo fare, ma qual è l'unica decisione che devo prendere adesso.`,
            `Una breve pausa fisica: cinque minuti lontano dallo schermo resettano il ciclo di analisi.`,
          ],
          practice: `Trova una decisione questa settimana in cui hai il 70% delle informazioni che vuoi, e prendila senza aspettare il restante 30%.`,
        },
      },
      influence: {
        red: {
          yellow: {
            challenge: `La tua schiettezza taglia l'energia e il flusso di idee del Giallo: si sente zittito invece che incluso.`,
            adapt: `Inizia con entusiasmo e collega l'idea a una visione più ampia prima di arrivare a una decisione.`,
            phrase: `Adoro dove potrebbe arrivare: ecco il punto essenziale così puoi aiutarmi a darle forma.`,
          },
          green: {
            challenge: `Il tuo ritmo e la tua schiettezza travolgono il Verde, che ha bisogno di tempo e calore prima di potersi impegnare davvero.`,
            adapt: `Rallenta deliberatamente, costruisci prima la relazione, chiedi prima di affermare.`,
            phrase: `Nessuna fretta: qual è la tua opinione sincera su questo?`,
          },
          blue: {
            challenge: `Tu vuoi decidere in fretta; il Blu non si impegnerà senza essere soddisfatto delle prove.`,
            adapt: `Porta i dati, presenta la tua analisi e dagli tempo di verificare prima di aspettarti una decisione.`,
            phrase: `Ecco le prove da cui parto: quali domande ti suscitano?`,
          },
        },
        yellow: {
          red: {
            challenge: `Il tuo entusiasmo e le tue storie perdono in fretta il Rosso: gli serve il punto essenziale, non il viaggio.`,
            adapt: `Inizia con l'esito e la decisione richiesta; taglia la narrazione; lascialo scegliere.`,
            phrase: `In sintesi: ecco cosa propongo, perché vince e cosa mi serve da te.`,
          },
          green: {
            challenge: `La tua grande energia e il tuo ritmo possono travolgere il Verde: gli serve calore e spazio autentico, non intensità.`,
            adapt: `Scaldati prima sul piano personale, adegua il suo ritmo e verifica prima di lanciarti nella proposta.`,
            phrase: `Prima di condividere il mio pensiero, mi piacerebbe davvero ascoltare il tuo per primo.`,
          },
          blue: {
            challenge: `Il tuo ottimismo senza prove perde del tutto il Blu: l'entusiasmo non sostituisce i dati.`,
            adapt: `Vieni preparato con le prove, riconosci onestamente i rischi e lascialo analizzare prima di impegnarsi.`,
            phrase: `Ecco i dati che lo sostengono: prenditi tutto il tempo che ti serve per esaminarli bene.`,
          },
        },
        green: {
          red: {
            challenge: `Il tuo approccio attento e delicato si legge come indecisione o mancanza di convinzione per il Rosso: si disimpegna in fretta.`,
            adapt: `Sii diretto e chiaro, inizia dal punto essenziale, fai una proposta concreta invece di un suggerimento aperto.`,
            phrase: `Voglio essere diretto: ecco cosa propongo e perché credo sia giusto.`,
          },
          yellow: {
            challenge: `Il tuo ritmo misurato e la tua riservatezza non corrispondono all'energia del Giallo: interpreta la tua calma come disimpegno.`,
            adapt: `Adegua deliberatamente la sua energia, connettiti sulla dimensione umana dell'idea, mostra entusiasmo visibile.`,
            phrase: `Questo mi entusiasma davvero, ed ecco perché conta per la squadra.`,
          },
          blue: {
            challenge: `Il tuo focus relazionale può sembrare impreciso o poco rigoroso per il Blu.`,
            adapt: `Sostieni la tua posizione con la logica, struttura il tuo ragionamento con chiarezza e porta prove accanto alla prospettiva.`,
            phrase: `Ci ho pensato con attenzione: ecco l'argomentazione strutturata a favore.`,
          },
        },
        blue: {
          red: {
            challenge: `Il tuo dettaglio e il tuo processo perdono subito il Rosso: smette di ascoltare prima che tu arrivi al punto.`,
            adapt: `Conclusione prima: enuncia la tua conclusione all'inizio, tieni i dati di supporto pronti come riserva, non partire mai da quelli.`,
            phrase: `Sintesi rapida: la raccomandazione e le due ragioni chiave; il dettaglio è disponibile se ti serve.`,
          },
          yellow: {
            challenge: `La tua analisi strutturata sembra arida e demoralizzante per il Giallo: si disimpegna prima che tu arrivi all'intuizione.`,
            adapt: `Apri con visione e possibilità, porta calore autentico, usa una storia convincente prima dell'analisi.`,
            phrase: `Questa potrebbe essere una cosa importante, e i dati ne fanno un caso convincente.`,
          },
          green: {
            challenge: `La tua riservatezza emotiva si legge come fredda o distante, anche quando la tua intenzione è riflessiva e attenta.`,
            adapt: `Mostra prima un interesse autentico per la sua prospettiva e riconosci la relazione prima della logica.`,
            phrase: `Tengo davvero alla tua opinione su questo prima di condividere ciò che ho trovato: qual è la tua lettura sincera?`,
          },
        },
      },
      results: {
        title: `Il tuo profilo di colori`,
        titleNamed: `Profilo di colori — {name}`,
        sub: `Colore primario: {colour} ({pct}%). La tua miscela completa e gli spunti personalizzati appaiono sotto.`,
        you: `Tu`,
        compTitle: `La tua composizione di colori`,
        profileTag: `IL TUO PROFILO DI COLORI · {archetype}`,
        profileTitleBlend: `Miscela {primary} / {secondary}`,
        profileTitleLed: `Profilo guidato dal {primary}`,
        narrStrong: `{who} guidi con forza col {primary} ({p}%): l'energia di {archetype} plasma il tuo stile predefinito.`,
        narrEven: `{who} mostri una miscela equilibrata {primary}/{secondary} ({p}% / {s}%): ti muovi tra le due modalità a seconda del contesto e della posta in gioco.`,
        narrSecondary: `{who} sei principalmente {primary} ({p}%) con un {secondary} secondario significativo ({s}%).`,
        tiers: { dominant: `Dominante`, secondary: `Secondario`, minor: `Minore`, low: `Basso` },
        saTitle: `Consapevolezza di sé`,
        saSub: `I tuoi punti di forza naturali, i comportamenti ombra e i punti ciechi`,
        saStrengths: `I tuoi punti di forza naturali`,
        saShadow: `La tua ombra sotto stress`,
        saBlind: `Punti ciechi da sorvegliare`,
        ecTitle: `Controllo emotivo`,
        ecSub: `I tuoi fattori scatenanti, i segnali d'allarme precoci e le mosse di recupero`,
        ecTriggers: `Cosa ti fa scattare`,
        ecWarning: `Segnali d'allarme precoci`,
        ecRecovery: `Mosse di recupero e pratica quotidiana`,
        infTitle: `Influenzare gli altri colori`,
        infSub: `La tua sfida più grande e come adattarti per ogni colore con cui lavori`,
        infChallenge: `La sfida`,
        infAdapt: `Come adattarti`,
        colourTag: `{name} — {archetype}`,
        retake: `Ripeti la valutazione`,
        print: `Stampa / Salva come PDF`,
      },
      footer: `Programma di preparazione alla leadership · Autovalutazione dei colori: uno specchio per crescere, non una scatola in cui rinchiuderti.`,
    },
  },

  fr: {
    self: {
      meta: {
        title: `Auto-évaluation des couleurs`,
        description: `Découvrez votre équilibre de couleurs et ce qu'il signifie pour votre conscience de soi, votre régulation émotionnelle et votre adaptation à chacune des autres couleurs.`,
      },
      header: {
        eyebrow: `CONSCIENCE DE SOI ET INTELLIGENCE ÉMOTIONNELLE`,
        title: `Auto-évaluation des couleurs`,
        lead: `Découvrez votre propre équilibre de couleurs et comprenez ce qu'il signifie pour votre conscience de soi, votre régulation émotionnelle et vos plus grands défis d'adaptation avec chacune des autres couleurs.`,
      },
      notice: `<b>Évaluez-vous honnêtement.</b> Chaque affirmation apparaît dans un ordre aléatoire, la couleur masquée. Évaluez à quel point elle décrit votre tendance naturelle, pas votre meilleur jour ni ce à quoi vous aspirez. Le profil et toutes les recommandations n'apparaissent qu'à la révélation.`,
      nameLabel: `Votre nom (facultatif)`,
      namePlaceholder: `p. ex. Alex, pour un rapport personnalisé`,
      nameHint: `Utilisez les curseurs pour montrer à quel point chaque affirmation vous décrit. Un score de 0 signifie qu'elle ne vous décrit pas du tout ; 100 qu'elle vous décrit parfaitement.`,
      rateTitle: `Évaluez les affirmations`,
      rateSub: `Les couleurs sont masquées et les options mélangées : évaluez ce qui vous semble vrai, pas ce qui sonne bien`,
      notRated: `Pas encore évalué`,
      splitCap: `Comment vos évaluations se répartissent sur cet aspect (= 100 %)`,
      progress: `{n} sur {total} aspects évalués`,
      reveal: `Révéler mon profil`,
      colours: {
        red: { name: `Rouge`, archetype: `Le Meneur` },
        yellow: { name: `Jaune`, archetype: `L'Inspirateur` },
        green: { name: `Vert`, archetype: `Le Soutien` },
        blue: { name: `Bleu`, archetype: `L'Analyste` },
      },
      questions: {
        work: {
          aspect: `Comment je travaille`,
          prompt: `Qu'est-ce qui décrit le mieux votre style de travail naturel ?`,
          options: {
            red: `J'aime prendre les choses en main, donner le rythme et faire avancer les choses avec décision.`,
            yellow: `J'aime collaborer, partager des idées et dynamiser les personnes autour de moi.`,
            green: `Je préfère travailler de façon régulière, bâtir la confiance et soutenir l'équipe.`,
            blue: `J'aime planifier avec soin, garantir la qualité et analyser avant d'agir.`,
          },
        },
        pressure: {
          aspect: `Sous pression`,
          prompt: `Quand le stress est élevé, comment réagissez-vous naturellement ?`,
          options: {
            red: `Je deviens plus direct et je pousse plus fort : les résultats comptent avant tout.`,
            yellow: `Je cherche des personnes avec qui réfléchir et je cherche des solutions créatives.`,
            green: `Je me tais, je traite en moi-même et j'ai besoin de temps avant de répondre.`,
            blue: `Je creuse davantage les données et je cherche plus d'informations avant de décider.`,
          },
        },
        comms: {
          aspect: `Communication`,
          prompt: `Comment vous exprimez-vous naturellement ?`,
          options: {
            red: `Je vais droit au but : direct, bref et centré sur les résultats.`,
            yellow: `Je communique avec énergie et récits, de façon personnelle et engageante.`,
            green: `Je suis chaleureux et patient, soucieux de préserver la relation dans tout ce que je dis.`,
            blue: `Je suis précis et structuré, présentant les faits et le raisonnement avec clarté.`,
          },
        },
        decisions: {
          aspect: `Prendre des décisions`,
          prompt: `Comment abordez-vous une décision importante ?`,
          options: {
            red: `Je décide vite avec l'information dont je dispose : la vitesse et l'élan comptent.`,
            yellow: `Je consulte les autres et je suis mon instinct quand l'énergie est bonne.`,
            green: `Je cherche le consensus et je prends le temps de considérer l'impact sur chacun.`,
            blue: `Je rassemble toutes les données disponibles et j'y réfléchis méthodiquement avant de m'engager.`,
          },
        },
        motivation: {
          aspect: `Ce qui me motive`,
          prompt: `Qu'est-ce qui vous motive vraiment au travail ?`,
          options: {
            red: `Atteindre des résultats, gagner et maîtriser les issues.`,
            yellow: `La reconnaissance, le lien, la variété et l'excitation des idées nouvelles.`,
            green: `L'harmonie, la stabilité et savoir que l'équipe est soutenue et valorisée.`,
            blue: `La précision, la maîtrise, la structure et livrer un travail d'une qualité constante.`,
          },
        },
        conflict: {
          aspect: `Gérer le conflit`,
          prompt: `En cas de véritable désaccord, comment réagissez-vous généralement ?`,
          options: {
            red: `Je l'aborde directement et je dis ce que je pense, même si cela crée des frictions.`,
            yellow: `Je détourne avec humour ou énergie pour garder une ambiance positive.`,
            green: `J'absorbe la tension en silence et j'évite la confrontation pour préserver la paix.`,
            blue: `Je me retire et j'analyse la situation avant de décider si et comment intervenir.`,
          },
        },
        feedback: {
          aspect: `Recevoir un retour`,
          prompt: `Comment réagissez-vous généralement à un retour critique ?`,
          options: {
            red: `J'écoute ce qui est utile, je l'évalue vite et je passe à autre chose.`,
            yellow: `Je le prends d'abord personnellement mais je récupère vite et trouve l'angle positif.`,
            green: `Je le ressens profondément, je peux acquiescer même en désaccord, et je le traite lentement.`,
            blue: `Je l'analyse soigneusement pour l'exactitude et l'équité avant de l'accepter ou de le rejeter.`,
          },
        },
        strength: {
          aspect: `Votre plus grande contribution`,
          prompt: `Qu'est-ce que les gens disent le plus fidèlement être votre plus grande valeur pour une équipe ?`,
          options: {
            red: `Faire aboutir les choses : je livre des résultats même sous pression.`,
            yellow: `Apporter de l'énergie et rassembler l'équipe autour d'une vision commune.`,
            green: `Être l'ancre stable : fiable, calme et toujours digne de confiance.`,
            blue: `Garantir la rigueur : trouver le défaut, la faille ou le risque que les autres manquent.`,
          },
        },
      },
      self: {
        red: {
          strengths: [
            `Décidé et orienté action : vous créez de l'élan quand les autres hésitent.`,
            `Communicateur direct : les gens savent toujours où ils en sont avec vous.`,
            `Grande énergie et allant : vous vous imposez, à vous et aux autres, un haut niveau d'exigence.`,
          ],
          shadow: [
            `Sous pression : vous devenez contrôlant, brusque et impatient.`,
            `Vous pouvez négliger l'impact émotionnel de votre franchise sur les autres.`,
            `Vous pouvez confondre vitesse et qualité : décider vite n'est pas toujours décider bien.`,
          ],
          blindSpots: [
            `Comment votre franchise atterrit sur des personnes ayant moins de pouvoir ou d'autorité que vous.`,
            `Le coût de votre impatience sur la sécurité psychologique de votre équipe.`,
            `Les décisions que vous avez précipitées et qui ont ensuite demandé plus de délibération.`,
          ],
          question: `Vais-je vite parce que c'est vraiment le bon rythme, ou parce que l'incertitude de l'attente me met mal à l'aise ?`,
        },
        yellow: {
          strengths: [
            `Inspirant et stimulant : vous donnez envie aux gens de faire partie de ce que vous faites.`,
            `Créatif et optimiste : vous voyez le possible là où d'autres voient des problèmes.`,
            `Relationnel par nature : vous créez vite du lien et de la chaleur dans les équipes.`,
          ],
          shadow: [
            `Sous pression : vous vous dispersez, promettez trop et perdez le suivi.`,
            `Votre enthousiasme peut sembler peu fiable aux collègues analytiques ou axés résultats.`,
            `Vous pouvez éviter les vérités difficiles pour préserver l'énergie positive de la pièce.`,
          ],
          blindSpots: [
            `Les engagements que vous avez pris et qui ont discrètement disparu de votre radar.`,
            `Comment votre énergie et votre rythme peuvent submerger les collègues plus discrets.`,
            `L'écart entre à quel point vous vous sentez inspiré et ce qui est réellement livré.`,
          ],
          question: `Suis-je enthousiaste parce que c'est vraiment la bonne chose, ou parce que l'idée m'excite et que j'évite la discipline qu'elle exige ?`,
        },
        green: {
          strengths: [
            `Fiable, loyal et digne de confiance : la personne sur qui l'équipe compte.`,
            `Patient et vraiment empathique : les gens se sentent entendus et en sécurité à vos côtés.`,
            `Une présence stabilisante sous pression : votre calme devient le calme de toute l'équipe.`,
          ],
          shadow: [
            `Sous pression : vous vous taisez, évitez le conflit et couvez du ressentiment en silence.`,
            `Vous acquiescez souvent en réunion et êtes en désaccord en privé : votre silence trompe les autres.`,
            `Votre complaisance peut priver l'équipe de la friction honnête dont elle a réellement besoin.`,
          ],
          blindSpots: [
            `Comment votre silence est lu comme un accord, même quand il ne l'est pas.`,
            `Le coût à long terme d'avaler le désaccord et la déception non dite.`,
            `Comment votre évitement du conflit vous protège parfois plus que la relation.`,
          ],
          question: `Suis-je patient parce que la situation l'exige vraiment, ou est-ce que j'évite une conversation que je sais devoir avoir ?`,
        },
        blue: {
          strengths: [
            `Analytique et précis : vous repérez ce que les autres manquent.`,
            `Des exigences élevées qui protègent constamment la qualité de toute l'équipe.`,
            `Structuré et fiable : vos plans et analyses résistent à l'examen.`,
          ],
          shadow: [
            `Sous pression : vous devenez hypercritique, replié et sujet à la paralysie par l'analyse.`,
            `Votre réserve émotionnelle peut sembler indifférence ou froideur, même quand cela vous tient vraiment à cœur.`,
            `Vos exigences peuvent ralentir l'équipe : toute décision ne mérite pas le même niveau de rigueur.`,
          ],
          blindSpots: [
            `Comment votre silence en réunion est mal lu comme désapprobation ou désengagement.`,
            `La dimension émotionnelle de situations que vous analysez comme de purs problèmes logiques.`,
            `Le schéma de chercher plus de données pour repousser l'inconfort de s'engager.`,
          ],
          question: `Est-ce que je rassemble plus d'informations parce que j'en ai vraiment besoin, ou parce que je repousse l'inconfort de décider avec ce que j'ai déjà ?`,
        },
      },
      emotion: {
        red: {
          triggers: [
            `L'incompétence ou la paresse visible chez les autres`,
            `La délibération sans fin et l'indécision`,
            `Être questionné ou défié en public`,
            `L'inefficacité et l'effort gaspillé`,
          ],
          warning: [
            `La voix monte ou devient plus vive et sèche`,
            `Vous commencez à finir les phrases des autres`,
            `Le sarcasme ou le mépris entre dans votre ton`,
            `Vous vous penchez physiquement ou accaparez l'espace de la conversation`,
          ],
          recovery: [
            `Le mouvement physique : une courte marche interrompt le cycle d'activation.`,
            `Accomplissez une petite tâche concrète pour retrouver un sentiment de contrôle et d'élan.`,
            `Nommez ce que vous ressentez avant de répondre : c'est la frustration face au rythme, pas à la personne.`,
          ],
          practice: `Avant de répondre quand vous êtes déclenché : une respiration délibérée, puis demandez-vous : est-ce urgent, ou juste inconfortable pour moi en ce moment ?`,
        },
        yellow: {
          triggers: [
            `Être ignoré, écarté ou interrompu`,
            `L'ennui et la répétition sans variété ni nouveauté`,
            `Le conflit qui semble personnel ou attaque la relation`,
            `Se sentir contraint, micromanagé ou sous-estimé`,
          ],
          warning: [
            `Parler plus vite et sauter d'un sujet à l'autre en pleine phrase`,
            `Prendre des engagements que vous n'avez pas bien réfléchis`,
            `Utiliser l'humour ou l'énergie pour détourner un point sérieux ou difficile`,
            `Une énergie qui se lit comme une performance plutôt qu'une présence authentique`,
          ],
          recovery: [
            `Le lien social : une brève conversation avec une personne de confiance vous ancre vite.`,
            `Notez les trois choses qui comptent vraiment maintenant plutôt que tout.`,
            `Baissez délibérément le ton : ralentissez votre respiration, réduisez votre rythme, créez une pause.`,
          ],
          practice: `Après chaque réunion importante : notez un engagement concret avec une date précise et une personne responsable nommée.`,
        },
        green: {
          triggers: [
            `Le conflit direct ou la confrontation publique`,
            `Le changement soudain sans consultation ni avertissement`,
            `Être poussé ou pressé de décider vite`,
            `La critique formulée devant les autres`,
          ],
          warning: [
            `Se taire dans des réunions où vous contribuez d'habitude`,
            `Acquiescer à voix haute tout en ressentant l'inverse au fond`,
            `Devenir passif ou vous retirer doucement de la conversation`,
            `Le ressentiment qui monte lentement sous une surface calme et conciliante`,
          ],
          recovery: [
            `Du temps au calme pour traiter : vous forcer à parler avant d'être prêt mène rarement à quelque chose de productif.`,
            `Une conversation individuelle de confiance qui fait émerger ce que vous pensez vraiment.`,
            `Une étape suivante claire et simple pour créer du mouvement et retrouver un sentiment d'initiative.`,
          ],
          practice: `Dans votre prochaine situation difficile : nommez votre point de vue honnête à voix haute, avant de nommer celui de l'autre.`,
        },
        blue: {
          triggers: [
            `Le laisser-aller, l'imprécision ou les raccourcis sur la qualité`,
            `Qu'on vous demande de vous engager avant d'avoir assez d'informations`,
            `L'emballement et l'enthousiasme non étayés par des preuves`,
            `La pression émotionnelle d'acquiescer quand la logique ne le soutient pas encore`,
          ],
          warning: [
            `Devenir progressivement plus silencieux à mesure que la réunion avance`,
            `Pointer de plus en plus de risques au lieu de vous engager dans les solutions`,
            `Vous retirer de la discussion de groupe vers des notes ou analyses privées`,
            `Le ton devient sec et purement factuel, perdant toute chaleur et tout lien`,
          ],
          recovery: [
            `Notez les faits que vous connaissez déjà : cela brise la spirale d'incertitude et d'impuissance.`,
            `Resserrez la question : non pas que devrions-nous faire, mais quelle est la seule décision que je dois prendre maintenant.`,
            `Une brève pause physique : cinq minutes loin de l'écran réinitialisent la boucle d'analyse.`,
          ],
          practice: `Trouvez une décision cette semaine pour laquelle vous avez 70 % de l'information souhaitée, et prenez-la sans attendre les 30 % restants.`,
        },
      },
      influence: {
        red: {
          yellow: {
            challenge: `Votre franchise coupe l'énergie et le flot d'idées du Jaune : il se sent réduit au silence plutôt qu'inclus.`,
            adapt: `Commencez par l'enthousiasme et reliez l'idée à une vision plus large avant d'arriver à une décision.`,
            phrase: `J'adore où cela pourrait mener : voici l'essentiel pour que vous puissiez aider à le façonner.`,
          },
          green: {
            challenge: `Votre rythme et votre franchise submergent le Vert, qui a besoin de temps et de chaleur avant de vraiment s'impliquer.`,
            adapt: `Ralentissez délibérément, bâtissez d'abord la relation, demandez avant d'affirmer.`,
            phrase: `Aucune urgence : quel est votre avis sincère là-dessus ?`,
          },
          blue: {
            challenge: `Vous voulez décider vite ; le Bleu ne s'engagera pas sans être satisfait des preuves.`,
            adapt: `Apportez les données, présentez votre analyse et laissez-lui le temps de vérifier avant d'attendre une décision.`,
            phrase: `Voici les preuves sur lesquelles je m'appuie : quelles questions cela soulève-t-il pour vous ?`,
          },
        },
        yellow: {
          red: {
            challenge: `Votre enthousiasme et vos récits perdent vite le Rouge : il lui faut l'essentiel, pas le voyage.`,
            adapt: `Commencez par l'issue et la décision requise ; coupez le récit ; laissez-le choisir.`,
            phrase: `En résumé : voici ce que je propose, pourquoi ça gagne et ce dont j'ai besoin de vous.`,
          },
          green: {
            challenge: `Votre grande énergie et votre rythme peuvent submerger le Vert : il lui faut de la chaleur et un vrai espace, pas de l'intensité.`,
            adapt: `Réchauffez d'abord sur le plan personnel, calez-vous sur son rythme et vérifiez avant de vous lancer dans le pitch.`,
            phrase: `Avant de partager mon idée, j'aimerais vraiment entendre la vôtre d'abord.`,
          },
          blue: {
            challenge: `Votre optimisme sans preuves perd complètement le Bleu : l'enthousiasme ne remplace pas les données.`,
            adapt: `Venez préparé avec des preuves, reconnaissez honnêtement les risques et laissez-le analyser avant de s'engager.`,
            phrase: `Voici les données qui l'étayent : prenez le temps qu'il vous faut pour bien les examiner.`,
          },
        },
        green: {
          red: {
            challenge: `Votre approche prudente et douce se lit comme de l'indécision ou un manque de conviction pour le Rouge : il décroche vite.`,
            adapt: `Soyez direct et clair, commencez par l'essentiel, faites une proposition concrète plutôt qu'une suggestion ouverte.`,
            phrase: `Je veux être direct : voici ce que je propose et pourquoi je crois que c'est juste.`,
          },
          yellow: {
            challenge: `Votre rythme mesuré et votre réserve ne correspondent pas à l'énergie du Jaune : il interprète votre calme comme du désengagement.`,
            adapt: `Calez-vous délibérément sur son énergie, connectez sur la dimension humaine de l'idée, montrez un enthousiasme visible.`,
            phrase: `Cela m'enthousiasme vraiment, et voici pourquoi c'est important pour l'équipe.`,
          },
          blue: {
            challenge: `Votre focus relationnel peut sembler imprécis ou insuffisamment rigoureux pour le Bleu.`,
            adapt: `Étayez votre position par la logique, structurez votre argument clairement et apportez des preuves aux côtés de la perspective.`,
            phrase: `J'y ai réfléchi soigneusement : voici l'argumentaire structuré en sa faveur.`,
          },
        },
        blue: {
          red: {
            challenge: `Votre détail et votre processus perdent aussitôt le Rouge : il cesse d'écouter avant que vous n'arriviez à votre point.`,
            adapt: `Conclusion d'abord : énoncez votre conclusion au début, gardez les données d'appui prêtes en réserve, ne commencez jamais par elles.`,
            phrase: `Résumé rapide : la recommandation et les deux raisons clés ; le détail est disponible si besoin.`,
          },
          yellow: {
            challenge: `Votre analyse structurée semble aride et décourageante pour le Jaune : il décroche avant que vous n'arriviez à l'idée clé.`,
            adapt: `Ouvrez sur la vision et le possible, apportez une chaleur authentique, utilisez un récit convaincant avant l'analyse.`,
            phrase: `Cela pourrait être quelque chose d'important, et les données en font un argument convaincant.`,
          },
          green: {
            challenge: `Votre réserve émotionnelle se lit comme froide ou distante, même quand votre intention est réfléchie et attentionnée.`,
            adapt: `Montrez d'abord un intérêt sincère pour sa perspective et reconnaissez la relation avant la logique.`,
            phrase: `Je tiens vraiment à votre avis là-dessus avant de partager ce que j'ai trouvé : quelle est votre lecture honnête ?`,
          },
        },
      },
      results: {
        title: `Votre profil de couleurs`,
        titleNamed: `Profil de couleurs — {name}`,
        sub: `Couleur principale : {colour} ({pct} %). Votre mélange complet et vos éclairages personnalisés apparaissent ci-dessous.`,
        you: `Vous`,
        compTitle: `Votre composition de couleurs`,
        profileTag: `VOTRE PROFIL DE COULEURS · {archetype}`,
        profileTitleBlend: `Mélange {primary} / {secondary}`,
        profileTitleLed: `Profil mené par le {primary}`,
        narrStrong: `{who} menez fortement avec le {primary} ({p} %) : l'énergie de {archetype} façonne votre style par défaut.`,
        narrEven: `{who} montrez un mélange équilibré {primary}/{secondary} ({p} % / {s} %) : vous passez d'un mode à l'autre selon le contexte et les enjeux.`,
        narrSecondary: `{who} êtes principalement {primary} ({p} %) avec un {secondary} secondaire significatif ({s} %).`,
        tiers: { dominant: `Dominant`, secondary: `Secondaire`, minor: `Mineur`, low: `Faible` },
        saTitle: `Conscience de soi`,
        saSub: `Vos forces naturelles, vos comportements d'ombre et vos angles morts`,
        saStrengths: `Vos forces naturelles`,
        saShadow: `Votre ombre sous stress`,
        saBlind: `Angles morts à surveiller`,
        ecTitle: `Contrôle émotionnel`,
        ecSub: `Vos déclencheurs, signaux d'alerte précoces et gestes de récupération`,
        ecTriggers: `Ce qui vous déclenche`,
        ecWarning: `Signaux d'alerte précoces`,
        ecRecovery: `Gestes de récupération et pratique quotidienne`,
        infTitle: `Influencer les autres couleurs`,
        infSub: `Votre plus grand défi et comment vous adapter à chaque couleur avec qui vous travaillez`,
        infChallenge: `Le défi`,
        infAdapt: `Comment vous adapter`,
        colourTag: `{name} — {archetype}`,
        retake: `Refaire l'évaluation`,
        print: `Imprimer / Enregistrer en PDF`,
      },
      footer: `Programme de préparation au leadership · Auto-évaluation des couleurs : un miroir pour grandir, pas une case où vous enfermer.`,
    },
  },

  pt: {
    self: {
      meta: {
        title: `Autoavaliação de cores`,
        description: `Descubra o seu equilíbrio de cores e o que significa para o seu autoconhecimento, a sua regulação emocional e a sua adaptação a cada uma das outras cores.`,
      },
      header: {
        eyebrow: `AUTOCONHECIMENTO E INTELIGÊNCIA EMOCIONAL`,
        title: `Autoavaliação de cores`,
        lead: `Descubra o seu próprio equilíbrio de cores e entenda o que significa para o seu autoconhecimento, a sua regulação emocional e os seus maiores desafios de adaptação com cada uma das outras cores.`,
      },
      notice: `<b>Avalie-se com honestidade.</b> Cada afirmação aparece em ordem aleatória com a cor oculta. Pontue o quanto descreve a sua tendência natural, não o seu melhor dia nem como aspira a ser. O perfil e todas as recomendações aparecem só quando revela.`,
      nameLabel: `O seu nome (opcional)`,
      namePlaceholder: `p. ex. Alex, para um relatório personalizado`,
      nameHint: `Use os controlos deslizantes para mostrar o quão fortemente cada afirmação o descreve. Um 0 significa que não o descreve de todo; 100 significa que o descreve perfeitamente.`,
      rateTitle: `Pontue as afirmações`,
      rateSub: `As cores estão ocultas e as opções são baralhadas: pontue o que sente verdadeiro, não o que soa bem`,
      notRated: `Ainda por pontuar`,
      splitCap: `Como as suas pontuações se repartem neste aspeto (= 100%)`,
      progress: `{n} de {total} aspetos pontuados`,
      reveal: `Revelar o meu perfil`,
      colours: {
        red: { name: `Vermelho`, archetype: `O Impulsionador` },
        yellow: { name: `Amarelo`, archetype: `O Inspirador` },
        green: { name: `Verde`, archetype: `O Apoiante` },
        blue: { name: `Azul`, archetype: `O Analista` },
      },
      questions: {
        work: {
          aspect: `Como trabalho`,
          prompt: `O que descreve melhor o seu estilo de trabalho natural?`,
          options: {
            red: `Gosto de assumir o comando, marcar o ritmo e fazer as coisas avançarem com decisão.`,
            yellow: `Gosto de colaborar, partilhar ideias e dar energia às pessoas à minha volta.`,
            green: `Prefiro trabalhar de forma constante, construir confiança e apoiar a equipa.`,
            blue: `Gosto de planear com cuidado, garantir a qualidade e analisar antes de agir.`,
          },
        },
        pressure: {
          aspect: `Sob pressão`,
          prompt: `Quando o stress é alto, como responde naturalmente?`,
          options: {
            red: `Torno-me mais direto e insisto com mais força: os resultados são o que mais importa.`,
            yellow: `Procuro pessoas com quem gerar ideias e busco soluções criativas.`,
            green: `Fico calado, processo internamente e preciso de tempo antes de responder.`,
            blue: `Aprofundo nos dados e procuro mais informação antes de decidir.`,
          },
        },
        comms: {
          aspect: `Comunicação`,
          prompt: `Como se expressa naturalmente?`,
          options: {
            red: `Vou direto ao assunto: direto, breve e focado nos resultados.`,
            yellow: `Comunico com energia e histórias, tornando-o pessoal e cativante.`,
            green: `Sou caloroso e paciente, cuidadoso em preservar a relação em tudo o que digo.`,
            blue: `Sou preciso e estruturado, apresentando factos e raciocínio com clareza.`,
          },
        },
        decisions: {
          aspect: `Tomar decisões`,
          prompt: `Como aborda uma decisão importante?`,
          options: {
            red: `Decido depressa com a informação que tenho: importam a velocidade e o ímpeto.`,
            yellow: `Consulto os outros e sigo o meu instinto quando a energia parece certa.`,
            green: `Procuro consenso e levo o meu tempo a considerar o impacto em todos.`,
            blue: `Reúno todos os dados disponíveis e penso metodicamente antes de me comprometer.`,
          },
        },
        motivation: {
          aspect: `O que me move`,
          prompt: `O que o motiva de verdade no trabalho?`,
          options: {
            red: `Alcançar resultados, vencer e ter o controlo dos desfechos.`,
            yellow: `O reconhecimento, a ligação, a variedade e a excitação das novas ideias.`,
            green: `A harmonia, a estabilidade e saber que a equipa está apoiada e valorizada.`,
            blue: `A exatidão, o domínio, a estrutura e entregar um trabalho de qualidade consistente.`,
          },
        },
        conflict: {
          aspect: `Lidar com o conflito`,
          prompt: `Quando há um desacordo genuíno, como costuma responder?`,
          options: {
            red: `Abordo-o diretamente e digo o que penso, mesmo que gere atrito.`,
            yellow: `Desvio-o com humor ou energia para manter o ambiente positivo.`,
            green: `Absorvo a tensão em silêncio e evito o confronto para manter a paz.`,
            blue: `Retiro-me e analiso a situação antes de decidir se e como intervir.`,
          },
        },
        feedback: {
          aspect: `Receber feedback`,
          prompt: `Como costuma responder a feedback crítico?`,
          options: {
            red: `Escuto o que é útil, avalio-o depressa e sigo em frente.`,
            yellow: `No início levo a peito, mas recupero depressa e encontro o lado positivo.`,
            green: `Sinto-o profundamente, posso concordar mesmo discordando, e processo-o devagar.`,
            blue: `Analiso-o com cuidado quanto a exatidão e justiça antes de o aceitar ou rejeitar.`,
          },
        },
        strength: {
          aspect: `O seu maior contributo`,
          prompt: `O que as pessoas mais fielmente dizem ser o seu maior valor para uma equipa?`,
          options: {
            red: `Pôr as coisas a andar: entrego resultados mesmo sob pressão.`,
            yellow: `Trazer energia e unir a equipa em torno de uma visão partilhada.`,
            green: `Ser a âncora estável: fiável, calmo e sempre de confiança.`,
            blue: `Assegurar o rigor: encontrar a falha, a lacuna ou o risco que os outros não veem.`,
          },
        },
      },
      self: {
        red: {
          strengths: [
            `Decidido e orientado à ação: cria ímpeto quando os outros hesitam.`,
            `Comunicador direto: as pessoas sabem sempre onde estão consigo.`,
            `Muita energia e garra: exige um padrão alto de si e dos outros.`,
          ],
          shadow: [
            `Sob pressão: torna-se controlador, brusco e impaciente.`,
            `Pode ignorar o impacto emocional da sua franqueza nos outros.`,
            `Pode confundir velocidade com qualidade: decidir depressa nem sempre é decidir bem.`,
          ],
          blindSpots: [
            `Como a sua franqueza cai sobre pessoas com menos poder ou autoridade do que você.`,
            `O custo da sua impaciência sobre a segurança psicológica da sua equipa.`,
            `As decisões que apressou e que depois se revelaram precisar de mais deliberação.`,
          ],
          question: `Vou depressa porque é genuinamente o ritmo certo, ou porque me incomoda a incerteza de esperar?`,
        },
        yellow: {
          strengths: [
            `Inspirador e estimulante: faz as pessoas quererem fazer parte do que faz.`,
            `Criativo e otimista: vê possibilidade onde outros veem problemas.`,
            `Relacional por natureza: cria ligação e calor nas equipas depressa.`,
          ],
          shadow: [
            `Sob pressão: dispersa-se, promete demais e perde o acompanhamento.`,
            `O seu entusiasmo pode parecer pouco fiável a colegas analíticos ou focados em resultados.`,
            `Pode evitar verdades difíceis para preservar a energia positiva da sala.`,
          ],
          blindSpots: [
            `Os compromissos que assumiu e que silenciosamente saíram do seu radar.`,
            `Como a sua energia e o seu ritmo podem sobrecarregar colegas mais calados.`,
            `A distância entre o quão inspirado se sente e o que é de facto entregue.`,
          ],
          question: `Estou entusiasmado porque isto é genuinamente o certo, ou porque a ideia me excita e evito a disciplina que exige?`,
        },
        green: {
          strengths: [
            `Fiável, leal e de confiança: a pessoa com quem a equipa conta.`,
            `Paciente e genuinamente empático: as pessoas sentem-se ouvidas e seguras consigo.`,
            `Uma presença estabilizadora sob pressão: a sua calma torna-se a calma de toda a equipa.`,
          ],
          shadow: [
            `Sob pressão: cala-se, evita o conflito e guarda ressentimento em silêncio.`,
            `Muitas vezes concorda na sala e discorda em privado: o seu silêncio engana os outros.`,
            `A sua condescendência pode privar a equipa do atrito honesto de que ela realmente precisa.`,
          ],
          blindSpots: [
            `Como o seu silêncio é lido como concordância, mesmo quando não é.`,
            `O custo a longo prazo de engolir o desacordo e a deceção não dita.`,
            `Como a sua evitação do conflito às vezes o protege mais a si do que à relação.`,
          ],
          question: `Estou a ser paciente porque a situação o pede de verdade, ou estou a evitar uma conversa que sei que tenho de ter?`,
        },
        blue: {
          strengths: [
            `Analítico e preciso: capta o que os outros não veem.`,
            `Padrões altos que protegem a qualidade de forma consistente em toda a equipa.`,
            `Estruturado e fiável: os seus planos e análises resistem ao escrutínio.`,
          ],
          shadow: [
            `Sob pressão: torna-se hipercrítico, retraído e propenso à paralisia por análise.`,
            `A sua reserva emocional pode parecer indiferença ou frieza, mesmo quando se importa de verdade.`,
            `Os seus padrões podem atrasar a equipa: nem toda decisão merece o mesmo nível de rigor.`,
          ],
          blindSpots: [
            `Como o seu silêncio nas reuniões é mal interpretado como desaprovação ou desinteresse.`,
            `A dimensão emocional de situações que analisa como puros problemas lógicos.`,
            `O padrão de procurar mais dados como forma de adiar o desconforto de se comprometer.`,
          ],
          question: `Estou a reunir mais informação porque de facto preciso dela, ou porque estou a adiar o desconforto de decidir com o que já tenho?`,
        },
      },
      emotion: {
        red: {
          triggers: [
            `A incompetência ou a preguiça visível nos outros`,
            `A deliberação sem fim e a indecisão`,
            `Ser questionado ou desafiado em público`,
            `A ineficiência e o esforço desperdiçado`,
          ],
          warning: [
            `A voz sobe ou torna-se mais aguda e cortante`,
            `Começa a completar as frases dos outros`,
            `O sarcasmo ou o desdém entra no seu tom`,
            `Inclina-se fisicamente ou toma conta do espaço da conversa`,
          ],
          recovery: [
            `Movimento físico: uma curta caminhada interrompe o ciclo de ativação.`,
            `Complete uma pequena tarefa concreta para recuperar a sensação de controlo e ímpeto.`,
            `Nomeie o que sente antes de responder: isto é frustração com o ritmo, não com a pessoa.`,
          ],
          practice: `Antes de responder quando é acionado: uma respiração deliberada, depois pergunte-se: isto é urgente, ou apenas desconfortável para mim neste momento?`,
        },
        yellow: {
          triggers: [
            `Ser ignorado, desvalorizado ou interrompido`,
            `O tédio e a repetição sem variedade nem novidade`,
            `O conflito que parece pessoal ou ataca a relação`,
            `Sentir-se limitado, microgerido ou subestimado`,
          ],
          warning: [
            `Falar mais depressa e saltar entre temas a meio da frase`,
            `Assumir compromissos que não pensou bem`,
            `Usar humor ou energia para desviar de um ponto sério ou difícil`,
            `Uma energia que se lê como atuação em vez de presença genuína`,
          ],
          recovery: [
            `Ligação social: uma breve conversa com alguém de confiança ancora-o depressa.`,
            `Escreva as três coisas que de facto importam agora em vez de tudo.`,
            `Baixe deliberadamente o tom: abrande a respiração, reduza o ritmo, crie uma pausa.`,
          ],
          practice: `Depois de cada reunião importante: escreva um compromisso concreto com uma data específica e uma pessoa responsável nomeada.`,
        },
        green: {
          triggers: [
            `O conflito direto ou o confronto público`,
            `A mudança repentina sem consulta nem aviso`,
            `Ser empurrado ou pressionado a decidir depressa`,
            `A crítica feita à frente dos outros`,
          ],
          warning: [
            `Ficar calado em reuniões onde normalmente contribui`,
            `Concordar em voz alta enquanto sente o contrário por dentro`,
            `Tornar-se passivo ou retirar-se suavemente da conversa`,
            `O ressentimento que cresce devagar sob uma superfície calma e condescendente`,
          ],
          recovery: [
            `Tempo tranquilo a sós para processar: forçar-se a falar antes de estar pronto raramente leva a algo produtivo.`,
            `Uma conversa individual de confiança que traga à tona o que de facto pensa.`,
            `Um passo seguinte claro e simples para criar movimento e recuperar a sensação de iniciativa.`,
          ],
          practice: `Na sua próxima situação difícil: nomeie a sua opinião honesta em voz alta, antes de nomear a da outra pessoa.`,
        },
        blue: {
          triggers: [
            `O desleixo, a imprecisão ou os atalhos na qualidade`,
            `Que lhe peçam para se comprometer antes de sentir que tem informação suficiente`,
            `O entusiasmo e a propaganda sem apoio em evidências`,
            `A pressão emocional para concordar quando a lógica ainda não o sustenta`,
          ],
          warning: [
            `Tornar-se progressivamente mais calado à medida que a reunião avança`,
            `Apontar cada vez mais riscos em vez de se envolver nas soluções`,
            `Retirar-se da discussão de grupo para notas ou análise privadas`,
            `O tom torna-se cortante e puramente factual, perdendo todo o calor e ligação`,
          ],
          recovery: [
            `Escreva os factos que já conhece: isto quebra a espiral de incerteza e impotência.`,
            `Estreite a pergunta: não o que deveríamos fazer, mas qual é a única decisão que preciso de tomar agora.`,
            `Uma breve pausa física: cinco minutos longe do ecrã reiniciam o ciclo de análise.`,
          ],
          practice: `Encontre uma decisão esta semana em que tenha 70% da informação que quer, e tome-a sem esperar pelos 30% restantes.`,
        },
      },
      influence: {
        red: {
          yellow: {
            challenge: `A sua franqueza corta a energia e o fluxo de ideias do Amarelo: sente-se calado em vez de incluído.`,
            adapt: `Comece com entusiasmo e ligue a ideia a uma visão mais ampla antes de chegar a uma decisão.`,
            phrase: `Adoro para onde isto pode ir: aqui está o essencial para que possa ajudar a moldá-lo.`,
          },
          green: {
            challenge: `O seu ritmo e a sua franqueza sobrecarregam o Verde, que precisa de tempo e calor antes de se poder envolver de verdade.`,
            adapt: `Abrande deliberadamente, construa primeiro a relação, pergunte antes de afirmar.`,
            phrase: `Sem pressa nenhuma: qual é a sua opinião sincera sobre isto?`,
          },
          blue: {
            challenge: `Você quer decidir depressa; o Azul não se compromete sem ficar satisfeito com as evidências.`,
            adapt: `Traga os dados, apresente a sua análise e dê-lhe tempo para verificar antes de esperar uma decisão.`,
            phrase: `Aqui está a evidência com que trabalho: que perguntas lhe suscita?`,
          },
        },
        yellow: {
          red: {
            challenge: `O seu entusiasmo e as suas histórias perdem depressa o Vermelho: precisa do essencial, não da viagem.`,
            adapt: `Comece pelo resultado e pela decisão necessária; corte a narrativa; deixe-o escolher.`,
            phrase: `Em resumo: aqui está o que proponho, porque vence e o que preciso de si.`,
          },
          green: {
            challenge: `A sua muita energia e o seu ritmo podem sobrecarregar o Verde: precisa de calor e espaço genuíno, não de intensidade.`,
            adapt: `Aqueça primeiro no pessoal, acompanhe o ritmo dele e confirme antes de se lançar na proposta.`,
            phrase: `Antes de partilhar a minha ideia, gostava mesmo de ouvir a sua primeiro.`,
          },
          blue: {
            challenge: `O seu otimismo sem evidências perde por completo o Azul: o entusiasmo não substitui os dados.`,
            adapt: `Venha preparado com evidências, reconheça os riscos com honestidade e deixe-o analisar antes de se comprometer.`,
            phrase: `Aqui estão os dados que o apoiam: leve o tempo que precisar para os rever bem.`,
          },
        },
        green: {
          red: {
            challenge: `A sua abordagem cuidadosa e suave lê-se como indecisão ou falta de convicção para o Vermelho: desliga-se depressa.`,
            adapt: `Seja direto e claro, comece pelo essencial, faça uma proposta concreta em vez de uma sugestão aberta.`,
            phrase: `Quero ser direto: aqui está o que proponho e porque acredito que está certo.`,
          },
          yellow: {
            challenge: `O seu ritmo comedido e a sua reserva não combinam com a energia do Amarelo: interpreta a sua calma como desinteresse.`,
            adapt: `Acompanhe deliberadamente a energia dele, ligue-se à dimensão humana da ideia, mostre entusiasmo visível.`,
            phrase: `Isto entusiasma-me mesmo, e aqui está porque importa para a equipa.`,
          },
          blue: {
            challenge: `O seu foco relacional pode parecer impreciso ou pouco rigoroso para o Azul.`,
            adapt: `Sustente a sua posição com lógica, estruture o seu argumento com clareza e traga evidências a par da perspetiva.`,
            phrase: `Pensei nisto com cuidado: aqui está o argumento estruturado a favor.`,
          },
        },
        blue: {
          red: {
            challenge: `O seu detalhe e o seu processo perdem logo o Vermelho: deixa de ouvir antes de chegar ao seu ponto.`,
            adapt: `Conclusão primeiro: enuncie a sua conclusão no início, tenha os dados de apoio prontos como reserva, nunca comece por eles.`,
            phrase: `Resumo rápido: a recomendação e as duas razões-chave; o detalhe está disponível se precisar.`,
          },
          yellow: {
            challenge: `A sua análise estruturada parece seca e desanimadora para o Amarelo: desliga-se antes de chegar à ideia-chave.`,
            adapt: `Abra com visão e possibilidade, traga calor genuíno, use uma história convincente antes da análise.`,
            phrase: `Isto podia ser algo importante, e os dados constroem um argumento convincente.`,
          },
          green: {
            challenge: `A sua reserva emocional lê-se como fria ou distante, mesmo quando a sua intenção é ponderada e atenciosa.`,
            adapt: `Mostre interesse genuíno pela perspetiva dele primeiro e reconheça a relação antes da lógica.`,
            phrase: `Valorizo mesmo a sua opinião sobre isto antes de partilhar o que descobri: qual é a sua leitura honesta?`,
          },
        },
      },
      results: {
        title: `O seu perfil de cores`,
        titleNamed: `Perfil de cores — {name}`,
        sub: `Cor principal: {colour} ({pct}%). A sua mistura completa e ideias personalizadas aparecem abaixo.`,
        you: `Você`,
        compTitle: `A sua composição de cores`,
        profileTag: `O SEU PERFIL DE CORES · {archetype}`,
        profileTitleBlend: `Mistura {primary} / {secondary}`,
        profileTitleLed: `Perfil liderado por {primary}`,
        narrStrong: `{who} lidera com força com {primary} ({p}%): a energia de {archetype} molda o seu estilo por defeito.`,
        narrEven: `{who} mostra uma mistura equilibrada {primary}/{secondary} ({p}% / {s}%): move-se entre os dois modos conforme o contexto e o que está em jogo.`,
        narrSecondary: `{who} é principalmente {primary} ({p}%) com um {secondary} secundário significativo ({s}%).`,
        tiers: { dominant: `Dominante`, secondary: `Secundário`, minor: `Menor`, low: `Baixo` },
        saTitle: `Autoconhecimento`,
        saSub: `As suas forças naturais, comportamentos de sombra e pontos cegos`,
        saStrengths: `As suas forças naturais`,
        saShadow: `A sua sombra sob stress`,
        saBlind: `Pontos cegos a vigiar`,
        ecTitle: `Controlo emocional`,
        ecSub: `Os seus gatilhos, sinais de alerta precoces e movimentos de recuperação`,
        ecTriggers: `O que o aciona`,
        ecWarning: `Sinais de alerta precoces`,
        ecRecovery: `Movimentos de recuperação e prática diária`,
        infTitle: `Influenciar as outras cores`,
        infSub: `O seu maior desafio e como se adaptar a cada cor com que trabalha`,
        infChallenge: `O desafio`,
        infAdapt: `Como se adaptar`,
        colourTag: `{name} — {archetype}`,
        retake: `Repetir a avaliação`,
        print: `Imprimir / Guardar como PDF`,
      },
      footer: `Programa de preparação para a liderança · Autoavaliação de cores: um espelho para crescer, não uma caixa onde se fechar.`,
    },
  },

  de: {
    self: {
      meta: {
        title: `Farben-Selbsteinschätzung`,
        description: `Entdecken Sie Ihre Farbbalance und was sie für Ihre Selbstwahrnehmung, Ihre emotionale Regulation und Ihre Anpassung an jede andere Farbe bedeutet.`,
      },
      header: {
        eyebrow: `SELBSTWAHRNEHMUNG UND EMOTIONALE INTELLIGENZ`,
        title: `Farben-Selbsteinschätzung`,
        lead: `Entdecken Sie Ihre eigene Farbbalance – und verstehen Sie, was sie für Ihre Selbstwahrnehmung, Ihre emotionale Regulation und Ihre größten Anpassungsherausforderungen mit jeder anderen Farbe bedeutet.`,
      },
      notice: `<b>Bewerten Sie sich ehrlich.</b> Jede Aussage erscheint in zufälliger Reihenfolge mit verborgener Farbe. Bewerten Sie, wie gut sie Ihre natürliche Grundtendenz beschreibt – nicht Ihren besten Tag und nicht, wie Sie sein möchten. Das Profil und alle Empfehlungen erscheinen erst, wenn Sie aufdecken.`,
      nameLabel: `Ihr Name (optional)`,
      namePlaceholder: `z. B. Alex, für einen personalisierten Bericht`,
      nameHint: `Nutzen Sie die Schieberegler, um zu zeigen, wie stark jede Aussage Sie beschreibt. 0 bedeutet, sie beschreibt Sie überhaupt nicht; 100 bedeutet, sie beschreibt Sie perfekt.`,
      rateTitle: `Bewerten Sie die Aussagen`,
      rateSub: `Die Farben sind verborgen und die Optionen gemischt – bewerten Sie, was sich wahr anfühlt, nicht was richtig klingt`,
      notRated: `Noch nicht bewertet`,
      splitCap: `Wie sich Ihre Bewertungen über diesen Aspekt verteilen (= 100 %)`,
      progress: `{n} von {total} Aspekten bewertet`,
      reveal: `Mein Profil aufdecken`,
      colours: {
        red: { name: `Rot`, archetype: `Der Macher` },
        yellow: { name: `Gelb`, archetype: `Der Inspirierende` },
        green: { name: `Grün`, archetype: `Der Unterstützer` },
        blue: { name: `Blau`, archetype: `Der Analytiker` },
      },
      questions: {
        work: {
          aspect: `Wie ich arbeite`,
          prompt: `Was beschreibt Ihren natürlichen Arbeitsstil am besten?`,
          options: {
            red: `Ich übernehme gern das Ruder, gebe das Tempo vor und bringe die Dinge entschlossen voran.`,
            yellow: `Ich arbeite gern zusammen, teile Ideen und begeistere die Menschen um mich herum.`,
            green: `Ich arbeite lieber beständig, baue Vertrauen auf und unterstütze das Team.`,
            blue: `Ich plane gern sorgfältig, sichere die Qualität und analysiere, bevor ich handle.`,
          },
        },
        pressure: {
          aspect: `Unter Druck`,
          prompt: `Wenn der Stress hoch ist, wie reagieren Sie natürlicherweise?`,
          options: {
            red: `Ich werde direkter und schiebe stärker an – Ergebnisse zählen am meisten.`,
            yellow: `Ich suche Menschen zum Ideensammeln und suche kreative Lösungen.`,
            green: `Ich werde still, verarbeite innerlich und brauche Zeit, bevor ich antworte.`,
            blue: `Ich grabe tiefer in die Daten und suche mehr Informationen, bevor ich entscheide.`,
          },
        },
        comms: {
          aspect: `Kommunikation`,
          prompt: `Wie drücken Sie sich natürlicherweise aus?`,
          options: {
            red: `Ich komme schnell auf den Punkt – direkt, kurz und auf Ergebnisse fokussiert.`,
            yellow: `Ich kommuniziere mit Energie und Geschichten, mache es persönlich und mitreißend.`,
            green: `Ich bin warm und geduldig, achtsam, in allem, was ich sage, die Beziehung zu wahren.`,
            blue: `Ich bin präzise und strukturiert und lege Fakten und Begründung klar dar.`,
          },
        },
        decisions: {
          aspect: `Entscheidungen treffen`,
          prompt: `Wie gehen Sie eine wichtige Entscheidung an?`,
          options: {
            red: `Ich entscheide schnell mit den Informationen, die ich habe – Tempo und Schwung zählen.`,
            yellow: `Ich frage andere und folge meinem Instinkt, wenn die Energie stimmt.`,
            green: `Ich suche Konsens und nehme mir Zeit, die Auswirkung auf alle zu bedenken.`,
            blue: `Ich sammle alle verfügbaren Daten und denke es methodisch durch, bevor ich mich festlege.`,
          },
        },
        motivation: {
          aspect: `Was mich antreibt`,
          prompt: `Was motiviert Sie bei der Arbeit wirklich?`,
          options: {
            red: `Ergebnisse erzielen, gewinnen und die Kontrolle über die Ausgänge haben.`,
            yellow: `Anerkennung, Verbindung, Abwechslung und die Aufregung neuer Ideen.`,
            green: `Harmonie, Stabilität und zu wissen, dass das Team unterstützt und geschätzt wird.`,
            blue: `Genauigkeit, Meisterschaft, Struktur und beständig hochwertige Arbeit zu liefern.`,
          },
        },
        conflict: {
          aspect: `Mit Konflikt umgehen`,
          prompt: `Bei echter Uneinigkeit, wie reagieren Sie üblicherweise?`,
          options: {
            red: `Ich spreche es direkt an und sage, was ich denke, auch wenn es Reibung erzeugt.`,
            yellow: `Ich lenke mit Humor oder Energie ab, um die Stimmung positiv zu halten.`,
            green: `Ich nehme die Spannung still auf und meide die Konfrontation, um den Frieden zu wahren.`,
            blue: `Ich ziehe mich zurück und analysiere die Lage, bevor ich entscheide, ob und wie ich mich einbringe.`,
          },
        },
        feedback: {
          aspect: `Feedback empfangen`,
          prompt: `Wie reagieren Sie üblicherweise auf kritisches Feedback?`,
          options: {
            red: `Ich höre auf das Nützliche, bewerte es schnell und mache weiter.`,
            yellow: `Zuerst nehme ich es persönlich, erhole mich aber schnell und finde die positive Seite.`,
            green: `Ich fühle es tief, stimme vielleicht zu, obwohl ich anderer Meinung bin, und verarbeite es langsam.`,
            blue: `Ich analysiere es sorgfältig auf Genauigkeit und Fairness, bevor ich es annehme oder ablehne.`,
          },
        },
        strength: {
          aspect: `Ihr größter Beitrag`,
          prompt: `Was nennen Menschen am verlässlichsten als Ihren größten Wert für ein Team?`,
          options: {
            red: `Dinge erledigen – ich liefere Ergebnisse, auch unter Druck.`,
            yellow: `Energie bringen und das Team um eine gemeinsame Vision scharen.`,
            green: `Der stabile Anker sein – verlässlich, ruhig und stets vertrauenswürdig.`,
            blue: `Sorgfalt sichern – den Fehler, die Lücke oder das Risiko finden, das andere übersehen.`,
          },
        },
      },
      self: {
        red: {
          strengths: [
            `Entschlossen und handlungsorientiert – Sie schaffen Schwung, wenn andere zögern.`,
            `Direkter Kommunikator – die Menschen wissen immer, woran sie bei Ihnen sind.`,
            `Hohe Energie und Antrieb – Sie fordern von sich und anderen einen hohen Maßstab.`,
          ],
          shadow: [
            `Unter Druck: Sie werden kontrollierend, schroff und ungeduldig.`,
            `Sie übersehen womöglich die emotionale Wirkung Ihrer Direktheit auf andere.`,
            `Sie verwechseln womöglich Tempo mit Qualität – schnell zu entscheiden heißt nicht immer, gut zu entscheiden.`,
          ],
          blindSpots: [
            `Wie Ihre Direktheit bei Menschen mit weniger Macht oder Autorität als Sie ankommt.`,
            `Die Kosten Ihrer Ungeduld für die psychologische Sicherheit Ihres Teams.`,
            `Die Entscheidungen, die Sie überstürzt haben und die sich später als überlegungsbedürftig erwiesen.`,
          ],
          question: `Gehe ich schnell vor, weil es wirklich das richtige Tempo ist – oder weil mir die Ungewissheit des Wartens unangenehm ist?`,
        },
        yellow: {
          strengths: [
            `Inspirierend und begeisternd – Sie machen, dass Menschen Teil dessen sein wollen, was Sie tun.`,
            `Kreativ und optimistisch – Sie sehen Möglichkeit, wo andere Probleme sehen.`,
            `Von Natur aus beziehungsstark – Sie schaffen schnell Verbindung und Wärme in Teams.`,
          ],
          shadow: [
            `Unter Druck: Sie verzetteln sich, versprechen zu viel und verlieren die Nachverfolgung.`,
            `Ihre Begeisterung kann auf analytische oder ergebnisorientierte Kollegen unzuverlässig wirken.`,
            `Sie meiden womöglich harte Wahrheiten, um die positive Energie im Raum zu bewahren.`,
          ],
          blindSpots: [
            `Die Zusagen, die Sie gemacht haben und die still von Ihrem Radar verschwanden.`,
            `Wie Ihre Energie und Ihr Tempo ruhigere Kollegen überwältigen können.`,
            `Die Lücke zwischen dem, wie inspiriert Sie sich fühlen, und dem, was tatsächlich geliefert wird.`,
          ],
          question: `Bin ich begeistert, weil es wirklich das Richtige ist – oder weil mich die Idee aufregt und ich die Disziplin meide, die sie verlangt?`,
        },
        green: {
          strengths: [
            `Verlässlich, loyal und vertrauenswürdig – die Person, auf die sich das Team verlässt.`,
            `Geduldig und wahrhaft empathisch – bei Ihnen fühlen sich Menschen gehört und sicher.`,
            `Eine stabilisierende Präsenz unter Druck – Ihre Ruhe wird zur Ruhe des ganzen Teams.`,
          ],
          shadow: [
            `Unter Druck: Sie verstummen, meiden Konflikt und tragen Groll still mit sich.`,
            `Sie stimmen oft im Raum zu und sind privat anderer Meinung – Ihr Schweigen führt andere in die Irre.`,
            `Ihre Nachgiebigkeit kann dem Team die ehrliche Reibung nehmen, die es wirklich braucht.`,
          ],
          blindSpots: [
            `Wie Ihr Schweigen als Zustimmung gelesen wird – auch wenn es keine ist.`,
            `Die langfristigen Kosten, Uneinigkeit und unausgesprochene Enttäuschung zu schlucken.`,
            `Wie Ihre Konfliktvermeidung Sie manchmal mehr schützt als die Beziehung.`,
          ],
          question: `Bin ich geduldig, weil die Situation es wirklich verlangt – oder meide ich ein Gespräch, von dem ich weiß, dass ich es führen muss?`,
        },
        blue: {
          strengths: [
            `Analytisch und präzise – Sie erfassen, was andere übersehen.`,
            `Hohe Standards, die die Qualität im ganzen Team beständig schützen.`,
            `Strukturiert und verlässlich – Ihre Pläne und Analysen halten der Prüfung stand.`,
          ],
          shadow: [
            `Unter Druck: Sie werden überkritisch, ziehen sich zurück und neigen zur Analyseparalyse.`,
            `Ihre emotionale Zurückhaltung kann wie Gleichgültigkeit oder Kälte wirken, auch wenn es Ihnen wirklich wichtig ist.`,
            `Ihre Standards können das Team bremsen – nicht jede Entscheidung verdient dasselbe Maß an Sorgfalt.`,
          ],
          blindSpots: [
            `Wie Ihr Schweigen in Meetings als Missbilligung oder Desinteresse fehlgedeutet wird.`,
            `Die emotionale Dimension von Situationen, die Sie rein als logische Probleme analysieren.`,
            `Das Muster, mehr Daten zu suchen, um das Unbehagen des Festlegens hinauszuzögern.`,
          ],
          question: `Sammle ich mehr Informationen, weil ich sie wirklich brauche – oder weil ich das Unbehagen aufschiebe, mit dem zu entscheiden, was ich schon habe?`,
        },
      },
      emotion: {
        red: {
          triggers: [
            `Inkompetenz oder sichtbare Faulheit bei anderen`,
            `Endloses Abwägen und Unentschlossenheit`,
            `Öffentlich infrage gestellt oder herausgefordert werden`,
            `Ineffizienz und vergeudeter Aufwand`,
          ],
          warning: [
            `Die Stimme wird lauter oder schärfer und knapper`,
            `Sie beginnen, die Sätze anderer zu vollenden`,
            `Sarkasmus oder Abweisung schleicht sich in Ihren Ton`,
            `Sie lehnen sich körperlich vor oder übernehmen den Gesprächsraum`,
          ],
          recovery: [
            `Körperliche Bewegung – ein kurzer Spaziergang unterbricht den Aktivierungszyklus.`,
            `Erledigen Sie eine kleine konkrete Aufgabe, um das Gefühl von Kontrolle und Schwung wiederherzustellen.`,
            `Benennen Sie, was Sie fühlen, bevor Sie reagieren: Das ist Frust über das Tempo, nicht über die Person.`,
          ],
          practice: `Bevor Sie reagieren, wenn Sie getriggert sind: ein bewusster Atemzug, dann fragen Sie: Ist das dringend – oder gerade nur unbequem für mich?`,
        },
        yellow: {
          triggers: [
            `Ignoriert, abgetan oder übergangen werden`,
            `Langeweile und Wiederholung ohne Abwechslung oder Neues`,
            `Konflikt, der sich persönlich anfühlt oder die Beziehung angreift`,
            `Sich eingeengt, mikromanagt oder unterschätzt fühlen`,
          ],
          warning: [
            `Schneller reden und mitten im Satz zwischen Themen springen`,
            `Zusagen machen, die Sie nicht richtig durchdacht haben`,
            `Humor oder Energie nutzen, um von einem ernsten oder schwierigen Punkt abzulenken`,
            `Energie, die sich als Performance liest statt als echte Präsenz`,
          ],
          recovery: [
            `Soziale Verbindung – ein kurzes Gespräch mit einer vertrauten Person erdet Sie schnell.`,
            `Schreiben Sie die drei Dinge auf, die jetzt wirklich zählen, statt alles.`,
            `Senken Sie bewusst die Tonlage: verlangsamen Sie Ihren Atem, reduzieren Sie Ihr Tempo, schaffen Sie eine Pause.`,
          ],
          practice: `Nach jedem wichtigen Meeting: Schreiben Sie eine konkrete Zusage mit einem festen Datum und einer namentlich verantwortlichen Person.`,
        },
        green: {
          triggers: [
            `Direkter Konflikt oder öffentliche Konfrontation`,
            `Plötzliche Veränderung ohne Rücksprache oder Vorwarnung`,
            `Gedrängt oder unter Druck gesetzt zu werden, schnell zu entscheiden`,
            `Kritik, die vor anderen geäußert wird`,
          ],
          warning: [
            `In Meetings verstummen, in denen Sie sonst beitragen`,
            `Laut zustimmen, während Sie innerlich das Gegenteil fühlen`,
            `Passiv werden oder sich sanft aus dem Gespräch zurückziehen`,
            `Groll, der langsam unter einer ruhigen, gefälligen Oberfläche wächst`,
          ],
          recovery: [
            `Ruhige Zeit für sich zum Verarbeiten – sich zum Reden zu zwingen, bevor Sie bereit sind, führt selten zu etwas Produktivem.`,
            `Ein vertrauensvolles Einzelgespräch, das ans Licht bringt, was Sie wirklich denken.`,
            `Ein klarer, einfacher nächster Schritt, um Bewegung zu schaffen und das Gefühl von Handlungsfähigkeit wiederherzustellen.`,
          ],
          practice: `In Ihrer nächsten schwierigen Situation: Nennen Sie Ihre ehrliche Sicht laut – bevor Sie die der anderen Person nennen.`,
        },
        blue: {
          triggers: [
            `Schludrigkeit, Ungenauigkeit oder Abstriche bei der Qualität`,
            `Aufgefordert werden, sich festzulegen, bevor Sie genug Informationen haben`,
            `Hype und Begeisterung ohne Beleg`,
            `Emotionaler Druck zuzustimmen, wenn die Logik es noch nicht stützt`,
          ],
          warning: [
            `Im Verlauf des Meetings zunehmend stiller werden`,
            `Immer mehr Risiken aufzeigen, statt sich auf Lösungen einzulassen`,
            `Sich aus der Gruppendiskussion in private Notizen oder Analyse zurückziehen`,
            `Der Ton wird knapp und rein sachlich, verliert alle Wärme und Verbindung`,
          ],
          recovery: [
            `Schreiben Sie die Fakten auf, die Sie bereits kennen – das durchbricht die Spirale aus Ungewissheit und Hilflosigkeit.`,
            `Verengen Sie die Frage: nicht was sollten wir tun, sondern welche eine Entscheidung muss ich jetzt treffen.`,
            `Eine kurze körperliche Pause – fünf Minuten weg vom Bildschirm setzen die Analyseschleife zurück.`,
          ],
          practice: `Finden Sie diese Woche eine Entscheidung, bei der Sie 70 % der gewünschten Informationen haben – und treffen Sie sie, ohne auf die restlichen 30 % zu warten.`,
        },
      },
      influence: {
        red: {
          yellow: {
            challenge: `Ihre Direktheit schneidet die Energie und den Ideenfluss von Gelb ab – es fühlt sich zum Schweigen gebracht statt einbezogen.`,
            adapt: `Beginnen Sie mit Begeisterung und verbinden Sie die Idee mit einer größeren Vision, bevor Sie zu einer Entscheidung kommen.`,
            phrase: `Ich liebe, wohin das führen könnte – hier ist das Fazit, damit Sie helfen können, es zu formen.`,
          },
          green: {
            challenge: `Ihr Tempo und Ihre Direktheit überwältigen Grün, das Zeit und Wärme braucht, bevor es sich wirklich einbringen kann.`,
            adapt: `Verlangsamen Sie bewusst, bauen Sie zuerst die Beziehung auf, fragen Sie, bevor Sie behaupten.`,
            phrase: `Ganz ohne Eile – was ist Ihre ehrliche Sicht dazu?`,
          },
          blue: {
            challenge: `Sie wollen schnell entscheiden; Blau legt sich nicht fest, ohne mit den Belegen zufrieden zu sein.`,
            adapt: `Bringen Sie die Daten, präsentieren Sie Ihre Analyse und geben Sie Zeit zum Prüfen, bevor Sie eine Entscheidung erwarten.`,
            phrase: `Hier sind die Belege, mit denen ich arbeite – welche Fragen wirft das für Sie auf?`,
          },
        },
        yellow: {
          red: {
            challenge: `Ihre Begeisterung und Ihre Geschichten verlieren Rot schnell – es braucht das Fazit, nicht die Reise.`,
            adapt: `Beginnen Sie mit dem Ergebnis und der nötigen Entscheidung; kürzen Sie die Erzählung; lassen Sie ihn wählen.`,
            phrase: `Fazit: Hier ist, was ich vorschlage, warum es gewinnt und was ich von Ihnen brauche.`,
          },
          green: {
            challenge: `Ihre hohe Energie und Ihr Tempo können Grün überwältigen – es braucht Wärme und echten Raum, nicht Intensität.`,
            adapt: `Werden Sie zuerst persönlich warm, passen Sie sich seinem Tempo an und fragen Sie nach, bevor Sie in den Pitch starten.`,
            phrase: `Bevor ich meine Gedanken teile – ich würde wirklich gern zuerst Ihre hören.`,
          },
          blue: {
            challenge: `Ihr Optimismus ohne Belege verliert Blau vollständig – Begeisterung ersetzt keine Daten.`,
            adapt: `Kommen Sie mit Belegen vorbereitet, benennen Sie die Risiken ehrlich und lassen Sie ihn analysieren, bevor er sich festlegt.`,
            phrase: `Hier sind die Daten dahinter – nehmen Sie sich alle Zeit, die Sie brauchen, um sie gründlich zu prüfen.`,
          },
        },
        green: {
          red: {
            challenge: `Ihr behutsamer, sanfter Ansatz liest sich für Rot als Unentschlossenheit oder mangelnde Überzeugung – es klinkt sich schnell aus.`,
            adapt: `Seien Sie direkt und klar, beginnen Sie mit dem Fazit, machen Sie einen konkreten Vorschlag statt einer offenen Anregung.`,
            phrase: `Ich will direkt sein: Hier ist, was ich vorschlage und warum ich es für richtig halte.`,
          },
          yellow: {
            challenge: `Ihr gemessenes Tempo und Ihre Zurückhaltung passen nicht zur Energie von Gelb – es deutet Ihre Ruhe als Desinteresse.`,
            adapt: `Passen Sie sich bewusst seiner Energie an, verbinden Sie sich mit der menschlichen Dimension der Idee, zeigen Sie sichtbare Begeisterung.`,
            phrase: `Das begeistert mich wirklich – und hier ist, warum es fürs Team wichtig ist.`,
          },
          blue: {
            challenge: `Ihr Beziehungsfokus kann für Blau ungenau oder zu wenig streng wirken.`,
            adapt: `Untermauern Sie Ihre Position mit Logik, strukturieren Sie Ihr Argument klar und bringen Sie Belege neben der Perspektive.`,
            phrase: `Ich habe das sorgfältig durchdacht – hier ist die strukturierte Begründung dafür.`,
          },
        },
        blue: {
          red: {
            challenge: `Ihr Detail und Ihr Vorgehen verlieren Rot sofort – es hört auf zuzuhören, bevor Sie zum Punkt kommen.`,
            adapt: `Fazit zuerst: Nennen Sie Ihre Schlussfolgerung am Anfang, halten Sie die Belegdaten als Rückhalt bereit – beginnen Sie nie damit.`,
            phrase: `Kurze Zusammenfassung: die Empfehlung und die zwei Kerngründe – Details verfügbar, falls nötig.`,
          },
          yellow: {
            challenge: `Ihre strukturierte Analyse wirkt auf Gelb trocken und ernüchternd – es klinkt sich aus, bevor Sie zur Erkenntnis kommen.`,
            adapt: `Eröffnen Sie mit Vision und Möglichkeit, bringen Sie echte Wärme, nutzen Sie eine überzeugende Geschichte vor der Analyse.`,
            phrase: `Das könnte etwas Bedeutendes sein – und die Daten machen ein überzeugendes Argument dafür.`,
          },
          green: {
            challenge: `Ihre emotionale Zurückhaltung liest sich als kalt oder distanziert, selbst wenn Ihre Absicht nachdenklich und rücksichtsvoll ist.`,
            adapt: `Zeigen Sie zuerst echtes Interesse an seiner Perspektive und würdigen Sie die Beziehung vor der Logik.`,
            phrase: `Ihre Sicht dazu ist mir wirklich wichtig, bevor ich teile, was ich gefunden habe – wie lesen Sie es ehrlich?`,
          },
        },
      },
      results: {
        title: `Ihr Farbprofil`,
        titleNamed: `Farbprofil — {name}`,
        sub: `Primärfarbe: {colour} ({pct} %). Ihre vollständige Mischung und persönliche Einblicke erscheinen unten.`,
        you: `Sie`,
        compTitle: `Ihre Farbzusammensetzung`,
        profileTag: `IHR FARBPROFIL · {archetype}`,
        profileTitleBlend: `{primary}-/{secondary}-Mischung`,
        profileTitleLed: `{primary}-geführtes Profil`,
        narrStrong: `{who} führen stark mit {primary} ({p} %) – die {archetype}-Energie prägt Ihren Standardstil.`,
        narrEven: `{who} zeigen eine ausgewogene {primary}/{secondary}-Mischung ({p} % / {s} %) – Sie wechseln je nach Kontext und Einsatz zwischen beiden Modi.`,
        narrSecondary: `{who} sind vorwiegend {primary} ({p} %) mit einem deutlichen {secondary}-Sekundäranteil ({s} %).`,
        tiers: { dominant: `Dominant`, secondary: `Sekundär`, minor: `Gering`, low: `Niedrig` },
        saTitle: `Selbstwahrnehmung`,
        saSub: `Ihre natürlichen Stärken, Schattenverhalten und blinden Flecken`,
        saStrengths: `Ihre natürlichen Stärken`,
        saShadow: `Ihr Schatten unter Stress`,
        saBlind: `Blinde Flecken im Blick`,
        ecTitle: `Emotionale Kontrolle`,
        ecSub: `Ihre Auslöser, frühen Warnzeichen und Erholungsschritte`,
        ecTriggers: `Was Sie auslöst`,
        ecWarning: `Frühe Warnzeichen`,
        ecRecovery: `Erholungsschritte und tägliche Praxis`,
        infTitle: `Andere Farben beeinflussen`,
        infSub: `Ihre größte Herausforderung und wie Sie sich für jede Farbe anpassen, mit der Sie arbeiten`,
        infChallenge: `Die Herausforderung`,
        infAdapt: `Wie Sie sich anpassen`,
        colourTag: `{name} — {archetype}`,
        retake: `Einschätzung wiederholen`,
        print: `Drucken / Als PDF speichern`,
      },
      footer: `Programm zur Führungsbereitschaft · Farben-Selbsteinschätzung – ein Spiegel zum Wachsen, keine Schublade, in die Sie sich stecken.`,
    },
  },

  ar: {
    self: {
      meta: {
        title: `التقييم الذاتي للألوان`,
        description: `اكتشف توازن ألوانك وما يعنيه لوعيك بذاتك، وتنظيمك العاطفي، وتكيّفك مع كل لون آخر.`,
      },
      header: {
        eyebrow: `الوعي بالذات والذكاء العاطفي`,
        title: `التقييم الذاتي للألوان`,
        lead: `اكتشف توازن ألوانك الخاص — وافهم ما يعنيه لوعيك بذاتك، وتنظيمك العاطفي، وأكبر تحديات تكيّفك مع كل لون آخر.`,
      },
      notice: `<b>قيّم نفسك بصدق.</b> تظهر كل عبارة بترتيب عشوائي واللون مخفي. قيّم مدى وصفها لميلك الطبيعي، لا يومك الأفضل ولا ما تطمح إليه. لا يظهر الملف الشخصي ولا أي توصيات إلا عند الكشف.`,
      nameLabel: `اسمك (اختياري)`,
      namePlaceholder: `مثل: أليكس، لتقرير مخصص`,
      nameHint: `استخدم المنزلقات لتُظهر مدى وصف كل عبارة لك. الدرجة 0 تعني أنها لا تصفك إطلاقًا؛ و100 تعني أنها تصفك تمامًا.`,
      rateTitle: `قيّم العبارات`,
      rateSub: `الألوان مخفية والخيارات مخلوطة: قيّم ما تشعر أنه صحيح، لا ما يبدو صائبًا`,
      notRated: `لم يُقيَّم بعد`,
      splitCap: `كيف تتوزع تقييماتك على هذا الجانب (= 100%)`,
      progress: `{n} من {total} جوانب مقيَّمة`,
      reveal: `اكشف ملفي الشخصي`,
      colours: {
        red: { name: `أحمر`, archetype: `المُنجِز` },
        yellow: { name: `أصفر`, archetype: `المُلهِم` },
        green: { name: `أخضر`, archetype: `الداعم` },
        blue: { name: `أزرق`, archetype: `المحلل` },
      },
      questions: {
        work: {
          aspect: `كيف أعمل`,
          prompt: `ما الذي يصف أسلوب عملك الطبيعي أفضل وصف؟`,
          options: {
            red: `أحب أن أتولى القيادة، وأحدد الإيقاع، وأدفع الأمور قدمًا بحسم.`,
            yellow: `أستمتع بالتعاون ومشاركة الأفكار وشحن من حولي بالطاقة.`,
            green: `أفضّل العمل بثبات، وبناء الثقة، ودعم الفريق.`,
            blue: `أحب التخطيط بعناية، وضمان الجودة، والتحليل قبل التصرف.`,
          },
        },
        pressure: {
          aspect: `تحت الضغط`,
          prompt: `حين يشتد التوتر، كيف تستجيب بطبيعتك؟`,
          options: {
            red: `أصبح أكثر مباشرة وأدفع بقوة أكبر: النتائج هي الأهم.`,
            yellow: `أبحث عن أشخاص لأعصف معهم الأفكار وأبحث عن حلول إبداعية.`,
            green: `أصمت، وأعالج الأمر داخليًا، وأحتاج وقتًا قبل الرد.`,
            blue: `أتعمق أكثر في البيانات وأبحث عن مزيد من المعلومات قبل أن أقرر.`,
          },
        },
        comms: {
          aspect: `التواصل`,
          prompt: `كيف تعبّر عن نفسك بطبيعتك؟`,
          options: {
            red: `أصل إلى الزبدة بسرعة: مباشر، موجز، ومركّز على النتائج.`,
            yellow: `أتواصل بالطاقة والقصص، فأجعله شخصيًا وجذابًا.`,
            green: `أنا دافئ وصبور، حريص على صون العلاقة في كل ما أقول.`,
            blue: `أنا دقيق ومنظَّم، أقدّم الحقائق والمنطق بوضوح.`,
          },
        },
        decisions: {
          aspect: `اتخاذ القرارات`,
          prompt: `كيف تتعامل مع قرار مهم؟`,
          options: {
            red: `أقرّر بسرعة بالمعلومات المتوفرة لدي: تهم السرعة والزخم.`,
            yellow: `أستشير الآخرين وأتبع حدسي حين تكون الطاقة مناسبة.`,
            green: `أسعى للإجماع وآخذ وقتي للنظر في الأثر على الجميع.`,
            blue: `أجمع كل البيانات المتاحة وأفكر فيها بمنهجية قبل أن ألتزم.`,
          },
        },
        motivation: {
          aspect: `ما يحرّكني`,
          prompt: `ما الذي يحفّزك حقًا في العمل؟`,
          options: {
            red: `تحقيق النتائج، والفوز، والتحكم في المخرجات.`,
            yellow: `التقدير، والتواصل، والتنوع، وإثارة الأفكار الجديدة.`,
            green: `الانسجام، والاستقرار، ومعرفة أن الفريق مدعوم ومُقدَّر.`,
            blue: `الدقة، والإتقان، والبنية، وتقديم عمل عالي الجودة باستمرار.`,
          },
        },
        conflict: {
          aspect: `التعامل مع الخلاف`,
          prompt: `حين يوجد خلاف حقيقي، كيف تستجيب عادةً؟`,
          options: {
            red: `أعالجه مباشرة وأقول ما أفكر فيه، حتى لو خلق احتكاكًا.`,
            yellow: `أحوّله بالفكاهة أو الطاقة لأبقي المزاج إيجابيًا.`,
            green: `أمتص التوتر بهدوء وأتجنب المواجهة حفاظًا على السلام.`,
            blue: `أنسحب وأحلل الموقف قبل أن أقرر إن كنت سأتدخل وكيف.`,
          },
        },
        feedback: {
          aspect: `تلقّي الملاحظات`,
          prompt: `كيف تستجيب عادةً للملاحظات النقدية؟`,
          options: {
            red: `أنصت لما هو مفيد، وأقيّمه بسرعة، وأمضي قدمًا.`,
            yellow: `آخذها على محمل شخصي في البداية لكن أتعافى بسرعة وأجد الزاوية الإيجابية.`,
            green: `أشعر بها بعمق، وقد أوافق حتى وأنا مختلف، وأعالجها ببطء.`,
            blue: `أحللها بعناية بحثًا عن الدقة والإنصاف قبل قبولها أو رفضها.`,
          },
        },
        strength: {
          aspect: `أكبر إسهاماتك`,
          prompt: `ما الذي يقوله الناس بأكبر قدر من الثبات إنه أكبر قيمة تقدّمها لفريق؟`,
          options: {
            red: `إنجاز الأمور: أقدّم نتائج حتى تحت الضغط.`,
            yellow: `جلب الطاقة وحشد الفريق حول رؤية مشتركة.`,
            green: `أن أكون المرساة الثابتة: موثوق، هادئ، وجدير بالثقة دومًا.`,
            blue: `ضمان الصرامة: إيجاد العيب أو الثغرة أو الخطر الذي يفوت الآخرين.`,
          },
        },
      },
      self: {
        red: {
          strengths: [
            `حاسم وموجَّه نحو الفعل: تخلق زخمًا حين يتردد الآخرون.`,
            `مُتواصِل مباشر: يعرف الناس دائمًا أين يقفون معك.`,
            `طاقة ودفع عاليان: تطالب نفسك والآخرين بمعيار عالٍ.`,
          ],
          shadow: [
            `تحت الضغط: تصبح متحكمًا وفظًا ونافد الصبر.`,
            `قد تغفل الأثر العاطفي لصراحتك على الآخرين.`,
            `قد تخلط بين السرعة والجودة: القرار السريع ليس دومًا قرارًا جيدًا.`,
          ],
          blindSpots: [
            `كيف تقع صراحتك على من هم أقل سلطة أو نفوذًا منك.`,
            `كلفة نفاد صبرك على الأمان النفسي لفريقك.`,
            `القرارات التي تسرّعت فيها وتبيّن لاحقًا أنها تحتاج مزيدًا من التروّي.`,
          ],
          question: `هل أمضي بسرعة لأنه الإيقاع الصحيح فعلًا، أم لأن عدم يقين الانتظار يزعجني؟`,
        },
        yellow: {
          strengths: [
            `مُلهِم وباعث للحماس: تجعل الناس يريدون أن يكونوا جزءًا مما تفعل.`,
            `مبدع ومتفائل: ترى الإمكان حيث يرى غيرك المشكلات.`,
            `علائقي بالفطرة: تبني التواصل والدفء في الفرق بسرعة.`,
          ],
          shadow: [
            `تحت الضغط: تتشتت، وتفرط في الوعود، وتفقد المتابعة.`,
            `قد يبدو حماسك غير موثوق للزملاء التحليليين أو المركّزين على النتائج.`,
            `قد تتجنب الحقائق الصعبة حفاظًا على الطاقة الإيجابية في الغرفة.`,
          ],
          blindSpots: [
            `الالتزامات التي قطعتها وتسللت بهدوء خارج نطاق انتباهك.`,
            `كيف يمكن لطاقتك وإيقاعك أن يُرهقا الزملاء الأكثر هدوءًا.`,
            `الفجوة بين مدى شعورك بالإلهام وما يُنجَز فعلًا.`,
          ],
          question: `هل أنا متحمس لأنه الشيء الصحيح فعلًا، أم لأن الفكرة تثيرني وأتجنب الانضباط الذي تتطلبه؟`,
        },
        green: {
          strengths: [
            `موثوق ووفيّ وجدير بالثقة: الشخص الذي يعتمد عليه الفريق.`,
            `صبور ومتعاطف حقًا: يشعر الناس بأنهم مسموعون وآمنون بقربك.`,
            `حضور مُثبِّت تحت الضغط: هدوؤك يصبح هدوء الفريق كله.`,
          ],
          shadow: [
            `تحت الضغط: تصمت، وتتجنب الصراع، وتحمل الاستياء بصمت.`,
            `غالبًا توافق في الغرفة وتختلف في الخفاء: صمتك يضلّل الآخرين.`,
            `مجاملتك قد تحرم الفريق من الاحتكاك الصادق الذي يحتاجه فعلًا.`,
          ],
          blindSpots: [
            `كيف يُقرأ صمتك كموافقة، حتى حين لا يكون كذلك.`,
            `الكلفة بعيدة المدى لابتلاع الخلاف وخيبة الأمل غير المُعلَنة.`,
            `كيف يحميك تجنبك للصراع أحيانًا أكثر مما يحمي العلاقة.`,
          ],
          question: `هل أنا صبور لأن الموقف يستدعي ذلك فعلًا، أم أتجنب محادثة أعرف أنني بحاجة لإجرائها؟`,
        },
        blue: {
          strengths: [
            `تحليلي ودقيق: تلتقط ما يفوت الآخرين.`,
            `معايير عالية تحمي الجودة باستمرار عبر الفريق.`,
            `منظَّم وموثوق: تصمد خططك وتحليلاتك أمام التدقيق.`,
          ],
          shadow: [
            `تحت الضغط: تصبح مفرط النقد، منسحبًا، وعرضة لشلل التحليل.`,
            `قد يُقرأ تحفظك العاطفي كلامبالاة أو برود، حتى حين تهتم حقًا.`,
            `قد تبطئ معاييرك الفريق: ليست كل القرارات تستحق المستوى نفسه من الصرامة.`,
          ],
          blindSpots: [
            `كيف يُساء فهم صمتك في الاجتماعات كاستنكار أو انسحاب.`,
            `البُعد العاطفي لمواقف تحللها كمسائل منطقية بحتة.`,
            `نمط طلب مزيد من البيانات كوسيلة لتأجيل انزعاج الالتزام.`,
          ],
          question: `هل أجمع مزيدًا من المعلومات لأنني أحتاجها فعلًا، أم لأنني أؤجل انزعاج القرار بما لديّ بالفعل؟`,
        },
      },
      emotion: {
        red: {
          triggers: [
            `عدم الكفاءة أو الكسل الظاهر لدى الآخرين`,
            `التداول الذي لا ينتهي والتردد`,
            `أن تُساءَل أو تُتحدّى علنًا`,
            `عدم الكفاءة والجهد المهدور`,
          ],
          warning: [
            `يرتفع الصوت أو يصبح أحدّ وأكثر اقتضابًا`,
            `تبدأ في إكمال جُمل الآخرين`,
            `يدخل السخرية أو الاستخفاف في نبرتك`,
            `تميل جسديًا أو تستولي على مساحة المحادثة`,
          ],
          recovery: [
            `الحركة الجسدية: مشي قصير يقطع دورة التنشّط.`,
            `أنجز مهمة صغيرة ملموسة لتستعيد الإحساس بالسيطرة والزخم.`,
            `سمِّ ما تشعر به قبل أن ترد: هذا إحباط من الإيقاع، لا من الشخص.`,
          ],
          practice: `قبل الرد حين تُستثار: نفَس واحد متعمَّد، ثم اسأل: أهذا عاجل، أم مجرد مزعج لي الآن؟`,
        },
        yellow: {
          triggers: [
            `أن تُتجاهَل أو تُستبعَد أو يُقاطَع كلامك`,
            `الملل والتكرار دون تنوع أو جِدة`,
            `الصراع الذي يبدو شخصيًا أو يهاجم العلاقة`,
            `الشعور بالتقييد أو الإدارة التفصيلية أو الاستهانة`,
          ],
          warning: [
            `التحدث أسرع والقفز بين المواضيع في منتصف الجملة`,
            `قطع التزامات لم تفكر فيها جيدًا`,
            `استخدام الفكاهة أو الطاقة للتهرب من نقطة جادة أو صعبة`,
            `طاقة تُقرأ كأداء لا كحضور حقيقي`,
          ],
          recovery: [
            `التواصل الاجتماعي: محادثة قصيرة مع شخص تثق به تثبّتك بسرعة.`,
            `اكتب الأشياء الثلاثة التي تهم حقًا الآن بدلًا من كل شيء.`,
            `اخفض النبرة عمدًا: أبطئ تنفسك، قلّل إيقاعك، اصنع وقفة.`,
          ],
          practice: `بعد كل اجتماع مهم: اكتب التزامًا محددًا بتاريخ ملموس وشخص مسؤول مُسمّى.`,
        },
        green: {
          triggers: [
            `الصراع المباشر أو المواجهة العلنية`,
            `التغيير المفاجئ دون استشارة أو إنذار`,
            `أن تُدفَع أو تُضغَط لتقرر بسرعة`,
            `النقد الموجَّه أمام الآخرين`,
          ],
          warning: [
            `الصمت في اجتماعات تسهم فيها عادةً`,
            `الموافقة بصوت عالٍ بينما تشعر بالعكس داخليًا`,
            `أن تصبح سلبيًا أو تنسحب برفق من المحادثة`,
            `استياء ينمو ببطء تحت سطح هادئ ومُجامِل`,
          ],
          recovery: [
            `وقت هادئ بمفردك للمعالجة: إجبار نفسك على الكلام قبل أن تكون جاهزًا نادرًا ما يقود إلى شيء مثمر.`,
            `محادثة فردية موثوقة تُظهِر ما تفكر فيه فعلًا.`,
            `خطوة تالية واضحة وبسيطة لخلق حركة واستعادة الإحساس بالفاعلية.`,
          ],
          practice: `في موقفك الصعب القادم: سمِّ رأيك الصادق بصوت عالٍ، قبل أن تسمّي رأي الطرف الآخر.`,
        },
        blue: {
          triggers: [
            `الإهمال أو عدم الدقة أو التهاون في الجودة`,
            `أن يُطلَب منك الالتزام قبل أن تشعر أن لديك معلومات كافية`,
            `الحماس والضجيج غير المدعوم بالأدلة`,
            `الضغط العاطفي للموافقة حين لا يسنده المنطق بعد`,
          ],
          warning: [
            `أن تصبح أكثر صمتًا تدريجيًا كلما تقدّم الاجتماع`,
            `الإشارة إلى مزيد من المخاطر بدلًا من الانخراط في الحلول`,
            `الانسحاب من نقاش المجموعة إلى تدوين أو تحليل خاص`,
            `تصبح النبرة مقتضبة وواقعية بحتة، فاقدة كل دفء وتواصل`,
          ],
          recovery: [
            `اكتب الحقائق التي تعرفها بالفعل: هذا يكسر دوامة عدم اليقين والعجز.`,
            `ضيّق السؤال: ليس ماذا ينبغي أن نفعل، بل ما القرار الوحيد الذي عليّ اتخاذه الآن.`,
            `استراحة جسدية قصيرة: خمس دقائق بعيدًا عن الشاشة تعيد ضبط حلقة التحليل.`,
          ],
          practice: `اعثر هذا الأسبوع على قرار لديك فيه 70% من المعلومات التي تريدها — واتخذه دون انتظار الـ30% المتبقية.`,
        },
      },
      influence: {
        red: {
          yellow: {
            challenge: `صراحتك تقطع طاقة الأصفر وتدفّق أفكاره: يشعر بالإسكات لا بالإشراك.`,
            adapt: `ابدأ بالحماس واربط الفكرة برؤية أكبر قبل أن تصل إلى قرار.`,
            phrase: `يعجبني إلى أين قد يصل هذا — إليك الخلاصة كي تساعد في تشكيله.`,
          },
          green: {
            challenge: `إيقاعك وصراحتك يُرهقان الأخضر الذي يحتاج وقتًا ودفئًا قبل أن ينخرط حقًا.`,
            adapt: `أبطئ عمدًا، وابنِ العلاقة أولًا، واسأل قبل أن تجزم.`,
            phrase: `لا عجلة إطلاقًا — ما رأيك الصادق في هذا؟`,
          },
          blue: {
            challenge: `أنت تريد قرارًا سريعًا؛ والأزرق لن يلتزم دون أن يقتنع بالأدلة.`,
            adapt: `أحضر البيانات، واعرض تحليلك، وأعطه وقتًا للتحقق قبل أن تتوقع قرارًا.`,
            phrase: `هذه الأدلة التي أعمل بها — أي أسئلة تثيرها لديك؟`,
          },
        },
        yellow: {
          red: {
            challenge: `حماسك وقصصك يفقدان الأحمر بسرعة: يحتاج الخلاصة، لا الرحلة.`,
            adapt: `ابدأ بالنتيجة والقرار المطلوب؛ احذف السرد؛ دعه يختار.`,
            phrase: `باختصار: هذا ما أقترحه، ولماذا يفوز، وما أحتاجه منك.`,
          },
          green: {
            challenge: `طاقتك العالية وإيقاعك قد يُرهقان الأخضر: يحتاج دفئًا ومساحة حقيقية، لا حِدّة.`,
            adapt: `تدفّأ على المستوى الشخصي أولًا، وجارِ إيقاعه، وتحقّق قبل أن تندفع في العرض.`,
            phrase: `قبل أن أشارك فكرتي، أودّ حقًا أن أسمع فكرتك أولًا.`,
          },
          blue: {
            challenge: `تفاؤلك دون أدلة يفقد الأزرق تمامًا: الحماس لا يعوّض البيانات.`,
            adapt: `احضر مستعدًا بالأدلة، واعترف بالمخاطر بصدق، ودعه يحلل قبل أن يلتزم.`,
            phrase: `هذه البيانات التي تسنده — خذ ما تحتاجه من وقت لمراجعتها جيدًا.`,
          },
        },
        green: {
          red: {
            challenge: `نهجك الحذر واللطيف يُقرأ كتردد أو نقص قناعة لدى الأحمر: ينفكّ بسرعة.`,
            adapt: `كن مباشرًا وواضحًا، وابدأ بالخلاصة، وقدّم اقتراحًا ملموسًا لا إيحاءً مفتوحًا.`,
            phrase: `أريد أن أكون مباشرًا: هذا ما أقترحه ولماذا أعتقد أنه صائب.`,
          },
          yellow: {
            challenge: `إيقاعك المتزن وتحفظك لا يوائمان طاقة الأصفر: يفسّر هدوءك كانفكاك.`,
            adapt: `جارِ طاقته عمدًا، وتواصل مع البعد الإنساني للفكرة، وأظهر حماسًا مرئيًا.`,
            phrase: `هذا يحمّسني فعلًا، وإليك لماذا يهم الفريق.`,
          },
          blue: {
            challenge: `تركيزك العلائقي قد يبدو غير دقيق أو غير صارم بما يكفي للأزرق.`,
            adapt: `اسنِد موقفك بالمنطق، ونظّم حجتك بوضوح، وأحضر أدلة إلى جانب المنظور.`,
            phrase: `فكّرت في هذا بعناية — إليك الحجة المنظَّمة لصالحه.`,
          },
        },
        blue: {
          red: {
            challenge: `تفاصيلك ومنهجك يفقدان الأحمر فورًا: يتوقف عن الإنصات قبل أن تبلغ نقطتك.`,
            adapt: `الخلاصة أولًا: اذكر استنتاجك في البداية، واجعل بيانات الدعم جاهزة كسند، ولا تبدأ بها أبدًا.`,
            phrase: `ملخص سريع: التوصية والسببان الرئيسيان؛ التفاصيل متاحة إن احتجتها.`,
          },
          yellow: {
            challenge: `تحليلك المنظَّم يبدو جافًا ومحبِطًا للأصفر: ينفكّ قبل أن تبلغ الرؤية.`,
            adapt: `افتتح بالرؤية والإمكان، وأحضر دفئًا حقيقيًا، واستخدم قصة مقنعة قبل التحليل.`,
            phrase: `قد يكون هذا شيئًا مهمًا، والبيانات تصنع حجة مقنعة له.`,
          },
          green: {
            challenge: `تحفظك العاطفي يُقرأ كبارد أو بعيد، حتى حين تكون نيتك متأنية ومراعية.`,
            adapt: `أظهر اهتمامًا حقيقيًا بمنظوره أولًا، واعترف بالعلاقة قبل المنطق.`,
            phrase: `أقدّر حقًا رأيك في هذا قبل أن أشارك ما وجدت — ما قراءتك الصادقة؟`,
          },
        },
      },
      results: {
        title: `ملف ألوانك الشخصي`,
        titleNamed: `ملف الألوان الشخصي — {name}`,
        sub: `اللون الأساسي: {colour} ({pct}%). مزيجك الكامل ورؤى مخصصة تظهر أدناه.`,
        you: `أنت`,
        compTitle: `تركيبة ألوانك`,
        profileTag: `ملف ألوانك الشخصي · {archetype}`,
        profileTitleBlend: `مزيج {primary} / {secondary}`,
        profileTitleLed: `ملف يقوده {primary}`,
        narrStrong: `{who} تقود بقوة بلون {primary} ({p}%): طاقة {archetype} تشكّل أسلوبك الافتراضي.`,
        narrEven: `{who} تُظهِر مزيجًا متوازنًا {primary}/{secondary} ({p}% / {s}%): تتنقل بين النمطين حسب السياق وما هو على المحك.`,
        narrSecondary: `{who} بالأساس {primary} ({p}%) مع {secondary} ثانوي واضح ({s}%).`,
        tiers: { dominant: `مهيمن`, secondary: `ثانوي`, minor: `طفيف`, low: `منخفض` },
        saTitle: `الوعي بالذات`,
        saSub: `نقاط قوتك الطبيعية، وسلوكيات الظل، والنقاط العمياء`,
        saStrengths: `نقاط قوتك الطبيعية`,
        saShadow: `ظلّك تحت الضغط`,
        saBlind: `نقاط عمياء يجب مراقبتها`,
        ecTitle: `التحكم العاطفي`,
        ecSub: `محفزاتك، وعلامات الإنذار المبكرة، وحركات التعافي`,
        ecTriggers: `ما يستثيرك`,
        ecWarning: `علامات الإنذار المبكرة`,
        ecRecovery: `حركات التعافي والممارسة اليومية`,
        infTitle: `التأثير في الألوان الأخرى`,
        infSub: `أكبر تحدٍّ لك وكيف تتكيّف مع كل لون تعمل معه`,
        infChallenge: `التحدي`,
        infAdapt: `كيف تتكيّف`,
        colourTag: `{name} — {archetype}`,
        retake: `أعد التقييم`,
        print: `اطبع / احفظ كـ PDF`,
      },
      footer: `برنامج الجاهزية القيادية · التقييم الذاتي للألوان — مرآة للنمو، لا صندوق تحبس نفسك فيه.`,
    },
  },
};

for (const [loc, frag] of Object.entries(T)) {
  const file = resolve(msgDir, `${loc}.json`);
  const existing = JSON.parse(readFileSync(file, "utf8"));
  writeFileSync(file, JSON.stringify(deepMerge(existing, frag), null, 2) + "\n", "utf8");
  console.log(`${loc}: merged self translations`);
}
console.log("Done.");
