import { createComparison, defaultRules } from "../lib/compare.js";

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes).forEach((elementName) => {
    elements[elementName].append(
      ...Object.values(indexes[elementName]).map((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        return option;
      }),
    );
  });

  const compare = createComparison(defaultRules, []);

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action?.name === "clear") {
      const container = action.closest(".filter");
      if (container) {
        const input = container.querySelector("input, select");
        if (input) {
          input.value = "";
          state[action.dataset.field] = "";
        }
      }
    }
    return data.filter((row) => compare(row, state));
  };
}
