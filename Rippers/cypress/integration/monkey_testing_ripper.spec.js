describe("Los estudiantes under monkeys", function() {
  it("visit los estudiantes and survives monkeys", function() {
    cy.visit("https://losestudiantes.co");
    cy.contains("Cerrar").click();
    cy.wait(1000);
    //randomClick(1000);
    randomEvent(10);
  });
});

function randomClick(monkeysLeft) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //alert(Math.floor(Math.random() * (max - min)) + min);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var monkeysLeft = monkeysLeft;
  if (monkeysLeft > 0) {
    cy.get("a").then($links => {
      var randomLink = $links.get(getRandomInt(0, $links.length));
      if (!Cypress.dom.isHidden(randomLink)) {
        cy.wrap(randomLink).click({ force: true });
        monkeysLeft = monkeysLeft - 1;
      }
      setTimeout(randomClick, 1000, monkeysLeft);
    });
  }
}

function randomEvent(monkeyRight) {
  function getRandomEvent() {
    var numberRandom;
    var event;
    numberRandom = Math.floor(Math.random() * (4 - 0) + 0);
    switch (numberRandom) {
      case 0:
        event = "button";
        break;
      case 1:
        event = "a";
        break;
      case 2:
        event = "input";
        break;
      case 3:
        event = "select";
        break;
    }
    return event;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //alert(Math.floor(Math.random() * (max - min)) + min);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var monkeyRight = monkeyRight;
  if (monkeyRight > 0) {
    var eventExecute = getRandomEvent();

    switch (eventExecute) {
      case "button":
        cy.get("button").then($links1 => {
          var randomLink = $links1.get(getRandomInt(0, $links1.length));
          if (!Cypress.dom.isHidden(randomLink)) {
            cy.wrap(randomLink).click({ force: true });
            monkeyRight = monkeyRight - 1;
          }
          cy.wait(500);
          setTimeout(randomEvent, 1000, monkeyRight);
        });
        break;

      case "a":
        cy.get("a").then($links1 => {
          var randomLink = $links1.get(getRandomInt(0, $links1.length));
          if (!Cypress.dom.isHidden(randomLink)) {
            cy.wrap(randomLink).click({ force: true });
            monkeyRight = monkeyRight - 1;
          }
          cy.wait(500);
          setTimeout(randomEvent, 1000, monkeyRight);
        });
        break;
      case "input":
        cy.get("input").then($text1 => {
          var randomInput = $text1.get(getRandomInt(0, $text1.length));
          if (!Cypress.dom.isHidden(randomInput)) {
            cy.wrap(randomInput)
              .click()
              .type("PruebaMonkey");
            monkeyRight = monkeyRight - 1;
          }
          cy.wait(500);
          setTimeout(randomEvent, 1000, monkeyRight);
        });
        break;
      case "select":
        cy.get("select").then($select => {
          var randomSelect = $select.get(getRandomInt(0, $select.length));
          if (!Cypress.dom.isHidden(randomSelect)) {
            cy.wrap(randomSelect)
              .children("option")
              .eq(getRandomInt(0, randomSelect.options.length))
              .then(e => {
                cy.wrap(randomSelect).select(e.val());
              });
            monkeyRight = monkeyRight - 1;
          }
          cy.wait(1000);
          setTimeout(randomEvent, 1000, monkeyRight);
        });
        break;
    }
  }
}
