<h1 align= "center"><ins><em>escapeHTML_URI</em> Entities</ins></h1>
<h6 align= "center" style="color: grey; margin-top: -10px"><small><a href="#">... #<em>escapeHTML_URI</em> Entities ...</a></small></h6><br />

<blockquote align="center" style="font-size: 1.5em">
    The Goal Of <em>escapeHTML_URI</em> Script Is To Prevent SQLi & XSS Attacks By Escaping Both HTML & URI Entities. </br></br>
    <div style="font-size: 0.9em"><em>escapeHTML_URI</em> Can Process All JavaScript Object Types; </br>
    Encode The Input (no matter the Object dept), And </br>
    Output The Result With Same Object Type As The Input Value.</div>
</blockquote></br>
<blockquote align="center">
<h2 style="color: black;"><ins>Supported HTML / URI Entities Are</ins> </h2>
    <code style="color: blue; font-size: 3em" onmouseover="this.style.color ='green'" onmouseout="this.style.color = 'blue'"> <>&/,:;"`\'|{ }$!()*-#[]=~ </code>
</blockquote>

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
    <div>Argument 2 Defaults To <code> html </code> If <code> null </code> Is Supplied OR Value Is Empty </div>
    <div>Argument 3 Defaults To <code> <>&/,:;\"`\\'|{ }$!()*-#[]=~ </code> If Nothing Is Supplied</div>
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

<h2 align="center"> Install From: </h2>

<h6>Install From <a href="https://www.npmjs.com/package/escape_html_uri" target="_blank">NPM</a></h6>

```js
npm i escape_html_uri
```

<h6>Get Source Code From <a href="https://github.com/Sidodus/escapeHTML_URI" target="_blank">GitHub</a></h6>

```js
gh repo clone Sidodus/escapeHTML_URI
```

<br /><br />

> escapeHTML_URI Is Developed By <a href="https://www.linkedin.com/in/saheed-odulaja-75111337" target="_blank"> Saheed Odulaja</a>.
