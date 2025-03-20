import React from "react";
import { Table } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export function EnquiryList({ data, getAllenquiry, Swal, setFormData }) {
  let deleteRow = (delid) => {
    Swal.fire({
      title: "Do you want to Delete the data?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete", 
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
          .then((res) => {
            toast.success("Enquiry deleted Successfully");
            getAllenquiry(); // Data reload karega
          })
          .catch((err) => {
            toast.error("Error deleting enquiry");
          });

        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  let editRow = (editid) => {
    axios
      .get(`http://localhost:8020/api/website/enquiry/single/${editid}`)
      .then((res) => {
        let enquiryData = res.data.enquiry;
        setFormData(enquiryData);
      })
      .catch((err) => {
        toast.error("Error fetching enquiry details");
      });
  };

  return (
    <div className="bg-gray-200 p-4">
      <ToastContainer /> 
      <h2 className="text-[20px] font-bold mb-4">Enquiry List</h2>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Sr No</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Message</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {(data || []).length > 0 ? (
              data.map((item, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.phone}</Table.Cell>
                  <Table.Cell>{item.message}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => deleteRow(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => editRow(item._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Edit
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell colSpan={7} className="text-center">
                  No Data found
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default EnquiryList;
