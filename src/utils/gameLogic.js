// Function to create and shuffle cards for the memory game
export const shuffleCards = () => {
  // Define card symbols/images (we'll use pairs, so each value appears twice)
  const cardValues = [
    "🍎",
    "🍌",
    "🍒",
    "🍓",
    "🍇",
    "🍊",
    "🍋",
    "🍉",
    "🥥",
    "🥝",
  ];

  // Create card pairs
  let cards = [];

  // Create two of each card with unique IDs
  cardValues.forEach((value, index) => {
    // First card of the pair
    cards.push({
      id: `card${index}_1`,
      value: value,
      matchId: index, // Cards with the same matchId are a match
    });

    // Second card of the pair
    cards.push({
      id: `card${index}_2`,
      value: value,
      matchId: index, // Cards with the same matchId are a match
    });
  });

  // Shuffle the cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap elements
  }

  return cards;
};

export const checkForMatch = (card1, card2) => {
  return card1.matchId === card2.matchId;
};
