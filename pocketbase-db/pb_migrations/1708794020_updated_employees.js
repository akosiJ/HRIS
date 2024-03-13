/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7xfxgk7sakb4z1")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_bZOJstc` ON `employees` (\n  `employee_id_number`,\n  `email_address`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7xfxgk7sakb4z1")

  collection.indexes = []

  return dao.saveCollection(collection)
})
