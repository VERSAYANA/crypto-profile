import { Dispatch, SetStateAction } from 'react'

type Props = {
  loading: boolean
  label: string
  id: string
  value: string | null
  setValue: Dispatch<SetStateAction<string | null>>
}

function PersonalInfoInput({ id, label, value, setValue, loading }: Props) {
  return (
    <div>
      <label htmlFor={id} className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        disabled={loading}
        className="input-bordered input w-full"
        id={id}
        type="text"
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default PersonalInfoInput
