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
  let htmlEntity = "<>&/,:;\"`\\'|{ }$!()*-#[]=~_.+%";

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
    // console.log("input:", input);
    let encodeInputEntity;
    if (
      encodeFormat === "html" ||
      encodeFormat === undefined ||
      encodeFormat === null
    ) {
      encodeInputEntity = `&#x${input.codePointAt().toString(0x10)};`;
    } else if (encodeFormat === "uri") {
      let add2EncodeURIComponent = "'!()*-~_.";

      if (add2EncodeURIComponent.includes(input)) {
        encodeInputEntity = `%${input.codePointAt().toString(0x10)}`;
      } else {
        encodeInputEntity = encodeURIComponent(input);
      }
    } else if (encodeFormat === "unicode") {
      // encodeInputEntity = input.replace(input, function (c) {
      //   return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
      // });
      encodeInputEntity =
        "\\u" + ("0000" + input.charCodeAt(0).toString(16)).slice(-4);
    } else {
      encodeInputEntity =
        "BAD ARGUMENT: Enter Either 'html' OR 'uri' OR 'unicode' OR 'null' As The 2nd Argument";
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
    let base64Matcher = new RegExp(
      "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$"
    );

    if (base64Matcher.test(html)) {
      let deBase64 = atob(html);
      // The Input Is Base64. Further Processing Is Needed
      base64Counter++;
      // Call Self To Process Further base64 Entities (If Any) {Recursive}
      return base64Check(htmlEntity, deBase64);
    } else {
      // The Input Is A String. So It Free To Pass
      let returnedStr = encodeInputStr(htmlEntity, html);
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
    // Start Encoding Inputs Based On JavaScript Object Types
    if (typeof html === "undefined" || html === null) {
      return "A Valid Input Is Required Here...";
    } else if (typeof html === "number" || typeof html === "boolean") {
      return html;
    } else if (typeof html === "function") {
      return encodeInputStr(htmlEntity, String(html));
    } else if (typeof html === "object") {
      // Process All Objects Including Arrays (Excluding Null)
      return encodeInputObj(htmlEntity, html);
    } else if (typeof html === "string") {
      return base64Check(htmlEntity, html);
    }
  }
  // Init Function
  return typeChecker(htmlEntity, html);
}

// console.log(escapeHTML_URI("PHNjcmlwdD5hbGVydCgxMzM3KTwvc2NyaXB0Pg==", "uri"));
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
