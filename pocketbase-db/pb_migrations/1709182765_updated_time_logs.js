/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g7n03blf0gvwrks")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_PsbULai` ON `time_logs` (\n  `timeIn`,\n  `employeeEmailAddress`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g7n03blf0gvwrks")

  collection.indexes = []

  return dao.saveCollection(collection)
})
