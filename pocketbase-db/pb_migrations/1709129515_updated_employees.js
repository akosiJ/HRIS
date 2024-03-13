/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7xfxgk7sakb4z1")

  collection.listRule = "@request.auth.id != \"\" && @request.auth.role = 'admin' || @request.data.email = 'alanojonathan12@gmail.com'"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p7xfxgk7sakb4z1")

  collection.listRule = "@request.auth.id != \"\" && @request.auth.role = 'admin' || @request.data.email ?= @collection.employees.emailAddress"

  return dao.saveCollection(collection)
})
