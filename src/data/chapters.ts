import { type ChapterData } from "@/lib/schemas";

import { type ChapterData } from "@/lib/schemas";

export const chapters: ChapterData[] = [
  {
    id: 1,
    title: "The Line We Never Entered",
    message: "Northeastern Career Fair. Fall 2024. Hum dono us lambi line mein khade the. Neither of us went inside. Mujhe tumhara naam nahi pata tha, tumhe mera nahi. But ek cheez bahut satisfying thi, hum dono wahi the, us line se pareshan, shayad ek hi cheez soch rahe the: 'Is this even worth it?'",
    photo: "/images/chapter1.jpg",
    interactions: [
      {
        id: '1-1',
        question: "Sach batao... were you actually going to go inside?",
        type: 'multiple-choice',
        options: ["Yes, I was committed", "No, pehle hi mann bhar gaya tha", "Mujhe yaad bhi nahi 😅"]
      },
      {
        id: '1-2',
        question: "Agar aaj wapas us line mein ja paati, toh mujhse kya kehti?",
        type: 'text',
        minLength: 5,
        maxLength: 100
      }
    ]
  },
  {
    id: 2,
    title: "Cambridge, Chapter One",
    message: "Humari pehli real date. Cambridge. Main thoda nervous tha. Tum thi? Mujhe yaad hai main aise act kar raha tha jaise sab control mein hai, par aisa bilkul nahi tha. But baaton aur ghumne ke beech mein, maine socha... okay, I want to see her again.",
    photo: "/images/chapter2.jpg",
    interactions: [
      {
        id: '2-1',
        question: "Main kitna nervous tha? (Imandari se batao)",
        type: 'multiple-choice',
        options: ["Cool and collected", "Slightly nervous", "Visibly stressed", "Pura mess, bas pretend kar raha tha"]
      },
      {
        id: '2-2',
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
    id: 3,
    title: "Norwalk or Nowhere",
    message: "Humari pehli roadtrip. Norwalk. Tum, main, car aur khuli sadak. Ye test tha. Agar hum car mein itne ghante bina lade nikal sakte the, toh humara chance tha. Aur humne pass kar liya.",
    photo: "/images/chapter3.jpg",
    interactions: [
      {
        id: '3-1',
        question: "Drive ka vibe rate karo",
        type: 'slider',
        leftLabel: "😴",
        rightLabel: "🎉"
      },
      {
        id: '3-2',
        question: "Trip ka best part kya tha?",
        type: 'multiple-choice',
        options: ["The drive itself", "The destination", "The conversations", "The snacks (sach bolo)"]
      }
    ]
  },
  {
    id: 4,
    title: "The Hard Part",
    message: "Phir distance aaya. 8 months. Alag cities, alag schedules. Bas wahi FaceTime screen har raat. Aasaan nahi tha. But babu, humne haar nahi maani. Ye bahut badi baat hai.",
    photo: "/images/chapter4.jpg",
    interactions: [
      {
        id: '4-1',
        question: "Long distance ka sabse mushkil part kya tha?",
        type: 'text',
        minLength: 10,
        maxLength: 200
      },
      {
        id: '4-2',
        question: "Koi ek cheez jisne tumhe himmat di?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      }
    ]
  },
  {
    id: 5,
    title: "I Kept Coming Back",
    message: "Har maheene, do baar, main Boston drive karta tha. NH do baar hua, Vermont ek baar. Aur Vermont... wahi waterfall ke paas maine tumhe promise ring di thi. Us moment pe maine jo bhi kaha, mera matlab wahi tha.",
    photo: "/images/chapter5.jpg",
    interactions: [
      {
        id: '5-1',
        question: "Waterfall pe kitni surprised thi?",
        type: 'slider',
        leftLabel: "Pata tha",
        rightLabel: "Shocked!"
      },
      {
        id: '5-2',
        question: "Wo ring aaj tumhare liye kya maane rakhti hai?",
        type: 'text',
        minLength: 10,
        maxLength: 150
      }
    ]
  },
  {
    id: 6,
    title: "The Chaos & The Love",
    message: "Sach toh ye hai ki humne bahut lade hain. Bahut baatein ki hain. Kabhi kabhi toh socha bhi hai ki hum sath reh paenge ya nahi. Par Deeksha... tum ab mere liye khana bana rahi ho. Main tumhe har jagah drive karta hoon. Hum ek dusre ko choose kar rahe hain. Ye bahut badi baat hai.",
    photo: "/images/chapter6.jpg",
    interactions: [
      {
        id: '6-1',
        question: "Ladai ke baad pehle sorry kaun bolta hai?",
        type: 'multiple-choice',
        options: ["Tum (Ajith)", "Main", "Dono ego mein rehte hain", "Galti kiski thi uspe depend karta hai"]
      },
      {
        id: '6-2',
        question: "Ek sentence mein... tum ye kyu choose karti ho?",
        type: 'text',
        minLength: 10,
        maxLength: 250
      }
    ]
  }
];
