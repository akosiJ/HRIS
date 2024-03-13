/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g7n03blf0gvwrks")

  collection.viewRule = ""

  // remove
  collection.schema.removeField("3ljqnglh")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g7n03blf0gvwrks")

  collection.viewRule = "employee.usersID.role = 'admin' && @request.auth.id != ''"

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3ljqnglh",
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

  return dao.saveCollection(collection)
})
