/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7xfxgk7sakb4z1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rh93v0jq",
    "name": "date_of_birth",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j5fvucth",
    "name": "middle_name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7xfxgk7sakb4z1")

  // remove
  collection.schema.removeField("rh93v0jq")

  // remove
  collection.schema.removeField("j5fvucth")

  return dao.saveCollection(collection)
})
