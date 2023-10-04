const Sequelize = require("sequelize");

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
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
        modelName: "Comment",
        tableName: "comments",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  // N:1 관계 설정 with User
  // N:1 관계 설정 with Post
  // 1:N 관계 설정 with Recomment
  static associate(db) {
    db.Comment.belongsTo(db.User, {
      foreignKey: "writer",
      targetKey: "username",
    });
    db.Comment.belongsTo(db.Post, {
      foreignKey: "post_id",
      targetKey: "id",
    });
    db.Comment.hasMany(db.Recomment, {
      foreignKey: "comment_id",
      sourceKey: "id",
    });
  }
}

module.exports = Comment;
