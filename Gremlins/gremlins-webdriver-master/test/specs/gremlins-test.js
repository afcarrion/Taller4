function loadScript(callback) {
  var s = document.createElement("script");
  s.src = "https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js";
  if (s.addEventListener) {
    s.addEventListener("load", callback, false);
  } else if (s.readyState) {
    s.onreadystatechange = callback;
  }
  document.body.appendChild(s);
}

/**
 * Este método recibe un límite de tiempo en el que debe terminar el ataque de los gremlins
 *  contra la página y crea una armada de gremlins con el método createHorde()
 * @param {seg} ttl
 * @param {llamado a finalizar la prueba} callback
 */
function unleashGremlins(ttl, callback) {
  function stop() {
    horde1.stop(); //adicione 1
    callback();
  }
  /*var horde = window.gremlins.createHorde();
  horde.seed(1234);

  horde.after(callback);
  window.onbeforeunload = stop;
  //setTimeout(stop, ttl);
  horde.unleash();*/

  var horde1 = window.gremlins.createHorde();

  var formFillerGremlin = gremlins.species.formFiller();
  var clickerGremlin = gremlins.species.clicker();

  formFillerGremlin.canFillElement(function(element) {
    return true;
  }); // to limit where the gremlin can fill
  clickerGremlin.canClick(function(element) {
    return true;
  }); // to limit where the gremlin can click
  horde1.gremlin(formFillerGremlin);
  horde1.gremlin(clickerGremlin);
  horde1.strategy(
    gremlins.strategies
      .distribution()
      .delay(50)
      .distribution([
        0.8, // first gremlin
        0.2 // second gremlin
      ])
  );
  horde1.seed(1234);
  horde1.after(callback);
  window.onbeforeunload = stop;
  setTimeout(stop, ttl);
  horde1.unleash();
}

describe("Monkey testing with gremlins ", function() {
  it("it should not raise any error", function() {
    browser.url("/");
    browser.click("button=Cerrar");

    /**
     *
     */
    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(loadScript);

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(unleashGremlins, 50000);
  });

  /**
   * En este simplemente tomamos todos los logs del navegador y los imprimimos
   * en el terminal en el que se está corriendo la prueba
   */
  afterAll(function() {
    browser.log("browser").value.forEach(function(log) {
      browser.logger.info(log.message.split(" ")[2]);
    });
  });
});
