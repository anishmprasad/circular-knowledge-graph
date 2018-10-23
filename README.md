# knowledge-graph

A visualisation which represents technology

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

you need to install node and npm 

```
For OSX
brew install node

```

### Installing

A step by step series of examples that tell you how to get a development env running

Clone this repository

```
git clone https://github.com/Anishmprasad/knowledge-graph.git
```
and select repository
```
cd knowledge-graph
```
And install packages

```
npm install 
```
finally start project ( development environment )
```
npm run dev
```
Open `localhost:5555` on your browser

### Usage

please use `selectedNode` function for selected node event handler

```js

/**
 * @description selected project logic added here
 * @param {object} node 
 * 
 */
export default function selectedNode(node){
  console.log('selectedNode',node)
  // sample node object
  {
    data : {
      RGB: {r: 251, g: 188, b: 5},
      fallbackColor: "#FBBC05",
      id: "fontdiff",
      name: "FontDiff",
      small: true,
      startsWith: "f",
      summary: "A tool for finding visual differences between font versions",
    }
    ...
  }
}

```

### Screenshot

![Preview][screenshot]

[screenshot]: https://github.com/Anishmprasad/knowledge-graph/raw/master/src/public/images/screenshot.png "Preview screenshot"


## Built With

* [Webpack](https://webpack.js.org/) - Module Bundler
* [Zone](https://github.com/angular/zone.js/) - Implements Zones for JavaScript

## Author

- Anish M Prasad (anishmprasad@gmail.com)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Anishmprasad/knowledge-graph/blob/master/README.md) file for details

*In the words of Martin Luther King Junior:*
> Hate cannot drive out hate; only love can do that.
