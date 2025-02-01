// use for single bill store
const db =require("../models");
const GeneratedBill =db.generatedBill;

// API endpoint to store single or multiple generated bill data
exports.create = async (req, res) => {
  try {
    // Check if the body contains an array of bills (bulk create)
    if (Array.isArray(req.body)) {
      // Bulk bill creation logic
      const billsData = req.body.map((bill) => ({
        cin_number: bill.cin_number,
        zone_code: bill.zone_code,
        customer_name: bill.customer_name,
        customer_address: bill.customer_address,
        mobile_number: bill.mobile_number,
        email: bill.email,
        account_number: bill.account_number,
        subdivision_number: bill.subdivision_number,
        bill_number: bill.bill_number,
        service_number: bill.service_number,
        meter_status: bill.meter_status,
        meter_number: bill.meter_number,
        category: bill.category,
        billing_month: bill.billing_month,
        meter_size: bill.meter_size,
        billing_issue_date: bill.billing_issue_date,
        prev_billing_month: bill.prev_billing_month,
        curr_billing_month: bill.curr_billing_month,
        prev_billing_month_reading_date: bill.prev_billing_month_reading_date,
        prev_billing_month_reading: bill.prev_billing_month_reading,
        prev_billing_month_lastReading: bill.prev_billing_month_lastReading,
        prev_billing_month_consumption: bill.prev_billing_month_consumption,
        prev_billing_month_water_charge: bill.prev_billing_month_water_charge,
        prev_billing_month_minimum_charge: bill.prev_billing_month_minimum_charge,
        prev_billing_month_sewerage_charges: bill.prev_billing_month_sewerage_charges,
        prev_billing_month_stp_tax_charges: bill.prev_billing_month_stp_tax_charges,
        prev_billing_month_meter_service_charges: bill.prev_billing_month_meter_service_charges,
        prev_billing_month_fixed_charges: bill.prev_billing_month_fixed_charges,
        prev_billing_month_idc_charges: bill.prev_billing_month_idc_charges,
        curr_billing_month_reading_date: bill.curr_billing_month_reading_date,
        curr_billing_month_reading: bill.curr_billing_month_reading,
        curr_billing_month_lastReading: bill.curr_billing_month_lastReading,
        curr_billing_month_consumption: bill.curr_billing_month_consumption,
        curr_billing_month_water_charge: bill.curr_billing_month_water_charge,
        curr_billing_month_minimum_charge: bill.curr_billing_month_minimum_charge,
        curr_billing_month_sewerage_charges: bill.curr_billing_month_sewerage_charges,
        curr_billing_month_stp_tax_charges: bill.curr_billing_month_stp_tax_charges,
        curr_billing_month_meter_service_charges: bill.curr_billing_month_meter_service_charges,
        curr_billing_month_fixed_charges: bill.curr_billing_month_fixed_charges,
        curr_billing_month_idc_charges: bill.curr_billing_month_idc_charges,
        adjusted_consumption_amount: bill.adjusted_consumption_amount,
        amount_borne_by_government_rebate: bill.amount_borne_by_government_rebate,
        prev_billing_month_total: bill.prev_billing_month_total,
        curr_billing_month_total: bill.curr_billing_month_total,
        interest_additional_Charges: bill.interest_additional_Charges,
        outstanding_amount: bill.outstanding_amount,
        total_bill: bill.total_bill,
        late_payment_surcharge: bill.late_payment_surcharge,
        total_bill_after_lps: bill.total_bill_after_lps,
        due_date_by_cheque: bill.due_date_by_cheque,
        due_date_by_cash: bill.due_date_by_cash,
      }));

      // Store the new generated bills in the database
      const generatedBills = await GeneratedBill.bulkCreate(billsData);

      return res.status(201).json({
        message: "Generated bills stored successfully",
        generatedBills,
      });
    } else {
      // Single bill creation logic
      const billData = {
        cin_number: req.body.cin_number,
        bill_number: req.body.bill_number,
        subdivision_number: req.body.subdivision_number,
        bill_id: req.body.bill_id,
        category_id: req.body.category_id,
        service_no: req.body.service_no,
        account_number: req.body.account_number,
        connection_size: req.body.connection_size,
        bill_issue_date: req.body.bill_issue_date,
        meter_no: req.body.meter_no,
        noof_mnth: req.body.noof_mnth,
        zone_code: req.body.zone_code,
        mobile_number: req.body.mobile_number,
        email: req.body.email,
        curr_meter_status_id: req.body.curr_meter_status_id,
        prev_meter_status_id: req.body.prev_meter_status_id,
        prev_reading_date: req.body.prev_reading_date,
        prev_reading: req.body.prev_reading,
        prev_consumption: req.body.prev_consumption,
        prev_water_charge: req.body.prev_water_charge,
        prev_minimum_charge: req.body.prev_minimum_charge,
        prev_sewerage_charge: req.body.prev_sewerage_charge,
        prev_stp_charge: req.body.prev_stp_charge,
        prev_meter_service_charge: req.body.prev_meter_service_charge,
        prev_fixed_charge: req.body.prev_fixed_charge,
        prev_idc_charge: req.body.prev_idc_charge,
        curr_reading_date: req.body.curr_reading_date,
        curr_reading: req.body.curr_reading,
        curr_consumption: req.body.curr_consumption,
        curr_avg_consumption: req.body.curr_avg_consumption,
        prev_avg_consumption: req.body.prev_avg_consumption,
        curr_water_charge: req.body.curr_water_charge,
        curr_minimum_charge: req.body.curr_minimum_charge,
        curr_sewerage_charge: req.body.curr_sewerage_charge,
        curr_stp_charge: req.body.curr_stp_charge,
        curr_meter_service_charge: req.body.curr_meter_service_charge,
        curr_fixed_charge: req.body.curr_fixed_charge,
        curr_idc_charge: req.body.curr_idc_charge,
        adjusted_consumption_amount: req.body.adjusted_consumption_amount,
        amount_borne_by_government_rebate: req.body.amount_borne_by_government_rebate,
        prev_total: req.body.prev_total,
        curr_total: req.body.curr_total,
        other_interest_charge: req.body.other_interest_charge,
        outstanding_amount: req.body.outstanding_amount,
        total_bill: req.body.total_bill,
        late_payment_surcharge: req.body.late_payment_surcharge,
        total_bill_after_lps: req.body.total_bill_after_lps,
        due_date_by_cheque: req.body.due_date_by_cheque,
        due_date_by_cash: req.body.due_date_by_cash,
      };

      // Store the new generated bill in the database
      const generatedBill = await GeneratedBill.create(billData);

      return res.status(201).json({
        message: "Generated bill stored successfully",
        generatedBill,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error storing the generated bill(s)",
      error: error.message,
    });
  }
};





// // API endpoint to store the single generated bill data
// exports.create = async (req, res) => {
//     try {
//       // Map request body to model fields
//       const billData = {
//         cin_number: req.body.cin_number,
//         bill_number: req.body.bill_number,
//         subdivision_number: req.body.subdivision_number,
//         bill_id: req.body.bill_id,
//         category_id: req.body.category_id,
//         service_no: req.body.service_no,
//         account_number: req.body.account_number,
//         connection_size: req.body.connection_size,
//         bill_issue_date: req.body.bill_issue_date,
//         meter_no: req.body.meter_no,
//         noof_mnth: req.body.noof_mnth,
//         zone_code: req.body.zone_code,
//         mobile_number: req.body.mobile_number,
//         email: req.body.email,
//         curr_meter_status_id: req.body.curr_meter_status_id,
//         prev_meter_status_id: req.body.prev_meter_status_id,
//         prev_reading_date: req.body.prev_reading_date,
//         prev_reading: req.body.prev_reading,
//         prev_consumption: req.body.prev_consumption,
//         prev_water_charge: req.body.prev_water_charge,
//         prev_minimum_charge: req.body.prev_minimum_charge,
//         prev_sewerage_charge: req.body.prev_sewerage_charge,
//         prev_stp_charge: req.body.prev_stp_charge,
//         prev_meter_service_charge: req.body.prev_meter_service_charge,
//         prev_fixed_charge: req.body.prev_fixed_charge,
//         prev_idc_charge: req.body.prev_idc_charge,
//         curr_reading_date: req.body.curr_reading_date,
//         curr_reading: req.body.curr_reading,
//         curr_consumption: req.body.curr_consumption,
//         curr_avg_consumption: req.body.curr_avg_consumption,
//         prev_avg_consumption: req.body.prev_avg_consumption,
//         curr_water_charge: req.body.curr_water_charge,
//         curr_minimum_charge: req.body.curr_minimum_charge,
//         curr_sewerage_charge: req.body.curr_sewerage_charge,
//         curr_stp_charge: req.body.curr_stp_charge,
//         curr_meter_service_charge: req.body.curr_meter_service_charge,
//         curr_fixed_charge: req.body.curr_fixed_charge,
//         curr_idc_charge: req.body.curr_idc_charge,
//         adjusted_consumption_amount: req.body.adjusted_consumption_amount,
//         amount_borne_by_government_rebate: req.body.amount_borne_by_government_rebate,
//         prev_total: req.body.prev_total,
//         curr_total: req.body.curr_total,
//         other_interest_charge: req.body.other_interest_charge,
//         outstanding_amount: req.body.outstanding_amount,
//         total_bill: req.body.total_bill,
//         late_payment_surcharge: req.body.late_payment_surcharge,
//         total_bill_after_lps: req.body.total_bill_after_lps,
//         due_date_by_cheque: req.body.due_date_by_cheque,
//         due_date_by_cash: req.body.due_date_by_cash,
//       };
  
//       // Store the new generated bill in the database
//       const generatedBill = await GeneratedBill.create(billData);
  
//       // Send success response
//       res.status(201).json({
//         message: 'Generated bill stored successfully',
//         generatedBill,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         message: 'Error storing the generated bill',
//         error: error.message,
//       });
//     }
//   };

// // use for bulk bill store

// // API endpoint to store multiple generated bill data
// exports.createMultiple = async (req, res) => {
//   try {
//     // Ensure req.body is an array of bill objects
//     if (!Array.isArray(req.body)) {
//       return res.status(400).json({
//         message: "Input data should be an array of bill objects",
//       });
//     }

//     // Validate each bill object in the array
//     const billsData = req.body.map((bill) => ({
//       cin_number: bill.cin_number,
//       zone_code: bill.zone_code,
//       customer_name: bill.customer_name,
//       customer_address: bill.customer_address,
//       mobile_number: bill.mobile_number,
//       email: bill.email,
//       account_number: bill.account_number,
//       subdivision_number: bill.subdivision_number,
//       bill_number: bill.bill_number,
//       service_number: bill.service_number,
//       meter_status: bill.meter_status,
//       meter_number: bill.meter_number,
//       category: bill.category,
//       billing_month: bill.billing_month,
//       meter_size: bill.meter_size,
//       billing_issue_date: bill.billing_issue_date,
//       prev_billing_month: bill.prev_billing_month,
//       curr_billing_month: bill.curr_billing_month,
//       prev_billing_month_reading_date: bill.prev_billing_month_reading_date,
//       prev_billing_month_reading: bill.prev_billing_month_reading,
//       prev_billing_month_lastReading: bill.prev_billing_month_lastReading,
//       prev_billing_month_consumption: bill.prev_billing_month_consumption,
//       prev_billing_month_water_charge: bill.prev_billing_month_water_charge,
//       prev_billing_month_minimum_charge: bill.prev_billing_month_minimum_charge,
//       prev_billing_month_sewerage_charges: bill.prev_billing_month_sewerage_charges,
//       prev_billing_month_stp_tax_charges: bill.prev_billing_month_stp_tax_charges,
//       prev_billing_month_meter_service_charges: bill.prev_billing_month_meter_service_charges,
//       prev_billing_month_fixed_charges: bill.prev_billing_month_fixed_charges,
//       prev_billing_month_idc_charges: bill.prev_billing_month_idc_charges,
//       curr_billing_month_reading_date: bill.curr_billing_month_reading_date,
//       curr_billing_month_reading: bill.curr_billing_month_reading,
//       curr_billing_month_lastReading: bill.curr_billing_month_lastReading,
//       curr_billing_month_consumption: bill.curr_billing_month_consumption,
//       curr_billing_month_water_charge: bill.curr_billing_month_water_charge,
//       curr_billing_month_minimum_charge: bill.curr_billing_month_minimum_charge,
//       curr_billing_month_sewerage_charges: bill.curr_billing_month_sewerage_charges,
//       curr_billing_month_stp_tax_charges: bill.curr_billing_month_stp_tax_charges,
//       curr_billing_month_meter_service_charges: bill.curr_billing_month_meter_service_charges,
//       curr_billing_month_fixed_charges: bill.curr_billing_month_fixed_charges,
//       curr_billing_month_idc_charges: bill.curr_billing_month_idc_charges,
//       adjusted_consumption_amount: bill.adjusted_consumption_amount,
//       amount_borne_by_government_rebate: bill.amount_borne_by_government_rebate,
//       prev_billing_month_total: bill.prev_billing_month_total,
//       curr_billing_month_total: bill.curr_billing_month_total,
//       interest_additional_Charges: bill.interest_additional_Charges,
//       outstanding_amount: bill.outstanding_amount,
//       total_bill: bill.total_bill,
//       late_payment_surcharge: bill.late_payment_surcharge,
//       total_bill_after_lps: bill.total_bill_after_lps,
//       due_date_by_cheque: bill.due_date_by_cheque,
//       due_date_by_cash: bill.due_date_by_cash,
//       // created_by: bill.created_by,
//     }));

//     // Store the new generated bills in the database
//     const generatedBills = await GeneratedBill.bulkCreate(billsData);

//     // Send success response
//     res.status(201).json({
//       message: "Generated bills stored successfully",
//       generatedBills,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Error storing the generated bills",
//       error: error.message,
//     });
//   }
// };





  