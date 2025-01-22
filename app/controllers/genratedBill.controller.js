const db =require("../models");
const GeneratedBill =db.generatedBill;

// API endpoint to store the generated bill data
exports.create = [
    async (req, res) => {
        // console.log(req.body,"reqdata");
        // const data= await GeneratedBill.findAll();
        // console.log("genrated bill data", data)
        try {
            const temp= {
                cin_number : req.body.cin_number ,
                zone_code : req.body.zone_code,
                customer_name : req.body.customer_name,
                customer_address : req.body.customer_address,
                mobile_number : req.body.mobile_number,
                email : req.body.email,
                account_number : req.body.account_number,
                subdivision_number : req.body.subdivision_number,
                bill_number : req.body.bill_number,
                service_number : req.body.service_number,
                meter_status : req.body.meter_status,
                meter_number : req.body.meter_number,
                category : req.body.category,
                billing_month : req.body.billing_month,
                meter_size : req.body.meter_size,
                billing_issue_date : req.body.billing_issue_date,
                prev_billing_month : req.body.prev_billing_month,
                curr_billing_month : req.body.curr_billing_month,
                prev_billing_month_reading_date : req.body.prev_billing_month_reading_date,
                prev_billing_month_reading : req.body.prev_billing_month_reading,
                prev_billing_month_lastReading : req.body.prev_billing_month_lastReading,
                prev_billing_month_consumption : req.body.prev_billing_month_consumption,
                prev_billing_month_water_charge : req.body.prev_billing_month_water_charge,
                prev_billing_month_minimum_charge : req.body.prev_billing_month_minimum_charge,
                prev_billing_month_sewerage_charges : req.body.prev_billing_month_sewerage_charges,
                prev_billing_month_stp_tax_charges : req.body.prev_billing_month_stp_tax_charges,
                prev_billing_month_meter_service_charges : req.body.prev_billing_month_meter_service_charges,
                prev_billing_month_fixed_charges : req.body.prev_billing_month_fixed_charges,
                prev_billing_month_idc_charges : req.body.prev_billing_month_idc_charges,
                curr_billing_month_reading_date : req.body.curr_billing_month_reading_date,
                curr_billing_month_reading : req.body.curr_billing_month_reading,
                curr_billing_month_lastReading : req.body.curr_billing_month_lastReading,
                curr_billing_month_consumption : req.body.curr_billing_month_consumption,
                curr_billing_month_water_charge : req.body.curr_billing_month_water_charge,
                curr_billing_month_minimum_charge : req.body.curr_billing_month_minimum_charge,
                curr_billing_month_sewerage_charges : req.body.curr_billing_month_sewerage_charges,
                curr_billing_month_stp_tax_charges : req.body.curr_billing_month_stp_tax_charges,
                curr_billing_month_meter_service_charges : req.body.curr_billing_month_meter_service_charges,
                curr_billing_month_fixed_charges : req.body.curr_billing_month_fixed_charges,
                curr_billing_month_idc_charges : req.body.curr_billing_month_idc_charges,
                adjusted_consumption_amount : req.body.adjusted_consumption_amount,
                amount_borne_by_government_rebate : req.body.amount_borne_by_government_rebate,
                prev_billing_month_total : req.body.prev_billing_month_total,
                curr_billing_month_total : req.body.curr_billing_month_total,
                interest_additional_Charges : req.body.interest_additional_Charges,
                outstanding_amount : req.body.outstanding_amount,
                total_bill : req.body.total_bill,
                late_payment_surcharge : req.body.late_payment_surcharge,
                total_bill_after_lps : req.body.total_bill_after_lps,
                due_date_by_cheque : req.body.due_date_by_cheque,
                due_date_by_cash : req.body.due_date_by_cash,
                // created_by: req.body.created_by,
            };

            // Store the new generated bill in the database          
            const generatedBill = await GeneratedBill.create(temp);  
            // Send success response
            res.status(201).json({
                message :  'Generated bill stored successfully',
                generatedBill
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message :  'Error storing the generated bill',
                error :  error.message
            });
        }
    }
]
