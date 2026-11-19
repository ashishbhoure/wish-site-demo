/* ============================================================
   WISH SITE — edit this file, nothing else.
   Every line is optional: delete it and a cute default is used.
   Use {name} inside any text and it becomes the person's name.
   ============================================================ */
window.CFG = {
  name: "Aashi",              // who the website is for
  from: "Your Friend",        // who signs the letter

  // ---- the big title (2 lines). Change for other occasions:
  //   ["Happy","Anniversary"]  ["Congrats","Graduate"]  ["Happy","Wedding"]
  occasion: ["Happy", "Birthday"],

  // ---- the number candles. "23" -> two number candles. "" -> one heart candle.
  number: "23",

  // ---- THEME: "lavender" | "rose" | "mint" | "sky" | "peach" | "sunshine" | "berry"
  //      or your own colours:  { primary: "#7fd8b8", secondary: "#ffb3c7" }
  theme: "lavender",

  // ---- CHARACTER: "cat" | "bunny" | "bear" | "none"
  character: "cat",

  music: true,                // soft music-box "Happy Birthday" tune (user can mute)

  // ---- turn sections on/off
  sections: { candles: true, gallery: true, cards: true, wishes: true, scrapbook: true, world: true, letter: true },

  // ---- PHOTOS
  // Easiest: put pictures in /photos, run  node scripts/prepare-photos.mjs  and they are
  // used everywhere automatically. Or list files by hand:  photos: ["a.jpg","b.jpg", ...]
  // (No photos at all? You get cute placeholders so you can preview the design.)
  photos: [],
  heroPhoto: "",              // optional: one specific file for the big round photo

  // ---- polaroid cards you can drag & flip. Leave [] to auto-make them from your photos.
  //      { img: "a.jpg", cap: "front caption", msg: "message on the back" }
  cards: [],

  // ---- messages inside the tap-the-hearts game (any number up to 8)
  wishes: [
    "You make ordinary days feel special. 🌷",
    "Your laugh is my favourite sound. 🎶",
    "May you always have chai, friends and good vibes. ☕",
    "You deserve every good thing coming your way. ✨",
    "Be proud of how far you’ve come. 🌈",
    "Dream big, little star. The sky is waiting. ⭐",
    "Your kindness changes people. Never lose it. 💜",
    "Happy Birthday, you absolute sweetheart! 🎂"
  ],

  // ---- the final letter
  letter: "May this year be as bright, soft and magical as your smile. Never stop being you. 💜",

  // ---- every other word on the page (all optional — language of your choice!)
  text: {
    eyebrow: "🎀 it's a very special day 🎀",
    heroLine: "Today the whole universe is celebrating you ✨",
    gateSmall: "psst… someone has a surprise for you",
    gateTitle: "Tap to open your gift 🎁",

    candlesTitle: "Make a wish", candlesSub: "then blow out the candles",
    blowBtn: "💨 Blow the candles", relightBtn: "🔥 Light them again", micBtn: "🎤 blow for real",
    candlesHint: "tap the cake or the button!",
    wishDone: "🎉 Wish made, {name}! It’s totally coming true 💫",

    galleryTitle: "Memory lane", gallerySub: "swipe through ✨",
    cardsTitle: "Polaroid pile", cardsSub: "drag me around · tap to flip 💌",
    wishesTitle: "Tiny wishes", wishesSub: "tap the hearts 💗",
    wishesCount: "{n} / {total} opened", wishesAll: "all {total} wishes found! 🎉",
    secret: "{name}, you found every wish! The last one is a secret: you are truly one of a kind. 💜",

    scrapTitle: "Scrapbook", scrapSub: "a little page of you",
    scrapNoteTitle: "✎ things I love about you",
    scrapNotes: ["your smile that lights up rooms", "how kind you are to everyone", "your cute little chaos", "that you’re always YOU"],
    ticket1: "ADMIT ONE", ticket2: "forever friendship", ticket3: "valid for life ♾️",
    scrapQuote: "you are my favourite kind of sunshine ☀️",
    scrapCaptions: ["cutie ✿", "sunday vibes", "soft & sweet", "fashion queen 👑", "study mode 📚", "pretty in purple", "giggles", "cozy me", "outdoor queen"],

    worldTitle: "{name}’s 3D world", worldSub: "drag to look around · pinch to zoom 🌌",
    worldHint: "tap a photo to zoom", worldLoading: "building your world…",

    letterGreeting: "Dear {name},", letterSign: "with lots of love,",
    confettiBtn: "🎉 More confetti!", noteClose: "aww 🥹", footer: "made with 💜 & a little bit of glitter",

    catLines: ["meow! 🐾", "Happy Birthday {name}!", "purr purr 💜", "you’re the cutest!", "make a wish! ✨", "nya~ 🌸", "party time! 🎉"],
    cardCaptions: ["main character ✨", "soft girl era 🌸", "pure sunshine ☀️", "cutie alert 🎀", "glow up 💫", "giggles on 😆", "dreamy 🌙", "pretty smile 🥹"],
    cardMessages: [
      "You walk into a room and the vibe instantly gets better.",
      "Kind heart, gentle soul, dangerous sense of humour.",
      "That smile should honestly be illegal. Keep it forever.",
      "Thank you for being the kind of friend everyone wishes for.",
      "You shine brightest when you’re just being yourself.",
      "Remember: you are loved a LOT more than you know.",
      "May all your wishes come true this year (and the next).",
      "Stay the same sweet, funny, amazing person you are."
    ]
  }
};
