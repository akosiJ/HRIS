/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "g7n03blf0gvwrks",
    "created": "2024-02-20 10:02:20.390Z",
    "updated": "2024-02-20 10:02:20.390Z",
    "name": "time_sheet",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "h6zbilpk",
        "name": "time_in",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "nfx97kkg",
        "name": "time_out",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "sre7gvre",
        "name": "employee",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "p7xfxgk7sakb4z1",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("g7n03blf0gvwrks");

  return dao.deleteCollection(collection);
})
