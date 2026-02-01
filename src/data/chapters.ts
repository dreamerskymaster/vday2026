export interface Interaction {
  id: string;
  question: string;
  type: 'multiple-choice' | 'text' | 'slider' | 'rating' | 'ranking' | 'conditional';
  options?: string[];
  leftLabel?: string;
  rightLabel?: string;
  minLength?: number;
  maxLength?: number;
  followUps?: Record<string, string>;
}

export interface ChapterData {
  id: number;
  title: string;
  message: string;
  interactions: Interaction[];
}

export const chapters: ChapterData[] = [
  {
    id: 1,
    title: "The Line We Never Entered",
    message: "Northeastern Career Fair. Fall 2024. Hum dono us lambi line mein khade the. Neither of us went inside. Mujhe tumhara naam nahi pata tha, tumhe mera nahi. But ek cheez bahut satisfying thi, hum dono wahi the, us line se pareshan, shayad ek hi cheez soch rahe the: 'Is this even worth it?'",
    interactions: [
      {
        id: '1-1',
        question: "Sach batao... were you actually going to go inside?",
        type: 'multiple-choice',
        options: ["Yes, I was committed", "No, pehle hi mann bhar gaya tha", "Mujhe yaad bhi nahi 😅"]
      },
      {
        id: '1-2',
        question: "Line mein kitna wait kiya haar maanne se pehle?",
        type: 'slider',
        leftLabel: "5 mins",
        rightLabel: "45+ mins"
      },
      {
        id: '1-3',
        question: "Agar aaj wapas us line mein ja paati, toh mujhse kya kehti?",
        type: 'text',
        minLength: 5,
        maxLength: 100
      }
    ]
  },
  {
    id: 2,
    title: "The App Did Its Job",
    message: "Phir Hinge hua. February 22nd, 2024. Maine tumhara profile dekha aur kuch click hua. Pehle texts shayad thode awkward the. But point ye hai ki main baar baar app check karta tha ye dekhne ke liye ki tumne reply kiya ya nahi.",
    interactions: [
      {
        id: '2-1',
        question: "Pehle text kisne kiya tha?",
        type: 'multiple-choice',
        options: ["Tumne (Ajith)", "Maine (obviously)", "Yaad nahi yar"]
      },
      {
        id: '2-2',
        question: "Mera Hinge profile rate karo... be brutal",
        type: 'rating',
        maxLength: 5
      },
      {
        id: '2-3',
        question: "Swipe karne ke baad actually reply kyu kiya?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      }
    ]
  },
  {
    id: 3,
    title: "Cambridge, Chapter One",
    message: "Humari pehli real date. Cambridge. Main thoda nervous tha. Tum thi? Mujhe yaad hai main aise act kar raha tha jaise sab control mein hai, par aisa bilkul nahi tha. But baaton aur ghumne ke beech mein, maine socha... okay, I want to see her again.",
    interactions: [
      {
        id: '3-1',
        question: "Main kitna nervous tha? (Imandari se batao)",
        type: 'multiple-choice',
        options: ["Cool and collected", "Slightly nervous", "Visibly stressed", "Pura mess, bas pretend kar raha tha"]
      },
      {
        id: '3-2',
        question: "Us din ki koi ek baat jo tumhe yaad hai par main shayad bhool gaya hoon?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '3-3',
        question: "Kya tumhe pata tha ki second date hogi?",
        type: 'conditional',
        options: ["Yes", "No"],
        followUps: {
          "Yes": "Kaise pata chala?",
          "No": "Baad mein kaise maan gayi?"
        }
      }
    ]
  },
  {
    id: 4,
    title: "The 'Are We Dating?' Phase",
    message: "Cambridge ke baad hum milte rahe. Baar baar milte rahe. Koi labels nahi, koi pressure nahi. Bas do log ye samajhne ki koshish kar rahe the ki is rishte mein koi baat hai ya nahi. Spoiler: Baat toh thi.",
    interactions: [
      {
        id: '4-1',
        question: "Inhe rank karo from most to least memorable:",
        type: 'ranking',
        options: ["Coffee runs", "Late night calls", "Random hangouts", "Planned dates"]
      },
      {
        id: '4-2',
        question: "Kab laga ki ye ab casual nahi raha?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '4-3',
        question: "Sabse pehle feelings kisne pakdi?",
        type: 'multiple-choice',
        options: ["Tumne (Ajith), obvious", "Maine, admit karti hoon", "Dono ne sath mein", "Abhi bhi figure out kar rahe hain 😏"]
      }
    ]
  },
  {
    id: 5,
    title: "Norwalk or Nowhere",
    message: "Humari pehli roadtrip. Norwalk. Tum, main, car aur khuli sadak. Ye test tha. Agar hum car mein itne ghante bina lade nikal sakte the, toh humara chance tha. Aur humne pass kar liya.",
    interactions: [
      {
        id: '5-1',
        question: "Us drive pe main kaunsa gaana sabse zyada bajata tha?",
        type: 'text',
        maxLength: 50
      },
      {
        id: '5-2',
        question: "Drive ka vibe rate karo",
        type: 'slider',
        leftLabel: "😴",
        rightLabel: "🎉"
      },
      {
        id: '5-3',
        question: "Trip ka best part kya tha?",
        type: 'multiple-choice',
        options: ["The drive itself", "The destination", "The conversations", "The snacks (sach bolo)"]
      }
    ]
  },
  {
    id: 6,
    title: "The Hard Part",
    message: "Phir distance aaya. 8 months. Alag cities, alag schedules. Bas wahi FaceTime screen har raat. Aasaan nahi tha. But babu, humne haar nahi maani. Ye bahut badi baat hai.",
    interactions: [
      {
        id: '6-1',
        question: "Kitni baar laga ki ab nahi ho payega?",
        type: 'multiple-choice',
        options: ["Never", "Ek-do baar", "Jitna bataungi usse zyada", "Har dusre hafte lol"]
      },
      {
        id: '6-2',
        question: "Long distance ka sabse mushkil part kya tha?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '6-3',
        question: "Humara FaceTime game rate karo",
        type: 'rating',
        maxLength: 5
      },
      {
        id: '6-4',
        question: "Koi ek cheez jisne tumhe himmat di?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      }
    ]
  },
  {
    id: 7,
    title: "I Kept Coming Back",
    message: "Har maheene, do baar, main Boston drive karta tha. NH do baar hua, Vermont ek baar. Aur Vermont... wahi waterfall ke paas maine tumhe promise ring di thi. Us moment pe maine jo bhi kaha, mera matlab wahi tha.",
    interactions: [
      {
        id: '7-1',
        question: "Jab main Boston aata tha, sabse pehla thought kya hota tha?",
        type: 'multiple-choice',
        options: ["Finally!", "He actually came", "Time to show him around", "Hope thaka nahi hoga drive se"]
      },
      {
        id: '7-2',
        question: "Waterfall pe kitni surprised thi?",
        type: 'slider',
        leftLabel: "Pata tha",
        rightLabel: "Shocked!"
      },
      {
        id: '7-3',
        question: "Jab maine ring di, tumhare dimaag mein kya chal raha tha?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '7-4',
        question: "Wo ring aaj tumhare liye kya maane rakhti hai?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      }
    ]
  },
  {
    id: 8,
    title: "India & Return",
    message: "Tum India gayi. Aur achanak distance sirf cities nahi, continents ban gaya. Time zones, missed calls. Par tum wapas aayi. Aur jab aayi, toh laga jaise sab wapas 'play' ho gaya.",
    interactions: [
      {
        id: '8-1',
        question: "Kya mujhe India mein miss kiya?",
        type: 'rating',
        maxLength: 5
      },
      {
        id: '8-2',
        question: "Sabse zyada kya miss kiya?",
        type: 'multiple-choice',
        options: ["The calls", "The visits", "The random texts", "Someone to rant to", "The drives"]
      },
      {
        id: '8-3',
        question: "Landed back... pehla thought kya tha?",
        type: 'text',
        minLength: 10,
        maxLength: 100
      }
    ]
  },
  {
    id: 9,
    title: "Acadia Adventure",
    message: "Acadia National Park. 3 din. Khoobsurat views. Par sach bolun toh, trip se pehle lade, trip ke baad lade. Phir bhi wo trip meri favorite memories mein se ek hai. Yehi hum hain. Thoda chaos aur bahut zyada pyaar.",
    interactions: [
      {
        id: '9-1',
        question: "Fights kaun zyada start karta tha?",
        type: 'multiple-choice',
        options: ["Tum (Ajith)", "Main", "Dono ki galti", "Travel ka stress"]
      },
      {
        id: '9-2',
        question: "Acadia ki best memory (binna ladai wali)?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '9-3',
        question: "Trip worth the drama thi?",
        type: 'slider',
        leftLabel: "Nahi",
        rightLabel: "100% Worth it"
      },
      {
        id: '9-4',
        question: "Agar wapas jayein, toh kya badalna chahogi?",
        type: 'text',
        minLength: 5,
        maxLength: 150
      }
    ]
  },
  {
    id: 10,
    title: "New Beginnings (House, Nashua, Costco Life)",
    message: "Tumhara naya ghar. Nashua iPhone trip. Wo endless Costco aur Aldi runs. Ye chapter dramatic nahi hai. Ye koi waterfall ya park nahi hai. Par ye real hai. Hum choti choti baaton mein apni zindagi bana rahe hain.",
    interactions: [
      {
        id: '10-1',
        question: "Humari spots ko rank karo:",
        type: 'ranking',
        options: ["Costco", "Aldi", "Random drives", "Your place"]
      },
      {
        id: '10-2',
        question: "Koi narmal si cheez jo hum sath karte hain aur tumhe pasand hai?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      },
      {
        id: '10-3',
        question: "Sath mein liye hui sabse best impulse purchase?",
        type: 'multiple-choice',
        options: ["Costco ki koi cheez", "The iPhone trip find", "Food we didn't need", "Can't pick one"]
      },
      {
        id: '10-4',
        question: "Humara 'normal' kaise describe karogi (5 words max)?",
        type: 'text',
        minLength: 2,
        maxLength: 50
      }
    ]
  },
  {
    id: 11,
    title: "NYC — 64th Floor",
    message: "NYC. 3 din. Wo 64th floor wali dinner. Tumhari tabiyat theek nahi thi. Tumne pura sheher nahi dekha. Par maine kya dekha? Someone I wanted to take care of. Trip waisi nahi thi jaisi plan ki thi, par main wapas wahi karunga.",
    interactions: [
      {
        id: '11-1',
        question: "Sach batao, kitni bimaar thi?",
        type: 'slider',
        leftLabel: "Thoda sa",
        rightLabel: "Dying inside"
      },
      {
        id: '11-2',
        question: "Us trip se actually kya yaad hai?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      },
      {
        id: '11-3',
        question: "64th floor dinner worth it thi?",
        type: 'multiple-choice',
        options: ["Absolutely yes", "Theek tha", "Bimaar thi bahut", "View ne bacha liya"]
      },
      {
        id: '11-4',
        question: "Agar wapas jayein (healthy hoke), toh kya karna chahogi?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      }
    ]
  },
  {
    id: 12,
    title: "The Chaos & The Love",
    message: "Sach toh ye hai ki humne bahut lade hain. Bahut baatein ki hain. Kabhi kabhi toh socha bhi hai ki hum sath reh paenge ya nahi. Par Deeksha... tum ab mere liye khana bana rahi ho. Main tumhe har jagah drive karta hoon. Hum ek dusre ko choose kar rahe hain. Ye bahut badi baat hai.",
    interactions: [
      {
        id: '12-1',
        question: "Humari fights kitni bad hoti hain?",
        type: 'slider',
        leftLabel: "Choti baatein",
        rightLabel: "Full chaos!"
      },
      {
        id: '12-2',
        question: "Ladai ke baad pehle sorry kaun bolta hai?",
        type: 'multiple-choice',
        options: ["Tum (Ajith)", "Main", "Dono ego mein rehte hain", "Galti kiski thi uspe depend karta hai"]
      },
      {
        id: '12-3',
        question: "Koi ek cheez jo humein better karni chahiye?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '12-4',
        question: "Koi ek cheez jo tum kabhi nahi badalna chahti?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '12-5',
        question: "Ek sentence mein... tum ye kyu choose karti ho?",
        type: 'text',
        minLength: 10,
        maxLength: 250
      }
    ]
  }
];
