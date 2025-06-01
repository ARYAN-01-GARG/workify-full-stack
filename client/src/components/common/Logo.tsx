const Logo = () => {
  return (
    <img
        loading="lazy"
        src="/logo.svg"
        onClick={() => window.location.href = "/"}
        alt="Workify Logo"
        className="h-12"
    />
  )
}

export default Logo