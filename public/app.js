import { createDemoStory } from "./demo-story.js";
const form = document.querySelector("#story-form");
const pages = document.querySelector("#pages");
const title = document.querySelector("#book-title");
const error = document.querySelector("#error");
const print = document.querySelector("#print");
form.addEventListener("submit", async event => {
  event.preventDefault();
  error.textContent = "";
  print.hidden = true;
  pages.replaceChildren();
  title.textContent = "Criando sua aventura...";
  const data = Object.fromEntries(new FormData(form));
  try {
    const book = location.hostname.endsWith("github.io")
      ? createDemoStory(data)
      : await (async () => {
          const response = await fetch("./api/story", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
          const value = await response.json();
          if (!response.ok) throw new Error(value.error || "Falha na geração");
          return value;
        })();
    title.textContent = book.title;
    book.pages.forEach((page, index) => {
      const section = document.createElement("section");
      section.className = "page";
      const label = document.createElement("small");
      label.textContent = `PÁGINA ${index + 1}`;
      const text = document.createElement("p");
      text.textContent = page.text;
      section.append(label, text);
      pages.append(section);
    });
    print.hidden = false;
  } catch (err) {
    title.textContent = "Não foi possível gerar";
    error.textContent = err.message;
  }
});
print.addEventListener("click", () => window.print());
