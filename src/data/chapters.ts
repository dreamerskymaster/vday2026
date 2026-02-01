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
    message: "Northeastern Career Fair. Fall 2023. We were both in that line. Neither of us went inside. I didn't know your name. You didn't know mine. But something satisfying happened that day — we existed in the same space, annoyed at the same line, probably thinking the same thing: 'Is this even worth it?'",
    interactions: [
      {
        id: '1-1',
        question: "Be honest — were you actually going to go inside?",
        type: 'multiple-choice',
        options: ["Yes, I was committed", "No, I was already over it", "I don't even remember this 😅"]
      },
      {
        id: '1-2',
        question: "How long were you in that line before giving up?",
        type: 'slider',
        leftLabel: "5 mins",
        rightLabel: "45+ mins"
      },
      {
        id: '1-3',
        question: "If you could go back to that line and say one thing to me, what would it be?",
        type: 'text',
        minLength: 5,
        maxLength: 100
      }
    ]
  },
  {
    id: 2,
    title: "The App Did Its Job",
    message: "Then Hinge happened. February 22nd, 2024. I saw your profile and something clicked. The first texts were probably awkward. But here's the thing — I kept coming back to the app just to see if you'd replied.",
    interactions: [
      {
        id: '2-1',
        question: "Who texted first?",
        type: 'multiple-choice',
        options: ["You (Ajith)", "Me (obviously)", "I genuinely don't remember"]
      },
      {
        id: '2-2',
        question: "Rate my Hinge profile — be brutal",
        type: 'rating',
        maxLength: 5 // number of hearts
      },
      {
        id: '2-3',
        question: "What made you actually respond instead of just swiping?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      }
    ]
  },
  {
    id: 3,
    title: "Cambridge, Chapter One",
    message: "Our first real date. Cambridge. I was nervous. Were you? I remember trying to act like I had everything under control. I didn't. But somewhere between the conversations and the walking, I thought — okay, I want to see her again.",
    interactions: [
      {
        id: '3-1',
        question: "How nervous was I? (Your honest read)",
        type: 'multiple-choice',
        options: ["Cool and collected", "Slightly nervous", "Visibly stressed", "A complete mess pretending to be calm"]
      },
      {
        id: '3-2',
        question: "What's one thing you remember from that day that I probably forgot?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '3-3',
        question: "Did you know there would be a second date?",
        type: 'conditional',
        options: ["Yes", "No"],
        followUps: {
          "Yes": "What gave it away?",
          "No": "What convinced you later?"
        }
      }
    ]
  },
  {
    id: 4,
    title: "The 'Are We Dating?' Phase",
    message: "After Cambridge, we kept meeting. And meeting. And meeting. No labels. No pressure. Just two people figuring out if this thing had legs. Spoiler: it did.",
    interactions: [
      {
        id: '4-1',
        question: "Rank these from most to least memorable:",
        type: 'ranking',
        options: ["Coffee runs", "Late night calls", "Random hangouts", "Planned dates"]
      },
      {
        id: '4-2',
        question: "At what point did you realize this wasn't just casual anymore?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '4-3',
        question: "Who caught feelings first?",
        type: 'multiple-choice',
        options: ["You (Ajith) — obvious", "Me — I'll admit it", "Same time honestly", "Still figuring it out 😏"]
      }
    ]
  },
  {
    id: 5,
    title: "Norwalk or Nowhere",
    message: "Our first roadtrip. Norwalk. You, me, the car, and the open road. This was the test. If we could survive hours in a car together without killing each other, we had a chance. We passed.",
    interactions: [
      {
        id: '5-1',
        question: "What song do you think I played the most on that drive?",
        type: 'text',
        maxLength: 50
      },
      {
        id: '5-2',
        question: "Rate the drive vibe",
        type: 'slider',
        leftLabel: "😴",
        rightLabel: "🎉"
      },
      {
        id: '5-3',
        question: "Best part of that trip?",
        type: 'multiple-choice',
        options: ["The drive itself", "The destination", "The conversations", "The snacks (be honest)"]
      }
    ]
  },
  {
    id: 6,
    title: "The Hard Part",
    message: "Then came the distance. 8 months. Different cities. Different schedules. Same FaceTime screen every night. It wasn't easy. But babu, we held on. That counts for something.",
    interactions: [
      {
        id: '6-1',
        question: "How many times did you almost give up?",
        type: 'multiple-choice',
        options: ["Never", "Once or twice", "More than I'd admit", "Every other week honestly"]
      },
      {
        id: '6-2',
        question: "What was the hardest part of long distance for you?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '6-3',
        question: "Rate our FaceTime game",
        type: 'rating',
        maxLength: 5
      },
      {
        id: '6-4',
        question: "One thing that kept you holding on?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      }
    ]
  },
  {
    id: 7,
    title: "I Kept Coming Back",
    message: "Every month, twice a month, I drove to Boston. NH happened twice. Vermont happened once. And Vermont... that's where I gave you the promise ring by the waterfall. That moment? I meant every word.",
    interactions: [
      {
        id: '7-1',
        question: "When I showed up in Boston, your first thought was usually:",
        type: 'multiple-choice',
        options: ["Finally!", "He actually came", "Time to show him around", "Hope he's not tired from driving"]
      },
      {
        id: '7-2',
        question: "How surprised were you at the waterfall?",
        type: 'slider',
        leftLabel: "Knew it was coming",
        rightLabel: "Completely shocked"
      },
      {
        id: '7-3',
        question: "What were you thinking when I gave you the ring?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '7-4',
        question: "What does that ring mean to you now?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      }
    ]
  },
  {
    id: 8,
    title: "India & Return",
    message: "You went to India. And suddenly the distance wasn't just cities — it was continents. Time zones. Missed calls. But you came back. And when you did, it felt like pressing play again.",
    interactions: [
      {
        id: '8-1',
        question: "Did you miss me in India? Rate honestly.",
        type: 'rating',
        maxLength: 5 // 5 hearts
      },
      {
        id: '8-2',
        question: "What did you miss most?",
        type: 'multiple-choice',
        options: ["The calls", "The visits", "The random texts", "Having someone to rant to", "The drives"]
      },
      {
        id: '8-3',
        question: "First thought when you landed back?",
        type: 'text',
        minLength: 10,
        maxLength: 100
      }
    ]
  },
  {
    id: 9,
    title: "Acadia Adventure",
    message: "Acadia National Park. 3 days. Beautiful views. But let's be real — we fought before the trip. We fought after the trip. And somehow, the trip itself? Still one of my favorite memories. That's us. Chaos and beauty, all mixed together.",
    interactions: [
      {
        id: '9-1',
        question: "The fights before/after — who started most of them?",
        type: 'multiple-choice',
        options: ["You (Ajith)", "Me", "Mutual chaos", "The stress of travel"]
      },
      {
        id: '9-2',
        question: "What's your favorite memory from Acadia? (Not the fights)",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '9-3',
        question: "Was the trip worth the drama?",
        type: 'slider',
        leftLabel: "Not really",
        rightLabel: "100% worth it"
      },
      {
        id: '9-4',
        question: "One thing you'd do differently if we went back?",
        type: 'text',
        minLength: 5,
        maxLength: 150
      }
    ]
  },
  {
    id: 10,
    title: "New Beginnings (House, Nashua, Costco Life)",
    message: "Your new house. The Nashua iPhone trip. The endless Costco and Aldi runs. This chapter isn't dramatic. It's not a waterfall or a national park. But it's real. It's us building a life in the small moments.",
    interactions: [
      {
        id: '10-1',
        question: "Rank our regular spots:",
        type: 'ranking',
        options: ["Costco", "Aldi", "Random drives", "Your place"]
      },
      {
        id: '10-2',
        question: "What's one boring, everyday thing we do that you secretly love?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      },
      {
        id: '10-3',
        question: "Best impulse purchase we made together?",
        type: 'multiple-choice',
        options: ["Something from Costco", "The iPhone trip find", "Food we didn't need", "Can't pick one"]
      },
      {
        id: '10-4',
        question: "Describe our 'normal' in 5 words or less",
        type: 'text',
        minLength: 2,
        maxLength: 50
      }
    ]
  },
  {
    id: 11,
    title: "NYC — 64th Floor",
    message: "NYC. 3 days. That dinner on the 64th floor. You weren't feeling well. You barely saw the city. But you know what I saw? Someone I wanted to take care of. The trip wasn't what we planned. But I'd do it again.",
    interactions: [
      {
        id: '11-1',
        question: "How sick were you actually? (Be honest)",
        type: 'slider',
        leftLabel: "Slight cold",
        rightLabel: "Dying inside"
      },
      {
        id: '11-2',
        question: "What do you actually remember from that trip?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      },
      {
        id: '11-3',
        question: "The 64th floor dinner — worth it despite everything?",
        type: 'multiple-choice',
        options: ["Absolutely yes", "It was okay", "I was too sick to enjoy it", "The view saved it"]
      },
      {
        id: '11-4',
        question: "If we go back (healthy this time), what's the ONE thing you want to do?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      }
    ]
  },
  {
    id: 12,
    title: "The Chaos & The Love",
    message: "Let's be real. We've had heavy fights. We've had nights of drinking and talking too much. We've questioned if we're even suited for each other. But Deeksha — you're learning to cook for me. I drive you everywhere. We keep choosing each other. That's not nothing. That's everything.",
    interactions: [
      {
        id: '12-1',
        question: "Our fights — how bad do they actually get?",
        type: 'slider',
        leftLabel: "Minor disagreements",
        rightLabel: "Full chaos mode"
      },
      {
        id: '12-2',
        question: "After a fight, who apologizes first usually?",
        type: 'multiple-choice',
        options: ["You (Ajith)", "Me", "We both sulk then pretend it didn't happen", "Depends on who was wrong"]
      },
      {
        id: '12-3',
        question: "One thing you want us to be better at?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '12-4',
        question: "One thing you never want to change about us?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '12-5',
        question: "In one sentence — why do you keep choosing this?",
        type: 'text',
        minLength: 10,
        maxLength: 250
      }
    ]
  }
];
