import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import Question from "../models/question.model.js";
import mongoose from "mongoose";

config();

const seedquestions = [
  // Javascript
  { questionText: "Which keyword is used to declare a constant?", options: ["var", "let", "const", "static"], correctAnswer: 2, category: "javascript", difficulty: "easy" },
  { questionText: "What is the output of typeof null?", options: ["null", "object", "undefined", "number"], correctAnswer: 1, category: "javascript", difficulty: "medium" },
  { questionText: "Which method converts JSON string to object?", options: ["JSON.parse()", "JSON.stringify()", "Object.parse()", "parse.JSON()"], correctAnswer: 0, category: "javascript", difficulty: "easy" },
  { questionText: "What does === check?", options: ["Value only", "Type only", "Value and type", "Reference only"], correctAnswer: 2, category: "javascript", difficulty: "easy" },
  { questionText: "Which function executes code after a delay?", options: ["setInterval()", "setTimeout()", "delay()", "wait()"], correctAnswer: 1, category: "javascript", difficulty: "easy" },
  { questionText: "Which keyword declares a block-scoped variable?", options: ["var", "let", "const", "function"], correctAnswer: 1, category: "javascript", difficulty: "easy" },
  { questionText: "Which array method adds an element at the end?", options: ["push()", "pop()", "shift()", "unshift()"], correctAnswer: 0, category: "javascript", difficulty: "easy" },
  { questionText: "Which array method removes the first element?", options: ["push()", "pop()", "shift()", "unshift()"], correctAnswer: 2, category: "javascript", difficulty: "easy" },
  { questionText: "What is NaN in JavaScript?", options: ["Not a Number", "Null", "Undefined", "Number"], correctAnswer: 0, category: "javascript", difficulty: "easy" },
  { questionText: "Which operator is used for exponentiation?", options: ["^", "**", "%", "*"], correctAnswer: 1, category: "javascript", difficulty: "easy" },
  { questionText: "What is the result of 0.1 + 0.2 === 0.3?", options: ["true", "false", "undefined", "NaN"], correctAnswer: 1, category: "javascript", difficulty: "medium" },
  { questionText: "Which method merges two arrays?", options: ["concat()", "merge()", "append()", "combine()"], correctAnswer: 0, category: "javascript", difficulty: "easy" },
  { questionText: "Which method returns a portion of an array?", options: ["slice()", "splice()", "split()", "portion()"], correctAnswer: 0, category: "javascript", difficulty: "easy" },
  { questionText: "Which event occurs when an HTML form is submitted?", options: ["onclick", "onchange", "onsubmit", "onload"], correctAnswer: 2, category: "javascript", difficulty: "easy" },
  { questionText: "Which keyword is used to define a function?", options: ["function", "def", "func", "lambda"], correctAnswer: 0, category: "javascript", difficulty: "easy" },
  { questionText: "Which symbol is used for template literals?", options: ["'", "`", '"', "$"], correctAnswer: 1, category: "javascript", difficulty: "easy" },
  { questionText: "Which method converts object to JSON string?", options: ["JSON.parse()", "JSON.stringify()", "Object.toJSON()", "toJSON()"], correctAnswer: 1, category: "javascript", difficulty: "easy" },
  { questionText: "Which method finds index of first occurrence in array?", options: ["find()", "indexOf()", "search()", "includes()"], correctAnswer: 1, category: "javascript", difficulty: "easy" },
  { questionText: "Which method filters array elements based on condition?", options: ["filter()", "map()", "reduce()", "forEach()"], correctAnswer: 0, category: "javascript", difficulty: "easy" },
  { questionText: "Which operator is used to assign default value?", options: ["||", "??", "&&", "??="], correctAnswer: 1, category: "javascript", difficulty: "medium" },

  // React
  { questionText: "What is React primarily used for?", options: ["Database", "Server scripting", "UI development", "Styling"], correctAnswer: 2, category: "react", difficulty: "easy" },
  { questionText: "Which hook manages state in functional component?", options: ["useState", "useEffect", "useRef", "useMemo"], correctAnswer: 0, category: "react", difficulty: "easy" },
  { questionText: "What is JSX?", options: ["JS framework", "JS syntax extension", "Database query", "CSS preprocessor"], correctAnswer: 1, category: "react", difficulty: "medium" },
  { questionText: "Which hook is used for side effects?", options: ["useState", "useEffect", "useContext", "useReducer"], correctAnswer: 1, category: "react", difficulty: "easy" },
  { questionText: "Purpose of keys in React lists?", options: ["Styling", "Unique ID", "Sorting", "Testing"], correctAnswer: 1, category: "react", difficulty: "medium" },
  { questionText: "Which hook is used for context API?", options: ["useState", "useEffect", "useContext", "useReducer"], correctAnswer: 2, category: "react", difficulty: "medium" },
  { questionText: "Which hook optimizes expensive calculations?", options: ["useEffect", "useMemo", "useRef", "useCallback"], correctAnswer: 1, category: "react", difficulty: "medium" },
  { questionText: "React is developed by?", options: ["Google", "Facebook", "Microsoft", "Amazon"], correctAnswer: 1, category: "react", difficulty: "easy" },
  { questionText: "What does ReactDOM.render() do?", options: ["Creates component", "Renders to DOM", "Updates state", "Handles props"], correctAnswer: 1, category: "react", difficulty: "easy" },
  { questionText: "Which lifecycle hook runs on every render?", options: ["componentDidMount", "componentDidUpdate", "useEffect without dependency", "useState"], correctAnswer: 2, category: "react", difficulty: "medium" },
  { questionText: "What is lifting state up?", options: ["Moving state to parent", "Moving state to child", "Global variable", "Context API"], correctAnswer: 0, category: "react", difficulty: "medium" },
  { questionText: "Which hook returns a mutable ref object?", options: ["useState", "useEffect", "useRef", "useMemo"], correctAnswer: 2, category: "react", difficulty: "medium" },
  { questionText: "Which method is used to update state?", options: ["setState()", "updateState()", "changeState()", "modifyState()"], correctAnswer: 0, category: "react", difficulty: "easy" },
  { questionText: "What is the default prop type in React?", options: ["String", "Object", "Any", "Number"], correctAnswer: 2, category: "react", difficulty: "medium" },
  { questionText: "React supports which type of binding?", options: ["One-way", "Two-way", "Both", "None"], correctAnswer: 0, category: "react", difficulty: "easy" },
  { questionText: "Which function component hook is async?", options: ["useEffect", "useState", "useRef", "None"], correctAnswer: 0, category: "react", difficulty: "medium" },
  { questionText: "How do you pass data to child components?", options: ["Props", "State", "Context", "Reducer"], correctAnswer: 0, category: "react", difficulty: "easy" },
  { questionText: "Which hook is used for performance optimization?", options: ["useEffect", "useMemo", "useState", "useRef"], correctAnswer: 1, category: "react", difficulty: "medium" },
  { questionText: "React Router is used for?", options: ["State management", "Routing", "Data fetching", "API handling"], correctAnswer: 1, category: "react", difficulty: "easy" },
  { questionText: "Which command creates a new React app?", options: ["npm create-react-app", "npx create-react-app", "npm new-app", "npx new-app"], correctAnswer: 1, category: "react", difficulty: "easy" },

  // express.js
  { questionText: "Which module is required to use Express?", options: ["http", "express", "fs", "path"], correctAnswer: 1, category: "express", difficulty: "easy" },
  { questionText: "Which method defines a route for GET requests?", options: ["app.get()", "app.post()", "app.route()", "app.use()"], correctAnswer: 0, category: "express", difficulty: "easy" },
  { questionText: "Which method defines a route for POST requests?", options: ["app.get()", "app.post()", "app.route()", "app.use()"], correctAnswer: 1, category: "express", difficulty: "easy" },
  { questionText: "What does middleware in Express do?", options: ["Handles requests", "Modifies request/response", "Calls next middleware", "All of the above"], correctAnswer: 3, category: "express", difficulty: "medium" },
  { questionText: "Which method mounts middleware at a path?", options: ["app.mount()", "app.use()", "app.path()", "app.listen()"], correctAnswer: 1, category: "express", difficulty: "medium" },
  { questionText: "Which function sends response to client?", options: ["res.send()", "res.write()", "res.push()", "res.get()"], correctAnswer: 0, category: "express", difficulty: "easy" },
  { questionText: "Which function sets HTTP status code in Express?", options: ["res.code()", "res.status()", "res.sendStatus()", "res.setStatus()"], correctAnswer: 1, category: "express", difficulty: "easy" },
  { questionText: "Which method serves static files in Express?", options: ["express.static()", "app.static()", "app.files()", "res.static()"], correctAnswer: 0, category: "express", difficulty: "medium" },
  { questionText: "How do you handle 404 errors in Express?", options: ["app.use((req,res)=>{})", "app.error()", "app.notFound()", "res.404()"], correctAnswer: 0, category: "express", difficulty: "medium" },
  { questionText: "Which method starts Express server?", options: ["app.run()", "app.start()", "app.listen()", "app.begin()"], correctAnswer: 2, category: "express", difficulty: "easy" },
  { questionText: "Which object contains request data in Express?", options: ["req", "res", "next", "app"], correctAnswer: 0, category: "express", difficulty: "easy" },
  { questionText: "Which object is used to send response?", options: ["req", "res", "next", "app"], correctAnswer: 1, category: "express", difficulty: "easy" },
  { questionText: "Which method passes control to next middleware?", options: ["next()", "res.next()", "app.next()", "req.next()"], correctAnswer: 0, category: "express", difficulty: "medium" },
  { questionText: "Which method chains multiple HTTP methods for a route?", options: ["app.get()", "app.post()", "app.route()", "app.chain()"], correctAnswer: 2, category: "express", difficulty: "medium" },
  { questionText: "Which method parses incoming JSON requests?", options: ["express.json()", "express.urlencoded()", "bodyParser.json()", "app.json()"], correctAnswer: 0, category: "express", difficulty: "easy" },
  { questionText: "Which middleware parses URL-encoded bodies?", options: ["express.json()", "express.urlencoded()", "bodyParser.url()", "app.urlencoded()"], correctAnswer: 1, category: "express", difficulty: "easy" },
  { questionText: "Which method redirects client to a new URL?", options: ["res.redirect()", "res.send()", "res.goto()", "res.forward()"], correctAnswer: 0, category: "express", difficulty: "medium" },
  { questionText: "Which method sets response headers?", options: ["res.header()", "res.set()", "res.sendHeader()", "res.setHeader()"], correctAnswer: 1, category: "express", difficulty: "medium" },
  { questionText: "Which middleware handles errors in Express?", options: ["app.use((err, req, res, next)=>{})", "app.error()", "app.catch()", "res.error()"], correctAnswer: 0, category: "express", difficulty: "medium" },
  { questionText: "Which method mounts routers in Express?", options: ["app.use()", "app.router()", "express.router()", "res.use()"], correctAnswer: 0, category: "express", difficulty: "medium" },

  // MongoDB
  { questionText: "MongoDB is a _____ database.", options: ["Relational", "NoSQL", "Graph", "Hierarchical"], correctAnswer: 1, category: "mongodb", difficulty: "easy" },
  { questionText: "Command to show all databases?", options: ["show dbs", "list dbs", "display databases", "db.show()"], correctAnswer: 0, category: "mongodb", difficulty: "easy" },
  { questionText: "MongoDB stores data in which format?", options: ["XML", "JSON", "BSON", "YAML"], correctAnswer: 2, category: "mongodb", difficulty: "medium" },
  { questionText: "Method to insert single document?", options: ["insert()", "insertOne()", "addOne()", "create()"], correctAnswer: 1, category: "mongodb", difficulty: "easy" },
  { questionText: "Operator to match values greater than?", options: ["$lt", "$gte", "$eq", "$in"], correctAnswer: 1, category: "mongodb", difficulty: "medium" },
  { questionText: "Method to find documents?", options: ["find()", "search()", "get()", "query()"], correctAnswer: 0, category: "mongodb", difficulty: "easy" },
  { questionText: "Which method updates a single document?", options: ["update()", "updateOne()", "modify()", "updateMany()"], correctAnswer: 1, category: "mongodb", difficulty: "medium" },
  { questionText: "Which method deletes a document?", options: ["remove()", "deleteOne()", "drop()", "deleteMany()"], correctAnswer: 1, category: "mongodb", difficulty: "medium" },
  { questionText: "Method to count documents in collection?", options: ["count()", "size()", "length()", "countDocuments()"], correctAnswer: 3, category: "mongodb", difficulty: "medium" },
  { questionText: "Which query operator matches exactly?", options: ["$eq", "$gt", "$lt", "$in"], correctAnswer: 0, category: "mongodb", difficulty: "easy" },
  { questionText: "Which operator matches any value in array?", options: ["$eq", "$in", "$or", "$and"], correctAnswer: 1, category: "mongodb", difficulty: "medium" },
  { questionText: "Command to switch database?", options: ["use()", "switch()", "db.switch()", "change()"], correctAnswer: 0, category: "mongodb", difficulty: "easy" },
  { questionText: "Which index improves query performance?", options: ["Unique", "Compound", "Text", "All of above"], correctAnswer: 3, category: "mongodb", difficulty: "medium" },
  { questionText: "Method to aggregate data?", options: ["group()", "aggregate()", "sum()", "collect()"], correctAnswer: 1, category: "mongodb", difficulty: "medium" },
  { questionText: "MongoDB stores collections in?", options: ["Tables", "Collections", "Documents", "Rows"], correctAnswer: 1, category: "mongodb", difficulty: "easy" },
  { questionText: "Default port for MongoDB?", options: ["27017", "3306", "5432", "8080"], correctAnswer: 0, category: "mongodb", difficulty: "easy" },
  { questionText: "Which command drops a database?", options: ["db.dropDatabase()", "db.remove()", "db.delete()", "drop()"], correctAnswer: 0, category: "mongodb", difficulty: "medium" },
  { questionText: "Which method updates multiple documents?", options: ["update()", "updateOne()", "updateMany()", "modify()"], correctAnswer: 2, category: "mongodb", difficulty: "medium" },
  { questionText: "Which operator selects documents not matching a condition?", options: ["$ne", "$not", "$nin", "$nor"], correctAnswer: 0, category: "mongodb", difficulty: "medium" },
  { questionText: "Which method removes all documents in a collection?", options: ["deleteMany()", "drop()", "remove()", "truncate()"], correctAnswer: 0, category: "mongodb", difficulty: "medium"},
];

const seedDB = async () => {
  try {
    console.log("Connecting to database...");
    await connectDB();

    console.log("Deleting existing questions..");
    await Question.deleteMany({});

    console.log("Inserting new questions..");
    const result = await Question.insertMany(seedquestions);
    console.log(`${result.length}questions inserted successfully`);

    console.log("Database seeded succesfully");
  } catch (error) {
    console.log("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedDB();
