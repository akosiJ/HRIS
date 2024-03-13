/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g7n03blf0gvwrks")

  // remove
  collection.schema.removeField("sz7sjsrh")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g7n03blf0gvwrks")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sz7sjsrh",
    "name": "employee_id_number",
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

  return dao.saveCollection(collection)
})
