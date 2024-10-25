const moment = require("moment");
import db from "../models";
import { Op } from "sequelize";
// function cancelBooking(bookingDate) {
//     const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
//     console.log("Current Date: " + currentDate);

//     const start_time_date = moment(bookingDate).format("YYYY-MM-DD HH:mm:ss");
//     console.log("Start Time Date: " + start_time_date);
//     const diff = moment(currentDate).diff(moment(start_time_date), "days");

//     if (diff > 1) {
//         console.log(
//             "You are late by " +
//                 diff +
//                 " days. Booking canceled but cannot refund."
//         );
//     } else {
//         console.log("You are on time. Booking confirmed.");
//     }

//     console.log("Difference in days: " + diff);
// }

// // Example usage
// cancelBooking("2024-11-20T12:00:00Z");

// function totalPricesInMonth() {
//     const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
//     const currentMonth = new Date().getMonth(); // Lấy tháng hiện tại (0-11)
    
//      // Ngày đầu tháng (UTC)
//      const startDate = new Date(Date.UTC(currentYear, currentMonth, 1)).toISOString();
//      // Ngày cuối tháng (UTC)
//      const endDate = new Date(Date.UTC(currentYear, currentMonth + 1, 0, 23, 59, 59)).toISOString();
    
//     console.log("Start Date: " + startDate);
//     console.log("End Date: " + endDate);
    
//     const booking = db.Booking.findAll({
//         include: [
//             {
//                 model: db.BookingStatus,
//                 order: [["createdAt", "DESC"]],
//                 limit: 1,
//                 where: {
//                     status: "completed",
//                 },
//                 required: false,
//             },
//         ],
//     }).then(result => {
//         console.log("Booking: " + result);
//     }).catch(error => {
//         console.error("Error while fetching booking:", error);
//     });

//     const totalPrice = db.Booking.sum("total_price", {
//         where: {
//             createdAt: {
//                 [Op.between]: [startDate, endDate],
//             },
//         },
//         include: [
//             {
//                 model: db.BookingStatus,
//                 order: [["createdAt", "DESC"]],
//                 limit: 1,
//                 where: {
//                     status: "completed",
//                 },
//                 required: false,
//             },
//         ],
//     }).then(result => {
//         console.log("Total Price: " + result);
//     }).catch(error => {
//         console.error("Error fetching total price: ", error);
//     });
// }

// totalPricesInMonth();

function getTotalBookingByManager() {
    const currentDate = new Date(); // Ngày hiện tại
            const eightDaysAgo = new Date(currentDate); // Tạo một bản sao của ngày hiện tại
            eightDaysAgo.setDate(currentDate.getDate() - 8); // Lấy ngày 8 ngày trước
            eightDaysAgo.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây và mili giây về 00:00:00.000
            const formattedEightDaysAgo = moment(eightDaysAgo).format("YYYY-MM-DD HH:mm:ss.SSS Z"); // Định dạng theo yêu cầu
            const formattedCurrentDate = moment(currentDate).format("YYYY-MM-DD HH:mm:ss.SSS Z"); // Định dạng theo yêu cầu
            const revenue = db.Booking.findAll({
                where: {
                    createdAt: { 
                        [db.Sequelize.Op.between]: [formattedEightDaysAgo, formattedCurrentDate],
                    },
                },
                include: [
                    {
                        model: db.BookingStatus,
                        attributes: [],
                        where: {
                            status: "completed",
                        },
                    },
                ],
            }).then(result => {
                for (let i = 0; i < result.length; i++) {
                    console.log("Booking: " + result[i].total_price);
            }}
            ).catch(error => {
                console.error("Error while fetching booking:", error);
            });
}
getTotalBookingByManager();
