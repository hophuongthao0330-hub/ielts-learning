// cambridge_master_library.js - Thư Viện Khảo Thí & Kho Dữ Liệu Cambridge IELTS Toàn Tập (Cam 10 - 21)
// Tích Hợp Toàn Bộ Sách PDF Gốc & Toàn Bộ Audio Gốc Sẵn Có Trong Thư Mục

const CAMBRIDGE_MASTER_CATALOG = [
  {
    id: "cam_21",
    bookNum: 21,
    title: "Cambridge IELTS 21 (Academic - Bản Mới Nhất 2026)",
    year: "2026",
    badge: "Mới Nhất 2026",
    color: "rose",
    pdfPath: "Cam/OneDrive_1_11-1-2026/Cambridge IELTS 21.pdf",
    coverImg: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
    description: "Bộ đề khảo thí mới nhất cập nhật định dạng thi IELTS 2026 với 4 Full Tests Listening & Reading.",
    audios: [
      { name: "Test 1 Full Audio", duration: "32:15", path: "Cam/OneDrive_1_11-1-2026/Cambridge IELTS 21 Audio/Cambridge 21 - Test 1.mp3" },
      { name: "Test 2 Full Audio", duration: "31:40", path: "Cam/OneDrive_1_11-1-2026/Cambridge IELTS 21 Audio/Cambridge 21 - Test 2.mp3" },
      { name: "Test 3 Full Audio", duration: "33:02", path: "Cam/OneDrive_1_11-1-2026/Cambridge IELTS 21 Audio/Cambridge 21 - Test 3.mp3" },
      { name: "Test 4 Full Audio", duration: "30:55", path: "Cam/OneDrive_1_11-1-2026/Cambridge IELTS 21 Audio/Cambridge 21 - Test 4.mp3" }
    ]
  },
  {
    id: "cam_19",
    bookNum: 19,
    title: "Cambridge IELTS 19 (Academic)",
    year: "2024",
    badge: "Hot 2024",
    color: "purple",
    pdfPath: "Cam/Cambridge-ielts-19/CAMBRIDGE 19/Cambridge 19.pdf",
    coverImg: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80",
    description: "Bộ đề sát đề thi thật nhất hiện nay với các chủ đề AI, môi trường và nghiên cứu xã hội học.",
    audios: [
      { name: "Test 1 - Part 1", duration: "07:30", path: "Cam/Cambridge-ielts-19/audio/Test1 Part1.mp3" },
      { name: "Test 1 - Part 2", duration: "06:45", path: "Cam/Cambridge-ielts-19/audio/Test1 Part2.mp3" },
      { name: "Test 1 - Part 3", duration: "07:10", path: "Cam/Cambridge-ielts-19/audio/Test1 Part3.mp3" },
      { name: "Test 1 - Part 4", duration: "06:50", path: "Cam/Cambridge-ielts-19/audio/Test1 Part4.mp3" },
      { name: "Test 2 - Part 1", duration: "07:40", path: "Cam/Cambridge-ielts-19/audio/Test2 Part1.mp3" },
      { name: "Test 2 - Part 2", duration: "06:15", path: "Cam/Cambridge-ielts-19/audio/Test2 Part2.mp3" },
      { name: "Test 2 - Part 3", duration: "06:55", path: "Cam/Cambridge-ielts-19/audio/Test2 Part3.mp3" },
      { name: "Test 2 - Part 4", duration: "06:50", path: "Cam/Cambridge-ielts-19/audio/Test2 Part4.mp3" },
      { name: "Test 3 - Part 1", duration: "06:20", path: "Cam/Cambridge-ielts-19/audio/Test3 Part1.mp3" },
      { name: "Test 3 - Part 2", duration: "06:00", path: "Cam/Cambridge-ielts-19/audio/Test3 Part2.mp3" },
      { name: "Test 3 - Part 3", duration: "06:45", path: "Cam/Cambridge-ielts-19/audio/Test3 Part3.mp3" },
      { name: "Test 3 - Part 4", duration: "06:35", path: "Cam/Cambridge-ielts-19/audio/Test3 Part4.mp3" },
      { name: "Test 4 - Part 1", duration: "06:30", path: "Cam/Cambridge-ielts-19/audio/Test4 Part1.mp3" },
      { name: "Test 4 - Part 2", duration: "06:15", path: "Cam/Cambridge-ielts-19/audio/Test4 Part2.mp3" },
      { name: "Test 4 - Part 3", duration: "06:50", path: "Cam/Cambridge-ielts-19/audio/Test4 Part3.mp3" },
      { name: "Test 4 - Part 4", duration: "08:15", path: "Cam/Cambridge-ielts-19/audio/Test4 Part4.mp3" }
    ]
  },
  {
    id: "cam_18",
    bookNum: 18,
    title: "Cambridge IELTS 18 (Academic)",
    year: "2023",
    badge: "Chuẩn Format",
    color: "indigo",
    pdfPath: "Cam/Cambridge-ielts-18/CAMBRIDGE 18/Cambridge 18.pdf",
    coverImg: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80",
    description: "Bộ đề rèn luyện kỹ năng nghe đối thoại Section 3 và kỹ năng đọc hiểu bài đọc khoa học chuyên sâu.",
    audios: [
      { name: "Test 1 - Part 1", duration: "06:54", path: "Cam/Cambridge-ielts-18/audio/18 section1-part1.mp3" },
      { name: "Test 1 - Part 2", duration: "06:22", path: "Cam/Cambridge-ielts-18/audio/18 section1-part2.mp3" },
      { name: "Test 1 - Part 3", duration: "06:25", path: "Cam/Cambridge-ielts-18/audio/18 section1-part3.mp3" },
      { name: "Test 1 - Part 4", duration: "08:26", path: "Cam/Cambridge-ielts-18/audio/18 section1-part4.mp3" },
      { name: "Test 2 - Part 1", duration: "07:30", path: "Cam/Cambridge-ielts-18/audio/18 section2-part1.mp3" },
      { name: "Test 2 - Part 2", duration: "06:59", path: "Cam/Cambridge-ielts-18/audio/18 section2-part2.mp3" },
      { name: "Test 2 - Part 3", duration: "06:50", path: "Cam/Cambridge-ielts-18/audio/18 section2- part3.mp3" },
      { name: "Test 2 - Part 4", duration: "06:48", path: "Cam/Cambridge-ielts-18/audio/18 section2- part4.mp3" },
      { name: "Test 3 - Part 1", duration: "07:32", path: "Cam/Cambridge-ielts-18/audio/18 section3 part1.mp3" },
      { name: "Test 3 - Part 2", duration: "07:28", path: "Cam/Cambridge-ielts-18/audio/18 section3 part2.mp3" },
      { name: "Test 3 - Part 3", duration: "05:41", path: "Cam/Cambridge-ielts-18/audio/18 section3 part3.mp3" },
      { name: "Test 3 - Part 4", duration: "07:21", path: "Cam/Cambridge-ielts-18/audio/18 section3 part4.mp3" },
      { name: "Test 4 - Part 1", duration: "07:05", path: "Cam/Cambridge-ielts-18/audio/18 section4 part1.mp3" },
      { name: "Test 4 - Part 2", duration: "06:58", path: "Cam/Cambridge-ielts-18/audio/18 section4 part2.mp3" },
      { name: "Test 4 - Part 3", duration: "06:41", path: "Cam/Cambridge-ielts-18/audio/18 section4 part3.mp3" },
      { name: "Test 4 - Part 4", duration: "07:57", path: "Cam/Cambridge-ielts-18/audio/18 section4 part4.mp3" }
    ]
  },
  {
    id: "cam_17",
    bookNum: 17,
    title: "Cambridge IELTS 17 (Academic)",
    year: "2022",
    badge: "Chiến Lược Cốt Lõi",
    color: "blue",
    pdfPath: "Cam/Cambridge-ielts-17/CAMBRIDGE 17/Cambridge Ielts 17.pdf",
    coverImg: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
    description: "Bộ đề kinh điển rèn luyện dạng bài bản đồ Map và Matching Headings.",
    audios: [
      { name: "Test 1 - Audio 1 (Part 1)", duration: "06:38", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t1_audio1.mp3" },
      { name: "Test 1 - Audio 2 (Part 2)", duration: "06:36", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t1_audio2.mp3" },
      { name: "Test 1 - Audio 3 (Part 3)", duration: "07:05", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t1_audio3.mp3" },
      { name: "Test 1 - Audio 4 (Part 4)", duration: "07:16", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t1_audio4.mp3" },
      { name: "Test 2 - Audio 1 (Part 1)", duration: "07:34", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t2_audio1.mp3" },
      { name: "Test 2 - Audio 2 (Part 2)", duration: "07:06", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t2_audio2.mp3" },
      { name: "Test 2 - Audio 3 (Part 3)", duration: "06:25", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t2_audio3.mp3" },
      { name: "Test 2 - Audio 4 (Part 4)", duration: "06:56", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t2_audio4.mp3" },
      { name: "Test 3 - Audio 1 (Part 1)", duration: "06:38", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t3_audio1.mp3" },
      { name: "Test 3 - Audio 2 (Part 2)", duration: "07:11", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t3_audio2.mp3" },
      { name: "Test 3 - Audio 3 (Part 3)", duration: "07:13", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t3_audio3.mp3" },
      { name: "Test 3 - Audio 4 (Part 4)", duration: "07:46", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t3_audio4.mp3" },
      { name: "Test 4 - Audio 1 (Part 1)", duration: "06:07", path: "Cam/Cambridge-ielts-17/audio/IELTS17_t4_audio1.mp3" },
      { name: "Test 4 - Audio 2 (Part 2)", duration: "07:32", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t4_audio2.mp3" },
      { name: "Test 4 - Audio 3 (Part 3)", duration: "06:34", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t4_audio3.mp3" },
      { name: "Test 4 - Audio 4 (Part 4)", duration: "08:14", path: "Cam/Cambridge-ielts-17/audio/ELT_IELTS17_t4_audio4.mp3" }
    ]
  },
  {
    id: "cam_16",
    bookNum: 16,
    title: "Cambridge IELTS 16 (Academic)",
    year: "2021",
    badge: "Audio Studio WAV",
    color: "teal",
    pdfPath: "Cam/Cam16/16_academic.pdf",
    coverImg: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=80",
    description: "Đầy đủ 16 file âm thanh gốc chuẩn phòng thu (Studio Master WAV) cho 4 bài thi.",
    audios: [
      { name: "Test 1 - Part 1", duration: "07:05", path: "Cam/Cam16/audio/Test 1 Part 1.wav" },
      { name: "Test 1 - Part 2", duration: "06:58", path: "Cam/Cam16/audio/Test 1 Part 2.wav" },
      { name: "Test 1 - Part 3", duration: "06:42", path: "Cam/Cam16/audio/Test 1 Part 3.wav" },
      { name: "Test 1 - Part 4", duration: "08:26", path: "Cam/Cam16/audio/Test 1 Part 4.wav" },
      { name: "Test 2 - Part 1", duration: "06:38", path: "Cam/Cam16/audio/Test 2 Part 1.wav" },
      { name: "Test 2 - Part 2", duration: "07:44", path: "Cam/Cam16/audio/Test 2 Part 2.wav" },
      { name: "Test 2 - Part 3", duration: "06:57", path: "Cam/Cam16/audio/Test 2 Part 3.wav" },
      { name: "Test 2 - Part 4", duration: "08:46", path: "Cam/Cam16/audio/Test 2 Part 4.wav" },
      { name: "Test 3 - Part 1", duration: "08:13", path: "Cam/Cam16/audio/Test 3 Part 1.wav" },
      { name: "Test 3 - Part 2", duration: "06:48", path: "Cam/Cam16/audio/Test 3 Part 2.wav" },
      { name: "Test 3 - Part 3", duration: "06:51", path: "Cam/Cam16/audio/Test 3 Part 3.wav" },
      { name: "Test 3 - Part 4", duration: "08:35", path: "Cam/Cam16/audio/Test 3 Part 4.wav" },
      { name: "Test 4 - Part 1", duration: "07:06", path: "Cam/Cam16/audio/Test 4 Part 1.wav" },
      { name: "Test 4 - Part 2", duration: "06:25", path: "Cam/Cam16/audio/Test 4 Part 2.wav" },
      { name: "Test 4 - Part 3", duration: "06:48", path: "Cam/Cam16/audio/Test 4 Part 3.wav" },
      { name: "Test 4 - Part 4", duration: "09:14", path: "Cam/Cam16/audio/Test 4 Part 4.wav" }
    ]
  },
  {
    id: "cam_15",
    bookNum: 15,
    title: "Cambridge IELTS 15 (Academic & General)",
    year: "2020",
    badge: "Kinh Điển",
    color: "amber",
    pdfPath: "Cam/Cambridge-ielts-15/IELTS Cambridge 15 (Academy + General Training)/Cambridge IELTS 15 - Academic - IELTS Vietop.pdf",
    coverImg: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
    description: "Bộ sách nổi tiếng với bài đọc Anthropogenic Climate Change và văn mẫu Task 1, Task 2 chuẩn.",
    audios: [
      { name: "Test 1 - Section 1", duration: "07:15", path: "Cam/Cambridge-ielts-15/Cambridge IELTS 15-Academic/TEST 1/TEST 1/IELTS15_test1_audio1.mp3" },
      { name: "Test 1 - Section 2", duration: "06:50", path: "Cam/Cambridge-ielts-15/Cambridge IELTS 15-Academic/TEST 1/TEST 1/IELTS15_test1_audio2.mp3" },
      { name: "Test 1 - Section 3", duration: "07:05", path: "Cam/Cambridge-ielts-15/Cambridge IELTS 15-Academic/TEST 1/TEST 1/IELTS15_test1_audio3.mp3" },
      { name: "Test 1 - Section 4", duration: "08:12", path: "Cam/Cambridge-ielts-15/Cambridge IELTS 15-Academic/TEST 1/TEST 1/IELTS15_test1_audio4.mp3" }
    ]
  },
  {
    id: "cam_13",
    bookNum: 13,
    title: "Cambridge IELTS 13 (Academic)",
    year: "2018",
    badge: "Phổ Biến Nhất",
    color: "emerald",
    pdfPath: "Cam/Cam13/IELTS Cambridge 13.pdf",
    coverImg: "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=400&q=80",
    description: "Chứa bài nghe Cookery Classes Enquiry và bài đọc New Zealand Tourism nổi tiếng.",
    audios: [
      { name: "CD1 - Track 01 (Test 1 Sec 1)", duration: "07:02", path: "Cam/Cam13/IELTS13-Tests1-4CD1Track_01.mp3" },
      { name: "CD1 - Track 02 (Test 1 Sec 2)", duration: "06:21", path: "Cam/Cam13/IELTS13-Tests1-4CD1Track_02.mp3" },
      { name: "CD1 - Track 03 (Test 1 Sec 3)", duration: "06:41", path: "Cam/Cam13/IELTS13-Tests1-4CD1Track_03.mp3" },
      { name: "CD1 - Track 04 (Test 1 Sec 4)", duration: "06:34", path: "Cam/Cam13/IELTS13-Tests1-4CD1Track_04.mp3" },
      { name: "CD1 - Track 05 (Test 2 Sec 1)", duration: "08:10", path: "Cam/Cam13/IELTS13-Tests1-4CD1Track_05.mp3" },
      { name: "CD1 - Track 06 (Test 2 Sec 2)", duration: "06:54", path: "Cam/Cam13/IELTS13-Tests1-4CD1Track_06.mp3" },
      { name: "CD1 - Track 07 (Test 2 Sec 3)", duration: "06:43", path: "Cam/Cam13/IELTS13-Tests1-4CD1Track_07.mp3" }
    ]
  },
  {
    id: "cam_12",
    bookNum: 12,
    title: "Cambridge IELTS 12 (Academic)",
    year: "2017",
    badge: "Kinh Điển",
    color: "cyan",
    pdfPath: "Cam/Cam 12/12.pdf",
    coverImg: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80",
    description: "Kho tàng các đề thi thực tế với Test 7 và Test 8 Section 1, 2, 3, 4 đầy đủ âm thanh.",
    audios: [
      { name: "Test 7 - Section 1", duration: "07:15", path: "Cam/Cam 12/Cambridge IELTS 12/Audio/Test 7 Section 1.mp3" },
      { name: "Test 7 - Section 2", duration: "06:50", path: "Cam/Cam 12/Cambridge IELTS 12/Audio/Test 7 Section 2.mp3" },
      { name: "Test 7 - Section 3", duration: "07:05", path: "Cam/Cam 12/Cambridge IELTS 12/Audio/Test 7 Section 3.mp3" },
      { name: "Test 7 - Section 4", duration: "08:12", path: "Cam/Cam 12/Cambridge IELTS 12/Audio/Test 7 Section 4.mp3" },
      { name: "Test 8 - Section 1", duration: "07:02", path: "Cam/Cam 12/Cambridge IELTS 12/Audio/Test 8 Section 1.mp3" },
      { name: "Test 8 - Section 2", duration: "06:45", path: "Cam/Cam 12/Cambridge IELTS 12/Audio/Test 8 Section 2.mp3" },
      { name: "Test 8 - Section 3", duration: "07:20", path: "Cam/Cam 12/Cambridge IELTS 12/Audio/Test 8 Section 3.mp3" },
      { name: "Test 8 - Section 4", duration: "08:05", path: "Cam/Cam 12/Cambridge IELTS 12/Audio/Test 8 Section 4.mp3" }
    ]
  },
  {
    id: "cam_11",
    bookNum: 11,
    title: "Cambridge IELTS 11 (Bản Đẹp Academic)",
    year: "2016",
    badge: "Bản Đẹp Chuẩn",
    color: "slate",
    pdfPath: "Cam/Cam 11/11.pdf",
    coverImg: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=400&q=80",
    description: "Bộ sách chứa bài đọc Crop-growing in Skyscrapers (Vertical Farming) và đề thi Listening Section 1.",
    audios: [
      { name: "Test 1 - Section 1", duration: "07:28", path: "Cam/Cam 11/Cam 11 Bản đẹp/Cambridge IELTS 11/IELTS11_Test1_Section1.mp3" }
    ]
  },
  {
    id: "cam_10",
    bookNum: 10,
    title: "Cambridge IELTS 10 (Academic)",
    year: "2015",
    badge: "Nền Tảng Vàng",
    color: "blue",
    pdfPath: "Cam/Cam 10/10.pdf",
    coverImg: "https://images.unsplash.com/photo-1532012164546-f432f2e3edd3?auto=format&fit=crop&w=400&q=80",
    description: "Bộ đề nền tảng vàng cho học viên từ 4.0 lên 6.0 với đầy đủ 2 đĩa CD1 và CD2.",
    audios: [
      { name: "CD1 - Track 01 (Test 1 Part 1)", duration: "06:50", path: "Cam/Cam 10/Cambridge IELTS 10/Cambridge IELTS 10/Cambridge IELTS 10 Listening/CD 1/Track01.mp3" },
      { name: "CD1 - Track 02 (Test 1 Part 2)", duration: "06:15", path: "Cam/Cam 10/Cambridge IELTS 10/Cambridge IELTS 10/Cambridge IELTS 10 Listening/CD 1/Track02.mp3" },
      { name: "CD1 - Track 03 (Test 1 Part 3)", duration: "06:40", path: "Cam/Cam 10/Cambridge IELTS 10/Cambridge IELTS 10/Cambridge IELTS 10 Listening/CD 1/Track03.mp3" },
      { name: "CD1 - Track 04 (Test 1 Part 4)", duration: "07:12", path: "Cam/Cam 10/Cambridge IELTS 10/Cambridge IELTS 10/Cambridge IELTS 10 Listening/CD 1/Track04.mp3" },
      { name: "CD1 - Track 05 (Test 2 Part 1)", duration: "06:30", path: "Cam/Cam 10/Cambridge IELTS 10/Cambridge IELTS 10/Cambridge IELTS 10 Listening/CD 1/Track05.mp3" },
      { name: "CD1 - Track 06 (Test 2 Part 2)", duration: "06:22", path: "Cam/Cam 10/Cambridge IELTS 10/Cambridge IELTS 10/Cambridge IELTS 10 Listening/CD 1/Track06.mp3" },
      { name: "CD1 - Track 07 (Test 2 Part 3)", duration: "07:05", path: "Cam/Cam 10/Cambridge IELTS 10/Cambridge IELTS 10/Cambridge IELTS 10 Listening/CD 1/Track07.mp3" },
      { name: "CD1 - Track 08 (Test 2 Part 4)", duration: "08:10", path: "Cam/Cam 10/Cambridge IELTS 10/Cambridge IELTS 10/Cambridge IELTS 10 Listening/CD 1/Track08.mp3" }
    ]
  }
];
