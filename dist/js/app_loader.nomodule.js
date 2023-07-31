System.register([__v__("/js/vendors.nomodule.js")], function (_export, _context) {
  "use strict";

  var inlineContent, stylesheet, loadApp, loadAppJs, loadAppCss;
  return {
    setters: [function (_vendorsJs) {}],
    execute: function () {
      inlineContent = new __InlineContent__('@font-face {\n  font-family: ArrrMateyBb;\n  src: url('+__v__("/other/arrr_matey_bb_wn3.ttf")+');\n  font-display: swap;\n}\n\n#splashscreen {\n  font-family: ArrrMateyBb;\n  font-size: 50px;\n}\n', {
        type: "text/css"
      });
      stylesheet = new CSSStyleSheet();
      stylesheet.replaceSync(inlineContent.text);
      _export("loadApp", loadApp = async _ref => {
        let {
          appNode
        } = _ref;
        performance.measure(`loading app`);
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
        const appJsPromise = loadAppJs();
        const appCssPromise = loadAppCss(new URL(__v__("/css/app.css"), _context.meta.url));
        const app = await appJsPromise;
        performance.measure(`rendering app`);
        await app.createMilleSabordGame({
          into: appNode,
          onLoadProgress: () => {}
        });
        performance.measure(`app rendered`);
        await Promise.all([
        // wait for CSS to be loaded before displaying the app
        appCssPromise,
        // app.render() can be very expensive so we wait a bit
        // to let navigator an opportunity to cooldown
        // This should help to save battery power and RAM
        new Promise(resolve => {
          if (window.requestIdleCallback) {
            window.requestIdleCallback(resolve, {
              timeout: 60
            });
          } else {
            window.requestAnimationFrame(resolve);
          }
        })]);
        performance.measure(`app displayed`);
      });
      loadAppJs = async () => {
        const app = await _context.import(__v__("/js/app.nomodule.js")).then(n => n.app);
        performance.measure("app.js ready");
        return app;
      };
      loadAppCss = async function loadAppCss(cssUrl) {
        let {
          crossOrigin
        } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        const cssPromise = new Promise((resolve, reject) => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.onload = resolve;
          link.onerror = reject;
          link.href = cssUrl;
          link.crossOrigin = crossOrigin;
          document.head.appendChild(link);
        });
        await cssPromise;
        performance.measure(`app.css ready`);
      };
    }
  };
});