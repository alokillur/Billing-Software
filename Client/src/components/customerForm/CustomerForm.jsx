import './CustomerForm.css';


function customerForm({customerName, setCustomerName, mobileNumber, setMobileNumber}) {
  return (
    <div>
      <div className="p-3">
        <div className="mb-3">
          <label htmlFor="customerName" className='form-label mb-1 text-white'>
            Customer Name
          </label>
          <input type="text" className='form-control form-control-sm' id='customerName' value={customerName} onChange={(e) => setCustomerName(e.target.value)} required/>
        </div>

        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label mb-1 text-white">
            Mobile Number
          </label>

          <input
            type="tel"
            inputMode="numeric"
            className="form-control form-control-sm"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            maxLength={10}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
            required
          />
        </div>

      </div>
    </div>
  )
}

export default customerForm;
