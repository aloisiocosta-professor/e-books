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
    const response = await fetch("/api/story", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    const book = await response.json();
    if (!response.ok) throw new Error(book.error || "Falha na geração");
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
