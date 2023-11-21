import { useEffect, useState } from 'react'

function App() {
  const [values, setValues] = useState({
    purchasePrice: 0,
    downPayment: 0,
    repaymentTime: 1,
    interestRate: 1,
  })
  const [result, setResult] = useState('-');

  const setMortgageValues = (element) => {
    let { name, value } = element;
    if(value < 0){
      value = value * -1;
    }
    if(name === 'downPayment' && value <= parseInt(values.purchasePrice)){
      setValues({...values, [name]: value})
    }
    else if(name === 'purchasePrice'){
      setValues({...values, [name]: value, downPayment: 0})
    }
    else if(name === 'interestRate' || name === 'repaymentTime'){
    setValues({...values, [name]: value})
    }
  }


  useEffect(() => {
    const monthlyInterestRate = values.interestRate / 12 / 100;
    const numberofPayments = values.repaymentTime * 12;
    const temp = (1 + monthlyInterestRate) ** numberofPayments;
    const res = (values.purchasePrice - values.downPayment) * ((monthlyInterestRate * temp) / (temp - 1)) || 0;
    if(Number.isInteger(res)){
      setResult(res);
    }
    else {
      setResult(res.toFixed(2));
    }
  }, [values])

  return (
    <div className='container'>
      <div className='box'>
        <h2>Mortgage calculator</h2>
        <div className='all-content'>
          <div className='content'>
            <div className='sub-content'>
              <h5>Purchase Price: <span>${Math.abs(values.purchasePrice)}</span></h5>
              <input type="number" name='purchasePrice'
                onChange={(e) => setMortgageValues(e.target)} 
                value={values.purchasePrice}
              />
            </div>
            <div className='sub-content'>
                <h5>Interest rate: <span>{values.interestRate}%</span></h5>
                <input type="range" name='interestRate' min="1" max="10" defaultValue={1}
                  onChange={(e) => setMortgageValues(e.target)}
                />
            </div>
          </div>

          <div className='content'>
            <div className='sub-content'>
              <h5>Down Payment: <span>${Math.abs(values.downPayment)}</span></h5>
              <input type="number" name='downPayment'
                  onChange={(e) => setMortgageValues(e.target)}
                  value={values.downPayment}
              />
            </div>
            <div className='sub-content'>
              <h5>Loan amount</h5>
              <h4>${values.purchasePrice - values.downPayment}</h4>
            </div>
          </div>

          <div className='content'>
            <div className='sub-content'>
              <h5>Repayment Time: 
                <span>{values.repaymentTime} {values.repaymentTime > 1 ? 'years' : 'year'}</span>
              </h5>
              <input type="range" name='repaymentTime' min="1" max="30" defaultValue={1}
                onChange={(e) => setMortgageValues(e.target)}
              />
            </div>
            <div className='sub-content'>
              <h5>Estimated pr. month</h5>
              <h4>${result}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
