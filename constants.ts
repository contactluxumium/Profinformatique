import React from 'react';
import { Translations } from './types';

export const translations: Translations = {
  ar: {
    sidebar: {
      title: "Prof Informatique",
      unites: "الوحدات",
      dashboard: "لوحة المتابعة",
      profile: "ملفي الشخصي",
      gradeSheet: "بيان النقط",
    },
    login: {
      studentSpace: "فضاء التلميذ",
      profSpace: "فضاء الأستاذ",
      login: "تسجيل الدخول",
      createAccount: "إنشاء حساب",
      profAccount: "حساب الأستاذ",
      lastName: "الاسم العائلي",
      firstName: "الاسم الشخصي",
      class: "القسم",
      number: "الرقم",
      identifiant: "المعرف",
      password: "كلمة المرور",
      selectClass: "اختر قسمك",
      errorLastName: "الاسم العائلي مطلوب (1-80 حرفًا)",
      errorFirstName: "الاسم الشخصي مطلوب (1-80 حرفًا)",
      errorClass: "القسم مطلوب",
      errorNumber: "الرقم يجب أن يكون بين 1 و 40",
      errorPassword: "كلمة المرور يجب أن تتكون من 8 أرقام بالضبط.",
      errorUserExists: "هذا الرقم مستخدم بالفعل في هذا القسم",
      errorUserNotFound: "المعرف أو كلمة المرور غير صحيحة.",
      errorWrongPassword: "كلمة مرور خاطئة",
      successCreation: "تم إنشاء الحساب بنجاح! المعرف الخاص بك هو: {id}",
      loggedInAs: "متصل بصفة",
      logout: "تسجيل الخروج",
    },
    profile: {
      title: "الملف الشخصي",
      progressTitle: "تقدمي الدراسي",
      lessonsCompleted: "الدروس المكتملة",
      totalLessons: "مجموع الدروس",
    },
    gradeSheet: {
      title: "بيان النقط",
      description: "هنا يمكنك مراجعة تفاصيل جميع الامتحانات التي أكملتها.",
      examName: "اسم الامتحان",
      finalScore: "النقطة النهائية",
      date: "وقت وتاريخ الاجتياز",
      attempt: "رقم المحاولة",
      duration: "المدة المستغرقة",
      details: "عرض التفاصيل",
      hideDetails: "إخفاء التفاصيل",
      question: "السؤال",
      yourAnswer: "إجابتك",
      correctAnswer: "الإجابة الصحيحة",
      pointsEarned: "النقطة المحصل عليها",
      totalPoints: "النقطة الإجمالية",
      total: "المجموع",
      noExams: "لم تجتز أي امتحان بعد. ستظهر نتائجك هنا بعد إكمال أول امتحان لك."
    },
    unites: {
      title: "الوحدات التعليمية",
      description: "منهج منظم يغطي أساسيات المعلوميات حسب المقرر الدراسي.",
      readMore: "اقرأ المزيد",
      previousUnit: "الوحدة السابقة",
      nextUnit: "الوحدة التالية",
      progress: "التقدم",
      locked: "مغلق",
      unitLocked: "أكمل الوحدة السابقة لفتح هذه الوحدة.",
      completePrevious: "أكمل الدرس السابق لفتح هذا الدرس.",
      quizTitle: "اختبر معلوماتك",
      allCorrect: "أحسنت! تم إكمال الدرس.",
      question: "سؤال",
      answer: "الجواب",
      submitAnswer: "تأكيد الإجابة",
      takeQuiz: "اجتياز التقييم",
      retryQuiz: "إعادة التقييم",
      yes: "نعم",
      no: "لا",
      true: "صحيح",
      false: "خطأ",
      correct: "إجابة صحيحة!",
      incorrect: "إجابة خاطئة",
      units: [
        {
          id: 'unit1',
          title: 'الوحدة 1: بيئة مادية لشبكة معلوماتية',
          description: 'فهم أساسيات الشبكات، الإعدادات المادية، والطوبولوجيا.',
          subUnits: [
            { id: 'u1_1', title: 'مفهوم شبكة المعلومات', content: React.createElement('div', null, React.createElement('h3', { className: 'text-lg font-semibold mb-2' }, 'مفهوم الشبكة'), React.createElement('p', null, 'الشبكة هي مجموعة من الكيانات (مثل الأشخاص، الطرق، أجهزة الكمبيوتر) المترابطة. في مجال المعلوماتية، الشبكة هي مجموعة من أجهزة الكمبيوتر والأجهزة الأخرى المتصلة ببعضها البعض لتبادل البيانات ومشاركة الموارد.'), React.createElement('h4', { className: 'text-md font-semibold mt-4 mb-2' }, 'فوائد الشبكة المعلوماتية:'), React.createElement('ul', { className: 'list-disc list-inside space-y-1' }, React.createElement('li', null, 'مشاركة الموارد المادية (طابعات، أقراص صلبة).'), React.createElement('li', null, 'مشاركة الموارد البرمجية (ملفات، تطبيقات).'), React.createElement('li', null, 'التواصل بين المستخدمين.'), React.createElement('li', null, 'توفير الوقت والمال.'))),
              questions: [
                { id: 1, type: 'multiple_choice', question: 'ما هو الهدف الرئيسي لشبكة المعلومات؟', options: ['تبادل البيانات', 'معالجة النصوص', 'مشاهدة الفيديو'], answer: 'تبادل البيانات', explanation: 'الشبكة المعلوماتية تُنشأ أساسًا لتمكين الأجهزة المتصلة من تبادل البيانات ومشاركة الموارد.' },
                { id: 2, type: 'vrai_faux', question: 'مشاركة الطابعة هي إحدى فوائد الشبكة المعلوماتية.', answer: true, explanation: 'مشاركة الأجهزة مثل الطابعات والماسحات الضوئية هي واحدة من أهم فوائد الشبكات.' },
                { id: 3, type: 'vrai_faux', question: 'جهازان متصلان ببعضهما البعض يعتبران شبكة معلوماتية.', answer: true, explanation: 'أبسط شكل للشبكة يتكون من جهازين متصلين، مما يسمح لهما بتبادل المعلومات.' },
                { id: 4, type: 'multiple_choice', question: 'أي من التالي ليس من فوائد الشبكة؟', options: ['توفير الوقت', 'زيادة التكلفة', 'مشاركة الملفات'], answer: 'زيادة التكلفة', explanation: 'الشبكات تهدف إلى تقليل التكاليف عبر مشاركة الموارد، وليس زيادتها.' },
                { id: 5, type: 'vrai_faux', question: 'الشبكات تسمح فقط بمشاركة الموارد المادية.', answer: false, explanation: 'الشبكات تسمح بمشاركة الموارد المادية (الطابعات) والبرمجية (الملفات، التطبيقات).' },
              ]
            },
            {
              id: 'u1_2',
              title: 'أنواع الشبكات',
              content: React.createElement('div', null, React.createElement('p', null, 'يمكن تنظيم الشبكات بطريقتين رئيسيتين:'), React.createElement('h4', { className: 'text-md font-semibold mt-4 mb-2' }, '1. شبكة النظير للنظير (Poste à poste - P2P):'), React.createElement('p', null, 'جميع أجهزة الكمبيوتر متساوية وتتشارك الموارد مباشرة مع بعضها البعض دون وجود خادم مركزي.'), React.createElement('h4', { className: 'text-md font-semibold mt-4 mb-2' }, '2. شبكة العميل/الخادم (Client/Serveur):'), React.createElement('p', null, 'يوجد جهاز كمبيوتر مركزي (الخادم) يقوم بتوفير الموارد والخدمات لأجهزة الكمبيوتر الأخرى (العملاء). هذا النوع يوفر إدارة مركزية وأمانًا أفضل.')),
              questions: [
                { id: 1, type: 'vrai_faux', question: "شبكة Client/Serveur لا تحتوي على خادم مركزي.", answer: false, explanation: 'شبكة العميل/الخادم تعتمد على خادم مركزي يقدم الخدمات للعملاء.' },
                { id: 2, type: 'multiple_choice', question: "في أي نوع من الشبكات تكون جميع الأجهزة متساوية؟", options: ["العميل/الخادم", "النظير للنظير", "طوبولوجيا النجمة"], answer: "النظير للنظير", explanation: 'في شبكة النظير للنظير (P2P)، كل جهاز له نفس الصلاحيات ويمكنه مشاركة الملفات مباشرة.' },
                { id: 3, type: 'vrai_faux', question: 'شبكة النظير للنظير توفر أمانًا أفضل من شبكة العميل/الخادم.', answer: false, explanation: 'شبكة العميل/الخادم أكثر أمانًا بسبب الإدارة المركزية للأمان والصلاحيات.' },
                { id: 4, type: 'multiple_choice', question: 'في شبكة العميل/الخادم، ماذا يطلق على الجهاز الذي يطلب الخدمة؟', options: ['الخادم', 'العميل', 'المحول'], answer: 'العميل', explanation: 'العميل هو الجهاز الذي يطلب ويستخدم الخدمات التي يقدمها الخادم.' },
                { id: 5, type: 'multiple_choice', question: 'يمكن تنظيم الشبكات المعلوماتية حسب مبدأين:', options: ['العميل/الخادم والنظير للنظير', 'طوبولوجيا النجمة والحلقة', 'الشبكات السلكية واللاسلكية'], answer: 'العميل/الخادم والنظير للنظير', explanation: 'هذان هما النموذجان الرئيسيان لتنظيم العلاقات بين الأجهزة في الشبكة.' },
              ]
            },
            { id: 'u1_3', title: 'التكوين المادي لجهاز واحد', content: React.createElement('div', null, React.createElement('h4', { className: 'text-md font-semibold mb-2' }, 'الاتصال السلكي:'), React.createElement('p', null, 'يتطلب بطاقة شبكة (carte réseau) في كل جهاز وكابلات لتوصيلها. أكثر أنواع الموصلات شيوعًا هي RJ45 للكابلات المزدوجة المجدولة و BNC للكابلات المحورية.'), React.createElement('h4', { className: 'text-md font-semibold mt-4 mb-2' }, 'الاتصال اللاسلكي (Wi-Fi):'), React.createElement('p', null, 'يتطلب محولات لاسلكية (adaptateurs sans fil) في كل جهاز. تأتي هذه المحولات بأشكال مختلفة مثل بطاقات PCI أو محولات USB أو بطاقات PCMCIA لأجهزة الكمبيوتر المحمولة.')),
              questions: [
                  { id: 1, type: 'multiple_choice', question: 'ما هو المكون الضروري للاتصال بشبكة سلكية؟', options: ['محول USB WIFI', 'بطاقة شبكة', 'نقطة وصول'], answer: 'بطاقة شبكة', explanation: 'بطاقة الشبكة هي الواجهة المادية التي تسمح للكمبيوتر بالاتصال بالشبكة عبر كابل.' },
                  { id: 2, type: 'vrai_faux', question: 'موصل RJ45 يستخدم مع الكابلات المحورية.', answer: false, explanation: 'موصل RJ45 يستخدم مع الكابلات المزدوجة المجدولة، بينما يستخدم موصل BNC مع الكابلات المحورية.' },
                  { id: 3, type: 'multiple_choice', question: 'ما هو الجهاز اللازم للاتصال بشبكة Wi-Fi؟', options: ['محول لاسلكي', 'كابل شبكة', 'Hub'], answer: 'محول لاسلكي', explanation: 'المحول اللاسلكي (مثل بطاقة Wi-Fi) ضروري لالتقاط الإشارات اللاسلكية والاتصال بالشبكة.' },
                  { id: 4, type: 'multiple_choice_multiple', question: 'أي من هذه الأجهزة هي محولات لاسلكية؟', options: ['بطاقة PCI WIFI', 'محول USB WIFI', 'Hub'], answer: ['بطاقة PCI WIFI', 'محول USB WIFI'], explanation: 'بطاقات PCI WIFI ومحولات USB WIFI كلاهما من أنواع المحولات اللاسلكية. أما الـ Hub فهو جهاز لتوصيل الشبكات السلكية.' },
                  { id: 5, type: 'vrai_faux', question: 'الكابلات الضوئية تستخدم الضوء لنقل الإشارات.', answer: true, explanation: 'تعتمد الألياف الضوئية على نبضات ضوئية لنقل البيانات، مما يسمح بسرعات عالية ومسافات طويلة.' },
              ]
            },
            {
              id: 'u1_4',
              title: 'طوبولوجيا الشبكات',
              content: React.createElement('div', null, React.createElement('p', { className: 'mb-2' }, 'الطوبولوجيا هي الطريقة التي يتم بها ترتيب وتوصيل الأجهزة في الشبكة.'), React.createElement('ul', { className: 'list-disc list-inside space-y-1' }, React.createElement('li', null, React.createElement('strong', null, 'طوبولوجيا الناقل (Bus):'), ' جميع الأجهزة متصلة بكابل واحد مشترك.'), React.createElement('li', null, React.createElement('strong', null, 'طوبولوجيا الحلقة (Anneau):'), ' يتم توصيل كل جهاز بالجهاز الذي يليه في حلقة مغلقة.'), React.createElement('li', null, React.createElement('strong', null, 'طوبولوجيا النجمة (Étoile):'), ' يتم توصيل جميع الأجهزة بجهاز مركزي (مثل Hub أو Switch).'))),
              questions: [
                { id: 1, type: 'multiple_choice', question: "ما هو الجهاز الذي يربط أجهزة كمبيوتر متعددة في طوبولوجيا النجمة؟", options: ["كابل محوري", "Switch", "بطاقة شبكة"], answer: "Switch", explanation: 'في طوبولوجيا النجمة، يعمل الـ Switch أو الـ Hub كنقطة اتصال مركزية لجميع الأجهزة.' },
                { id: 2, type: 'multiple_choice', question: 'في أي طوبولوجيا تكون جميع الأجهزة متصلة بكابل واحد مشترك؟', options: ['الناقل', 'الحلقة', 'النجمة'], answer: 'الناقل', explanation: 'تتميز طوبولوجيا الناقل بوجود كابل رئيسي واحد تتصل به جميع أجهزة الشبكة.' },
                { id: 3, type: 'vrai_faux', question: 'في طوبولوجيا الحلقة، يتواصل كل جهاز مع الجهاز الذي يليه.', answer: true, explanation: 'في طوبولوجيا الحلقة، تنتقل البيانات في اتجاه واحد من جهاز إلى آخر حتى تصل إلى وجهتها.' },
                { id: 4, type: 'multiple_choice', question: 'ما هي الطوبولوجيا الأكثر عرضة للتوقف الكامل إذا فشل الكابل الرئيسي؟', options: ['النجمة', 'الحلقة', 'الناقل'], answer: 'الناقل', explanation: 'إذا انقطع الكابل الرئيسي في طوبولوجيا الناقل، تتوقف الشبكة بأكملها عن العمل.' },
                { id: 5, type: 'vrai_faux', question: 'تستخدم طوبولوجيا النجمة جهازًا مركزيًا.', answer: true, explanation: 'تعتمد طوبولوجيا النجمة على جهاز مركزي (Hub أو Switch) لتوصيل جميع الأجهزة.' },
              ]
            },
            {
              id: 'u1_5',
              title: 'التكوين المادي للشبكة',
              content: React.createElement('div', null, React.createElement('h4', { className: 'text-md font-semibold mb-2' }, 'الشبكة السلكية:'), React.createElement('ul', { className: 'list-disc list-inside space-y-1' }, React.createElement('li', null, React.createElement('strong', null, 'لتوصيل جهازين:'), ' تحتاج إلى بطاقتي شبكة وكابل مزدوج مجدول متصالب (croisé).'), React.createElement('li', null, React.createElement('strong', null, 'لأكثر من جهازين:'), ' تحتاج إلى جهاز مركزي مثل Hub أو Switch، بالإضافة إلى بطاقات شبكة وكابلات لكل جهاز.')), React.createElement('h4', { className: 'text-md font-semibold mt-4 mb-2' }, 'الشبكة اللاسلكية:'), React.createElement('ul', { className: 'list-disc list-inside space-y-1' }, React.createElement('li', null, React.createElement('strong', null, 'لتوصيل جهازين:'), ' تحتاج فقط إلى محول Wi-Fi لكل جهاز.'), React.createElement('li', null, React.createElement('strong', null, 'لأكثر من جهازين:'), ' تحتاج إلى نقطة وصول (point d\'accès) بالإضافة إلى محولات Wi-Fi.'))),
              questions: [
                { id: 1, type: 'vrai_faux', question: "تحتاج إلى شبكة معلومات لمعالجة نص.", answer: false, explanation: 'معالجة النصوص هي مهمة محلية على الكمبيوتر ولا تتطلب اتصالاً بالشبكة.' },
                { id: 2, type: 'vrai_faux', question: "تحتاج إلى شبكة معلومات لمشاركة طابعة.", answer: true, explanation: 'تسمح الشبكات لعدة مستخدمين باستخدام نفس الطابعة، مما يوفر التكاليف.' },
                { id: 3, type: 'multiple_choice_multiple', question: 'لتوصيل جهازين في شبكة سلكية، نستخدم:', options: ['بطاقات شبكة', 'نقطة وصول', 'كابلات مزدوجة مجدولة', 'Switch'], answer: ['بطاقات شبكة', 'كابلات مزدوجة مجدولة'], explanation: 'لتوصيل جهازين مباشرة، يحتاج كل جهاز إلى بطاقة شبكة، ويتم الربط بينهما بكابل شبكة (عادةً كابل متصالب).' },
                { id: 4, type: 'multiple_choice', question: 'لتوصيل أكثر من جهازين في شبكة لاسلكية، نستخدم:', options: ['نقطة وصول', 'Hub', 'كابلات مزدوجة مجدولة'], answer: 'نقطة وصول', explanation: 'تعمل نقطة الوصول كجهاز مركزي لإدارة الاتصالات بين الأجهزة المختلفة في شبكة لاسلكية.' },
                { id: 5, type: 'multiple_choice', question: 'ما هو الجهاز الذي يسمح بتوصيل عدة أجهزة في شبكة سلكية محلية؟', options: ['Switch', 'نقطة وصول', 'مودم'], answer: 'Switch', explanation: 'الـ Switch (المحول) هو الجهاز الأساسي المستخدم لإنشاء شبكة سلكية محلية عن طريق توصيل عدة أجهزة.' },
              ]
            },
          ]
        },
        {
          id: 'unit2',
          title: 'الوحدة 2: تبادل المعلومات',
          description: 'تعلم كيفية مشاركة الملفات والموارد عبر الشبكة المحلية.',
          subUnits: [
            {
              id: 'u2_1',
              title: 'مشاركة وتبادل الملفات عبر شبكة محلية',
              content: React.createElement('div', null, React.createElement('p', null, 'لمشاركة ملف على جهازك، يجب وضعه أولاً في مجلد مشترك. يمكن بعد ذلك الوصول إلى هذا الملف من قبل أجهزة الكمبيوتر الأخرى على الشبكة. يمكن التحكم في الأذونات لتحديد ما إذا كان يمكن للمستخدمين الآخرين قراءة الملف فقط أو تعديله أيضًا. للوصول إلى الملفات المشتركة، يمكنك استعراض الشبكة من خلال أيقونة "الشبكة" على سطح المكتب.')),
              questions: [
                { id: 1, type: 'vrai_faux', question: "لمشاركة ملف، يجب أن يكون في مجلد عادي.", answer: false, explanation: 'يجب أن يكون الملف داخل مجلد تم تعيينه كـ "مجلد مشترك" ليتمكن الآخرون على الشبكة من الوصول إليه.' },
                { id: 2, type: 'multiple_choice', question: "للوصول إلى الملفات المشتركة على الشبكة، أي أيقونة يجب النقر عليها؟", options: ['جهاز الكمبيوتر', 'الشبكة', 'سلة المحذوفات'], answer: "الشبكة", explanation: 'أيقونة "الشبكة" في نظام التشغيل هي البوابة لاستعراض الأجهزة والمجلدات المشتركة على الشبكة المحلية.' },
                { id: 3, type: 'multiple_choice_multiple', question: "ما هي فوائد الشبكة؟ (اختر كل ما ينطبق)", options: ["مشاركة الطابعة", "اللعب وحيدًا", "مشاركة الملفات", "مشاهدة التلفاز"], answer: ["مشاركة الطابعة", "مشاركة الملفات"], explanation: 'مشاركة الموارد مثل الطابعات والملفات هي من أهم فوائد الشبكات المعلوماتية.' },
                { id: 4, type: 'vrai_faux', question: 'يمكن التحكم في أذونات الوصول إلى مجلد مشترك.', answer: true, explanation: 'يمكنك تحديد من يمكنه قراءة الملفات فقط ومن يمكنه تعديلها أو حذفها، مما يزيد من الأمان.' },
                { id: 5, type: 'multiple_choice', question: 'ما هو الشرط الأول لمشاركة ملف عبر الشبكة؟', options: ['إرساله بالبريد الإلكتروني', 'وضعه في مجلد مشترك', 'نسخه على قرص USB'], answer: 'وضعه في مجلد مشترك', explanation: 'الخطوة الأولى والأساسية هي وضع الملف في مجلد تم إعداده للمشاركة عبر الشبكة.' },
              ]
            }
          ]
        },
        {
          id: 'unit3',
          title: 'الوحدة 3: المجدول (Le tableur)',
          description: 'استكشاف أساسيات برامج الجداول الإلكترونية مثل Excel.',
          subUnits: [
            { id: 'u3_1', title: 'تعريف ووظائف المجدول', content: 'المجدول هو برنامج تطبيقي لإنشاء ومعالجة جداول البيانات الرقمية. يسمح بإدخال البيانات، وتنسيقها، وإجراء عمليات حسابية معقدة، وإنشاء رسوم بيانية.',
              questions: [
                { id: 1, type: 'vrai_faux', question: 'المجدول يستخدم بشكل أساسي لكتابة الرسائل.', answer: false, explanation: 'برامج معالجة النصوص مثل Word هي المستخدمة لكتابة الرسائل، بينما المجدول مخصص للجداول والحسابات.' },
                { id: 2, type: 'multiple_choice', question: 'إحدى الوظائف الرئيسية للمجدول هي:', options: ['تصفح الإنترنت', 'إجراء العمليات الحسابية', 'تعديل الصور'], answer: 'إجراء العمليات الحسابية', explanation: 'تكمن قوة المجدولات في قدرتها على إجراء حسابات معقدة تلقائيًا باستخدام الصيغ والدوال.' },
                { id: 3, type: 'multiple_choice', question: 'ما هي التمثيلات المرئية للبيانات في المجدول؟', options: ['الصيغ', 'الخلايا', 'الرسوم البيانية'], answer: 'الرسوم البيانية', explanation: 'الرسوم البيانية (مثل الأعمدة والدوائر) تحول الأرقام إلى صور مرئية سهلة الفهم.' },
              ]
            },
            { id: 'u3_2', title: 'بيئة Excel', content: 'المستند الرئيسي في Excel يسمى مصنف (classeur)، وهو يتكون من عدة أوراق عمل (feuilles). كل ورقة عبارة عن جدول كبير يتكون من صفوف (lignes) مرقمة وأعمدة (colonnes) مسماة بأحرف. تقاطع صف وعمود يسمى خلية (cellule)، ولكل خلية عنوان فريد (مثل B3).',
              questions: [
                { id: 1, type: 'multiple_choice', question: 'ماذا يسمى المستند في Excel؟', options: ['ورقة', 'مصنف', 'جدول'], answer: 'مصنف', explanation: 'المصنف (Classeur) هو الملف الكامل في Excel، ويمكن أن يحتوي على ورقة عمل واحدة أو أكثر.' },
                { id: 2, type: 'vrai_faux', question: 'تتكون ورقة العمل من صفوف مسماة بأحرف وأعمدة مرقمة.', answer: false, explanation: 'العكس هو الصحيح: الصفوف مرقمة (1, 2, 3...) والأعمدة مسماة بأحرف (A, B, C...).' },
                { id: 3, type: 'multiple_choice', question: 'تقاطع صف وعمود يسمى:', options: ['ورقة', 'مصنف', 'خلية'], answer: 'خلية', explanation: 'الخلية هي الوحدة الأساسية في ورقة العمل حيث يتم إدخال البيانات، وعنوانها يتكون من حرف العمود ورقم الصف (مثل A1).' },
              ]
            },
            { id: 'u3_3', title: 'إدخال ومحاذاة البيانات', content: 'لبدء إدخال البيانات، انقر فوق خلية لجعلها نشطة. بشكل افتراضي، تتم محاذاة النصوص إلى اليسار، بينما تتم محاذاة الأرقام والتواريخ إلى اليمين.',
              questions: [
                { id: 1, type: 'vrai_faux', question: 'في Excel، تتم محاذاة الأرقام إلى اليسار بشكل افتراضي.', answer: false, explanation: 'بشكل افتراضي، تتم محاذاة الأرقام إلى اليمين والنصوص إلى اليسار. هذا يساعد على التمييز بين أنواع البيانات.' },
                { id: 2, type: 'multiple_choice', question: 'لإدخال بيانات في خلية، يجب أولاً:', options: ['حفظ المصنف', 'تحديد الخلية', 'طباعة الورقة'], answer: 'تحديد الخلية', explanation: 'يجب دائمًا تحديد الخلية التي تريد إدخال البيانات فيها لجعلها الخلية النشطة.' },
              ]
            },
            { id: 'u3_8', title: 'المراجع النسبية والصيغ', content: 'الصيغة هي تعبير يبدأ بعلامة (=) ويقوم بإجراء عملية حسابية. تستخدم الصيغ مراجع الخلايا (مثل B2). المرجع النسبي يتغير عند نسخ الصيغة إلى خلية أخرى.',
              questions: [
                { id: 1, type: 'vrai_faux', question: 'يجب أن تبدأ كل الصيغ بعلامة #.', answer: false, explanation: 'لإخبار Excel بأنك تقوم بإدخال صيغة وليس نصًا عاديًا، يجب أن تبدأ دائمًا بعلامة المساواة (=).' },
                { id: 2, type: 'multiple_choice', question: 'أي نوع من المراجع يتغير تلقائيًا عند نسخ الصيغة؟', options: ['المطلق', 'النسبي', 'المختلط'], answer: 'النسبي', explanation: 'المراجع النسبية (مثل A1) تتكيف مع موقعها الجديد عند نسخها، مما يسهل تطبيق نفس الصيغة على صفوف أو أعمدة متعددة.' },
              ]
            },
            {
              id: 'u3_9',
              title: 'المراجع المطلقة',
              content: 'المرجع المطلق (مثل $G$2) يشير دائمًا إلى نفس الخلية حتى عند نسخ الصيغة. يتم استخدامه لتثبيت مرجع خلية معينة في الحسابات.',
              questions: [
                { id: 1, type: 'vrai_faux', question: "المرجع المطلق يتغير عند نسخ الصيغة.", answer: false, explanation: 'علامة الدولار ($) "تُثبّت" مرجع العمود و/أو الصف, لذا فهو لا يتغير عند نسخ الصيغة.' },
                { id: 2, type: 'multiple_choice', question: "ما هي الصيغة الصحيحة لمتوسط B2 و B3؟", options: ["=B2+B3/2", "=(B2+B3)/2", "=MOYENNE(B2+B3)"], answer: "=(B2+B3)/2", explanation: 'لحساب المتوسط الحسابي، يجب جمع القيم أولاً (باستخدام الأقواس) ثم القسمة على عددها.' },
                { id: 3, type: 'multiple_choice', question: 'كيف تتم كتابة مرجع مطلق للخلية A1؟', options: ['A1', '$A$1', 'A$1'], answer: '$A$1', explanation: 'علامة الدولار قبل حرف العمود وقبل رقم الصف ($A$1) تجعل المرجع مطلقًا بالكامل.' },
              ]
            },
            { id: 'u3_11', title: 'الرسوم البيانية والطباعة', content: 'الرسوم البيانية هي تمثيلات مرئية للبيانات. Excel يوفر أنواعًا متعددة من الرسوم البيانية. تتيح خيارات إعداد الصفحة والطباعة التحكم الكامل في كيفية ظهور المستند المطبوع.',
              questions: [
                { id: 1, type: 'vrai_faux', question: 'تساعد الرسوم البيانية على فهم البيانات بشكل أفضل.', answer: true, explanation: 'تحول الرسوم البيانية جداول الأرقام المعقدة إلى صور مرئية سهلة القراءة والمقارنة.' },
                { id: 2, type: 'vrai_faux', question: 'لا يمكنك التحكم في هوامش الصفحة عند الطباعة في Excel.', answer: false, explanation: 'يوفر Excel خيارات متقدمة لإعداد الصفحة، بما في ذلك التحكم في الهوامش واتجاه الصفحة وتكرار العناوين.' },
              ]
            }
          ]
        },
        {
          id: 'unit4',
          title: 'الوحدة 4: برمجة LOGO',
          description: 'مقدمة في البرمجة من خلال لغة LOGO الممتعة.',
          subUnits: [
            { id: 'u4_1', title: 'بيئة XLOGO', content: 'XLOGO هي بيئة برمجة مصممة لتعليم أساسيات البرمجة. تتكون الواجهة من سلحفاة (tortue) تتحرك على منطقة رسم (zone de dessin) بناءً على الأوامر التي يتم إدخالها في وحدة التحكم (console).',
              questions: [
                  { id: 1, type: 'multiple_choice', question: 'في XLOGO، ماذا يسمى الكائن الذي يرسم على الشاشة؟', options: ['القلم', 'المؤشر', 'السلحفاة'], answer: 'السلحفاة', explanation: 'السلحفاة هي الكائن الرسومي الذي يتحرك على الشاشة وينفذ الأوامر، تاركًا أثرًا خلفه إذا كان القلم منخفضًا.' },
                  { id: 2, type: 'vrai_faux', question: 'نكتب الأوامر في XLOGO في منطقة الرسم.', answer: false, explanation: 'يتم كتابة الأوامر في منطقة خاصة تسمى وحدة التحكم أو سطر الأوامر، وتظهر النتيجة في منطقة الرسم.' },
              ]
            },
            {
              id: 'u4_2',
              title: 'الأوامر الأساسية',
              content: 'الأوامر الأساسية (primitives) هي الكلمات التي يفهمها XLOGO. أهمها: `AVANCE` (للتحرك إلى الأمام)، `TOURNEDROITE` (للاستدارة إلى اليمين)، `VE` (لمسح الشاشة)، `LC` (لرفع القلم)، و `BC` (لإنزال القلم).',
              questions: [
                { id: 1, type: 'vrai_faux', question: "الأمر `LC` يجعل السلحفاة ترسم خطاً.", answer: false, explanation: '`LC` (LèveCrayon) يرفع القلم، فتتحرك السلحفاة دون أن ترسم. الأمر `BC` (BaisseCrayon) هو الذي يجعلها ترسم.' },
                {
                  id: 2,
                  type: 'drag_drop',
                  question: 'قم بمطابقة كل أمر بوظيفته الصحيحة.',
                  dragOptions: {
                    draggables: [
                      { id: 'd1', label: 'AVANCE' },
                      { id: 'd2', label: 'TOURNEDROITE' },
                      { id: 'd3', label: 'LC' },
                    ],
                    droppables: [
                      { id: 'p1', label: 'الاستدارة إلى اليمين' },
                      { id: 'p2', label: 'رفع القلم' },
                      { id: 'p3', label: 'التحرك إلى الأمام' },
                    ],
                  },
                  answer: { p1: 'd2', p2: 'd3', p3: 'd1' },
                  explanation: '`AVANCE` للتحرك للأمام، `TOURNEDROITE` (أو TD) للاستدارة يمينًا، و `LC` لرفع القلم.'
                },
                { id: 3, type: 'multiple_choice', question: 'ما هو الأمر الذي يمسح الشاشة؟', options: ['AVANCE', 'VE', 'BC'], answer: 'VE', explanation: 'الأمر `VE` (VideEcran) يمسح كل الرسومات من على الشاشة ويعيد السلحفاة إلى نقطة البداية.' },
                { id: 4, type: 'multiple_choice', question: 'لتحريك السلحفاة إلى الأمام 50 خطوة، نكتب الأمر ____ 50', options: ['AVANCE', 'TD', 'LC'], answer: 'AVANCE', explanation: 'الأمر `AVANCE` (أو `AV`) يأخذ قيمة عددية تمثل عدد الخطوات التي ستتحركها السلحفاة إلى الأمام.' },
              ]
            },
            {
              id: 'u4_3',
              title: 'أمر التكرار REPETE',
              content: 'لتجنب تكرار كتابة نفس الأوامر، يمكن استخدام الأمر `REPETE`. صيغته هي: `REPETE n [bloc d\'instructions]`. على سبيل المثال، لرسم مربع، نكتب: `REPETE 4 [AV 100 TD 90]`.',
              questions: [
                { id: 1, type: 'multiple_choice', question: "لإكمال الأمر الخاص برسم مربع طول ضلعه 50: `REPETE 4 [AV 50 TD ___]`، ما هي القيمة التي يجب وضعها؟", options: ["45", "90", "180"], answer: "90", explanation: 'لرسم مربع، يجب أن تكون الزاوية بين كل ضلعين 90 درجة.' },
                { id: 2, type: 'vrai_faux', question: 'الأمر `REPETE` يستخدم لتنفيذ أمر مرة واحدة فقط.', answer: false, explanation: 'الأمر `REPETE` يستخدم لتنفيذ مجموعة من الأوامر عددًا محددًا من المرات، مما يسهل رسم الأشكال المنتظمة.' },
                { id: 3, type: 'multiple_choice', question: 'لرسم مثلث متساوي الأضلاع، كم مرة يجب أن نكرر الأوامر؟', options: ['3', '4', '5'], answer: '3', explanation: 'المثلث له 3 أضلاع، لذا نكرر أوامر رسم الضلع والاستدارة 3 مرات.' },
              ]
            },
            { id: 'u4_4', title: 'رسم الأشكال الهندسية', content: 'باستخدام الأوامر الأساسية وأمر التكرار، يمكن رسم أشكال هندسية معقدة. لرسم دائرة، يمكن استخدام الأمر `CERCLE` متبوعًا بنصف القطر، أو استخدام التكرار مثل: `REPETE 360 [AV 1 TD 1]`.',
              questions: [
                  { id: 1, type: 'multiple_choice', question: 'لإكمال الأمر الخاص برسم دائرة نصف قطرها 50: `____ 50`، ما هو الأمر الذي يجب استخدامه؟', options: ['CERCLE', 'CARRE', 'AVANCE'], answer: 'CERCLE', explanation: 'الأمر `CERCLE` هو أمر مخصص في LOGO لرسم دائرة، ويأخذ نصف القطر كمعامل.' },
                  { id: 2, type: 'vrai_faux', question: 'لا يمكن رسم أشكال معقدة باستخدام الأوامر الأساسية فقط.', answer: false, explanation: 'يمكن رسم أشكال معقدة جدًا عن طريق الجمع بين الأوامر الأساسية وأمر التكرار والإجراءات المخصصة.' },
              ]
            }
          ]
        },
      ]
    },
    exams: {
      title: "الامتحانات الشاملة",
      description: "قم بتقييم فهمك الكامل لكل وحدة من خلال امتحان شامل.",
      takeExam: "اجتياز الامتحان",
      score: "النتيجة",
      reviewAnswers: "مراجعة الإجابات",
      yourAnswer: "إجابتك",
      correctAnswer: "الإجابة الصحيحة",
      submitExam: "إرسال الإجابات",
      questionProgress: "سؤال {current} من {total}",
      timeLeft: "الوقت المتبقي",
      examsList: [
        {
          id: 'exam1',
          title: 'امتحان الوحدة 1: بيئة مادية لشبكة معلوماتية',
          description: 'اختبر معرفتك الشاملة بمفاهيم الشبكات، أنواعها، طوبولوجياتها، والمكونات المادية.',
          questions: [
            { id: 1, type: 'multiple_choice', question: 'ما هو النموذج الذي يعتمد على جهاز مركزي لتوفير الخدمات؟', options: ['النظير للنظير', 'العميل/الخادم', 'الناقل'], answer: 'العميل/الخادم', explanation: 'نموذج العميل/الخادم يستخدم خادمًا مركزيًا لإدارة الموارد والخدمات.' },
            { id: 2, type: 'vrai_faux', question: 'في طوبولوجيا النجمة، يؤدي فشل الجهاز المركزي إلى توقف الشبكة بأكملها.', answer: true, explanation: 'لأن جميع الاتصالات تمر عبر الجهاز المركزي (Switch أو Hub)، فإن فشله يعطل الشبكة بالكامل.' },
            { id: 3, type: 'multiple_choice', question: 'أي جهاز يستخدم لتوصيل شبكتين محليتين مختلفتين أو شبكة محلية بالإنترنت؟', options: ['Hub', 'Switch', 'Router'], answer: 'Router', explanation: 'الـ Router (الموجه) هو الجهاز المسؤول عن توجيه البيانات بين الشبكات المختلفة.' },
            { 'type': 'multiple_choice_multiple', 'question': 'ما هي المكونات المادية اللازمة لإنشاء شبكة سلكية من 3 أجهزة كمبيوتر؟', 'options': ['بطاقات شبكة', 'Switch', 'نقطة وصول', 'كابلات شبكة'], 'answer': ['بطاقات شبكة', 'Switch', 'كابلات شبكة'], 'explanation': 'كل جهاز يحتاج بطاقة شبكة، ويتم توصيلهم جميعًا بجهاز مركزي (Switch) باستخدام كابلات شبكة.' },
            { id: 5, type: 'vrai_faux', question: 'شبكة النظير للنظير (P2P) هي الأفضل لإدارة شبكة كبيرة تضم 100 جهاز.', answer: false, explanation: 'شبكة النظير للنظير تصبح صعبة الإدارة وغير آمنة مع زيادة عدد الأجهزة. شبكة العميل/الخادم هي الخيار الأفضل للشبكات الكبيرة.' },
            { id: 6, type: 'multiple_choice', question: 'ما هو نوع الكابل المستخدم لتوصيل جهازين مباشرة بدون جهاز مركزي؟', options: ['كابل مستقيم (droit)', 'كابل متصالب (croisé)', 'كابل محوري (coaxial)'], answer: 'كابل متصالب (croisé)', explanation: 'الكابل المتصالب يعكس ترتيب الأسلاك مما يسمح لجهازين من نفس النوع بالاتصال مباشرة.' },
            { id: 7, type: 'vrai_faux', question: 'الشبكة اللاسلكية (Wi-Fi) أسرع دائمًا من الشبكة السلكية.', answer: false, explanation: 'بشكل عام، توفر الشبكات السلكية (خاصة التي تستخدم الألياف الضوئية أو كابلات Ethernet الحديثة) سرعات أعلى واتصالًا أكثر استقرارًا من الشبكات اللاسلكية.' },
            { id: 8, type: 'multiple_choice', question: 'في أي طوبولوجيا تنتقل البيانات في اتجاه واحد عبر كل جهاز؟', options: ['النجمة', 'الناقل', 'الحلقة'], answer: 'الحلقة', explanation: 'في طوبولوجيا الحلقة، تنتقل الإشارة من جهاز إلى الذي يليه في حلقة مغلقة.' },
            { id: 9, type: 'vrai_faux', question: 'مشاركة الملفات هي الفائدة الوحيدة للشبكات.', answer: false, explanation: 'تشمل فوائد الشبكات أيضًا مشاركة الموارد المادية (الطابعات)، والتواصل (البريد الإلكتروني)، والوصول إلى الإنترنت.' },
            { id: 10, type: 'situation_problem', question: 'وضعية مشكلة: يريد مدير مقاولة صغيرة ربط 5 حواسيب وطابعة في مكاتب الشركة لتبادل الملفات والطباعة. ما هو أفضل حل من الحلول التالية مع الأخذ بعين الاعتبار السهولة في التركيب والأمان؟', options: ['شبكة نظير لنظير بطوبولوجيا الناقل باستخدام كابل محوري.', 'شبكة عميل/خادم بطوبولوجيا النجمة باستخدام Switch وجعل أحد الحواسيب خادماً للملفات والطابعة.', 'ربط كل حاسوب بالآخر مباشرة باستخدام كابلات متصالبة.'], answer: 'شبكة عميل/خادم بطوبولوجيا النجمة باستخدام Switch وجعل أحد الحواسيب خادماً للملفات والطابعة.', explanation: 'هذا الحل هو الأكثر تنظيماً وأماناً. طوبولوجيا النجمة مع Switch تضمن أنه إذا تعطل كابل واحد، لا تتأثر بقية الشبكة. استخدام جهاز كخادم يسهل إدارة الملفات المشتركة والطابعة بشكل مركزي وآمن.' },
          ]
        },
         {
          id: 'exam2',
          title: 'امتحان الوحدة 2: تبادل المعلومات',
          description: 'تقييم قدرتك على فهم وممارسة مشاركة الملفات والموارد بشكل آمن عبر الشبكة المحلية.',
          questions: [
            // ... Questions for unit 2 exam
             { id: 1, type: 'vrai_faux', question: 'للوصول إلى ملف مشترك على جهاز آخر، يجب أن يكون لديك حساب مستخدم على ذلك الجهاز.', answer: true, explanation: 'الوصول إلى الموارد المشتركة يتم التحكم فيه عادةً من خلال أذونات المستخدمين لضمان الأمان.' },
             { id: 2, type: 'multiple_choice', question: 'ما هو أول شيء يجب فعله لمشاركة مجلد؟', options: ['إعادة تسميته', 'تغيير خصائص المشاركة', 'حذفه'], answer: 'تغيير خصائص المشاركة', explanation: 'يجب الدخول إلى خصائص المجلد وتفعيل خيارات المشاركة وتعيين الأذونات.' },
             { id: 10, type: 'situation_problem', question: 'وضعية مشكلة: في قسم دراسي، يريد الأستاذ أن يضع ملفات الدروس في مجلد مشترك على حاسوبه ليتمكن التلاميذ من قراءتها ونسخها فقط، دون أن يتمكنوا من تعديلها أو حذفها. ما هي الأذونات التي يجب على الأستاذ منحها للتلاميذ على المجلد المشترك؟', options: ['تحكم كامل (Full Control)', 'تعديل (Modify)', 'قراءة فقط (Read)'], answer: 'قراءة فقط (Read)', explanation: 'إذن "القراءة فقط" يسمح للمستخدمين بفتح الملفات ونسخها ولكن يمنعهم من إجراء أي تغييرات عليها، وهو ما يحقق هدف الأستاذ تمامًا.' }
          ]
        },
         {
          id: 'exam3',
          title: 'امتحان الوحدة 3: المجدول',
          description: 'اختبر كفاءتك في استخدام المجدول، من إدخال البيانات إلى إنشاء الصيغ والرسوم البيانية.',
          questions: [
            // ... Questions for unit 3 exam
             { id: 1, type: 'multiple_choice', question: 'ماذا يعني الخطأ ‎#DIV/0!‎ في خلية؟', options: ['مرجع خلية غير صالح', 'القسمة على صفر', 'قيمة غير متوفرة'], answer: 'القسمة على صفر', explanation: 'يظهر هذا الخطأ عندما تحاول صيغة قسمة رقم على صفر، وهو أمر غير ممكن رياضيًا.' },
             { id: 2, type: 'vrai_faux', question: 'المرجع المطلق $A$1 يصبح $B$1 عند نسخه إلى الخلية المجاورة.', answer: false, explanation: 'علامات الدولار ($) تثبت المرجع، لذا سيبقى $A$1 دائمًا عند نسخه.' },
             { id: 10, type: 'situation_problem', question: 'وضعية مشكلة: لديك جدول بيانات يحتوي على أسعار المنتجات في العمود B (من B2 إلى B10). تريد حساب السعر بعد إضافة ضريبة القيمة المضافة (TVA) بنسبة 20% الموجودة في الخلية F1. ما هي أفضل صيغة لكتابتها في الخلية C2 لتقوم بحساب السعر الجديد ومن ثم نسخها لبقية المنتجات؟', options: ['=B2*20%', '=B2+(B2*F1)', '=B2*(1+$F$1)'], answer: '=B2*(1+$F$1)', explanation: 'هذه الصيغة هي الأفضل لأنها تستخدم مرجعًا مطلقًا ($F$1) لخلية الضريبة، مما يسمح بنسخ الصيغة بشكل صحيح لأسفل العمود. ضرب السعر في (1 + نسبة الضريبة) هو الطريقة الصحيحة لحساب الإجمالي.' }
          ]
        },
         {
          id: 'exam4',
          title: 'امتحان الوحدة 4: برمجة LOGO',
          description: 'أظهر براعتك في التفكير المنطقي والبرمجة من خلال حل مسائل باستخدام أوامر LOGO.',
          questions: [
            // ... Questions for unit 4 exam
             { id: 1, type: 'multiple_choice', question: 'ما هي نتيجة الأمر `REPETE 4 [AV 50 TD 90]`؟', options: ['خط مستقيم', 'مربع', 'مثلث'], answer: 'مربع', explanation: 'الأمر يكرر 4 مرات: تقدم 50 خطوة ثم استدر 90 درجة، وهذه هي خطوات رسم مربع.' },
             { id: 2, type: 'vrai_faux', question: 'الأمر `TD 360` يعيد السلحفاة إلى اتجاهها الأصلي.', answer: true, explanation: 'الاستدارة بزاوية 360 درجة تعني إكمال دورة كاملة والعودة إلى نفس الاتجاه.' },
             { id: 10, type: 'situation_problem', question: 'وضعية مشكلة: تريد رسم شكل منزل بسيط يتكون من مربع (الجدران) يعلوه مثلث متساوي الأضلاع (السقف)، بحيث يكون ضلع المربع هو نفسه قاعدة المثلث. أي مجموعة من الأوامر تحقق هذا الشكل بشكل صحيح؟', options: ['REPETE 4 [AV 100 TD 90] REPETE 3 [AV 100 TD 120]', 'REPETE 4 [AV 100 TD 90] AV 100 REPETE 3 [AV 100 TD 60]', 'AV 100 TD 90 AV 100 REPETE 3 [AV 100 TD 120]'], answer: 'REPETE 4 [AV 100 TD 90] REPETE 3 [AV 100 TD 120]', explanation: 'الأمر الأول يرسم المربع بشكل صحيح (4 تكرارات بزاوية 90). بعد رسم المربع، تكون السلحفاة في نقطة البداية ومتجهة للأعلى. الأمر الثاني يرسم المثلث متساوي الأضلاع بشكل صحيح (3 تكرارات بزاوية خارجية 120 درجة) انطلاقًا من الضلع العلوي للمربع. الخيارات الأخرى لا تضع السلحفاة في الموضع أو الاتجاه الصحيحين لرسم السقف.' }
          ]
        }
      ]
    },
    dashboard: {
      title: "لوحة تتبع الأداء",
      description: "مراقبة التقدم المحرز من خلال إحصائيات مرئية.",
      lessonsCompleted: "الوحدات المكتملة",
      averageScore: "متوسط الدرجات",
      studentDistribution: "توزيع الطلاب حسب الأداء",
      studentList: "قائمة التلاميذ",
      studentViewComingSoon: "لوحة معلومات التلاميذ قيد الإنشاء.",
      confirmDelete: "هل أنت متأكد من أنك تريد حذف هذا التلميذ؟ لا يمكن التراجع عن هذا الإجراء.",
      editStudent: "تعديل معلومات التلميذ",
      save: "حفظ",
      cancel: "إلغاء",
      empty: {
        title: "لا توجد بيانات للطلاب",
        description: "لا يوجد تلاميذ مسجلون بعد. سيظهرون هنا عند إنشاء حساباتهم.",
        addStudent: "إضافة طالب"
      },
      rankings: "الترتيب",
      selectExam: "اختر امتحانا",
      rank: "الرتبة",
      studentName: "اسم التلميذ",
      weightedScore: "النقطة الموزونة",
      score: "النقطة",
      duration: "المدة",
      attempts: "المحاولات",
      backToList: "العودة إلى القائمة",
      searchByName: "البحث بالاسم...",
      filterByClass: "التصفية حسب القسم",
      allClasses: "جميع الأقسام"
    },
    common: {
      error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
      loading: "جاري التحميل..."
    }
  },
  fr: {
    sidebar: {
      title: "Prof Informatique",
      unites: "Unités",
      dashboard: "Tableau de Bord",
      profile: "Mon Profil",
      gradeSheet: "Relevé de Notes",
    },
    login: {
      studentSpace: "Espace Élève",
      profSpace: "Espace Professeur",
      login: "Se Connecter",
      createAccount: "Créer un Compte",
      profAccount: "Compte Professeur",
      lastName: "Nom",
      firstName: "Prénom",
      class: "Classe",
      number: "Numéro",
      identifiant: "Identifiant",
      password: "Mot de passe",
      selectClass: "Choisissez votre classe",
      errorLastName: "Le nom est requis (1-80 caractères)",
      errorFirstName: "Le prénom est requis (1-80 caractères)",
      errorClass: "La classe est requise",
      errorNumber: "Le numéro doit être entre 1 et 40",
      errorPassword: "Le mot de passe doit contenir exactement 8 chiffres.",
      errorUserExists: "Ce numéro est déjà utilisé dans cette classe",
      errorUserNotFound: "Identifiant ou mot de passe incorrect.",
      errorWrongPassword: "Mot de passe incorrect",
      successCreation: "Compte créé avec succès ! Votre identifiant est : {id}",
      loggedInAs: "Connecté en tant que",
      logout: "Déconnexion",
    },
    profile: {
      title: "Profil de l'Élève",
      progressTitle: "Ma Progression",
      lessonsCompleted: "Leçons terminées",
      totalLessons: "Total des leçons",
    },
    gradeSheet: {
      title: "Relevé de Notes",
      description: "Ici, vous pouvez consulter les détails de tous les examens que vous avez terminés.",
      examName: "Nom de l'examen",
      finalScore: "Note Finale",
      date: "Date et heure de passage",
      attempt: "Tentative N°",
      duration: "Durée",
      details: "Voir les détails",
      hideDetails: "Cacher les détails",
      question: "Question",
      yourAnswer: "Votre réponse",
      correctAnswer: "Réponse correcte",
      pointsEarned: "Points obtenus",
      totalPoints: "Points totaux",
      total: "Total",
      noExams: "Vous n'avez encore passé aucun examen. Vos résultats apparaîtront ici après votre premier examen."
    },
    unites: {
      title: "Unités Pédagogiques",
      description: "Un programme structuré couvrant les bases de l'informatique selon le curriculum officiel.",
      readMore: "Lire la suite",
      previousUnit: "Unité Précédente",
      nextUnit: "Unité Suivante",
      progress: "Progression",
      locked: "Verrouillé",
      unitLocked: "Terminez l'unité précédente pour déverrouiller cette unité.",
      completePrevious: "Terminez la leçon précédente pour déverrouiller celle-ci.",
      quizTitle: "Testez vos connaissances",
      allCorrect: "Excellent ! Leçon terminée.",
      question: "Question",
      answer: "Réponse",
      submitAnswer: "Soumettre la réponse",
      takeQuiz: "Passer le quiz",
      retryQuiz: "Recommencer le quiz",
      yes: "Oui",
      no: "Non",
      true: "Vrai",
      false: "Faux",
      correct: "Correct!",
      incorrect: "Incorrect",
      units: [
        {
          id: 'unit1',
          title: "Unité 1 : Environnement matériel d'un réseau informatique",
          description: 'Comprendre les bases des réseaux, les configurations matérielles et la topologie.',
          subUnits: [
            { id: 'u1_1', title: 'Notion de réseau informatique', content: React.createElement('div', null, React.createElement('h3', { className: 'text-lg font-semibold mb-2' }, 'Notion de Réseau'), React.createElement('p', null, 'Un réseau est un ensemble d\'entités (personnes, routes, ordinateurs) reliées entre elles. En informatique, un réseau est un ensemble d\'ordinateurs et d\'autres périphériques connectés pour échanger des données et partager des ressources.'), React.createElement('h4', { className: 'text-md font-semibold mt-4 mb-2' }, 'Avantages d\'un réseau informatique :'), React.createElement('ul', { className: 'list-disc list-inside space-y-1' }, React.createElement('li', null, 'Partage de ressources matérielles (imprimantes, disques durs).'), React.createElement('li', null, 'Partage de ressources logicielles (fichiers, applications).'), React.createElement('li', null, 'Communication entre les utilisateurs.'), React.createElement('li', null, 'Gain de temps et d\'argent.'))),
              questions: [
                { id: 1, type: 'multiple_choice', question: "Quel est l'objectif principal d'un réseau informatique ?", options: ['Échanger des données', 'Traiter des textes', 'Regarder des vidéos'], answer: 'Échanger des données', explanation: "Un réseau informatique est créé principalement pour permettre aux appareils connectés d'échanger des données et de partager des ressources." },
                { id: 2, type: 'vrai_faux', question: "Le partage d'imprimante est un des avantages d'un réseau informatique.", answer: true, explanation: "Le partage de périphériques comme les imprimantes et les scanners est l'un des avantages les plus importants des réseaux." },
                { id: 3, type: 'vrai_faux', question: 'Deux ordinateurs interconnectés constituent un réseau informatique.', answer: true, explanation: "La forme la plus simple d'un réseau est constituée de deux ordinateurs connectés, leur permettant d'échanger des informations." },
                { id: 4, type: 'multiple_choice', question: "Lequel des éléments suivants n'est pas un avantage d'un réseau ?", options: ['Gain de temps', 'Augmentation des coûts', 'Partage de fichiers'], answer: 'Augmentation des coûts', explanation: "Les réseaux visent à réduire les coûts en partageant les ressources, et non à les augmenter." },
                { id: 5, type: 'vrai_faux', question: 'Les réseaux permettent uniquement le partage des ressources matérielles.', answer: false, explanation: "Les réseaux permettent le partage de ressources matérielles (imprimantes) et logicielles (fichiers, applications)." },
              ]
            },
            {
              id: 'u1_2',
              title: 'Types de réseaux',
              content: React.createElement('div', null, React.createElement('p', null, 'Les réseaux peuvent être organisés de deux manières principales :'), React.createElement('h4', { className: 'text-md font-semibold mt-4 mb-2' }, '1. Réseau poste à poste (P2P) :'), React.createElement('p', null, 'Tous les ordinateurs sont égaux et partagent des ressources directement entre eux, sans serveur central.'), React.createElement('h4', { className: 'text-md font-semibold mt-4 mb-2' }, '2. Réseau Client/Serveur :'), React.createElement('p', null, 'Un ordinateur central (le serveur) fournit des ressources et des services aux autres ordinateurs (les clients). Ce type offre une gestion centralisée et une meilleure sécurité.')),
              questions: [
                { id: 1, type: 'vrai_faux', question: "Un réseau Client/Serveur n'a pas de serveur central.", answer: false, explanation: "Un réseau client/serveur repose sur un serveur central qui fournit des services aux clients." },
                { id: 2, type: 'multiple_choice', question: "Dans quel type de réseau tous les ordinateurs sont-ils égaux ?", options: ["Client/Serveur", "Poste à poste", "Topologie en étoile"], answer: "Poste à poste", explanation: "Dans un réseau poste à poste (P2P), chaque machine a les mêmes privilèges et peut partager des fichiers directement." },
                { id: 3, type: 'vrai_faux', question: 'Le réseau poste à poste offre une meilleure sécurité que le réseau client/serveur.', answer: false, explanation: "Le réseau client/serveur est plus sécurisé en raison de la gestion centralisée de la sécurité et des autorisations." },
                { id: 4, type: 'multiple_choice', question: "Dans un réseau client/serveur, comment s'appelle la machine qui demande le service ?", options: ['Serveur', 'Client', 'Switch'], answer: 'Client', explanation: "Le client est la machine qui demande et utilise les services fournis par le serveur." },
                { id: 5, type: 'multiple_choice', question: 'Les réseaux informatiques peuvent être organisés selon deux principes :', options: ['Client/serveur et Poste à poste', 'Topologie en étoile et en anneau', 'Réseaux filaires et sans fil'], answer: 'Client/serveur et Poste à poste', explanation: "Ce sont les deux principaux modèles d'organisation des relations entre les machines d'un réseau." },
              ]
            },
            { id: 'u1_3', title: 'Configuration matérielle monoposte', content: React.createElement('div', null, React.createElement('h4', { className: 'text-md font-semibold mb-2' }, 'Connexion filaire :'), React.createElement('p', null, 'Nécessite une carte réseau dans chaque appareil et des câbles pour les relier. Les connecteurs les plus courants sont RJ45 pour les câbles à paires torsadées et BNC pour les câbles coaxiaux.'), React.createElement('h4', { className: 'text-md font-semibold mt-4 mb-2' }, 'Connexion sans fil (Wi-Fi) :'), React.createElement('p', null, 'Nécessite des adaptateurs sans fil (Wi-Fi) dans chaque appareil. Ces adaptateurs existent sous différentes formes : cartes PCI, adaptateurs USB ou cartes PCMCIA pour ordinateurs portables.')),
              questions: [
                  { id: 1, type: 'multiple_choice', question: 'Quel composant est indispensable pour une connexion à un réseau filaire ?', options: ['Adaptateur USB WIFI', 'Carte réseau', 'Point d\'accès'], answer: 'Carte réseau', explanation: "La carte réseau est l'interface matérielle qui permet à l'ordinateur de se connecter au réseau via un câble." },
                  { id: 2, type: 'vrai_faux', question: 'Le connecteur RJ45 est utilisé avec des câbles coaxiaux.', answer: false, explanation: "Le connecteur RJ45 est utilisé avec des câbles à paires torsadées, tandis que le connecteur BNC est utilisé avec des câbles coaxiaux." },
                  { id: 3, type: 'multiple_choice', question: 'Quel équipement est nécessaire pour se connecter à un réseau Wi-Fi ?', options: ['Adaptateur sans fil', 'Câble réseau', 'Hub'], answer: 'Adaptateur sans fil', explanation: "Un adaptateur sans fil (comme une carte Wi-Fi) est nécessaire pour capter les signaux sans fil et se connecter au réseau." },
                  { id: 4, type: 'multiple_choice_multiple', question: 'Lesquels de ces périphériques sont des adaptateurs sans fil ?', options: ['Carte PCI WIFI', 'Adaptateur USB WIFI', 'Hub'], answer: ['Carte PCI WIFI', 'Adaptateur USB WIFI'], explanation: "Les cartes PCI WIFI et les adaptateurs USB WIFI sont tous deux des types d'adaptateurs sans fil. Le Hub est un appareil pour connecter les réseaux filaires." },
                  { id: 5, type: 'vrai_faux', question: 'Le câble à fibre optique utilise la lumière pour transmettre les signaux.', answer: true, explanation: "La fibre optique repose sur des impulsions lumineuses pour transmettre les données, ce qui permet des vitesses élevées et de longues distances." },
              ]
            },
            {
              id: 'u1_4',
              title: 'Topologie des réseaux',
              content: React.createElement('div', null, React.createElement('p', { className: 'mb-2' }, 'La topologie est la manière dont les appareils sont disposés et connectés dans un réseau.'), React.createElement('ul', { className: 'list-disc list-inside space-y-1' }, React.createElement('li', null, React.createElement('strong', null, 'Topologie en Bus :'), ' Tous les appareils sont connectés à un seul câble commun.'), React.createElement('li', null, React.createElement('strong', null, 'Topologie en Anneau :'), ' Chaque appareil est connecté au suivant, formant une boucle fermée.'), React.createElement('li', null, React.createElement('strong', null, 'Topologie en Étoile :'), ' Tous les appareils sont connectés à un appareil central (hub ou switch).'))),
              questions: [
                { id: 1, type: 'multiple_choice', question: "Quel composant relie plusieurs ordinateurs dans une topologie en étoile ?", options: ["Câble coaxial", "Switch", "Carte réseau"], answer: "Switch", explanation: "Dans une topologie en étoile, le Switch ou le Hub sert de point de connexion central pour tous les appareils." },
                { id: 2, type: 'multiple_choice', question: "Dans quelle topologie tous les appareils sont-ils connectés à un seul câble commun ?", options: ['Bus', 'Anneau', 'Étoile'], answer: "Bus", explanation: "La topologie en bus se caractérise par un seul câble principal auquel sont connectés tous les appareils du réseau." },
                { id: 3, type: 'vrai_faux', question: 'Dans la topologie en anneau, chaque appareil communique avec le suivant.', answer: true, explanation: "Dans une topologie en anneau, les données se déplacent dans une direction d'un appareil à l'autre jusqu'à ce qu'elles atteignent leur destination." },
                { id: 4, type: 'multiple_choice', question: 'Quelle topologie est la plus vulnérable à une panne totale si le câble principal tombe en panne ?', options: ['Étoile', 'Anneau', 'Bus'], answer: 'Bus', explanation: "Si le câble principal d'une topologie en bus est coupé, l'ensemble du réseau cesse de fonctionner." },
                { id: 5, type: 'vrai_faux', question: 'La topologie en étoile utilise un équipement central.', answer: true, explanation: "La topologie en étoile repose sur un appareil central (Hub ou Switch) pour connecter tous les appareils." },
              ]
            },
            {
              id: 'u1_5',
              title: 'Configuration matérielle d\'un réseau',
              content: React.createElement('div', null, React.createElement('h4', { className: 'text-md font-semibold mb-2' }, 'Réseau filaire :'), React.createElement('ul', { className: 'list-disc list-inside space-y-1' }, React.createElement('li', null, React.createElement('strong', null, 'Pour deux ordinateurs :'), ' il faut deux cartes réseau et un câble à paires torsadées croisé.'), React.createElement('li', null, React.createElement('strong', null, 'Pour plus de deux ordinateurs :'), ' il faut un appareil central comme un Hub ou un Switch, en plus des cartes réseau et des câbles pour chaque ordinateur.')), React.createElement('h4', { className: 'text-md font-semibold mt-4 mb-2' }, 'Réseau sans fil :'), React.createElement('ul', { className: 'list-disc list-inside space-y-1' }, React.createElement('li', null, React.createElement('strong', null, 'Pour deux ordinateurs :'), ' il faut juste un adaptateur Wifi pour chaque.'), React.createElement('li', null, React.createElement('strong', null, 'Pour plus de deux ordinateurs :'), ' il faut utiliser un point d\'accès en plus des adaptateurs Wifi.'))),
              questions: [
                { id: 1, type: 'vrai_faux', question: "On a besoin d'un réseau informatique pour traiter un texte.", answer: false, explanation: "Le traitement de texte est une tâche locale à l'ordinateur et ne nécessite pas de connexion réseau." },
                { id: 2, type: 'vrai_faux', question: "A-t-on besoin d'un réseau informatique pour partager une imprimante ?", answer: true, explanation: "Les réseaux permettent à plusieurs utilisateurs d'utiliser la même imprimante, ce qui réduit les coûts." },
                { id: 3, type: 'multiple_choice_multiple', question: 'Pour connecter deux ordinateurs dans un réseau filaire, on utilise :', options: ['Des cartes réseaux', 'Un point d\'accès', 'Des câbles à paires torsadées', 'Un Switch'], answer: ['Des cartes réseaux', 'Des câbles à paires torsadées'], explanation: "Pour connecter deux ordinateurs directement, chaque machine a besoin d'une carte réseau, et elles sont reliées par un câble réseau (généralement un câble croisé)." },
                { id: 4, type: 'multiple_choice', question: 'Pour connecter plus de deux ordinateurs dans un réseau sans fil, on utilise :', options: ['Un point d\'accès', 'Un hub', 'Des câbles à paires torsadées'], answer: 'Un point d\'accès', explanation: "Le point d'accès sert de dispositif central pour gérer les communications entre les différents appareils d'un réseau sans fil." },
                { id: 5, type: 'multiple_choice', question: "Quel équipement permet de connecter plusieurs machines dans un réseau local filaire ?", options: ['Switch', 'Point d\'accès', 'Modem'], answer: 'Switch', explanation: "Le Switch (commutateur) est l'appareil de base utilisé pour créer un réseau local filaire en connectant plusieurs machines." },
              ]
            },
          ]
        },
        {
          id: 'unit2',
          title: "Unité 2 : Echanges d'informations",
          description: "Apprenez à partager des fichiers et des ressources sur un réseau local.",
          subUnits: [
            {
              id: 'u2_1',
              title: 'Partage et échange de fichiers à travers un réseau local',
              content: React.createElement('div', null, React.createElement('p', null, 'Pour partager un fichier sur votre machine, il faut d\'abord le placer dans un dossier partagé. Ce fichier devient alors accessible aux autres machines du réseau. Les permissions peuvent être gérées pour que les autres utilisateurs puissent seulement consulter le fichier ou aussi le modifier. Pour accéder aux fichiers partagés, on peut parcourir le réseau via l\'icône "Réseau" du bureau.')),
              questions: [
                { id: 1, type: 'vrai_faux', question: "Pour partager un fichier, il doit être dans un dossier ordinaire.", answer: false, explanation: "Le fichier doit être dans un dossier qui a été désigné comme 'dossier partagé' pour que d'autres sur le réseau puissent y accéder." },
                { id: 2, type: 'multiple_choice', question: "Pour accéder aux fichiers partagés sur le réseau, sur quelle icône doit-on cliquer ?", options: ['Poste de travail', 'Réseau', 'Corbeille'], answer: "Réseau", explanation: "L'icône 'Réseau' dans le système d'exploitation est la porte d'entrée pour parcourir les machines et les dossiers partagés sur le réseau local." },
                { id: 3, type: 'multiple_choice_multiple', question: "Quels sont les avantages d'un réseau ? (Cochez toutes les bonnes réponses)", options: ["Partager une imprimante", "Jouer seul", "Partager des fichiers", "Regarder la télé"], answer: ["Partager une imprimante", "Partager des fichiers"], explanation: "Le partage de ressources comme les imprimantes et les fichiers est l'un des principaux avantages des réseaux informatiques." },
                { id: 4, type: 'vrai_faux', question: "On peut contrôler les permissions d'accès à un dossier partagé.", answer: true, explanation: "Vous pouvez spécifier qui peut seulement lire les fichiers et qui peut les modifier ou les supprimer, ce qui augmente la sécurité." },
                { id: 5, type: 'multiple_choice', question: 'Quelle est la première condition pour partager un fichier sur un réseau ?', options: ['L\'envoyer par e-mail', 'Le mettre dans un dossier partagé', 'Le copier sur une clé USB'], answer: 'Le mettre dans un dossier partagé', explanation: "La première étape essentielle est de placer le fichier dans un dossier configuré pour le partage réseau." },
              ]
            }
          ]
        },
        {
          id: 'unit3',
          title: "Unité 3 : Le tableur",
          description: "Explorez les fondamentaux des tableurs comme Excel.",
          subUnits: [
            { id: 'u3_1', title: 'Définition et fonctionnalités', content: 'Un tableur est un logiciel d\'application servant à la création et à la manipulation de tableaux numériques de calcul. Il permet d\'entrer des données, de les formater, de réaliser des calculs complexes et de créer des graphiques.',
              questions: [
                  { id: 1, type: 'vrai_faux', question: 'Un tableur est principalement utilisé pour écrire des lettres.', answer: false, explanation: "Les logiciels de traitement de texte comme Word sont utilisés pour écrire des lettres, tandis qu'un tableur est destiné aux tableaux et aux calculs." },
                  { id: 2, type: 'multiple_choice', question: 'Une des fonctions principales d\'un tableur est de :', options: ['Naviguer sur internet', 'Effectuer des calculs', 'Retoucher des photos'], answer: 'Effectuer des calculs', explanation: "La puissance des tableurs réside dans leur capacité à effectuer automatiquement des calculs complexes à l'aide de formules et de fonctions." },
                  { id: 3, type: 'multiple_choice', question: 'Comment appelle-t-on les représentations visuelles des données dans un tableur ?', options: ['Formules', 'Cellules', 'Graphiques'], answer: 'Graphiques', explanation: "Les graphiques (comme les histogrammes et les camemberts) transforment les chiffres en images visuelles faciles à comprendre." },
              ]
            },
            { id: 'u3_2', title: 'Environnement Excel', content: 'Le document principal d\'Excel est un classeur, qui regroupe plusieurs feuilles. Chaque feuille est un grand tableau de lignes (numérotées) et de colonnes (lettrées). L\'intersection d\'une ligne et d\'une colonne est une cellule, avec une adresse unique (ex: B3).',
              questions: [
                  { id: 1, type: 'multiple_choice', question: "Comment s'appelle le document dans Excel ?", options: ['Feuille', 'Classeur', 'Tableau'], answer: 'Classeur', explanation: "Le classeur est le fichier complet dans Excel, et il peut contenir une ou plusieurs feuilles de calcul." },
                  { id: 2, type: 'vrai_faux', question: 'Une feuille de calcul est composée de lignes lettrées et de colonnes numérotées.', answer: false, explanation: "C'est l'inverse : les lignes sont numérotées (1, 2, 3...) et les colonnes sont lettrées (A, B, C...)." },
                  { id: 3, type: 'multiple_choice', question: 'L\'intersection d\'une ligne et d\'une colonne est une :', options: ['Feuille', 'Classeur', 'Cellule'], answer: 'Cellule', explanation: "La cellule est l'unité de base de la feuille de calcul où les données sont saisies, et son adresse est composée de la lettre de la colonne et du numéro de la ligne (ex: A1)." },
              ]
            },
            { id: 'u3_3', title: 'Saisie et alignement des données', content: 'Pour commencer la saisie, il suffit de cliquer sur une cellule pour la rendre active. Par défaut, le texte est aligné à gauche et les nombres/dates sont alignés à droite.',
              questions: [
                  { id: 1, type: 'vrai_faux', question: 'Dans Excel, les nombres sont alignés à gauche par défaut.', answer: false, explanation: "Par défaut, les nombres sont alignés à droite et le texte à gauche. Cela aide à différencier les types de données." },
                  { id: 2, type: 'multiple_choice', question: 'Pour saisir des données dans une cellule, il faut d\'abord :', options: ['Sauvegarder le classeur', 'La sélectionner', 'Imprimer la feuille'], answer: 'La sélectionner', explanation: "Il faut toujours sélectionner la cellule dans laquelle vous voulez entrer des données pour en faire la cellule active." },
              ]
            },
            { id: 'u3_8', title: 'Référence relative et formules', content: 'Une formule est une expression qui effectue un calcul et commence par =. Elle utilise des références de cellules (ex: B2). Une référence relative change lorsque la formule est copiée dans une autre cellule.',
              questions: [
                  { id: 1, type: 'vrai_faux', question: 'Toutes les formules doivent commencer par le signe #.', answer: false, explanation: "Pour indiquer à Excel que vous entrez une formule et non du texte, elle doit toujours commencer par le signe égal (=)." },
                  { id: 2, type: 'multiple_choice', question: 'Quel type de référence change automatiquement lorsque la formule est copiée ?', options: ['Absolue', 'Relative', 'Mixte'], answer: 'Relative', explanation: "Les références relatives (ex: A1) s'adaptent à leur nouvelle position lorsqu'elles sont copiées, ce qui facilite l'application de la même formule à plusieurs lignes ou colonnes." },
              ]
            },
            {
              id: 'u3_9',
              title: 'Référence absolue',
              content: 'Une référence absolue (ex: $G$2) pointe toujours vers la même cellule, même si la formule est copiée. Elle est utilisée pour "fixer" une cellule dans les calculs.',
              questions: [
                { id: 1, type: 'vrai_faux', question: "Une référence absolue change quand on copie une formule.", answer: false, explanation: "Le signe dollar ($) 'verrouille' la référence de la colonne et/ou de la ligne, de sorte qu'elle ne change pas lorsque la formule est copiée." },
                { id: 2, type: 'multiple_choice', question: "Quelle est la bonne formule pour la moyenne de B2 et B3 ?", options: ["=B2+B3/2", "=(B2+B3)/2", "=MOYENNE(B2+B3)"], answer: "=(B2+B3)/2", explanation: "Pour calculer une moyenne, il faut d'abord additionner les valeurs (en utilisant des parenthèses), puis diviser par leur nombre." },
                { id: 3, type: 'multiple_choice', question: "Comment écrit-on une référence absolue pour la cellule A1 ?", options: ['A1', '$A$1', 'A$1'], answer: '$A$1', explanation: "Le signe dollar avant la lettre de la colonne et avant le numéro de la ligne ($A$1) rend la référence entièrement absolue." },
              ]
            },
            { id: 'u3_11', title: 'Graphiques et impression', content: 'Les graphiques permettent de visualiser les données. Excel propose de nombreux types. La mise en page et l\'impression permettent de contrôler l\'apparence du document imprimé.',
              questions: [
                  { id: 1, type: 'vrai_faux', question: 'Les graphiques aident à mieux comprendre les données.', answer: true, explanation: "Les graphiques transforment des tableaux de chiffres complexes en images visuelles faciles à lire et à comparer." },
                  { id: 2, type: 'vrai_faux', question: 'On ne peut pas contrôler les marges de la page à l\'impression dans Excel.', answer: false, explanation: "Excel offre des options de mise en page avancées, y compris le contrôle des marges, de l'orientation de la page et de la répétition des titres." },
              ]
            }
          ]
        },
        {
          id: 'unit4',
          title: "Unité 4 : Programmation LOGO",
          description: "Introduction à la programmation avec le langage ludique LOGO.",
          subUnits: [
            { id: 'u4_1', title: 'Environnement XLOGO', content: 'XLOGO est un environnement de programmation pour apprendre les bases. L\'interface se compose d\'une tortue qui se déplace sur une zone de dessin selon les commandes entrées dans la console.',
              questions: [
                  { id: 1, type: 'multiple_choice', question: "Dans XLOGO, comment s'appelle l'objet qui dessine à l'écran ?", options: ['Crayon', 'Curseur', 'Tortue'], answer: 'Tortue', explanation: "La tortue est l'objet graphique qui se déplace sur l'écran et exécute les commandes, laissant une trace derrière elle si le crayon est baissé." },
                  { id: 2, type: 'vrai_faux', question: 'On écrit les commandes XLOGO dans la zone de dessin.', answer: false, explanation: "Les commandes sont écrites dans une zone spéciale appelée console ou ligne de commande, et le résultat apparaît dans la zone de dessin." },
              ]
            },
            {
              id: 'u4_2',
              title: 'Primitives de base',
              content: 'Les commandes de base (primitives) sont les mots que XLOGO comprend. Les plus importantes sont : `AVANCE` (AV), `TOURNEDROITE` (TD), `VE` (VideEcran), `LC` (LèveCrayon), et `BC` (BaisseCrayon).',
              questions: [
                { id: 1, type: 'vrai_faux', question: "La commande `LC` fait dessiner la tortue.", answer: false, explanation: "`LC` (LèveCrayon) lève le crayon, donc la tortue se déplace sans dessiner. La commande `BC` (BaisseCrayon) la fait dessiner." },
                {
                  id: 2,
                  type: 'drag_drop',
                  question: 'Associez chaque commande à sa fonction correcte.',
                  dragOptions: {
                    draggables: [
                      { id: 'd1', label: 'AVANCE' },
                      { id: 'd2', label: 'TOURNEDROITE' },
                      { id: 'd3', label: 'LC' },
                    ],
                    droppables: [
                      { id: 'p1', label: 'Tourner à droite' },
                      { id: 'p2', label: 'Lever le crayon' },
                      { id: 'p3', label: 'Avancer' },
                    ],
                  },
                  answer: { p1: 'd2', p2: 'd3', p3: 'd1' },
                  explanation: "`AVANCE` pour avancer, `TOURNEDROITE` (ou TD) pour tourner à droite, et `LC` pour lever le crayon."
                },
                { id: 3, type: 'multiple_choice', question: 'Quelle commande efface l\'écran ?', options: ['AVANCE', 'VE', 'BC'], answer: 'VE', explanation: "La commande `VE` (VideEcran) efface tous les dessins de l'écran et ramène la tortue à son point de départ." },
                { id: 4, type: 'multiple_choice', question: "Pour faire avancer la tortue de 50 pas, on écrit la commande ____ 50", options: ['AVANCE', 'TD', 'LC'], answer: 'AVANCE', explanation: "La commande `AVANCE` (ou `AV`) prend une valeur numérique qui représente le nombre de pas que la tortue va avancer." },
              ]
            },
            {
              id: 'u4_3',
              title: 'Instruction de répétition REPETE',
              content: 'Pour éviter de répéter des commandes, on utilise `REPETE`. Sa syntaxe est : `REPETE n [bloc d\'instructions]`. Par exemple, pour un carré : `REPETE 4 [AV 100 TD 90]`.',
               questions: [
                { id: 1, type: 'multiple_choice', question: "Pour compléter la commande pour dessiner un carré de côté 50 : `REPETE 4 [AV 50 TD ___]`, quelle valeur faut-il mettre ?", options: ["45", "90", "180"], answer: "90", explanation: "Pour dessiner un carré, l'angle entre deux côtés consécutifs doit être de 90 degrés." },
                { id: 2, type: 'vrai_faux', question: 'L\'instruction `REPETE` est utilisée pour exécuter une commande une seule fois.', answer: false, explanation: "L'instruction `REPETE` est utilisée pour exécuter un bloc d'instructions un nombre défini de fois, ce qui facilite le dessin de formes régulières." },
                { id: 3, type: 'multiple_choice', question: 'Pour dessiner un triangle équilatéral, combien de fois faut-il répéter les instructions ?', options: ['3', '4', '5'], answer: '3', explanation: "Un triangle a 3 côtés, donc nous répétons les instructions pour dessiner un côté et tourner 3 fois." },
              ]
            },
            { id: 'u4_4', title: 'Formes géométriques et `CERCLE`', content: 'En combinant les primitives et la répétition, on peut dessiner des formes complexes. Pour un cercle, on peut utiliser la primitive `CERCLE` suivie du rayon, ou une répétition comme `REPETE 360 [AV 1 TD 1]`.' ,
              questions: [
                  { id: 1, type: 'multiple_choice', question: "Pour compléter la commande pour dessiner un cercle de rayon 50 : `____ 50`, quelle commande faut-il utiliser ?", options: ['CERCLE', 'CARRE', 'AVANCE'], answer: 'CERCLE', explanation: "La commande `CERCLE` est une primitive spécifique de LOGO pour dessiner un cercle, qui prend le rayon en paramètre." },
                  { id: 2, type: 'vrai_faux', question: 'Il est impossible de dessiner des formes complexes avec les primitives de base.', answer: false, explanation: "Des formes très complexes peuvent être dessinées en combinant les primitives de base, la répétition et des procédures personnalisées." },
              ]
            }
          ]
        },
      ]
    },
    exams: {
      title: "Examens Complets",
      description: "Évaluez votre compréhension globale de chaque unité avec un examen complet.",
      takeExam: "Passer l'examen",
      score: "Résultat",
      reviewAnswers: "Réviser les réponses",
      yourAnswer: "Votre réponse",
      correctAnswer: "Réponse correcte",
      submitExam: "Soumettre l'examen",
      questionProgress: "Question {current} sur {total}",
      timeLeft: "Temps restant",
      examsList: [
        {
          id: 'exam1',
          title: "Examen Unité 1 : Environnement matériel d'un réseau",
          description: "Testez votre connaissance globale des concepts de réseau, des types, des topologies et des composants matériels.",
          questions: [
            { id: 1, type: 'multiple_choice', question: 'Quel modèle repose sur une machine centrale pour fournir des services ?', options: ['Poste à poste', 'Client/Serveur', 'Bus'], answer: 'Client/Serveur', explanation: 'Le modèle client/serveur utilise un serveur central pour gérer les ressources et les services.' },
            { id: 2, type: 'vrai_faux', question: "Dans une topologie en étoile, une panne de l'équipement central entraîne une panne de tout le réseau.", answer: true, explanation: "Parce que toutes les communications passent par l'appareil central (Switch ou Hub), sa panne désactive tout le réseau." },
            { id: 3, type: 'multiple_choice', question: 'Quel appareil est utilisé pour connecter deux réseaux locaux différents ou un réseau local à Internet ?', options: ['Hub', 'Switch', 'Routeur'], answer: 'Routeur', explanation: "Le routeur est l'appareil responsable de l'acheminement des données entre différents réseaux." },
            { id: 4, type: 'multiple_choice_multiple', question: 'Quels sont les composants matériels nécessaires pour créer un réseau filaire de 3 ordinateurs ?', options: ['Cartes réseau', 'Switch', 'Point d\'accès', 'Câbles réseau'], answer: ['Cartes réseau', 'Switch', 'Câbles réseau'], explanation: "Chaque machine a besoin d'une carte réseau, et elles sont toutes connectées à un appareil central (Switch) à l'aide de câbles réseau." },
            { id: 5, type: 'vrai_faux', question: 'Un réseau poste à poste (P2P) est le meilleur pour gérer un grand réseau de 100 machines.', answer: false, explanation: "Un réseau poste à poste devient difficile à gérer et peu sécurisé à mesure que le nombre d'appareils augmente. Un réseau client/serveur est la meilleure option pour les grands réseaux." },
            { id: 6, type: 'multiple_choice', question: "Quel type de câble est utilisé pour connecter directement deux ordinateurs sans équipement central ?", options: ['Câble droit', 'Câble croisé', 'Câble coaxial'], answer: 'Câble croisé', explanation: "Le câble croisé inverse l'ordre de certains fils, permettant à deux appareils de même type de communiquer directement." },
            { id: 7, type: 'vrai_faux', question: 'Un réseau sans fil (Wi-Fi) est toujours plus rapide qu\'un réseau filaire.', answer: false, explanation: "En général, les réseaux filaires (en particulier ceux utilisant la fibre optique ou des câbles Ethernet récents) offrent des vitesses plus élevées et une connexion plus stable que les réseaux sans fil." },
            { id: 8, type: 'multiple_choice', question: 'Dans quelle topologie les données circulent-elles dans une seule direction à travers chaque machine ?', options: ['Étoile', 'Bus', 'Anneau'], answer: 'Anneau', explanation: "Dans une topologie en anneau, le signal passe d'une machine à la suivante dans une boucle fermée." },
            { id: 9, type: 'vrai_faux', question: 'Le partage de fichiers est le seul avantage des réseaux.', answer: false, explanation: "Les avantages des réseaux incluent également le partage de ressources matérielles (imprimantes), la communication (e-mail) et l'accès à Internet." },
            { id: 10, type: 'situation_problem', question: "Situation Problème : Le directeur d'une petite entreprise souhaite connecter 5 ordinateurs et une imprimante dans les bureaux pour partager des fichiers et imprimer. Quelle est la meilleure solution parmi les suivantes, en tenant compte de la facilité d'installation et de la sécurité ?", options: ["Un réseau poste à poste en topologie bus avec un câble coaxial.", "Un réseau client/serveur en topologie étoile avec un Switch, en faisant d'un des ordinateurs un serveur de fichiers et d'impression.", "Connecter chaque ordinateur directement à l'autre avec des câbles croisés."], answer: "Un réseau client/serveur en topologie étoile avec un Switch, en faisant d'un des ordinateurs un serveur de fichiers et d'impression.", explanation: "Cette solution est la plus organisée et sécurisée. La topologie en étoile avec un Switch garantit que si un câble tombe en panne, le reste du réseau n'est pas affecté. Utiliser une machine comme serveur facilite la gestion centralisée et sécurisée des fichiers partagés et de l'imprimante." },
          ]
        },
        {
          id: 'exam2',
          title: "Examen Unité 2 : Échanges d'informations",
          description: "Évaluez votre capacité à comprendre et à pratiquer le partage sécurisé de fichiers et de ressources sur un réseau local.",
          questions: [
            // ... Questions for unit 2 exam
             { id: 1, type: 'vrai_faux', question: "Pour accéder à un fichier partagé sur une autre machine, vous devez avoir un compte utilisateur sur cette machine.", answer: true, explanation: "L'accès aux ressources partagées est généralement contrôlé par des autorisations utilisateur pour garantir la sécurité." },
             { id: 2, type: 'multiple_choice', question: "Quelle est la première chose à faire pour partager un dossier ?", options: ['Le renommer', 'Modifier ses propriétés de partage', 'Le supprimer'], answer: 'Modifier ses propriétés de partage', explanation: "Il faut aller dans les propriétés du dossier, activer les options de partage et définir les autorisations." },
             { id: 10, type: 'situation_problem', question: "Situation Problème : Dans une classe, un enseignant souhaite placer des fichiers de cours dans un dossier partagé sur son ordinateur pour que les élèves puissent les lire et les copier, mais sans pouvoir les modifier ou les supprimer. Quelle permission l'enseignant doit-il accorder aux élèves sur le dossier partagé ?", options: ['Contrôle total', 'Modification', 'Lecture seule'], answer: 'Lecture seule', explanation: "La permission 'Lecture seule' permet aux utilisateurs d'ouvrir et de copier des fichiers mais les empêche d'y apporter des modifications, ce qui correspond exactement à l'objectif de l'enseignant." }
          ]
        },
        {
          id: 'exam3',
          title: "Examen Unité 3 : Le tableur",
          description: "Testez vos compétences dans l'utilisation du tableur, de la saisie de données à la création de formules et de graphiques.",
          questions: [
            // ... Questions for unit 3 exam
             { id: 1, type: 'multiple_choice', question: "Que signifie l'erreur #DIV/0! dans une cellule ?", options: ['Référence de cellule invalide', 'Division par zéro', 'Valeur non disponible'], answer: 'Division par zéro', explanation: "Cette erreur apparaît lorsqu'une formule tente de diviser un nombre par zéro, ce qui est mathématiquement impossible." },
             { id: 2, type: 'vrai_faux', question: 'La référence absolue $A$1 devient $B$1 lorsqu\'elle est copiée dans la cellule voisine.', answer: false, explanation: "Les signes dollar ($) 'verrouillent' la référence, elle restera donc toujours $A$1 lorsqu'elle est copiée." },
             { id: 10, type: 'situation_problem', question: "Situation Problème : Vous avez une feuille de calcul avec les prix de produits dans la colonne B (de B2 à B10). Vous voulez calculer le prix après avoir ajouté une TVA de 20% qui se trouve dans la cellule F1. Quelle est la meilleure formule à écrire en C2 pour calculer le nouveau prix, puis la copier pour le reste des produits ?", options: ['=B2*20%', '=B2+(B2*F1)', '=B2*(1+$F$1)'], answer: '=B2*(1+$F$1)', explanation: "Cette formule est la meilleure car elle utilise une référence absolue ($F$1) pour la cellule de la taxe, ce qui permet de copier correctement la formule vers le bas de la colonne. Multiplier le prix par (1 + le taux de taxe) est la bonne méthode pour calculer le total." }
          ]
        },
        {
          id: 'exam4',
          title: "Examen Unité 4 : Programmation LOGO",
          description: "Montrez votre maîtrise de la pensée logique et de la programmation en résolvant des problèmes avec les commandes LOGO.",
          questions: [
            // ... Questions for unit 4 exam
             { id: 1, type: 'multiple_choice', question: 'Quel est le résultat de la commande `REPETE 4 [AV 50 TD 90]` ?', options: ['Une ligne droite', 'Un carré', 'Un triangle'], answer: 'Un carré', explanation: "La commande répète 4 fois : avance de 50 pas puis tourne de 90 degrés, ce qui sont les étapes pour dessiner un carré." },
             { id: 2, type: 'vrai_faux', question: 'La commande `TD 360` ramène la tortue à sa direction initiale.', answer: true, explanation: "Tourner de 360 degrés signifie effectuer un tour complet et revenir à la même direction." },
             { id: 10, type: 'situation_problem', question: "Situation Problème : Vous voulez dessiner une maison simple composée d'un carré (les murs) surmonté d'un triangle équilatéral (le toit), de sorte que le côté du carré soit la base du triangle. Quel ensemble de commandes réalise correctement cette figure ?", options: ['REPETE 4 [AV 100 TD 90] REPETE 3 [AV 100 TD 120]', 'REPETE 4 [AV 100 TD 90] AV 100 REPETE 3 [AV 100 TD 60]', 'AV 100 TD 90 AV 100 REPETE 3 [AV 100 TD 120]'], answer: 'REPETE 4 [AV 100 TD 90] REPETE 3 [AV 100 TD 120]', explanation: "La première commande dessine correctement le carré (4 répétitions avec un angle de 90). Après avoir dessiné le carré, la tortue est au point de départ, orientée vers le haut. La deuxième commande dessine correctement le triangle équilatéral (3 répétitions avec un angle externe de 120) en partant du côté supérieur du carré. Les autres options ne placent pas la tortue dans la bonne position ou orientation pour dessiner le toit." }
          ]
        }
      ]
    },
    dashboard: {
      title: "Tableau de Bord de Suivi",
      description: "Suivez les progrès réalisés grâce à des statistiques visuelles.",
      lessonsCompleted: "Unités Terminées",
      averageScore: "Score Moyen",
      studentDistribution: "Répartition des Élèves par Performance",
      studentList: "Liste des Élèves",
      studentViewComingSoon: "Le tableau de bord pour les élèves est en cours de développement.",
      confirmDelete: "Êtes-vous sûr de vouloir supprimer cet élève ? Cette action est irréversible.",
      editStudent: "Modifier les informations de l'élève",
      save: "Enregistrer",
      cancel: "Annuler",
       empty: {
        title: "Aucune Donnée Étudiante Disponible",
        description: "Aucun élève n'est encore inscrit. Ils apparaîtront ici une fois leurs comptes créés.",
        addStudent: "Ajouter un Étudiant"
      },
      rankings: "Classements",
      selectExam: "Sélectionner un examen",
      rank: "Rang",
      studentName: "Nom de l'élève",
      weightedScore: "Note Pondérée",
      score: "Note",
      duration: "Durée",
      attempts: "Tentatives",
      backToList: "Retour à la liste",
      searchByName: "Rechercher par nom...",
      filterByClass: "Filtrer par classe",
      allClasses: "Toutes les classes"
    },
    common: {
      error: "Une erreur est survenue. Veuillez réessayer.",
      loading: "Chargement..."
    }
  }
};