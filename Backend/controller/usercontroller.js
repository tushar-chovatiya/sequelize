const db = require('../model/users')
const users = db.users;
const getrole = db.getrole;
const getcompany = db.getcompany;
const getdesignation = db.getdesignation;

const { mailoption } = require('./mail')

getcompany.hasOne(users, { foreignKey: 'company_id' });
users.belongsTo(getcompany, { foreignKey: 'company_id' });

getdesignation.hasOne(users, { foreignKey: 'designation_id' });
users.belongsTo(getdesignation, { foreignKey: 'designation_id' });

getrole.hasOne(users, { foreignKey: 'role_id' });
users.belongsTo(getrole, { foreignKey: 'role_id' });


exports.adduser = async (req, res) => {
  const { name, email, password, company_id, designation_id, role_id } = req.body;
  if (!req.body.id) {
    const oldUser = await users.findOne({
      where: {
        email: email
      }
    })
    if (oldUser) {
      return res.status(409).send("Email Already Exist");
    }
    users.create({
      name: name,
      email: email,
      role_id: role_id,
      designation_id: designation_id,
      company_id: company_id,
      password: password
    }
    ).then(num => {
      if (num == 1) {
        res.send({
          message: "Can not add User."
        });
      } else {
        users.findOne({
          where: {
            email: email
          }, include: [
            { model: getrole },
            { model: getcompany },
            { model: getdesignation },
          ],
          // raw:true
        }).then(res =>
          // console.log(res),
          mailoption(res, "Added")
        )
        res.send({
          message: 'User was added successfully'
        });
        // })
      }
    })
      .catch(err => {
        res.status(500).send({
          message: "Error add user"
        });
      });

  } else {
    const Id = req.body.id
    const updatedata = {
      name: name,
      email: email,
      role_id: role_id,
      designation_id: designation_id,
      company_id: company_id,
      password: password
    }
    
    users.update(updatedata, {
      where: { id: Id }
    }).then(num => {
      if (num == 1) {
        users.findOne({
          where: {
            id: Id
          }, include: [
            { model: getrole },
            { model: getcompany },
            { model: getdesignation },
          ],
          // raw:true
        }).then(res =>
          // console.log(JSON.stringify(res.tbl_role)),
          mailoption(res, "Updated")
        )
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${Id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with id=" + Id
        });
      });
  }
}
exports.listuser = async (req, res) => {
  users.findAll({ 
    include: [
      { model: getrole },
      { model: getcompany },
      { model: getdesignation },
    ],
    // logging: (...msg) => console.log(msg),
  }).then(data => {
    // console.log(data)
    res.send(data)
  })
}

exports.deleteuser = async (req, res) => {
  const Id = req.params.id
  await users.findOne({
    where: {
      id: Id
    }, include: [
      { model: getrole },
      { model: getcompany },
      { model: getdesignation },
    ],
    // raw:true
  }).then(res =>
    // console.log(res),
    mailoption(res, "Deleted")
  )
  users.destroy({
    where: {
      id: Id
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "User delete successfully."
      });
    } else {
      res.send({
        message: `Cannot delete User`
      });
    }
  })
    .catch(err => {
      res.status(500).send({
        message: "Error add user"
      });
    });

}

exports.getrole = async (req, res) => {
  getrole.findAll().then(data => {
    // console.log(data)
    res.send(data);
  }).catch((error) => {
    console.error('Failed to retrieve data : ', error);
  });
}

exports.getcompany = async (req, res) => {
  getcompany.findAll().then(data => {
    // console.log(data)
    res.send(data);
  }).catch((error) => {
    console.error('Failed to retrieve data : ', error);
  });
}

exports.getdesignation = async (req, res) => {
  getdesignation.findAll().then(data => {
    // console.log(data)
    res.send(data);
  }).catch((error) => {
    console.error('Failed to retrieve data : ', error);
  });
}