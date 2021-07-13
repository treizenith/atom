import Atom from "@treizenith/atom";
import Pd from "@treizenith/palladium";

import $auth from "./services/auth";

(async() => {
  let elem = new Atom().plug(Pd({
    pre: {
      host: "localhost:8080",
      local: true,
    },
  }));
  
  await elem.$pd.init();
  
  elem.$pd.registerService($auth);
  
  elem.$pd.runServer();
})()

// export default elem;

// // let newPlugin = () => ({
// //   $: {
// //     foo: "sa"
// //   }
// // });

// // let newPlugin2 = () => ({
// //   $: {
// //     foo2: "sa"
// //   },
// // });

// let atom;

// // atom = new Atom().plug(newPlugin);
// // atom = atom.plug(newPlugin2);

// atom = new Atom();

// function Rename<T, U extends any[], >(name: String, body: Z, self?: T, ...args: U): Z {
//   let binded = (function (this: T, body: Z, ...args: U) {
//     console.log(this, body, args);
//   }).bind(self as T, body);
//   console.log(binded, binded)
//   return new Function(
//     `return function ${name} (...args) { (${binded.toString()})(...args) }`
//   )();
// }

// import Atom from "../../core/atom"; 

// // let newF = Atom._.u.rn((greeting: string,) => { console.log(greeting) }, "bruh");

// // console.log(newF)
// // newF("Ahmet")


// let { state, computed } = Atom.reactor;

// let name = state("Ahmet");
// let surname = state("Eker");

// function g() {
//   console.log("here")
// }

// let computedData = computed(() => {
//   console.log("oto", name(), surname());
// }).subscribe(g);


// name("Ahmets");
// name("Ahmetsss");

// console.log(Atom._.u.diff.map(["sa"], ["sa"]));

// drop(computedData);

// console.log(Atom._.u.diff.map({
//   name: "Ahmet",
//   surname: "EKER",
//   items: {
//     excalibur: "1lv",
//     chastiefol: "2lsv"
//   },
//   friends: ["Alice", "Melek"]
// }, {
//   name: "Ahmet",
//   surname: "EKER",
//   items: {
//     excalibur: "1lv",
//     chastiefol: "2lv"
//   },
//   friends: ["Alice", "Melek"]
// }))

// console.log(computedData(), name(), surname());


// user.subscribe(cb(diff.map, (diff) => {
//   console.log(diff);
// }))

// // user.subscribe((value, old) => {
// //   console.log("cb", value, old);
// // });

// user.set("bruh", "sanane");
// user.set("bruh", "wtf?")
// user.del("items.sword");
// user.del("name");


// // import Quark from "../../core/quark";

// // let user = "undefined";

// // if (Quark.is.like(user) && !Quark.is.str(user)) {
// //   user
// //   console.log("here");
// // } else {
// //   console.log("js")
// // }