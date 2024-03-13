/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7xfxgk7sakb4z1")

  collection.viewRule = "@request.auth.id != \"\" && (@request.auth.role = 'admin' || @request.auth.employeeRecord = id)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7xfxgk7sakb4z1")

  collection.viewRule = "@request.auth.id != \"\" || @request.auth.role = 'admin' || @request.auth.employeeRecord = id"

  return dao.saveCollection(collection)
})
