const getRandomPositiveEmoji = () => {
  const emojis = ["🚀", "🌟", "🎉", "💪", "👏", "🙌", "🔥"];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const getRandomMotivationalText = () => {
  const texts = [
    "You can do it!",
    "Just do it!",
    "Let's go!",
    "One step at a time!",
    "Every small step counts!",
    "Progress is progress!",
    "Consistency creates change!",
    "One habit at a time!",
    "Your future self will thank you!",
    "It's all about progress!",
    "Don't overthink it!",
  ];
  return texts[Math.floor(Math.random() * texts.length)];
};

const getRandomSuccessText = () => {
  const texts = [
    "You're doing great!",
    "Keep it up!",
    "You're amazing!",
    "You're unstoppable!",
    "You're a rockstar!",
  ];
  return texts[Math.floor(Math.random() * texts.length)];
};

export {
  getRandomPositiveEmoji,
  getRandomMotivationalText,
  getRandomSuccessText,
};
