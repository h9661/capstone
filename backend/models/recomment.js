const Sequelize = require("sequelize");

class Recomment extends Sequelize.Model {
  static initiate(sequelize) {
    Recomment.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Recomment",
        tableName: "recomments",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  // N:1 관계 설정 with User
  // N:1 관계 설정 with Post
  // N:1 관계 설정 with Comment
  static associate(db) {
    db.Recomment.belongsTo(db.User, {
      foreignKey: "writer",
      targetKey: "username",
    });
    db.Recomment.belongsTo(db.Post, {
      foreignKey: "post_id",
      targetKey: "id",
    });
    db.Recomment.belongsTo(db.Comment, {
      foreignKey: "comment_id",
      targetKey: "id",
    });
  }
}

module.exports = Recomment;
