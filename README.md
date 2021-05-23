<h1 align= "center"><ins><em>escapeHTML_URI</em> Entities</ins></h1>
<h6 align= "center" style="color: grey; margin-top: -10px"><small><a href="#">... #<em>escapeHTML_URI</em> Entities ...</a></small></h6><br />

<blockquote align="center" style="font-size: 1.5em">
    The Goal Of <em>escapeHTML_URI</em> Script Is To Prevent SQLi, XSS & Related Attacks By Escaping Both HTML & URI Entities. </br></br>
    <div style="font-size: 0.9em"><em>escapeHTML_URI</em> Can Process All JavaScript Object Types; </br>
    Encode The Input (no matter the Object dept); </br>
    & </br>
    Output The Result With The Same Object Type As The Input Value.</div>
</blockquote></br>
<blockquote align="center">
<h2 style="color: black;"><ins>Supported HTML / URI Entities Are</ins> </h2>
    <code style="color: blue; font-size: 3em" onmouseover="this.style.color ='green'" onmouseout="this.style.color = 'blue'"> <>&/,:;"`\'|{ }$!()*-#[]=~ </code>
</blockquote>
</br>
</br>

<h2 align="center"> Using Script Without Installing </h2>

<h6>Use On <a href="https://replit.com/languages/Nodejs#index.js" target="_blank">replit</a></h6>

```js
// Navigate To https://replit.com/languages/Nodejs#index.js
// On replit Call...

const escapeHTML_URI = require("escape_html_uri");

escapeHTML_URI(
  { b: [true, 26, "Bree", ":", "</>", null, undefined] },
  "uri",
  ":</>"
);

// Replit Output Below
html: {
  b: [true, 26, "Bree", ":", "</>", null, undefined];
}
{
  b: [true, 26, "Bree", "%3A", "%3C%2F%3E", null, undefined];
}
```

<br />

<hr />

<h2 align="center"> Setup In Project </h2>

<h6>HTML Script</h6>

```html
<script src="escapeHTML_URI.js"></script>
```

<br />

<hr />

<h2 align="center"> Installation </h2>
<h6><a href="https://www.npmjs.com/package/escape_html_uri" target="_blank">NPM Installation</a></h6>

```sh
npm i escape_html_uri

```

<br />

<hr />

<h2 align="center"> Clone Repo </h2>
<h6><a href="https://github.com/Sidodus/escapeHTML_URI" target="_blank">GitHub Repo</a></h6>

```sh
gh repo clone Sidodus/escapeHTML_URI

```

<br />

<hr />

<h2 align="center"> Import To Project </h2>

<h6>ES5 module:</h6>

```js
const escapeHTML_URI = require("escape_html_uri");
```

<h6>ES6 module:</h6>

```js
import { escapeHTML_URI } from "escape_html_uri";
```

<h6>AMD loader libraries such as requireJS:</h6>

```js
require(["escape_html_uri"], function (html) {
  // Use escape_html_uri here in local scope.
});
```

<br />

<hr />

<h2 align="center"> Use In Project: </h2>

<h1>

```js
escapeHTML_URI(html, encodeFormat, htmlEncodeEntity);
```

</h1>

<h4>
    <ins>EXPLANATION</ins> <br/ >
    <code> <em>escapeHTML_URI(html, encodeFormat, htmlEncodeEntity)</em> </code> Takes In 3 Arguments, With only The 1st Argument Being Compulsory.  <br/ >
    </br>
    <code> html </code> = Input To Encode <span style="color: gray">(COMPULSORY)</span> <br/ >
    <code> encodeFormat </code> = The Encode Format e.g (html OR uri) <span style="color: gray">(OPTIONAL)</span> <br/ >
    <code> htmlEncodeEntity </code> = Your Custom HTML / URI Encode Entity Based On Supported Values <span style="color: gray">(OPTIONAL)</span>
    </br></br>
    <ins>NOTE:</ins>
    <ul>
      <li><code>Argument 2</code> Defaults To <code> html </code> If <code> null </code> Is Supplied OR Value Is Empty.</li>
      <li><code>Argument 3</code> Defaults To <code> <>&/,:;"`\'|{ }$!()*-#[]=~ </code> If Nothing Is Supplied.</li>
      <li>Unsupported Html & URI Entity Values Are Ignored In <code>Argument 3</code></li>
    </ul>
</h4>
    <br/ >

<h4>
    <ins>EXAMPLES</ins> <br/ >
</h4>

<h5>Input Type = String</h5>

```js
escapeHTML_URI("<script>alert(1337)</script>");

Output = &lt;script&gt;alert&#x28;1337&#x29;&lt;&#x2f;script&gt;
```

</br>
<h5>Input Type = Array </br>
1st Optional Argument = html</h5>

```js
escapeHTML_URI(["<", ">", "&", "/", ",", ":", ";", """, "`", "\", "'", "|", "{", "}", "$", " ", "!", "(", ")", "*", "-", "#", "[", "]", "=", "~"], "html");

Output = ["&lt;", "&gt;", "&amp&#x3b;", "&#x2f;", "&#x2c;", "&#x3a;", "&#x3b;", "&quot;", "&#x60;", "&#x5c;", "&apos;", "&#x7c;", "&#x7b;", "&#x7d;", "&#x24;", "&nbsp;", "&#x21;", "&#x28;", "&#x29;", "&#x2a;", "&#x2d;", "&#x23&#x3b;", "&#x5b;", "&#x5d;", "&#x3d;", "&#x7e;"]
```

</br>
<h5>Input Type = Object</br>
1st Optional Argument = uri</h5>

```js
escapeHTML_URI(
  { a: "<", b: ">", c: "\\", "{": "}", x: "<24>", y: "/", z: "{26}" },
  "uri"
);

Output = {
  a: "%3C",
  z: "%3E",
  c: "%5C",
  x: "%3C24%3E",
  y: "%2F",
  z: "%7B26%7D",
  "{": "%7D",
};
```

</br>
<h5>Input Type = String</br>
1st Optional Argument = uri </br>
2nd Optional Argument = &lt;&#x2f;&gt;</h5>

```js
escapeHTML_URI("<script>alert(1337)<\/script>", "uri", "</>")

Output = %3Cscript%3Ealert(1337)%3C%2Fscript%3E

```

</br>
<h5>Input Type = Object</br>
1st Optional Argument = null </br>
2nd Optional Argument = &lt;&gt;&amp&#x3b;&#x2f;&#x2c;&#x3a;&#x3b;&#x5c;&#x7b;&nbsp;&#x7d;&#x28;&#x29;</h5>

```js
escapeHTML_URI(
  {
    f: {
      str: "<script>alert(1337)<\\/script>",
      e: {
        arr: [1, ">", "a", "<", 2, "b", "{", 3, "c"],
        d: {
          func: () => "hello World",
          c: {
            NulL: null,
            b: {
              Bool: true,
              a: {
                Bool: false,
                obj: {
                  g: "$",
                  str: { a: ">" },
                  str2: { b: "</script>", g: () => "hello World" },
                  str3: { b: ["z", 26, "Bree", ":", "</>"] },
                  func: "<script>alert(1337)<\\/script>",
                  arr: [1, ">", "a", "<", 2, "b", "{", 3, "c"],
                },
                str: "<script>alert(1337)<\\/script>",
                arr: [1, ">", "a", "<", 2, "b", "{", 3, "c"],
                func: () => "hello World",
              },
            },
          },
        },
      },
    },
  },
  null,
  "<>&;/,:;{ }()"
);

Output = {
  f: {
    str: "&lt;script&gt;alert&#x28;1337&#x29;&lt;\\&#x2f;script&gt;",
    e: {
      arr: [1, "&gt;", "a", "&lt;", 2, "b", "&#x7b;", 3, "c"],
      d: {
        c: {
          NulL: null,
          b: {
            Bool: true,
            a: {
              Bool: false,
              obj: {
                g: "$",
                str: { a: "&gt;" },
                str2: { b: "&lt;&#x2f;script&gt;" },
                str3: { b: ["z", 26, "Bree", "&#x3a;", "&lt;&#x2f;&gt;"] },
                func: "&lt;script&gt;alert&#x28;1337&#x29;&lt;\\&#x2f;script&gt;",
                arr: [1, "&gt;", "a", "&lt;", 2, "b", "&#x7b;", 3, "c"],
              },
              str: "&lt;script&gt;alert&#x28;1337&#x29;&lt;\\&#x2f;script&gt;",
              arr: [1, "&gt;", "a", "&lt;", 2, "b", "&#x7b;", 3, "c"],
            },
          },
        },
      },
    },
  },
};
```

<br /><br />

> escapeHTML_URI Is Developed By <a href="https://www.linkedin.com/in/saheed-odulaja-75111337" target="_blank"> Saheed Odulaja</a>.
