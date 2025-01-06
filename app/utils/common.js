exports.getChargesName = (c_id, c_name) => {
    console.log('c_id', c_id, typeof c_id);
    switch (c_id) {
        case "1":
            return "waterCharges";
        case "2":
            return "fixedCharges";
        case "3":
            return "meterServiceCharges";
            case "4":
            return "minimumCharges";
        default:
            return "waterCharges"; // Provide a fallback return value
    }
};
        