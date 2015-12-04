# Webpack introduction

Demonstration of the basics of bundling with webpack. Build in a live coding session on December 3, 2015.

# Requirements

* Git (for cloning)
* Node (for npm)

# Building

```bash
# globally install webpack and webpack dev server
npm install --global webpack webpack-dev-server

git clone https://github.com/configi/lunch.js/
cd lunch.js/webpack
npm install
```

This will clone the lunch.js repository and install the dependencies for the webpack demo.

# Running

Start the development server with

```bash
webpack-dev-server --hot --inline
# open a webbrower at http:localhost:8080
```

Bundle manually with

```bash
webpack
# inspect files in the bundle folder
```

Bundle for production (minification) with

```bash
webpack -p
```
