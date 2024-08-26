describe("Find the Fake Gold Bar", () => {
  const groups = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  Cypress.on("uncaught:exception", () => {
    return false;
  });

  function selectFakeBar(bar) {
    cy.get(`#coin_${bar}`).click();
    cy.on("window:alert", (text) => {
      cy.log(text);
      expect(text).to.include("Yay! You found it!");
    });
  }

  function findFakeBarInGroup(group) {
    cy.get("#reset").click({ force: true });

    cy.get("#left_0").type(group[0]);
    cy.get("#right_0").type(group[1]);

    cy.get("#weigh").click();

    cy.get(".result").then(($result) => {
      const resultText = $result.text().trim();

      cy.log(`Weighing result: ${resultText}`);

      if (resultText.includes("left")) {
        cy.log(`The fake bar is likely ${group[1]}`);
        selectFakeBar(group[1]);
      } else if (resultText.includes("right")) {
        cy.log(`The fake bar is likely ${group[0]}`);
        selectFakeBar(group[0]);
      } else {
        cy.log(`The fake bar is likely ${group[2]}`);
        selectFakeBar(group[2]);
      }
    });
  }

  it("Find the fake gold bar", () => {
    cy.visit("https://sdetchallenge.fetch.com/");

    for (let i = 0; i < 2; i++) {
      findFakeBarInGroup(groups[i]);
    }

    cy.get(".result").then(($result) => {
      const resultText = $result.text().trim();

      if (!resultText.includes("Yay! You found it!")) {
        findFakeBarInGroup(groups[2]);
      }
    });
  });
});
