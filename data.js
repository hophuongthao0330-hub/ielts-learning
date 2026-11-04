// data.js - Dữ liệu giáo trình chuyên sâu IELTS 4.2 -> 7.0 cho 4 kỹ năng

const IELTS_DATA = {
  user: {
    name: "Học Viên",
    startingBand: 4.2,
    targetBand: 7.0,
    currentBand: 4.8,
    streak: 5,
    skills: {
      listening: { current: 4.5, target: 7.5, completedModules: 4, totalModules: 10 },
      reading: { current: 4.5, target: 7.5, completedModules: 5, totalModules: 10 },
      writing: { current: 4.0, target: 6.5, completedModules: 3, totalModules: 10 },
      speaking: { current: 4.0, target: 6.5, completedModules: 2, totalModules: 10 },
    }
  },

  dailyTasks: [
    {
      id: "task_1",
      skill: "Listening",
      title: "Chép chính tả 10 số điện thoại & họ tên người Anh (Part 1)",
      timeEst: "15 phút",
      done: true,
      tag: "Foundation 4.0-5.0"
    },
    {
      id: "task_2",
      skill: "Speaking",
      title: "Luyện phản xạ khung A-R-E cho 3 câu hỏi chủ đề 'Home & Accommodation'",
      timeEst: "15 phút",
      done: false,
      tag: "Tactical 5.0-6.0"
    },
    {
      id: "task_3",
      skill: "Writing",
      title: "Viết 1 đoạn Thân bài (Body 1) Task 2 theo cấu trúc PEEL",
      timeEst: "20 phút",
      done: false,
      tag: "Tactical 5.0-6.0"
    },
    {
      id: "task_4",
      skill: "Vocabulary",
      title: "Ôn tập 5 Collocations C1 chủ đề Công nghệ (Lexical Booster)",
      timeEst: "10 phút",
      done: false,
      tag: "Mastery 6.0-7.0"
    }
  ],

  listeningModules: {
    "4-5": {
      title: "Luyện Nghe Số Điện Thoại & Đánh Vần Tên Riêng (Part 1 Foundation)",
      audioFile: "audio/listening_part1_foundation.mp3",
      voiceName: "Sonia (British Council RP - Studio Master)",
      audioText: "Good morning, Customer Care. My surname is Kensington, that is K - E - N - S - I - N - G - T - O - N. You can reach me on my mobile at 07700 900543. I repeat, 07700 900543. The delivery should be sent to postcode SW1A 2AA, that is S - W - 1 - A, 2 - A - A. The best time for the courier to deliver is afternoon, specifically between 2 PM and 4 PM.",
      answers: {
        ans1: "kensington",
        ans2: "07700900543",
        ans3: "sw1a 2aa",
        ans4: "afternoon"
      },
      explanation: "• Họ khách: K-E-N-S-I-N-G-T-O-N (chú ý chữ G và J thường gây nhầm lẫn).\n• SĐT: 07700 900543 (người Anh đọc 'double seven double zero' hoặc 'oh seven...').\n• Postcode: SW1A 2AA (chữ in hoa và số xen kẽ).\n• Thời gian: afternoon (2 PM - 4 PM là buổi chiều)."
    },
    "5-6": {
      title: "Bản Đồ (Map Labelling) & Bẫy Chuyển Hướng (Part 2 Tactical)",
      audioFile: "audio/listening_part2_tactical.mp3",
      voiceName: "Ryan (British Council RP - Studio Master)",
      audioText: "Welcome to the city library. As you come in through the main entrance, the reception desk is immediately in front of you. To your left, opposite the cafe, you will find the computer suite. If you proceed down the central corridor, past the enquiry desk, the meeting room is situated on your right-hand side, just before the emergency exit.",
      answers: {
        ans1: "computer suite",
        ans2: "meeting room"
      },
      explanation: "Bẫy bản đồ: Chú ý vị trí đứng xuất phát ('main entrance'). 'To your left, opposite the cafe' ➔ Computer suite. 'Just before the emergency exit' ➔ Meeting room."
    },
    "6-7": {
      title: "Nghe Bài Giảng Học Thuật & Bắt Từ Đồng Nghĩa (Part 4 Academic Lecture)",
      audioFile: "audio/listening_part4_academic.mp3",
      voiceName: "Thomas (Cambridge Academic Lecturer - Studio Master)",
      audioText: "Today we are analyzing marine ecosystems. Coastal wetlands serve as natural buffers, substantially mitigating the catastrophic impacts of storm surges and coastal erosion. Furthermore, their extraordinary capacity for carbon sequestration plays a pivotal role in regulating global climate patterns.",
      answers: {
        ans1: "buffers",
        ans2: "sequestration"
      },
      explanation: "Part 4 đòi hỏi vốn từ C1: 'buffers' = vật cản/lá chắn bảo vệ; 'carbon sequestration' = sự cô lập/hấp thụ carbon."
    }
  },

  readingExercises: {
    answers: {
      tfng1: "FALSE",
      tfng2: "NOT GIVEN",
      tfng3: "TRUE"
    },
    explanations: {
      tfng1: "Bài đọc nêu rõ: 'Even on overcast days when the sun is completely concealed... worker bees can find their way back home without becoming disoriented' (Ngay cả khi trời âm u mây che kín mặt trời, ong thợ vẫn tìm được đường về). Nhưng câu hỏi bảo là 'unable to navigate' (không thể định hướng) ➔ Khẳng định trái ngược ➔ FALSE.",
      tfng2: "Bài đọc có nhắc Karl von Frisch giải mã điệu nhảy waggle dance năm 1946, nhưng KHÔNG hề đề cập đến việc ông có đoạt giải Nobel hay không ('Nobel Prize') ➔ NOT GIVEN.",
      tfng3: "Bài đọc viết: 'the angle of the dance indicates the direction of food relative to the sun' (góc nhảy chỉ hướng của thức ăn). Câu hỏi: 'The angle provides information regarding food direction' ➔ Khớp 100% nghĩa ➔ TRUE."
    }
  },

  writingPrompts: {
    task2_tech: {
      type: "Task 2 (Discussion / Opinion)",
      title: "Technology & Young People",
      question: "Some people believe that excessive use of smartphones is harmful to teenagers' social development, while others argue that phones help them stay connected. Discuss both views and give your opinion.",
      sampleStudent45: "Nowadays many young people use smartphone every day. Smartphone is very bad because teenagers use phone too much and they don't talk to friends. It is a big problem. But some people say smartphone is good because they can chat on Facebook and call family. In my opinion, smartphone have more bad things than good things.",
      tier45: `Nowadays many young people use smartphone every day. Smartphone is very bad because teenagers use phone too much and they don't talk to friends. It is a big problem. But some people say smartphone is good because they can chat on Facebook and call family. In my opinion, smartphone have more bad things than good things.`,
      tier55: `In contemporary society, smartphones have become an indispensable tool for adolescents. On the one hand, excessive screen time can severely hinder social development because young people frequently isolate themselves from direct face-to-face interaction. For instance, many teenagers prefer scrolling social media rather than participating in sports. On the other hand, mobile devices enable teenagers to maintain instant contact with remote peers. In my opinion, although smartphones offer convenience, parental restriction is crucial to prevent addiction.`,
      tier70: `In the contemporary digital era, the ubiquity of smartphones has sparked intense debate regarding their repercussions on adolescent socialization. Detractors convincingly argue that virtual fixation precipitates profound social alienation, as habitual reliance on digital messaging impedes the cultivation of essential interpersonal skills, including empathetic non-verbal communication. Conversely, proponents contend that digital platforms transcend geographical constraints, fostering inclusive peer communities. Nevertheless, I contend that unmoderated screen exposure exerts detrimental effects, necessitating stringent moderation to safeguard holistic psychological maturity.`,
      vocabUpgrades: [
        { basic: "very bad", tactical: "severely hinder", academic: "exert detrimental repercussions", note: "Từ vựng C1 chỉ tác động tiêu cực sâu sắc" },
        { basic: "big problem", tactical: "major drawback", academic: "pressing issue / profound impediment", note: "Thay thế từ 'problem' đơn điệu" },
        { basic: "use phone too much", tactical: "excessive screen time", academic: "unmoderated virtual fixation", note: "Chuyển từ động từ cụm sang cụm danh từ (Nominalization)" },
        { basic: "don't talk to friends", tactical: "isolate from direct interaction", academic: "impede empathetic interpersonal communication", note: "Mô tả tính tương tác xã hội học thuật" },
        { basic: "stay connected", tactical: "maintain instant contact", academic: "foster inclusive peer networks", note: "Cụm Collocation điểm cộng tiêu chí Lexical Resource" }
      ]
    },
    task2_env: {
      type: "Task 2 (Problem & Solution)",
      title: "Environmental Protection & Global Warming",
      question: "Environmental degradation is increasingly severe. What are the primary causes and what solutions can be implemented to address this crisis?",
      sampleStudent45: "Pollution is very high now. Factory make dirty air and people throw plastic in river. This make global warming happen. Government should make law and people should clean up trash to save the earth.",
      tier45: `Pollution is very high now. Factory make dirty air and people throw plastic in river. This make global warming happen. Government should make law and people should clean up trash to save the earth.`,
      tier55: `At present, environmental deterioration is escalating globally. The primary root cause is industrial emissions and improper waste disposal by citizens. To tackle this urgent issue, authorities should impose stricter regulations on polluters, while individuals must adopt greener habits such as reducing single-use plastics.`,
      tier70: `Environmental degradation represents one of the most existential threats confronting contemporary civilization. Anthropogenic activities, predominantly unabated industrial emissions and unchecked consumerism, constitute the primary catalyst. To mitigate this ecological catastrophe, national governments must enforce stringent environmental statutes and subsidize green renewable alternatives, accompanied by civic environmental conscientiousness.`,
      vocabUpgrades: [
        { basic: "dirty air", tactical: "industrial emissions", academic: "unabated greenhouse gas emissions", note: "Từ vựng chuyên đề môi trường" },
        { basic: "save the earth", tactical: "protect ecosystems", academic: "mitigate ecological catastrophe", note: "Collocation C1 chuẩn Writing Task 2" },
        { basic: "make law", tactical: "impose stricter regulations", academic: "enforce stringent environmental statutes", note: "Cụm danh từ pháp lý học thuật" }
      ]
    },
    task1_bar: {
      type: "Task 1 (Academic Bar Chart)",
      title: "Energy Consumption in 4 Countries",
      question: "The chart below shows energy consumption by fuel type in four countries in 2020. Summarise the information by selecting and reporting the main features.",
      sampleStudent45: "The chart show energy in four countries. Coal is very big in country A. Solar is very small. Country B use more oil than gas. Overall it have big difference.",
      tier45: `The chart show energy in four countries. Coal is very big in country A. Solar is very small. Country B use more oil than gas. Overall it have big difference.`,
      tier55: `The bar chart illustrates the amount of energy consumed across four different nations in 2020, categorized by fuel type. Overall, fossil fuels, especially coal and petroleum, constituted the dominant energy sources in most countries, whereas renewable sources remained negligible.`,
      tier70: `The bar chart delineates comparative energy consumption patterns across four sovereign nations in 2020, stratified by fuel source. Overall, conventional fossil fuels—specifically coal and petroleum derivatives—accounted for the lion's share of total consumption, in stark contrast to sustainable alternatives, which registered marginal percentages across all surveyed territories.`,
      vocabUpgrades: [
        { basic: "The chart show", tactical: "The bar chart illustrates", academic: "The bar chart delineates comparative patterns", note: "Mở bài Task 1 không dùng lặp từ 'shows'" },
        { basic: "is very big", tactical: "constituted the dominant source", academic: "accounted for the lion's share of total consumption", note: "Cụm diễn đạt tỷ trọng lớn nhất chuẩn C1" },
        { basic: "is very small", tactical: "remained negligible", academic: "registered marginal percentages", note: "Diễn tả số liệu rất nhỏ / không đáng kể" }
      ]
    }
  },

  speakingQuestions: [
    {
      id: "spk_1",
      topic: "Home & Accommodation",
      question: "Do you prefer living in a house or an apartment?",
      ans45: "I like living in a house. Because a house is big and comfortable. My family live in a house and I feel happy.",
      ans55: "To be honest, I much prefer living in an apartment rather than a traditional house. This is because apartments usually offer better security and convenient amenities like gyms or supermarkets nearby. For example, my current flat is only a five-minute walk from the station.",
      ans70: "Without a shadow of a doubt, I'd definitely lean towards apartment living. The primary rationale is the low-maintenance lifestyle and integrated community facilities it entails. Living on a high floor also provides breathtaking panoramic views of the skyline, which is a fantastic stress reliever after a hectic workday.",
      audio55: "audio/speaking_ans55.mp3",
      audio70: "audio/speaking_ans70.mp3"
    },
    {
      id: "spk_2",
      topic: "Daily Routine & Time Management",
      question: "What is your favorite time of the day?",
      ans45: "I like evening the best. Because in evening I don't go to school. I can watch movie with my family and sleep well.",
      ans55: "Without question, my favorite time of the day is early evening around 6 PM. The main reason is that I can finally unwind after a long day of work and have dinner with my loved ones. For instance, I love cooking simple meals while listening to podcast episodes.",
      ans70: "I have an immense fondness for the twilight hours, specifically dusk. Primarily, it signifies the transition from the bustling demands of the corporate routine to personal tranquility. It offers me an uninterrupted window to decompress, indulge in recreational reading, and rejuvenate my mental energy."
    },
    {
      id: "spk_3",
      topic: "Technology & Artificial Intelligence",
      question: "How often do you use artificial intelligence or computers in your daily life?",
      ans45: "I use computer every day for studying and playing game. AI is very fast and it help me do homework easily.",
      ans55: "I interact with computers and AI tools almost constantly on a daily basis. Since I study online, AI assistants help me proofread essays and summarize long articles quickly. For example, I use translation apps whenever I encounter complex English academic papers.",
      ans70: "Artificial intelligence has become utterly ubiquitous in my day-to-day existence. In fact, it serves as an indispensable cognitive co-pilot throughout my academic pursuits. Whether it involves streamlining complex research syntheses or refining idiomatic prose, automated systems augment my productivity exponentially."
    }
  ],

  vocabBank: [
    {
      word: "Detrimental",
      type: "adjective",
      ipa: "/ˌdet.rɪˈmen.təl/",
      meaning: "Gây hại, có hại sâu sắc (Nâng cấp từ: 'very bad / harmful')",
      collocation: "exert a detrimental effect on...",
      example: "Excessive smartphone usage can be detrimental to sleep quality.",
      category: "band7"
    },
    {
      word: "Ubiquitous",
      type: "adjective",
      ipa: "/juːˈbɪk.wə.təs/",
      meaning: "Phổ biến ở khắp mọi nơi (Nâng cấp từ: 'popular / everywhere')",
      collocation: "become increasingly ubiquitous in modern society",
      example: "Smartphones have become ubiquitous across all age groups.",
      category: "band7"
    },
    {
      word: "Mitigate",
      type: "verb",
      ipa: "/ˈmɪt.ɪ.ɡeɪt/",
      meaning: "Làm giảm nhẹ, xoa dịu (Nâng cấp từ: 'reduce / make less bad')",
      collocation: "mitigate the catastrophic impacts of climate change",
      example: "Urgent policies are required to mitigate traffic congestion.",
      category: "band7"
    },
    {
      word: "Indispensable",
      type: "adjective",
      ipa: "/ˌɪn.dɪˈspen.sə.bəl/",
      meaning: "Không thể thiếu được (Nâng cấp từ: 'very important / must-have')",
      collocation: "play an indispensable role in...",
      example: "Self-discipline is indispensable for achieving IELTS 7.0.",
      category: "band7"
    },
    {
      word: "Delineate",
      type: "verb",
      ipa: "/dɪˈlɪn.i.eɪt/",
      meaning: "Mô tả, phác họa chi tiết (Dùng mở bài Task 1 thay cho 'shows')",
      collocation: "The chart delineates the distribution of...",
      example: "The diagram clearly delineates each phase of the water cycle.",
      category: "band7"
    },
    {
      word: "Lỗi dùng: 'people is' ➔ 'people are'",
      type: "Grammar Mistake",
      ipa: "[Subject-Verb Agreement]",
      meaning: "'People' là danh từ số nhiều, luôn đi với động từ số nhiều 'are/were/have'.",
      collocation: "Many people ARE (không dùng is)",
      example: "Sai: Many people is using phones. ➔ Đúng: Many people are using phones.",
      category: "mistake"
    },
    {
      word: "Lỗi dùng: 'Although ... but ...'",
      type: "Grammar Mistake",
      ipa: "[Double Conjunction]",
      meaning: "Trong tiếng Anh chỉ được dùng HOẶC 'Although' HOẶC 'But', không đi chung một câu.",
      collocation: "Although S + V, S + V",
      example: "Sai: Although it rained, but we went. ➔ Đúng: Although it rained, we went.",
      category: "mistake"
    },
    {
      word: "Lỗi phát âm: Đuôi /s/ và /es/",
      type: "Pronunciation Trap",
      ipa: "[Ending Sounds]",
      meaning: "Người học ở mức 4.0 thường nuốt mất âm /s/ số nhiều hoặc ngôi thứ 3 số ít.",
      collocation: "He works /wɜːks/, houses /ˈhaʊ.zɪz/",
      example: "Luyện phát âm rõ âm đuôi khi thi Speaking Part 1.",
      category: "mistake"
    }
  ],

  theoryLessons: [
    {
      id: "th_list_1",
      skill: "listening",
      band: "4-5",
      bandLabel: "Band 4.0 - 5.0 (Foundation)",
      title: "Quy Tắc Đánh Vần Tên Riêng, Số Điện Thoại & Bảng Ký Tự Dễ Nhầm (Part 1)",
      readTime: "5 phút",
      summary: "Xóa tan nỗi sợ bẫy chữ cái và số trong phần điền biểu mẫu Part 1.",
      practiceTab: "listening",
      contentHtml: `
        <div class="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <div class="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200">
            <strong>🎯 Mục tiêu cốt lõi:</strong> Part 1 là phần dễ nhất để lấy trọn 10/10 câu. Tuyệt đối không được để mất điểm ở phần thông tin cơ bản: Tên người, địa chỉ, số điện thoại, ngày tháng.
          </div>

          <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
            1. Các cặp ký tự "tử thần" thường xuyên bị nghe nhầm:
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="font-bold text-red-500">A - E - I:</span>
              <p>• <strong>A</strong> phát âm là <em>/eɪ/</em> (giống âm "ây").</p>
              <p>• <strong>E</strong> phát âm là <em>/iː/</em> (âm "i" dài).</p>
              <p>• <strong>I</strong> phát âm là <em>/aɪ/</em> (âm "ai").</p>
            </div>
            <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="font-bold text-red-500">G - J:</span>
              <p>• <strong>G</strong> phát âm là <em>/dʒiː/</em> ("di").</p>
              <p>• <strong>J</strong> phát âm là <em>/dʒeɪ/</em> ("dây").</p>
              <p>• <strong>H</strong> phát âm là <em>/eɪtʃ/</em> (nhớ bật âm đuôi /tʃ/).</p>
            </div>
          </div>

          <h4 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5 mt-2">
            2. Quy tắc đọc số điện thoại & Số nhà của người Anh:
          </h4>
          <ul class="list-disc pl-5 space-y-1.5">
            <li>Số <strong>0</strong> thường được đọc là <strong>"oh" /əʊ/</strong> (như chữ O), đôi khi đọc là <strong>"zero"</strong>.</li>
            <li>Hai số giống nhau liên tiếp: <strong>77</strong> = <em>"double seven"</em> (không đọc seven seven).</li>
            <li>Ba số giống nhau liên tiếp: <strong>888</strong> = <em>"triple eight"</em>.</li>
            <li>Ngắt nhịp theo cụm 3-4 số: <code>07700 900 543</code> ➔ Người bản xứ sẽ nghỉ 0.5s ở giữa các cụm.</li>
          </ul>

          <div class="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200">
            ⚠️ <strong>Bẫy tự sửa (Self-Correction):</strong> Người nói thường nói sai trước rồi sửa lại ngay sau đó: <br>
            <em>"My number is 0789... oh sorry, that was my old number, it's actually 0786..."</em> ➔ Đáp án đúng là số nói sau cùng!
          </div>
        </div>
      `
    },
    {
      id: "th_list_2",
      skill: "listening",
      band: "5-6",
      bandLabel: "Band 5.0 - 6.0 (Tactical)",
      title: "Chiến Thuật Bản Đồ (Map Labelling) & 8 Giới Từ Phương Hướng Sống Còn (Part 2)",
      readTime: "6 phút",
      summary: "Cách xác định điểm xuất phát và bám sát lộ trình người nói chỉ đường.",
      practiceTab: "listening",
      contentHtml: `
        <div class="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <div class="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200">
            <strong>🎯 Chiến thuật cốt lõi:</strong> Trước khi audio phát, luôn tìm vị trí <strong>"You are here"</strong> hoặc <strong>"Main Entrance"</strong> (Cổng chính). Hãy tưởng tượng bạn đang đứng tại đó và quay mặt về phía bên trong bản đồ.
          </div>

          <h4 class="font-bold text-sm text-slate-900 dark:text-white">
            8 Cụm giới từ chỉ phương hướng xuất hiện 95% trong đề thi:
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div class="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <strong>1. Opposite / Facing:</strong> Đối diện trực tiếp qua hành lang hoặc con đường.
            </div>
            <div class="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <strong>2. Adjacent to / Next to:</strong> Nằm sát ngay bên cạnh (chung một vách tường).
            </div>
            <div class="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <strong>3. At the far end:</strong> Nằm ở tận cùng hành lang hoặc góc xa nhất.
            </div>
            <div class="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <strong>4. On your left / right-hand side:</strong> Nằm ở phía tay trái/phải của bạn khi đi tới.
            </div>
            <div class="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <strong>5. In the top right corner:</strong> Nằm ở góc trên cùng bên phải của bản đồ.
            </div>
            <div class="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <strong>6. Run parallel to:</strong> Chạy song song với (ví dụ: con đường chạy song song bờ sông).
            </div>
          </div>
        </div>
      `
    },
    {
      id: "th_read_1",
      skill: "reading",
      band: "4-5",
      bandLabel: "Band 4.0 - 5.0 (Foundation)",
      title: "Kỹ Thuật Scanning Bắt Từ Khóa 'Bất Tử' (Scanning for Unchangeable Keywords)",
      readTime: "5 phút",
      summary: "Cách dò tìm thông tin siêu tốc trong bài đọc dài mà không cần dịch hết bài.",
      practiceTab: "reading",
      contentHtml: `
        <div class="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <div class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200">
            <strong>💡 Quy luật:</strong> Đề thi IELTS Reading dài tới 2.500 từ. Nếu bạn đọc và dịch từng từ từ đầu đến cuối, bạn chắc chắn sẽ thiếu giờ! Scanning là kỹ năng lướt mắt tìm đúng vị trí chứa câu trả lời.
          </div>

          <h4 class="font-bold text-sm text-slate-900 dark:text-white">
            Phân biệt 2 loại từ khóa khi làm bài Reading:
          </h4>
          <div class="space-y-2.5">
            <div class="p-3 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-white dark:bg-slate-900">
              <span class="font-bold text-emerald-600 dark:text-emerald-400">1. Từ khóa BẤT TỬ (Unchangeable Keywords):</span>
              <p class="mt-1">Là những từ <strong>KHÔNG THỂ bị Paraphrase (viết lại)</strong>:</p>
              <ul class="list-disc pl-5 mt-1 space-y-0.5">
                <li>Tên riêng viết hoa: <em>Karl von Frisch, London, Harvard</em>.</li>
                <li>Con số, năm, ngày tháng: <em>1946, 75%, 20th century</em>.</li>
                <li>Thuật ngữ khoa học có dấu gạch nối hoặc in nghiêng: <em>waggle-dance, photosynthesis</em>.</li>
              </ul>
              <p class="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1">➔ Hãy dùng các từ này làm "mỏ neo" để định vị vị trí câu trả lời trong tích tắc!</p>
            </div>

            <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="font-bold text-amber-600 dark:text-amber-400">2. Từ khóa BIẾN ĐỔI (Changeable Keywords):</span>
              <p class="mt-1">Là động từ, tính từ thường <strong>bị viết lại bằng từ đồng nghĩa</strong> trong bài:</p>
              <ul class="list-disc pl-5 mt-1 space-y-0.5">
                <li><em>huge / big</em> ➔ <em>enormous, substantial</em></li>
                <li><em>find / discover</em> ➔ <em>decipher, identify</em></li>
              </ul>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "th_read_2",
      skill: "reading",
      band: "5-6",
      bandLabel: "Band 5.0 - 6.0 (Tactical)",
      title: "Ma Trận 3 Bước Phân Biệt Tuyệt Đối TRUE - FALSE - NOT GIVEN",
      readTime: "7 phút",
      summary: "Thuật toán logic giúp bạn không bao giờ chọn nhầm giữa FALSE và NOT GIVEN.",
      practiceTab: "reading",
      contentHtml: `
        <div class="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <div class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200">
            <strong>🎯 Thuật toán kiểm tra 3 bước:</strong> Đừng bao giờ đoán mò bằng cảm tính! Hãy áp dụng chính xác công thức logic sau:
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse border border-slate-200 dark:border-slate-800">
              <thead>
                <tr class="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                  <th class="p-2.5 border border-slate-200 dark:border-slate-700">Đáp án</th>
                  <th class="p-2.5 border border-slate-200 dark:border-slate-700">Đặc điểm nhận diện</th>
                  <th class="p-2.5 border border-slate-200 dark:border-slate-700">Ví dụ thực tế</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td class="p-2.5 font-bold text-emerald-600 border border-slate-200 dark:border-slate-700">TRUE</td>
                  <td class="p-2.5 border border-slate-200 dark:border-slate-700">Thông tin bài đọc và câu hỏi <strong>khớp nghĩa 100%</strong> (chỉ thay từ đồng nghĩa).</td>
                  <td class="p-2.5 border border-slate-200 dark:border-slate-700">Bài: "Ong nhảy để chỉ hướng." <br>Câu hỏi: "Điệu nhảy cung cấp thông tin về hướng thức ăn." ➔ <strong>TRUE</strong></td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold text-red-500 border border-slate-200 dark:border-slate-700">FALSE</td>
                  <td class="p-2.5 border border-slate-200 dark:border-slate-700">Bài đọc CÓ nhắc tới vấn đề đó, nhưng khẳng định điều <strong>ngược lại / mâu thuẫn trực tiếp</strong>.</td>
                  <td class="p-2.5 border border-slate-200 dark:border-slate-700">Bài: "Ong vẫn bay về tổ bình thường khi trời âm u." <br>Câu hỏi: "Ong không thể bay về khi có mây." ➔ <strong>FALSE</strong></td>
                </tr>
                <tr>
                  <td class="p-2.5 font-bold text-amber-500 border border-slate-200 dark:border-slate-700">NOT GIVEN</td>
                  <td class="p-2.5 border border-slate-200 dark:border-slate-700">Bài đọc <strong>KHÔNG HỀ NÓI TỚI</strong> hoặc không đủ chứng cứ để kết luận (dù ngoài đời có thể đúng).</td>
                  <td class="p-2.5 border border-slate-200 dark:border-slate-700">Bài: "Ông Karl giải mã điệu nhảy năm 1946." <br>Câu hỏi: "Ông Karl đoạt giải Nobel." ➔ <strong>NOT GIVEN</strong> (Bài không nhắc gì đến giải Nobel).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200">
            ⚠️ <strong>Bẫy từ tuyệt đối:</strong> Chú ý các từ như: <em>always, completely, only, all, never</em>. Nếu câu hỏi có từ "only" mà bài đọc không khẳng định duy nhất ➔ Rất có thể là FALSE hoặc NOT GIVEN.
          </div>
        </div>
      `
    },
    {
      id: "th_write_1",
      skill: "writing",
      band: "4-5",
      bandLabel: "Band 4.0 - 5.0 (Foundation)",
      title: "3 Cấu Trúc Câu Sống Còn & Tuyệt Chiêu Xóa Sổ Lỗi Câu Què (Sentence Fragments)",
      readTime: "6 phút",
      summary: "Nắm vững câu đơn, câu ghép và câu phức để bài viết không bị dưới band 5.0.",
      practiceTab: "writing",
      contentHtml: `
        <div class="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <div class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200">
            <strong>🎯 Tiêu chí Grammatical Range & Accuracy:</strong> Người học mức 4.0 - 4.5 thường viết câu cụt, câu ghép thiếu liên từ hoặc dùng sai liên từ kép. Hãy làm chủ 3 loại câu này trước tiên:
          </div>

          <div class="space-y-3">
            <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="font-bold text-slate-900 dark:text-white">1. Câu đơn (Simple Sentence):</span>
              <p>Chỉ gồm 1 mệnh đề độc lập (1 Chủ ngữ + 1 Động từ chính):</p>
              <p class="font-mono text-indigo-600 dark:text-indigo-400 mt-1">Smartphones affect teenagers' communication skills.</p>
            </div>

            <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span class="font-bold text-slate-900 dark:text-white">2. Câu ghép (Compound Sentence - Dùng FANBOYS):</span>
              <p>Nối 2 mệnh đề độc lập bằng dấu phẩy và liên từ: <em>for, and, nor, but, or, yet, so</em>:</p>
              <p class="font-mono text-indigo-600 dark:text-indigo-400 mt-1">Teenagers spend hours on phones, <strong>so</strong> they lack physical exercise.</p>
            </div>

            <div class="p-3 rounded-lg border border-brand-200 dark:border-brand-900 bg-white dark:bg-slate-900">
              <span class="font-bold text-brand-600 dark:text-brand-400">3. Câu phức (Complex Sentence - Bắt buộc để lên 6.0+):</span>
              <p>Kết hợp 1 mệnh đề phụ thuộc (bắt đầu bằng <em>Although, Because, While, If</em>) với 1 mệnh đề chính:</p>
              <p class="font-mono text-brand-700 dark:text-brand-300 mt-1"><strong>Although</strong> smartphones offer convenient communication, they can lead to social isolation.</p>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-200">
            <strong>🚫 LỖI CẤM KỴ TUYỆT ĐỐI CỦA NGƯỜI VIỆT:</strong>
            <p class="mt-1">❌ <strong>SAI:</strong> <em>Although smartphones are useful, BUT they have drawbacks.</em></p>
            <p class="mt-0.5">✅ <strong>ĐÚNG:</strong> <em>Although smartphones are useful, they have drawbacks.</em> (Trong tiếng Anh, đã có Although thì KHÔNG có But!).</p>
          </div>
        </div>
      `
    },
    {
      id: "th_write_2",
      skill: "writing",
      band: "5-6",
      bandLabel: "Band 5.0 - 6.0 (Tactical)",
      title: "Công Thức Đoạn Văn PEEL Chuẩn Học Thuật (Point - Explain - Example - Link)",
      readTime: "7 phút",
      summary: "Cách viết thân bài mạch lạc, lập luận chặt chẽ giúp đạt điểm cao tiêu chí Coherence & Cohesion.",
      practiceTab: "writing",
      contentHtml: `
        <div class="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <div class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200">
            <strong>🎯 Công thức PEEL:</strong> Mỗi đoạn thân bài Writing Task 2 chỉ nên tập trung vào <strong>1 ý tưởng cốt lõi</strong> và phát triển nó theo 4 bước rõ ràng:
          </div>

          <div class="space-y-2.5">
            <div class="p-3 rounded-lg border-l-4 border-amber-500 bg-white dark:bg-slate-900 shadow-sm">
              <strong class="text-amber-600 dark:text-amber-400">P - Point (Luận điểm chính):</strong> 1 câu nêu trực diện luận điểm của đoạn.
              <p class="italic text-slate-500 mt-1">"The primary drawback of excessive smartphone usage is social alienation."</p>
            </div>
            <div class="p-3 rounded-lg border-l-4 border-blue-500 bg-white dark:bg-slate-900 shadow-sm">
              <strong class="text-blue-600 dark:text-blue-400">E - Explanation (Giải thích):</strong> 1-2 câu giải thích tại sao hoặc điều đó diễn ra như thế nào.
              <p class="italic text-slate-500 mt-1">"This is because virtual interactions frequently replace direct face-to-face conversations, hindering the development of emotional intelligence."</p>
            </div>
            <div class="p-3 rounded-lg border-l-4 border-emerald-500 bg-white dark:bg-slate-900 shadow-sm">
              <strong class="text-emerald-600 dark:text-emerald-400">E - Example (Dẫn chứng cụ thể):</strong> 1 câu đưa ví dụ thực tế minh họa.
              <p class="italic text-slate-500 mt-1">"For instance, many adolescents prefer texting friends rather than participating in team sports."</p>
            </div>
            <div class="p-3 rounded-lg border-l-4 border-purple-500 bg-white dark:bg-slate-900 shadow-sm">
              <strong class="text-purple-600 dark:text-purple-400">L - Link (Chốt & Nối):</strong> 1 câu tóm gọn lại mối liên hệ với chủ đề bài luận.
              <p class="italic text-slate-500 mt-1">"Consequently, prolonged screen time exerts a detrimental impact on adolescent interpersonal relationships."</p>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "th_speak_1",
      skill: "speaking",
      band: "4-5",
      bandLabel: "Band 4.0 - 5.0 (Foundation)",
      title: "Chuẩn Hóa Âm Đuôi /s/, /ed/ & Công Thức Phản Xạ 2 Bước (Answer + Reason)",
      readTime: "5 phút",
      summary: "Khắc phục triệt để tật nuốt âm đuôi và thói quen trả lời cụt lủn trong Part 1.",
      practiceTab: "speaking",
      contentHtml: `
        <div class="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <div class="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200">
            <strong>🎯 Điểm mấu chốt:</strong> Ở mức 4.0 - 4.5, học sinh thường mắc 2 lỗi nặng nhất: (1) Nói cụt 1 câu rồi im lặng; (2) Quên phát âm âm đuôi (ending sounds).
          </div>

          <h4 class="font-bold text-sm text-slate-900 dark:text-white">
            1. Bắt buộc phát âm rõ âm đuôi /s/ và /z/:
          </h4>
          <p>Trong tiếng Việt không có âm đuôi gió, nên não ta có thói quen "bỏ quên". Nhưng trong tiếng Anh, thiếu /s/ sẽ làm sai nghĩa ngữ pháp (số nhiều, ngôi thứ ba):</p>
          <ul class="list-disc pl-5 space-y-1">
            <li><em>He works /wɜːks/</em> (không đọc là "he work").</li>
            <li><em>Two houses /ˈhaʊ.zɪz/</em> (không đọc là "two house").</li>
            <li><em>Likes /laɪks/, apartments /əˈpɑːt.mənts/</em>.</li>
          </ul>

          <h4 class="font-bold text-sm text-slate-900 dark:text-white mt-2">
            2. Công thức phản xạ 2 bước Part 1 (Không bao giờ trả lời 1 câu cộc lốc):
          </h4>
          <p>Mỗi khi giám khảo hỏi một câu Part 1, hãy tự động kích hoạt 2 bước:</p>
          <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
            <div><strong>Bước 1 (Answer):</strong> Trả lời trực diện.</div>
            <div><strong>Bước 2 (Reason):</strong> Thêm chữ <strong>"Because..."</strong> và đưa 1 lý do ngắn gọn.</div>
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800 font-sans mt-2">
              <em>Giám khảo: "Do you like listening to music?"</em><br>
              <strong>Bạn:</strong> "Yes, I'm really keen on listening to pop music, <strong>mainly because</strong> it helps me unwind after a long stressful day."
            </div>
          </div>
        </div>
      `
    },
    {
      id: "th_speak_2",
      skill: "speaking",
      band: "5-6",
      bandLabel: "Band 5.0 - 6.0 (Tactical)",
      title: "Khung Phản Xạ 3 Bước Thần Thánh A-R-E (Answer - Reason - Example/Feeling)",
      readTime: "6 phút",
      summary: "Vũ khí bí mật giúp câu trả lời Part 1 và Part 3 luôn đầy đặn, tự nhiên, đạt 6.5+.",
      practiceTab: "speaking",
      contentHtml: `
        <div class="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          <div class="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200">
            <strong>🎯 Khung A-R-E là gì?</strong> Đây là phương pháp tư duy 3 nhịp giúp bạn kéo dài câu trả lời từ 25 - 35 giây một cách hoàn toàn tự nhiên mà không cần học vẹt bài mẫu:
          </div>

          <div class="space-y-2.5">
            <div class="p-3 rounded-lg border-l-4 border-rose-500 bg-white dark:bg-slate-900">
              <strong class="text-rose-600 dark:text-rose-400">1. A (Answer):</strong> Trả lời thẳng vào trọng tâm (Dùng các từ mở đầu tự nhiên: <em>To be honest / Without doubt / Definitely</em>).
            </div>
            <div class="p-3 rounded-lg border-l-4 border-indigo-500 bg-white dark:bg-slate-900">
              <strong class="text-indigo-600 dark:text-indigo-400">2. R (Reason):</strong> Nêu lý do vì sao (<em>The primary rationale is that... / Simply because...</em>).
            </div>
            <div class="p-3 rounded-lg border-l-4 border-emerald-500 bg-white dark:bg-slate-900">
              <strong class="text-emerald-600 dark:text-emerald-400">3. E (Example / Feeling):</strong> Đưa ví dụ cá nhân hoặc cảm xúc của bạn (<em>For instance... / In fact, just last weekend...</em>).
            </div>
          </div>

          <div class="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
            <strong>Ví dụ mẫu phân tích A-R-E hoàn chỉnh:</strong><br>
            <em>"Do you prefer living in a house or an apartment?"</em><br>
            • <strong>[A]</strong> "To be honest, I much prefer living in an apartment rather than a traditional house.<br>
            • <strong>[R]</strong> This is because modern flats offer superior 24/7 security and convenient amenities right at your doorstep.<br>
            • <strong>[E]</strong> For example, my current condominium has a gym and a supermarket on the ground floor, which saves me tons of commute time."
          </div>
        </div>
      `
    }
  ]
};
