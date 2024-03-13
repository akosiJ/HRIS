/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7xfxgk7sakb4z1")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_bZOJstc` ON `employees` (`employee_id_number`)",
    "CREATE UNIQUE INDEX `idx_84wJAC7` ON `employees` (`email_address`)",
    "CREATE INDEX `idx_PSh8357` ON `employees` (`mobile_number`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7xfxgk7sakb4z1")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_bZOJstc` ON `employees` (`employee_id_number`)"
  ]

  return dao.saveCollection(collection)
})
