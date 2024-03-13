/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("20o4cz06jdhab5c")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_6gfTuKF` ON `employees_duplicate` (`emailAddress`)",
    "CREATE UNIQUE INDEX `idx_hzZBjHM` ON `employees_duplicate` (`mobileNumber`)"
  ]

  // remove
  collection.schema.removeField("y91kwvky")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("20o4cz06jdhab5c")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_hyqwuwY` ON `employees_duplicate` (`employeeIdNumber`)",
    "CREATE UNIQUE INDEX `idx_6gfTuKF` ON `employees_duplicate` (`emailAddress`)",
    "CREATE UNIQUE INDEX `idx_hzZBjHM` ON `employees_duplicate` (`mobileNumber`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y91kwvky",
    "name": "employeeIdNumber",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
