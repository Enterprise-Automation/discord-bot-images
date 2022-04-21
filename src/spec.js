// Bot API action constants
module.exports = Object.freeze({
  identifier: "image",
  actions: ["upload","list","id","name","delete","random"],
  schema: {
    upload: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 5,
          max: 128,
          pattern: "alphanumeric"
        }
      ]
    },
    list: {
      arg_count: 0,
      args:[]
    },
    delete: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 3,
          max: 15,
          pattern: "alphanumeric"
        }
      ]
    },
    id: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 1,
          max: 20,
          pattern: "alphanumeric"
        }
      ]
    },
    name: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 1,
          max: 20,
          pattern: "alphanumeric"
        }
      ]
    },
    random: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 1,
          max: 15,
          pattern: "alphanumeric"
        }
      ]
    }
  }
});

