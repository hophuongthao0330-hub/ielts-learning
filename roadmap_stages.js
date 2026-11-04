// roadmap_stages.js - Hệ Thống Lộ Trình 3 Chặng Phân Tầng Chuyên Sâu (Stage-Gated Learning Curriculum)
// Từ Band 4.0 -> 5.0 (Chặng 1) ➔ 5.0 -> 6.0 (Chặng 2) ➔ 6.0 -> 7.0+ (Chặng 3)
// Kèm Điều Kiện Thi Vượt Chặng (Milestone Checkpoint Exams) & Cơ Chế Khóa/Mở Khóa

const ROADMAP_CURRICULUM = {
  stages: [
    // ==========================================
    // CHẶNG 1: NỀN TẢNG & DIỆT LỖ HỔNG (BAND 4.0 - 5.0)
    // ==========================================
    {
      id: "stage_1",
      stageNum: 1,
      targetBand: "Band 4.0 - 5.0",
      title: "Chặng 1: Xóa Mất Gốc, Diệt Lỗ Hổng & Bắt Nhịp Cốt Lõi",
      summary: "Triệt tiêu 100% các lỗi mất điểm sơ đẳng: nhầm lẫn chữ cái/số điện thoại, câu què/liên từ kép, chia sai thì, và định hình tư duy TRUE/FALSE/NOT GIVEN căn bản.",
      badge: "Foundation Master",
      color: "blue",
      isDefaultUnlocked: true,
      passScorePercent: 80, // Cần >= 80% bài thi vượt chặng để unlock Chặng 2
      modules: [
        {
          id: "mod_1_1",
          title: "Module 1.1: Listening Foundation (Bắt Âm & Bẫy Số/Chữ Cái)",
          icon: "headphones",
          summary: "Xóa tan nỗi sợ nghe số và đánh vần tên riêng trong Section 1 Cambridge.",
          lessons: [
            {
              id: "les_1_1_1",
              title: "Bài 1: Cặp Chữ Cái Dễ Nhầm (A-E-I, G-J) & Đánh Vần Tên Riêng",
              estTime: "15 phút",
              skill: "listening",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Bản chất bẫy chữ cái trong Cambridge Section 1:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Người Việt ở mức 4.0 thường mắc bẫy phát âm chữ cái theo thói quen đọc tiếng Việt. Trong bài thi nghe Section 1, Cambridge luôn cố tình gài thí sinh bằng 2 nhóm chữ cái có âm tương đồng:
                  </p>
                  <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs space-y-2">
                    <p>• <strong>Nhóm 1: A /eɪ/ - E /iː/ - I /aɪ/</strong>: Thí sinh nghe /eɪ/ (A) thường ghi thành E, nghe /iː/ (E) lại ghi thành I.</p>
                    <p>• <strong>Nhóm 2: G /dʒiː/ - J /dʒeɪ/</strong>: Chữ G đọc có âm /iː/, chữ J đọc có âm /eɪ/.</p>
                    <p>• <strong>Nhóm 3: W /ˈdʌb.əl.juː/ - Double</strong>: Khi nghe "double six", thí sinh hay ghi "W6" thay vì "66".</p>
                  </div>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm mt-3">2. Quy tắc ghi điểm tuyệt đối:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Ngay khi nghe người nói phát âm: <em>"Could you spell your surname, please?"</em> ➔ Cầm bút sẵn sàng, ghi hoa từng ký tự ngay tức khắc, không dịch nhẩm trong đầu!
                  </p>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Người nói đánh vần tên đường: 'It is B-A-R-E-T-T Street'. Tên đường đúng là:",
                  options: ["Barret", "Barett", "Barette", "Berett"],
                  ans: "B",
                  exp: "Đánh vần từng chữ: B - A - R - E - T - T ➔ Barett."
                },
                {
                  q: "Audio phát âm chữ cái /dʒeɪ/ khi hỏi tên viết tắt của một tổ chức. Đó là chữ cái nào?",
                  options: ["G", "J", "Z", "K"],
                  ans: "B",
                  exp: "/dʒeɪ/ là phát âm chuẩn của chữ cái J. Chữ G phát âm là /dʒiː/."
                }
              ]
            },
            {
              id: "les_1_1_2",
              title: "Bài 2: Bẫy Tự Sửa Số Điện Thoại & Giá Tiền (Self-Correction)",
              estTime: "15 phút",
              skill: "listening",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Nhận diện bẫy Self-Correction trong Cam 10 - 19:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Trong hơn 85% các bài nghe Part 1, người bản xứ sẽ không đọc một lèo con số đúng. Họ sẽ đọc một số sai trước, rồi đính chính lại bằng các từ tín hiệu:
                  </p>
                  <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs space-y-1.5 text-amber-900 dark:text-amber-200">
                    <p>⚡ <strong>Các từ tín hiệu đính chính:</strong> "Wait, let me check", "Sorry, that was my old number", "Actually, it is...", "My mistake".</p>
                    <p>💡 <strong>Quy tắc phản xạ:</strong> Nghe thấy từ tín hiệu này ➔ Gạch ngay con số vừa ghi và tập trung nghe số được sửa lại ngay phía sau!</p>
                  </div>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm mt-3">2. Bẫy số '0' và 'Oh' vs 'Zero':</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Trong số điện thoại, người Anh luôn đọc số '0' là <strong>/oʊ/ (Oh)</strong> thay vì 'Zero'. Ví dụ '07700' đọc là 'Oh double seven double oh'.
                  </p>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Audio: 'My contact number is 07890 234... wait, no, that's my home phone, mobile is 07890 234567.' Số điện thoại đúng là:",
                  options: ["07890 234", "07890 234567", "Không có số nào đúng", "07890 234560"],
                  ans: "B",
                  exp: "Bẫy tự sửa: Số sau 'mobile is' là thông tin đính chính cuối cùng."
                }
              ]
            },
            {
              id: "les_1_1_3",
              title: "Bài 3: Danh Từ Số Nhiều & Âm Đuôi /s/, /es/ - Bẫy Mất Điểm Đau Nhất",
              estTime: "15 phút",
              skill: "listening",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Tại sao người Việt band 4.5 mất trắng 2-3 câu Listening vì chữ 's'?</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Tiếng Việt là ngôn ngữ đơn âm và không biến đổi hình thái danh từ số nhiều. Do đó não bộ học viên Việt Nam có xu hướng "bỏ quên" âm đuôi /s/. Trong IELTS:
                  </p>
                  <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-900 dark:text-rose-200">
                    Đáp án Cambridge là <strong>apartments</strong> mà bạn ghi <strong>apartment</strong> ➔ 0 ĐIỂM (Sai hoàn toàn).
                  </div>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm mt-3">2. Mẹo bắt âm số nhiều:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Dựa vào ngữ pháp câu hỏi: Nếu phía trước chỗ trống là động từ số nhiều (are, have, were) hoặc các từ chỉ số lượng (many, several, two, a pair of) ➔ 100% từ cần điền phải có đuôi số nhiều 's/es'!
                  </p>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Câu hỏi: 'There are many _________ available near the campus.' Audio đọc: /əˈpɑːt.mənts/. Bạn cần điền:",
                  options: ["apartment", "apartments", "an apartment", "apartment's"],
                  ans: "B",
                  exp: "Cả ngữ pháp ('There are many') và âm đuôi /ts/ đều khẳng định danh từ số nhiều 'apartments'."
                }
              ]
            }
          ]
        },
        {
          id: "mod_1_2",
          title: "Module 1.2: Grammar Clinic (Ngữ Pháp Sống Còn & Diệt Câu Què)",
          icon: "pen-tool",
          summary: "Sửa tận gốc thói quen ghép từ tiếng Việt sang tiếng Anh và xây dựng câu phức chuẩn ngữ pháp.",
          lessons: [
            {
              id: "les_1_2_1",
              title: "Bài 4: Triệt Tiêu Câu Què (Sentence Fragment) & Lỗi Phẩy (Comma Splice)",
              estTime: "20 phút",
              skill: "writing",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Nhận diện 'Câu què' (Sentence Fragment):</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Một câu hoàn chỉnh bắt buộc phải có ít nhất một <strong>Mệnh đề độc lập (Independent Clause)</strong> gồm Chủ ngữ (S) + Động từ chính (V). Nếu câu chỉ chứa mệnh đề phụ thuộc (bắt đầu bằng Because, Although, Which, Since) mà đứng một mình thì đó là câu què!
                  </p>
                  <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs space-y-1.5 font-mono">
                    <p class="text-red-500">❌ SAI: Because air pollution is increasing significantly in urban areas.</p>
                    <p class="text-emerald-500">✓ ĐÚNG: Because air pollution is increasing significantly in urban areas, the government must take urgent action.</p>
                  </div>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm mt-3">2. Lỗi Comma Splice (Nối 2 câu bằng dấu phẩy):</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Không được nối hai mệnh đề độc lập chỉ bằng một dấu phẩy. Hãy dùng liên từ (FANBOYS: for, and, nor, but, or, yet, so) hoặc dấu chấm phẩy (;).
                  </p>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Câu nào sau đây là câu HOÀN CHỈNH đúng ngữ pháp?",
                  options: [
                    "Although public transport is cheap and convenient.",
                    "Since the economic crisis occurred, many small enterprises went bankrupt.",
                    "The number of graduates increased dramatically, they found good jobs.",
                    "Which leads to several negative impacts on children's health."
                  ],
                  ans: "B",
                  exp: "Câu B có đầy đủ mệnh đề phụ thuộc (Since...) và mệnh đề chính độc lập (many small enterprises went bankrupt)."
                }
              ]
            },
            {
              id: "les_1_2_2",
              title: "Bài 5: Bẫy Liên Từ Kép Tiếng Việt (Although... but / Because... so)",
              estTime: "15 phút",
              skill: "writing",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Thói quen tư duy dịch từ tiếng Việt:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Trong tiếng Việt, chúng ta quen nói: <em>"Mặc dù... nhưng..."</em> hoặc <em>"Bởi vì... cho nên..."</em>. Khi sang tiếng Anh, học sinh 4.0 đưa cả hai liên từ vào cùng một câu:
                  </p>
                  <div class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs space-y-1.5 font-mono">
                    <p class="text-red-500">❌ Although he studied diligently, BUT he failed the test.</p>
                    <p class="text-emerald-500">✓ Although he studied diligently, he failed the test.</p>
                  </div>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm mt-3">2. Quy tắc 1 liên từ:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Chỉ được chọn 1 trong 2: Hoặc dùng <strong>Although</strong> ở đầu mệnh đề phụ, hoặc dùng <strong>but</strong> nối giữa hai mệnh đề. Tuyệt đối không bao giờ dùng cả hai!
                  </p>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Chọn câu viết lại chuẩn xác nhất: 'Bởi vì công nghệ phát triển nhanh, cuộc sống con người trở nên thuận tiện hơn.'",
                  options: [
                    "Because technology develops rapidly, so human life becomes more convenient.",
                    "Because technology develops rapidly, human life becomes more convenient.",
                    "Despite technology develops rapidly, but human life becomes convenient.",
                    "Due to technology develops rapidly, human life becomes convenient."
                  ],
                  ans: "B",
                  exp: "Đã có Because thì bỏ 'so'. Câu B là câu phức chuẩn mực."
                }
              ]
            },
            {
              id: "les_1_2_3",
              title: "Bài 6: Sự Hòa Hợp Chủ Ngữ - Động Từ Với Số Liệu Task 1",
              estTime: "15 phút",
              skill: "writing",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Bẫy chia động từ theo danh từ đứng sau cụm định lượng:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Trong Writing Task 1, bạn sẽ thường xuyên viết các cụm như: <em>"The percentage of...", "A large proportion of...", "The number of..."</em>. Động từ chia thế nào?
                  </p>
                  <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs space-y-2">
                    <p>• <strong>The number of + N (số nhiều) ➔ Động từ chia SỐ ÍT (is / was / increases)</strong> (vì chủ ngữ chính là 'the number').</p>
                    <p>• <strong>A number of + N (số nhiều) ➔ Động từ chia SỐ NHIỀU (are / were / increase)</strong> (nghĩa là 'nhiều').</p>
                    <p>• <strong>A proportion / percentage of + N đếm được số nhiều ➔ Động từ SỐ NHIỀU</strong>.</p>
                    <p>• <strong>A proportion / percentage of + N không đếm được ➔ Động từ SỐ ÍT</strong>.</p>
                  </div>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Điền dạng đúng của động từ: 'The number of international visitors _________ significantly in 2015.'",
                  options: ["increase", "increased", "have increased", "were increased"],
                  ans: "B",
                  exp: "Trong quá khứ năm 2015, động từ chia thì quá khứ đơn 'increased'."
                }
              ]
            }
          ]
        },
        {
          id: "mod_1_3",
          title: "Module 1.3: Reading Logic (Logic Đọc Hiểu & Ma Trận TRUE/FALSE/NOT GIVEN)",
          icon: "book-open",
          summary: "Hiểu đúng bản chất phân loại thông tin Cambridge để không bao giờ bị bẫy suy diễn.",
          lessons: [
            {
              id: "les_1_3_1",
              title: "Bài 7: Kỹ Thuật Định Vị Thông Tin Trong 30 Giây (Keyword Scanning)",
              estTime: "15 phút",
              skill: "reading",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Phân loại 2 nhóm từ khóa:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Đừng bao giờ đọc từ đầu đến cuối một bài đọc 800 từ. Hãy phân loại từ khóa trong câu hỏi thành 2 nhóm:
                  </p>
                  <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs space-y-2">
                    <p>• <strong>Từ khóa không thể thay đổi (Hard Keywords):</strong> Tên riêng viết hoa (John, London), Năm (1995, 2020), Con số (50%, $100). Dùng các từ này để quét mắt (Scan) tìm ra đoạn văn chứa thông tin chỉ trong 10-15 giây!</p>
                    <p>• <strong>Từ khóa nội dung (Soft Keywords):</strong> Động từ, tính từ (mitigate, increase, substantial). Những từ này 99% sẽ bị PARAPHRASE trong bài đọc.</p>
                  </div>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Trong câu hỏi: 'In 1876, Alexander Graham Bell invented the first practical telephone.' Từ nào nên dùng để Scan vị trí trong bài đọc nhanh nhất?",
                  options: ["invented", "1876 / Alexander Graham Bell", "first practical", "telephone"],
                  ans: "B",
                  exp: "Năm 1876 và tên riêng Alexander Graham Bell là Hard Keywords, không thể bị biến đổi trong bài đọc."
                }
              ]
            },
            {
              id: "les_1_3_2",
              title: "Bài 8: Ma Trận Phân Biệt Rạch Ròi FALSE vs NOT GIVEN",
              estTime: "20 phút",
              skill: "reading",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Khác biệt cốt tử giữa FALSE và NOT GIVEN:</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div class="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-200">
                      <strong>FALSE (Sai / Mâu thuẫn):</strong><br>
                      Bài đọc nói A, nhưng câu hỏi nói B (ngược lại hoàn toàn hoặc loại trừ nhau). Nếu bạn chứng minh được bài đọc nói ngược lại ➔ FALSE.
                    </div>
                    <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200">
                      <strong>NOT GIVEN (Không có thông tin):</strong><br>
                      Bài đọc có nhắc đến đối tượng, nhưng KHÔNG HỀ NÓI đến mối quan hệ hoặc nhận định mà câu hỏi đưa ra. Đừng dùng kiến thức thực tế để suy diễn!
                    </div>
                  </div>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm mt-3">2. Ví dụ kinh điển:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Bài đọc: <em>"The company was founded in 1990."</em><br>
                    • Câu hỏi 1: <em>"The company was established in 2005."</em> ➔ <strong>FALSE</strong> (Vì 1990 mâu thuẫn 2005).<br>
                    • Câu hỏi 2: <em>"The company was the most successful business in 1990."</em> ➔ <strong>NOT GIVEN</strong> (Bài chỉ nói thành lập năm 1990, không hề nói có thành công nhất hay không!).
                  </p>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Bài đọc: 'Solar panels are becoming increasingly affordable.' Câu hỏi: 'Solar panels are the cheapest energy source available today.' Đáp án là:",
                  options: ["TRUE", "FALSE", "NOT GIVEN"],
                  ans: "C",
                  exp: "Bài đọc chỉ nói ngày càng có giá hợp lý hơn ('increasingly affordable'), KHÔNG hề khẳng định nó là nguồn năng lượng rẻ nhất ('the cheapest') ➔ NOT GIVEN."
                }
              ]
            },
            {
              id: "les_1_3_3",
              title: "Bài 9: Bẫy Từ Tuyệt Đối (Extreme Words) Trong Reading",
              estTime: "15 phút",
              skill: "reading",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Nhận diện các từ tuyệt đối (Extreme Modifiers):</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Các bài đọc Cambridge là bài viết khoa học học thuật, do đó tác giả luôn dùng từ ngữ cẩn trọng (Hedging). Nếu trong câu hỏi xuất hiện các từ mang tính tuyệt đối:
                  </p>
                  <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono text-purple-600 dark:text-purple-400">
                    ONLY, ALL, ALWAYS, IMPOSSIBLE, INEVITABLE, NEVER, SOLELY
                  </div>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Nếu bài đọc chỉ dùng các từ tương đối như <em>"predominantly, mostly, often, may, tend to"</em> mà câu hỏi dùng <em>"ONLY"</em> ➔ 90% câu đó là <strong>FALSE</strong>!
                  </p>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Bài đọc: 'Wolves mainly hunt in packs during the winter season.' Câu hỏi: 'Wolves hunt exclusively in groups in winter.' Đáp án:",
                  options: ["TRUE", "FALSE", "NOT GIVEN"],
                  ans: "B",
                  exp: "'Mainly' (chủ yếu) khác với 'exclusively' (độc quyền / chỉ duy nhất). Có thể có lúc săn đơn lẻ ➔ Mâu thuẫn ➔ FALSE."
                }
              ]
            }
          ]
        },
        {
          id: "mod_1_4",
          title: "Module 1.4: Speaking & Writing Nền Tảng (Khung A-R-E & Paraphrase)",
          icon: "mic",
          summary: "Tạo lập phản xạ nói mạch lạc không vấp và kỹ năng mở bài viết chuẩn học thuật.",
          lessons: [
            {
              id: "les_1_4_1",
              title: "Bài 10: Khung Phản Xạ 3 Bước A-R-E (Không Bao Giờ Cụt Ý Sau 3 Giây)",
              estTime: "20 phút",
              skill: "speaking",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Nỗi sợ lớn nhất của thí sinh Band 4.0:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Giám khảo hỏi: <em>"Do you like reading books?"</em> ➔ Thí sinh trả lời: <em>"Yes, I like reading books very much."</em> rồi im lặng ngượng ngùng! Đây là câu trả lời Band 4.0.
                  </p>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm mt-3">2. Công thức A-R-E cứu cánh:</h4>
                  <div class="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs space-y-1.5">
                    <p>• <strong>A - Answer (Trả lời trực diện):</strong> "To be honest, I'm really keen on reading..."</p>
                    <p>• <strong>R - Reason (Giải thích vì sao):</strong> "...simply because it allows me to broaden my horizons and unwind after an exhausting day."</p>
                    <p>• <strong>E - Example / Feeling (Ví dụ hoặc Cảm xúc):</strong> "...For instance, I usually delve into self-help books right before bedtime."</p>
                  </div>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Trong khung A-R-E, bước nào giúp kéo dài câu trả lời tự nhiên nhất mà không bị lặp từ?",
                  options: ["Chỉ lặp lại câu hỏi của giám khảo", "Đưa ra lý do (Reason) và một ví dụ/thói quen cá nhân cụ thể (Example)", "Nói thật nhanh rồi dừng lại", "Dịch từng từ tiếng Việt"],
                  ans: "B",
                  exp: "Reason + Example giúp câu trả lời kéo dài 3-4 câu hoàn hảo cho Part 1."
                }
              ]
            },
            {
              id: "les_1_4_2",
              title: "Bài 11: 4 Công Thức Paraphrase Đề Bài Viết Không Bị Đạo Văn",
              estTime: "15 phút",
              skill: "writing",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Tại sao phải Paraphrase câu mở đầu?</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Nếu bạn chép lại y nguyên từ ngữ trong đề bài của Cambridge, giám khảo sẽ gạch bỏ số từ đó và không tính vào tổng số từ bài viết của bạn.
                  </p>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm mt-3">2. 4 Kỹ thuật Paraphrase linh hoạt:</h4>
                  <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs space-y-1.5">
                    <p>• <strong>Kỹ thuật 1: Dùng từ đồng nghĩa (Synonyms)</strong>: The graph shows ➔ The line graph illustrates / reveals.</p>
                    <p>• <strong>Kỹ thuật 2: Chuyển đổi từ loại (Word Family)</strong>: consume energy ➔ energy consumption.</p>
                    <p>• <strong>Kỹ thuật 3: Đổi thể Chủ động ➔ Bị động (Active to Passive)</strong>: People use cars ➔ Cars are utilized by people.</p>
                    <p>• <strong>Kỹ thuật 4: Thay đổi cấu trúc cụm thời gian</strong>: from 2000 to 2010 ➔ over a 10-year period commencing from 2000.</p>
                  </div>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Đề bài: 'The chart shows information about the consumption of energy in the US.' Câu Paraphrase nào sau đây xuất sắc nhất?",
                  options: [
                    "The chart shows energy consumption in the US.",
                    "The provided chart illustrates how much energy was consumed in the United States.",
                    "The chart gives information about energy used by American people.",
                    "The chart displays the number of energy consumed."
                  ],
                  ans: "B",
                  exp: "Câu B dùng 'illustrates' thay 'shows' và chuyển danh từ 'consumption' thành mệnh đề bị động 'how much energy was consumed'."
                }
              ]
            },
            {
              id: "les_1_4_3",
              title: "Bài 12: Tổng Hợp Chiến Thuật & Sẵn Sàng Vượt Chặng 1",
              estTime: "15 phút",
              skill: "all",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">Chúc mừng bạn đã hoàn thành 11 bài học nền tảng!</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Bây giờ bạn đã nắm chắc: nhận diện chữ cái bẫy số, cấu trúc câu phức không liên từ kép, ma trận TRUE/FALSE/NOT GIVEN và khung nói A-R-E.
                  </p>
                  <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-900 dark:text-emerald-200">
                    🎯 <strong>Nhiệm vụ tiếp theo:</strong> Hãy bấm nút <strong>"Làm Bài Thi Vượt Chặng 1"</strong> bên dưới. Đạt từ 80% (16/20 câu), hệ thống sẽ chính thức <strong>MỞ KHÓA CHẶNG 2 (Band 5.0 - 6.0)</strong> cho bạn!
                  </div>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Quy tắc quan trọng nhất để đạt 5.0 vững chắc là gì?",
                  options: [
                    "Học thuộc thật nhiều từ vựng C2 khó",
                    "Triệt tiêu hoàn toàn các lỗi sai căn bản về số, chữ cái, ngữ pháp câu đơn/phức và hiểu bản chất bẫy đề thi",
                    "Làm thật nhanh bỏ qua kiểm tra lại",
                    "Chỉ học một kỹ năng duy nhất"
                  ],
                  ans: "B",
                  exp: "Triệt tiêu lỗi ngớ ngẩn là con đường ngắn nhất đưa bạn từ 4.0 lên 5.0+!"
                }
              ]
            }
          ]
        }
      ],
      checkpointExam: {
        id: "checkpoint_exam_1",
        title: "Bài Thi Điều Kiện Vượt Chặng 1 (Milestone Checkpoint 1)",
        totalQuestions: 20,
        passScore: 16, // 16/20 = 80%
        estTime: "25 phút",
        questions: [
          { qNum: 1, text: "Âm /eɪ/ trong bảng chữ cái tiếng Anh đại diện cho chữ cái nào?", options: ["E", "A", "I", "R"], ans: "B", skill: "Listening" },
          { qNum: 2, text: "Âm /dʒiː/ đại diện cho chữ cái nào?", options: ["J", "G", "Z", "K"], ans: "B", skill: "Listening" },
          { qNum: 3, text: "Người nói trong audio: 'Call me on 0988... sorry, that was old, new one is 0987 112233.' Đáp án đúng:", options: ["0988", "0987 112233", "0988 112233", "0987"], ans: "B", skill: "Listening" },
          { qNum: 4, text: "Nếu câu hỏi yêu cầu 'NO MORE THAN ONE WORD AND/OR A NUMBER', đáp án '15 March' có hợp lệ không?", options: ["Không, vì là 2 từ", "Có, vì gồm 1 số và 1 từ", "Chỉ được viết chữ March", "Chỉ được viết số 15"], ans: "B", skill: "Listening" },
          { qNum: 5, text: "Audio đọc 'two tickets' mà bạn chỉ ghi 'ticket' (thiếu s). Bạn được mấy điểm câu này?", options: ["0.5 điểm", "0 điểm (sai hoàn toàn)", "1 điểm đầy đủ", "Tùy giám khảo"], ans: "B", skill: "Listening" },
          { qNum: 6, text: "Câu nào sau đây mắc lỗi câu què (Sentence Fragment)?", options: ["Although it rained, we went out.", "Because the government raised taxes.", "She passed the exam easily.", "Traffic congestion is severe."], ans: "B", skill: "Grammar" },
          { qNum: 7, text: "Câu nào KHÔNG mắc lỗi liên từ kép?", options: ["Although he is rich, but he is humble.", "Because she worked hard, so she succeeded.", "Although he is rich, he is humble.", "Despite he is rich, but he is humble."], ans: "C", skill: "Grammar" },
          { qNum: 8, text: "Chọn động từ đúng: 'The number of students in the class _________ increasing.'", options: ["are", "is", "were", "have been"], ans: "B", skill: "Grammar" },
          { qNum: 9, text: "Chọn động từ đúng: 'A large proportion of candidates _________ failed the interview.'", options: ["has", "have", "is", "was"], ans: "B", skill: "Grammar" },
          { qNum: 10, text: "Mệnh đề phụ bắt đầu bằng từ nào sau đây KHÔNG thể đứng một mình làm câu hoàn chỉnh?", options: ["Therefore", "However", "Because", "Moreover"], ans: "C", skill: "Grammar" },
          { qNum: 11, text: "Bài đọc: 'The library was founded in 1980.' Câu hỏi: 'The library was established in the late twentieth century.' Đáp án:", options: ["TRUE", "FALSE", "NOT GIVEN"], ans: "A", skill: "Reading" },
          { qNum: 12, text: "Bài đọc: 'Most students commute by bus.' Câu hỏi: 'ALL students travel to school by bus.' Đáp án:", options: ["TRUE", "FALSE", "NOT GIVEN"], ans: "B", skill: "Reading" },
          { qNum: 13, text: "Bài đọc: 'Dr. John spent 5 years researching marine biology.' Câu hỏi: 'Dr. John is the best marine biologist in Europe.' Đáp án:", options: ["TRUE", "FALSE", "NOT GIVEN"], ans: "C", skill: "Reading" },
          { qNum: 14, text: "Trong bài đọc, từ nào sau đây là 'Hard Keyword' nên dùng để scan vị trí trước tiên?", options: ["significant", "Dr. Elizabeth Watson (1998)", "mitigate", "deterioration"], ans: "B", skill: "Reading" },
          { qNum: 15, text: "Khi câu hỏi Reading chứa từ mang tính tuyệt đối như 'ONLY', đáp án có xu hướng là gì nếu bài đọc dùng từ 'mainly'?", options: ["TRUE", "FALSE", "NOT GIVEN"], ans: "B", skill: "Reading" },
          { qNum: 16, text: "Trong Speaking Part 1, khung phản xạ A-R-E bao gồm 3 bước nào?", options: ["Answer - Reason - Example", "Accent - Read - Explain", "Ask - Reply - End", "Action - Result - Evaluation"], ans: "A", skill: "Speaking" },
          { qNum: 17, text: "Khi giám khảo hỏi 'Do you work or are you a student?', câu trả lời nào chuẩn A-R-E nhất?", options: ["I am a student.", "Currently, I am a sophomore majoring in finance because I have always been fascinated by economics. For instance, I spend hours analyzing stock trends.", "Student.", "Yes, I study very hard."], ans: "B", skill: "Speaking" },
          { qNum: 18, text: "Kỹ thuật Paraphrase nào sau đây biến 'people consume oil' thành 'oil consumption by individuals'?", options: ["Đổi thì", "Chuyển đổi từ loại (Word Family)", "Đổi tên riêng", "Viết câu hỏi"], ans: "B", skill: "Writing" },
          { qNum: 19, text: "Trong kỳ thi IELTS Reading, bạn có bao nhiêu phút để chuyển đáp án sang Answer Sheet sau khi đọc xong?", options: ["10 phút giống như Listening", "5 phút", "0 phút (phải ghi trực tiếp vào Answer Sheet trong 60 phút)", "15 phút"], ans: "C", skill: "Mindset" },
          { qNum: 20, text: "Điểm trung bình cộng 4 kỹ năng của bạn là 6.125. Theo quy tắc 0.25, điểm Overall của bạn là bao nhiêu?", options: ["6.0", "6.5", "6.125", "6.25"], ans: "A", skill: "Mindset" }
        ]
      }
    },

    // ==========================================
    // CHẶNG 2: CHIẾN THUẬT & LÀM CHỦ DẠNG BÀI (BAND 5.0 - 6.0)
    // ==========================================
    {
      id: "stage_2",
      stageNum: 2,
      targetBand: "Band 5.0 - 6.0",
      title: "Chặng 2: Làm Chủ Từng Dạng Bài & Nâng Cấp Tư Duy Học Thuật",
      summary: "Chiến thuật chinh phục Listening Section 2 Map & Trắc nghiệm, Reading Matching Headings, Cấu trúc đoạn thân bài PEEL trong Writing và Mindmap 1 phút Speaking Part 2.",
      badge: "Tactical Strategist",
      color: "indigo",
      isDefaultUnlocked: false, // Bị khóa cho đến khi đỗ Chặng 1
      passScorePercent: 80,
      modules: [
        {
          id: "mod_2_1",
          title: "Module 2.1: Listening Section 2 & 3 (Bản Đồ & Trắc Nghiệm Đối Thoại)",
          icon: "map-pin",
          summary: "Xử lý dạng bài bản đồ và phá bẫy Distractor trong cuộc hội thoại 2-3 người.",
          lessons: [
            {
              id: "les_2_1_1",
              title: "Bài 1: Chiến Thuật Bản Đồ Map Labelling (Định Vị Điểm Xuất Phát & Phương Hướng)",
              estTime: "20 phút",
              skill: "listening",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Quy tắc sống còn khi làm bài Map:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Trong bài Map, 80% học sinh mất phương hướng vì không xác định được <strong>Điểm Xuất Phát (Starting Point)</strong>.
                  </p>
                  <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs space-y-1.5">
                    <p>• <strong>Bước 1:</strong> Tìm biểu tượng la bàn (Compass Rose: North, South, East, West) và vị trí lối vào (Entrance / Main Gate / You are here).</p>
                    <p>• <strong>Bước 2:</strong> Đặt ngòi bút tại điểm xuất phát và di chuyển ngòi bút theo lời người nói (Clockwise - cùng chiều kim đồng hồ, Opposite - đối diện, Beside - bên cạnh).</p>
                  </div>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Nếu người hướng dẫn nói: 'Turn left immediately after entering the main gate, then walk straight ahead until you see the pond on your right.' Vị trí cái hồ (pond) nằm ở đâu?",
                  options: ["Bên phải lối vào", "Bên phải con đường sau khi rẽ trái từ cổng chính", "Ở giữa trung tâm", "Đối diện cổng chính"],
                  ans: "B",
                  exp: "Rẽ trái từ cổng chính, đi thẳng, hồ nằm bên tay phải."
                }
              ]
            },
            {
              id: "les_2_1_2",
              title: "Bài 2: Bẫy Gây Nhiễu (Distractor) Trong Trắc Nghiệm Part 2 & 3",
              estTime: "20 phút",
              skill: "listening",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Tại sao cả 3 đáp án A, B, C đều được nhắc đến trong bài nghe?</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Trong câu hỏi trắc nghiệm Cambridge, người nói sẽ nhắc đến CẢ BA lựa chọn A, B và C! Tuy nhiên 2 trong 3 lựa chọn sẽ bị phủ định bằng các từ nối: <em>"We originally thought about...", "However, that is beyond our budget", "It used to be..."</em>.
                  </p>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    💡 <strong>Chiến thuật:</strong> Chỉ chọn đáp án mà người nói ĐỒNG Ý Ở HIỆN TẠI (Present Agreement).
                  </p>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Audio: 'We could take the train, but the tickets are shockingly expensive, so we agreed to hire a minibus.' Phương tiện họ chọn là:",
                  options: ["Train", "Minibus", "Bus", "Walking"],
                  ans: "B",
                  exp: "Train bị phủ định do 'shockingly expensive'. Đáp án thống nhất sau cùng là Minibus."
                }
              ]
            }
          ]
        },
        {
          id: "mod_2_2",
          title: "Module 2.2: Reading Mastery (Matching Headings & Summary Completion)",
          icon: "file-text",
          summary: "Đọc hiểu ý chính đoạn văn và kỹ năng điền từ tóm tắt bài đọc.",
          lessons: [
            {
              id: "les_2_2_1",
              title: "Bài 3: Chiến Thuật Matching Headings 3 Bước Không Cần Dịch Từng Chữ",
              estTime: "25 phút",
              skill: "reading",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Sai lầm phổ biến:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Nhiều bạn thấy đoạn văn có từ nào giống hệt trong Heading là vội vàng chọn ngay Heading đó. Đó là bẫy trùng lặp từ vựng của Cambridge!
                  </p>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm mt-3">2. Quy trình 3 bước chuẩn:</h4>
                  <div class="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs space-y-1.5">
                    <p>• <strong>Bước 1:</strong> Đọc 1-2 câu đầu (Topic sentence) và câu cuối của đoạn văn để bắt Ý Chính (Main Idea).</p>
                    <p>• <strong>Bước 2:</strong> Tự tóm tắt ý chính của đoạn trong 3-4 từ tiếng Việt.</p>
                    <p>• <strong>Bước 3:</strong> Đối chiếu ý tóm tắt đó với danh sách Headings và gạch bỏ các Heading đã chọn.</p>
                  </div>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Câu đầu đoạn: 'The rapid expansion of cities has exerted unprecedented pressure on local freshwater reservoirs.' Heading phù hợp nhất là:",
                  options: ["Economic prosperity in urban areas", "The environmental cost of urban growth on water supplies", "New technologies for city planning", "Traditional farming methods"],
                  ans: "B",
                  exp: "'Expansion of cities' = urban growth; 'pressure on freshwater reservoirs' = environmental cost on water supplies."
                }
              ]
            }
          ]
        },
        {
          id: "mod_2_3",
          title: "Module 2.3: Writing Task 1 & 2 (Overview 0% Số Liệu & Đoạn Văn PEEL)",
          icon: "edit-3",
          summary: "Nâng điểm Task Achievement và Coherence & Cohesion lên mốc 6.0 - 6.5.",
          lessons: [
            {
              id: "les_2_3_1",
              title: "Bài 4: Quy Tắc Vàng 0% Số Liệu Trong Câu Overview Task 1",
              estTime: "20 phút",
              skill: "writing",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Tiêu chí Task Achievement yêu cầu gì ở Overview?</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Giám khảo chấm Writing Task 1 tìm kiếm một câu Overview nêu bật bức tranh tổng thể (Big Picture). Nếu trong Overview bạn viết: <em>"In 2010 the figure was exactly 45.3%"</em> ➔ Bạn sẽ bị kẹt vĩnh viễn ở Band 5.0 tiêu chí Task Achievement!
                  </p>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    💡 <strong>Công thức Overview chuẩn 6.5+:</strong> <em>"Overall, it is clear that while [đối tượng A] experienced a substantial upward trend, the opposite was true for [đối tượng B]. Additionally, [đối tượng C] remained the dominant category throughout the surveyed period."</em>
                  </p>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Câu nào sau đây là câu Overview HỢP LỆ chuẩn mực cho Task 1?",
                  options: [
                    "Overall, the car production in Japan stood at 10 million in 2005.",
                    "Overall, it is noticeable that all sectors experienced growth, with technology remaining the highest contributor throughout the period.",
                    "In 1999 the number was 20% and in 2009 it increased to 40%.",
                    "I think technology is very good."
                  ],
                  ans: "B",
                  exp: "Câu B chỉ khái quát xu hướng tăng trưởng và đối tượng dẫn đầu, 0% chứa số liệu chi tiết."
                }
              ]
            },
            {
              id: "les_2_3_2",
              title: "Bài 5: Cấu Trúc Thân Bài PEEL Task 2 (Point - Explain - Example - Link)",
              estTime: "25 phút",
              skill: "writing",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Cấu trúc một đoạn thân bài chuẩn mực 90-100 từ:</h4>
                  <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs space-y-2">
                    <p>• <strong>P - Point (Câu chủ đề nêu luận điểm):</strong> <em>"One primary benefit of remote work is the reduction in commuting stress."</em></p>
                    <p>• <strong>E - Explanation (Giải thích cơ chế tại sao):</strong> <em>"This is because employees no longer have to endure hours of traffic congestion, which significantly drains mental energy."</em></p>
                    <p>• <strong>E - Example (Dẫn chứng cụ thể):</strong> <em>"For instance, recent surveys conducted in major metropolises reveal that telecommuters report higher job satisfaction."</em></p>
                    <p>• <strong>L - Link (Chốt câu nối về đề bài):</strong> <em>"Consequently, working from home substantially boosts overall workplace productivity."</em></p>
                  </div>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Trong cấu trúc PEEL, vai trò của câu 'Explanation' là gì?",
                  options: [
                    "Kể câu chuyện cá nhân",
                    "Giải thích logic vì sao luận điểm nêu ở câu Point lại đúng và hợp lý",
                    "Đưa số liệu giả định",
                    "Dịch lại câu chủ đề"
                  ],
                  ans: "B",
                  exp: "Explanation đóng vai trò xương sống logic chứng minh cho luận điểm chính."
                }
              ]
            }
          ]
        },
        {
          id: "mod_2_4",
          title: "Module 2.4: Speaking Part 2 Mastery (Lập Dàn Ý Mindmap 1 Phút)",
          icon: "mic-2",
          summary: "Tự tin nói liền mạch 2 phút không bí từ bằng phương pháp PPF (Past - Present - Future).",
          lessons: [
            {
              id: "les_2_4_1",
              title: "Bài 6: Kỹ Thuật Lập Dàn Ý Mindmap 1 Phút Cho Speaking Part 2",
              estTime: "20 phút",
              skill: "speaking",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Chiến thuật tận dụng 1 phút chuẩn bị:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Đừng cố viết cả câu hoàn chỉnh trong 1 phút! Bạn chỉ có đủ thời gian ghi lại <strong>Từ khóa (Keywords)</strong> và <strong>Collocations</strong> theo mô hình 4 nhánh:
                  </p>
                  <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs space-y-1.5">
                    <p>1. Who / What: (Tên người / Đồ vật + 2 tính từ C1 miêu tả)</p>
                    <p>2. When / Where: (Bối cảnh thời gian + địa điểm)</p>
                    <p>3. What happened: (Hành động kịch tính / ấn tượng)</p>
                    <p>4. Why memorable: (Cảm xúc sâu sắc đọng lại: nostalgic, grateful, transformative)</p>
                  </div>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Trong 1 phút chuẩn bị Part 2, hành động nào sau đây là TỐI KỴ?",
                  options: [
                    "Viết từng câu hoàn chỉnh từ đầu đến cuối",
                    "Ghi nhanh 5-6 từ khóa và collocations",
                    "Chia nhánh dàn ý theo 4 câu hỏi gợi ý trên đề bài",
                    "Hít thở sâu để giữ bình tĩnh"
                  ],
                  ans: "A",
                  exp: "Viết cả câu sẽ hết giờ trước khi kịp lên ý tưởng, dẫn đến nói bị ngắt quãng giữa chừng."
                }
              ]
            }
          ]
        }
      ],
      checkpointExam: {
        id: "checkpoint_exam_2",
        title: "Bài Thi Điều Kiện Vượt Chặng 2 (Milestone Checkpoint 2)",
        totalQuestions: 20,
        passScore: 16,
        estTime: "30 phút",
        questions: [
          { qNum: 1, text: "Khi làm bài Listening Map, bước đầu tiên quan trọng nhất là gì?", options: ["Nghe thật kỹ tên các phòng", "Xác định điểm xuất phát (Starting point) và biểu tượng la bàn", "Đoán trước đáp án", "Viết hoa tất cả các từ"], ans: "B", skill: "Listening" },
          { qNum: 2, text: "Trong câu hỏi trắc nghiệm Part 2, khi cả 3 đáp án đều được nhắc đến, ta nên chọn đáp án nào?", options: ["Đáp án được nhắc đến đầu tiên", "Đáp án được nhắc đến cuối cùng", "Đáp án thể hiện sự đồng thuận ở thời điểm hiện tại", "Đáp án có từ dài nhất"], ans: "C", skill: "Listening" },
          { qNum: 3, text: "Cụm từ 'adjacent to' trong bài Map đồng nghĩa với cụm từ nào?", options: ["opposite to", "next to / beside", "far away from", "behind"], ans: "B", skill: "Listening" },
          { qNum: 4, text: "Trong Matching Headings, câu mang ý chính (Topic sentence) thường nằm ở đâu trong đoạn văn?", options: ["Chỉ nằm ở giữa đoạn", "Thường nằm ở 1-2 câu đầu hoặc câu cuối đoạn", "Không bao giờ có trong đoạn", "Nằm ở tiêu đề phụ"], ans: "B", skill: "Reading" },
          { qNum: 5, text: "Nếu một Heading có chứa từ giống hệt một từ trong đoạn văn, khả năng cao đó là gì?", options: ["Chắc chắn là đáp án đúng", "Bẫy từ vựng trùng lặp của Cambridge", "Đoạn văn bị in lỗi", "Bỏ qua không chọn"], ans: "B", skill: "Reading" },
          { qNum: 6, text: "Dạng bài Summary Completion có từ trong khung (box of words) kiểm tra kỹ năng gì?", options: ["Khả năng nhận diện từ đồng nghĩa (Paraphrasing) và loại từ (Word form)", "Khả năng dịch từng chữ", "Khả năng đếm số từ", "Trí nhớ thị giác"], ans: "A", skill: "Reading" },
          { qNum: 7, text: "Quy tắc vàng của câu Overview trong Writing Task 1 là gì?", options: ["Phải chứa ít nhất 5 số liệu chính xác", "0% số liệu chi tiết, chỉ nêu xu hướng và điểm nổi bật nhất", "Viết dài tối thiểu 5 câu", "Đưa ra nhận xét chủ quan cá nhân"], ans: "B", skill: "Writing" },
          { qNum: 8, text: "Từ nào sau đây miêu tả xu hướng TĂNG ĐỘT BIẾN phù hợp với Band 6.5+?", options: ["went up a lot", "witnessed a dramatic surge", "increased big", "became larger"], ans: "B", skill: "Writing" },
          { qNum: 9, text: "Trong mô hình PEEL của Writing Task 2, chữ 'E' thứ nhất đại diện cho gì?", options: ["Emotion", "Explanation (Giải thích cơ chế lý do)", "Ending", "Evaluation"], ans: "B", skill: "Writing" },
          { qNum: 10, text: "Khi viết bài dạng 'Discuss both views', bạn có bắt buộc phải đưa ra quan điểm cá nhân không?", options: ["Không, chỉ thảo luận 2 bên", "Có, phải nêu rõ lập trường cá nhân trong Mở bài, Thân bài và Kết bài", "Chỉ nêu ở kết bài", "Tùy tâm trạng"], ans: "B", skill: "Writing" },
          { qNum: 11, text: "Chiến thuật PPF trong Speaking Part 2 giúp thí sinh điều gì?", options: ["Phát âm chuẩn", "Mở rộng nội dung nói bằng cách liên hệ Quá khứ - Hiện tại - Tương lai", "Nói nhanh hơn", "Nhớ từ vựng"], ans: "B", skill: "Speaking" },
          { qNum: 12, text: "Trong Speaking Part 1, độ dài lý tưởng cho mỗi câu trả lời là bao nhiêu câu?", options: ["1 câu ngắn", "3 đến 4 câu mạch lạc theo khung A-R-E", "Nói liên tục 2 phút", "Không giới hạn"], ans: "B", skill: "Speaking" },
          { qNum: 13, text: "Cụm từ nào sau đây dùng để dẫn chứng ví dụ trong văn viết học thuật Task 2?", options: ["Like for example", "A prime illustration of this is...", "You know that", "As I see"], ans: "B", skill: "Writing" },
          { qNum: 14, text: "Từ 'plummet' trong miêu tả biểu đồ có nghĩa là gì?", options: ["Tăng nhẹ", "Giảm mạnh và đột ngột", "Dao động liên tục", "Giữ nguyên không đổi"], ans: "B", skill: "Writing" },
          { qNum: 15, text: "Khi làm bài thi Reading, tỷ lệ phân bổ thời gian hợp lý cho 3 bài đọc là gì?", options: ["20 phút đều cho mỗi bài", "Khoảng 17 phút Passage 1, 20 phút Passage 2, 23 phút Passage 3", "Dành 40 phút cho Passage 1", "Chỉ làm Passage 3"], ans: "B", skill: "Reading" },
          { qNum: 16, text: "Kỹ thuật 'Hedging' trong văn viết học thuật có tác dụng gì?", options: ["Nói giảm nói tránh, thể hiện tính khách quan cẩn trọng bằng các từ like, may, tend to", "Viết câu thật dài", "Dùng từ cảm thán", "Đặt câu hỏi tu từ"], ans: "A", skill: "Writing" },
          { qNum: 17, text: "Trong tiêu chí Lexical Resource của Speaking, yếu tố nào quan trọng hơn?", options: ["Cố ép các từ cổ xưa hiếm gặp", "Sử dụng Collocations và Idiomatic language tự nhiên, chuẩn ngữ cảnh", "Nói thật to", "Nói giọng Mỹ"], ans: "B", skill: "Speaking" },
          { qNum: 18, text: "Từ nối nào sau đây mang ý nghĩa TƯƠNG PHẢN thể hiện trình độ Band 6.5?", options: ["However / By contrast / Conversely", "And / Also", "So / Therefore", "Because / Since"], ans: "A", skill: "Writing" },
          { qNum: 19, text: "Nếu trong bài nghe Part 3, người nam nói: 'I suppose we could do that', người nữ đáp: 'I have serious doubts about it'. Hai người họ có đồng thuận không?", options: ["Có, họ đồng thuận", "Không, người nữ đang phản đối / nghi ngờ ý tưởng đó", "Chưa thể kết luận", "Họ sẽ cùng làm"], ans: "B", skill: "Listening" },
          { qNum: 20, text: "Mục tiêu điểm số chiến lược để đạt 7.0 Overall dễ nhất đối với học viên Việt Nam là gì?", options: ["Writing 8.0, 3 kỹ năng kia 6.0", "Listening 7.5 + Reading 7.5 + Writing 6.5 + Speaking 6.5", "Speaking 8.5", "Listening 9.0 duy nhất"], ans: "B", skill: "Mindset" }
        ]
      }
    },

    // ==========================================
    // CHẶNG 3: BỨT PHÁ HỌC THUẬT & TARGET 7.0+ (BAND 6.0 - 7.0+)
    // ==========================================
    {
      id: "stage_3",
      stageNum: 3,
      targetBand: "Band 6.0 - 7.0+",
      title: "Chặng 3: Học Thuật Đỉnh Cao, Phản Biện Sâu & Bứt Phá 7.0+",
      summary: "Xử lý bài giảng chuyên ngành Part 4 ở tốc độ 1.2x, chinh phục Reading Passage 3 triết học/tâm lý học, kỹ thuật Danh từ hóa (Nominalization) và phản biện Counter-argument.",
      badge: "Academic Master",
      color: "emerald",
      isDefaultUnlocked: false, // Bị khóa cho đến khi đỗ Chặng 2
      passScorePercent: 80,
      modules: [
        {
          id: "mod_3_1",
          title: "Module 3.1: Listening Mastery Part 4 (Academic Monologue 1.2x)",
          icon: "award",
          summary: "Bắt ngôn ngữ chỉ dẫn (Signposting Language) trong bài giảng giáo sư tốc độ cao.",
          lessons: [
            {
              id: "les_3_1_1",
              title: "Bài 1: Bắt Ngôn Ngữ Chỉ Dẫn (Signposting Language) Trong Part 4",
              estTime: "25 phút",
              skill: "listening",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Bản chất Section 4 Cambridge:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Section 4 là một bài thuyết trình học thuật dài 10 câu liên tục không có thời gian nghỉ ở giữa. Nếu bạn mất dấu (get lost), bạn có thể mất trắng 4-5 câu!
                  </p>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    💡 <strong>Vũ khí định vị - Signposting Language:</strong> Các giáo sư luôn dùng từ chỉ dẫn khi chuyển sang luận điểm mới: <em>"Now let's turn our attention to...", "What surprised researchers most was...", "Regarding the environmental ramifications..."</em>. Hãy gạch chân các tiêu đề phụ trên đề thi để bám sát nhịp điệu của bài nói!
                  </p>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Khi giáo sư nói: 'Moving on to the secondary hypothesis...', điều đó báo hiệu điều gì trên đề thi?",
                  options: ["Bài giảng sắp kết thúc", "Người nói vừa chuyển sang phần tiêu đề phụ tiếp theo trên trang bài thi", "Giáo sư chuẩn bị kể một câu chuyện cười", "Không có ý nghĩa gì"],
                  ans: "B",
                  exp: "Signposting 'Moving on to...' báo hiệu chuyển mục nội dung."
                }
              ]
            }
          ]
        },
        {
          id: "mod_3_2",
          title: "Module 3.2: Reading Passage 3 (Khoa Học, Tâm Lý & Khảo Cổ Học)",
          icon: "book-open",
          summary: "Xử lý Matching Features và Matching Information to Paragraphs không theo thứ tự.",
          lessons: [
            {
              id: "les_3_2_1",
              title: "Bài 2: Chiến Thuật Matching Information To Paragraphs (Dạng Khó Nhất)",
              estTime: "25 phút",
              skill: "reading",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Tại sao Matching Information lại là 'hung thần' Band 7.0?</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Dạng bài này <strong>KHÔNG THEO THỨ TỰ</strong> bài đọc. Câu hỏi số 14 có thể nằm ở đoạn G, câu 15 nằm ở đoạn A. Hơn nữa, một đoạn văn có thể chứa thông tin của hai câu hỏi (NB: You may use any letter more than once).
                  </p>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    💡 <strong>Chiến thuật đảo ngược:</strong> Hãy làm các câu hỏi điền từ hoặc trắc nghiệm chi tiết của Passage 3 TRƯỚC để hiểu rõ nội dung từng đoạn văn, rồi mới quay lại giải Matching Information cuối cùng!
                  </p>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Chiến thuật thông minh nhất khi gặp dạng Matching Information trong Passage 3 là gì?",
                  options: [
                    "Làm ngay đầu tiên rồi mất 35 phút",
                    "Đọc lướt câu hỏi, làm các dạng câu hỏi có thứ tự (như Fill in the blank / MCQ) trước để nắm bản đồ bài đọc, sau đó mới quay lại giải Matching Information",
                    "Khoanh bừa tất cả vào đoạn A",
                    "Bỏ qua không làm"
                  ],
                  ans: "B",
                  exp: "Chiến thuật đảo ngược giúp tiết kiệm 10 phút quý báu trong Passage 3."
                }
              ]
            }
          ]
        },
        {
          id: "mod_3_3",
          title: "Module 3.3: Writing 7.0+ (Nominalization & Luận Điểm Phản Biện)",
          icon: "pen-tool",
          summary: "Biến câu văn mộc mạc thành văn phong học thuật đỉnh cao để chạm mốc Grammatical Range 7.0+.",
          lessons: [
            {
              id: "les_3_3_1",
              title: "Bài 3: Kỹ Thuật Danh Từ Hóa (Nominalization) Nâng Band Thần Tốc",
              estTime: "25 phút",
              skill: "writing",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. So sánh câu văn Band 5.0 vs Band 7.0+:</h4>
                  <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs space-y-2 font-mono">
                    <p class="text-slate-500">• Band 5.0 (Động từ đơn điệu): Many people use their smartphones excessively, so they cannot concentrate on their studies.</p>
                    <p class="text-emerald-500 font-bold">• Band 7.5 (Danh từ hóa): Excessive smartphone usage significantly impairs students' cognitive concentration.</p>
                  </div>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Nhờ biến <em>'use excessively'</em> thành cụm danh từ <em>'Excessive usage'</em>, câu văn trở nên súc tích, cô đọng và đậm chất học thuật Cambridge.
                  </p>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Danh từ hóa câu sau: 'Governments should invest more money in renewable energy.'",
                  options: [
                    "More investment in renewable energy by governments is imperative.",
                    "Government invest money renewable energy.",
                    "Governments should invest.",
                    "Investing money is good."
                  ],
                  ans: "A",
                  exp: "'Invest more money' được danh từ hóa thành 'More investment in renewable energy is imperative'."
                }
              ]
            },
            {
              id: "les_3_3_2",
              title: "Bài 4: Luận Điểm Phản Biện (Counter-Argument & Rebuttal)",
              estTime: "25 phút",
              skill: "writing",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Bí quyết đạt Task Response 7.0+:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Để đạt Band 7.0+ tiêu chí Task Response, bài viết không thể chỉ nêu quan điểm 1 chiều. Bạn phải thể hiện tư duy phản biện (Critical Thinking) bằng cách thừa nhận phản biện của phía đối lập, rồi bẻ gãy nó (Rebuttal):
                  </p>
                  <div class="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs space-y-1.5 font-mono">
                    <p class="text-indigo-400"><strong>Thừa nhận:</strong> It is often argued that artificial intelligence will lead to widespread unemployment.</p>
                    <p class="text-emerald-400"><strong>Bẻ gãy (Rebuttal):</strong> However, this apprehension is largely unfounded, as historical technological revolutions have invariably generated more sophisticated job opportunities than they rendered obsolete.</p>
                  </div>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Kỹ thuật Rebuttal trong đoạn văn phản biện có mục đích gì?",
                  options: [
                    "Đồng ý hoàn toàn với phe đối lập",
                    "Chỉ ra điểm yếu hoặc thiếu sót trong lập luận của đối phương để củng cố quan điểm của mình",
                    "Xin lỗi giám khảo",
                    "Đổi đề bài khác"
                  ],
                  ans: "B",
                  exp: "Rebuttal bẻ gãy lập luận đối phương để khẳng định quan điểm bản thân."
                }
              ]
            }
          ]
        },
        {
          id: "mod_3_4",
          title: "Module 3.4: Speaking Part 3 (Macro Discussion & Abstract Speculation)",
          icon: "mic",
          summary: "Thảo luận các chủ đề trừu tượng tầm vĩ mô và ngôn ngữ giả định chuẩn 7.0+.",
          lessons: [
            {
              id: "les_3_4_1",
              title: "Bài 5: Thảo Luận Vĩ Mô Bằng Ngôn Ngữ Giả Định (Speculation Language)",
              estTime: "20 phút",
              skill: "speaking",
              theory: `
                <div class="space-y-3">
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">1. Khác biệt giữa Speaking Part 1 và Part 3:</h4>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    Trong Part 3, giám khảo KHÔNG hỏi về cá nhân bạn ("Do you like..."). Họ hỏi về xã hội nói chung ("How will technology impact society?"). Do đó, tuyệt đối không dùng <em>"In my personal experience..."</em>!
                  </p>
                  <p class="text-xs text-slate-600 dark:text-slate-300">
                    💡 <strong>Các mẫu câu giả định vĩ mô 7.5:</strong><br>
                    • <em>"From a socio-economic standpoint, it is highly probable that..."</em><br>
                    • <em>"One cannot overlook the psychological ramifications of..."</em><br>
                    • <em>"While some skeptics argue that..., the empirical evidence suggests otherwise."</em>
                  </p>
                </div>
              `,
              practiceDrill: [
                {
                  q: "Khi giám khảo hỏi: 'Will robots replace human teachers in the future?', câu mở đầu nào thể hiện tư duy Band 7.5?",
                  options: [
                    "Yes, I think so.",
                    "From a pedagogical perspective, while AI can automate administrative duties, it is highly improbable that machines will replicate the empathetic connection of a human educator.",
                    "My teacher said no.",
                    "Robot is very smart."
                  ],
                  ans: "B",
                  exp: "Câu B dùng từ vựng sư phạm 'pedagogical perspective', 'empathetic connection' và lập luận cân bằng xuất sắc."
                }
              ]
            }
          ]
        }
      ],
      checkpointExam: {
        id: "checkpoint_exam_3",
        title: "Bài Thi Tốt Nghiệp Target 7.0+ (Grand Graduation Exam)",
        totalQuestions: 20,
        passScore: 16,
        estTime: "35 phút",
        questions: [
          { qNum: 1, text: "Signposting Language trong Listening Part 4 có chức năng gì?", options: ["Để kéo dài thời gian", "Định vị sự chuyển hướng luận điểm của bài giảng giáo sư", "Làm bài nghe khó hơn", "Bỏ qua"], ans: "B", skill: "Listening" },
          { qNum: 2, text: "Hiện tượng nối âm và nuốt âm (Connected Speech) xảy ra phổ biến nhất ở phần thi nào?", options: ["Part 1", "Part 2", "Part 4 (bài giảng học thuật)", "Đọc bài"], ans: "C", skill: "Listening" },
          { qNum: 3, text: "Trong dạng bài Matching Information to Paragraphs, thứ tự xuất hiện các câu hỏi như thế nào?", options: ["Theo thứ tự từ trên xuống dưới", "Hoàn toàn ngẫu nhiên, không theo thứ tự đoạn văn", "Luôn nằm ở đoạn cuối", "Theo vần chữ cái"], ans: "B", skill: "Reading" },
          { qNum: 4, text: "Kỹ thuật Nominalization trong Writing Task 2 giúp thí sinh cải thiện tiêu chí chấm điểm nào mạnh mẽ nhất?", options: ["Pronunciation", "Grammatical Range & Accuracy và Lexical Resource", "Task Achievement", "Không có tác dụng"], ans: "B", skill: "Writing" },
          { qNum: 5, text: "Câu văn: 'Excessive carbon emissions exacerbate global warming' là ví dụ của kỹ thuật gì?", options: ["Thơ văn", "Danh từ hóa và sử dụng động từ học thuật C1 (exacerbate)", "Câu ghép đơn giản", "Dịch từng từ"], ans: "B", skill: "Writing" },
          { qNum: 6, text: "Trong Speaking Part 3, khi được hỏi câu hỏi vĩ mô, ta nên tiếp cận theo góc nhìn nào?", options: ["Chỉ kể chuyện cá nhân bản thân", "Góc nhìn xã hội, kinh tế, tâm lý học hoặc xu hướng cộng đồng", "Nói về sở thích ăn uống", "Im lặng"], ans: "B", skill: "Speaking" },
          { qNum: 7, text: "Cụm từ nào sau đây mang tính học thuật thể hiện sự cẩn trọng (Hedging)?", options: ["100% definitely sure", "Evidence appears to suggest that...", "Everybody knows", "Without any doubt"], ans: "B", skill: "Writing" },
          { qNum: 8, text: "Trong Writing Task 1 dạng Process (Quy trình), thì nào là thì chủ đạo?", options: ["Quá khứ hoàn thành", "Hiện tại đơn thể bị động (Passive Voice)", "Tương lai đơn", "Hiện tại tiếp diễn"], ans: "B", skill: "Writing" },
          { qNum: 9, text: "Khi bài đọc Reading dùng cụm 'deteriorate rapidly', câu hỏi paraphrase bằng từ nào?", options: ["improve swiftly", "decline or worsen substantially", "remain steady", "stop working"], ans: "B", skill: "Reading" },
          { qNum: 10, text: "Để đạt điểm Lexical Resource 7.0+ trong Writing Task 2, tỷ lệ Collocations học thuật nên chiếm khoảng bao nhiêu?", options: ["0%", "Khoảng 15-20% từ ngữ được kết hợp tự nhiên theo collocations chuẩn", "100% phải là từ hiếm gặp", "Chỉ dùng từ ngắn"], ans: "B", skill: "Writing" },
          { qNum: 11, text: "Cấu trúc đảo ngữ 'Not only... but also' nâng điểm ngữ pháp như thế nào?", options: ["Đảo trợ động từ lên trước chủ ngữ ở vế đầu", "Viết hoa toàn bộ", "Bỏ dấu chấm câu", "Không thay đổi gì"], ans: "A", skill: "Writing" },
          { qNum: 12, text: "Kỹ thuật Rebuttal giúp bài viết Task 2 đạt band điểm cao ở tiêu chí nào?", options: ["Task Response (Thể hiện tư duy phản biện đa chiều)", "Cohesion", "Grammar", "Spelling"], ans: "A", skill: "Writing" },
          { qNum: 13, text: "Trong bài thi Speaking, tiêu chí Fluency and Coherence đánh giá điều gì?", options: ["Nói thật nhanh không kịp thở", "Độ trôi chảy, nhịp điệu tự nhiên, sử dụng từ nối mượt mà và không ngập ngừng quá lâu", "Nói chuẩn giọng Oxford", "Nói to"], ans: "B", skill: "Speaking" },
          { qNum: 14, text: "Cụm 'render something obsolete' có nghĩa là gì trong văn học thuật?", options: ["Làm cho cái gì đó trở nên lỗi thời, không còn hữu dụng", "Sửa chữa đồ dùng", "Mua đồ mới", "Vẽ tranh"], ans: "A", skill: "Writing" },
          { qNum: 15, text: "Trong Reading Passage 3, chiến thuật đọc quét (Scan) có còn hiệu quả 100% như Passage 1 không?", options: ["Có, y hệt", "Không, vì Passage 3 sử dụng Paraphrasing mức độ cao và yêu cầu đọc hiểu toàn văn (In-depth Comprehension)", "Không cần đọc", "Chỉ cần nhìn hình"], ans: "B", skill: "Reading" },
          { qNum: 16, text: "Để chuyển từ Band 6.0 lên 7.0 Speaking, điều gì tạo nên bước nhảy vọt?", options: ["Nói giọng Anh - Mỹ", "Sử dụng các cấu trúc câu phức tạp linh hoạt, ít lỗi ngữ pháp hệ thống và từ vựng mang tính thành ngữ/chủ đề sâu sắc", "Học thuộc 100 bài mẫu", "Cười nhiều với giám khảo"], ans: "B", skill: "Speaking" },
          { qNum: 17, text: "Từ đồng nghĩa học thuật C1 của 'cause' trong câu 'Pollution causes health problems' là gì?", options: ["makes", "constitutes a primary catalyst for / precipitates", "does", "gives"], ans: "B", skill: "Writing" },
          { qNum: 18, text: "Khi gặp bài nghe Section 4 bị lỡ một câu, chiến thuật khôn ngoan nhất là gì?", options: ["Ngồi nghĩ lại câu đó đến khi nhớ ra", "Lập tức bỏ qua và bám ngay vào từ khóa của câu tiếp theo để không bị mất cả chuỗi câu sau", "Dừng bài thi", "Khóc"], ans: "B", skill: "Listening" },
          { qNum: 19, text: "Trong Writing Task 1, dạng bài nào thường sử dụng thì Quá khứ đơn nhiều nhất?", options: ["Biểu đồ có mốc thời gian cố định trong quá khứ (ví dụ: 1990 - 2010)", "Quy trình làm bánh", "Biểu đồ tương lai năm 2050", "Bản đồ quy hoạch tương lai"], ans: "A", skill: "Writing" },
          { qNum: 20, text: "Bạn đã vượt qua toàn bộ 3 chặng học tập với điểm số trên 80%. Điều này chứng minh điều gì?", options: ["Bạn đã làm chủ toàn diện từ nền tảng 4.0 đến tư duy học thuật 7.0+ chuẩn Cambridge!", "Chưa đủ kiến thức", "Cần học lại từ đầu", "Không có ý nghĩa gì"], ans: "A", skill: "Mindset" }
        ]
      }
    }
  ]
};
