export type Musikmart = {
  "version": "0.1.0",
  "name": "musikmart",
  "docs": [
    "MusicMart program"
  ],
  "instructions": [
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "profileUrl",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userName",
            "type": "string"
          },
          {
            "name": "userWalletAddress",
            "type": "publicKey"
          },
          {
            "name": "userProfileImageUrl",
            "type": "string"
          }
        ]
      }
    }
  ]
};

export const IDL: Musikmart = {
  "version": "0.1.0",
  "name": "musikmart",
  "docs": [
    "MusicMart program"
  ],
  "instructions": [
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program"
          ]
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "profileUrl",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "userAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userName",
            "type": "string"
          },
          {
            "name": "userWalletAddress",
            "type": "publicKey"
          },
          {
            "name": "userProfileImageUrl",
            "type": "string"
          }
        ]
      }
    }
  ]
};
