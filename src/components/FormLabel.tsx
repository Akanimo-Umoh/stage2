type FormLabelProps = {
  htmlFor: string
  label: string
  error?: string
}

export function FormLabel({ htmlFor, label, error }: FormLabelProps) {
  return (
    <div className="flex items-center justify-between">
      <label
        htmlFor={htmlFor}
        className={`body-variant ${error ? "text-09" : "text-label-text"}`}
      >
        {label}
      </label>
      {error && (
        <p className="text-[10px] leading-3.75 font-semibold tracking-[-0.21px] text-09">
          {error}
        </p>
      )}
    </div>
  )
}
