# mech-ajax

Mechanisms which support asynchronous ajax calls without the need for fibers or promises.

See [Mechanisms Home][mech-home-link] for more information and other libraries.

Supported Mechanisms

* *[ajax.get](#get-mechanism)* - Submits a get request to a server for a given ```uri```.

# Supported Mechanisms

## <a name="get-mechanism"></a> ajax.get

```ajax.get``` makes an ajax **GET** request against a ```uri```. It works in conjunction with the core ```async``` mechanism.

Traditionally, asynchronous callbacks are handled using a function:

```javascript
var httpRequest = new XMLHttpRequest(); // or new ActiveXObject(...);
var strURL = "http://www.example.org/some.file";
// ...
xmlHttpReq.onreadystatechange = function() {
  console.log(xmlHttpReq.responseText);
}
```

With mechanisms and [cell scoping][mech-scope-cell-home-link]:

```javascript
m.cell("A:1");
m.async(
  m.ajax.get("http://www.example.org/some.file"),
  m.cellRef("A:1"),
  m.writeLn(m.cellGet("A:1"))
).go;
```

The result of the ```ajax.get``` call is placed into cell ```A:1```. The value of that cell is then written to the console.

# Setup

## Using In Your Projects

Change directory to your node ajax.

```
$ npm install --save mech-ajax
```

## Development

### Get Involved!

There are **a lot** of core mechanisms just waiting to be created. Many of them can be created in a few hours including in-depth tests. Clone [mech-library][mech-library-link] to get started!

### Setup

Install:
```
$ npm install
```

Continuous test:
```
$ gulp
```

Test:
```
$ gulp webtests
```

#### Test Server

Read documentation in gulpfile.js to see how to setup automated web testing.

```
$ gulp webserver
```

[mech-library-link]: https://github.com/mechanismsjs/mech-library "Clone to easily create new mechanism libraries"
[mech-home-link]: https://github.com/mechanisms/mech "Home repository for mechanisms"
[mech-scope-stack-home-link]: https://github.com/mechanismsjs/mech-scope-stack "Stack based scoping mechanisms."
[mech-scope-cell-home-link]: https://github.com/mechanismsjs/mech-scope-cell "Cell based scoping mechanisms."
