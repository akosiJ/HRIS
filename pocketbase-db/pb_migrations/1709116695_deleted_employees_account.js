/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("9nnlqhyac8co6qi");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "9nnlqhyac8co6qi",
    "created": "2024-02-27 04:57:06.262Z",
    "updated": "2024-02-27 04:57:06.262Z",
    "name": "employees_account",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ikgoruxk",
        "name": "fullName",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": true,
      "allowUsernameAuth": true,
      "exceptEmailDomains": null,
      "manageRule": null,
      "minPasswordLength": 8,
      "onlyEmailDomains": null,
      "onlyVerified": false,
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
})
