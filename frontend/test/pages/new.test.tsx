import React from 'react'
import { render, screen } from '../testUtils'
import NewDisease from '../../pages/new'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

describe('Create Disease page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<NewDisease />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('should change the input values', () => {
    render(<NewDisease />)
    const inputName = screen.getByTestId('name')
    const inputPicture = screen.getByTestId('picture')
    const inputPatientName = screen.getByTestId('patient_name')
    const inputPatientAge = screen.getByTestId('patient_age')

    userEvent.type(inputName, 'Maag')
    userEvent.type(inputPicture, 'picture1.jpg')
    userEvent.type(inputPatientName, 'Safar')
    userEvent.type(inputPatientAge, '24')

    expect(inputName).toHaveValue('Maag')
    expect(inputPicture).toHaveValue('picture1.jpg')
    expect(inputPatientName).toHaveValue('Safar')
    expect(inputPatientAge).toHaveValue('24')
  })
})
