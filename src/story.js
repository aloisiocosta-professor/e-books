const themes = {
  floresta: { place: "uma floresta luminosa", friend: "uma coruja curiosa", challenge: "encontrar a estrela perdida" },
  oceano: { place: "um oceano azul", friend: "uma tartaruga gentil", challenge: "reencontrar um mapa antigo" },
  espaco: { place: "uma estação espacial", friend: "um pequeno robô", challenge: "descobrir um planeta colorido" }
};
export function createStory(input) {
  const name = String(input?.name ?? "").trim();
  const age = Number(input?.age);
  const theme = String(input?.theme ?? "");
  if (!/^[\p{L}][\p{L}\p{M} '\-]{0,39}$/u.test(name)) throw new Error("Nome inválido");
  if (!Number.isInteger(age) || age < 3 || age > 12) throw new Error("Idade inválida");
  if (!Object.hasOwn(themes, theme)) throw new Error("Tema inválido");
  const t = themes[theme];
  return {
    title: `A aventura de ${name}`,
    age, theme, mode: "mock",
    pages: [
      { text: `Era uma vez ${name}, que sonhava conhecer ${t.place}.`, scene: "Uma paisagem mágica e acolhedora" },
      { text: `No caminho, ${name} encontrou ${t.friend}. Juntos decidiram ${t.challenge}.`, scene: "Dois amigos em uma aventura" },
      { text: `Com coragem e gentileza, ${name} percebeu que pedir ajuda também é uma força.`, scene: "Amigos resolvendo um desafio" },
      { text: `Ao voltar para casa, ${name} guardou uma lembrança especial daquela aventura.`, scene: "Um retorno feliz ao lar" }
    ]
  };
}
