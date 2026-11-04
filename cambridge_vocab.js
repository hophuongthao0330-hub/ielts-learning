// cambridge_vocab.js - Kho Từ Vựng Học Thuật Cốt Lõi Trích Xuất Trực Tiếp Từ Bộ Sách Cambridge IELTS 10 - 19

const CAMBRIDGE_VOCAB_BANK = [
  // 1. Environment & Marine Ecology
  {
    id: "vocab_env_1",
    word: "Sequestration",
    type: "noun",
    ipa: "/ˌsiː.kwesˈtreɪ.ʃən/",
    meaning: "Sự cô lập, giữ lại, hấp thụ (carbon) vào lòng đất/đại dương",
    collocation: "Carbon sequestration capacity / marine sequestration",
    example: "Coastal wetlands possess an extraordinary capacity for carbon sequestration, mitigating climate change.",
    camSource: "Cambridge IELTS 16 - Test 3 Passage 2",
    theme: "environment"
  },
  {
    id: "vocab_env_2",
    word: "Mitigate",
    type: "verb",
    ipa: "/ˈmɪt.ɪ.ɡeɪt/",
    meaning: "Làm giảm nhẹ, giảm bớt tác động tiêu cực hoặc hiểm họa",
    collocation: "Mitigate the catastrophic impacts / mitigate environmental degradation",
    example: "Mangrove forests substantially mitigate the damage caused by tsunami storm surges.",
    camSource: "Cambridge IELTS 13 - Test 2 Passage 1",
    theme: "environment"
  },
  {
    id: "vocab_env_3",
    word: "Anthropogenic",
    type: "adjective",
    ipa: "/ˌæn.θrə.pəˈdʒen.ɪk/",
    meaning: "Có nguồn gốc do con người gây ra (đặc biệt là ô nhiễm và biến đổi khí hậu)",
    collocation: "Anthropogenic emissions / anthropogenic activities",
    example: "Anthropogenic greenhouse gas emissions constitute the primary catalyst of global temperature rise.",
    camSource: "Cambridge IELTS 15 - Test 4 Passage 3",
    theme: "environment"
  },
  {
    id: "vocab_env_4",
    word: "Depletion",
    type: "noun",
    ipa: "/dɪˈpliː.ʃən/",
    meaning: "Sự suy kiệt, cạn kiệt (tài nguyên thiên nhiên, tầng ozone)",
    collocation: "Ozone depletion / groundwater depletion / resource depletion",
    example: "Unregulated industrial agriculture has precipitated the alarming depletion of underground aquifers.",
    camSource: "Cambridge IELTS 12 - Test 1 Passage 2",
    theme: "environment"
  },

  // 2. Science, Technology & AI
  {
    id: "vocab_tech_1",
    word: "Ubiquitous",
    type: "adjective",
    ipa: "/juːˈbɪk.wə.təs/",
    meaning: "Phổ biến ở khắp mọi nơi, hiện diện khắp chốn",
    collocation: "Become ubiquitous in daily life / ubiquitous computing",
    example: "Smartphones have become utterly ubiquitous, altering how adolescents interact socially.",
    camSource: "Cambridge IELTS 14 - Test 1 Passage 1",
    theme: "technology"
  },
  {
    id: "vocab_tech_2",
    word: "Autonomous",
    type: "adjective",
    ipa: "/ɔːˈtɒn.ə.məs/",
    meaning: "Tự hành, tự chủ, không cần người điều khiển trực tiếp",
    collocation: "Autonomous vehicles / autonomous diagnostic algorithms",
    example: "The implementation of autonomous navigation systems substantially decreases human error in aviation.",
    camSource: "Cambridge IELTS 16 - Test 1 Passage 2",
    theme: "technology"
  },
  {
    id: "vocab_tech_3",
    word: "Algorithm",
    type: "noun",
    ipa: "/ˈæl.ɡə.rɪ.ðəm/",
    meaning: "Thuật toán xử lý dữ liệu và ra quyết định",
    collocation: "Predictive algorithms / algorithmic bias / machine learning algorithms",
    example: "Predictive algorithms trained on medical scans detect microscopic abnormalities months ahead of human clinicians.",
    camSource: "Cambridge IELTS 18 - Test 2 Passage 3",
    theme: "technology"
  },
  {
    id: "vocab_tech_4",
    word: "Precipitate",
    type: "verb",
    ipa: "/prɪˈsɪp.ɪ.teɪt/",
    meaning: "Thúc đẩy, làm cho một sự việc (thường là tiêu cực) xảy ra nhanh chóng và đột ngột",
    collocation: "Precipitate an acute crisis / precipitate profound alienation",
    example: "Unmoderated social media fixation can precipitate profound social alienation among teenagers.",
    camSource: "Cambridge IELTS 17 - Test 3 Passage 2",
    theme: "technology"
  },

  // 3. History & Architecture
  {
    id: "vocab_hist_1",
    word: "Colossal",
    type: "adjective",
    ipa: "/kəˈlɒs.əl/",
    meaning: "Khổng lồ, đồ sộ, kỳ vĩ (thường dùng cho công trình kiến trúc)",
    collocation: "Colossal monument / colossal amphitheatre / colossal undertaking",
    example: "The colossal Roman amphitheatre was designed to accommodate up to eighty thousand spectators.",
    camSource: "Cambridge IELTS 10 - Test 1 Passage 1",
    theme: "history"
  },
  {
    id: "vocab_hist_2",
    word: "Decipher",
    type: "verb",
    ipa: "/dɪˈsaɪ.fər/",
    meaning: "Giải mã, đọc hiểu những ký tự hoặc quy luật cổ xưa phức tạp",
    collocation: "Decipher ancient hieroglyphs / decipher the code",
    example: "Biologists eventually deciphered the intricate navigational dances performed by forager bees.",
    camSource: "Cambridge IELTS 11 - Test 3 Passage 3",
    theme: "history"
  },
  {
    id: "vocab_hist_3",
    word: "Enduring",
    type: "adjective",
    ipa: "/ɪnˈdʒʊə.rɪŋ/",
    meaning: "Tồn tại bền vững qua thử thách của thời gian",
    collocation: "Enduring legacy / enduring monument / enduring symbol",
    example: "Roman concrete structures remain an enduring testament to ancient civil engineering prowess.",
    camSource: "Cambridge IELTS 12 - Test 4 Passage 1",
    theme: "history"
  },

  // 4. Healthcare & Biology
  {
    id: "vocab_health_1",
    word: "Detrimental",
    type: "adjective",
    ipa: "/ˌdet.rɪˈmen.təl/",
    meaning: "Gây tổn hại, có hại sâu sắc (Nâng cấp từ 'harmful / bad')",
    collocation: "Exert a detrimental repercussion on / detrimental to public health",
    example: "Chronic sleep deprivation exerts deeply detrimental effects on cognitive recall and emotional stability.",
    camSource: "Cambridge IELTS 15 - Test 2 Passage 1",
    theme: "health"
  },
  {
    id: "vocab_health_2",
    word: "Sedentary",
    type: "adjective",
    ipa: "/ˈsed.ən.tər.i/",
    meaning: "Thụ động, ít vận động, ngồi một chỗ nhiều giờ",
    collocation: "Sedentary lifestyle / sedentary habits / sedentary office workers",
    example: "Adopting a sedentary lifestyle dramatically escalates cardiovascular disease vulnerability.",
    camSource: "Cambridge IELTS 13 - Test 4 Passage 2",
    theme: "health"
  },
  {
    id: "vocab_health_3",
    word: "Bioluminescence",
    type: "noun",
    ipa: "/ˌbaɪ.əʊˌluː.mɪˈnes.əns/",
    meaning: "Hiện tượng phát quang sinh học (sinh vật tự phát sáng)",
    collocation: "Marine bioluminescence / bioluminescent organisms",
    example: "Deep-sea creatures exploit bioluminescence for prey attraction, defense camouflage, and communication.",
    camSource: "Cambridge IELTS 16 - Test 2 Passage 3",
    theme: "health"
  },

  // 5. Education & Psychology
  {
    id: "vocab_edu_1",
    word: "Cognitive",
    type: "adjective",
    ipa: "/ˈkɒɡ.nə.tɪv/",
    meaning: "Thuộc về nhận thức, tư duy và khả năng ghi nhớ của não bộ",
    collocation: "Cognitive faculties / cognitive decline / cognitive development",
    example: "Bilingual education significantly enhances cognitive flexibility and problem-solving agility in children.",
    camSource: "Cambridge IELTS 11 - Test 2 Passage 2",
    theme: "education"
  },
  {
    id: "vocab_edu_2",
    word: "Indispensable",
    type: "adjective",
    ipa: "/ˌɪn.dɪˈspen.sə.bəl/",
    meaning: "Không thể thiếu được, thiết yếu sống còn",
    collocation: "Play an indispensable role / an indispensable prerequisite",
    example: "Self-discipline and regular spaced repetition are indispensable prerequisites for IELTS 7.0 mastery.",
    camSource: "Cambridge IELTS 14 - Test 3 Passage 1",
    theme: "education"
  },
  {
    id: "vocab_edu_3",
    word: "Impediment",
    type: "noun",
    ipa: "/ɪmˈped.ɪ.mənt/",
    meaning: "Trở ngại, chướng ngại vật cản trở bước tiến",
    collocation: "A major impediment to progress / overcome serious impediments",
    example: "Financial constraints frequently constitute a formidable impediment to tertiary education access.",
    camSource: "Cambridge IELTS 17 - Test 1 Passage 1",
    theme: "education"
  },

  // 6. Society & Urbanization
  {
    id: "vocab_soc_1",
    word: "Infrastructure",
    type: "noun",
    ipa: "/ˈɪn.frəˌstrʌk.tʃər/",
    meaning: "Cơ sở hạ tầng (cầu đường, mạng lưới giao thông, cấp thoát nước)",
    collocation: "Public transport infrastructure / aging municipal infrastructure",
    example: "Investing in sustainable public transit infrastructure alleviates inner-city traffic bottlenecks.",
    camSource: "Cambridge IELTS 18 - Test 1 Passage 2",
    theme: "society"
  },
  {
    id: "vocab_soc_2",
    word: "Congestion",
    type: "noun",
    ipa: "/kənˈdʒes.tʃən/",
    meaning: "Sự tắc nghẽn, kẹt xe, quá tải",
    collocation: "Traffic congestion / severe gridlock and congestion",
    example: "Urban planners introduced congestion charging zones to curb vehicular gridlock in central London.",
    camSource: "Cambridge IELTS 10 - Test 3 Passage 2",
    theme: "society"
  },
  {
    id: "vocab_soc_3",
    word: "Stratification",
    type: "noun",
    ipa: "/ˌstræt.ɪ.fɪˈkeɪ.ʃən/",
    meaning: "Sự phân tầng xã hội, phân chia giai cấp",
    collocation: "Social stratification / hierarchical stratification",
    example: "Seating arrangements in ancient amphitheaters strictly reflected the hierarchical stratifications of Roman society.",
    camSource: "Cambridge IELTS 10 - Test 1 Passage 1",
    theme: "society"
  }
];
