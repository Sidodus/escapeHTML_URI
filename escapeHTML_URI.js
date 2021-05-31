/*
 ** escapeHTML_URI v1.1.3
 ** Purpose: Escaping Html & URI Entities To Prevent SQLi, XSS, & Related Attacks.
 ** Copyright (c) 2021 Saheed Odulaja
 **
 ** NPM @ https://www.npmjs.com/package/escape_html_uri
 ** GitHub @ https://github.com/Sidodus/escapeHTML_URI
 **
 ** LinkedIn Profile @ https://www.linkedin.com/in/saheed-odulaja-75111337
 */

//  Get global scope
const isNode = (function () {
  try {
    return this === global;
  } catch (e) {
    return false;
  }
})();

//  Base64 Encoding and Decoding in Node.js & Browsers
if (isNode) {
  var atob = (str) => Buffer.from(str, "base64").toString("binary");
  var btoa = (str) => Buffer.from(str, "binary").toString("base64");
} else {
  var atob = window.atob;
  var btoa = window.btoa;
}

function escapeHTML_URI(html, encodeFormat, htmlEncodeEntity) {
  // console.log("html: ", html);
  // console.log("typeof html:", typeof html);

  let htmlEntity = "<>&/,:;\"`\\'|{ }$!()*-#[]=~_.";

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

  // HTML & URI Entity Encoder
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
        .replace("~", "&#x7e;")
        .replace("_", "&#x5f;")
        .replace(".", "&#x2e;");
    } else if (encodeFormat === "uri") {
      let add2EncodeURIComponent = "'!()*-~_.";

      if (add2EncodeURIComponent.includes(input)) {
        encodeInputEntity = input
          .replace("'", "%27")
          .replace("!", "%21")
          .replace("(", "%28")
          .replace(")", "%29")
          .replace("*", "%2a")
          .replace("-", "%2d")
          .replace("~", "%7e")
          .replace("_", "%5f")
          .replace(".", "%2e");
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
    let newHtmlObj;
    // Define Different Container For Objects & Arrays
    Array.isArray(htmlObj) ? (newHtmlObj = []) : (newHtmlObj = {});

    let x;
    for (let x in htmlObj) {
      if (typeof htmlObj[x] === "object") {
        // Its An Object Recursive Algorithm
        htmlObj[x] === null
          ? (newHtmlObj[x] = "A Valid Input Is Required Here...")
          : (newHtmlObj[x] = encodeInputObj(htmlEntity, htmlObj[x]));
      } else {
        newHtmlObj[x] = typeChecker(htmlEntity, htmlObj[x]);
      }
    }
    return newHtmlObj;
  }

  // Encode User Input (Non-Object Types)
  // Process Strings, Function, Null, Undefined, Boolean etc.
  function encodeInputStr(htmlEntity, html) {
    let htmlStr = html;
    let htmlStrArr = htmlStr.split("");

    let i;
    for (i = 0; i < htmlStrArr.length; i++) {
      if (htmlEntity.includes(htmlStrArr[i])) {
        htmlStrArr[i] = encoder(htmlStrArr[i]);
      }
    }
    let newHtml = htmlStrArr.join("");
    return newHtml;
  }

  base64Counter = 0;
  const base64Check = (htmlEntity, html) => {
    let newHtml = html;
    let base64Matcher = new RegExp(
      "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$"
    );

    if (base64Matcher.test(newHtml)) {
      let deBase64 = atob(newHtml);
      // The Input Is Base64. Further Processing Is Needed
      base64Counter++;
      // Call Self To Process Further base64 Entities (If Any) {Recursive}
      return base64Check(htmlEntity, deBase64);
    } else {
      // The Input Is A String. So It Free To Pass
      let returnedStr = encodeInputStr(htmlEntity, newHtml);
      // Re-Encode base64 (If Needed)
      if (base64Counter > 0) {
        let i;
        let reEncodeBase64 = returnedStr;
        for (i = 0; i < base64Counter; i++) {
          reEncodeBase64 = btoa(reEncodeBase64);
        }
        base64Counter = 0;
        return reEncodeBase64;
      } else {
        base64Counter = 0;
        return returnedStr;
      }
    }
  };

  function typeChecker(htmlEntity, html) {
    let newHtml = html;
    // Start Encoding Inputs Based On JavaScript Object Types
    if (typeof newHtml === "undefined" || newHtml === null) {
      return "A Valid Input Is Required Here...";
    } else if (typeof newHtml === "number" || typeof newHtml === "boolean") {
      return newHtml;
    } else if (typeof newHtml === "function") {
      return encodeInputStr(htmlEntity, String(newHtml));
    } else if (typeof newHtml === "object") {
      // Process All Objects Including Arrays (Excluding Null)
      return encodeInputObj(htmlEntity, newHtml);
    } else if (typeof newHtml === "string") {
      return base64Check(htmlEntity, newHtml);
    }
  }
  // Init Function
  return typeChecker(htmlEntity, html);
}

// console.log(escapeHTML_URI("PHNjcmlwdD5hbGVydCgxMzM3KTxcL3NjcmlwdD4=", "uri"));
// console.log(escapeHTML_URI(">=", "uri"));
// console.log(escapeHTML_URI(">=", "uri", ""));

// Export Script
if (typeof define === "function" && define.amd) {
  //AMD.
  define(function () {
    return escapeHTML_URI;
  });
} else if (typeof module !== "undefined" && module.exports) {
  // Node and other CommonJS-like environments that support module.exports.
  module.exports = escapeHTML_URI;
} else {
  //Browser.
  escapeHTML_URI;
}
