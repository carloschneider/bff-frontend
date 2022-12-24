type TemplateLoginProps = {
  Outlet: React.ReactNode
}

const TemplateLogin = ({ Outlet }: TemplateLoginProps) => (
  <div className="container">
    <h1>Login template</h1>

    {Outlet}
  </div>
)

export default TemplateLogin
