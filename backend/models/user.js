const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        username: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
      },
      /**
       * option 설명
       * sequelize: static init 메서드의 매개변수와 연결되는 옵션
       * timestamps: true로 하면 createdAt과 updatedAt 컬럼을 추가함
       * underscored: true로 하면 created_at, updated_at 컬럼을 추가함
       * paranoid: true로 하면 deletedAt 컬럼을 추가함
       * charset: utf8로 하면 한글이 저장됨
       * collate: utf8_general_ci로 하면 한글 저장시 대소문자를 구분하지 않음
       */
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    // 추가 예정...
  }
}

module.exports = User;
