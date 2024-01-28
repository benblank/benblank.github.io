/// <reference lib="dom" />

export {};

type ColorComponents = {
  definition: Element;
  delete: Element;
  name: Element;
  swatch: Element;
};

type ColorData = {
  definition: string;
  name: string;
};

// function addUniversalEventListener(element: Element, handler: (event: Event) => void): void {
//   const seen = new Set();

//   for (let key in element) {
//     if (key.startsWith("on")) {
//       element.addEventListener(key.slice(2).toLowerCase(), (event) => {
//         if (!seen.has(event.type)) {
//           seen.add(event.type);
//           handler(event);
//         }
//       });
//     }
//   }
// }

function getData(color: Element): ColorData {
  if (!(color instanceof HTMLElement)) {
    throw new Error("Provided color element is not an HTML element");
  }

  const { definition, name } = color.dataset;

  if (!definition || !name) {
    throw new Error("Provided color element lacks color data");
  }

  return { definition, name };
}

function loadEditor() {
  const { addColorButton, colorList, colorTemplate } = locateElements();
  const colorComponents: Map<HTMLElement, ColorComponents> = new Map();

  addColorButton.addEventListener("click", () => {
    addColor({ name: "--new-color", definition: "#7f7f7f" });
    saveColors();
  });

  JSON.parse(localStorage.getItem("colors") ?? "[]").forEach(addColor);

  function addColor({ name, definition }: ColorData): void {
    const color = colorTemplate.cloneNode(true) as HTMLElement;
    const definitionElement = color.querySelector(".definition");
    const deleteElement = color.querySelector(".delete");
    const nameElement = color.querySelector(".name");
    const swatchElement = color.querySelector(".swatch-primary");

    if (!definitionElement || !deleteElement || !nameElement || !swatchElement) {
      throw new Error("Could not find one or more of the required elements");
    }

    const components: ColorComponents = {
      definition: definitionElement,
      delete: deleteElement,
      name: nameElement,
      swatch: swatchElement,
    };

    color.dataset["definition"] = definition;
    color.dataset["name"] = name;

    components.definition.textContent = definition;
    components.delete.addEventListener("click", deleteColor.bind(null, color));
    components.name.addEventListener("blur", updateName.bind(null, color));
    components.name.textContent = name;
    components.swatch.setAttribute("style", "background-color:" + definition);

    colorComponents.set(color, components);
    colorList.append(color);
  }

  function deleteColor(color: HTMLElement): void {
    color.remove();
    colorComponents.delete(color);

    saveColors();
  }

  function saveColors(): void {
    const colors: Array<ColorData> = [];

    for (const color of Array.from(colorList.children)) {
      const { definition, name } = getData(color);

      colors.push({ definition, name });
    }

    localStorage.setItem("colors", JSON.stringify(colors));
  }

  function updateName(color: HTMLElement) {
    const components = colorComponents.get(color);

    if (!components) {
      throw new Error("Cannot update the name for a color without recorded component elements");
    }

    const name = normalizeName(components.name.textContent ?? "unknown");

    components.name.textContent = name;
    color.dataset["name"] = name;

    saveColors();
  }
}

function locateElements() {
  const addColorButton = document.getElementById("add-color");
  const colorList = document.getElementById("colors");
  const colorTemplate = (document.getElementById("new-color") as HTMLTemplateElement)?.content.firstElementChild;

  if (!addColorButton || !colorList || !colorTemplate) {
    throw new Error('Could not find "add color" button, color list, and/or color template');
  }

  return { addColorButton, colorList, colorTemplate };
}

function normalizeName(name: string): string {
  return (
    name
      ?.toLowerCase()
      .replace(/'/g, "")
      .replace(/[^a-z]+/g, "-")
      .replace(/^-?/, "--")
      .replace(/-$/, "") ?? "--unknown"
  );
}

document.addEventListener("DOMContentLoaded", loadEditor);
