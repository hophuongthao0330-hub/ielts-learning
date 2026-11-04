// ielts_vocab_practice.js - Kho Từ Vựng & Luyện Tập Tương Tác 12 Chủ Đề Cốt Lõi Band 7.0+
const IELTS_VOCAB_TOPICS = [
  {
    "id": "education",
    "name": "Education & Academic Growth",
    "vnName": "Giáo dục & Phát triển Học thuật",
    "icon": "graduation-cap",
    "words": [
      {
        "id": "edu_1",
        "term": "pedagogical methodology",
        "type": "noun phrase",
        "ipa": "/ˌped.əˈɡɒdʒ.ɪ.kəl ˌmeθ.əˈdɒl.ə.dʒi/",
        "meaning": "Phương pháp sư phạm giảng dạy",
        "example": "Modern educational institutions are revamping their pedagogical methodology to foster creative problem-solving.",
        "paraphrase": "teaching approach / instructional strategy",
        "collocation": "adopt innovative pedagogical methodology"
      },
      {
        "id": "edu_2",
        "term": "holistic development",
        "type": "noun phrase",
        "ipa": "/həʊˈlɪs.tɪk dɪˈvel.əp.mənt/",
        "meaning": "Sự phát triển toàn diện (thể chất, trí tuệ, cảm xúc)",
        "example": "Schools should prioritize holistic development over rote memorization of textbook facts.",
        "paraphrase": "well-rounded growth / comprehensive nurturing",
        "collocation": "promote the holistic development of youngsters"
      },
      {
        "id": "edu_3",
        "term": "curriculum reform",
        "type": "noun phrase",
        "ipa": "/kəˈrɪk.jə.ləm rɪˈfɔːm/",
        "meaning": "Cải cách chương trình giảng dạy",
        "example": "Urgent curriculum reform is required to bridge the gap between academic theory and industry demands.",
        "paraphrase": "educational syllabus restructuring",
        "collocation": "implement sweeping curriculum reform"
      },
      {
        "id": "edu_4",
        "term": "critical inquiry",
        "type": "noun phrase",
        "ipa": "/ˈkrɪt.ɪ.kəl ɪnˈkwaɪə.ri/",
        "meaning": "Tư duy phản biện và truy vấn học thuật",
        "example": "Tertiary education encourages critical inquiry rather than passive reception of facts.",
        "paraphrase": "analytical questioning / independent reasoning",
        "collocation": "stimulate critical inquiry among undergraduates"
      },
      {
        "id": "edu_5",
        "term": "socio-economic disparity",
        "type": "noun phrase",
        "ipa": "/ˌsəʊ.si.əʊˌek.əˈnɒm.ɪk dɪˈspær.ə.ti/",
        "meaning": "Sự chênh lệch về kinh tế - xã hội (ảnh hưởng đến cơ hội học tập)",
        "example": "Government subsidies help mitigate socio-economic disparity in higher education access.",
        "paraphrase": "wealth divide / inequality of opportunities",
        "collocation": "widen/bridge socio-economic disparity"
      },
      {
        "id": "edu_6",
        "term": "autonomous learning",
        "type": "noun phrase",
        "ipa": "/ɔːˈtɒn.ə.məs ˈlɜː.nɪŋ/",
        "meaning": "Khả năng tự chủ trong việc học (tự học)",
        "example": "Digital platforms empower learners to cultivate autonomous learning habits at their own pace.",
        "paraphrase": "self-directed study / independent learning",
        "collocation": "foster autonomous learning capacity"
      }
    ],
    "flashcards": [
      {
        "front": "pedagogical methodology",
        "back": "Phương pháp sư phạm giảng dạy\nVí dụ: Modern schools revise pedagogical methodology to enhance engagement.\nParaphrase: teaching approach."
      },
      {
        "front": "holistic development",
        "back": "Phát triển toàn diện (thể chất & tinh thần)\nVí dụ: Nurturing holistic development is vital for young children.\nParaphrase: well-rounded growth."
      },
      {
        "front": "autonomous learning",
        "back": "Tự học có định hướng / Tự chủ học tập\nVí dụ: University requires strong autonomous learning skills.\nParaphrase: self-directed study."
      },
      {
        "front": "critical inquiry",
        "back": "Tư duy phản biện / Truy vấn khoa học\nVí dụ: Students must engage in critical inquiry when reviewing research."
      }
    ],
    "matching": [
      {
        "pairId": 1,
        "left": "pedagogical methodology",
        "right": "Phương pháp sư phạm giảng dạy"
      },
      {
        "pairId": 2,
        "left": "holistic development",
        "right": "Sự phát triển toàn diện nhân cách"
      },
      {
        "pairId": 3,
        "left": "curriculum reform",
        "right": "Cải cách khung chương trình học"
      },
      {
        "pairId": 4,
        "left": "critical inquiry",
        "right": "Tư duy phản biện và truy vấn"
      },
      {
        "pairId": 5,
        "left": "autonomous learning",
        "right": "Năng lực tự định hướng học tập"
      }
    ],
    "gapFill": [
      {
        "id": "gf_edu_1",
        "sentence": "Rather than focusing solely on exam scores, progressive educators emphasize the ________ development of pupils.",
        "answer": "holistic",
        "options": [
          "holistic",
          "fragmented",
          "superficial",
          "standardized"
        ],
        "hint": "Tính từ chỉ sự phát triển toàn diện về mọi mặt thể chất, trí tuệ và cảm xúc."
      },
      {
        "id": "gf_edu_2",
        "sentence": "Online universities require undergraduates to possess a high degree of ________ learning capability.",
        "answer": "autonomous",
        "options": [
          "autonomous",
          "coercive",
          "passive",
          "archaic"
        ],
        "hint": "Tính từ chỉ năng lực tự giác, độc lập tự chủ trong quá trình nghiên cứu."
      }
    ],
    "quiz": [
      {
        "id": "qz_edu_1",
        "question": "Which phrase is the best academic substitute for 'teaching method' in an IELTS Task 2 essay?",
        "options": [
          "Pedagogical methodology",
          "Class routine",
          "Speaking practice",
          "Book mechanism"
        ],
        "correct": 0,
        "explanation": "'Pedagogical methodology' là thuật ngữ học thuật C1/C2 chỉ phương pháp và nghệ thuật sư phạm giảng dạy."
      },
      {
        "id": "qz_edu_2",
        "question": "What is the synonym of 'independent study' in higher education context?",
        "options": [
          "Autonomous learning",
          "Compulsory schooling",
          "Vocational apprenticeship",
          "Rote learning"
        ],
        "correct": 0,
        "explanation": "'Autonomous learning' (tự chủ học tập) thể hiện đúng tinh thần tự nghiên cứu độc lập của sinh viên đại học."
      }
    ]
  },
  {
    "id": "environment",
    "name": "Environment & Climate Resilience",
    "vnName": "Môi trường & Biến đổi Khí hậu",
    "icon": "leaf",
    "words": [
      {
        "id": "env_1",
        "term": "ecological degradation",
        "type": "noun phrase",
        "ipa": "/ˌiː.kəˈlɒdʒ.ɪ.kəl ˌdeɡ.rəˈdeɪ.ʃən/",
        "meaning": "Sự suy thoái hệ sinh thái",
        "example": "Unregulated industrial discharge accelerates ecological degradation across river basins.",
        "paraphrase": "environmental deterioration / habitat destruction",
        "collocation": "halt rapid ecological degradation"
      },
      {
        "id": "env_2",
        "term": "renewable energy transition",
        "type": "noun phrase",
        "ipa": "/rɪˈnjuː.ə.bəl ˈen.ə.dʒi trænˈzɪʃ.ən/",
        "meaning": "Chuyển dịch sang năng lượng tái tạo",
        "example": "Governments must subsidize solar and wind infrastructure to expedite the renewable energy transition.",
        "paraphrase": "shift toward clean power / decarbonization",
        "collocation": "accelerate the renewable energy transition"
      },
      {
        "id": "env_3",
        "term": "carbon sequestration",
        "type": "noun phrase",
        "ipa": "/ˌkɑː.bən ˌsiː.kwesˈtreɪ.ʃən/",
        "meaning": "Hấp thụ và cô lập khí carbon (qua rừng hoặc công nghệ)",
        "example": "Mangrove forests play an indispensable role in biological carbon sequestration.",
        "paraphrase": "carbon capture and storage",
        "collocation": "enhance natural carbon sequestration capacity"
      },
      {
        "id": "env_4",
        "term": "biodiversity conservation",
        "type": "noun phrase",
        "ipa": "/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti ˌkɒn.səˈveɪ.ʃən/",
        "meaning": "Bảo tồn đa dạng sinh học",
        "example": "Establishing marine sanctuaries is vital for long-term biodiversity conservation.",
        "paraphrase": "wildlife preservation / species protection",
        "collocation": "allocate funds for biodiversity conservation"
      },
      {
        "id": "env_5",
        "term": "anthropogenic emissions",
        "type": "noun phrase",
        "ipa": "/ˌæn.θrə.pəˈdʒen.ɪk ɪˈmɪʃ.ənz/",
        "meaning": "Khí thải do hoạt động của con người gây ra",
        "example": "The overwhelming scientific consensus confirms that anthropogenic emissions are the principal driver of global warming.",
        "paraphrase": "man-made greenhouse gases / human-induced pollution",
        "collocation": "curb anthropogenic emissions substantially"
      }
    ],
    "flashcards": [
      {
        "front": "ecological degradation",
        "back": "Sự suy thoái hệ sinh thái nghiêm trọng\nVí dụ: Overfishing causes irreversible ecological degradation.\nParaphrase: habitat destruction."
      },
      {
        "front": "carbon sequestration",
        "back": "Quá trình hấp thụ và lưu trữ khí carbon (của rừng/đại dương)\nVí dụ: Wetlands are effective carbon sequestration sinks."
      },
      {
        "front": "anthropogenic emissions",
        "back": "Khí thải do con người tạo ra\nVí dụ: Slashing anthropogenic emissions is crucial to meet climate targets."
      }
    ],
    "matching": [
      {
        "pairId": 1,
        "left": "ecological degradation",
        "right": "Sự suy thoái sinh thái tự nhiên"
      },
      {
        "pairId": 2,
        "left": "carbon sequestration",
        "right": "Hấp thụ và cô lập khí carbon"
      },
      {
        "pairId": 3,
        "left": "anthropogenic emissions",
        "right": "Khí thải do hoạt động nhân tạo"
      },
      {
        "pairId": 4,
        "left": "biodiversity conservation",
        "right": "Bảo tồn đa dạng các loài sinh vật"
      }
    ],
    "gapFill": [
      {
        "id": "gf_env_1",
        "sentence": "Deforestation dramatically diminishes the Earth's natural capacity for carbon ________.",
        "answer": "sequestration",
        "options": [
          "sequestration",
          "exploitation",
          "combustion",
          "propagation"
        ],
        "hint": "Thuật ngữ khoa học chỉ quá trình giữ và cô lập khí CO2 của thảm thực vật."
      }
    ],
    "quiz": [
      {
        "id": "qz_env_1",
        "question": "What is the Band 7.5+ collocation for 'man-made pollution'?",
        "options": [
          "Anthropogenic emissions",
          "Artificial smoke",
          "Human trash",
          "Synthetic fumes"
        ],
        "correct": 0,
        "explanation": "'Anthropogenic emissions' là thuật ngữ học thuật chính xác chỉ lượng khí thải có nguồn gốc từ hoạt động nhân sinh của con người."
      }
    ]
  },
  {
    "id": "technology",
    "name": "Technology & Artificial Intelligence",
    "vnName": "Công nghệ & Trí tuệ Nhân tạo",
    "icon": "cpu",
    "words": [
      {
        "id": "tech_1",
        "term": "algorithmic bias",
        "type": "noun phrase",
        "ipa": "/ˌæl.ɡəˈrɪð.mɪk ˈbaɪ.əs/",
        "meaning": "Định kiến thuật toán (sự thiên vị trong mô hình AI)",
        "example": "Researchers caution that machine learning systems may perpetuate historical algorithmic bias.",
        "paraphrase": "automated prejudice / systemic AI distortion",
        "collocation": "detect and eradicate algorithmic bias"
      },
      {
        "id": "tech_2",
        "term": "digital surveillance",
        "type": "noun phrase",
        "ipa": "/ˈdɪdʒ.ɪ.təl sɜːˈveɪ.ləns/",
        "meaning": "Sự giám sát kỹ thuật số",
        "example": "The proliferation of facial recognition cameras sparks intense debate over invasive digital surveillance.",
        "paraphrase": "electronic monitoring / cyber oversight",
        "collocation": "subject citizens to pervasive digital surveillance"
      },
      {
        "id": "tech_3",
        "term": "technological singularity",
        "type": "noun phrase",
        "ipa": "/ˌtek.nəˈlɒdʒ.ɪ.kəl ˌsɪŋ.ɡjəˈlær.ə.ti/",
        "meaning": "Điểm kỳ dị công nghệ (thời điểm AI vượt trí tuệ con người)",
        "example": "Futurists speculate about the socio-ethical repercussions of reaching the technological singularity.",
        "paraphrase": "superintelligence threshold",
        "collocation": "approach the hypothetical technological singularity"
      },
      {
        "id": "tech_4",
        "term": "disruptive innovation",
        "type": "noun phrase",
        "ipa": "/dɪsˈrʌp.tɪv ˌɪn.əˈveɪ.ʃən/",
        "meaning": "Đột phá sáng tạo làm thay đổi cục diện thị trường",
        "example": "Generative AI is widely regarded as a disruptive innovation across creative industries.",
        "paraphrase": "game-changing breakthrough / revolutionary advancement",
        "collocation": "harness the power of disruptive innovation"
      }
    ],
    "flashcards": [
      {
        "front": "algorithmic bias",
        "back": "Định kiến thuật toán AI do dữ liệu huấn luyện thiên lệch.\nParaphrase: machine prejudice."
      },
      {
        "front": "disruptive innovation",
        "back": "Sáng tạo đột phá làm thay đổi toàn bộ thị trường truyền thống.\nParaphrase: game-changing technology."
      }
    ],
    "matching": [
      {
        "pairId": 1,
        "left": "algorithmic bias",
        "right": "Sự thiên lệch trong thuật toán máy học"
      },
      {
        "pairId": 2,
        "left": "digital surveillance",
        "right": "Sự theo dõi giám sát qua thiết bị điện tử"
      },
      {
        "pairId": 3,
        "left": "disruptive innovation",
        "right": "Đột phá công nghệ thay đổi toàn diện ngành nghề"
      }
    ],
    "gapFill": [
      {
        "id": "gf_tech_1",
        "sentence": "If training datasets reflect societal prejudices, the resulting neural network will inevitably exhibit ________ bias.",
        "answer": "algorithmic",
        "options": [
          "algorithmic",
          "mechanical",
          "arbitrary",
          "analogous"
        ],
        "hint": "Từ chỉ tính chất thuộc về thuật toán máy tính."
      }
    ],
    "quiz": [
      {
        "id": "qz_tech_1",
        "question": "Which term describes an innovation that fundamentally transforms how an entire industry operates?",
        "options": [
          "Disruptive innovation",
          "Incremental update",
          "Stagnant design",
          "Minor glitch"
        ],
        "correct": 0,
        "explanation": "'Disruptive innovation' (đột phá cách tân) là cụm từ chuẩn học thuật mô tả sự thay đổi căn bản cục diện ngành."
      }
    ]
  },
  {
    "id": "health",
    "name": "Health, Medicine & Well-being",
    "vnName": "Sức khỏe, Y tế & Lối sống",
    "icon": "heart-pulse",
    "words": [
      {
        "id": "hea_1",
        "term": "sedentary lifestyle",
        "type": "noun phrase",
        "ipa": "/ˈsed.ən.tər.i ˈlaɪf.staɪl/",
        "meaning": "Lối sống ít vận động, ngồi một chỗ nhiều",
        "example": "The shift toward remote desk jobs has exacerbated the prevalence of a sedentary lifestyle among urbanites.",
        "paraphrase": "physically inactive routine / couch-potato habit",
        "collocation": "counteract the perils of a sedentary lifestyle"
      },
      {
        "id": "hea_2",
        "term": "preventive healthcare",
        "type": "noun phrase",
        "ipa": "/prɪˈven.tɪv ˈhelθ.keər/",
        "meaning": "Y tế dự phòng / Chăm sóc sức khỏe phòng ngừa",
        "example": "Investing in preventive healthcare generates far greater long-term economic dividends than treating chronic illnesses.",
        "paraphrase": "proactive medicine / illness prevention",
        "collocation": "prioritize preventive healthcare initiatives"
      },
      {
        "id": "hea_3",
        "term": "psychological resilience",
        "type": "noun phrase",
        "ipa": "/ˌsaɪ.kəˈlɒdʒ.ɪ.kəl rɪˈzɪl.jəns/",
        "meaning": "Khả năng phục hồi tâm lý / Sức bền tinh thần",
        "example": "Mindfulness training assists students in cultivating psychological resilience amid academic pressure.",
        "paraphrase": "mental fortitude / emotional endurance",
        "collocation": "bolster psychological resilience"
      }
    ],
    "flashcards": [
      {
        "front": "sedentary lifestyle",
        "back": "Lối sống ít vận động thể chất\nVí dụ: A sedentary lifestyle elevates cardiovascular risks.\nParaphrase: inactive daily routine."
      },
      {
        "front": "preventive healthcare",
        "back": "Y tế phòng bệnh hơn chữa bệnh\nVí dụ: Governments must subsidize preventive healthcare checkups."
      }
    ],
    "matching": [
      {
        "pairId": 1,
        "left": "sedentary lifestyle",
        "right": "Thói quen sinh hoạt thụ động ít vận động"
      },
      {
        "pairId": 2,
        "left": "preventive healthcare",
        "right": "Hệ thống y tế chăm sóc phòng ngừa"
      },
      {
        "pairId": 3,
        "left": "psychological resilience",
        "right": "Sức đề kháng và khả năng phục hồi tâm lý"
      }
    ],
    "gapFill": [
      {
        "id": "gf_hea_1",
        "sentence": "Medical practitioners advocate regular physical exercise to offset the adverse impacts of a ________ lifestyle.",
        "answer": "sedentary",
        "options": [
          "sedentary",
          "rigorous",
          "frugal",
          "nomadic"
        ],
        "hint": "Tính từ chỉ thói quen ngồi nhiều và thiếu hoạt động thể chất."
      }
    ],
    "quiz": [
      {
        "id": "qz_hea_1",
        "question": "Which collocation is the most academic replacement for 'mental toughness'?",
        "options": [
          "Psychological resilience",
          "Brain hardness",
          "Emotional wall",
          "Thought stiffness"
        ],
        "correct": 0,
        "explanation": "'Psychological resilience' là thuật ngữ tâm lý học C1/C2 thể hiện năng lực phục hồi tinh thần sau nghịch cảnh."
      }
    ]
  },
  {
    "id": "society",
    "name": "Society, Urbanization & Demographics",
    "vnName": "Xã hội, Đô thị hóa & Dân số",
    "icon": "users",
    "words": [
      {
        "id": "soc_1",
        "term": "unprecedented urbanization",
        "type": "noun phrase",
        "ipa": "/ʌnˈpres.ɪ.den.tɪd ˌɜː.bən.aɪˈzeɪ.ʃən/",
        "meaning": "Quá trình đô thị hóa với tốc độ chưa từng có",
        "example": "Developing countries are undergoing unprecedented urbanization, placing enormous strain on municipal infrastructure.",
        "paraphrase": "rapid rural-to-urban migration",
        "collocation": "cope with the demands of unprecedented urbanization"
      },
      {
        "id": "soc_2",
        "term": "aging demographic",
        "type": "noun phrase",
        "ipa": "/ˈeɪ.dʒɪŋ ˌdem.əˈɡræf.ɪk/",
        "meaning": "Cơ cấu dân số già hóa",
        "example": "An aging demographic poses severe fiscal challenges for national pension and healthcare systems.",
        "paraphrase": "greying society / elderly population",
        "collocation": "cater to the healthcare needs of an aging demographic"
      },
      {
        "id": "soc_3",
        "term": "social cohesion",
        "type": "noun phrase",
        "ipa": "/ˈsəʊ.ʃəl kəʊˈhiː.ʒən/",
        "meaning": "Sự gắn kết xã hội / Tình đoàn kết cộng đồng",
        "example": "Community cultural festivals strengthen social cohesion across diverse ethnic groups.",
        "paraphrase": "communal solidarity / societal harmony",
        "collocation": "foster greater social cohesion"
      }
    ],
    "flashcards": [
      {
        "front": "aging demographic",
        "back": "Dân số già hóa\nParaphrase: greying population / silver tsunami."
      },
      {
        "front": "social cohesion",
        "back": "Sự gắn kết bền chặt giữa các thành viên trong xã hội.\nParaphrase: communal solidarity."
      }
    ],
    "matching": [
      {
        "pairId": 1,
        "left": "unprecedented urbanization",
        "right": "Đô thị hóa nhanh chóng chưa từng có"
      },
      {
        "pairId": 2,
        "left": "aging demographic",
        "right": "Cơ cấu dân số đang già đi"
      },
      {
        "pairId": 3,
        "left": "social cohesion",
        "right": "Sự liên kết và gắn bó xã hội"
      }
    ],
    "gapFill": [
      {
        "id": "gf_soc_1",
        "sentence": "Inclusive public parks and communal libraries serve as instrumental catalysts for enhancing social ________.",
        "answer": "cohesion",
        "options": [
          "cohesion",
          "polarization",
          "fragmentation",
          "inertia"
        ],
        "hint": "Danh từ mang nghĩa sự gắn kết, hòa hợp giữa các tầng lớp trong cộng đồng."
      }
    ],
    "quiz": [
      {
        "id": "qz_soc_1",
        "question": "What is the academic phrase for a society with an increasing proportion of elderly people?",
        "options": [
          "An aging demographic",
          "An ancient populace",
          "A decaying crowd",
          "An antique generation"
        ],
        "correct": 0,
        "explanation": "'An aging demographic' là cách diễn đạt khoa học xã hội chuẩn xác nhất trong các bài luận IELTS."
      }
    ]
  },
  {
    "id": "economy",
    "name": "Economy, Business & Globalization",
    "vnName": "Kinh tế & Thương mại Toàn cầu",
    "icon": "trending-up",
    "words": [
      {
        "id": "eco_1",
        "term": "economic disparity",
        "type": "noun phrase",
        "ipa": "/ˌiː.kəˈnɒm.ɪk dɪˈspær.ə.ti/",
        "meaning": "Sự chênh lệch giàu nghèo / Phân hóa kinh tế",
        "example": "Progressive tax policies are frequently proposed as a mechanism to narrow widening economic disparity.",
        "paraphrase": "income inequality / wealth chasm",
        "collocation": "exacerbate / alleviate economic disparity"
      },
      {
        "id": "eco_2",
        "term": "fiscal stimulus",
        "type": "noun phrase",
        "ipa": "/ˈfɪs.kəl ˈstɪm.jə.ləs/",
        "meaning": "Gói kích thích tài khóa của chính phủ",
        "example": "During the downturn, central authorities injected significant fiscal stimulus into infrastructure projects.",
        "paraphrase": "governmental spending injection",
        "collocation": "implement a robust fiscal stimulus package"
      },
      {
        "id": "eco_3",
        "term": "consumerism",
        "type": "noun",
        "ipa": "/kənˈsjuː.mə.rɪ.zəm/",
        "meaning": "Chủ nghĩa tiêu dùng quá mức",
        "example": "Rampant consumerism in wealthy nations leads to unprecedented depletion of virgin natural resources.",
        "paraphrase": "materialistic culture / excessive consumption",
        "collocation": "fuel unbridled consumerism"
      }
    ],
    "flashcards": [
      {
        "front": "economic disparity",
        "back": "Khoảng cách chênh lệch kinh tế giàu nghèo.\nParaphrase: wealth inequality / income gap."
      },
      {
        "front": "consumerism",
        "back": "Lối sống tôn sùng mua sắm vật chất quá đà.\nParaphrase: hyper-materialism."
      }
    ],
    "matching": [
      {
        "pairId": 1,
        "left": "economic disparity",
        "right": "Chênh lệch phân hóa giàu nghèo"
      },
      {
        "pairId": 2,
        "left": "fiscal stimulus",
        "right": "Gói kích cầu tài khóa quốc gia"
      },
      {
        "pairId": 3,
        "left": "consumerism",
        "right": "Chủ nghĩa tiêu dùng vật chất"
      }
    ],
    "gapFill": [
      {
        "id": "gf_eco_1",
        "sentence": "Aggressive advertising targeted at impressionable teenagers tends to perpetuate relentless ________.",
        "answer": "consumerism",
        "options": [
          "consumerism",
          "austere living",
          "conservation",
          "frugality"
        ],
        "hint": "Chủ nghĩa chuộng mua sắm đồ đạc không ngừng nghỉ."
      }
    ],
    "quiz": [
      {
        "id": "qz_eco_1",
        "question": "Which phrase best paraphrases 'gap between rich and poor'?",
        "options": [
          "Economic disparity",
          "Financial fluctuation",
          "Monetary inflation",
          "Budget surplus"
        ],
        "correct": 0,
        "explanation": "'Economic disparity' (hoặc wealth gap) là cụm từ học thuật C1 chuẩn xác để thay thế cho cụm từ thông dụng."
      }
    ]
  },
  {
    "id": "culture",
    "name": "Culture, Heritage & Tourism",
    "vnName": "Văn hóa, Di sản & Du lịch",
    "icon": "landmark",
    "words": [
      {
        "id": "cul_1",
        "term": "cultural homogenisation",
        "type": "noun phrase",
        "ipa": "/ˈkʌl.tʃər.əl həˌmɒdʒ.ə.naɪˈzeɪ.ʃən/",
        "meaning": "Sự đồng nhất hóa văn hóa (mất đi bản sắc riêng)",
        "example": "Critics argue that globalization accelerates cultural homogenisation as Western media dominates local traditions.",
        "paraphrase": "loss of cultural diversity / standardization of customs",
        "collocation": "resist the pressure of cultural homogenisation"
      },
      {
        "id": "cul_2",
        "term": "intangible cultural heritage",
        "type": "noun phrase",
        "ipa": "/ɪnˈtæn.dʒə.bəl ˈkʌl.tʃər.əl ˈher.ɪ.tɪdʒ/",
        "meaning": "Di sản văn hóa phi vật thể (lễ hội, điệu múa, âm nhạc)",
        "example": "UNESCO strives to safeguard folklore and traditional oral poetry as intangible cultural heritage.",
        "paraphrase": "living traditions / indigenous customs",
        "collocation": "preserve and transmit intangible cultural heritage"
      },
      {
        "id": "cul_3",
        "term": "sustainable ecotourism",
        "type": "noun phrase",
        "ipa": "/səˈsteɪ.nə.bəl ˈiː.kəʊˌtʊə.rɪ.zəm/",
        "meaning": "Du lịch sinh thái bền vững có trách nhiệm",
        "example": "Developing sustainable ecotourism provides local indigenous tribes with viable livelihood alternatives.",
        "paraphrase": "environmentally conscious travel",
        "collocation": "champion sustainable ecotourism ventures"
      }
    ],
    "flashcards": [
      {
        "front": "cultural homogenisation",
        "back": "Sự đồng hóa văn hóa khiến mọi nơi trở nên giống nhau.\nParaphrase: cultural assimilation."
      },
      {
        "front": "intangible cultural heritage",
        "back": "Di sản văn hóa phi vật thể (nghệ thuật dân gian, lễ hội truyền thống)."
      }
    ],
    "matching": [
      {
        "pairId": 1,
        "left": "cultural homogenisation",
        "right": "Sự đồng nhất hóa đánh mất bản sắc riêng"
      },
      {
        "pairId": 2,
        "left": "intangible cultural heritage",
        "right": "Di sản văn hóa phi vật thể"
      },
      {
        "pairId": 3,
        "left": "sustainable ecotourism",
        "right": "Du lịch sinh thái có trách nhiệm bền vững"
      }
    ],
    "gapFill": [
      {
        "id": "gf_cul_1",
        "sentence": "The worldwide dominance of Hollywood cinema has raised grave concerns regarding cultural ________.",
        "answer": "homogenisation",
        "options": [
          "homogenisation",
          "pluralism",
          "revitalization",
          "isolation"
        ],
        "hint": "Hiện tượng các nền văn hóa địa phương bị mai một và rập khuôn theo một chuẩn chung."
      }
    ],
    "quiz": [
      {
        "id": "qz_cul_1",
        "question": "Which term describes traditions, craftsmanship, and performing arts passed down through generations?",
        "options": [
          "Intangible cultural heritage",
          "Concrete monument",
          "Commercial merchandise",
          "Temporary fad"
        ],
        "correct": 0,
        "explanation": "'Intangible cultural heritage' (Di sản văn hóa phi vật thể) là thuật ngữ chính thức của UNESCO dùng cho các phong tục, tri thức bản địa."
      }
    ]
  },
  {
    "id": "history",
    "name": "History & Archaeology",
    "vnName": "Lịch sử & Khảo cổ học",
    "icon": "hourglass",
    "words": [
      {
        "id": "his_1",
        "term": "archaeological excavation",
        "type": "noun phrase",
        "ipa": "/ˌɑː.ki.əˈlɒdʒ.ɪ.kəl ˌek.skəˈveɪ.ʃən/",
        "meaning": "Cuộc khai quật khảo cổ học",
        "example": "Recent archaeological excavation in the Nile delta unearthed remarkably intact pottery from the Bronze Age.",
        "paraphrase": "historical unearthing / antiquities dig",
        "collocation": "conduct an extensive archaeological excavation"
      },
      {
        "id": "his_2",
        "term": "historical revisionism",
        "type": "noun phrase",
        "ipa": "/hɪˈstɒr.ɪ.kəl rɪˈvɪʒ.ən.ɪ.zəm/",
        "meaning": "Quan điểm xét lại lịch sử (đánh giá lại bằng bằng chứng mới)",
        "example": "Scientific carbon dating often triggers historical revisionism regarding when ancient settlements truly thrived.",
        "paraphrase": "reinterpretation of past chronicles",
        "collocation": "prompt healthy historical revisionism"
      }
    ],
    "flashcards": [
      {
        "front": "archaeological excavation",
        "back": "Cuộc khai quật tìm kiếm cổ vật.\nParaphrase: scholarly dig / unearthing relics."
      }
    ],
    "matching": [
      {
        "pairId": 1,
        "left": "archaeological excavation",
        "right": "Hoạt động khai quật khảo cổ"
      },
      {
        "pairId": 2,
        "left": "historical revisionism",
        "right": "Sự nhìn nhận và xét lại lịch sử"
      }
    ],
    "gapFill": [
      {
        "id": "gf_his_1",
        "sentence": "A major archaeological ________ was launched near the temple ruins to uncover ancient burial chambers.",
        "answer": "excavation",
        "options": [
          "excavation",
          "demolition",
          "fabrication",
          "simulation"
        ],
        "hint": "Từ chỉ hành động đào bới khoa học để phát hiện di vật cổ xưa."
      }
    ],
    "quiz": [
      {
        "id": "qz_his_1",
        "question": "What is the proper academic word for digging up historical relics?",
        "options": [
          "Archaeological excavation",
          "Garden ploughing",
          "Ground piercing",
          "Earth piercing"
        ],
        "correct": 0,
        "explanation": "'Archaeological excavation' là thuật ngữ khảo cổ học chuẩn mực."
      }
    ]
  },
  {
    "id": "science",
    "name": "Science & Space Exploration",
    "vnName": "Khoa học & Thám hiểm Vũ trụ",
    "icon": "atom",
    "words": [
      {
        "id": "sci_1",
        "term": "empirical evidence",
        "type": "noun phrase",
        "ipa": "/ɪmˈpɪr.ɪ.kəl ˈev.ɪ.dəns/",
        "meaning": "Bằng chứng thực nghiệm (thu được qua quan sát, đo đạc)",
        "example": "A scientific hypothesis must be corroborated by robust empirical evidence prior to academic publication.",
        "paraphrase": "verifiable data / observational findings",
        "collocation": "furnish compelling empirical evidence"
      },
      {
        "id": "sci_2",
        "term": "extraterrestrial exploration",
        "type": "noun phrase",
        "ipa": "/ˌek.strə.təˈres.tri.əl ˌek.spləˈreɪ.ʃən/",
        "meaning": "Thám hiểm không gian ngoài trái đất",
        "example": "Substantial budgetary allocations for extraterrestrial exploration stir fierce political debates.",
        "paraphrase": "deep space mission / interplanetary probing",
        "collocation": "pioneer deep extraterrestrial exploration"
      }
    ],
    "flashcards": [
      {
        "front": "empirical evidence",
        "back": "Bằng chứng thực nghiệm có thể chứng minh được.\nParaphrase: objective scientific proof."
      }
    ],
    "matching": [
      {
        "pairId": 1,
        "left": "empirical evidence",
        "right": "Bằng chứng thu được từ thực nghiệm"
      },
      {
        "pairId": 2,
        "left": "extraterrestrial exploration",
        "right": "Thám hiểm không gian ngoài Trái Đất"
      }
    ],
    "gapFill": [
      {
        "id": "gf_sci_1",
        "sentence": "Without peer-reviewed ________ evidence, speculative assertions cannot be accepted into medical journals.",
        "answer": "empirical",
        "options": [
          "empirical",
          "anecdotal",
          "arbitrary",
          "intuitive"
        ],
        "hint": "Tính từ chỉ bằng chứng có được từ thí nghiệm và quan sát thực tế."
      }
    ],
    "quiz": [
      {
        "id": "qz_sci_1",
        "question": "Which phrase describes scientific facts collected via objective measurements?",
        "options": [
          "Empirical evidence",
          "Emotional instinct",
          "Superstitious omen",
          "Hearsay rumor"
        ],
        "correct": 0,
        "explanation": "'Empirical evidence' đại diện cho nền tảng phương pháp luận khoa học phương Tây."
      }
    ]
  },
  {
    "id": "crime",
    "name": "Crime, Law & Rehabilitation",
    "vnName": "Tội phạm & Hệ thống Pháp luật",
    "icon": "shield-alert",
    "words": [
      {
        "id": "cri_1",
        "term": "penal reform",
        "type": "noun phrase",
        "ipa": "/ˈpiː.nəl rɪˈfɔːm/",
        "meaning": "Cải cách hệ thống trại giam / Hình phạt",
        "example": "Advocates of penal reform contend that vocational training reduces recidivism rates far more effectively than punitive incarceration.",
        "paraphrase": "prison system modernization / correctional overhaul",
        "collocation": "champion humane penal reform"
      },
      {
        "id": "cri_2",
        "term": "recidivism rate",
        "type": "noun phrase",
        "ipa": "/rɪˈsɪd.ɪ.vɪ.zəm reɪt/",
        "meaning": "Tỷ lệ tái phạm tội",
        "example": "Societies that emphasize inmate rehabilitation enjoy significantly lower recidivism rates.",
        "paraphrase": "reoffending frequency / rate of relapse into criminal activity",
        "collocation": "curb the spiraling recidivism rate"
      },
      {
        "id": "cri_3",
        "term": "deterrent effect",
        "type": "noun phrase",
        "ipa": "/dɪˈter.ənt ɪˈfekt/",
        "meaning": "Tác dụng răn đe, ngăn ngừa tội phạm",
        "example": "Criminologists question whether harsh mandatory sentencing genuinely produces a measurable deterrent effect.",
        "paraphrase": "disincentive against misconduct / preventative impact",
        "collocation": "exert a potent deterrent effect on would-be offenders"
      }
    ],
    "flashcards": [
      {
        "front": "recidivism rate",
        "back": "Tỷ lệ tái phạm tội của cựu tù nhân.\nParaphrase: reoffending rate."
      },
      {
        "front": "deterrent effect",
        "back": "Hiệu quả răn đe, ngăn ngừa hành vi vi phạm.\nParaphrase: discouraging influence."
      }
    ],
    "matching": [
      {
        "pairId": 1,
        "left": "penal reform",
        "right": "Cải cách chế độ hình sự và trại giam"
      },
      {
        "pairId": 2,
        "left": "recidivism rate",
        "right": "Tỷ lệ tái phạm tội trở lại"
      },
      {
        "pairId": 3,
        "left": "deterrent effect",
        "right": "Tác dụng cảnh báo và răn đe"
      }
    ],
    "gapFill": [
      {
        "id": "gf_cri_1",
        "sentence": "By equipping inmates with professional trade skills, correctional facilities succeed in lowering the ________ rate.",
        "answer": "recidivism",
        "options": [
          "recidivism",
          "literacy",
          "inflation",
          "mortality"
        ],
        "hint": "Tỷ lệ người mãn hạn tù lại tiếp tục vi phạm pháp luật."
      }
    ],
    "quiz": [
      {
        "id": "qz_cri_1",
        "question": "What is the C1 collocation for the preventative power of strict laws?",
        "options": [
          "Deterrent effect",
          "Scary feeling",
          "Threatening power",
          "Frightening blow"
        ],
        "correct": 0,
        "explanation": "'Deterrent effect' là thuật ngữ pháp lý và xã hội học chỉ tác dụng răn đe ngừa tội phạm."
      }
    ]
  },
  {
    "id": "media",
    "name": "Media, Information & Advertising",
    "vnName": "Truyền thông & Kỷ nguyên Số",
    "icon": "radio",
    "words": [
      {
        "id": "med_1",
        "term": "sensationalist journalism",
        "type": "noun phrase",
        "ipa": "/senˈseɪ.ʃən.əl.ɪst ˈdʒɜː.nə.lɪ.zəm/",
        "meaning": "Báo chí lá cải, giật gân câu view",
        "example": "The proliferation of digital clickbait has given rise to sensationalist journalism that distorts factual reality.",
        "paraphrase": "yellow press / tabloid drama",
        "collocation": "condemn the excesses of sensationalist journalism"
      },
      {
        "id": "med_2",
        "term": "information echo chamber",
        "type": "noun phrase",
        "ipa": "/ˌɪn.fəˈmeɪ.ʃən ˈek.əʊ ˌtʃeɪm.bər/",
        "meaning": "Phòng vang thông tin (thuật toán chỉ gợi ý điều người xem tin)",
        "example": "Social media recommendation algorithms trap users inside an information echo chamber, polarizing public discourse.",
        "paraphrase": "filter bubble / self-reinforcing bias circle",
        "collocation": "break free from an insular information echo chamber"
      }
    ],
    "flashcards": [
      {
        "front": "sensationalist journalism",
        "back": "Báo chí giật gân, phóng đại tin tức để câu view.\nParaphrase: tabloid sensationalism."
      },
      {
        "front": "information echo chamber",
        "back": "Hiện tượng buồng vang thông tin trên mạng xã hội."
      }
    ],
    "matching": [
      {
        "pairId": 1,
        "left": "sensationalist journalism",
        "right": "Báo chí lá cải giật gân câu khách"
      },
      {
        "pairId": 2,
        "left": "information echo chamber",
        "right": "Buồng vang thông tin khép kín trên mạng"
      }
    ],
    "gapFill": [
      {
        "id": "gf_med_1",
        "sentence": "By filtering out dissenting viewpoints, algorithmic news feeds trap individuals within an ideological echo ________.",
        "answer": "chamber",
        "options": [
          "chamber",
          "tunnel",
          "labyrinth",
          "corridor"
        ],
        "hint": "Cụm từ ẩn dụ chỉ căn phòng có tiếng vọng dội lại những điều bạn muốn nghe."
      }
    ],
    "quiz": [
      {
        "id": "qz_med_1",
        "question": "What is the phrase for sensational, exaggerated reporting designed purely for clicks?",
        "options": [
          "Sensationalist journalism",
          "Rigorous investigative reporting",
          "Academic peer review",
          "Objective chronicle"
        ],
        "correct": 0,
        "explanation": "'Sensationalist journalism' phê phán cách làm báo câu view thổi phồng sự thật."
      }
    ]
  },
  {
    "id": "work",
    "name": "Work, Career & Automation",
    "vnName": "Việc làm & Tự động hóa",
    "icon": "briefcase",
    "words": [
      {
        "id": "wor_1",
        "term": "workplace automation",
        "type": "noun phrase",
        "ipa": "/ˈwɜːk.pleɪs ˌɔː.təˈmeɪ.ʃən/",
        "meaning": "Tự động hóa nơi làm việc bằng robot/AI",
        "example": "Rapid workplace automation renders routine manual and clerical tasks obsolete.",
        "paraphrase": "mechanization of labour / robotics integration",
        "collocation": "mitigate job displacement triggered by workplace automation"
      },
      {
        "id": "wor_2",
        "term": "work-life equilibrium",
        "type": "noun phrase",
        "ipa": "/ˌwɜːk.laɪf ˌek.wɪˈlɪb.ri.əm/",
        "meaning": "Sự cân bằng hài hòa giữa công việc và cuộc sống",
        "example": "Flexible telecommuting arrangements empower professionals to achieve a healthier work-life equilibrium.",
        "paraphrase": "work-life balance / professional-personal harmony",
        "collocation": "strike / jeopardize a healthy work-life equilibrium"
      },
      {
        "id": "wor_3",
        "term": "vocational reskilling",
        "type": "noun phrase",
        "ipa": "/vəʊˈkeɪ.ʃən.əl ˌriːˈskɪl.ɪŋ/",
        "meaning": "Đào tạo lại kỹ năng nghề nghiệp thích ứng thời đại mới",
        "example": "Governments must sponsor vocational reskilling programs so displaced factory staff can transition into tech sectors.",
        "paraphrase": "workforce retraining / skill upgrading",
        "collocation": "participate in ongoing vocational reskilling"
      }
    ],
    "flashcards": [
      {
        "front": "work-life equilibrium",
        "back": "Sự cân bằng bền vững giữa công việc và đời sống cá nhân.\nParaphrase: optimal work-life balance."
      },
      {
        "front": "vocational reskilling",
        "back": "Đào tạo lại chuyên môn nghề nghiệp để bắt kịp công nghệ mới.\nParaphrase: professional retraining."
      }
    ],
    "matching": [
      {
        "pairId": 1,
        "left": "workplace automation",
        "right": "Tự động hóa quy trình tại công sở"
      },
      {
        "pairId": 2,
        "left": "work-life equilibrium",
        "right": "Sự cân bằng công việc và đời sống"
      },
      {
        "pairId": 3,
        "left": "vocational reskilling",
        "right": "Đào tạo lại kỹ năng tay nghề cho người lao động"
      }
    ],
    "gapFill": [
      {
        "id": "gf_wor_1",
        "sentence": "Long-term economic viability hinges on providing employees with continuous opportunities for vocational ________.",
        "answer": "reskilling",
        "options": [
          "reskilling",
          "stagnation",
          "dismissal",
          "resignation"
        ],
        "hint": "Quá trình đào tạo lại để người lao động không bị lạc hậu trước máy móc tự động."
      }
    ],
    "quiz": [
      {
        "id": "qz_wor_1",
        "question": "Which C1 phrase is an elegant synonym for 'work-life balance'?",
        "options": [
          "Work-life equilibrium",
          "Office-home division",
          "Job-family compromise",
          "Labor-rest split"
        ],
        "correct": 0,
        "explanation": "'Work-life equilibrium' mang tính học thuật cao và được khuyến khích dùng trong IELTS Writing/Speaking Band 7.0+."
      }
    ]
  }
];

if (typeof window !== "undefined") window.IELTS_VOCAB_TOPICS = IELTS_VOCAB_TOPICS;
