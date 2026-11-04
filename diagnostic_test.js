// diagnostic_test.js - Bài Test Đầu Vào Chuẩn Đoán Trình Độ & Bắt Bệnh Lỗ Hổng (Hỗ Trợ Lưu Ngắt Quãng)

const DIAGNOSTIC_TEST = {
  title: "IELTS Diagnostic Placement & Gap Analysis",
  description: "Bài test chẩn đoán 4 phần giúp xác định trình độ hiện tại, mức độ hiểu biết về IELTS và những lỗ hổng bạn cần khắc phục ngay.",
  totalParts: 4,
  parts: [
    {
      id: "part_a",
      partNum: 1,
      title: "Phần 1: Khảo Sát Tư Duy & Hiểu Biết Về IELTS (IELTS Mindset & Awareness)",
      estTime: "5 phút",
      summary: "Kiểm tra xem bạn đã nắm rõ 'luật chơi', thang điểm và tiêu chí khảo thí của kỳ thi IELTS chưa.",
      questions: [
        {
          qNum: 1,
          type: "mcq",
          question: "Kỳ thi IELTS Academic bao gồm 4 kỹ năng được tính điểm như thế nào để ra Overall?",
          options: [
            "Lấy điểm của kỹ năng cao nhất làm điểm Overall",
            "Cộng điểm 4 kỹ năng chia trung bình và làm tròn theo quy tắc 0.25 (ví dụ 6.125 -> 6.0, 6.25 -> 6.5, 6.75 -> 7.0)",
            "Chỉ tính điểm Writing và Speaking, 2 kỹ năng kia chỉ tính điều kiện đỗ/trượt",
            "Điểm Overall do giám khảo chấm phỏng vấn quyết định trực tiếp"
          ],
          correct: "B",
          explanation: "Điểm Overall là trung bình cộng 4 kỹ năng: (Nghe + Đọc + Viết + Nói) / 4. Nếu đuôi lẻ là .125 thì làm tròn xuống .0, nếu .25 hoặc .75 thì làm tròn lên mốc 0.5 gần nhất hoặc số nguyên."
        },
        {
          qNum: 2,
          type: "mcq",
          question: "Trong phần thi IELTS Reading, bạn có thêm 10 phút để chuyển câu trả lời vào phiếu trả lời (Answer Sheet) giống như phần Listening không?",
          options: [
            "Có, cả Reading và Listening đều có 10 phút chuyển đáp án",
            "KHÔNG, trong Reading bạn chỉ có đúng 60 phút và PHẢI ghi trực tiếp đáp án vào phiếu trả lời trước khi hết giờ",
            "Được thêm 5 phút nếu chưa kịp ghi",
            "Giám khảo sẽ tự thu bài và hỗ trợ chấm trên đề thi"
          ],
          correct: "B",
          explanation: "Rất nhiều người mới thi bị mất trắng điểm Reading vì tưởng có 10 phút chuyển bài như Listening. Trong Reading, 60 phút là tính cả thời gian đọc và ghi đáp án vào Answer Sheet!"
        },
        {
          qNum: 3,
          type: "mcq",
          question: "Kỹ năng 'Paraphrasing' (diễn đạt lại bằng từ ngữ khác) đóng vai trò quan trọng như thế nào trong bài thi IELTS?",
          options: [
            "Chỉ cần dùng trong Speaking, không cần thiết cho các kỹ năng khác",
            "Là chìa khóa cốt lõi của cả 4 kỹ năng: Đề Listening & Reading gần như 100% bẫy bằng Paraphrase, Writing & Speaking đòi hỏi Paraphrase để đạt điểm Lexical Resource 7.0+",
            "Không quan trọng, chỉ cần học thuộc lòng bài mẫu là đủ điểm",
            "Chỉ dùng khi quên từ vựng tiếng Anh"
          ],
          correct: "B",
          explanation: "IELTS về bản chất là một bài kiểm tra khả năng Paraphrasing. Người ra đề sẽ không bao giờ để từ trong câu hỏi giống y hệt bài đọc hay bài nghe, mà luôn dùng từ đồng nghĩa."
        },
        {
          qNum: 4,
          type: "mcq",
          question: "Trong Writing Task 2, tỷ trọng điểm của bài này chiếm bao nhiêu phần trong tổng điểm Writing?",
          options: [
            "Chiếm 50% tổng điểm",
            "Chiếm 2/3 (khoảng 66.7%) tổng số điểm kỹ năng Writing, trong khi Task 1 chỉ chiếm 1/3",
            "Task 1 và Task 2 có số điểm bằng nhau",
            "Task 1 quan trọng hơn vì là bài thi mở đầu"
          ],
          correct: "B",
          explanation: "Task 2 chiếm 2/3 tổng điểm Writing. Do đó chiến thuật chuẩn là dành 40 phút cho Task 2 (250 từ) và 20 phút cho Task 1 (150 từ)."
        },
        {
          qNum: 5,
          type: "mcq",
          question: "Tiêu chí chấm điểm nào sau đây KHÔNG thuộc 4 tiêu chí chính thức của IELTS Speaking?",
          options: [
            "Fluency and Coherence (Độ trôi chảy và mạch lạc)",
            "Lexical Resource (Vốn từ vựng)",
            "Grammatical Range and Accuracy (Ngữ pháp)",
            "Accent (Phải nói chuẩn giọng Anh - Anh hoặc Anh - Mỹ mới được điểm cao)"
          ],
          correct: "D",
          explanation: "IELTS KHÔNG chấm Accent (giọng địa phương). Tiêu chí thứ 4 là Pronunciation (Phát âm rõ ràng, chuẩn âm đuôi, ngữ điệu, trọng âm), bạn nói giọng Việt Nam chuẩn phát âm vẫn đạt 8.0 - 9.0 bình thường!"
        }
      ]
    },
    {
      id: "part_b",
      partNum: 2,
      title: "Phần 2: Chẩn Đoán Khả Năng Bắt Âm & Nghe Điền Số/Chữ (Listening Core)",
      estTime: "8 phút",
      summary: "Kiểm tra kỹ năng phân biệt các cặp chữ cái dễ nhầm, số điện thoại, và hiện tượng nuốt âm đuôi.",
      questions: [
        {
          qNum: 6,
          type: "fill",
          question: "Nghe phát âm ký tự: Người bản xứ đọc /eɪ/ thì đó là chữ cái nào trong bảng chữ cái tiếng Anh? (A, E, hay I)",
          ans: "A",
          explanation: "Chữ 'A' đọc là /eɪ/. Người Việt ở mức 4.0 rất hay nhầm /eɪ/ (chữ A) với /iː/ (chữ E) hoặc /aɪ/ (chữ I)."
        },
        {
          qNum: 7,
          type: "fill",
          question: "Nghe phát âm ký tự: Người bản xứ đọc /dʒiː/ thì đó là chữ cái nào? (G hay J)",
          ans: "G",
          explanation: "Chữ 'G' đọc là /dʒiː/. Chữ 'J' đọc là /dʒeɪ/."
        },
        {
          qNum: 8,
          type: "mcq",
          question: "Khi người nói trong bài nghe nói: 'My mobile is 07700... wait, let me check, actually it's 07722 900543', đáp án bạn cần điền là số nào?",
          options: [
            "07700",
            "07722 900543",
            "Cả hai số",
            "Không điền gì vì bị mâu thuẫn"
          ],
          correct: "B",
          explanation: "Đây là bẫy 'Self-Correction' kinh điển của IELTS Listening. Người nói nói sai trước rồi sửa lại bằng các từ tín hiệu 'wait, actually, sorry' ➔ Luôn lấy thông tin đính chính sau cùng!"
        },
        {
          qNum: 9,
          type: "mcq",
          question: "Nếu đề bài yêu cầu: 'Write NO MORE THAN ONE WORD AND/OR A NUMBER', nếu bạn viết '25 June' thì có bị tính là sai không?",
          options: [
            "Sai vì '25 June' là 2 từ",
            "ĐÚNG vì '25' là A NUMBER và 'June' là ONE WORD, thỏa mãn quy tắc ONE WORD AND/OR A NUMBER",
            "Chỉ được viết chữ 'June', bỏ số 25",
            "Chỉ được viết số '25', bỏ chữ June"
          ],
          correct: "B",
          explanation: "'ONE WORD AND/OR A NUMBER' cho phép tối đa 1 từ chữ VÀ 1 con số, nên '25 June' hoàn toàn hợp lệ."
        },
        {
          qNum: 10,
          type: "mcq",
          question: "Từ nào sau đây nếu viết thiếu âm đuôi 's' trong phần nghe điền từ Part 1 sẽ bị trừ điểm mất trắng câu đó?",
          options: [
            "Equipment",
            "Information",
            "Apartments (những căn hộ)",
            "Advice"
          ],
          correct: "C",
          explanation: "Trong IELTS, số nhiều/số ít là lỗi phổ biến nhất. 'Apartment' số nhiều có 's', nếu audio đọc 'apartments' mà bạn ghi 'apartment' thì mất điểm hoàn toàn!"
        }
      ]
    },
    {
      id: "part_c",
      partNum: 3,
      title: "Phần 3: Chẩn Đoán Tư Duy Logic & Bẫy Đọc Hiểu (Reading Logic)",
      estTime: "8 phút",
      summary: "Kiểm tra khả năng phân biệt TRUE - FALSE - NOT GIVEN và bắt từ khóa Paraphrase.",
      questions: [
        {
          qNum: 11,
          type: "mcq",
          question: "Đoạn văn viết: 'The university was established in 1920 by a local philanthropist.' Câu hỏi: 'The university was founded in the early twentieth century.' Đáp án là:",
          options: [
            "TRUE (Vì 1920 là early 20th century, established = founded)",
            "FALSE",
            "NOT GIVEN"
          ],
          correct: "A",
          explanation: "Established = founded; 1920 = early twentieth century. Ý nghĩa khớp 100% ➔ TRUE."
        },
        {
          qNum: 12,
          type: "mcq",
          question: "Đoạn văn viết: 'Solar panels are predominantly installed on residential rooftops.' Câu hỏi: 'Solar panels are installed ONLY on residential properties.' Đáp án là:",
          options: [
            "TRUE",
            "FALSE (Vì 'predominantly' là phần lớn, còn câu hỏi dùng 'ONLY' là chỉ duy nhất, mâu thuẫn trực tiếp)",
            "NOT GIVEN"
          ],
          correct: "B",
          explanation: "Bẫy từ tuyệt đối: 'predominantly' (chủ yếu) khác hoàn toàn với 'only' (chỉ duy nhất). Có thể có một số tấm pin lắp ở nhà máy hoặc cánh đồng ➔ Mâu thuẫn ➔ FALSE."
        },
        {
          qNum: 13,
          type: "mcq",
          question: "Đoạn văn viết: 'Professor William spent ten years studying Amazonian biodiversity.' Câu hỏi: 'Professor William considers his research in the Amazon to be his greatest achievement.' Đáp án là:",
          options: [
            "TRUE",
            "FALSE",
            "NOT GIVEN (Bài đọc chỉ nói dành 10 năm nghiên cứu, KHÔNG HỀ NÓI giáo sư có coi đó là 'greatest achievement' hay không)"
          ],
          correct: "C",
          explanation: "Bài đọc không hề đề cập tới cảm nhận 'greatest achievement'. Đừng tự suy diễn ➔ NOT GIVEN."
        },
        {
          qNum: 14,
          type: "mcq",
          question: "Cặp từ nào sau đây KHÔNG PHẢI là từ đồng nghĩa (Paraphrase) thường gặp trong bài thi Reading?",
          options: [
            "Significant = Substantial",
            "Deteriorate = Worsen",
            "Mitigate = Exacerbate (Làm trầm trọng thêm - là từ TRÁI NGHĨA)",
            "Crucial = Vital"
          ],
          correct: "C",
          explanation: "Mitigate là làm dịu/giảm nhẹ, còn Exacerbate là làm trầm trọng thêm (từ trái nghĩa). Đây là bẫy từ vựng C1 rất hay gài thí sinh."
        },
        {
          qNum: 15,
          type: "mcq",
          question: "Khi làm dạng bài 'Matching Headings' (Nối tiêu đề đoạn văn), chiến thuật đọc nào sau đây là chuẩn xác nhất?",
          options: [
            "Đọc hết danh sách các Headings rồi dịch từng từ của cả bài đọc",
            "Đọc câu đầu (Topic sentence) và câu cuối của từng đoạn văn trước để nắm ý chính (Main Idea), sau đó đối chiếu loại trừ trong danh sách Headings",
            "Đoạn văn có từ nào giống hệt trong Heading thì chọn luôn Heading đó",
            "Chọn ngẫu nhiên các Heading dài nhất"
          ],
          correct: "B",
          explanation: "Đoạn văn học thuật tiếng Anh thường theo lối Diễn dịch hoặc Quy nạp. Ý chính thường nằm ở 1-2 câu đầu hoặc câu cuối đoạn."
        }
      ]
    },
    {
      id: "part_d",
      partNum: 4,
      title: "Phần 4: Chẩn Đoán Ngữ Pháp & Viết Câu Học Thuật (Writing & Grammar)",
      estTime: "8 phút",
      summary: "Kiểm tra khả năng phát hiện lỗi câu què, câu ghép sai liên từ và tư duy ngữ pháp chuẩn Band 6.5+.",
      questions: [
        {
          qNum: 16,
          type: "mcq",
          question: "Câu nào sau đây là câu ĐÚNG NGỮ PHÁP tiếng Anh (không mắc lỗi liên từ kép)?",
          options: [
            "Although learning a second language is demanding, but it offers numerous cognitive benefits.",
            "Although learning a second language is demanding, it offers numerous cognitive benefits.",
            "Because he studied hard, so he passed the exam.",
            "Despite it was raining, but they still played football."
          ],
          correct: "B",
          explanation: "Trong tiếng Anh: Đã có 'Although' thì KHÔNG dùng 'but'; đã có 'Because' thì KHÔNG dùng 'so'. Câu B là câu phức chuẩn xác."
        },
        {
          qNum: 17,
          type: "mcq",
          question: "Câu sau đây mắc lỗi ngữ pháp gì: 'Because the government did not invest in public transport.'",
          options: [
            "Lỗi sai thì quá khứ",
            "Lỗi câu què / câu cụt (Sentence Fragment) vì đây chỉ là mệnh đề phụ thuộc, thiếu mệnh đề chính để tạo thành một câu hoàn chỉnh",
            "Lỗi sai mạo từ",
            "Câu này hoàn toàn đúng ngữ pháp"
          ],
          correct: "B",
          explanation: "Mệnh đề bắt đầu bằng 'Because' là dependent clause, không thể đứng độc lập làm một câu hoàn chỉnh. Nó cần có mệnh đề chính: 'Because the government did not invest in public transport, traffic congestion worsened.'"
        },
        {
          qNum: 18,
          type: "mcq",
          question: "Chọn dạng đúng của động từ: 'A large proportion of young individuals _________ addicted to social networks nowadays.'",
          options: [
            "is (sai vì individuals là số nhiều)",
            "are (đúng vì chủ ngữ hướng về danh từ đếm được số nhiều 'individuals')",
            "has been",
            "be"
          ],
          correct: "B",
          explanation: "Với cụm 'A proportion / percentage of + N số nhiều đếm được', động từ chia theo danh từ phía sau (individuals) ➔ Dùng 'are'."
        },
        {
          qNum: 19,
          type: "mcq",
          question: "Kỹ thuật 'Nominalization' (Danh từ hóa) giúp câu văn nâng từ Band 5.0 lên Band 7.0+ như thế nào?",
          options: [
            "Bỏ bớt danh từ và thêm nhiều trạng từ",
            "Biến các mệnh đề động từ/tính từ thành cụm danh từ cô đọng, mang tính học thuật cao (Ví dụ: 'People use phones too much' ➔ 'Excessive smartphone usage')",
            "Chỉ dùng thì hiện tại đơn",
            "Dịch từng từ tiếng Việt sang tiếng Anh"
          ],
          correct: "B",
          explanation: "Nominalization là đặc trưng của văn viết học thuật (Academic Writing). Thay vì viết nhiều câu ghép dài dòng, người viết gộp các hành động thành cụm danh từ súc tích."
        },
        {
          qNum: 20,
          type: "mcq",
          question: "Trong cấu trúc đoạn văn PEEL (Point - Explanation - Example - Link), chữ 'E' thứ hai đại diện cho bước nào?",
          options: [
            "Emotion (Bộc lộ cảm xúc cá nhân)",
            "Example (Đưa ra ví dụ cụ thể thực tế để minh họa cho luận điểm)",
            "Ending (Kết thúc bài viết)",
            "Examination (Kiểm tra lại từ vựng)"
          ],
          correct: "B",
          explanation: "PEEL = Point (Luận điểm) ➔ Explanation (Giải thích) ➔ Example (Ví dụ thực tế) ➔ Link (Chốt & nối về đề bài)."
        }
      ]
    }
  ]
};
