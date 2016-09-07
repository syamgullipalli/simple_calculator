# simple_calculator
A simple calculator using HTML, CSS and JavaScript.
The basic idea of this project is to implement a javascript application following the ground rules:

* modular code
* separation of concern
* loosely coupled
* encapsulate
* testable

[Publish–subscribe pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) is used to make the application loosely coupled. [AMD](https://www.safaribooksonline.com/library/view/learning-javascript-design/9781449334840/ch11s02.html) pattern is followed using [dojo](https://dojotoolkit.org/) for scalable application. Unit and functional tests are written using [Intern](https://theintern.github.io/).
---

**Requirements**

* [Node package manager](https://nodejs.org/en/) 
* Please refer to the `package.json` file for dependencies.

---

**How to run**

* Clone the project
* Run `npm install` from the `simple_calculator` directory to download and install the dependencies.
* Open `simple_calculator/src/index.html` in a browser window
* Optional
    * run `npm start` to run the node server
    * look at the console message for the host address

---

**How to test**

* Run `npm test` from the `simple_calculator` directory to run the test cases. 
* Apart from the console output, the code coverage results will be stored in  `simple_calculator/tests/reports`.
* After running the tests, open `simple_calculator/tests/reports/index.html` in a browser window to look at the results.

---

**Courtesy and useful links**

* Styled following the instructions at [http://thecodeplayer.com/walkthrough/javascript-css3-calculator](http://thecodeplayer.com/walkthrough/javascript-css3-calculator).
* Basic publish-subscribe pattern in javascript at [https://gist.github.com/learncodeacademy/777349747d8382bfb722](https://gist.github.com/learncodeacademy/777349747d8382bfb722).
* Modular javascript tutorial series [https://www.youtube.com/playlist?list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f](https://www.youtube.com/playlist?list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f).
* Publish-subscribe pattern basics [http://learning-0mq-with-pyzmq.readthedocs.io/en/latest/pyzmq/patterns/pubsub.html](http://learning-0mq-with-pyzmq.readthedocs.io/en/latest/pyzmq/patterns/pubsub.html).
* Intern JavaScript test plugin [https://theintern.github.io/](https://theintern.github.io/).
* jQuery (write less, do more) [https://jquery.com/](https://jquery.com/).
* [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition)
* [Why Choose Dojo?](https://dojotoolkit.org/reference-guide/1.7/quickstart/introduction/whydojo.html)
* How to Unit Test Private Functions in JavaScript by Philip Walton [https://philipwalton.com/articles/how-to-unit-test-private-functions-in-javascript/](https://philipwalton.com/articles/how-to-unit-test-private-functions-in-javascript/). Many other important topics are covered in his blog [https://philipwalton.com/](https://philipwalton.com/).
* Some books: 
    * [Learning Javascript Design Script Patterns](http://shop.oreilly.com/product/0636920025832.do) by [Addy Osmani](https://twitter.com/addyosmani).
    * [Pro JavaScript Design Patterns](http://link.springer.com/book/10.1007%2F978-1-4302-0496-1) by [Dustin Diaz](http://www.dustindiaz.com/) and Ross Harmes.
* Dealing with numbers in javascript:
    * [What Every Computer Scientist Should Know About Floating-Point Arithmetic](docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html)
    * [Why don’t my numbers add up?](http://floating-point-gui.de/)
    * [JavaScript Numbers](http://www.w3schools.com/js/js_numbers.asp)