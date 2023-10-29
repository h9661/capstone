const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init(
      {
        title: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  // N:1 관계 설정 with User
  // 1:N 관계 설정 with Comment
  // 1:N 관계 설정 with Recomment
  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: "writer", targetKey: "username" });
    db.Post.hasMany(db.Comment, { foreignKey: "post_id", sourceKey: "id" });
    db.Post.hasMany(db.Recomment, {
      foreignKey: "post_id",
      sourceKey: "id",
    });
  }
}

module.exports = Post;
