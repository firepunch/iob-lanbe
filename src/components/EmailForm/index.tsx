interface emailFormProps {
  t: any;
  errorCode?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

export default function EmailForm({
  t,
  errorCode,
  onSubmit,
  children,
}: emailFormProps) {

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">이메일:</label>
        <input type="email" id="email" />
        <p>{t(errorCode)}</p>
        <button type="submit">전송</button>
      </form>
    </>
  )
}

