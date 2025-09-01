import sequelize from "../config/database";
import { Model, DataTypes } from "sequelize";

class Blague extends Model {
  public id!: number;
  public question!: string;
  public reponse!: string;
}

Blague.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reponse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Blague",
    tableName: "blagues",
    timestamps: false,
  }
);

export default Blague;
