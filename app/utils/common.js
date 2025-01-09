exports.getChargesName = (c_id, c_name) => {
  console.log("c_id", c_id, typeof c_id);
  switch (c_id) {
    case "1":
      return "waterCharges";
    case "2":
      return "fixedCharges";
    case "3":
      return "meterServiceCharges";
    case "4":
      return "minimumCharges";
    case "5":
      return "sewerageCharges";
    case "6":
      return "stpCharges";
    case "7":
      return "idcCharges";
    default:
      return "waterCharges"; // Provide a fallback return value
  }
};
