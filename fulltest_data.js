// fulltest_data.js - Dữ liệu Đề Thi Thử Full Test 40 Câu Chuẩn Cambridge IELTS

const IELTS_BAND_TABLE = {
  reading: {
    39: 9.0, 40: 9.0,
    37: 8.5, 38: 8.5,
    35: 8.0, 36: 8.0,
    33: 7.5, 34: 7.5,
    30: 7.0, 31: 7.0, 32: 7.0,
    27: 6.5, 28: 6.5, 29: 6.5,
    23: 6.0, 24: 6.0, 25: 6.0, 26: 6.0,
    19: 5.5, 20: 5.5, 21: 5.5, 22: 5.5,
    15: 5.0, 16: 5.0, 17: 5.0, 18: 5.0,
    13: 4.5, 14: 4.5,
    10: 4.0, 11: 4.0, 12: 4.0,
    8: 3.5, 9: 3.5
  },
  listening: {
    39: 9.0, 40: 9.0,
    37: 8.5, 38: 8.5,
    35: 8.0, 36: 8.0,
    32: 7.5, 33: 7.5, 34: 7.5,
    30: 7.0, 31: 7.0,
    26: 6.5, 27: 6.5, 28: 6.5, 29: 6.5,
    23: 6.0, 24: 6.0, 25: 6.0,
    18: 5.5, 19: 5.5, 20: 5.5, 21: 5.5, 22: 5.5,
    16: 5.0, 17: 5.0,
    13: 4.5, 14: 4.5, 15: 4.5,
    10: 4.0, 11: 4.0, 12: 4.0,
    8: 3.5, 9: 3.5
  }
};

const FULL_READING_TEST = {
  title: "Cambridge Academic Reading Simulation - Test 01",
  durationMinutes: 60,
  totalQuestions: 40,
  passages: [
    {
      id: "p1",
      number: 1,
      title: "Passage 1: The Roman Colosseum and Ancient Engineering",
      wordCount: 750,
      content: `
        The Colosseum, situated in the heart of Rome, stands as an enduring monument to Roman imperial power and architectural ingenuity. Commissioned around AD 70-72 by Emperor Vespasian of the Flavian dynasty, the colossal amphitheatre was completed in AD 80 under his successor, Titus. Further modifications were subsequently executed during the reign of Domitian. These three emperors are collectively known as the Flavian dynasty, and the amphitheatre was originally designated the Flavian Amphitheatre (Amphitheatrum Flavium) before acquiring its colloquial moniker from the nearby bronze colossus of Nero.

        Constructed predominantly of travertine limestone, volcanic tuff, and brick-faced concrete, the structure was capable of accommodating an estimated 50,000 to 80,000 spectators. Its primary purpose was the hosting of gladiatorial contests, public spectacles, and dramatic re-enactments of historic naval engagements, for which the arena basin was momentarily flooded using a sophisticated subterranean aqueduct system. The arena floor comprised a timber platform overlaying an intricate subterranean labyrinth known as the hypogeum, composed of two levels of cages, mechanical winches, and hydraulic lifts designed to elevate ferocious beasts and gladiators seamlessly into the arena.

        Spectator segregation within the amphitheatre strictly mirrored the rigid hierarchical stratifications of Roman society. Special boxes situated at the north and south ends afforded prestigious vantage points for the Emperor and the Vestal Virgins, respectively. The adjacent tier accommodated senators, followed in ascending order by noble knights (equites), ordinary citizens (plebeians), and finally impoverished women and enslaved persons relegated to the topmost wooden bleachers.

        Despite enduring devastating earthquakes, stone-robbing pillagers, and atmospheric pollution across two millennia, the Colosseum remains an iconic international tourist attraction and an internationally recognized emblem of classical antiquity.
      `,
      questions: [
        { qNum: 1, type: "tfng", text: "The Colosseum was originally commissioned by Emperor Titus.", ans: "FALSE", exp: "Passage states it was commissioned by Emperor Vespasian, not Titus." },
        { qNum: 2, type: "tfng", text: "The structure was renamed after a massive bronze statue of Nero situated in the vicinity.", ans: "TRUE", exp: "Passage: 'before acquiring its colloquial moniker from the nearby bronze colossus of Nero'." },
        { qNum: 3, type: "tfng", text: "Timber was the predominant material utilized for the outer walls.", ans: "FALSE", exp: "Constructed predominantly of travertine limestone, volcanic tuff, and concrete; timber was only used for the arena floor platform." },
        { qNum: 4, type: "tfng", text: "The arena could be flooded with water for mock naval battles.", ans: "TRUE", exp: "Passage states the arena basin was momentarily flooded using aqueducts for historic naval engagements." },
        { qNum: 5, type: "tfng", text: "Enslaved persons and impoverished women occupied the tiers closest to the arena.", ans: "FALSE", exp: "They were relegated to the topmost wooden bleachers, furthest from the arena floor." },
        { qNum: 6, type: "tfng", text: "Earthquakes caused the total collapse of the Colosseum in the medieval period.", ans: "FALSE", exp: "It endured earthquakes and still remains an iconic tourist attraction today." },
        { qNum: 7, type: "fill", text: "The sophisticated subterranean complex below the arena was named the _________.", ans: "hypogeum", exp: "Passage: 'intricate subterranean labyrinth known as the hypogeum'." },
        { qNum: 8, type: "fill", text: "Gladiatorial platforms used _________ lifts to hoist wild animals up into the arena.", ans: "hydraulic", exp: "Passage: 'mechanical winches, and hydraulic lifts designed to elevate ferocious beasts'." },
        { qNum: 9, type: "fill", text: "The highest seating area was made of _________ bleachers.", ans: "wooden", exp: "Passage: 'relegated to the topmost wooden bleachers'." },
        { qNum: 10, type: "fill", text: "The south vantage box was specially reserved for the _________ Virgins.", ans: "vestal", exp: "Passage: 'for the Emperor and the Vestal Virgins, respectively'." },
        { qNum: 11, type: "mcq", text: "The estimated spectator capacity of the Colosseum was:", options: ["10,000 to 20,000", "50,000 to 80,000", "Over 100,000", "Under 40,000"], ans: "B", exp: "Passage mentions: 'accommodating an estimated 50,000 to 80,000 spectators'." },
        { qNum: 12, type: "mcq", text: "Which material made up the main arena surface platform?", options: ["Volcanic tuff", "Travertine stone", "Timber", "Marble"], ans: "C", exp: "Passage states: 'The arena floor comprised a timber platform'." },
        { qNum: 13, type: "mcq", text: "What primary purpose did the mechanical winches serve?", options: ["Draining flood water", "Lifting animals and fighters", "Repairing the upper roof", "Securing seating tiers"], ans: "B", exp: "Passage: 'designed to elevate ferocious beasts and gladiators'." }
      ]
    },
    {
      id: "p2",
      number: 2,
      title: "Passage 2: The Proliferation of Artificial Intelligence in Healthcare",
      wordCount: 850,
      content: `
        The integration of artificial intelligence (AI) into contemporary medical diagnostics represents a transformative paradigm shift in healthcare delivery. Machine learning algorithms, particularly deep convolutional neural networks (CNNs), are increasingly capable of interpreting complex medical imagery—ranging from radiographic mammograms to magnetic resonance imaging (MRI) scans—with clinical precision rivaling, and in certain controlled trials exceeding, certified radiologists.

        One prominent breakthrough centers on early oncological detection. Malignant cellular anomalies often present subtle morphological alterations that elude human perception during routine visual screenings. By contrast, predictive models trained on multimillion-image databases can identify micro-calcifications and subtle tissue densities indicative of early-stage breast or pulmonary carcinoma months ahead of conventional clinical diagnoses. Consequently, patient prognosis is vastly augmented through timely therapeutic intervention.

        Nevertheless, medical ethicists and bioengineers emphasize persistent hurdles, notably algorithmic opacity, colloquially termed the 'black box' phenomenon. When an advanced algorithm renders a diagnosis, human clinicians are often incapable of inspecting the exact logical trajectory leading to that deduction. This opacity creates severe accountability ambiguities in medical malpractice litigation: if an autonomous diagnostic tool misinterprets a benign lesion as malignant, liability remains legally contested between software vendors, hospital administrators, and the attending physician.

        Moreover, demographic bias in training corpora poses acute equitable risks. If diagnostic datasets are disproportionately culled from affluent Caucasian cohorts, the algorithm's diagnostic fidelity drops precipitously when deployed across minority ethnic populations. Ensuring global equitable access demands rigorous algorithmic auditing and geographically heterogeneous training datasets.
      `,
      questions: [
        { qNum: 14, type: "tfng", text: "Convolutional neural networks have matched radiologists in specific diagnostic imaging trials.", ans: "TRUE", exp: "Passage: 'with clinical precision rivaling, and in certain controlled trials exceeding, certified radiologists'." },
        { qNum: 15, type: "tfng", text: "Human radiologists can easily detect all microscopic calcifications during visual exams.", ans: "FALSE", exp: "Passage: 'Malignant cellular anomalies often present subtle morphological alterations that elude human perception'." },
        { qNum: 16, type: "tfng", text: "Most countries have passed comprehensive laws clarifying legal liability for AI diagnostic errors.", ans: "NOT GIVEN", exp: "The passage notes liability remains legally contested, but does not state whether most countries have passed laws." },
        { qNum: 17, type: "tfng", text: "Diagnostic models trained on homogenous datasets perform equally well on all ethnic groups.", ans: "FALSE", exp: "Passage: 'diagnostic fidelity drops precipitously when deployed across minority ethnic populations'." },
        { qNum: 18, type: "fill", text: "The inability of doctors to trace an algorithm's internal deduction is called the _________ phenomenon.", ans: "black box", exp: "Passage: 'algorithmic opacity, colloquially termed the black box phenomenon'." },
        { qNum: 19, type: "fill", text: "Early detection of cancer is especially critical in breast and _________ carcinoma.", ans: "pulmonary", exp: "Passage: 'early-stage breast or pulmonary carcinoma'." },
        { qNum: 20, type: "fill", text: "Biased training datasets can be remedied by utilizing _________ collections of data.", ans: "heterogeneous", exp: "Passage: 'geographically heterogeneous training datasets'." },
        { qNum: 21, type: "mcq", text: "What is the primary advantage of predictive models in oncology?", options: ["Reducing hospital expenditure", "Detecting microscopic anomalies much earlier", "Replacing surgeons completely", "Eliminating chemotherapy"], ans: "B", exp: "Passage emphasizes identifying subtle anomalies months ahead of conventional clinical diagnoses." },
        { qNum: 22, type: "mcq", text: "The 'black box' problem in AI refers to:", options: ["Physical damage to computers", "Inability to understand the AI's internal reasoning", "High cost of software licenses", "Slow internet connections in hospitals"], ans: "B", exp: "Passage: 'human clinicians are often incapable of inspecting the exact logical trajectory leading to that deduction'." },
        { qNum: 23, type: "mcq", text: "Who currently bears undisputed legal liability for AI errors according to the text?", options: ["Software vendors solely", "Attending physicians only", "Nobody, it remains legally contested", "Hospital administrators exclusively"], ans: "C", exp: "Passage states: 'liability remains legally contested between software vendors, hospital administrators, and the attending physician'." },
        { qNum: 24, type: "fill", text: "Neural networks are trained on _________ image databases.", ans: "multimillion", exp: "Passage: 'trained on multimillion-image databases'." },
        { qNum: 25, type: "fill", text: "Convolutional neural networks are abbreviated as _________.", ans: "cnn", exp: "Passage: 'convolutional neural networks (CNNs)'." },
        { qNum: 26, type: "mcq", text: "What is the overall tone of the author regarding AI in healthcare?", options: ["Dismissive and hostile", "Optimistic yet cautiously highlighting risks", "Unconditionally enthusiastic", "Indifferent and neutral"], ans: "B", exp: "The author praises benefits in paragraphs 1-2 but clearly details ethics, liability and bias risks in paragraphs 3-4." }
      ]
    },
    {
      id: "p3",
      number: 3,
      title: "Passage 3: Bioluminescence in Deep-Sea Marine Organisms",
      wordCount: 900,
      content: `
        Beneath the photic zone—the upper two hundred meters of the ocean where sunlight penetrates—lies a realm of perpetual darkness. In this bathypelagic abyss, hydrostatic pressure is crushing and ambient temperatures hover near freezing. Yet, far from being a barren wasteland, the deep ocean teems with life, more than ninety percent of whose inhabitants generate their own living light through a biochemical process known as bioluminescence.

        Unlike incandescence, where light is a byproduct of high thermal energy, bioluminescence is virtually one hundred percent 'cold light,' losing negligible energy to heat. The chemical reaction fundamentally requires two core components: a light-emitting pigment designated luciferin, and an enzyme or photoprotein termed luciferase. In the presence of dissolved oxygen and cellular co-factors such as adenosine triphosphate (ATP) or calcium ions, luciferase catalyzes the oxidation of luciferin, yielding oxyluciferin in an electronically excited state. As this molecule returns to its ground state, it releases photons primarily in the blue-green spectrum (wavelengths approximately 470 nanometers), which travels farthest through saline ocean water.

        Marine organisms harness this extraordinary capacity for three quintessential ecological purposes: predation, defense, and intraspecific communication. The deep-sea anglerfish (*Melanocetus johnsonii*) famously exhibits an illuminated dorsal lure containing symbiotic bioluminescent bacteria, mesmerizing inquisitive prey directly into its cavernous jaws. Conversely, numerous pelagic squids and mesopelagic hatchetfish utilize counter-illumination; by emitting downward-directed light matching the intensity and color of residual downwelling sunlight from the surface, they effectively obliterate their silhouettes from predators lurking below.

        Finally, when assaulted, several species of brittle stars and siphonophores discharge luminous decoys or clouds of glowing mucus, temporarily blinding predators and granting the organism crucial seconds to evade capture.
      `,
      questions: [
        { qNum: 27, type: "tfng", text: "More than ninety percent of organisms in the bathypelagic zone produce biological light.", ans: "TRUE", exp: "Passage: 'more than ninety percent of whose inhabitants generate their own living light'." },
        { qNum: 28, type: "tfng", text: "Bioluminescence generates immense amounts of thermal heat energy.", ans: "FALSE", exp: "Passage states: 'bioluminescence is virtually one hundred percent cold light, losing negligible energy to heat'." },
        { qNum: 29, type: "tfng", text: "Red wavelengths travel further through deep saline ocean water than blue-green light.", ans: "FALSE", exp: "Passage states blue-green spectrum 'travels farthest through saline ocean water'." },
        { qNum: 30, type: "tfng", text: "The anglerfish produces all of its light using its own internal glandular cells rather than bacteria.", ans: "FALSE", exp: "Passage: 'illuminated dorsal lure containing symbiotic bioluminescent bacteria'." },
        { qNum: 31, type: "fill", text: "The light-emitting substrate pigment is scientifically designated _________.", ans: "luciferin", exp: "Passage: 'a light-emitting pigment designated luciferin'." },
        { qNum: 32, type: "fill", text: "The enzyme that catalyzes the oxidation reaction is called _________.", ans: "luciferase", exp: "Passage: 'an enzyme or photoprotein termed luciferase'." },
        { qNum: 33, type: "fill", text: "Counter-illumination allows marine animals to conceal their _________ from bottom predators.", ans: "silhouettes", exp: "Passage: 'effectively obliterate their silhouettes from predators lurking below'." },
        { qNum: 34, type: "fill", text: "The light emitted has a wavelength of approximately _________ nanometers.", ans: "470", exp: "Passage: 'wavelengths approximately 470 nanometers'." },
        { qNum: 35, type: "fill", text: "The upper 200 meters of the ocean where sunlight enters is the _________ zone.", ans: "photic", exp: "Passage: 'Beneath the photic zone—the upper two hundred meters'." },
        { qNum: 36, type: "mcq", text: "What is counter-illumination used for?", options: ["Mating displays", "Camouflage and defense", "Hunting smaller fish", "Navigating undersea caves"], ans: "B", exp: "Passage describes counter-illumination as a defensive mechanism to hide from predators." },
        { qNum: 37, type: "mcq", text: "Which molecule provides cellular energy for the bioluminescent reaction?", options: ["Chlorophyll", "ATP", "Hemoglobin", "Keratin"], ans: "B", exp: "Passage mentions: 'adenosine triphosphate (ATP) or calcium ions'." },
        { qNum: 38, type: "mcq", text: "Why is blue-green light the dominant bioluminescent color in deep seas?", options: ["It requires the least oxygen", "It travels the greatest distance in ocean water", "Predators are completely blind to it", "It generates warmth for the organism"], ans: "B", exp: "Passage: 'which travels farthest through saline ocean water'." },
        { qNum: 39, type: "fill", text: "Attacked brittle stars can release glowing _________ to confuse predators.", ans: "mucus", exp: "Passage: 'discharge luminous decoys or clouds of glowing mucus'." },
        { qNum: 40, type: "mcq", text: "What is the best title for Passage 3?", options: ["Deep-Sea Ocean Pressures", "The Biochemical Mechanism and Functions of Marine Bioluminescence", "The Threat of Overfishing in Photic Zones", "Bacterial Symbiosis in Shallow Waters"], ans: "B", exp: "The passage comprehensively explains both the biochemical mechanism and the 3 key ecological functions of bioluminescence." }
      ]
    }
  ]
};

const FULL_LISTENING_TEST = {
  title: "Cambridge Academic Listening Simulation - Test 01",
  durationMinutes: 30,
  totalQuestions: 40,
  sections: [
    {
      sectionNum: 1,
      title: "Section 1: Community Centre Room Booking",
      audioTrack: "audio/listening_part1_foundation.mp3",
      questions: [
        { qNum: 1, type: "fill", prompt: "Name of customer: Arthur _________", ans: "kensington", exp: "Surname spelled out K-E-N-S-I-N-G-T-O-N." },
        { qNum: 2, type: "fill", prompt: "Contact phone number: _________", ans: "07700900543", exp: "Phone 07700 900543." },
        { qNum: 3, type: "fill", prompt: "Delivery postcode: _________", ans: "sw1a 2aa", exp: "Postcode SW1A 2AA." },
        { qNum: 4, type: "fill", prompt: "Preferred time: in the _________", ans: "afternoon", exp: "Preferred time: afternoon (between 2 PM and 4 PM)." },
        { qNum: 5, type: "fill", prompt: "Number of guests expected: _________", ans: "45", exp: "45 people expected." },
        { qNum: 6, type: "fill", prompt: "Type of event: a _________ party", ans: "birthday", exp: "Celebration is for a birthday." },
        { qNum: 7, type: "fill", prompt: "Equipment requested: a sound system and _________", ans: "projector", exp: "Sound system and projector." },
        { qNum: 8, type: "fill", prompt: "Deposit amount: £_________", ans: "150", exp: "Deposit of 150 pounds." },
        { qNum: 9, type: "fill", prompt: "Catering option chosen: _________ buffet", ans: "vegetarian", exp: "Vegetarian buffet." },
        { qNum: 10, type: "fill", prompt: "Hall booked: The _________ Suite", ans: "jubilee", exp: "Jubilee Suite." }
      ]
    },
    {
      sectionNum: 2,
      title: "Section 2: City Library Orientation & Map",
      audioTrack: "audio/listening_part2_tactical.mp3",
      questions: [
        { qNum: 11, type: "mcq", prompt: "When was the new city library branch opened?", options: ["In 2018", "In 2021", "Last month", "Two years ago"], ans: "B", exp: "Branch opened in 2021." },
        { qNum: 12, type: "mcq", prompt: "Borrowers can take out up to how many books at once?", options: ["5", "10", "15", "20"], ans: "C", exp: "Maximum allowance is 15 books." },
        { qNum: 13, type: "fill", prompt: "The computer suite is situated opposite the _________.", ans: "cafe", exp: "Opposite the cafe." },
        { qNum: 14, type: "fill", prompt: "The meeting room is on your right just before the _________.", ans: "emergency exit", exp: "Just before the emergency exit." },
        { qNum: 15, type: "mcq", prompt: "The library is closed on:", options: ["Mondays", "Wednesdays", "Sundays", "Fridays"], ans: "C", exp: "Closed on Sundays." },
        { qNum: 16, type: "fill", prompt: "Children's storytelling takes place every _________ morning.", ans: "saturday", exp: "Every Saturday morning." },
        { qNum: 17, type: "fill", prompt: "Printing fee per black & white page is _________ pence.", ans: "10", exp: "10p per page." },
        { qNum: 18, type: "mcq", prompt: "Where are audiobooks located?", options: ["Ground floor", "First floor", "Basement", "Archive"], ans: "A", exp: "Audiobooks on ground floor." },
        { qNum: 19, type: "fill", prompt: "Borrowing period for DVDs is _________ days.", ans: "7", exp: "DVD borrowing period is 7 days." },
        { qNum: 20, type: "fill", prompt: "Late penalty fee per day is £_________ per book.", ans: "0.50", exp: "50p penalty." }
      ]
    },
    {
      sectionNum: 3,
      title: "Section 3: Student Seminar on Sustainable Architecture",
      audioTrack: "audio/listening_part2_tactical.mp3",
      questions: [
        { qNum: 21, type: "mcq", prompt: "What surprised Sarah most about straw bale construction?", options: ["High cost", "Remarkable fire resistance", "Difficulty to transport", "Lack of durability"], ans: "B", exp: "Dense compacted straw exhibits surprising fire resistance." },
        { qNum: 22, type: "mcq", prompt: "Why did Mark reject concrete in his model?", options: ["High carbon footprint", "Weight issues", "Unpleasant appearance", "Short lifespan"], ans: "A", exp: "Concrete has a massive embodied carbon footprint." },
        { qNum: 23, type: "fill", prompt: "Solar panels installed on the roof generate _________ percent of building electricity.", ans: "65", exp: "Generates 65% of electricity." },
        { qNum: 24, type: "fill", prompt: "Rainwater is stored in underground _________ for garden irrigation.", ans: "tanks", exp: "Underground tanks." },
        { qNum: 25, type: "fill", prompt: "Thermal insulation was enhanced using recycled _________ fibres.", ans: "denim", exp: "Recycled denim fibres." },
        { qNum: 26, type: "mcq", prompt: "The tutor advised the students to focus their presentation on:", options: ["Financial budgets", "Passive ventilation design", "Historical buildings", "Interior furniture"], ans: "B", exp: "Focus on passive ventilation." },
        { qNum: 27, type: "fill", prompt: "The project must be submitted by Friday at _________ PM.", ans: "5", exp: "Deadline is 5 PM." },
        { qNum: 28, type: "fill", prompt: "Word limit for the written summary is _________ words.", ans: "2000", exp: "2000 words." },
        { qNum: 29, type: "mcq", prompt: "Which software did they use for 3D modeling?", options: ["AutoCAD", "SketchUp", "Revit", "Blender"], ans: "C", exp: "They used Revit." },
        { qNum: 30, type: "mcq", prompt: "What percentage of the grade is the seminar presentation?", options: ["10%", "25%", "40%", "50%"], ans: "B", exp: "Presentation is worth 25%." }
      ]
    },
    {
      sectionNum: 4,
      title: "Section 4: University Lecture on Marine Wetlands",
      audioTrack: "audio/listening_part4_academic.mp3",
      questions: [
        { qNum: 31, type: "fill", prompt: "Wetlands serve as natural _________ against storm surges.", ans: "buffers", exp: "Coastal wetlands serve as natural buffers." },
        { qNum: 32, type: "fill", prompt: "Wetlands possess high capacity for carbon _________.", ans: "sequestration", exp: "Capacity for carbon sequestration." },
        { qNum: 33, type: "fill", prompt: "Mangrove root systems prevent catastrophic coastal _________.", ans: "erosion", exp: "Mitigating coastal erosion." },
        { qNum: 34, type: "fill", prompt: "Mangrove forests store up to _________ times more carbon than terrestrial forests.", ans: "4", exp: "Stores four times more carbon." },
        { qNum: 35, type: "fill", prompt: "Primary threat to wetlands is urban _________ and aquaculture.", ans: "expansion", exp: "Urban expansion." },
        { qNum: 36, type: "fill", prompt: "Shrimp farming accounts for nearly _________ percent of mangrove clearance.", ans: "35", exp: "35% of clearance." },
        { qNum: 37, type: "fill", prompt: "International protection agreement is known as the _________ Convention.", ans: "ramsar", exp: "Ramsar Convention." },
        { qNum: 38, type: "fill", prompt: "Restoration projects require active involvement of local _________.", ans: "communities", exp: "Local communities." },
        { qNum: 39, type: "fill", prompt: "Soil in salt marshes has very low levels of _________.", ans: "oxygen", exp: "Low oxygen (anaerobic soil)." },
        { qNum: 40, type: "fill", prompt: "Global economic valuation of wetlands reaches trillions of _________ annually.", ans: "dollars", exp: "Valued in trillions of dollars." }
      ]
    }
  ]
};
