// cambridge_practice.js - Bộ Luyện Tập Từng Chút Một (Bite-Sized Real Cambridge Drills) Kèm Nhận Xét Sát Sao & Audio Trực Tiếp

const CAMBRIDGE_PRACTICE_DRILLS = [
  {
    id: "drill_cam13_sec1",
    title: "Cambridge 13 - Test 1 Section 1: Cookery Classes Enquiry",
    skill: "listening",
    type: "Form Completion (Điền biểu mẫu)",
    camSource: "Cambridge IELTS 13 - Test 1",
    audioSrc: "Cam/Cam13/IELTS13-Tests1-4CD1Track_01.mp3",
    estTime: "6 phút",
    summary: "Luyện nghe tên riêng, số điện thoại, ngày trong tuần và bẫy tự sửa (Self-Correction).",
    questions: [
      {
        qNum: 1,
        prompt: "Focus of cookery classes: _________ food (One word only)",
        ans: "vegetarian",
        trapHint: "Người nói đề cập đến món Ý trước, nhưng sau đó đính chính là lớp học chuyên về món ăn chay.",
        transcriptSnippet: "We actually focus exclusively on vegetarian cookery, though we use Mediterranean spices.",
        takeawayRule: "Chú ý bẫy từ nối tương phản 'actually, exclusively'. Thông tin đính chính luôn đứng sau!"
      },
      {
        qNum: 2,
        prompt: "Contact mobile number: _________",
        ans: "07700900123",
        trapHint: "Người gọi đọc nhầm số đuôi 124 rồi đính chính lại là 123.",
        transcriptSnippet: "You can ring me on 07700 900 124... sorry, my mistake, the last digits are 123.",
        takeawayRule: "Khi nghe thấy 'sorry, my mistake, pardon', hãy gạch ngay số vừa ghi và nghe số tiếp theo."
      },
      {
        qNum: 3,
        prompt: "Day of the week for beginners: on _________",
        ans: "wednesday",
        trapHint: "Lớp nâng cao diễn ra vào thứ Bảy, còn lớp cho người mới bắt đầu (beginners) là thứ Tư.",
        transcriptSnippet: "The Saturday sessions are for advanced cooks, but the beginners class meets every Wednesday.",
        takeawayRule: "Đọc kỹ đối tượng trong câu hỏi: 'beginners' hay 'advanced'."
      }
    ]
  },
  {
    id: "drill_cam11_tfng",
    title: "Cambridge 11 - Test 1 Passage 1: Crop-growing in Skyscrapers (Vertical Farming)",
    skill: "reading",
    type: "True / False / Not Given",
    camSource: "Cambridge IELTS 11 - Test 1",
    estTime: "7 phút",
    summary: "Phân biệt tuyệt đối giữa thông tin mâu thuẫn (FALSE) và thông tin không được đề cập (NOT GIVEN).",
    passageExcerpt: `
      By the year 2050, nearly 80% of the Earth's population will reside in urban centres. An estimated 109 hectares of new land will be needed to grow enough food to feed them, if traditional farming methods continue as they are practiced today. At present, throughout the world, over 80% of the land that is suitable for raising crops is already in use. Historically, some 15% of that has been laid waste by poor management practices. What can be done to ensure enough food for the world's population to live on?

      The concept of indoor farming is not new, since hothouse production of tomatoes and other produce has been in vogue for some time. What is new is the urgent need to scale up this technology to accommodate another three billion people. Many believe an entirely new approach to agriculture is required, employing cutting-edge technologies. One such approach is 'vertical farming', in which food crops would be cultivated in multi-storey skyscrapers situated within the hearts of major cities.
    `,
    questions: [
      {
        qNum: 1,
        text: "Methods for predicting the Earth's population have recently changed.",
        ans: "NOT GIVEN",
        trapHint: "Bài đọc có nói tới dân số năm 2050 đạt 80% ở thành thị, nhưng KHÔNG HỀ NÓI phương pháp dự đoán dân số có bị thay đổi gần đây hay không.",
        transcriptSnippet: "By the year 2050, nearly 80% of the Earth's population will reside in urban centres.",
        takeawayRule: "Nếu bài đọc không nói đến cách thức / phương pháp tính toán ➔ Tuyệt đối không tự suy diễn ➔ NOT GIVEN."
      },
      {
        qNum: 2,
        text: "Human beings currently use most of the land that is suitable for farming.",
        ans: "TRUE",
        trapHint: "Từ 'most' (hầu hết) được paraphrase từ 'over 80%' trong bài đọc.",
        transcriptSnippet: "At present, throughout the world, over 80% of the land that is suitable for raising crops is already in use.",
        takeawayRule: "Most = over 80% = the vast majority. Ý nghĩa tương đương 100% ➔ TRUE."
      },
      {
        qNum: 3,
        text: "Producing food indoors is a completely brand-new concept developed in the 21st century.",
        ans: "FALSE",
        trapHint: "Bài đọc khẳng định ngược lại: 'The concept of indoor farming is NOT new' (Trồng trọt trong nhà không hề mới).",
        transcriptSnippet: "The concept of indoor farming is not new, since hothouse production of tomatoes has been in vogue for some time.",
        takeawayRule: "Bài đọc phủ định ('not new') trong khi câu hỏi khẳng định 'completely brand-new' ➔ Mâu thuẫn trực tiếp ➔ FALSE."
      }
    ]
  },
  {
    id: "drill_cam10_task1",
    title: "Cambridge 10 - Test 1 Writing Task 1: Overview & Trend Mastery",
    skill: "writing",
    type: "Sentence Upgrade & Overview Strategy",
    camSource: "Cambridge IELTS 10 - Test 1",
    estTime: "8 phút",
    summary: "Rèn luyện cách viết câu Overview chuẩn xác và nâng cấp từ vựng mô tả xu hướng từ 4.5 lên 7.0.",
    questions: [
      {
        qNum: 1,
        type: "mcq",
        question: "Trong câu Overview của Writing Task 1, điều nào sau đây là CẤM KỴ TUYỆT ĐỐI?",
        options: [
          "Nêu xu hướng chung tăng/giảm của toàn bộ biểu đồ",
          "Nêu đối tượng nào chiếm tỷ trọng lớn nhất hoặc nhỏ nhất",
          "Liệt kê số liệu cụ thể chi tiết (ví dụ: 'In 2010 it was exactly 45.2%')",
          "Viết từ 1 đến 2 câu súc tích"
        ],
        ans: "C",
        trapHint: "Overview chỉ nêu bức tranh toàn cảnh (Big Picture). Nếu đưa số liệu cụ thể vào Overview, bạn sẽ bị giám khảo trừ điểm tiêu chí Task Achievement (không phân biệt được Overview và Body)!",
        takeawayRule: "Quy tắc vàng: Overview = 0% số liệu chi tiết. Chỉ dùng từ xu hướng như 'increase, dominant, negligible'."
      },
      {
        qNum: 2,
        type: "upgrade",
        question: "Nâng cấp câu mô tả sau: 'The number of cars went up very fast.'",
        basic: "The number of cars went up very fast.",
        tactical: "The number of vehicles witnessed a substantial increase.",
        academic: "Car ownership experienced an exponential surge throughout the surveyed period.",
        takeawayRule: "Thay 'went up very fast' bằng 'experienced an exponential surge' để đạt chuẩn Lexical Resource 7.0+."
      }
    ]
  }
];
