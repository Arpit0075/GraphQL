// sample db file

export let games = [
  { id: 1, title: "Ninja1", platform: ["ps", "pc"] },
  { id: 2, title: "Ninja2", platform: ["ps", "pc"] },
  { id: 3, title: "Ninja3", platform: ["ps", "pc"] },
];

export let authors = [
  { id: 101, name: "name1", verified: false },
  { id: 102, name: "name2", verified: true },
  { id: 103, name: "name3", verified: true },
];

export let reviews = [
  { id: 201, rating: 4, content: "Nice1", authorId: 101, gameId: 1 },
  { id: 202, rating: 5, content: "Nice2", authorId: 102, gameId: 2 },
  { id: 203, rating: 5, content: "Nice3", authorId: 103, gameId: 3 },
];
