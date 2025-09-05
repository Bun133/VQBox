export default function AuthedLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  console.log('AuthedLayout', modal);

  return (
    <>
      {children}
      {modal}
    </>
  );
}
