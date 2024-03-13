/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g7n03blf0gvwrks")

  collection.name = "time_logs"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g7n03blf0gvwrks")

  collection.name = "time_sheet"

  return dao.saveCollection(collection)
})
