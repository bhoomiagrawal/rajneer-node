// const db = require("../models"); 
// const employeeData = require("./employee.json"); 
// const officeData = require("./office.json");

// const sanitizeDate = (dateString) => {
//   const date = new Date(dateString);
//   return isNaN(date.getTime()) ? null : date;
// };

// const insertData = async () => {
//   const transaction = await db.sequelize.transaction();
//   try {
//     // Insert Employees in batch (this way avoids one by one creation)
//     await db.employees.bulkCreate(
//       employeeData.map(emp => ({
//         sso_id: emp.SSO_ID,
//         emp_name: emp.Emp_Name,
//         emp_code: emp.Emp_Code,
//         emp_mobile: emp.EMP_MOB_NO,
//         emp_designation: emp.EMP_DSGN,
//         designation_name: emp.DSGN_NAME,
//         post: emp.Post,
//         organization_id: emp.ORGANIZATION_ID,
//         organization_name: emp.ORGANIZATION_NAME,
//         specific_level_id: emp.SPECIFIC_LEVEL_ID,
//         level_name: emp.LEVEL_NAME,
//         office_address: emp.Office_Address || null,
//         dt_updated: sanitizeDate(emp.DT_updated?.date),
//         dt_created: sanitizeDate(emp.DT_created?.date),
//         dob: sanitizeDate(emp.Dob?.date),
//         post_name: emp.post_name,
//         post_code: emp.post_code,
//         email_id: emp.EMAIL_ID
//       })),
//       { transaction }
//     );
//     console.log('Employees inserted successfully.');

//     // Insert Offices in batch
//     await db.offices.bulkCreate(
//       officeData.map(office => ({
//         office_level_id: office.Office_Level_ID,
//         office_level_name: office.Office_Level_Name,
//         office_name: office.Office_Name,
//         office_id: office.Office_ID,
//         parent_office_id: office.Parent_Office_Id,
//         parent_office_name: office.Parent_Office_Name,
//         office_district_id: office.Office_District_Id,
//         office_district_name: office.Office_District_Name,
//         parent_district_id: office.Parent_district_Id,
//         parent_district_name: office.Parent_District_Name,
//         office_address: office.Office_Address || null,
//         office_short_name: office.Office_Short_Name,
//         dt_updated: sanitizeDate(office.DT_updated?.date),
//         dt_created: sanitizeDate(office.DT_created?.date),
//         org_office_type: office.Org_Office_Type,
//         office_type_id: office.Office_Type_Id
//       })),
//       { transaction }
//     );
//     console.log('Offices inserted successfully.');

//     // Create Employee-Office Relations
//     for (const emp of employeeData) {
//       const employee = await db.employees.findOne({ where: { sso_id: emp.SSO_ID }, transaction });
//       const office = await db.offices.findOne({ where: { office_id: emp.ORGANIZATION_ID }, transaction });

//       if (employee && office) {
//         await db.employeeOfficeRelation.create({
//           employee_sso_id: employee.sso_id,
//           office_id: office.office_id,
//           designation: emp.DSGN_NAME || emp.Post,
//           start_date: sanitizeDate(emp.DT_created?.date),
//           end_date: null,
//           is_active: true
//         }, { transaction });
//       }
//     }
    
//     await transaction.commit();
//     console.log("All data successfully inserted!");
//   } catch (error) {
//     console.error("Error inserting data:", error);
//     await transaction.rollback();
//   }
// };

// module.exports = insertData;
