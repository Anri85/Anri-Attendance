module.exports = (attendance) => {
    //  const data = attendance.forEach((e) => {
    //      `<tr class="item">`;
    //      `<td>${e.id}</td>`;
    //      `<td>${e.user_id}</td>`;
    //      `<td>${e.fullname}</td>`;
    //      `<td>${e.date}</td>`;
    //      `<td>${e.time_in}</td>`;
    //      `<td>${e.time_out}</td>`;
    //      `<td>${e.status}</td>`;
    //      `<td>${e.number_of_working_hours}</td>`;
    //      `<td><img  src="http://127.0.0.1:5000//attendance/time_in/${e?.attendance_image_in}"
    //                             style="width:100%; max-width:156px;"></td>`;
    //      `<td><img  src="http://127.0.0.1:5000//attendance/time_in/${e?.attendance_image_out}"
    //                             style="width:100%; max-width:156px;"></td>`;
    //      `</tr>`;
    //  });

    return `<!doctype html>
            <html>
               <head>
                  <meta charset="utf-8">
                  <title>PDF Result Template</title>
                  <style>
                     .invoice-box {
                     max-width: 1200px;
                     margin: auto;
                     padding: 30px;
                     border: 1px solid #eee;
                     box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                     font-size: 16px;
                     line-height: 24px;
                     font-family: 'Helvetica Neue', 'Helvetica',
                     color: #555;
                     }
                     .margin-top {
                     margin-top: 50px;
                     }
                     .justify-center {
                     text-align: center;
                     }
                     .invoice-box table {
                     width: 100%;
                     line-height: inherit;
                     text-align: left;
                     }
                     .invoice-box table td {
                     padding: 5px;
                     vertical-align: top;
                     }
                     .invoice-box table tr td:nth-child(2) {
                     text-align: right;
                     }
                     .invoice-box table tr.top table td {
                     padding-bottom: 20px;
                     }
                     .invoice-box table tr.top table td.title {
                     font-size: 45px;
                     line-height: 45px;
                     color: #333;
                     }
                     .invoice-box table tr.information table td {
                     padding-bottom: 40px;
                     }
                     .invoice-box table tr.heading td {
                     background: #eee;
                     border-bottom: 1px solid #ddd;
                     font-weight: bold;
                     }
                     .invoice-box table tr.details td {
                     padding-bottom: 20px;
                     }
                     .invoice-box table tr.item td {
                     border-bottom: 1px solid #eee;
                     }
                     .invoice-box table tr.item.last td {
                     border-bottom: none;
                     }
                     .invoice-box table tr.total td:nth-child(2) {
                     border-top: 2px solid #eee;
                     font-weight: bold;
                     }
                     @media only screen and (max-width: 600px) {
                     .invoice-box table tr.top table td {
                     width: 100%;
                     display: block;
                     text-align: center;
                     }
                     .invoice-box table tr.information table td {
                     width: 100%;
                     display: block;
                     text-align: center;
                     }
                     }
                  </style>
               </head>
               <body>
                  <div class="invoice-box">
                     <table cellpadding="0" cellspacing="0">
                        <tr class="heading">
                           <td>Attendance ID</td>
                           <td>User ID</td>
                           <td>Employee Name</td>
                           <td>Date</td>
                           <td>Check In</td>
                           <td>Check Out</td>
                           <td>Status</td>
                           <td>Working Hour</td>
                           <td>Image In</td>
                           <td>Image Out</td>
                        </tr>
                        ${attendance.forEach((e) => {
                            //  `<tr class="item">`;
                            //  `<td>${e.id}</td>`;
                            //  `<td>${e.user_id}</td>`;
                            //  `<td>${e.fullname}</td>`;
                            //  `<td>${e.date}</td>`;
                            //  `<td>${e.time_in}</td>`;
                            //  `<td>${e.time_out}</td>`;
                            //  `<td>${e.status}</td>`;
                            //  `<td>${e.number_of_working_hours}</td>`;
                            //  `<td><img  src="http://127.0.0.1:5000//attendance/time_in/${e?.attendance_image_in}"
                            //               style="width:100%; max-width:156px;"></td>`;
                            //  `<td><img  src="http://127.0.0.1:5000//attendance/time_in/${e?.attendance_image_out}"
                            //               style="width:100%; max-width:156px;"></td>`;
                            //  `</tr>`;
                            "<h1>Hello world</h1>";
                        })}
                     </table>
                  </div>
               </body>
            </html>
            `;
};
