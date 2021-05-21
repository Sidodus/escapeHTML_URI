function escapeHTML_URI(html, encodeFormat, htmlEncodeEntity) {
  console.log("html: ", html);
  let htmlEntity = "<>&/,:;\"`\\'|{ }$!()*-#[]=~";

  if (htmlEncodeEntity === undefined || htmlEncodeEntity === null) {
    htmlEntity = htmlEntity;
  } else {
    let elem = htmlEncodeEntity.split("");

    //   Notify Users Of The Supported htmlEncodeEntity When An Out Of Bound Entity Is Entered
    for (let i = 0; i < elem.length; i++) {
      if (!htmlEntity.includes(elem[i])) {
        alert(
          `ONLY: \n ${htmlEntity.split("").map((element) => {
            return "  " + element + "  ";
          })} \n ENTITIES ARE ALLOWED In The 3rd Argument`
        );
      }
      break;
    }
    htmlEntity = htmlEncodeEntity;
  }
  // HTML Entity Encoder
  function encoder(input) {
    let encodeInputEntity;
    if (
      encodeFormat === "html" ||
      encodeFormat === undefined ||
      encodeFormat === null
    ) {
      encodeInputEntity = input
        .replace("&", "&amp;") // Top 1 For HTML
        .replace("#", "&#x23;") // Top 2 For HTML
        .replace(";", "&#x3b;") // Top 3 For HTML
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("/", "&#x2f;")
        .replace('"', "&quot;")
        .replace("'", "&apos;")
        .replace(",", "&#x2c;")
        .replace(":", "&#x3a;")
        .replace("`", "&#x60;")
        .replace("\\", "&#x5c;")
        .replace("|", "&#x7c;")
        .replace("{", "&#x7b;")
        .replace("}", "&#x7d;")
        .replace("$", "&#x24;")
        .replace(" ", "&nbsp;")
        .replace("!", "&#x21;")
        .replace("(", "&#x28;")
        .replace(")", "&#x29;")
        .replace("*", "&#x2a;")
        .replace("-", "&#x2d;")
        .replace("[", "&#x5b;")
        .replace("]", "&#x5d;")
        .replace("=", "&#x3d;")
        .replace("~", "&#x7e;");
    } else if (encodeFormat === "uri") {
      let add2EncodeURIComponent = "'!()*-~";

      if (add2EncodeURIComponent.includes(input)) {
        encodeInputEntity = input
          .replace("'", "%27")
          .replace("!", "%21")
          .replace("(", "%28")
          .replace(")", "%29")
          .replace("*", "%2a")
          .replace("-", "%2d")
          .replace("~", "%7e");
      } else {
        encodeInputEntity = encodeURIComponent(input);
      }
    } else {
      encodeInputEntity =
        "BAD ARGUMENT: Enter Either 'html' OR 'uri' OR 'null' As The 2nd Argument";
    }
    return encodeInputEntity;
  }

  // Encode User Input (Object Types)
  function encodeInputObj(htmlEntity, htmlObj) {
    let x;
    for (let x in htmlObj) {
      if (
        typeof htmlObj[x] === "number" ||
        typeof htmlObj[x] === null ||
        typeof htmlObj[x] === undefined ||
        typeof htmlObj[x] === "function" ||
        typeof htmlObj[x] === "boolean"
      ) {
        htmlObj[x] = htmlObj[x];
      } else if (typeof htmlObj[x] === "object") {
        // Its An Object Recursive Algorithm
        htmlObj[x] = encodeInputObj(htmlEntity, htmlObj[x]);
      } else if (typeof htmlObj[x] === "string") {
        // Its A Single String
        htmlObj[x] = encodeInputStr(htmlEntity, htmlObj[x]);
      }
    }
    return htmlObj;
  }

  // Encode User Input (Non-Object Types)
  // Process Strings, Function, Null, Undefined, Boolean etc.
  function encodeInputStr(htmlEntity, html) {
    let htmlStr = String(html);
    let htmlStrArr = htmlStr.split("");

    let i;
    for (i = 0; i < htmlStrArr.length; i++) {
      if (htmlEntity.includes(htmlStrArr[i])) {
        htmlStrArr[i] = encoder(htmlStrArr[i]);
      }
    }
    let newHtml = htmlStrArr.join("");
    return typeof html === "number" ? Number(newHtml) : String(newHtml);
  }

  // Start Encoding Inputs Based On JavaScript Object Types
  if (typeof html === "object") {
    // Process All Objects Including Arrays
    return encodeInputObj(htmlEntity, html);
  } else {
    // Process Strings, Function, Null, Undefined, Boolean etc.
    return encodeInputStr(htmlEntity, html);
  }
}

//AMD.
if (typeof define === "function" && define.amd) {
  define(function () {
    return escapeHTML_URI;
  });
  // Node and other CommonJS-like environments that support module.exports.
} else if (typeof module !== "undefined" && module.exports) {
  module.exports = escapeHTML_URI;
  //Browser.
} else {
  escapeHTML_URI;
}
