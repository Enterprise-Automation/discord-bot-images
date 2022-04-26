// Bot API action constants
module.exports = Object.freeze({
  identifier: "image",
  actions: ["upload","search","random","tags"],
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
    search: {
      arg_count: 2,
      args: [
        {
          name: "Name or id",
          type: "string",
          min: 2,
          max: 4,
          pattern: "alphanumeric"
        }
      ],
      args: [
        {
          name: "args",
          type: "string",
          min: 3,
          max: 6,
          pattern: "alphanumeric"
        }
      ]
    },
    tags: {
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

