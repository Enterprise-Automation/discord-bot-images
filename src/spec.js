// Bot API action constants
module.exports = Object.freeze({
  identifier: "image",
  actions: ["upload","list","getById","getByName","delete","random"],
  schema: {
    upload: {
      arg_count: 3,
      args: [
        {
          name: "name",
          type: "string",
          min: 5,
          max: 128
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
    getById: {
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
    getByName: {
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

