import React from 'react'
import { Button, RadioInput, SelectInput, TextareaInput, TextInput, ToggleSwitch } from '@icure/cardinal-prescription-be-react'
import './index.css'

function App() {
  enum durationTimeUnitsEnum {
    DAY = 'DAY',
    WEEK = 'WEEK',
  }

  const getDurationTimeUnits = () => [
    {
      value: durationTimeUnitsEnum.DAY,
      label: 'Day',
    },
    {
      value: durationTimeUnitsEnum.WEEK,
      label: 'Week',
    },
  ]

  return (
    <div className="App">
      <h1>Hello from the Demo App</h1>
      <div className="divider"></div>
      <div>
        <Button title="Primary button" />
        <Button title="Primary button" disabled={true} />

        <Button title="Outlined button" view="outlined" />
        <Button title="Outlined button" view="outlined" disabled={true} />

        <Button title="WithSpinner button" view="withSpinner" />
        <Button title="WithSpinner button" view="withSpinner" disabled={true} />
      </div>
      <div className="divider"></div>
      <div>
        <RadioInput
          name={'Substitution Allowed'}
          label={'Substitution Allowed Label'}
          options={[
            {
              id: 'yes',
              label: 'Yes',
              value: true,
            },
            {
              id: 'no',
              label: 'No',
              value: false,
            },
          ]}
          required={true}
          errorMessage={'The error'}
        />
        <RadioInput
          name={'Substitution Allowed2'}
          label={'Substitution Allowed Label'}
          options={[
            {
              id: 'yes',
              label: 'Yes',
              value: true,
            },
            {
              id: 'no',
              label: 'No',
              value: false,
            },
          ]}
          required={true}
        />
      </div>
      <div>
        <SelectInput label="Duration Time Unit" id="durationTimeUnit1" required={true} errorMessage="getErrorMessage('durationTimeUnit')" options={getDurationTimeUnits()} />
        <SelectInput label="Duration Time Unit" id="durationTimeUnit2" required={true} options={getDurationTimeUnits()} />
        <SelectInput label="Duration Time Unit" id="durationTimeUnit3" disabled={true} options={getDurationTimeUnits()} />
      </div>
      <div>
        <TextareaInput label="Patient Instructions" id="patientInstructions1" required={true} errorMessage="getErrorMessage('durationTimeUnit')" />
        <TextareaInput label="Patient Instructions" id="patientInstructions2" required={true} />
        <TextareaInput label="Patient Instructions" id="patientInstructions3" disabled={true} />
      </div>
      <div>
        <TextInput label="Medication Title" id="MedicationTitle" required={true} errorMessage="getErrorMessage('durationTimeUnit')" />
        <TextInput label="Medication Title" id="MedicationTitle" required={true} />
        <TextInput label="Medication Title" id="MedicationTitle" disabled={true} />
      </div>
      <div>
        <ToggleSwitch label="Extra Fields" id="toggleExtraFields" value="The value of the toggle" checked={false} onChange={(val) => console.log(val)} />
      </div>
    </div>
  )
}

export default App
