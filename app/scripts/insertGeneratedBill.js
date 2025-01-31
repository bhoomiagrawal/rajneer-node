const path = require("path"); // ✅ Import path module
const XLSX = require("xlsx");
const { sequelize, generatedBill } = require("../models"); // Ensure correct import

const meterstatusMapping = {
  MF: 1, MS: 2, DC: 3, SR: 4, DL: 5, NL: 6, NR: 7, WG: 8, DD: 9, DB: 10,
  NB: 11, FD: 12, BD: 13, KC: 14, NJ: 15, LS: 16, MT: 17, ST: 18, FR: 19,
  MC: 20, MD: 21, RC: 22,
};

const categoryMapping = {
  'D': 1,
  'N': 2,
  'I': 3,
  'F': 4
};

// Function to parse dates in "DD/MM/YYYY" format
const parseCustomDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== "string") return null;
  const parts = dateStr.split("/"); // Split "17/10/2020" into ["17", "10", "2020"]
  if (parts.length !== 3) return null; // Ensure correct format
  const [day, month, year] = parts.map(Number); // Convert to numbers
  return new Date(year, month - 1, day); // JS months are 0-based (Jan = 0)
};
const bulkInsertFromExcel = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    const transaction = await sequelize.transaction();

    try {
      const filePath = path.join(__dirname, "data.xlsx"); // ✅ Correct path usage
      console.log("Reading file from:", filePath);

      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const bills = sheetData.map((row) => ({
        cin_number: row["CID"] || null,
        bill_number: row["BILL_NO"] || null,
        subdivision_number: row["SDO"] || null,
        bill_id: row["BILL_ID"] || null,
        category_id: categoryMapping[row["CAT"]] || null,
        service_no: row["SERV_NO"] || null,
        account_number: row["ACNT_NO"] || null,
        connection_size: row["METER_SIZE"] || null,
        bill_issue_date: parseCustomDate(row["BILL_DATE"]),
      due_date_by_cheque: parseCustomDate(row["CHEQ_DATE"]),
      due_date_by_cash: parseCustomDate(row["CASH_DATE"]),
        noof_mnth: row["NOOF_MNTH"] || 1,
        prev_reading_date: parseCustomDate(row["LAST_RDG"]),
      curr_reading_date: parseCustomDate(row["READ_DATE"]),
        curr_reading: row["CURR_RDG"] || null,
        curr_meter_status_id: meterstatusMapping[row["CURR_STTS"]] || null,
        curr_consumption: row["CURR_CONS"] || null,
        curr_avg_consumption: row["PURE_CONS"] || null,
        curr_water_charge: row["CURR_WATR"] || null,
        curr_meter_service_charge: row["CURR_METR"] || null,
        curr_idc_charge: row["CURR_DEVP"] || null,
        prev_reading: row["CURR_RDG1"] || null,
        prev_meter_status_id: meterstatusMapping[row["CURR_STTS1"]] || null,
        prev_consumption: row["CURR_CONS1"] || null,
        prev_water_charge: row["CURR_WATR1"] || null,
        prev_meter_service_charge: row["CURR_METR1"] || null,
        prev_idc_charge: row["CURR_DEVP1"] || null,
        outstanding_amount: row["OSTD_AMT"] || 0,
        other_interest_charge: row["CURR_INTR"] || 0,
        total_bill: row["TOT_AMT_INDATE"] || 0,
        late_payment_surcharge: row["LPS_Amt"] || 0,
        total_bill_after_lps: row["TOT_AMT_INDATE"] || 0,
      }));

      const insertedRows = await generatedBill.bulkCreate(bills, { transaction });

      console.log(`${insertedRows.length} records inserted successfully.`);
      await transaction.commit();
    } catch (err) {
      console.log('err in catch', err)
      await transaction.rollback();
      throw err;
    }
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

module.exports =  bulkInsertFromExcel ;
