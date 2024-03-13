/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g7n03blf0gvwrks")

  // remove
  collection.schema.removeField("sre7gvre")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l7kakdb5",
    "name": "employee",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g7n03blf0gvwrks")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("l7kakdb5")

  return dao.saveCollection(collection)
})
