// Bot API action constants
module.exports = Object.freeze({
  identifier: "image",
  actions: ["upload","getById","getByName","random"],
  schema: {
    upload: {
      arg_count: 3,
      args: [
        {
          name: "URL",
          type: "string",
          min: 5,
          max: 128
        }
      ],
      args: [
        {
          name: "Name of image",
          type: "string",
          min: 3,
          max: 6,
          pattern: "alphanumeric"
        }
      ],
      args: [
        {
          name: "tag",
          type: "string",
          min: 3,
          max: 7,
          pattern: "alphanumeric"
        }
      ],
    },
    getById: {
      arg_count: 1,
      args: [
        {
          name: "Name of image",
          type: "string",
          min: 3,
          max: 6,
          pattern: "alphanumeric"
        }
      ]
    },
    getByName: {
      arg_count: 1,
      args: [
        {
          name: "Name of image",
          type: "string",
          min: 3,
          max: 6,
          pattern: "alphanumeric"
        }
      ]
    },
    random: {
      arg_count: 1,
      args: [
        {
          name: "tag",
          type: "string",
          min: 0,
          max: 7,
          pattern: "alphanumeric"
        }
      ]
    }
  }
});

