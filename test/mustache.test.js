import Mustache from "mustache";
import fs from "fs/promises";

test("menggunakan mustache", () => {
  const data = Mustache.render("Hello {{name}}", { name: "maulana" });
  expect(data).toBe("Hello maulana");
});

test("Melakukan compile", () => {
  Mustache.parse("Hello {{name}}");

  const data = Mustache.render("Hello {{name}}", { name: "maulana" });
  expect(data).toBe("Hello maulana");
});
test("tags", () => {
  const data = Mustache.render("Hello {{name}}, my hobby is {{{ hobby }}}", { name: "maulana", hobby: "<b>coding</b>" });
  expect(data).toBe("Hello maulana, my hobby is <b>coding</b>");
});

test("nested object", () => {
  const data = Mustache.render("Hello {{person.name}}", { person: { name: "maulana" } });
  expect(data).toBe("Hello maulana");
});
test("Mustache file", async () => {
  const helloTemplate = await fs.readFile("./templates/hello.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, { title: "Belajar Mustache" });
  console.info(data);
  expect(data).toContain("Belajar Mustache");
});
test("Mustache section not show", async () => {
  const helloTemplate = await fs.readFile("./templates/person.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {});
  console.info(data);
  expect(data).not.toContain("Hello Person");
});
test("Mustache section show", async () => {
  const helloTemplate = await fs.readFile("./templates/person.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, { person: { name: "maulana" } });
  console.info(data);
  expect(data).toContain("Hello Person");
});
test("Mustache section data", async () => {
  const helloTemplate = await fs.readFile("./templates/person.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, { person: { name: "maulana" } });
  console.info(data);
  expect(data).toContain("Hello Person maulana!");
});
test("Mustache inverted section data", async () => {
  const helloTemplate = await fs.readFile("./templates/person.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {});
  console.info(data);
  expect(data).toContain("Hello Guest");
});
test("Mustache List", async () => {
  const helloTemplate = await fs.readFile("./templates/hobbies.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, { hobbies: ["coding", "reading", "gaming"] });
  console.info(data);
  expect(data).toContain("coding");
  expect(data).toContain("reading");
  expect(data).toContain("gaming");
});
test("Mustache List object", async () => {
  const helloTemplate = await fs.readFile("./templates/students.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    students: [
      { name: "maulana", value: 100 },
      { name: "asyifa", value: 100 },
    ],
  });
  console.info(data);
  expect(data).toContain("maulana");
  expect(data).toContain("asyifa");
  expect(data).toContain("100");
});
