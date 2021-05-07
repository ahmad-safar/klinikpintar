import { ChangeEvent, FormEvent, useState } from 'react'
import { ApiUrl } from '.'

export default function NewDisease() {
  const [state, setState] = useState({
    name: '',
    picture: '',
    patient_name: '',
    patient_age: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await fetch(`${ApiUrl}/diseases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(state),
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prevProps) => ({
      ...prevProps,
      [e.target.name]: e.target.value,
    }))
  }
  return (
    <>
      <div>Create Disease</div>
      <form onSubmit={handleSubmit}>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="name"
          value={state.name}
          onChange={handleInputChange}
        />
        <input
          id="picture"
          name="picture"
          type="text"
          placeholder="picture"
          value={state.picture}
          onChange={handleInputChange}
        />
        <input
          id="patient_name"
          name="patient_name"
          type="text"
          placeholder="patient_name"
          value={state.patient_name}
          onChange={handleInputChange}
        />
        <input
          id="patient_age"
          name="patient_age"
          type="text"
          placeholder="patient_age"
          value={state.patient_age}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
