import "@/styles/_global.scss"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <>
      {children}
    </>
  )
}

export const metadata = {
  title: "Ideas on board",
  description: "This is IOB website.",
}
