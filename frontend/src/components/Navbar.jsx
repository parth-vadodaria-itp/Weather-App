const Navbar = () => {
  return (
    <nav className="h-[10vh] p-2 flex gap-2 items-center">
      <div className="self-center font-[cursive] text-xl">Weather</div>
      <div className="w-full">
        <div className="w-fit md:w-7/10 m-auto rounded-md shadow-xl/20 ">
          <div className="md:w-full px-2 py-1 flex gap-2">
            <i className="ri-send-plane-fill text-violet-700" />
            <input
              type="search"
              placeholder="Location"
              className="md:w-full focus:outline-0"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
