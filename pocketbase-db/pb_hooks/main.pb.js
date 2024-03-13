/// <reference path="../pb_data/types.d.ts" />

routerAdd(
  "GET",
  "api/hello",
  (c) => {
    const result = arrayOf(
      new DynamicModel({
        // describe the shape of the data (used also as initial values)
        id: "RECORD_ID",
        collectionId: "p7xfxgk7sakb4z1",
        collectionName: "employees",
        created: "2022-01-01 01:00:00.123Z",
        updated: "2022-01-01 23:59:59.456Z",
        employeeIdNumber: "test",
        firstName: "test",
        middleName: "test",
        lastName: "test",
        dateOfBirth: "2022-01-01 10:00:00.123Z",
        mobileNumber: 123,
        emailAddress: "test@example.com",
        employedDate: "2022-01-01 10:00:00.123Z",
        isActive: true,
        salaryRate: 123,
        facePicture: ["filename.jpg"],
        usersID: "RELATION_RECORD_ID",
      })
    );

    $app.dao().db().newQuery("SELECT id FROM employees").all(result);
    if (result.length > 0) {
      return c.json(200, result);
    }
  },
  $apis.activityLogger($app)
);
