const PageHome = () => {
  return (
    <div>
      <h1>Home</h1>
      {[...Array(20)].map((_, index) => (
        <p key={index}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta enim,
          doloribus aliquid quam, accusamus consectetur ex eum fugit architecto
          fuga repudiandae amet, eius fugiat labore facere provident? Enim, sed
          esse.
        </p>
      ))}
    </div>
  )
}

export default PageHome
