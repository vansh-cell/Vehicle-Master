import React, { useState, useEffect } from 'react';
import {  toast, ToastContainer } from 'react-toastify';

const VehicleMaster = () => {
  // const [setDates] = useState([])
  const [vehicles, setVehicles] = useState([]);
  const [EditIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    VehicleType: '',
    VehicleNo: '',
    Vendor: '',
    DriverName: '',
    DriverMobile: '',
    AadhaarNumber: '',
    Status: true,
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('vehicles')) || [];
    setVehicles(data);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if ((name === "DriverMobile" && !/^\d{0,10}$/.test(value)) ||
      (name === "AadhaarNumber" && !/^\d{0,12}$/.test(value))) {
      return;
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));


  };

  const handleAdd = () => {
    if (!form.VehicleType || !form.VehicleNo) {
      toast.error("Please fill required fields.");
      return;
    }

    if (form.DriverMobile.length !== 10) {
      toast.error("Driver Mobile must be exactly 10 digits.");
      return;
    }

    if (form.AadhaarNumber.length !== 12) {
      toast.error("Aadhaar Number must be exactly 12 digits.");
      return;
    }

    if (EditIndex !== null) {
      const updatedVehicles = [...vehicles];
      updatedVehicles[EditIndex] = form;
      setVehicles(updatedVehicles);
      localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
      setEditIndex(null);
    } else {
      const updated = [...vehicles, form];
      setVehicles(updated);
      localStorage.setItem('vehicles', JSON.stringify(updated));
    }
    setForm({
      VehicleType: '',
      VehicleNo: '',
      Vendor: '',
      DriverName: '',
      DriverMobile: '',
      AadhaarNumber: '',
      Status: true,
    });
  };


  const confirmToast=(i) =>{
    toast(
      <div>
        <p>Are you sure you want to delete!</p>


        <div>

          <button onClick={() =>
           {handleDelete(i)
            toast.dismiss();
          }}></button>
          <button onClick={() => handleDelete(i)} 
          className='hover:bg-red-700 hover:text-white border rounded px-2 py-0'>
            Yes</button>


          <button onClick={() => toast.dismiss()} 
          className='hover:bg-green-700 hover:text-white border rounded mx-10 px-2 py-0'>
            No</button>
        </div>
      </div>
    )
  }

  const handleDelete = (index) => {
    const updated = vehicles.filter((_, i) => i !== index);
    setVehicles(updated);
    localStorage.setItem('vehicles', JSON.stringify(updated));
  };

  const handleCancel = () => {
    setForm({
      VehicleType: '',
      VehicleNo: '',
      Vendor: '',
      DriverName: '',
      DriverMobile: '',
      AadhaarNumber: '',
      Status: true,
    });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const selected = vehicles[index];
    setForm(selected);
    setEditIndex(index);
  };

  //   const handleDate = () => {
  //   const existingDates = JSON.parse(localStorage.getItem('Dates')) || []; 
  //   const updatedDates = [...existingDates, form]; 
  //   setDates(updatedDates);
  //   localStorage.setItem('Dates', JSON.stringify(updatedDates)); 
  // };

  // const handleDate = () => {
  //   const existingDates = JSON.parse(localStorage.getItem('Dates')) || [];
  //   const updatedDates = [...existingDates, form];
  //   setDates(updatedDates);
  //   localStorage.setItem('Dates', JSON.stringify(updatedDates));
  // };

  return (
    <div className="bg-white pr-3 pl-3 ">
      <h2 className="text-3xl font-bold px-4 pt-2">Add Vehicle Master</h2>
      <br />
      <div>
        <h3 className="text-large font-bold px-4">Add Information</h3>
        <br />
        <div className=' px-2 rounded hover:shadow-lg'>
          <h4 className='text-2xl px-2 bg-slate-300'>Vehicle Information</h4>
          <br />

          <label>Select Date </label>
          <input type='Date' value={form.Date}
            id='Date-input' name='Date'
            onChange={handleChange} className='border'>
          </input>

          <br></br>
          <br></br>

          <div className='grid grid-cols-1 md:grid-cols-5 gap-3'>
            <div>
              <label className="block text-gray-700">Vehicle Type</label>
              <select name="VehicleType" value={form.VehicleType} onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2">
                <option value="">-- Select Vehicle --</option>
                <option value="bike">Bike</option>
                <option value="bus">Bus</option>
                <option value="truck">Truck</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Vehicle No.</label>
              <input name="VehicleNo" value={form.VehicleNo} onChange={handleChange}
                placeholder="Vehicle No"
                className="w-full  border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-gray-700">Vendor</label>
              <select name="Vendor" value={form.Vendor} onChange={handleChange}
                className="w-full  border border-gray-300 rounded  px-2 py-2">
                <option value="">--Select Vendor --</option>
                <option value="Harsh">Harsh</option>
                <option value="Abhay">Abhay</option>
                <option value="Ujjwal">Ujjwal</option>
                <option value="Saurabh">Saurabh</option>
                <option value="Ashu">Ashu</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Driver Name</label>
              <input name="DriverName" value={form.DriverName} onChange={handleChange}
                placeholder="Driver Name"
                className="w-full  border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-gray-700">Driver Number</label>
              <input name="DriverMobile" inputMode='numeric'
                value={form.DriverMobile} onChange={handleChange}
                placeholder="+91" maxLength={10}
                className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-gray-700">Aadhaar Number</label>
              <input name="AadhaarNumber" inputMode='numeric'
                value={form.AadhaarNumber} onChange={handleChange}
                placeholder="Enter Aadhaar Number" maxLength={12}
                className="w-full border border-gray-300 rounded px-2 py-2" />
            </div>

            <div className="flex items-center gap-2 mt-6">
              <label className="text-black">Status:</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="Status"
                  checked={form.Status}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="h-4 w-7 bg-gray-300 rounded-full 
                peer peer-checked:bg-green-500 transition-all duration-200"></div>

                <div className="absolute left-0.5 top-0.5 w-3 h-3
                 bg-white rounded-full shadow-md transform peer-checked:translate-x-full
                  transition-all duration-200"></div>
              </label>
            </div>
          </div>

          <br />

          <div>
            
            <button onClick={handleAdd} className="border border-green-700 hover:bg-green-600
             hover:text-white text-black rounded mb-2 px-4 py-1.5 ">
              {EditIndex !== null ? 'Update' : 'Add Detail'}
            </button>


            <button onClick={handleCancel} className="ml-4 border  border-red-700 hover:bg-red-700
             hover:text-white text-black rounded px-4 py-1.5">
              Reset
            </button>
          </div>
        </div>
      </div>

      <br />
      <br></br>

      <div className='pl-4 pr-4'>
        <h2 className='px-2 font-bold hover:shadow-xl text-2xl'>Vehicle Table</h2>
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
          <thead>
            <tr className="text-black text-sm">
              <th className="px-4 py-2 text-left">Action</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Vehicle Type</th>
              <th className="px-4 py-2 text-left">Vehicle Number</th>
              <th className="px-4 py-2 text-left">Driver Name</th>
              <th className="px-4 py-2 text-left">Driver Mobile</th>
              <th className="px-4 py-2 text-left">Aadhaar Number</th>
              <th className="px-4 py-2 text-left">Vendor Name</th>
              {/* <th className="px-4 py-2 text-left">Date</th> */}
            </tr>
          </thead>
          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-black py-4">No Data Found</td>
              </tr>
            ) : (
              vehicles.map((v, i) => (
                <tr key={i} className="border-t border-gray-200 hover:bg-gray-100 transition-colors">

                  <td className="px-4 py-2 flex gap-2">

                    <button className='bg-red-600 text-white rounded px-2'
                      onClick={() => confirmToast(i)}
                      title="Delete">
                      🗑 
                    </button>

                    <button className='bg-blue-700 text-white rounded px-2'
                      onClick={() => handleEdit(i)}
                      title="Edit">
                      ✏️ 
                    </button>

                  
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-sm font-medium 
                      ${v.Status ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      {v.Status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-2">{v.VehicleType}</td>
                  <td className="px-4 py-2">{v.VehicleNo}</td>
                  <td className="px-4 py-2">{v.DriverName}</td>
                  <td className="px-4 py-2">{v.DriverMobile}</td>
                  <td className="px-4 py-2">{v.AadhaarNumber}</td>
                  <td className="px-4 py-2">{v.Vendor}</td>
                  {/* <td className="px-4 py-2">{v.Date}</td> */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default VehicleMaster;
