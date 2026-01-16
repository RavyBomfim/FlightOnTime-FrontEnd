export default function Footer() {
  return (
    <footer className="bg-[#353535] text-white p-5 flex flex-col items-center">
      <div className="container mx-auto text-center text-sm">
        <span className="text-[#5B9BD5] font-semibold">Flight On Time</span>
        <span className="pl-2">&copy; {new Date().getFullYear()}</span>
      </div>
      <div>
        <div className="container mx-auto text-center text-sm mt-1 opacity-50">
          <span>Desenvolvido pela Equipe:</span>
        </div>
        <div className="flex justify-center">
          <img
            src="alcateia-logo.png"
            alt="AlcateIA Logo"
            className="inline-block mx-auto h-14"
          />
        </div>
      </div>
    </footer>
  );
}
