const UserService:Service = function (this, atom, vm, { dispatch, call }): ServiceRes {
  let self = this;
  let i = atom._.big(0);
  return {
    name: "auth",
    
    methods: {
      controle: [this.pre.auth, (a, p): any => {
        console.log("prevs:", p);
        return "hellowww: " + p.join(",");
      }],
    },
  
    hooks: {
      stop() {
        console.log("stopped");
      },
      start:() => {
        console.log("started");
      }
    }
  };
}

export default UserService;