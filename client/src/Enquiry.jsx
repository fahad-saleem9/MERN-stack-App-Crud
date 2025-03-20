import React, { useEffect, useState } from "react";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EnquiryList } from "./enquiry/EnquiryList";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";

function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  const saveEnquiry = async (e) => {
    e.preventDefault();

    if (formData._id) {
      axios
        .put(
          `http://localhost:8020/api/website/enquiry/update/${formData._id}`,
          formData
        )
        .then((res) => {
          toast.success("Enquiry Updated Successfully");
          setFormData({ name: "", email: "", phone: "", message: "", _id: "" });
          getAllenquiry();
        })
        .catch((error) => {
          console.error("Error updating enquiry:", error);
          toast.error("Failed to update enquiry");
        });
    } else {
      try {
        await axios.post(
          `http://localhost:8020/api/website/enquiry/insert`,
          formData
        );
        toast.success("Enquiry Saved Successfully");
        setFormData({ name: "", email: "", phone: "", message: "", _id: "" });
        getAllenquiry();
      } catch (error) {
        console.error("Error saving enquiry:", error);
        toast.error("Failed to save enquiry");
      }
    }
  };

  const getAllenquiry = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8020/api/website/enquiry/view`
      );
      if (res.data.status && res.data.enquiryList) {
        setEnquiryList(res.data.enquiryList);
      } else {
        setEnquiryList([]);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      toast.error("Failed to fetch enquiries");
    }
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    getAllenquiry();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <ToastContainer />
      <h1 className="text-[40px] text-center py-5 font-bold">User Enquiry</h1>
      <div className="grid grid-cols-1 md:grid-cols-[30%_auto] gap-10">
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
          <h2 className="text-[20px] font-bold">Enquiry Form</h2>
          <form onSubmit={saveEnquiry}>
            <div className="py-3">
              <Label htmlFor="name" value="Your Name" />
              <TextInput
                type="text"
                value={formData.name}
                onChange={getValue}
                name="name"
                placeholder="Enter your Name"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="email" value="Your Email" />
              <TextInput
                type="email"
                value={formData.email}
                onChange={getValue}
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="phone" value="Your Phone" />
              <TextInput
                type="text"
                value={formData.phone}
                onChange={getValue}
                name="phone"
                placeholder="Enter your phone"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="message" value="Your Message" />
              <Textarea
                name="message"
                value={formData.message}
                onChange={getValue}
                placeholder="Message"
                required
                rows={4}
              />
            </div>
            <div className="py-3">
              <Button type="submit" className="w-full">
                {formData._id ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>
        <EnquiryList
          data={enquiryList}
          getAllenquiry={getAllenquiry}
          Swal={Swal}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}

export default Enquiry;
