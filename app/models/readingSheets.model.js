module.exports = (sequelize, DataTypes) => {
const ReadingSheet = sequelize.define('readingSheets', {
    division_no: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    subdivision_no: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grup: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reading_from_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reading_to_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bill_issue_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    due_date_cash: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    due_date_cheque: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  
  }, {
    tableName: 'reading_sheets', // Optional: specify the table name if it differs from the model name
    timestamps: false, // Optional: disable timestamps if not needed
  });

  return ReadingSheet
}