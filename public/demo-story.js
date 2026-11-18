// Gerador demonstrativo sem IA e sem envio de dados para servidores.
export function createDemoStory({ name, age, theme }) {
  name = String(name ?? "").trim();
  age = Number(age);
  const themes = {
    floresta: ["floresta encantada", "coruja sábia", "uma estrela perdida"],
    oceano: ["fundo do mar", "tartaruga gentil", "um tesouro escondido"],
    espaco: ["espaço sideral", "robô curioso", "um planeta desconhecido"]
  };
  if (!/^[\p{L}][\p{L}\p{M} '\-]{0,39}$/u.test(name)) throw new Error("Nome inválido");
  if (!Number.isInteger(age) || age < 3 || age > 12) throw new Error("Idade inválida");
  if (!Object.hasOwn(themes, theme)) throw new Error("Tema inválido");
  const [place, friend, challenge] = themes[theme];
  return {
    title: `A aventura de ${name}`,
    pages: [
      { text: `Era uma vez ${name}, que sonhava conhecer ${place}.` },
      { text: `Um dia, ${name} encontrou ${friend} e ouviu falar de ${challenge}.` },
      { text: `Juntos, descobriram que a amizade e a coragem ajudam a superar desafios.` },
      { text: `Ao voltar para casa, ${name} tinha uma história especial para contar.` }
    ]
  };
}
