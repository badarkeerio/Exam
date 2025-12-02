
export type QuestionType = 'MCQ' | 'SHORT' | 'LONG';

export interface ExamHeader {
  schoolName: string;
  campus?: string;
  examTitle: string;
  subject: string;
  date: string;
  time: string;
  classGrade: string;
  totalMarks: number;
  logoUrl?: string;
  logoRightUrl?: string;
}

export interface ExamSettings {
  fontScale: number;
  watermarkText: string;
  showBorder: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[]; // For MCQs (A, B, C, D)
  marks?: number;
}

export interface ExamData {
  header: ExamHeader;
  settings: ExamSettings;
  mcqs: Question[];
  shortQuestions: Question[];
  longQuestions: Question[];
  mcqInstruction: string;
  shortInstruction: string;
  longInstruction: string;
}

export const INITIAL_EXAM_DATA: ExamData = {
  header: {
    schoolName: "GOVERNMENT BOYS HIGHER SECONDARY SCHOOL HAJI JUNEJO",
    campus: "(CAMPUS) TALUKA S.F RAHU DISTRICT BADIN",
    examTitle: "Terminal Examination 2023-24",
    subject: "CHEMISTRY",
    date: "14/12/2023",
    time: "02:00 Hours",
    classGrade: "11th",
    totalMarks: 100,
    logoUrl: "",
    logoRightUrl: "",
  },
  settings: {
    fontScale: 1.0,
    watermarkText: "",
    showBorder: false,
  },
  mcqInstruction: "Tick mark (✓) the correct answer:",
  shortInstruction: "Give brief answers to any eight of the following questions:",
  longInstruction: "Write in detailed answers of any two of the following questions:",
  mcqs: [
    {
      id: "m1", type: "MCQ", marks: 2,
      text: "If the volume occupied by oxygen gas (O₂) at STP is 44.8dm³, the number of molecules of O₂ in the vessels are:",
      options: ["3.01 × 10²³", "6.02 × 10²³", "12.04 × 10²³", "24.08 × 10²³"]
    },
    {
      id: "m2", type: "MCQ", marks: 2,
      text: "Which of the following sample of substances contains the same number of atoms as that of 20g calcium:",
      options: ["16g S", "20g C", "19g K", "24g Mg"]
    },
    {
      id: "m3", type: "MCQ", marks: 2,
      text: "Maximum number of molecules present in the following sample of gas:",
      options: ["100g O₂", "100g CH₄", "100g CO₂", "100g Cl₂"]
    },
    {
      id: "m4", type: "MCQ", marks: 2,
      text: "For Avogadro's number, this statement is incorrect:",
      options: [
        "It is the no. of particles in one mole of any substances",
        "Its numerical value is 6.02 x 10²³",
        "Its value changes if number of moles increases",
        "its value changes if temperature increases."
      ]
    },
    {
      id: "m5", type: "MCQ", marks: 2,
      text: "In the reaction 2Na+ 2H₂O → 2NaOH + H₂, if 23g of Na reacts with excess of water, the volume of hydrogen gas (H₂) liberated at STP should be:",
      options: ["11.2dm³", "22.4dm³", "33.6dm³", "44.8dm³"]
    },
    {
      id: "m6", type: "MCQ", marks: 2,
      text: "Bohr's theory is not applicable to which of the following species.",
      options: ["H", "H⁺", "He⁺¹", "Li⁺²"]
    },
    {
      id: "m7", type: "MCQ", marks: 2,
      text: "The radius of first orbit of hydrogen atom is",
      options: ["529 Å", "52.9 Å", "5.29 Å", "0.529 Å"]
    },
    {
      id: "m8", type: "MCQ", marks: 2,
      text: "Line spectrum is used as a tool for the identification of",
      options: ["Colors", "Electrons", "Elements", "Molecules"]
    },
    {
      id: "m9", type: "MCQ", marks: 2,
      text: "In 1935 A.D. James Chadwick was awarded Nobel Prize because",
      options: [
        "He discovered proton",
        "He discovered neutron",
        "He determined the radius of hydrogen atom",
        "He gave the rules for electronic configuration"
      ]
    },
    {
      id: "m10", type: "MCQ", marks: 2,
      text: "Which of the following is not an iso electronic pair",
      options: ["Na+ and Ne", "Na+ and F", "Na and Ca", "Na and Mg+2"]
    }
  ],
  shortQuestions: [
    {
      id: "s1", type: "SHORT", marks: 5,
      text: "Define the following: (a) Molar Volume (b) Exponential Notation"
    },
    {
      id: "s2", type: "SHORT", marks: 5,
      text: "Express the following numbers in exponential notation: a. 3652 b. 0.0231 c. 0.0435 d. 0.000072"
    },
    {
      id: "s3", type: "SHORT", marks: 5,
      text: "Express the following in simple numbers. a. 3.26 × 10⁻³ b. 1.921 × 10² c. 1.02 × 10⁵"
    },
    {
      id: "s4", type: "SHORT", marks: 5,
      text: "Define sub atomic particles and their characteristics?"
    },
    {
      id: "s5", type: "SHORT", marks: 5,
      text: "Give three properties of each Alpha, Beta and Gamma rays."
    },
    {
      id: "s6", type: "SHORT", marks: 5,
      text: "Discuss some postulates of Bohr’s atomic model theory."
    },
    {
      id: "s7", type: "SHORT", marks: 5,
      text: "Define Bond Energy and Bond Length"
    },
    {
      id: "s8", type: "SHORT", marks: 5,
      text: "Write down the postulate of VSEPR theory?"
    },
    {
      id: "s9", type: "SHORT", marks: 5,
      text: "Explain the Dipole moment with formula."
    },
    {
      id: "s10", type: "SHORT", marks: 5,
      text: "Name five basic shapes by VSEPR theory."
    }
  ],
  longQuestions: [
    {
      id: "l1", type: "LONG", marks: 15,
      text: "What are X-rays? How are they produced? Give their properties and uses."
    },
    {
      id: "l2", type: "LONG", marks: 15,
      text: "Write down the electronic configuration of the following. Fe (56/26), C (12/6), N (14/7), Cl (35/17), Ar (40/18)"
    },
    {
      id: "l3", type: "LONG", marks: 15,
      text: "Calculate each of the following quantities. a. Number of moles in 64g of SO₂ b. Mass in grams of 5 moles of ethyne (C₂H₂) c. Number of molecules in 2g water."
    }
  ],
};
